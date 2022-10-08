export interface ITodo {
  _id: any;
  title: string;
  comment?: string;
  completed: boolean;
  dueDate?: Date;
  created: Date;
  updated: Date;
}

export type TodoCreate = Pick<ITodo, 'title'>;
