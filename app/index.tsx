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

import Task from '../components/task';
import { task } from '../types/task';



export default function HomeScreen () {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();


  const tasks: task[] = [
    {id: 1, name: "Long long long long long long long long long task name", importance: 0.1, urgency: 0.2, energy: 0.4 },  
    {id: 2, name: "Task 2", importance: 0.3, urgency: 0.6, energy: 0.3 },  
    {id: 3, name: "Task 3", importance: 0.7, urgency: 0.5, energy: 0.2 },  
    {id: 4, name: "Task 4", importance: 0.1, urgency: 0.2, energy: 0.4 },  
    {id: 5, name: "Task 5", importance: 0.3, urgency: 0.6, energy: 0.3 },  
    {id: 6, name: "Task 6", importance: 0.7, urgency: 0.5, energy: 0.2 },  
    {id: 7, name: "Task 7", importance: 0.1, urgency: 0.2, energy: 0.4 },  
    {id: 8, name: "Task 8", importance: 0.3, urgency: 0.6, energy: 0.3 },  
    {id: 9, name: "Task 9", importance: 0.7, urgency: 0.5, energy: 0.2 },  
    {id: 10, name: "Task 10", importance: 0.1, urgency: 0.2, energy: 0.4 },  
    {id: 11, name: "Task 11", importance: 0.3, urgency: 0.6, energy: 0.3 },  
    {id: 12, name: "Task 12", importance: 0.7, urgency: 0.5, energy: 0.2 },  
  ]; 

  return (
    <View style={{flex:1}}>

      <View style={{
        marginLeft: 10,
        marginRight: 10,
        marginBottom:130
      }}>

        <FlatList
          
        data={tasks}
        renderItem={({item}) => <Task task={item} />}/>
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
            
            <Button onPress={() => navigation.navigate('edit')}>New task</Button>
            
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