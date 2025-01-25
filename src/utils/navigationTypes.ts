import {Task} from './types';

export type RootStackParamList = {
  Home: undefined;
  AddTask: {
    onSubmit: (task: Task) => void;
  };
  EditTask: {
    task: Task;
    onSubmit: (task: Task) => void;
  };
};
