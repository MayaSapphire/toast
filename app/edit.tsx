import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';


import { Button } from '@react-navigation/elements';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

function createTask(navigationParam: NavigationProp<ParamListBase>) {
  // there's almost certainly a better way to get the navigation prop
  // this solution works, though!
  const navigation = navigationParam;

  

  navigation.goBack();
}

export default function EditScreen() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  
  return (

    <View style={{flex:1}}>
      <ScrollView style={{
        padding:10,
      }}>
        <TextInput
        placeholder="Task name"
        // onChangeText={newText => setText(newText)} // how do i change the text?
        style={{
          height: 60,
          padding: 5,
          marginHorizontal: 8,
          borderWidth: 3,
          borderRadius: 10,
          fontSize:20,
        }}
      />
      </ScrollView>

      <View style={styles.containerBottom}>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.containerButtons}>
            <Button onPressOut={() => navigation.goBack()}>Cancel</Button>
          </View>
          <View style={styles.containerButtons}>
            <Button onPressOut={() => createTask(navigation)}>Create task</Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStart: {
    fontSize: 20,
  },
  containerBottom: {
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 0,
    position: "absolute",
    bottom: 0,
    justifyContent: 'center',
    width:"100%",
    padding: 0,
    paddingRight: 25,
    paddingBottom:50,
    elevation:1,
  },  
  containerButtons: {
    alignItems: 'center',
    flex: 1
  },
  containerButton: {
    flex: 0,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'lavender',
    padding: 20,
    marginBottom: 10,
    borderRadius:10,
  },
});
