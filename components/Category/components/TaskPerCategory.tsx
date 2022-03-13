import React from "react";
import { ICategory } from "../../../intefaces/category";
import AddTaskGroup from "../../Task/components/AddTaskGroup";
import TaskListItem from "../../Task/components/TaskListItem";
import CategoryGroup from "./CategoryGroup";
import { IoIosArrowDroprightCircle, IoIosArrowDropdown } from "react-icons/io";

const TaskPerCategory = ({
  category,
  searchTasksValue,
}: {
  category: ICategory;
  searchTasksValue: string;
}) => {
  const [hideTask, setHideTask] = React.useState(false);

  return (
    <div>
      <button
        className="absolute transform -translate-x-7"
        onClick={() => {
          setHideTask(!hideTask);
        }}
      >
        {hideTask ? (
          <IoIosArrowDroprightCircle
            className="w-6 h-6"
            style={{ color: category.color }}
          ></IoIosArrowDroprightCircle>
        ) : (
          <IoIosArrowDropdown
            className="w-6 h-6"
            style={{ color: category.color }}
          ></IoIosArrowDropdown>
        )}
      </button>
      <CategoryGroup category={category} />
      {category.tasks.map((task) => {
        return (
          <React.Fragment key={task.id}>
            {hideTask ? null : (
              <>
                <TaskListItem
                  searchTasksValue={searchTasksValue}
                  key={task.id}
                  task={task}
                ></TaskListItem>
              </>
            )}
          </React.Fragment>
        );
      })}
      <AddTaskGroup categoryId={category.id}></AddTaskGroup>
    </div>
  );
};

export default TaskPerCategory;
