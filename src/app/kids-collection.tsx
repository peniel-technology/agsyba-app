import { CollectionScreen } from '@/features/products/components/CollectionScreen';
import { collectionDefinitions } from '@/features/products/constants/collectionDefinitions';

export default function KidsCollectionScreen() {
  return <CollectionScreen collection={collectionDefinitions.kids} />;
}
