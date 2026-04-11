import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Slider from '@react-native-community/slider';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import { Button } from '@react-navigation/elements';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

type task = {
   id: Number,
   name: String,
   importance: Double,
   urgency: Double,
   energy: Double, 
  }




export default function HomeScreen () {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();


  const tasks = [{'name': "I'm an old task"}]; 

  return (
    <View style={{flex:1}}>

      <View style={{
            
            marginLeft: 10,
            marginRight: 10,
            marginBottom:130}}>

        <FlatList
          
        data={tasks}
        renderItem={({item}) => <Text style={styles.titleText}>{item.name}</Text>}/>
      </View>

      <View style={styles.containerBottom}>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>


          <View style={styles.containerSlider}>
            <View>
              <Text>
                Current Energy
              </Text>
            </View>
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="purple"
              maximumTrackTintColor="black"
              thumbTintColor="purple"
            />
          </View>
          <View style={{flex: 0,
  alignItems: 'center',}}>  
            
            <Button onPressOut={() => navigation.navigate('edit')
}> New task</Button>
            
          </View>

        </View>
      </View>
      
      
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
  containerSlider: {
    alignItems: 'center',
    flex: 1
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'lavender',
    padding: 20,
    marginBottom: 10,
    borderRadius:10,
  },
});

function onPressAddTask () {

  return;
  // modify task list
}  