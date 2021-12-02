import React from "react";
import { useQueryClient } from "react-query";
import { ITask } from "../../../intefaces/task";
import TaskListItem from "../../Task/components/TaskListItem";
import AddTaskGroup from "../../Task/components/AddTaskGroup";
import useCategory from "../hooks/useCategory";
import useEditCategory from "../hooks/useEditCategory";

const CategoryList = ({ tasks }: { tasks: ITask[] | undefined }) => {
  const queryClient = useQueryClient();
  const [isEditCategory, setIsEditCategory] = React.useState<boolean>(false);

  const categoryQuery = useCategory();
  const editCategoryMutation = useEditCategory(queryClient);

  return (
    <div>
      {categoryQuery.isSuccess && (
        <div>
          {categoryQuery.data &&
            categoryQuery.data.map((category) => {
              return (
                <div key={category.id}>
                  <div>
                    {isEditCategory ? (
                      category.value
                    ) : (
                      <input type="text" placeholder="edit category"></input>
                    )}
                    <button onClick={() => setIsEditCategory(!isEditCategory)}>
                      {isEditCategory ? "edit" : "cancel"}
                    </button>
                  </div>
                  {tasks &&
                    tasks.map((task) => {
                      return (
                        task.categoryId === category.id && (
                          <TaskListItem task={task}></TaskListItem>
                        )
                      );
                    })}
                  <AddTaskGroup categoryId={category.id}></AddTaskGroup>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
