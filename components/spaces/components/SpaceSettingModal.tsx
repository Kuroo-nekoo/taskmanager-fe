import { AiOutlinePlus } from "react-icons/ai";
import * as React from "react";
import { ISpace } from "../../../intefaces/space";
import useDeleteSpace from "../hooks/useDeleteSpace";
import { useQueryClient } from "react-query";

const SpaceSettingModal = ({
  setIsSettingSpace,
  setIsAddList,
  setIsUpdateSpace,
  space,
}: {
  setIsSettingSpace: Function;
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
        setIsSettingSpace(false);
      }
    };
    document.addEventListener("click", detectOutsideClick);

    return () => {
      document.removeEventListener("click", detectOutsideClick);
    };
  }, [setIsSettingSpace]);

  return (
    <div
      className="absolute top-0 right-0 border-gray-300 border-solid border transform translate-x-24 translate-y-10 bg-white z-10 rounded"
      ref={spaceSettingModalWrapperRef}
    >
      <div>SPACE SETTINGS</div>
      <button
        onClick={() => {
          setIsUpdateSpace(true);
        }}
        className="block"
      >
        rename
      </button>
      <button
        onClick={() => {
          setIsAddList(true);
          setIsSettingSpace(false);
        }}
        className="block"
      >
        <AiOutlinePlus style={{ display: "inline" }}></AiOutlinePlus> New List
      </button>
      <button
        onClick={() => {
          deleteSpaceMutation.mutate(space.id);
        }}
      >
        delete
      </button>
    </div>
  );
};

export default SpaceSettingModal;
