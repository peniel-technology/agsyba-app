import * as Location from 'expo-location';
import { useCallback, useState } from 'react';
import { Linking, Platform } from 'react-native';

import {
  mapGeocodedAddress,
  type LocatedAddress,
} from '@/features/checkout/utils/mapGeocodedAddress';
import { reverseGeocodeDeliveryAddress } from '@/services/api/reverseGeocode';

interface CurrentLocationResult {
  address?: LocatedAddress;
  error?: string;
  recovery?: LocationRecoveryAction;
}

export type LocationRecoveryAction = 'enable-location-services' | 'open-app-settings';

interface UseCurrentLocationResult {
  findCurrentAddress: () => Promise<CurrentLocationResult>;
  isLocating: boolean;
  recoverLocationAccess: (action: LocationRecoveryAction) => Promise<boolean>;
}

const FRESH_LOCATION_MAX_AGE_MS = 60_000;
const FALLBACK_LOCATION_ACCURACY_METERS = 100;

function mergeLocatedAddresses(
  primary: LocatedAddress | null,
  fallback: LocatedAddress | null,
): LocatedAddress | null {
  if (!primary) {
    return fallback;
  }

  if (!fallback) {
    return primary;
  }

  return {
    addressLine1: primary.addressLine1 || fallback.addressLine1,
    addressLine2: primary.addressLine2 || fallback.addressLine2,
    city: primary.city || fallback.city,
    postalCode: primary.postalCode || fallback.postalCode,
    state: primary.state || fallback.state,
  };
}

async function getNativeAddress(
  coordinates: Location.LocationObjectCoords,
): Promise<LocatedAddress | null> {
  const [address] = await Location.reverseGeocodeAsync(coordinates);
  return address ? mapGeocodedAddress(address) : null;
}

async function getBestAvailablePosition(): Promise<Location.LocationObject> {
  const cachedPosition = await Location.getLastKnownPositionAsync({
    maxAge: FRESH_LOCATION_MAX_AGE_MS,
    requiredAccuracy: FALLBACK_LOCATION_ACCURACY_METERS,
  }).catch(() => null);

  try {
    return await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
      mayShowUserSettingsDialog: true,
    });
  } catch (error) {
    if (cachedPosition) {
      return cachedPosition;
    }

    throw error;
  }
}

export function useCurrentLocation(): UseCurrentLocationResult {
  const [isLocating, setIsLocating] = useState(false);

  const recoverLocationAccess = useCallback(
    async (action: LocationRecoveryAction): Promise<boolean> => {
      if (action === 'open-app-settings' || Platform.OS !== 'android') {
        await Linking.openSettings();
        return false;
      }

      try {
        await Location.enableNetworkProviderAsync();
        return await Location.hasServicesEnabledAsync();
      } catch {
        await Linking.openSettings();
        return false;
      }
    },
    [],
  );

  const findCurrentAddress = useCallback(async (): Promise<CurrentLocationResult> => {
    setIsLocating(true);

    try {
      const currentPermission = await Location.getForegroundPermissionsAsync();
      const permission = currentPermission.granted
        ? currentPermission
        : await Location.requestForegroundPermissionsAsync();

      if (!permission.granted) {
        return {
          error: 'Allow location access to use your current delivery address.',
          recovery: 'open-app-settings',
        };
      }

      const areLocationServicesEnabled = await Location.hasServicesEnabledAsync();

      if (!areLocationServicesEnabled) {
        return {
          error: 'Turn on device location services to find your delivery address.',
          recovery: Platform.OS === 'android' ? 'enable-location-services' : 'open-app-settings',
        };
      }

      const position = await getBestAvailablePosition();
      const [preciseResult, nativeResult] = await Promise.allSettled([
        reverseGeocodeDeliveryAddress(position.coords),
        getNativeAddress(position.coords),
      ]);
      const preciseAddress = preciseResult.status === 'fulfilled' ? preciseResult.value : null;
      const nativeAddress = nativeResult.status === 'fulfilled' ? nativeResult.value : null;
      const address = mergeLocatedAddresses(preciseAddress, nativeAddress);

      if (!address) {
        return { error: 'We could not find an address for your current location.' };
      }

      return { address };
    } catch {
      return {
        error: 'Your location is unavailable right now. Please enter the address manually.',
      };
    } finally {
      setIsLocating(false);
    }
  }, []);

  return { findCurrentAddress, isLocating, recoverLocationAccess };
}
