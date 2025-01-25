import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './src/utils/navigationTypes';
import HomeScreen from './src/screens/Home';
import TaskForm from './src/components/TaskForm';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddTask" component={TaskForm} />
        <Stack.Screen name="EditTask" component={TaskForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
