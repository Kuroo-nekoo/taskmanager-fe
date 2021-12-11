import * as React from "react";
import { useQueryClient } from "react-query";
import useAddList from "../hooks/useAddList";
import { GrClose } from "react-icons/gr";
import { ISpace } from "../../../intefaces/space";

export const AddListModal = ({
  setIsAddList,
  space,
}: {
  setIsAddList: Function;
  space: ISpace;
}) => {
  const queryClient = useQueryClient();
  const addListInputRef = React.useRef<HTMLInputElement | null>(null);
  const addListMutation = useAddList(queryClient);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const detectOutsideClick = (e: MouseEvent) => {
      console.log(e.target);
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsAddList(false);
      }
    };
    document.addEventListener("click", detectOutsideClick);

    return () => {
      setIsAddList(false);
      document.removeEventListener("click", detectOutsideClick);
    };
  }, [setIsAddList]);

  return (
    <div className="w-4/12 modal" ref={wrapperRef}>
      <div className="modal-title">
        CREAT LIST
        <button
          onClick={() => {
            setIsAddList(false);
          }}
        >
          <GrClose></GrClose>
        </button>
      </div>
      <div className="modal-content">
        <label className="block" htmlFor="addListInput">
          List name:
        </label>
        <input
          id="addListInput"
          type="text"
          className="modal-content-input"
          ref={addListInputRef}
          autoFocus
        ></input>
        <div className="mt-20 flex">
          <button
            onClick={() => {
              setIsAddList(false);
            }}
            className="modal-content-button ml-auto"
          >
            cancel
          </button>
          <button
            className="modal-content-button ml-3"
            onClick={() => {
              if (addListInputRef.current) {
                addListMutation.mutate({
                  value: addListInputRef.current.value,
                  spaceId: space.id,
                });
              }
              setIsAddList(false);
            }}
          >
            add list
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddListModal;
