import TaskListItem from "../../Task/components/TaskListItem";
import AddTaskGroup from "../../Task/components/AddTaskGroup";
import CategoryGroup from "./CategoryGroup";
import { useQueryClient } from "react-query";
import useCategories from "../hooks/useCategories";
import { ICategory } from "../../../intefaces/category";
import TaskPerCategory from "./TaskPerCatergory";

const CategoryList = ({ listId }: { listId?: number }) => {
  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData<ICategory[]>("categories");

  return (
    <div>
      <div>
        {categories &&
          categories.map((category) => {
            return (
              <div key={category.id}>
                <TaskPerCategory category={category}></TaskPerCategory>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CategoryList;
