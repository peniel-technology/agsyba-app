import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { ReviewCategoryRatings } from '@/features/reviews/components/ReviewCategoryRatings';
import { ReviewPhotoUploader } from '@/features/reviews/components/ReviewPhotoUploader';
import {
  ReviewRecommendation,
  type Recommendation,
} from '@/features/reviews/components/ReviewRecommendation';
import { StarRating } from '@/features/reviews/components/StarRating';
import {
  initialCategoryRatings,
  initialReviewPhotos,
  type ReviewCategoryRating,
  type ReviewPhoto,
} from '@/features/reviews/constants/ratingReviewData';
import { reviewSchema, type ReviewFormValues } from '@/features/reviews/schemas/reviewSchema';
import { colors } from '@/theme';

export interface ReviewSubmission {
  categories: readonly ReviewCategoryRating[];
  detail: string;
  overallRating: number;
  photos: readonly ReviewPhoto[];
  recommendation: Recommendation;
  title: string;
}

interface ReviewFormProps {
  onSubmit: (submission: ReviewSubmission) => void;
}

const styles = StyleSheet.create({
  detailInput: {
    height: 96,
    textAlignVertical: 'top',
  },
});

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ReviewFormValues>({
    defaultValues: {
      detail: '',
      recommendation: 'yes',
      title: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(reviewSchema),
  });
  const [overallRating, setOverallRating] = useState(3);
  const [categories, setCategories] =
    useState<readonly ReviewCategoryRating[]>(initialCategoryRatings);
  const [photos, setPhotos] = useState<readonly ReviewPhoto[]>(initialReviewPhotos);

  const updateCategoryRating = (id: string, value: number) => {
    setCategories((currentCategories) =>
      currentCategories.map((category) => (category.id === id ? { ...category, value } : category)),
    );
  };

  const handleRemovePhoto = (photoId: string) => {
    setPhotos((currentPhotos) => currentPhotos.filter((photo) => photo.id !== photoId));
  };

  const handleAddPhotos = () => {
    Alert.alert(
      'Add Photos',
      photos.length >= 5
        ? 'You can add up to 5 photos to a review.'
        : 'Photo selection will be available when image uploads are connected.',
    );
  };

  const handleFormSubmit = (values: ReviewFormValues) => {
    onSubmit({
      categories,
      detail: values.detail,
      overallRating,
      photos,
      recommendation: values.recommendation,
      title: values.title,
    });
  };

  return (
    <View className="gap-6">
      <View className="items-center gap-2">
        <Text variant="title">Overall Rating</Text>
        <StarRating
          accessibilityLabel="Overall product rating"
          onChange={setOverallRating}
          size={32}
          value={overallRating}
        />
        <Text tone="muted" variant="caption">
          Tap to rate
        </Text>
      </View>

      <View className="h-px bg-subtle-border" />

      <ReviewCategoryRatings categories={categories} onChange={updateCategoryRating} />

      <View className="h-px bg-subtle-border" />

      <View className="gap-4">
        <View className="gap-2">
          <Text variant="label">Review Title</Text>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <TextInput
                accessibilityLabel="Review title"
                className={`h-11 rounded-sm border bg-surface px-4 font-manrope text-sm text-foreground ${
                  errors.title ? 'border-error' : 'border-border'
                }`}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                placeholder="Summarize your experience"
                placeholderTextColor={colors.muted}
                returnKeyType="next"
                value={field.value}
              />
            )}
          />
          {errors.title?.message ? (
            <Text accessibilityRole="alert" tone="error" variant="detail">
              {errors.title.message}
            </Text>
          ) : null}
        </View>

        <View className="gap-2">
          <Text variant="label">Detailed Review</Text>
          <Controller
            control={control}
            name="detail"
            render={({ field }) => (
              <TextInput
                accessibilityLabel="Detailed review"
                className={`rounded-sm border bg-surface px-4 py-3 font-manrope text-sm text-foreground ${
                  errors.detail ? 'border-error' : 'border-border'
                }`}
                multiline
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                placeholder="Tell us more about your experience with this product. What did you like or dislike?"
                placeholderTextColor={colors.muted}
                style={styles.detailInput}
                textAlignVertical="top"
                value={field.value}
              />
            )}
          />
          {errors.detail?.message ? (
            <Text accessibilityRole="alert" tone="error" variant="detail">
              {errors.detail.message}
            </Text>
          ) : null}
        </View>
      </View>

      <ReviewPhotoUploader
        onAddPress={handleAddPhotos}
        onRemovePress={handleRemovePhoto}
        photos={photos}
      />

      <View className="h-px bg-subtle-border" />

      <Controller
        control={control}
        name="recommendation"
        render={({ field }) => (
          <ReviewRecommendation onChange={(value) => field.onChange(value)} value={field.value} />
        )}
      />

      <View className="gap-3">
        <Pressable
          accessibilityLabel="Submit review"
          accessibilityRole="button"
          className="h-12 items-center justify-center rounded-sm bg-order-action active:opacity-70"
          onPress={() => void handleSubmit(handleFormSubmit)()}
        >
          <Text className="uppercase" tone="brandForeground" variant="captionStrong">
            Submit Review
          </Text>
        </Pressable>
        <Text className="text-center" tone="muted" variant="micro">
          Your review will be published after moderation
        </Text>
      </View>
    </View>
  );
}
