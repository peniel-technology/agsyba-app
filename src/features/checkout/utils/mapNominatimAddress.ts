import type { LocatedAddress } from '@/features/checkout/utils/mapGeocodedAddress';

export interface NominatimAddressDetails {
  amenity?: string;
  building?: string;
  city?: string;
  city_district?: string;
  country?: string;
  county?: string;
  house_name?: string;
  house_number?: string;
  municipality?: string;
  neighbourhood?: string;
  office?: string;
  pedestrian?: string;
  postcode?: string;
  quarter?: string;
  residential?: string;
  road?: string;
  shop?: string;
  state?: string;
  state_district?: string;
  suburb?: string;
  town?: string;
  village?: string;
}

export interface NominatimReverseGeocodeResponse {
  address?: NominatimAddressDetails;
  display_name?: string;
  name?: string;
}

const plusCodePattern = /^[23456789CFGHJMPQRVWX]{4,8}\+[23456789CFGHJMPQRVWX]{2,}/i;

function cleanPart(value: string | undefined): string {
  return value?.trim() ?? '';
}

function firstPart(...values: (string | undefined)[]): string {
  return values.map(cleanPart).find(Boolean) ?? '';
}

function uniqueParts(values: readonly string[]): string[] {
  const parts = new Map<string, string>();

  for (const value of values) {
    const part = value.trim();

    if (part && !plusCodePattern.test(part)) {
      parts.set(part.toLocaleLowerCase(), part);
    }
  }

  return [...parts.values()];
}

function joinParts(values: readonly string[]): string {
  return uniqueParts(values).join(', ');
}

function getDisplayAddress(displayName: string | undefined): string {
  return joinParts((displayName ?? '').split(',').slice(0, 3));
}

export function mapNominatimAddress(response: NominatimReverseGeocodeResponse): LocatedAddress {
  const address = response.address ?? {};
  const street = firstPart(address.road, address.pedestrian, address.residential);
  const premises = firstPart(
    address.house_name,
    address.building,
    address.amenity,
    address.shop,
    address.office,
  );
  const numberedStreet = [cleanPart(address.house_number), street].filter(Boolean).join(' ');
  const city = firstPart(
    address.city,
    address.town,
    address.village,
    address.municipality,
    address.county,
  );
  const state = firstPart(address.state, address.state_district);
  const localityParts = uniqueParts([
    cleanPart(address.neighbourhood),
    cleanPart(address.quarter),
    cleanPart(address.suburb),
    cleanPart(address.city_district),
  ]).filter((part) => part.toLocaleLowerCase() !== city.toLocaleLowerCase());
  const addressLine1 =
    joinParts([premises, numberedStreet]) ||
    getDisplayAddress(response.display_name) ||
    joinParts([city, state, cleanPart(address.country)]);

  return {
    addressLine1,
    addressLine2: localityParts.join(', '),
    city,
    postalCode: cleanPart(address.postcode),
    state,
  };
}
