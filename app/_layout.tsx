import { Stack } from 'expo-router';

import { EnergyProvider } from '../contexts/EnergyContext';
import { TasksProvider } from '../contexts/TasksContext';
import topRightButton from '../components/topRightButton';


export default function Layout() {
  return (
    <EnergyProvider>
      <TasksProvider>
        <Stack>
          <Stack.Screen
            name = "index"
            options={{
              title: 'Task list',
              headerRight: () => topRightButton(require('../assets/images/Cogwheel.png'), './settings'),
            }}
          />

          <Stack.Screen 
          name = "about"
          options={{ title: 'About' }} />

          <Stack.Screen
            name="settings"
            options={{
              title: 'Settings',
              headerRight: () => topRightButton(require('../assets/images/info.png'), './about'),
            }}
          />

          <Stack.Screen 
          name="edit"
          options={{ title: 'Edit task' }} />
        </Stack>
      </TasksProvider>
    </EnergyProvider>
  );
}
