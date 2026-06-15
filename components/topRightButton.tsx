import { RelativePathString, router } from 'expo-router';

import { Image, TouchableOpacity, View } from 'react-native';

export default function topRightButton(image: any, dest: RelativePathString) {
  // require() cannot take a dynamic string. Accept either a static require result (number)
  // or a URI string. Convert to the shape Image.source expects.
  const source = typeof image === 'number' ? image : { uri: image };

  return <View>
    <TouchableOpacity
      style={{ paddingHorizontal: 10 }}
      onPress={() => {
        router.push(dest); // example: ./about
      }}
    >
      <Image
        source={source}
        style={{ width: 24, height: 24 }}
      />
        </TouchableOpacity> 
  </View>

}