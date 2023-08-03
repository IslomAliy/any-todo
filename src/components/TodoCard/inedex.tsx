import React, { FC, useEffect, useRef, useState } from "react";
import ThreDots from "../../assets/icons/ThreDots";
import TodosStore from "../../store/TodosStore";
import PopOver from "../PopOver";
import { observer } from "mobx-react-lite";

interface TodoCardProps {
  title: string;
  desc?: string;
  id: string;
}

const TodoCard: FC<TodoCardProps> = observer(({ title, desc, id }) => {
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

  return (
    <div
      className="flex justify-between mb-2 bg-white border border-solid border-borderColor rounded-md p-4 whitespace-normal"
      draggable
    >
      <div className="flex gap-[20px]">
        <input
          type="checkbox"
          onClick={() => TodosStore.completeTodo(id)}
          //   className="form-checkbox rounded-full text-red bg-white border-2 border-red focus:outline-none focus:ring-2 focus:ring-red"
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
