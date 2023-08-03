import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { priorities, statuses, todo } from "../constants/constants";

interface addTodoData {
  title: string;
  status: statuses;
  desc: string;
  priority: priorities;
}

class Todo {
  todos: todo[] = [
    // {
    //   title: "test title",
    //   desc: "test desc",
    //   status: "doing",
    //   id: uuidv4(),
    //   priority: "High",
    // },
  ];
  isEditing: boolean = false;
  editingTodoId = "";

  constructor() {
    makeAutoObservable(this);
  }

  addTodo = (todoData: addTodoData) => {
    const newTodos = {
      status: todoData.status,
      title: todoData.title,
      desc: todoData.desc,
      priority: todoData.priority,
      id: uuidv4(),
    };
    this.todos.push(newTodos);
  };

  updateTodo = (id: string, updatedTodo: addTodoData) => {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...updatedTodo, id } : todo
    );
  };

  handleIsEditing = (id: string, editStatus: boolean) => {
    this.isEditing = editStatus;
    this.editingTodoId = id;
  };

  removeTodo = (id: string) => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };

  completeTodo = (id: string) => {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, status: "done" } : todo
    );
  };
}

export default new Todo();
