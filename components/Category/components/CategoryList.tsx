import { useQueryClient } from "react-query";
import * as React from "react";
import { IList } from "../../../intefaces/list";
import { IoMdSearch } from "react-icons/io";
import TaskPerCategory from "./TaskPerCategory";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import ListSettingModal from "../../List/components/ListSettingModal";
import EditListModal from "../../List/components/EditListModal";
import Modal from "../../Modal/components/Modal";
import AddTaskModal from "../../Task/components/AddTaskModal";
import MoveListModal from "../../spaces/components/MoveListModal";
import CopyListModal from "../../List/components/CopyListModal";

const CategoryList = () => {
  const queryClient = useQueryClient();
  const list = queryClient.getQueryData<IList>("list");
  const [searchTasksValue, setSearchTasksValue] = React.useState("");
  const [isOpenListSetting, setIsOpenListSetting] = React.useState(false);
  const [isEditList, setIsEditList] = React.useState(false);
  const [isAddTask, setIsAddTask] = React.useState(false);
  const [isMoveList, setIsMoveList] = React.useState(false);
  const [isCopyList, setIsCopyList] = React.useState(false);

  return (
    <div className="relative col-span-10">
      {list && (
        <>
          <button
            className="relative m-3"
            onClick={() => {
              setIsOpenListSetting(!isOpenListSetting);
            }}
          >
            {list.value}
            <div className="ml-1 inline vertical-center">
              {isOpenListSetting ? (
                <IoMdArrowDropup
                  style={{ display: "inline" }}
                ></IoMdArrowDropup>
              ) : (
                <IoMdArrowDropdown
                  style={{ display: "inline" }}
                ></IoMdArrowDropdown>
              )}
            </div>
          </button>
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
          {isOpenListSetting && (
            <ListSettingModal
              setIsEditList={setIsEditList}
              setIsAddTask={setIsAddTask}
              setIsMoveList={setIsMoveList}
              setIsOpenListSetting={setIsOpenListSetting}
              setIsCopyList={setIsCopyList}
            ></ListSettingModal>
          )}
          {isMoveList && (
            <Modal>
              <MoveListModal
                setIsMoveList={setIsMoveList}
                list={list}
              ></MoveListModal>
            </Modal>
          )}
          {isCopyList && (
            <Modal>
              <CopyListModal
                list={list}
                setIsCopyList={setIsCopyList}
              ></CopyListModal>
            </Modal>
          )}
          <div className="border border-b border-gray-300">
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
