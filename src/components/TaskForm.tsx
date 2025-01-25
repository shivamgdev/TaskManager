import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Appbar} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Task} from '../utils/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../utils/navigationTypes';

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  initialValues?: Partial<Task>;
}

type AddTaskProps = NativeStackScreenProps<RootStackParamList, 'AddTask'>;
type EditTaskProps = NativeStackScreenProps<RootStackParamList, 'EditTask'>;

const TaskForm: React.FC<TaskFormProps> = () => {
  const navigation = useNavigation();
  const route = useRoute<AddTaskProps['route'] | EditTaskProps['route']>();

  const {onSubmit} = route?.params as
    | AddTaskProps['route']['params']
    | EditTaskProps['route']['params'];
  const task =
    (route?.params as EditTaskProps['route']['params'])?.task || undefined;

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');

  const handleSubmit = () => {
    if (!title.trim()) {
      return;
    }

    onSubmit({
      id: task?.id || Math.random().toString(),
      title,
      description,
      completed: task?.completed || false,
    });
    navigation.goBack();
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Task Form" />
      </Appbar.Header>
      <View style={styles.container}>
        <TextInput
          label="Task Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          mode="outlined"
          placeholder="Enter task title"
        />
        <TextInput
          label="Task Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          mode="outlined"
          placeholder="Enter task description"
          multiline
        />
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Save Task
        </Button>
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
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default TaskForm;
