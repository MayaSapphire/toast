import React from 'react';
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';

import Slider from '@react-native-community/slider';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import { Button } from '@react-navigation/elements';

import Task from '../components/task';
import { useEnergy } from '../contexts/EnergyContext';
import { useTasks } from '../contexts/TasksContext';
import { task } from '../types/task';



export default function HomeScreen () {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  var { energy } = useEnergy();
  var { tasks } = useTasks();
  var [showingAllTasks, setShowingAllTasks] = React.useState(false);


  var doableTasks = getDoableTasks(tasks, energy);
  return (
    <View style={{flex:1}}>

      <View style={{
        marginLeft: 10,
        marginRight: 10,
        marginBottom:130
      }}>

        <FlatList
          
        data={doableTasks}
        renderItem={({item}) => <Task task={item} />}/>
      </View>



      <View style={styles.containerBottom}>
        <View style={{
          flexDirection: 'row', 
          alignContent:'center', 
          paddingTop: 10,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}>
          <Switch 
            trackColor={{false: 'black', true: 'purple'}}
            thumbColor={'purple'}
            value={showingAllTasks}
            onValueChange={setShowingAllTasks}
            onChange={(value) => console.log(value)}

          > </Switch>
          <Text>Show all tasks</Text>
        </View>

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
              onSlidingComplete={(value) => energy = value}
              onValueChange={(value) => console.log(value)}
              value={energy}
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
    paddingTop:20,
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


function getDoableTasks (tasks: task[], energy: number) {
  var doableTasks: task[] = [];
  for (let task of tasks) {
    if (task.energy <= energy) {
      doableTasks.push(task);
    }
  }
  return doableTasks;
}
