import { StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={{
      marginLeft: 10,
      marginRight: 10,
      marginBottom:130}}
    >
      <Text style={styles.titleText}>This screen is a placeholder...for now</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    paddingTop:10,
  },
});
