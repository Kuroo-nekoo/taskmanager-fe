import * as React from "react";
import { useQueryClient } from "react-query";
import { GrClose } from "react-icons/gr";
import useEditList from "../hooks/useEditList";
import { IList } from "../../../intefaces/list";

export const AddListModal = ({
  setIsEditList,
  list,
}: {
  setIsEditList: Function;
  list: IList;
}) => {
  const queryClient = useQueryClient();
  const editListInputRef = React.useRef<HTMLInputElement | null>(null);
  const editListMutation = useEditList(queryClient);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const detectOutsideClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsEditList(false);
      }
    };
    document.addEventListener("click", detectOutsideClick);

    return () => {
      setIsEditList(false);
      document.removeEventListener("click", detectOutsideClick);
    };
  }, [setIsEditList]);

  return (
    <div className="w-4/12 modal" ref={wrapperRef}>
      <div className="modal-title">
        EDIT LIST
        <button
          onClick={() => {
            setIsEditList(false);
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
          ref={editListInputRef}
          autoFocus
        ></input>
        <div className="mt-20 flex">
          <button
            onClick={() => {
              setIsEditList(false);
            }}
            className="modal-content-button ml-auto"
          >
            cancel
          </button>
          <button
            className="modal-content-button ml-3"
            onClick={() => {
              if (
                editListInputRef.current &&
                editListInputRef.current.value !== ""
              ) {
                editListMutation.mutate({
                  value: editListInputRef.current.value,
                  id: list.id,
                });
              }
              setIsEditList(false);
            }}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddListModal;
