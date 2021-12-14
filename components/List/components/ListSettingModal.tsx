import * as React from "react";
import { FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import useDeleteList from "../hooks/useDeleteList";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDriveFileMoveOutline } from "react-icons/md";
import { HiOutlineDuplicate } from "react-icons/hi";

const ListSettingModal = ({
  setIsEditList,
  setIsAddTask,
  setIsMoveList,
  setIsOpenListSetting,
  setIsCopyList,
}: {
  setIsEditList: Function;
  setIsAddTask: Function;
  setIsMoveList: Function;
  setIsOpenListSetting: Function;
  setIsCopyList: Function;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteListMutation = useDeleteList(queryClient);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const detectOutsideClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpenListSetting(false);
      }
    };
    document.addEventListener("click", detectOutsideClick);

    return () => {
      setIsOpenListSetting(false);
      document.removeEventListener("click", detectOutsideClick);
    };
  }, [setIsOpenListSetting]);

  return (
    <div
      className="absolute bg-white z-50 rounded-md rounded-black border border-gray-300 border-solid flex flex-col min-h-0 p-3"
      ref={wrapperRef}
    >
      <div className="flex">
        <div>LIST SETTING</div>
        <button
          className="ml-auto"
          onClick={() => {
            setIsEditList(true);
            setIsOpenListSetting(false);
          }}
        >
          <FiEdit2></FiEdit2>
        </button>
      </div>
      <div className="flex flex-col">
        <button
          onClick={() => {
            setIsAddTask(true);
            setIsOpenListSetting(false);
          }}
        >
          <AiOutlinePlus
            style={{ display: "inline", marginRight: "12px" }}
          ></AiOutlinePlus>
          create new task
        </button>
        <button
          className="vertical-center"
          onClick={() => {
            if (!Array.isArray(router.query.id) && router.query.id) {
              deleteListMutation.mutate(router.query.id);
            }
            setIsOpenListSetting(false);
          }}
          style={{ color: "#f498be" }}
        >
          <RiDeleteBinLine
            style={{ display: "inline", marginRight: "12px" }}
          ></RiDeleteBinLine>
          delete
        </button>
        <button
          className="vertical-center"
          onClick={() => {
            setIsMoveList(true);
            setIsOpenListSetting(false);
          }}
        >
          <MdDriveFileMoveOutline
            style={{ display: "inline", marginRight: "12px" }}
          ></MdDriveFileMoveOutline>
          move
        </button>
        <button
          className="vertical-center"
          onClick={() => {
            setIsCopyList(true);
          }}
        >
          <HiOutlineDuplicate
            style={{ display: "inline", marginRight: "12px" }}
          ></HiOutlineDuplicate>
          duplicate
        </button>
      </div>
    </div>
  );
};

export default ListSettingModal;
