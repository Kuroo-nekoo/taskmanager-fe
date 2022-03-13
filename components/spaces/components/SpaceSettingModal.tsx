import * as React from "react";
import { ISpace } from "../../../intefaces/space";
import useDeleteSpace from "../hooks/useDeleteSpace";
import { useQueryClient } from "react-query";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";

const SpaceSettingModal = ({
  setIsOpenSpaceSetting,
  setIsAddList,
  setIsUpdateSpace,
  space,
}: {
  setIsOpenSpaceSetting: Function;
  setIsAddList: Function;
  setIsUpdateSpace: Function;
  space: ISpace;
}) => {
  const queryClient = useQueryClient();
  const spaceSettingModalWrapperRef = React.useRef<HTMLDivElement | null>(null);
  const deleteSpaceMutation = useDeleteSpace(queryClient);

  React.useEffect(() => {
    const detectOutsideClick = (e: MouseEvent) => {
      if (
        spaceSettingModalWrapperRef.current &&
        !spaceSettingModalWrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpenSpaceSetting(false);
      }
    };
    document.addEventListener("click", detectOutsideClick);

    return () => {
      document.removeEventListener("click", detectOutsideClick);
    };
  }, [setIsOpenSpaceSetting]);

  return (
    <div
      className="absolute top-0 right-0 border-solid border transform translate-x-24 translate-y-10 bg-white z-10 rounded border-gray-300 p-3"
      ref={spaceSettingModalWrapperRef}
    >
      <div className="flex items-center justify-center">
        <div>SPACE SETTINGS</div>
        <button
          className="p-auto flex items-center"
          onClick={() => {
            setIsUpdateSpace(true);
          }}
        >
          <FiEdit2
            style={{
              display: "inline",
              marginLeft: "12px",
            }}
          ></FiEdit2>
        </button>
      </div>
      <button
        onClick={() => {
          setIsAddList(true);
          setIsOpenSpaceSetting(false);
        }}
        className="flex items-center"
      >
        <AiOutlinePlus
          style={{ display: "inline", marginRight: "12px" }}
        ></AiOutlinePlus>{" "}
        new list
      </button>
      <button
        onClick={() => {
          deleteSpaceMutation.mutate(space.id);
        }}
        className="flex items-center "
        style={{ color: "#f498be" }}
      >
        <RiDeleteBinLine
          style={{ display: "inline", marginRight: "12px" }}
        ></RiDeleteBinLine>
        delete
      </button>
    </div>
  );
};

export default SpaceSettingModal;
