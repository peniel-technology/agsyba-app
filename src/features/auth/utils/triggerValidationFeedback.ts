import { Vibration } from 'react-native';

export function triggerValidationFeedback() {
  Vibration.vibrate(120);
}
