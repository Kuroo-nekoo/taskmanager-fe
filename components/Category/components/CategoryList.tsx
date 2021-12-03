import TaskListItem from "../../Task/components/TaskListItem";
import AddTaskGroup from "../../Task/components/AddTaskGroup";
import useCategory from "../hooks/useCategory";
import UpdateCategoryGroup from "../components/UpdateCategoryGroup";

const CategoryList = () => {
  const categoryQuery = useCategory();

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
