import React from 'react';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import App from '../App'; // Path to your App component

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  NavigationContainer: ({children}: any) => children,
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn().mockReturnValue({
    Navigator: ({children}: any) => children,
    Screen: () => null,
  }),
}));

describe('App Component', () => {
  it('renders Home screen correctly', () => {
    const {toJSON} = render(
      <NavigationContainer>
        <App />
      </NavigationContainer>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders TaskForm screen when navigated to AddTask or EditTask', () => {
    // You can mock navigation and ensure the right components show up
    const {getByText} = render(
      <NavigationContainer>
        <App />
      </NavigationContainer>,
    );

    // Example of how to test navigation
    // You can use 'getByText' to find buttons or text that trigger navigation

    // Expect the Home screen to be rendered by default
    expect(getByText('Home')).toBeTruthy();

    // Simulate navigation (you would need actual buttons to trigger navigation in the real app)
    // For example, if there's a button like 'Add Task', simulate clicking it:
    // fireEvent.press(getByText('Add Task'));

    // Then you can check that TaskForm is rendered.
    expect(getByText('AddTask')).toBeTruthy();
  });
});
