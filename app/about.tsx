import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
      <View style={{
        marginLeft: 10,
        marginRight: 10,
        marginBottom:130}}
      >
        <Text style={styles.titleText}>Task Organizing Application for Sorting by Top-priority</Text>
        <Text style={styles.text}>Version 2026.6.19 - Created by MayaSapphire
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    paddingTop:20,
    paddingBottom:10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'sans-serif',
    paddingBottom:10,
    textAlign: 'center',}
  },
);
