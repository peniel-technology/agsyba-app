import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Camera, CheckCircle2, Trash2 } from 'lucide-react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { Controller, type FieldErrors, useForm } from 'react-hook-form';

import { PageHeader, Screen } from '@/components/layouts';
import { ThemedModal } from '@/components/modals/ThemedModal';
import { Text } from '@/components/ui/Text';
import { config } from '@/constants/config';
import { routes } from '@/constants/routes';
import { AuthMobileField } from '@/features/auth/components/AuthMobileField';
import { countryCallingCodeOptions } from '@/features/checkout/constants/countryCallingCodes';
import { ProfileAvatar } from '@/features/profile/components/ProfileAvatar';
import {
  ProfileDateOfBirthFields,
  type DateOfBirthPart,
} from '@/features/profile/components/ProfileDateOfBirthFields';
import { ProfileFormField } from '@/features/profile/components/ProfileFormField';
import {
  useUpdateProfile,
  useUploadProfileAvatar,
} from '@/features/profile/hooks/useProfileMutations';
import {
  editProfileSchema,
  type EditProfileFormValues,
} from '@/features/profile/schemas/editProfileSchema';
import { useCurrentCustomer } from '@/queries/useCurrentCustomer';
import { getCustomerAvatarUrl } from '@/features/profile/utils/getCustomerAvatarUrl';
import { useThemedModal } from '@/hooks/useThemedModal';
import { useToastStore } from '@/stores/useToastStore';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';
import type { Customer } from '@/types/customer';

const maxAvatarSizeBytes = 2 * 1024 * 1024;
const avatarMetadataKeys = [
  'uploaded_avatar_url',
  'avatar_url',
  'avatar',
  'profile_image_url',
  'profileImage',
  'social_profile_image',
] as const;

function getCustomerMetadata(customer: Customer): Record<string, unknown> {
  const metadata = customer.metadata;

  return metadata && typeof metadata === 'object' && !Array.isArray(metadata) ? metadata : {};
}

