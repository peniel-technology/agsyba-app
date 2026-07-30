import type {
  ProductFilterSection,
  ProductFilterSelections,
} from '@/features/products/types/productFilters';

export const productFilterSections = [
  {
    id: 'quickFilters',
    label: 'Quick Filters',
    options: [
      { id: 'top-brands', label: 'Top Brands' },
      { id: 'top-rated', label: 'Top Rated' },
    ],
  },
  {
    id: 'size',
    label: 'Size',
    options: [
      { id: 'xs', label: 'XS' },
      { id: 's', label: 'S' },
      { id: 'm', label: 'M' },
      { id: 'l', label: 'L' },
      { id: 'xl', label: 'XL' },
    ],
  },
  {
    id: 'color',
    label: 'Color',
    options: [
      { id: 'black', label: 'Black' },
      { id: 'white', label: 'White' },
      { id: 'blue', label: 'Blue' },
      { id: 'beige', label: 'Beige' },
      { id: 'red', label: 'Red' },
    ],
  },
  {
    id: 'brand',
    label: 'Brand',
    options: [
      { id: 'agsyba', label: 'AGSYBA' },
      { id: 'zara', label: 'ZARA' },
      { id: 'cos', label: 'COS' },
      { id: 'hm', label: 'H&M' },
      { id: 'nike', label: 'NIKE' },
    ],
  },
  {
    id: 'categories',
    label: 'Categories',
    options: [
      { id: 'clothing', label: 'Clothing' },
      { id: 'footwear', label: 'Footwear' },
      { id: 'accessories', label: 'Accessories' },
    ],
  },
  {
    id: 'priceRange',
    label: 'Price Range',
    options: [
      { id: 'under-100', label: 'Under AED 100' },
      { id: '100-250', label: 'AED 100 - 250' },
      { id: '250-500', label: 'AED 250 - 500' },
      { id: 'above-500', label: 'Above AED 500' },
    ],
  },
  {
    id: 'discount',
    label: 'Discount',
    options: [
      { id: '10-plus', label: '10% and above' },
      { id: '20-plus', label: '20% and above' },
      { id: '30-plus', label: '30% and above' },
      { id: '40-plus', label: '40% and above' },
    ],
  },
  {
    id: 'rating',
    label: 'Rating',
    options: [
      { id: '4-plus', label: '4★ and above' },
      { id: '3-plus', label: '3★ and above' },
      { id: '2-plus', label: '2★ and above' },
    ],
  },
  {
    id: 'deliveryTime',
    label: 'Delivery Time',
    options: [
      { id: 'same-day', label: 'Same Day' },
      { id: 'two-days', label: 'Within 2 Days' },
      { id: 'one-week', label: 'Within 1 Week' },
    ],
  },
  {
    id: 'tshirts',
    label: 'Tshirts',
    options: [
      { id: 'crew-neck', label: 'Crew Neck' },
      { id: 'polo', label: 'Polo' },
      { id: 'oversized', label: 'Oversized' },
    ],
  },
  {
    id: 'fabrics',
    label: 'Fabrics',
    options: [
      { id: 'cotton', label: 'Cotton' },
      { id: 'linen', label: 'Linen' },
      { id: 'chiffon', label: 'Chiffon' },
      { id: 'denim', label: 'Denim' },
    ],
  },
  {
    id: 'fashionTrends',
    label: 'Fashion Trends',
    options: [
      { id: 'new-season', label: 'New Season' },
      { id: 'minimal', label: 'Minimal' },
      { id: 'street-style', label: 'Street Style' },
    ],
  },
  {
    id: 'occasions',
    label: 'Occasions',
    options: [
      { id: 'casual', label: 'Casual' },
      { id: 'formal', label: 'Formal' },
      { id: 'party', label: 'Party' },
      { id: 'sports', label: 'Sports' },
    ],
  },
  {
    id: 'patterns',
    label: 'Patterns',
    options: [
      { id: 'solid', label: 'Solid' },
      { id: 'striped', label: 'Striped' },
      { id: 'floral', label: 'Floral' },
      { id: 'checked', label: 'Checked' },
    ],
  },
  {
    id: 'printOrPattern',
    label: 'Print or Pattern',
    options: [
      { id: 'printed', label: 'Printed' },
      { id: 'embroidered', label: 'Embroidered' },
      { id: 'textured', label: 'Textured' },
    ],
  },
] as const satisfies readonly ProductFilterSection[];

export function createEmptyProductFilterSelections(): ProductFilterSelections {
  return {
    brand: [],
    categories: [],
    color: [],
    deliveryTime: [],
    discount: [],
    fabrics: [],
    fashionTrends: [],
    occasions: [],
    patterns: [],
    priceRange: [],
    printOrPattern: [],
    quickFilters: [],
    rating: [],
    size: [],
    tshirts: [],
  };
}
