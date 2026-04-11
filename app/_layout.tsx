import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AboutScreen from './about';
import EditScreen from './edit';
import HomeScreen from './index';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="index" component={HomeScreen} options={{ title: 'Task list' }} />
      <Stack.Screen name="about" component={AboutScreen} options={{ title: 'About' }} />
      <Stack.Screen name="edit" component={EditScreen} options={{ title: 'Edit task' }} />
    </Stack.Navigator>
  );
}
