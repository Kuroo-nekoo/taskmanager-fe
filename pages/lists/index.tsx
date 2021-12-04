import * as React from "react";
import Sidebar from "../../components/Sidebar/components/Sidebar";
import CategoryList from "../../components/Category/components/CategoryList";

const Task = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-12">
      <Sidebar></Sidebar>
      <div className="px-16 py-16 w-full col-span-10">
        <div>
          <CategoryList></CategoryList>
        </div>
      </div>
    </div>
  );
};
export default Task;
