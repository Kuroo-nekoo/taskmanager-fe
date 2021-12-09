import { AiOutlinePlus } from "react-icons/ai";
import { ISpace } from "../../../intefaces/space";
import * as React from "react";

const SpaceSettingModal = ({
  setIsSettingSpace,
  setIsAddList,
}: {
  setIsSettingSpace: Function;
  setIsAddList: Function;
}) => {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const detectOutsideClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
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
      ref={wrapperRef}
    >
      <div>SPACE SETTINGS</div>
      <button
        onClick={() => {
          setIsAddList(true);
          setIsSettingSpace(false);
        }}
      >
        <AiOutlinePlus style={{ display: "inline" }}></AiOutlinePlus> New List
      </button>
    </div>
  );
};

export default SpaceSettingModal;
