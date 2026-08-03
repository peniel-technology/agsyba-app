import type { LocationGeocodedAddress } from 'expo-location';

import { mapGeocodedAddress } from '@/features/checkout/utils/mapGeocodedAddress';

const emptyAddress: LocationGeocodedAddress = {
  city: null,
  country: null,
  district: null,
  formattedAddress: null,
  isoCountryCode: null,
  name: null,
  postalCode: null,
  region: null,
  street: null,
  streetNumber: null,
  subregion: null,
  timezone: null,
};

describe('mapGeocodedAddress', () => {
  it('removes a plus code and keeps the complete readable address', () => {
    const result = mapGeocodedAddress({
      ...emptyAddress,
      city: 'Kazhakkoottam',
      country: 'India',
      formattedAddress: 'HV2G+QW2, Kazhakkoottam, Kerala 695583, India',
      name: 'HV2G+QW2',
      postalCode: '695583',
      region: 'Kerala',
      subregion: 'Thiruvananthapuram',
    });

    expect(result).toEqual({
      addressLine1: 'Kazhakkoottam, Kerala 695583, India',
      addressLine2: 'Thiruvananthapuram',
      city: 'Kazhakkoottam',
      postalCode: '695583',
      state: 'Kerala',
    });
  });

  it('prefers structured building and street information', () => {
    const result = mapGeocodedAddress({
      ...emptyAddress,
      city: 'Dubai',
      country: 'United Arab Emirates',
      district: 'Jumeirah',
      name: 'Villa 14',
      postalCode: '00000',
      region: 'Dubai',
      street: 'Al Wasl Road',
    });

    expect(result.addressLine1).toBe('Villa 14, Al Wasl Road');
    expect(result.addressLine2).toBe('Jumeirah');
  });
});
