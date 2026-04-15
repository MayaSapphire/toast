import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Image, TouchableOpacity, View } from 'react-native';
import { EnergyProvider } from '../contexts/EnergyContext';
import { TasksProvider } from '../contexts/TasksContext';
import AboutScreen from './about';
import EditScreen from './edit';
import HomeScreen from './index';
import SettingsScreen from './settings';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <EnergyProvider>
      <TasksProvider>
        <Stack.Navigator>
      <Stack.Screen name="index" component={HomeScreen} options={({ navigation, route }) => ({
            title: 'Task list',
            headerRight: () => (
              <View>
                <TouchableOpacity
                  style={{ paddingHorizontal: 10 }}
                  onPress={() => {
                    navigation.navigate('settings');
                  }}
                >
                  <Image 
                    source={require('../assets/images/Cogwheel.png')}
                    style={{ width: 24, height: 24 }}
                  />
                </TouchableOpacity> 
              </View>
            )
          })}
      />

      <Stack.Screen name="about" component={AboutScreen} options={{title:"About"}}/>
      <Stack.Screen name="settings" component={SettingsScreen} options={({ navigation, route }) => ({
            title: 'Settings',
            headerRight: () => (
              <View>
                <TouchableOpacity
                  style={{ paddingHorizontal: 10 }}
                  onPress={() => {
                    navigation.navigate('about');
                  }}
                >
                  <Image 
                    source={require('../assets/images/info.png')}
                    style={{ width: 24, height: 24 }}
                  />
                </TouchableOpacity> 
              </View>
            )
          })}
      />
      <Stack.Screen name="edit" component={EditScreen} options={{ title: 'Edit task' }} />
    </Stack.Navigator>
      </TasksProvider>
    </EnergyProvider>
  );
}
