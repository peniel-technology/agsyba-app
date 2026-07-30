import { fireEvent, render } from '@testing-library/react-native';

import { ProductBestOffers } from '@/features/products/components/detail/ProductBestOffers';
import { ProductDeliveryServices } from '@/features/products/components/detail/ProductDeliveryServices';
import { ProductEstimatedDelivery } from '@/features/products/components/detail/ProductEstimatedDelivery';
import { ProductSellerInfo } from '@/features/products/components/detail/ProductSellerInfo';
import { ProductSpecifications } from '@/features/products/components/detail/ProductSpecifications';
import type {
  ProductOffer,
  ProductSeller,
  ProductService,
  ProductSpecification,
} from '@/features/products/types/productDetail';

jest.mock('lucide-react-native', () => ({
  CreditCard: 'CreditCard',
  PackageCheck: 'PackageCheck',
  RefreshCcw: 'RefreshCcw',
  Star: 'Star',
  TicketPercent: 'TicketPercent',
  Truck: 'Truck',
}));

const offers: readonly ProductOffer[] = [
  {
    description: 'Flat AED 200 off on first order above AED 999. Use code: FIRST200',
    id: 'first-order',
  },
];

const services: readonly ProductService[] = [
  { icon: 'delivery', id: 'delivery-date', label: 'Get it by Thu, Jul 24' },
  { icon: 'return', id: 'easy-returns', label: '14 days easy return & exchange' },
  {
    icon: 'shipping',
    id: 'free-shipping',
    label: 'Free shipping on orders above AED 999',
  },
];

const specifications: readonly ProductSpecification[] = [
  { id: 'fabric', label: 'Fabric', value: 'Lightweight Chiffon' },
  { id: 'wash-care', label: 'Wash Care', value: 'Machine Wash' },
];

const seller: ProductSeller = {
  initial: 'A',
  name: 'AGSYBA Official Store',
  rating: 4.6,
};

describe('Product detail information', () => {
  it('renders the offer, specifications, and estimated delivery', () => {
    const { getByText } = render(
      <>
        <ProductBestOffers offers={offers} />
        <ProductSpecifications specifications={specifications} />
        <ProductEstimatedDelivery deliveryWindow="Oct 24 - Oct 26" shippingLabel="Free Shipping" />
      </>,
    );

    expect(getByText(offers[0].description)).toBeTruthy();
    expect(getByText('Lightweight Chiffon')).toBeTruthy();
    expect(getByText('Machine Wash')).toBeTruthy();
    expect(getByText('Estimated delivery: Oct 24 - Oct 26')).toBeTruthy();
    expect(getByText('Free Shipping')).toBeTruthy();
  });

  it('renders service benefits and validates the delivery pincode', () => {
    const { getByLabelText, getByText } = render(<ProductDeliveryServices services={services} />);
    const pincodeInput = getByLabelText('Delivery pincode');
    const checkButton = getByLabelText('Check delivery availability');

    services.forEach((service) => {
      expect(getByText(service.label)).toBeTruthy();
    });

    fireEvent.press(checkButton);
    expect(getByText('Enter a valid 6-digit pincode.')).toBeTruthy();

    fireEvent.changeText(pincodeInput, '560001');
    fireEvent.press(checkButton);
    expect(getByText('Delivery is available for 560001.')).toBeTruthy();
  });

  it('renders seller details and opens the store action', () => {
    const onViewStorePress = jest.fn();
    const { getByLabelText, getByText } = render(
      <ProductSellerInfo onViewStorePress={onViewStorePress} seller={seller} />,
    );

    expect(getByText('Sold by: AGSYBA Official Store')).toBeTruthy();
    expect(getByLabelText('4.6 out of 5 seller rating')).toBeTruthy();

    fireEvent.press(getByLabelText('View AGSYBA Official Store'));
    expect(onViewStorePress).toHaveBeenCalledTimes(1);
  });
});
