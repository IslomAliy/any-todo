import { FC, useEffect, useRef, useState } from "react";
import TodosStore from "../../store/TodosStore";
import { priorities, statuses } from "../../constants/constants";
import { observer } from "mobx-react-lite";
import TaskAddForm from "../TaskAddForm";
import { toJS } from "mobx";

interface AddTaskProps {
  status: statuses;
  isEditing?: boolean;
}

const AddTask: FC<AddTaskProps> = observer(({ status, isEditing }) => {
  const [isClicked, setIsClicked] = useState(isEditing);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [priority, setPriority] = useState<priorities>("High");
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (TodosStore.isEditing) {
      const findById = toJS(
        TodosStore.todos.find((todo) => todo.id === TodosStore.editingTodoId)
      );
      setTitle(findById?.title ?? "");
      setDesc(findById?.desc ?? "");
      setPriority(findById?.priority ?? "High");
    }
  }, [TodosStore.isEditing]);

  useEffect(() => {
    if (isClicked && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isClicked]);

  const resetStates = () => {
    setIsClicked(false);
    setTitle("");
    setDesc("");
    setPriority("High");
  };

  const addNewTodo = () => {
    if (TodosStore.isEditing) {
      TodosStore.updateTodo(TodosStore.editingTodoId, {
        title,
        desc,
        priority,
        status: status,
      });
    } else {
      TodosStore.addTodo({
        title,
        desc,
        priority,
        status: status,
      });
    }
    resetStates();
    TodosStore.handleIsEditing("", false);
  };

  const handleClose = () => {
    setIsClicked(false);
    resetStates();
    TodosStore.handleIsEditing("", false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNewTodo();
  };

  const handleAddTask = () => {
    resetStates();
    setIsClicked(true);
    TodosStore.handleIsEditing("", false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      setDesc((prev) => `${prev}    `);
    } else if (e.key === "Enter") {
      addNewTodo();
    }
  };

  return (
    <div className="mt-[15px]">
      {!isClicked ? (
        <button type="button" onClick={() => handleAddTask()}>
          <span className="text-orangish text-xl">+</span> Add Task
        </button>
      ) : (
        <TaskAddForm
          title={title}
          desc={desc}
          priority={priority}
          setTitle={setTitle}
          setDesc={setDesc}
          setPriority={setPriority}
          handleSubmit={handleSubmit}
          titleInputRef={titleInputRef}
          handleKeyDown={handleKeyDown}
          handleClose={handleClose}
        />
      )}
    </div>
  );
});

export default AddTask;
