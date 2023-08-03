import { FC } from "react";
import AddTask from "../AddTask/AddTask";
import TodoCard from "../TodoCard/inedex";
import { statuses } from "../../constants/constants";
import { observer } from "mobx-react-lite";
import TodosStore from "../../store/TodosStore";

type todo = {
  title: string;
  desc?: string;
  id: string;
  status: statuses;
};

interface TodoColumnProps {
  title: statuses;
  todos: todo[];
}

const TodoColumn: FC<TodoColumnProps> = observer(({ title, todos }) => {
  return (
    <div className="w-1/4">
      <h2 className="font-bold capitalize mb-4">{title}</h2>
      {todos.map((todo) =>
        TodosStore.isEditing && todo.id === TodosStore.editingTodoId ? (
          // <div> test </div>
          <AddTask status={todo.status}  isEditing  />
        ) : (
          <TodoCard title={todo.title} desc={todo.desc} id={todo.id} />
        )
      )}
      <AddTask status={title} />
    </div>
  );
});

export default TodoColumn;
