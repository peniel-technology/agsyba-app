import { mapNominatimAddress } from '@/features/checkout/utils/mapNominatimAddress';

describe('mapNominatimAddress', () => {
  it('maps a complete structured delivery address', () => {
    const result = mapNominatimAddress({
      address: {
        city: 'Thiruvananthapuram',
        country: 'India',
        house_name: 'Technopark Campus',
        house_number: '1',
        neighbourhood: 'Kazhakkoottam',
        postcode: '695581',
        road: 'Technopark Road',
        state: 'Kerala',
        suburb: 'Karyavattom',
      },
      display_name:
        'Technopark Campus, Technopark Road, Kazhakkoottam, Thiruvananthapuram, Kerala, India',
    });

    expect(result).toEqual({
      addressLine1: 'Technopark Campus, 1 Technopark Road',
      addressLine2: 'Kazhakkoottam, Karyavattom',
      city: 'Thiruvananthapuram',
      postalCode: '695581',
      state: 'Kerala',
    });
  });

  it('removes plus codes when only a display address is available', () => {
    const result = mapNominatimAddress({
      address: { city: 'Dubai', country: 'United Arab Emirates', state: 'Dubai' },
      display_name: '57V8+7X, Al Wasl Road, Jumeirah, Dubai, United Arab Emirates',
    });

    expect(result.addressLine1).toBe('Al Wasl Road, Jumeirah');
    expect(result.city).toBe('Dubai');
    expect(result.state).toBe('Dubai');
  });
});
