import { useQueryClient } from "react-query";
import { ICategory } from "../../../intefaces/category";
import * as React from "react";
import { IList } from "../../../intefaces/list";
import { IoMdSearch } from "react-icons/io";
import TaskPerCategory from "./TaskPerCategory";

const CategoryList = () => {
  const queryClient = useQueryClient();
  const list = queryClient.getQueryData<IList>("list");
  const [searchTasksValue, setSearchTasksValue] = React.useState("");

  return (
    <div className="relative col-span-10">
      <div className="border border-b border-gray-400">
        <IoMdSearch style={{ display: "inline" }}></IoMdSearch>
        <input
          className="ml-2"
          onChange={(e) => {
            setSearchTasksValue(e.target.value);
          }}
          placeholder="search tasks"
        ></input>
      </div>
      <div className="px-16 py-16 w-full ">
        <div>
          {list &&
            list.categories.map((category) => {
              return (
                <div key={category.id}>
                  <TaskPerCategory
                    searchTasksValue={searchTasksValue}
                    category={category}
                  ></TaskPerCategory>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
