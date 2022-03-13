import { useQueryClient } from "react-query";
import * as React from "react";
import useUpdateSpace from "../hooks/useUpdateSpace";
import { GrClose } from "react-icons/gr";
import { ISpace } from "../../../intefaces/space";

const EditSpaceModal = ({
  setIsUpdateSpace,
  space,
}: {
  setIsUpdateSpace: Function;
  space: ISpace;
}) => {
  const queryClient = useQueryClient();
  const updateSpaceInputRef = React.useRef<HTMLInputElement>(null);
  const addSpaceMutation = useUpdateSpace(queryClient);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const detectOutsideClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsUpdateSpace(false);
      }
    };
    document.addEventListener("click", detectOutsideClick);

    return () => {
      setIsUpdateSpace(false);
      document.removeEventListener("click", detectOutsideClick);
    };
  }, [setIsUpdateSpace]);

  return (
    <div className="modal w-4/12" ref={wrapperRef}>
      <div className="modal-title">
        Update Space name
        <button
          onClick={() => {
            setIsUpdateSpace(false);
          }}
        >
          <GrClose></GrClose>
        </button>
      </div>
      <div className="modal-content">
        <label className="block" htmlFor="updateSpaceInput">
          Space name:
        </label>
        <input
          id="updateSpaceInput"
          className="border border-gray-300 border-solid h-10"
          ref={updateSpaceInputRef}
          autoFocus
          defaultValue={space.value}
        ></input>
        <div className="flex mt-14">
          <button
            className="modal-content-button w-full"
            onClick={() => {
              if (updateSpaceInputRef.current) {
                addSpaceMutation.mutate({
                  value: updateSpaceInputRef.current.value,
                  id: space.id,
                });
              }
              setIsUpdateSpace(false);
            }}
          >
            add space
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSpaceModal;
