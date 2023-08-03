import { makeAutoObservable, toJS } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { priorities, statuses, todo } from "../constants/constants";
import { SyntheticEvent } from "react";

interface addTodoData {
  title: string;
  status: statuses;
  desc: string;
  priority: priorities;
}

class Todo {
  todos: todo[] = [];
  isEditing: boolean = false;
  editingTodoId = "";
  draggingTodoId = "";
  draggingTodoOrder = "tasks";

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

  handlePointerOver = (e: SyntheticEvent<EventTarget>) => {
    if (this.draggingTodoId !== "") {
      e.preventDefault();
    }
  };

  handlePointerEnter = (status: statuses) => {
    console.log("1st line =========");
    console.log("status", status);
    console.log("draggingTodoId", this.draggingTodoId);

    // if (this.draggingTodoId !== "") {
    this.todos = this.todos.map((item) =>
      item.id === this.draggingTodoId ? { ...item, status: status } : item
    );
    console.log(
      "tojs-",
      toJS(this.todos).find((el) => el.id === this.draggingTodoId)
    );
    this.draggingTodoId = "";
    console.log("Last line =========");

    // }
  };

  handlePointerDown = (status: string, id: string) => {
    console.log("pointerDown", status, id);
    // this.todos.map((todo) => (todo.id === id ? { ...todo, status } : todo));
    this.draggingTodoOrder = status;
    this.draggingTodoId = id;
  };

  handlePointerMove = (e: SyntheticEvent<EventTarget>) => {
    if (this.draggingTodoId !== "") {
      e.preventDefault();
    }
  };
}

export default new Todo();
