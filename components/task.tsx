import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTasks } from '../contexts/TasksContext';
import { task } from "../types/task";


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

  const updateUrgencyType = (value: string) => {
    updateTask({ ...task, urgencyType: value});
  }
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
                <Slider
                    style={{height:20, width:200}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="purple"
                    maximumTrackTintColor="black"
                    thumbTintColor="purple"
                    value={task.urgency}
                    onValueChange={updateUrgency}
                />
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
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    paddingTop: 20,
  },
  label: {
    alignSelf: 'flex-end'
  }
});

export default Task;