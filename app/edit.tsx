import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';

import DateTimePicker from 'react-native-ui-datepicker';

import PurpleSlider from '../components/PurpleSlider';
import { useRouter, useLocalSearchParams } from 'expo-router';
import type { task } from '../types/task';
import { useTasks } from '../contexts/TasksContext';
import Dropdown from 'react-native-input-select';

import dayjs, { Dayjs } from 'dayjs';

export default function EditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { tasks, setTasks, updateTask } = useTasks();
  const taskId = id ? Number(id) : undefined;
  const currentTask = taskId ? tasks.find(t => t.id === taskId) : undefined;
  const [taskName, setTaskName] = useState(currentTask?.name ?? '');
  const [importance, setImportance] = useState(currentTask?.importance ?? 0);
  const [urgency, setUrgency] = useState(currentTask?.urgency ?? 0);
  const [urgencyType, setUrgencyType] = useState(currentTask?.urgencyType ?? "fixed");
  const [taskEnergy, setTaskEnergy] = useState(currentTask?.energy ?? 0);
  const [taskStartDate, setTaskStartDate] = useState(currentTask?.startDate ?? new Date());
  const [taskEndDate, setTaskEndDate] = useState(currentTask?.endDate ?? new Date());
  const [urgencyChangeRate, setUrgencyChangeRate] = useState(currentTask?.urgencyChangeRate ?? 0);
  const [date, setDate] = useState<Dayjs>(dayjs());


  function setText(newText: string): void {
    setTaskName(newText);
    if (currentTask) {
      const updatedTask = { ...currentTask, name: newText };
      updateTask(updatedTask);
    }
  }

  function saveTask(): void {
    const updatedTask: task = {
      id: currentTask?.id ?? (tasks.reduce((maxId, current) => Math.max(maxId, current.id), 0) + 1),
      name: taskName,
      importance,
      urgency,
      energy: taskEnergy,
      isCompleted: currentTask?.isCompleted ?? false,
      urgencyType: urgencyType,
      startDate: taskStartDate,
      endDate: taskEndDate,
      urgencyChangeRate: urgencyChangeRate,
    };

    if (currentTask) { // if the task already exists, update it
      updateTask(updatedTask);
    } else {
      setTasks(prevTasks => [...prevTasks, updatedTask]);
    }

    router.back();
  }

  function deleteTask(): void {
    if (currentTask) {
      setTasks(prevTasks => prevTasks.filter(t => t.id !== currentTask.id));
    }
    router.back();
  }

  function updateImportance(newValue: number): void {
    setImportance(newValue);
    if (currentTask) {
      const updatedTask = { ...currentTask, importance: newValue };
      updateTask(updatedTask);
    }
  }

  function updateUrgency(newValue: number): void {
    setUrgency(newValue);
    if (currentTask) {
      const updatedTask = { ...currentTask, urgency: newValue };
      updateTask(updatedTask);
    }
  }

  function updateUrgencyType(newValue: string): void {
    setUrgencyType(newValue);
    if (currentTask) {
      const updatedTask = { ...currentTask, urgencyType: newValue };
      updateTask(updatedTask);
    }
  }

  function updateUrgencyChangeRate(newValue: number): void {
    setUrgencyChangeRate(newValue);
    if (currentTask) {
      const updatedTask = { ...currentTask, updateUrgencyChangeRate: newValue };
      updateTask(updatedTask);
    }
  }

  function updateEnergy(newValue: number): void {
    setTaskEnergy(newValue);
    if (currentTask) {
      const updatedTask = { ...currentTask, energy: newValue };
      updateTask(updatedTask);
    }
  }

  function updateStartDate(newValue: Date): void {
    setTaskStartDate(newValue);
    if (currentTask) {
      const updatedTask = { ...currentTask, startDate: newValue };
      updateTask(updatedTask);
    }
  } 

  function updateEndDate(newValue: Date): void {
    setTaskEndDate(newValue);
    if (currentTask) {
      const updatedTask = { ...currentTask, endDate: newValue };
      updateTask(updatedTask);
    }
  }

  return (

    <View style={{flex:1}}>
      <View
        style={{
          flex: 1,
          marginBottom: 140,
          paddingBottom: 0,
      }}>
        <ScrollView
          style={{
            padding: 10,
            paddingTop: 30,
          }}
          contentContainerStyle={{
            paddingBottom: 50,
          }}>
          <TextInput
          placeholder="Task name"
          value={taskName}
          onChangeText={newText => setText(newText)}
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
          <Button color="purple" onPress={() => setImportance(0.25)} title="Low" />
          <Button color="purple" onPress={() => setImportance(0.5)} title="Medium" />
          <Button color="purple" onPress={() => setImportance(0.75)} title="High" />
        </View>
        <PurpleSlider
          value={importance}
          onValueChange={updateImportance}
        />

        <Text style={styles.titleText}>
          Task Urgency
        </Text>
        <Dropdown
          label="Select urgency behavior:"
          labelStyle={styles.pText}
          options={[
            { label: 'Do not change', value: 'fixed' },
            { label: 'Gradually increase over time', value: 'gradual' },
            { label: 'Use deadline', value: 'startdate-deadline' },
          ]}
          selectedValue={urgencyType ?? 'fixed'}
          onValueChange={(urgencyType) => updateUrgencyType(urgencyType as string)}
          primaryColor={'purple'}
          isMultiple={false}
        /> 

        {urgencyType === 'fixed' && (
          <Text style={styles.pText}>How urgent should the task be?</Text>
        )}
        {urgencyType === 'gradual' && (
          <Text style={styles.pText}>How urgent should the task be at the start?</Text>
          )}
        {(urgencyType === 'fixed' || urgencyType === 'gradual') && (

          <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingTop: 15}}>
              <Button color="purple" onPress={() => setUrgency(0.25)} title="Low" />
              <Button color="purple" onPress={() => setUrgency(0.5)} title="Medium" />
              <Button color="purple" onPress={() => setUrgency(0.75)} title="High" />
            </View>
            <PurpleSlider
              value={urgency}
              onValueChange={updateUrgency}
            />
          </View>
        )}

        {urgencyType === 'gradual' && (<>
          <Text style={styles.pText}>How much urgency should the task gain every day?</Text>
          
        
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingTop: 15}}>
              <Button color="purple" onPress={() => setUrgencyChangeRate(0.1)} title="Low" />
              <Button color="purple" onPress={() => setUrgencyChangeRate(0.2)} title="Medium" />
              <Button color="purple" onPress={() => setUrgencyChangeRate(0.3)} title="High" />
            </View>
            <PurpleSlider
              value={urgencyChangeRate}
              onValueChange={updateUrgencyChangeRate}
            />
          </View>
        </>)}

        {urgencyType === 'startdate-deadline' && (
          <View>
            <Text style={styles.pText}>When is the task deadline?</Text>
            <DateTimePicker
              calendar="gregory"
              mode="range"
              startDate={taskStartDate}
              endDate={taskEndDate}
              navigationPosition="around"
              onChange={(params: any) => {
                const pickedStart: Date | undefined = params?.startDate;
                const pickedEnd: Date | undefined = params?.endDate;
                if (pickedStart) updateStartDate(new Date(pickedStart));
                if (pickedEnd) updateEndDate(new Date(pickedEnd));
              }}
              styles={{
                today: { borderColor: 'purple', borderWidth: 1 },
                selected: { backgroundColor: 'purple' },
                selected_label: { color: 'white' },
                range_middle: { backgroundColor: 'lavender' },
              }}
            />
          </View>
        )}

        <Text style={styles.titleText}>
          Task Energy
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
            <Button color="purple" onPress={() => setTaskEnergy(0.25)} title="Low" />
            <Button color="purple" onPress={() => setTaskEnergy(0.5)} title="Medium" />
            <Button color="purple" onPress={() => setTaskEnergy(0.75)} title="High" />
        </View>

        <PurpleSlider
          value={taskEnergy}
          onValueChange={updateEnergy}
        />

        <View style={styles.button}>
          {currentTask && 
            <Button onPress={deleteTask} 
                    color="purple" 
                    title="Mark as completed" 
            /> 
            
          }
        </View>
        
        <View style={styles.button}>
          {currentTask && 
            <Button onPress={deleteTask} 
                    color="red" 
                    title="Delete task" 
            /> 
            
          }
        </View>
          


        </ScrollView>
      </View>
      <View style={styles.containerBottom}>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.containerButtons}>
            <Button color="gray" onPress={() => router.back()} title="Cancel" />
          </View>

          <View style={styles.containerButtons}>
            <Button color="purple" onPress={saveTask} title={currentTask ? 'Save task' : 'Create task'} />
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
    paddingTop:20,
    paddingBottom:10,
  },
  pText: {
    fontSize: 14,
    fontFamily: 'sans-serif',
    color: 'black',
    padding: 0,
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
    paddingBottom:60,
    elevation:1,
  },  
  containerButtons: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  containerButton: {
    flex: 0,
    alignItems: 'center',
    padding: 10,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    paddingTop: 10,
    marginBottom: 0,
    borderRadius:10,
  },
});
