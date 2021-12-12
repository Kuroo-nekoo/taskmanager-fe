import { useQueryClient } from "react-query";
import { ICategory } from "../../../intefaces/category";
import * as React from "react";
import { IList } from "../../../intefaces/list";
import { IoMdSearch } from "react-icons/io";
import TaskPerCategory from "./TaskPerCategory";
import { IoMdArrowDropdown } from "react-icons/io";
import ListSettingModal from "../../List/components/ListSettingModal";
import EditListModal from "../../List/components/EditListModal";
import Modal from "../../Modal/components/Modal";
import AddTaskGroup from "../../Task/components/AddTaskGroup";
import AddTaskModal from "../../Task/components/AddTaskModal";

const CategoryList = () => {
  const queryClient = useQueryClient();
  const list = queryClient.getQueryData<IList>("list");
  const [searchTasksValue, setSearchTasksValue] = React.useState("");
  const [isOpenListSetting, setIsOpenListSetting] = React.useState(false);
  const [isEditList, setIsEditList] = React.useState(false);
  const [isAddTask, setIsAddTask] = React.useState(false);

  return (
    <div className="relative col-span-10">
      {list && (
        <>
          <div className="relative">
            {list.value}
            <button
              onClick={() => {
                setIsOpenListSetting(!isOpenListSetting);
              }}
            >
              <IoMdArrowDropdown></IoMdArrowDropdown>
            </button>
            {isOpenListSetting && (
              <ListSettingModal
                setIsEditList={setIsEditList}
                setIsAddTask={setIsAddTask}
              ></ListSettingModal>
            )}
            {isEditList && (
              <Modal>
                <EditListModal
                  list={list}
                  setIsEditList={setIsEditList}
                ></EditListModal>
              </Modal>
            )}
            {isAddTask && (
              <Modal>
                <AddTaskModal setIsAddTask={setIsAddTask}></AddTaskModal>
              </Modal>
            )}
          </div>
          <div className="border border-b border-gray-400">
            <IoMdSearch style={{ display: "inline" }}></IoMdSearch>
            <input
              className="ml-2"
              onChange={(e) => {
                setSearchTasksValue(e.target.value);
              }}
              placeholder="search tasks"
            ></input>
          </div>
          <div className="px-16 py-16 w-full ">
            <div>
              {list.categories.map((category) => {
                return (
                  <div key={category.id}>
                    <TaskPerCategory
                      searchTasksValue={searchTasksValue}
                      category={category}
                    ></TaskPerCategory>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryList;
