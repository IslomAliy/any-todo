import { statuses } from "../../constants/constants";
import TodosStore from "../../store/TodosStore";
import Container from "../Container";
import TodoColumn from "../TodoColumn";
import { observer } from "mobx-react-lite";
import { ViewType } from "../ViewType";
import { useState } from "react";

const todoStatuses: statuses[] = ["tasks", "doing", "done"];

const gridStyle = "flex items-baseline justify-between mt-[50px]";
const listStyle = "flex flex-col items-center justify-center mt-[50px]";

const isWindowWidthLarge = window.innerWidth > 1000;

const TodosWrapper = observer(() => {
  const [isGrid, setIsGrid] = useState(isWindowWidthLarge ? true : false);

  const handleChange = (value: boolean) => {
    setIsGrid(value);
  };

  return (
    <Container>
      {isWindowWidthLarge && <ViewType handleChange={handleChange} />}
      <div className={`${isGrid ? gridStyle : listStyle}`}>
        {todoStatuses.map((status) => (
          <TodoColumn
            title={status}
            key={status}
            isGrid={isGrid}
            todos={TodosStore.todos.filter((todo) => todo.status === status)}
          />
        ))}
      </div>
    </Container>
  );
});

export default TodosWrapper;
