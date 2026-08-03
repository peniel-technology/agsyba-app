import { config } from '@/constants/config';
import {
  mapNominatimAddress,
  type NominatimReverseGeocodeResponse,
} from '@/features/checkout/utils/mapNominatimAddress';
import type { LocatedAddress } from '@/features/checkout/utils/mapGeocodedAddress';

interface ReverseGeocodeCoordinates {
  latitude: number;
  longitude: number;
}

interface CachedAddress {
  address: LocatedAddress;
  cachedAt: number;
}

const CACHE_TTL_MS = 24 * 60 * 60 * 1_000;
const MAX_CACHE_ENTRIES = 100;
const MIN_REQUEST_INTERVAL_MS = 1_100;

const addressCache = new Map<string, CachedAddress>();
const inFlightRequests = new Map<string, Promise<LocatedAddress>>();
let requestQueue: Promise<void> = Promise.resolve();
let lastRequestAt = 0;

function getCacheKey({ latitude, longitude }: ReverseGeocodeCoordinates): string {
  return `${latitude.toFixed(5)},${longitude.toFixed(5)}`;
}

function pruneCache(): void {
  const now = Date.now();

  for (const [key, value] of addressCache) {
    if (now - value.cachedAt > CACHE_TTL_MS) {
      addressCache.delete(key);
    }
  }

  while (addressCache.size > MAX_CACHE_ENTRIES) {
    const oldestKey = addressCache.keys().next().value;

    if (typeof oldestKey !== 'string') {
      return;
    }

    addressCache.delete(oldestKey);
  }
}

async function waitForRequestSlot(): Promise<void> {
  const queuedRequest = requestQueue.then(async () => {
    const remainingDelay = MIN_REQUEST_INTERVAL_MS - (Date.now() - lastRequestAt);

    if (remainingDelay > 0) {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, remainingDelay);
      });
    }

    lastRequestAt = Date.now();
  });

  requestQueue = queuedRequest.catch(() => undefined);
  await queuedRequest;
}

async function fetchReverseGeocodedAddress({
  latitude,
  longitude,
}: ReverseGeocodeCoordinates): Promise<LocatedAddress> {
  await waitForRequestSlot();

  const url = new URL(config.reverseGeocodingUrl);
  url.searchParams.set('addressdetails', '1');
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('lat', String(latitude));
  url.searchParams.set('lon', String(longitude));
  url.searchParams.set('zoom', '18');

  const headers: Record<string, string> = { Accept: 'application/json' };

  if (config.reverseGeocodingUserAgent) {
    headers['User-Agent'] = config.reverseGeocodingUserAgent;
  }

  const response = await fetch(url.toString(), { headers });

  if (!response.ok) {
    throw new Error('Reverse geocoding failed');
  }

  const payload = (await response.json()) as NominatimReverseGeocodeResponse;
  return mapNominatimAddress(payload);
}

export async function reverseGeocodeDeliveryAddress(
  coordinates: ReverseGeocodeCoordinates,
): Promise<LocatedAddress | null> {
  if (!config.reverseGeocodingUrl) {
    return null;
  }

  const cacheKey = getCacheKey(coordinates);
  const cachedAddress = addressCache.get(cacheKey);

  if (cachedAddress && Date.now() - cachedAddress.cachedAt <= CACHE_TTL_MS) {
    return cachedAddress.address;
  }

  const existingRequest = inFlightRequests.get(cacheKey);

  if (existingRequest) {
    return existingRequest;
  }

  const request = fetchReverseGeocodedAddress(coordinates)
    .then((address) => {
      addressCache.set(cacheKey, { address, cachedAt: Date.now() });
      pruneCache();
      return address;
    })
    .finally(() => {
      inFlightRequests.delete(cacheKey);
    });

  inFlightRequests.set(cacheKey, request);
  return request;
}
