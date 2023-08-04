import { useState } from "react";
import ListIcon from "../../assets/icons/ListIcon";
import GridIcon from "../../assets/icons/GridIcon";

export const ViewType = ({ handleChange }: any) => {
  const [isGrid, setGrid] = useState(true);

  return (
    <div className="flex gap-[10px] justify-center  items-center w-[80px] px-[5px] py-[10px] mt-2">
      <button
        onClick={() => {
          setGrid(false);
          handleChange(false);
        }}
        className={`${!isGrid ? "bg-[#ffe4e6]" : ""} p-2`}
      >
        <span>
          <ListIcon color={`${!isGrid ? "#f43f5e" : "#697e92"}`} />
        </span>
      </button>
      <button
        onClick={() => {
          setGrid(true);
          handleChange(true);
        }}
        className={`${isGrid ? "bg-[#ffe4e6]" : ""} p-2`}
      >
        <span>
          <GridIcon color={`${isGrid ? "#f43f5e" : "#697e92"}`} />
        </span>
      </button>
    </div>
  );
};
