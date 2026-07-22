import { View } from 'react-native';

import { SearchForm } from '@/components/forms/SearchForm';

interface DrawerSearchFormProps {
  onSubmit?: (query: string) => void;
}

export function DrawerSearchForm({ onSubmit }: DrawerSearchFormProps) {
  return (
    <View className="px-4 pb-3">
      <SearchForm onSubmit={onSubmit} />
    </View>
  );
}
