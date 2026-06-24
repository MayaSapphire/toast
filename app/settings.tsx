import { Button, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';

export default function SettingsScreen() {

  function exportTasks() {
    Alert.alert('Function not implemented', 'Export tasks functionality is not yet implemented. Please check back later.');
  }


  function importTasks() {
    Alert.alert('Function not implemented', 'Import tasks functionality is not yet implemented. Please check back later.');
  }

  return (
    <ScrollView style={{
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      marginBottom:130}}
    >
      <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10}}>
        <Button color="purple" onPress={importTasks} title="Import tasks" />
        <Button color="purple" onPress={exportTasks} title="Export tasks" />
      </View>
    </ScrollView>
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
