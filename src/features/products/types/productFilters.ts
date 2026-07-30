export type ProductFilterSectionId =
  | 'quickFilters'
  | 'size'
  | 'color'
  | 'brand'
  | 'categories'
  | 'priceRange'
  | 'discount'
  | 'rating'
  | 'deliveryTime'
  | 'tshirts'
  | 'fabrics'
  | 'fashionTrends'
  | 'occasions'
  | 'patterns'
  | 'printOrPattern';

export type ProductFilterSelections = Readonly<Record<ProductFilterSectionId, readonly string[]>>;

export interface ProductFilterOption {
  id: string;
  label: string;
}

export interface ProductFilterSection {
  id: ProductFilterSectionId;
  label: string;
  options: readonly ProductFilterOption[];
}