function getMetadataString(customer: Customer, keys: readonly string[]): string {
  const metadata = getCustomerMetadata(customer);

  for (const key of keys) {
    const value = metadata[key];

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return '';
}

function getDefaultCallingCode(): string {
  const countryCode = config.defaultCountryCode.toLowerCase();
  const country = countryCallingCodeOptions.find(
    (option) => option.countryCode.toLowerCase() === countryCode,
  );

  return country?.callingCode || '+971';
}

function parseCustomerPhone(phone: string | null | undefined): {
  callingCode: string;
  number: string;
} {
  const value = phone?.trim() || '';
  const matchingCountry = [...countryCallingCodeOptions]
    .sort((first, second) => second.callingCode.length - first.callingCode.length)
    .find((country) => value.replace(/\s/g, '').startsWith(country.callingCode));

  if (!matchingCountry) {
    return { callingCode: getDefaultCallingCode(), number: value };
  }

  const normalizedCallingCode = matchingCountry.callingCode.replace(/\s/g, '');
  const normalizedValue = value.replace(/\s/g, '');
  const numberStart = normalizedValue.startsWith(normalizedCallingCode)
    ? normalizedCallingCode.length
    : 0;

  return {
    callingCode: matchingCountry.callingCode,
    number: normalizedValue.slice(numberStart).replace(/[^0-9().-]/g, ''),
  };
}

function parseDateOfBirth(value: string): {
  day: string;
  month: string;
  year: string;
} {
  if (!value) {
    return { day: '', month: '', year: '' };
  }

  const isoMatch = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(value);
  if (isoMatch) {
    return {
      day: String(Number(isoMatch[3])),
      month: String(Number(isoMatch[2])),
      year: isoMatch[1],
    };
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { day: '', month: '', year: '' };
  }

  return {
    day: String(date.getDate()),
    month: String(date.getMonth() + 1),
    year: String(date.getFullYear()),
  };
}

function getInitialFormValues(customer: Customer): EditProfileFormValues {
  const phone = parseCustomerPhone(customer.phone);
  const dateOfBirth = parseDateOfBirth(
    getMetadataString(customer, ['date_of_birth', 'birthdate', 'birthday']),
  );
  const rawGender = getMetadataString(customer, ['gender', 'profile_gender']);
  const gender = ['Male', 'Female', 'Other'].find(
    (option) => option.toLowerCase() === rawGender.toLowerCase(),
  );

  return {
    day: dateOfBirth.day,
    firstName: customer.first_name?.trim() || '',
    gender: (gender || 'Male') as EditProfileFormValues['gender'],
    lastName: customer.last_name?.trim() || '',
    month: dateOfBirth.month,
    phone: phone.number,
    phoneCountry: phone.callingCode,
    year: dateOfBirth.year,
  };
}

function getDisplayName(customer: Customer): string {
  const name = [customer.first_name, customer.last_name]
    .filter((value): value is string => Boolean(value?.trim()))
    .join(' ')
    .trim();

  return name || customer.email;
}

function getMemberSince(createdAt: string | null | undefined): string {
  if (!createdAt) {
    return 'AGSYBA member';
  }

  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) {
    return 'AGSYBA member';
  }

  return `Member since ${date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
}

function buildDateOfBirth(values: EditProfileFormValues): string {
  if (!values.day || !values.month || !values.year) {
    return '';
  }

  return `${values.year}-${values.month.padStart(2, '0')}-${values.day.padStart(2, '0')}`;
}

function buildPhone(values: EditProfileFormValues): string | null {
  const digits = values.phone.replace(/\D/g, '');

  return digits ? `${values.phoneCountry}${digits}` : null;
}

function buildAvatarMetadata(
  metadata: Record<string, unknown>,
  avatarUrl: string,
): Record<string, unknown> {
  return avatarMetadataKeys.reduce<Record<string, unknown>>(
    (nextMetadata, key) => {
      nextMetadata[key] = avatarUrl;
      return nextMetadata;
    },
    { ...metadata },
  );
}

function showFormError(
  formErrors: FieldErrors<EditProfileFormValues>,
  showToast: ReturnType<typeof useToastStore.getState>['showToast'],
) {
  const message =
    formErrors.firstName?.message ??
    formErrors.lastName?.message ??
    formErrors.phone?.message ??
    formErrors.day?.message ??
    'Check your profile details.';

  showToast({
    message: typeof message === 'string' ? message : 'Check your profile details.',
    title: 'Complete your profile',
    tone: 'error',
  });
}

function EditProfileForm({ customer }: { customer: Customer }) {
  const router = useRouter();
  const { modalProps, openModal } = useThemedModal();
  const showToast = useToastStore((state) => state.showToast);
  const updateProfileMutation = useUpdateProfile();
  const uploadAvatarMutation = useUploadProfileAvatar();
  const defaultValues = useMemo(() => getInitialFormValues(customer), [customer]);
  const { control, formState, handleSubmit, setValue, watch } = useForm<EditProfileFormValues>({
    defaultValues,
    mode: 'onSubmit',
    resolver: zodResolver(editProfileSchema),
  });
  const [selectedAvatar, setSelectedAvatar] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);

  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.profile);
  }, [router]);

  const imagePreviewUri = removeAvatar ? null : selectedAvatar?.uri;
  const isSaving =
    formState.isSubmitting || updateProfileMutation.isPending || uploadAvatarMutation.isPending;

  const handleChangePhoto = useCallback(async () => {
    Keyboard.dismiss();

    let result: ImagePicker.ImagePickerResult;

    try {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        mediaTypes: ['images'],
        quality: 0.85,
      });
    } catch {
      showToast({
        message: 'We could not open your photo library. Please try again.',
        title: 'Photo picker unavailable',
        tone: 'error',
      });
      return;
    }

    if (result.canceled) {
      return;
    }

    const asset = result.assets[0];
    if (!asset) {
      return;
    }

    if (
      asset.mimeType &&
      !['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(asset.mimeType)
    ) {
      showToast({
        message: 'Please choose a JPG, PNG, GIF, or WEBP image.',
        title: 'Unsupported image',
        tone: 'error',
      });
      return;
    }

    if (typeof asset.fileSize === 'number' && asset.fileSize > maxAvatarSizeBytes) {
      showToast({
        message: 'Choose an image smaller than 2MB.',
        title: 'Image is too large',
        tone: 'error',
      });
      return;
    }

    setSelectedAvatar(asset);
    setRemoveAvatar(false);
  }, [showToast]);

  const handleRemovePhoto = useCallback(() => {
    setSelectedAvatar(null);
    setRemoveAvatar(true);
  }, []);

  const handleDeleteAccount = useCallback(() => {
    openModal({
      actions: [{ label: 'Okay', variant: 'secondary' }],
      message:
        'Account deletion is permanent. Please contact AGSYBA support to complete this request securely.',
      title: 'Delete account',
      tone: 'error',
    });
  }, [openModal]);

  const handleSave = handleSubmit(
    async (values) => {
      try {
        let avatarUrl = getCustomerAvatarUrl(customer);

        if (selectedAvatar) {
          avatarUrl = (await uploadAvatarMutation.mutateAsync(selectedAvatar)).url;
        } else if (removeAvatar) {
          avatarUrl = null;
        }

        const metadata = {
          ...getCustomerMetadata(customer),
          date_of_birth: buildDateOfBirth(values),
          gender: values.gender,
        };
        const nextMetadata =
          selectedAvatar || removeAvatar
            ? buildAvatarMetadata(metadata, avatarUrl || '')
            : metadata;
        await updateProfileMutation.mutateAsync({
          first_name: values.firstName.trim(),
          last_name: values.lastName.trim(),
          metadata: nextMetadata,
          phone: buildPhone(values),
        });

        showToast({
          message: 'Your profile details have been updated.',
          title: 'Profile saved',
          tone: 'success',
        });
        router.back();
      } catch (error) {
        showToast({
          message: error instanceof Error ? error.message : 'Please try again in a moment.',
          title: 'Could not save profile',
          tone: 'error',
        });
      }
    },
    (formErrors) => showFormError(formErrors, showToast),
  );

  const handleDateChange = (part: DateOfBirthPart, value: string) => {
    setValue(part, value, { shouldDirty: true });
  };

  return (
    <Screen includeBottomInset={false} padded={false}>
      <PageHeader onBackPress={handleBackPress} title="Edit Profile" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 bg-background"
          contentContainerClassName="gap-6 px-4 pb-6 pt-5"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-3 rounded-lg border border-border bg-surface p-4">
            <Text variant="label">Profile Photo</Text>
            <View className="flex-row items-center gap-4">
              <ProfileAvatar customer={customer} imageUri={imagePreviewUri} size="profile" />
              <View className="min-w-0 flex-1 gap-1">
                <Text numberOfLines={1} variant="title">
                  {getDisplayName(customer)}
                </Text>
                <Text tone="muted" variant="caption">
                  {getMemberSince(customer.created_at)}
                </Text>
                <View className="mt-2 flex-row flex-wrap items-center gap-x-4 gap-y-2">
                  <Pressable
                    accessibilityLabel="Change profile photo"
                    accessibilityRole="button"
                    className="flex-row items-center gap-1.5 rounded-sm border border-brand px-3 py-2 active:bg-sale-surface"
                    disabled={isSaving}
                    onPress={() => void handleChangePhoto()}
                  >
                    <Camera
                      accessible={false}
                      color={colors.brand}
                      size={iconSizes.small}
                      strokeWidth={iconStrokeWidths.regular}
                    />
                    <Text className="uppercase" tone="brand" variant="microStrong">
                      Change Photo
                    </Text>
                  </Pressable>
                  <Pressable
                    accessibilityLabel="Remove profile photo"
                    accessibilityRole="button"
                    className="py-2 active:opacity-70"
                    disabled={isSaving || (!getCustomerAvatarUrl(customer) && !selectedAvatar)}
                    hitSlop={spacing[1]}
                    onPress={handleRemovePhoto}
                  >
                    <Text className="underline" tone="muted" variant="caption">
                      Remove Photo
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <Text tone="muted" variant="detail">
              JPG, GIF or PNG. Max size 2MB.
            </Text>
          </View>

          <View className="gap-3">
            <Text variant="sectionHeading">Personal Information</Text>
            <View className="gap-5 rounded-lg border border-border bg-surface p-4">
              <View className="flex-row gap-3">
                <View className="min-w-0 flex-1">
                  <Controller
                    control={control}
                    name="firstName"
                    render={({ field }) => (
                      <ProfileFormField
                        autoCapitalize="words"
                        label="First Name"
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        placeholder="First name"
                        returnKeyType="next"
                        value={field.value}
                      />
                    )}
                  />
                </View>
                <View className="min-w-0 flex-1">
                  <Controller
                    control={control}
                    name="lastName"
                    render={({ field }) => (
                      <ProfileFormField
                        autoCapitalize="words"
                        label="Last Name"
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        placeholder="Last name"
                        returnKeyType="next"
                        value={field.value}
                      />
                    )}
                  />
                </View>
              </View>

              <View className="h-px bg-subtle-border" />

              <View className="gap-2">
                <Text variant="captionStrong">Email Address</Text>
                <View className="min-h-12 flex-row items-center gap-2 rounded-sm border border-border bg-subtle-surface px-4 py-3">
                  <Text className="flex-1" numberOfLines={1} tone="muted" variant="detail">
                    {customer.email}
                  </Text>
                  <View className="flex-row items-center gap-1 rounded-full bg-success-surface px-2 py-1">
                    <CheckCircle2
                      accessible={false}
                      color={colors.success}
                      size={iconSizes.tiny}
                      strokeWidth={iconStrokeWidths.emphasized}
                    />
                    <Text tone="success" variant="microStrong">
                      Verified
                    </Text>
                  </View>
                </View>
              </View>

              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <Controller
                    control={control}
                    name="phoneCountry"
                    render={({ field: countryField }) => (
                      <AuthMobileField
                        callingCode={countryField.value}
                        label="Phone Number"
                        onChangeText={field.onChange}
                        onCountryChange={(country) => countryField.onChange(country.callingCode)}
                        placeholder="Enter your phone number"
                        value={field.value}
                      />
                    )}
                  />
                )}
              />

              <View className="gap-2">
                <Text variant="captionStrong">Gender</Text>
                <View className="flex-row gap-2">
                  {(['Male', 'Female', 'Other'] as const).map((gender) => {
                    const isSelected = watch('gender') === gender;

                    return (
                      <Pressable
                        accessibilityLabel={`Gender ${gender}`}
                        accessibilityRole="radio"
                        accessibilityState={{ selected: isSelected }}
                        className={`min-h-11 flex-1 items-center justify-center rounded-sm border px-3 py-3 ${isSelected ? 'border-brand bg-sale-surface' : 'border-border bg-surface active:bg-subtle-surface'}`}
                        key={gender}
                        onPress={() => setValue('gender', gender, { shouldDirty: true })}
                      >
                        <Text tone={isSelected ? 'brand' : 'muted'} variant="captionStrong">
                          {gender}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View className="h-px bg-subtle-border" />

              <ProfileDateOfBirthFields
                day={watch('day')}
                month={watch('month')}
                onChange={handleDateChange}
                year={watch('year')}
              />
            </View>
          </View>

          <View className="gap-3 rounded-lg border border-sale-divider bg-sale-surface p-4">
            <View className="flex-row items-start gap-3">
              <View className="size-9 items-center justify-center rounded-full bg-surface">
                <Trash2
                  accessible={false}
                  color={colors.error}
                  size={iconSizes.compact}
                  strokeWidth={iconStrokeWidths.regular}
                />
              </View>
              <View className="flex-1 gap-1">
                <Text tone="error" variant="bodyStrong">
                  Delete Account
                </Text>
                <Text className="leading-5" tone="muted" variant="detail">
                  Deleting your account is permanent and removes your profile, saved items, and
                  order history.
                </Text>
              </View>
            </View>
            <Pressable
              accessibilityLabel="Delete account"
              accessibilityRole="button"
              className="items-center rounded-sm border border-error px-4 py-3 active:bg-surface"
              onPress={handleDeleteAccount}
            >
              <Text className="uppercase" tone="error" variant="microStrong">
                Delete Account
              </Text>
            </Pressable>
          </View>
        </ScrollView>

        <View className="gap-3 border-t border-border bg-surface p-4">
          <Pressable
            accessibilityLabel="Save profile changes"
            accessibilityRole="button"
            accessibilityState={{ busy: isSaving, disabled: isSaving }}
            className="min-h-12 flex-row items-center justify-center rounded-sm bg-order-action p-4 active:opacity-85 disabled:opacity-50"
            disabled={isSaving}
            onPress={() => {
              Keyboard.dismiss();
              void handleSave();
            }}
          >
            {isSaving ? (
              <ActivityIndicator color={colors.brandForeground} size="small" />
            ) : (
              <Text className="uppercase" tone="brandForeground" variant="label">
                Save Changes
              </Text>
            )}
          </Pressable>
          <Pressable
            accessibilityLabel="Cancel profile changes"
            accessibilityRole="button"
            className="min-h-12 items-center justify-center rounded-sm border border-border bg-surface p-4 active:bg-subtle-surface"
            disabled={isSaving}
            onPress={handleBackPress}
          >
            <Text className="uppercase" tone="muted" variant="label">
              Cancel
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      <ThemedModal {...modalProps} />
    </Screen>
  );
}

export function EditProfileScreen() {
  const router = useRouter();
  const { data: customer, isFetching, isLoading } = useCurrentCustomer();
  const isCustomerLoading = isLoading || (!customer && isFetching);

  useEffect(() => {
    if (!isCustomerLoading && !customer) {
      router.replace(routes.profile);
    }
  }, [customer, isCustomerLoading, router]);

  if (isCustomerLoading) {
    return (
      <Screen includeBottomInset={false} padded={false}>
        <PageHeader onBackPress={() => router.back()} title="Edit Profile" />
        <View className="flex-1 items-center justify-center bg-background">
          <ActivityIndicator color={colors.brand} size="small" />
        </View>
      </Screen>
    );
  }

  if (!customer) {
    return (
      <Screen includeBottomInset={false} padded={false}>
        <PageHeader onBackPress={() => router.back()} title="Edit Profile" />
        <View className="flex-1 items-center justify-center bg-background px-6">
          <Text tone="muted" variant="caption">
            Returning to your profile...
          </Text>
        </View>
      </Screen>
    );
  }

  return <EditProfileForm customer={customer} />;
}
