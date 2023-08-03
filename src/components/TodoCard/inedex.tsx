import React, { FC, useEffect, useRef, useState } from "react";
import ThreDots from "../../assets/icons/ThreDots";
import TodosStore from "../../store/TodosStore";
import PopOver from "../PopOver";
import { observer } from "mobx-react-lite";
import { statuses } from "../../constants/constants";

interface TodoCardProps {
  title: string;
  desc?: string;
  id: string;
  status: statuses;
}

const TodoCard: FC<TodoCardProps> = observer(({ title, desc, id, status }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLButtonElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsPopoverOpen(false);
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsPopoverOpen((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  console.log("dsds,", status);

  return (
    <div
      className="flex justify-between mb-2 bg-white border border-solid border-borderColor rounded-md p-4 whitespace-normal"
      draggable={status !== "done"}
      onPointerDown={() => TodosStore.handlePointerDown(status, id)}
      onPointerMove={(e) => TodosStore.handlePointerMove(e)}
    >
      <div className="flex gap-[20px]">
        <input
          type="checkbox"
          disabled={status === "done" ? true : false}
          checked={status === "done" ? true : false}
          onClick={() => TodosStore.completeTodo(id)}
        />
        <div>
          <h4 className="font-bold">{title}</h4>
          <p className="text-sm text-slate">{desc}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={(e) => handleEdit(e)}
        className="relative justify-end"
        ref={popoverRef}
      >
        <ThreDots />
        {isPopoverOpen && <PopOver id={id} />}
      </button>
    </div>
  );
});

export default TodoCard;
