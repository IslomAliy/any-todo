import { statuses } from "../../constants/constants";
import TodosStore from "../../store/TodosStore";
import Container from "../Container";
import TodoColumn from "../TodoColumn";
import { observer } from "mobx-react-lite";

const todoStatuses: statuses[] = ["tasks", "doing", "done"];

const TodosWrapper = observer(() => {
  return (
    <Container>
      <div className="flex items-baseline justify-between mt-[50px]">
        {todoStatuses.map((status) => (
          <TodoColumn
            title={status}
            key={status}
            todos={TodosStore.todos.filter((todo) => todo.status === status)}
          />
        ))}
      </div>
    </Container>
  );
});

export default TodosWrapper;
