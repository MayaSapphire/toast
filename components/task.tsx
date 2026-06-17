import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTasks } from '../contexts/TasksContext';
import { task } from "../types/task";
import dayjs from 'dayjs';


const Task = ({ task }: { task: task }) => {
  const router = useRouter();
  const { updateTask } = useTasks();

  const updateImportance = (value: number) => {
    updateTask({ ...task, importance: value });
  };

  const updateUrgency = (value: number) => {
    updateTask({ ...task, urgency: value });
  };

  const updateEnergy = (value: number) => {
    updateTask({ ...task, energy: value });
  };
  return(
    <TouchableOpacity
        onPress={() => {
        router.push({ pathname: '/edit', params: { id: task.id.toString() } });
        }}
    >
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
                        ? formatDeadline(task.endDate) 
                        : 'No deadline'}
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

function formatDeadline(date: any): string {
  try {
    // If it's a Dayjs object, use format method
    if (date && typeof date.format === 'function') {
      return date.format('MM/DD/YYYY');
    }
    // Otherwise convert to Date and use toLocaleDateString
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString();
    }
    return 'Invalid date';
  } catch {
    return 'Invalid date';
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    paddingTop: 20,
  },
  label: {
    alignSelf: 'flex-end'
  }
});

export default Task;