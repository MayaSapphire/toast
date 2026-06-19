import React from 'react';
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import PurpleSlider from '../components/PurpleSlider';
import { useRouter } from 'expo-router';
import { Button } from 'react-native';

import TaskComponent from '../components/task';
import { useEnergy } from '../contexts/EnergyContext';
import { useTasks } from '../contexts/TasksContext';
import { Task } from '../types/task';

export default function HomeScreen () {
  const router = useRouter();
  const { energy, setEnergy } = useEnergy();
  const { tasks } = useTasks();
  const [showingAllTasks, setShowingAllTasks] = React.useState(false);


  const setPersistentData = async (id: string, value: string) => {
    // Set some data persistently using AsyncStorage.
    await AsyncStorage.setItem(id, value);
  };
  
  const getPersistentData = async (id: string) => {
    // Get the data back from AsyncStorage.
    return await AsyncStorage.getItem(id);
  };

  getPersistentData('taskList');

  var doableTasks = getDoableTasks(tasks, energy, showingAllTasks);
  return (
    <View style={{flex:1}}>

      <View style={{
        marginLeft: 10,
        marginRight: 10,
        marginBottom:185
      }}>

        <FlatList
          
        data={doableTasks.sort((a, b) => {
          if (a.urgencyType === 'startdate-deadline' || b.urgencyType === 'startdate-deadline') {
            const aDeadline = new Date(a.endDate).getTime();
            if (isNaN(aDeadline)) return 1; // Treat tasks without a valid deadline as less urgent
            const bDeadline = new Date(b.endDate).getTime();
            if (isNaN(bDeadline)) return -1; // Treat tasks without a valid deadline as less urgent
            return aDeadline - bDeadline; // Sort by deadline in ascending order
          }
          const aScore = a.importance * a.urgency;
          const bScore = b.importance * b.urgency;
          return bScore - aScore; // Sort in descending order
        })}
        renderItem={({item}) => <TaskComponent task={item} />}/>
      </View>


      {tasks.length === 0 && (
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Text style={styles.titleText}>There are no tasks.</Text>
        </View>
      )}
      {doableTasks.length === 0 && tasks.length > 0 && (
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Text style={styles.titleText}>Need more energy to do any tasks.</Text>
        </View>
      )}

      <View style={styles.containerBottom}>
        <View style={{
          flexDirection: 'row', 
          alignItems: 'center',

          paddingTop: 0,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20,
        }}>
          <Switch 
            trackColor={{false: 'black', true: 'purple'}}
            thumbColor={'purple'}
            value={showingAllTasks}
            onValueChange={setShowingAllTasks}
          />
          <Text>Show all tasks</Text>
        </View>

        <View style={{flexDirection: 'row'}}>


          <View style={styles.containerSlider}>
            <View>
              <Text>
                Current Energy
              </Text>
            </View>
            <PurpleSlider
              onValueChange={setEnergy}
              value={energy}
            />
          </View>
          <View style={{flex: 0,
  alignItems: 'center',}}>  
            
            <Button color="purple" onPress={() => router.push('/edit')} title="New task" />
            
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
    flex: 1,
    width: 800,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'lavender',
    padding: 20,
    marginBottom: 10,
    borderRadius:10,
  },
});



function getDoableTasks (tasks: Task[], energy: number, showingAllTasks: boolean) {
  if (showingAllTasks) {
    return tasks;
  }
  var doableTasks: Task[] = [];
  for (let task of tasks) {
    if (task.energy <= energy) {
      doableTasks.push(task);
    }
  }
  return doableTasks;
}
