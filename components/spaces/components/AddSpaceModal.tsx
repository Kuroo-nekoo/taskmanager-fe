import * as React from "react";
import { GrClose } from "react-icons/gr";
import { useQueryClient } from "react-query";
import useAddSpace from "../hooks/useAddSpace";

const AddSpaceModal = ({ setIsAddSpace }: { setIsAddSpace: Function }) => {
  const queryClient = useQueryClient();
  const addSpaceInputRef = React.useRef<HTMLInputElement>(null);
  const addSpaceMutation = useAddSpace(queryClient);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const detectOutsideClick = (e: MouseEvent) => {
      console.log(e.target);
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsAddSpace(false);
      }
    };
    document.addEventListener("click", detectOutsideClick);

    return () => {
      setIsAddSpace(false);
      document.removeEventListener("click", detectOutsideClick);
    };
  }, [setIsAddSpace]);

  return (
    <div className="modal w-4/12" ref={wrapperRef}>
      <div className="modal-title">
        Create new Space
        <button
          onClick={() => {
            setIsAddSpace(false);
          }}
        >
          <GrClose></GrClose>
        </button>
      </div>
      <div className="modal-content">
        <label className="block" htmlFor="addSpaceInput">
          Space name:
        </label>
        <input
          id="addSpaceInput"
          className="border border-gray-300 border-solid h-10"
          ref={addSpaceInputRef}
          autoFocus
        ></input>
        <div className="flex mt-20">
          <button
            className="modal-content-button ml-auto"
            onClick={() => {
              setIsAddSpace(false);
            }}
          >
            cancel
          </button>
          <button
            className="modal-content-button ml-3"
            onClick={() => {
              if (addSpaceInputRef.current) {
                addSpaceMutation.mutate({
                  value: addSpaceInputRef.current.value,
                });
              }
              setIsAddSpace(false);
            }}
          >
            add space
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSpaceModal;
