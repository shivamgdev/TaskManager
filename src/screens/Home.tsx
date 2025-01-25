import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FAB, Appbar, SegmentedButtons} from 'react-native-paper';
import TaskList from '../components/TaskList';
import useTasks from '../hooks/useTasks';

const HomeScreen: React.FC = ({navigation}: any) => {
  const {
    filteredTasks,
    addTask,
    editTask,
    deleteTask,
    toggleComplete,
    setFilter,
    filter,
  } = useTasks();

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Task Manager" />
      </Appbar.Header>
      <View style={styles.container}>
        <SegmentedButtons
          value={filter}
          onValueChange={value =>
            setFilter(value as 'All' | 'Completed' | 'Incomplete')
          }
          buttons={[
            {value: 'All', label: 'All'},
            {value: 'Completed', label: 'Completed'},
            {value: 'Incomplete', label: 'Incomplete'},
          ]}
          style={styles.filterButtons}
        />
        <TaskList
          tasks={filteredTasks}
          onEdit={task =>
            navigation.navigate('EditTask', {task, onSubmit: editTask})
          }
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
        />
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate('AddTask', {onSubmit: addTask})}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 50,
  },
  filterButtons: {
    marginBottom: 16,
  },
});

export default HomeScreen;
