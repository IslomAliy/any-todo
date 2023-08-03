import React, { FC } from "react";
import { priorities } from "../../constants/constants";

interface TaskAddFormProps {
  title: string;
  desc: string;
  priority: priorities;
  setTitle: (title: string) => void;
  setDesc: (desc: string) => void;
  setPriority: (priority: priorities) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  titleInputRef: React.RefObject<HTMLInputElement>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleClose: () => void;
}

const TaskAddForm: FC<TaskAddFormProps> = ({
  title,
  desc,
  priority,
  setTitle,
  setDesc,
  setPriority,
  handleSubmit,
  titleInputRef,
  handleKeyDown,
  handleClose,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[10px] bg-white border border-solid border-borderColor rounded-sm p-3 font-normal"
    >
      <input
        type="text"
        placeholder="Add title"
        ref={titleInputRef}
        className="outline-none focus:outline-none "
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Add description"
        className="outline-none focus:outline-none"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <div>
        <label htmlFor="select" className="mr-2">
          Priority:
        </label>
        <select
          className="w-2/3 p-1 mb-[8px]"
          value={priority}
          onChange={(e) => setPriority(e.target.value as priorities)}
        >
          <option value="High">High</option>
          <option value="Mid">Mid</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => handleClose()}
          className="text-red"
        >
          Close
        </button>
        <button
          disabled={!title}
          type="submit"
          className={`${
            title ? "bg-mainBlue text-white" : "bg-borderColor"
          } rounded-md px-[10px] py-[5px]`}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TaskAddForm;
