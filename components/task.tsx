import Slider from '@react-native-community/slider';
import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { task } from "../types/task";


const Task = ({ task }: { task: task }) => {
  return <View style={{marginRight:20}}>
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
            />
        </View>
    </View>
  </View>;
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