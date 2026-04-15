import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Slider from '@react-native-community/slider';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { task } from '../types/task';

import { Button } from '@react-navigation/elements';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useTasks } from '../contexts/TasksContext';

function createTask(navigationParam: NavigationProp<ParamListBase>) {
  // there's almost certainly a better way to get the navigation prop
  // this solution works, though!
  const navigation = navigationParam;

  navigation.goBack();
}

type RootStackParamList = {
  index: undefined;
  about: undefined;
  settings: undefined;
  edit: { task?: task } | undefined;
};

type EditScreenProps = NativeStackScreenProps<RootStackParamList, 'edit'>;



export default function EditScreen({ navigation, route }: EditScreenProps) {
  const task = route.params?.task; // or route.params.taskId 
  const { updateTask } = useTasks();
  const [taskName, setTaskName] = useState(task?.name ?? '');
  const [importance, setImportance] = useState(task?.importance ?? 0);
  const [urgency, setUrgency] = useState(task?.urgency ?? 0);
  const [taskEnergy, setTaskEnergy] = useState(task?.energy ?? 0);

  function setText(newText: string): void {
    setTaskName(newText);
    if (task) {
      const updatedTask = { ...task, name: newText };
      updateTask(updatedTask);
    }
  }

  function updateImportance(newValue: number): void {
    setImportance(newValue);
    if (task) {
      const updatedTask = { ...task, importance: newValue };
      updateTask(updatedTask);
    }
  }

  function updateUrgency(newValue: number): void {
    setUrgency(newValue);
    if (task) {
      const updatedTask = { ...task, urgency: newValue };
      updateTask(updatedTask);
    }
  }

  function updateEnergy(newValue: number): void {
    setTaskEnergy(newValue);
    if (task) {
      const updatedTask = { ...task, energy: newValue };
      updateTask(updatedTask);
    }
  }

  return (

    <View style={{flex:1}}>
      <ScrollView style={{
        padding:10,
      }}>
        <TextInput
        placeholder="Task name"
        value={taskName}
        onChangeText={newText => setText(newText)} // how do i change the text?
        style={{
          height: 60,
          padding: 5,
          marginHorizontal: 8,
          borderWidth: 3,
          borderRadius: 10,
          fontSize:20,
          color: 'black',
        }}
      />

      <Text style={styles.titleText}>
        Task Importance
      </Text>
      <Slider
        style={{height: 40}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="purple"
        maximumTrackTintColor="black"
        thumbTintColor="purple"
        value={importance}
        onValueChange={updateImportance}
      />

      <Text style={styles.titleText}>
        Task Urgency
      </Text>
      <Slider
        style={{height: 40}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="purple"
        maximumTrackTintColor="black"
        thumbTintColor="purple"
        value={urgency}
        onValueChange={updateUrgency}
      />

      <Text style={styles.titleText}>
        Task Energy
      </Text>
      <Slider
        style={{height: 40}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="purple"
        maximumTrackTintColor="black"
        thumbTintColor="purple"
        value={taskEnergy}
        onValueChange={updateEnergy}
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
