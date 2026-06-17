import Slider from '@react-native-community/slider';
import { View } from 'react-native';

export default function PurpleSlider({ value, onValueChange }: { value: number; onValueChange: (value: number) => void }) {
  return (
    <View style={{ alignSelf: 'stretch' }}>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="purple"
        maximumTrackTintColor="black"
        thumbTintColor="purple"
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
}