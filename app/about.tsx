import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
      <View style={{
        marginLeft: 10,
        marginRight: 10,
        marginBottom:130}}
      >
        <Text style={styles.text}>About Toast</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    paddingTop:10,
  },
});
