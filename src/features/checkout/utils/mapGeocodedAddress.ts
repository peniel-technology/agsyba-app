import type { LocationGeocodedAddress } from 'expo-location';

import type { DeliveryAddressValues } from '@/features/checkout/schemas/deliveryAddressSchema';

export type LocatedAddress = Pick<
  DeliveryAddressValues,
  'addressLine1' | 'addressLine2' | 'city' | 'postalCode' | 'state'
>;

const plusCodePattern = /^[23456789CFGHJMPQRVWX]{4,8}\+[23456789CFGHJMPQRVWX]{2,}/i;

function normalizePart(part: string | null | undefined): string {
  return part?.trim() ?? '';
}

function uniqueAddressParts(parts: readonly (string | null | undefined)[]): string[] {
  const uniqueParts = new Map<string, string>();

  for (const part of parts) {
    const normalizedPart = normalizePart(part);

    if (normalizedPart) {
      uniqueParts.set(normalizedPart.toLocaleLowerCase(), normalizedPart);
    }
  }

  return [...uniqueParts.values()];
}

function joinAddressParts(parts: readonly (string | null | undefined)[]): string {
  return uniqueAddressParts(parts).join(', ');
}

function removePlusCode(formattedAddress: string | null): string {
  if (!formattedAddress) {
    return '';
  }

  return formattedAddress
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part && !plusCodePattern.test(part))
    .join(', ');
}

function isMeaningfulPlaceName(name: string, address: LocationGeocodedAddress): boolean {
  if (!name || plusCodePattern.test(name)) {
    return false;
  }

  const administrativeParts = uniqueAddressParts([
    address.city,
    address.district,
    address.region,
    address.subregion,
    address.country,
  ]).map((part) => part.toLocaleLowerCase());

  return !administrativeParts.includes(name.toLocaleLowerCase());
}

export function mapGeocodedAddress(address: LocationGeocodedAddress): LocatedAddress {
  const name = normalizePart(address.name);
  const streetAddress = joinAddressParts([address.streetNumber, address.street]);
  const placeName = isMeaningfulPlaceName(name, address) ? name : '';
  const formattedAddress = removePlusCode(address.formattedAddress);
  const city = normalizePart(address.city) || normalizePart(address.district);
  const state = normalizePart(address.region) || normalizePart(address.subregion);
  const addressLine1 =
    joinAddressParts([placeName, streetAddress]) ||
    formattedAddress ||
    joinAddressParts([address.district, address.subregion, city, state, address.country]);
  const addressLine2 =
    joinAddressParts([address.district, address.subregion]) ||
    joinAddressParts([city, address.country]);

  return {
    addressLine1,
    addressLine2,
    city,
    postalCode: normalizePart(address.postalCode),
    state,
  };
}
