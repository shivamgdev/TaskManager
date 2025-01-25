import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, IconButton} from 'react-native-paper';
import {FlatList} from 'react-native';
import {Task} from '../utils/types';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const renderTask = ({item}: {item: Task}) => (
    <Card style={styles.card} key={item.id}>
      <Card.Title
        title={item.title}
        titleStyle={item.completed ? styles.completed : null}
        // eslint-disable-next-line react/no-unstable-nested-components
        right={props => (
          <View style={styles.actionIcons}>
            <IconButton
              {...props}
              icon={item.completed ? 'check-circle' : 'circle-outline'}
              onPress={() => onToggleComplete(item.id)}
            />
            <IconButton {...props} icon="pencil" onPress={() => onEdit(item)} />
            <IconButton
              {...props}
              icon="delete"
              onPress={() => onDelete(item.id)}
            />
          </View>
        )}
      />
      <Card.Content>
        <Text>{item.description}</Text>
      </Card.Content>
    </Card>
  );

  return tasks.length ? (
    <FlatList
      data={tasks}
      renderItem={renderTask}
      keyExtractor={item => item.id}
    />
  ) : (
    <Text style={styles.noTasks}>No tasks available</Text>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  actionIcons: {
    flexDirection: 'row',
  },
  noTasks: {
    textAlign: 'center',
    marginTop: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default TaskList;
