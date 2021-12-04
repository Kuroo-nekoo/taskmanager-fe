import TaskListItem from "../../Task/components/TaskListItem";
import AddTaskGroup from "../../Task/components/AddTaskGroup";
import UpdateCategoryGroup from "../components/UpdateCategoryGroup";
import useCategories from "../hooks/useCategory";

const CategoryList = () => {
  const categoryQuery = useCategories();

  return (
    <div>
      {categoryQuery.isSuccess && (
        <div>
          {categoryQuery.data &&
            categoryQuery.data.map((category) => {
              return (
                <div key={category.id}>
                  <UpdateCategoryGroup category={category} />
                  {category.tasks.map((task) => {
                    return (
                      <TaskListItem key={task.id} task={task}></TaskListItem>
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
