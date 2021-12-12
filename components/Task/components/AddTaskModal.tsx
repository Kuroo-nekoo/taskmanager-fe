import * as React from "react";
import { useQueryClient } from "react-query";
import { GrClose } from "react-icons/gr";
import useAddTask from "../hooks/useAddTask";
import { IList } from "../../../intefaces/list";
import { RiArrowDownSFill } from "react-icons/ri";

export const AddListModal = ({ setIsAddTask }: { setIsAddTask: Function }) => {
  const queryClient = useQueryClient();
  const addTaskInputRef = React.useRef<HTMLInputElement | null>(null);
  const list = queryClient.getQueryData<IList>("list");
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const addTaskMutation = useAddTask(queryClient);
  const [category, setCategory] = React.useState(list?.categories[0]);
  const [isSelectCategory, setIsSelectCategory] = React.useState(false);

  React.useEffect(() => {
    const detectOutsideClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsAddTask(false);
      }
    };
    document.addEventListener("click", detectOutsideClick);

    return () => {
      setIsAddTask(false);
      document.removeEventListener("click", detectOutsideClick);
    };
  }, [setIsAddTask]);

  return (
    <div className="w-4/12 modal" ref={wrapperRef}>
      <div className="modal-title">
        CREATE TASK
        <button
          onClick={() => {
            setIsAddTask(false);
          }}
        >
          <GrClose></GrClose>
        </button>
      </div>
      <div className="modal-content">
        <label className="block" htmlFor="addListInput">
          Task name:
        </label>
        <div className="grid grid-cols-12">
          <input
            id="addListInput"
            type="text"
            className="modal-content-input col-span-8"
            ref={addTaskInputRef}
            autoFocus
          ></input>
          <div className="flex items-center bg-white ml-3 col-span-4 relative">
            <button
              className="w-full"
              onClick={() => {
                setIsSelectCategory(!isSelectCategory);
              }}
            >
              <div className="flex items-center">
                <div
                  className="w-2 h-2 m-3"
                  style={{ background: category && category.color }}
                ></div>
                {category && category.value}
                <RiArrowDownSFill
                  style={{
                    display: "inline",
                    margin: "12px",
                    marginLeft: "auto",
                  }}
                ></RiArrowDownSFill>
              </div>
            </button>
            {isSelectCategory && (
              <div className="absolute bg-white z-50 border border-gray-100 border-solid transform w-full translate-y-14">
                {list &&
                  list.categories.map((category) => {
                    return (
                      <button
                        className="flex items-center "
                        key={category.id}
                        onClick={() => {
                          setCategory(category);
                        }}
                      >
                        <div
                          className="w-2 h-2 m-3"
                          style={{ background: category.color }}
                        ></div>
                        {category.value}
                      </button>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
        <div className="mt-20 flex">
          <button
            onClick={() => {
              setIsAddTask(false);
            }}
            className="modal-content-button ml-auto"
          >
            cancel
          </button>
          <button
            className="modal-content-button ml-3"
            onClick={() => {
              if (
                addTaskInputRef.current &&
                addTaskInputRef.current.value !== "" &&
                category
              ) {
                addTaskMutation.mutate({
                  value: addTaskInputRef.current.value,
                  categoryId: category.id,
                });
              }
              setIsAddTask(false);
            }}
          >
            add task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddListModal;
