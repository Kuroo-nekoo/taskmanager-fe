import * as React from "react";
import { FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import useDeleteList from "../hooks/useDeleteList";

const ListSettingModal = ({
  setIsEditList,
  setIsAddTask,
}: {
  setIsEditList: Function;
  setIsAddTask: Function;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteListMutation = useDeleteList(queryClient);

  return (
    <div className="absolute bg-white z-50 rounded-md rounded-black border border-black border-solid flex flex-col">
      <div>
        LIST SETTING
        <button
          onClick={() => {
            setIsEditList(true);
          }}
        >
          <FiEdit2 style={{ marginLeft: "12px" }}></FiEdit2>
        </button>
      </div>
      <button
        onClick={() => {
          setIsAddTask(true);
        }}
      >
        Create new task
      </button>
      <button
        onClick={() => {
          if (!Array.isArray(router.query.id) && router.query.id) {
            deleteListMutation.mutate(router.query.id);
          }
        }}
      >
        delete
      </button>
    </div>
  );
};

export default ListSettingModal;
