import backImage from '@/assets/images/products/detail/blush-floral-wrap-midi-dress/back.webp';
import fabricDetailImage from '@/assets/images/products/detail/blush-floral-wrap-midi-dress/fabric-detail.webp';
import frontImage from '@/assets/images/products/detail/blush-floral-wrap-midi-dress/front.webp';
import lifestyleImage from '@/assets/images/products/detail/blush-floral-wrap-midi-dress/lifestyle.webp';
import mainImage from '@/assets/images/products/detail/blush-floral-wrap-midi-dress/main.webp';
import sideImage from '@/assets/images/products/detail/blush-floral-wrap-midi-dress/side.webp';
import type { ProductDetail } from '@/features/products/types/productDetail';
import type { ProductPreview } from '@/types/product';

export const blushFloralWrapMidiDress = {
  brand: 'AGSYBA',
  colors: [
    { id: 'beige', label: 'Beige', swatchClassName: 'bg-stone-300' },
    { id: 'black', label: 'Black', swatchClassName: 'bg-stone-900' },
    { id: 'navy', label: 'Navy', swatchClassName: 'bg-slate-800' },
    { id: 'red', label: 'Red', swatchClassName: 'bg-brand' },
  ],
  discountPercentage: 25,
  estimatedDelivery: 'Oct 24 - Oct 26',
  freeShippingLabel: 'Free Shipping',
  id: 'agsyba-blush-floral-wrap-midi-dress',
  images: [
    {
      accessibilityLabel: 'Model wearing the blush floral wrap midi dress',
      id: 'main',
      source: mainImage,
    },
    {
      accessibilityLabel: 'Front view of the blush floral wrap midi dress',
      id: 'front',
      source: frontImage,
    },
    {
      accessibilityLabel: 'Back view of the blush floral wrap midi dress',
      id: 'back',
      source: backImage,
    },
    {
      accessibilityLabel: 'Side view of the blush floral wrap midi dress',
      id: 'side',
      source: sideImage,
    },
    {
      accessibilityLabel: 'Close view of the blush floral fabric',
      id: 'fabric-detail',
      source: fabricDetailImage,
    },
    {
      accessibilityLabel: 'Blush floral wrap midi dress styled in a garden',
      id: 'lifestyle',
      source: lifestyleImage,
    },
  ],
  name: 'Blush Floral Wrap Midi Dress',
  offers: [
    {
      description: 'Flat AED 200 off on first order above AED 999. Use code: FIRST200',
      id: 'first-order',
    },
  ],
  originalPrice: { amount: 1_200, currency: 'AED' },
  price: { amount: 892, currency: 'AED' },
  rating: 4.8,
  ratingSummary: {
    average: 4.3,
    distribution: [
      { percentage: 65, stars: 5 },
      { percentage: 20, stars: 4 },
      { percentage: 8, stars: 3 },
      { percentage: 4, stars: 2 },
      { percentage: 3, stars: 1 },
    ],
    subtitle: 'Based on verified purchases',
    totalLabel: '2.4K ratings',
  },
  reviewCount: 48,
  reviews: [
    {
      author: 'Aisha S.',
      date: 'Jul 12, 2025',
      id: 'review-aisha',
      images: [
        {
          accessibilityLabel: 'Dress styled in a flower garden',
          id: 'aisha-lifestyle',
          source: lifestyleImage,
        },
        {
          accessibilityLabel: 'Front view shared by Aisha',
          id: 'aisha-front',
          source: frontImage,
        },
        {
          accessibilityLabel: 'Side view shared by Aisha',
          id: 'aisha-side',
          source: sideImage,
        },
      ],
      initials: 'AS',
      rating: 4,
      text: 'Beautiful fit and the floral print is so soft. The wrap waist is flattering and the midi length is perfect for everyday wear.',
      verifiedPurchase: true,
    },
    {
      author: 'Rohan M.',
      date: 'Jun 28, 2025',
      id: 'review-rohan',
      images: [
        {
          accessibilityLabel: 'Close view of the floral fabric shared by Rohan',
          id: 'rohan-fabric',
          source: fabricDetailImage,
        },
        {
          accessibilityLabel: 'Back view shared by Rohan',
          id: 'rohan-back',
          source: backImage,
        },
        {
          accessibilityLabel: 'Full product view shared by Rohan',
          id: 'rohan-main',
          source: mainImage,
        },
      ],
      initials: 'RM',
      rating: 3,
      text: 'Ordered size M and it fits perfectly. The material is lightweight and breathable. Delivery was quick and packaging was great.',
      verifiedPurchase: true,
    },
    {
      author: 'Meera K.',
      date: 'Jun 16, 2025',
      id: 'review-meera',
      images: [
        {
          accessibilityLabel: 'Garden outfit photo shared by Meera',
          id: 'meera-lifestyle',
          source: lifestyleImage,
        },
        {
          accessibilityLabel: 'Floral material detail shared by Meera',
          id: 'meera-fabric',
          source: fabricDetailImage,
        },
      ],
      initials: 'MK',
      rating: 5,
      text: 'The color is exactly as shown and the fabric moves beautifully. It was comfortable for a full day out.',
      verifiedPurchase: true,
    },
    {
      author: 'Nadia R.',
      date: 'May 30, 2025',
      id: 'review-nadia',
      images: [
        {
          accessibilityLabel: 'Front fit photo shared by Nadia',
          id: 'nadia-front',
          source: frontImage,
        },
        {
          accessibilityLabel: 'Back fit photo shared by Nadia',
          id: 'nadia-back',
          source: backImage,
        },
        {
          accessibilityLabel: 'Side fit photo shared by Nadia',
          id: 'nadia-side',
          source: sideImage,
        },
      ],
      initials: 'NR',
      rating: 4,
      text: 'A lovely everyday dress with a flattering cut. The sizing guide was accurate and the finish feels premium.',
      verifiedPurchase: true,
    },
  ],
  seller: {
    initial: 'A',
    name: 'AGSYBA Official Store',
    rating: 4.6,
  },
  services: [
    { icon: 'delivery', id: 'delivery-date', label: 'Get it by Thu, Jul 24' },
    { icon: 'return', id: 'easy-returns', label: '14 days easy return & exchange' },
    {
      icon: 'shipping',
      id: 'free-shipping',
      label: 'Free shipping on orders above AED 999',
    },
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  specifications: [
    { id: 'fabric', label: 'Fabric', value: 'Lightweight Chiffon' },
    { id: 'pattern', label: 'Pattern', value: 'Floral Print' },
    { id: 'fit', label: 'Fit', value: 'Regular' },
    { id: 'neck', label: 'Neck', value: 'V-Neck' },
    { id: 'sleeve', label: 'Sleeve', value: 'Short Sleeve' },
    { id: 'length', label: 'Length', value: 'Midi' },
    { id: 'occasion', label: 'Occasion', value: 'Casual/Brunch' },
    { id: 'wash-care', label: 'Wash Care', value: 'Machine Wash' },
  ],
} as const satisfies ProductDetail;

export const blushFloralWrapMidiDressPreview = {
  bestPrice: { amount: 892, currency: 'AED' },
  brand: blushFloralWrapMidiDress.brand,
  deliveryLabel: 'Delivery in 2–4 days',
  discountPercentage: blushFloralWrapMidiDress.discountPercentage,
  id: blushFloralWrapMidiDress.id,
  image: mainImage,
  imageAccessibilityLabel: blushFloralWrapMidiDress.images[0].accessibilityLabel,
  imageFit: 'contain',
  isFavorite: false,
  name: blushFloralWrapMidiDress.name,
  price: blushFloralWrapMidiDress.price,
  rating: blushFloralWrapMidiDress.rating,
  reviewCount: blushFloralWrapMidiDress.reviewCount,
} as const satisfies ProductPreview;
