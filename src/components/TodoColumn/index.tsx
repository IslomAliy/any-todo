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
  isGrid: boolean;
}

const TodoColumn: FC<TodoColumnProps> = observer(({ title, todos, isGrid }) => {
  return (
    <div
      className={`w-1/4 ${!isGrid ? "mt-10" : ""}`}
      onPointerEnter={() => {
        TodosStore.handlePointerEnter(title);
      }}
      onPointerOver={(e) => TodosStore.handlePointerOver(e)}
    >
      <h2 className="font-bold capitalize mb-4">{title}</h2>
      {todos.map((todo) =>
        TodosStore.isEditing && todo.id === TodosStore.editingTodoId ? (
          <AddTask status={todo.status} isEditing key={todo.id} />
        ) : (
          <TodoCard
            title={todo.title}
            desc={todo.desc}
            id={todo.id}
            status={todo.status}
            key={todo.id}
          />
        )
      )}
      <AddTask status={title} />
    </div>
  );
});

export default TodoColumn;
