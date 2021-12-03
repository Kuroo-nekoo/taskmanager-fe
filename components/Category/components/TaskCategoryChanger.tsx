import { useQueryClient } from "react-query";
import { ICategory } from "../../../intefaces/category";

const TaskCategoryChanger = () => {
  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData<ICategory[]>("categories");

  return (
    <div>
      {categories &&
        categories.map((category) => {
          return (
            <div key={category.id}>
              <div
                className="w-2 h-2"
                style={{ background: category.color }}
              ></div>
              <div>{category.value}</div>
            </div>
          );
        })}
    </div>
  );
};

export default TaskCategoryChanger;
