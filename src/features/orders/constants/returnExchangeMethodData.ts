import { PackageCheck, Truck, MapPin, type LucideIcon } from 'lucide-react-native';

export type ReturnMethod = 'drop-store' | 'home-pickup' | 'self-ship';
export type PickupTimeSlot = '12pm-3pm' | '3pm-6pm' | '9am-12pm';

export interface ReturnMethodOption {
  description: string;
  icon: LucideIcon;
  label: string;
  value: ReturnMethod;
}

export interface ReturnTimeSlotOption {
  label: string;
  value: PickupTimeSlot;
}

export const returnMethodOptions: readonly ReturnMethodOption[] = [
  {
    description: 'Schedule a doorstep pickup. Free of charge.',
    icon: PackageCheck,
    label: 'Home Pickup',
    value: 'home-pickup',
  },
  {
    description: 'Drop off at nearest AGSYBA store. You pay shipping.',
    icon: MapPin,
    label: 'Drop at Store',
    value: 'drop-store',
  },
  {
    description: 'Ship using any courier. You pay shipping.',
    icon: Truck,
    label: 'Self Ship',
    value: 'self-ship',
  },
];

export const returnTimeSlotOptions: readonly ReturnTimeSlotOption[] = [
  { label: '9AM - 12PM', value: '9am-12pm' },
  { label: '12PM - 3PM', value: '12pm-3pm' },
  { label: '3PM - 6PM', value: '3pm-6pm' },
];

export const defaultReturnPickupAddress = '123 Green Park Colony, Dubai, UAE';
