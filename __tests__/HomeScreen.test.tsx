import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import HomeScreen from '../src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('../src/hooks/useTasks', () => ({
  __esModule: true,
  default: () => ({
    filteredTasks: [{id: '1', title: 'Test Task', completed: false}],
    addTask: jest.fn(),
    editTask: jest.fn(),
    deleteTask: jest.fn(),
    toggleComplete: jest.fn(),
    setFilter: jest.fn(),
    filter: 'All',
  }),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

describe('HomeScreen', () => {
  it('renders correctly and displays the title', () => {
    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <HomeScreen navigation={mockNavigation} />
      </NavigationContainer>,
    );

    expect(getByText('Task Manager')).toBeTruthy();

    expect(getByTestId('segmented-buttons')).toBeTruthy();
  });

  it('can toggle between filters', () => {
    const {getByText} = render(
      <NavigationContainer>
        <HomeScreen navigation={mockNavigation} />
      </NavigationContainer>,
    );

    expect(getByText('All')).toBeTruthy();

    fireEvent.press(getByText('Completed'));

    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });

  it('navigates to AddTask screen when FAB is pressed', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <HomeScreen navigation={mockNavigation} />
      </NavigationContainer>,
    );

    fireEvent.press(getByTestId('fab'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('AddTask', {
      onSubmit: expect.any(Function),
    });
  });

  it('displays tasks from filteredTasks', () => {
    const {getByText} = render(
      <NavigationContainer>
        <HomeScreen navigation={mockNavigation} />
      </NavigationContainer>,
    );

    expect(getByText('Test Task')).toBeTruthy();
  });
});
