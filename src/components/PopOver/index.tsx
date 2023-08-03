import DeleteIcon from "../../assets/icons/DeleteIcon";
import EditIcon from "../../assets/icons/EditIcon";
import { statuses } from "../../constants/constants";
import TodosStore from "../../store/TodosStore";
import { FC } from "react";

interface PopOverProps {
  id: string;
  status: statuses;
}

const PopOver: FC<PopOverProps> = ({ id, status }) => {
  return (
    <div className="absolute top-8 right-1 bg-white border border-solid border-borderColor rounded-md p-2">
      {status !== "done" && (
        <button
          className="flex items-center gap-1 text-mainBlue"
          onClick={() => {
            TodosStore.handleIsEditing(id, true);
          }}
        >
          <EditIcon /> Edit
        </button>
      )}
      <button
        onClick={() => {
          TodosStore.removeTodo(id);
        }}
        className="flex items-center gap-1 text-red"
      >
        <DeleteIcon />
        Delete
      </button>
    </div>
  );
};

export default PopOver;
