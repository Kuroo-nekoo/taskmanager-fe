import * as React from "react";
import Sidebar from "../../components/Sidebar/components/Sidebar";
import CategoryList from "../../components/Category/components/CategoryList";
import useTasks from "../../components/Task/hooks/useTasks";

const Task = () => {
  const taskQuery = useTasks();

  return (
    <div className="w-screen h-screen grid grid-cols-12">
      <Sidebar></Sidebar>
      <div className="px-16 py-16 w-full col-span-10">
        {taskQuery.isSuccess && (
          <div>
            <CategoryList tasks={taskQuery.data}></CategoryList>
          </div>
        )}
      </div>
    </div>
  );
};
export default Task;
