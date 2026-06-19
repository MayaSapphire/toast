import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTasks } from '../contexts/TasksContext';
import { Task } from "../types/task";


const TaskComponent = ({ task }: { task: Task }) => {
  const { tasks, setTasks, updateTask } = useTasks();
    
  const router = useRouter();


  function deleteTask(): void {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
    router.back();
  }

  function updateImportance(newValue: number): void {
    task.setImportance(newValue);
  }

  function updateUrgency(newValue: number): void {
    task.setUrgency(newValue);
  }
    
  function updateUrgencyChangeRate(newValue: number): void {
    task.setUrgencyChangeRate(newValue);
  }
    
  function updateEnergy(newValue: number): void {
    task.setEnergy(newValue);
  }

  return (
    <TouchableOpacity style={{ padding: 10 }} onLongPress={deleteTask}>
      <Text style={styles.titleText}>{task.name}</Text>
      <View style={{flexDirection: 'column', justifyContent: 'space-between', paddingRight: 20, paddingLeft: 20}}>
        <View style={{flexDirection: 'row',}}>
          <View style={{width:75}}>
            <Text style={styles.label}>Importance</Text> 
          </View>
          <Slider
            style={{height:20, width:200}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="purple"
            maximumTrackTintColor="black"
            thumbTintColor="purple"
            value={task.importance}
            onValueChange={updateImportance}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width:75}}>
            <Text style={styles.label}>Urgency</Text> 
          </View>
          {task.urgencyType !== 'startdate-deadline' && (
          <Slider
            style={{height:20, width:200}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="purple"
            maximumTrackTintColor="black"
            thumbTintColor="purple"
            value={task.urgency}
            onValueChange={updateUrgency}
          />)}
          {task.urgencyType === 'startdate-deadline' && (
          <Text style={[styles.label, { paddingLeft: 10 }]}>
            Deadline: {task.endDate 
              ? new Date(task.endDate).toLocaleDateString() 
              : 'No deadline'
            }
          </Text>                
            )}
        </View>
        <View style={{flexDirection: 'row',}}>
          <View style={{width:75}}>
            <Text style={styles.label}>Energy</Text> 
          </View>
          <Slider
            style={{height: 20, width:200, }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="purple"
            maximumTrackTintColor="black"
            thumbTintColor="purple"
            value={task.energy}
            onValueChange={updateEnergy}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'right',
  },
});

export default TaskComponent;