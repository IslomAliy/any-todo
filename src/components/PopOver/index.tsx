import DeleteIcon from "../../assets/icons/DeleteIcon";
import EditIcon from "../../assets/icons/EditIcon";
import TodosStore from "../../store/TodosStore";
import { FC } from "react";

interface PopOverProps {
  id: string;
}

const PopOver: FC<PopOverProps> = ({ id }) => {
  return (
    <div className="absolute top-8 right-1 bg-white border border-solid border-borderColor rounded-md p-2">
      <button
        className="flex items-center gap-1 text-mainBlue"
        onClick={() => {
          TodosStore.handleIsEditing(id, true);
        }}
      >
        <EditIcon /> Edit
      </button>
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
