import { ActivityIndicator, View } from 'react-native';

interface LoaderProps {
  label?: string;
}

export function Loader({ label = 'Loading' }: LoaderProps) {
  return (
    <View
      accessibilityLabel={label}
      accessibilityRole="progressbar"
      className="items-center justify-center p-6"
    >
      <ActivityIndicator color="#2563EB" size="large" />
    </View>
  );
}
