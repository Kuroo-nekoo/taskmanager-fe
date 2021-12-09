import { useQueryClient } from "react-query";
import { ICategory } from "../../../intefaces/category";
import TaskPerCategory from "./TaskPerCatergory";
import { useRouter } from "next/dist/client/router";

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
