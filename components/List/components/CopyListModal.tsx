import * as React from "react";
import { useQueryClient } from "react-query";
import { GrClose } from "react-icons/gr";
import { ISpace } from "../../../intefaces/space";
import { RiArrowDownSFill } from "react-icons/ri";
import useUpdateSpace from "../../spaces/hooks/useUpdateSpace";
import { IList } from "../../../intefaces/list";

export const CopyListModal = ({
  list,
  setIsCopyList,
}: {
  setIsCopyList: Function;
  list: IList;
}) => {
  const queryClient = useQueryClient();
  const newListNameInputRef = React.useRef<HTMLInputElement | null>(null);
  const updateSpaceMutation = useUpdateSpace(queryClient);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const spaces = queryClient.getQueryData<ISpace[]>("spaces");
  const [space, setSpace] = React.useState(spaces![0]);
  const [isSelectSpace, setIsSelectSpace] = React.useState(false);

  React.useEffect(() => {
    const detectOutsideClick = (e: MouseEvent) => {
      console.log(e.target);
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsCopyList(false);
      }
    };
    document.addEventListener("click", detectOutsideClick);

    return () => {
      setIsCopyList(false);
      document.removeEventListener("click", detectOutsideClick);
    };
  }, [setIsCopyList]);

  return (
    <div className="w-4/12 modal" ref={wrapperRef}>
      <div className="modal-title">
        COPY LIST
        <button
          onClick={() => {
            setIsCopyList(false);
          }}
        >
          <GrClose></GrClose>
        </button>
      </div>
      <div className="modal-content">
        <label className="block" htmlFor="newListNameInput">
          New list name:
        </label>
        <input
          id="newListNameInput"
          type="text"
          className="modal-content-input"
          ref={newListNameInputRef}
          autoFocus
        ></input>
        <div className="relative">
          <div
            className="modal-content-select bg-white"
            onClick={() => {
              setIsSelectSpace(!isSelectSpace);
            }}
          >
            {space.value}
            <RiArrowDownSFill
              style={{ display: "inline", marginLeft: "auto" }}
            ></RiArrowDownSFill>
          </div>
          {isSelectSpace && (
            <div className="w-full">
              {spaces?.map((space) => {
                return (
                  <button
                    className="modal-content-select w-full"
                    key={space.id}
                    onClick={() => {
                      setSpace(space);
                    }}
                  >
                    {space.value}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="mt-20 flex">
          <button
            onClick={() => {
              setIsCopyList(false);
            }}
            className="modal-content-button ml-auto"
          >
            cancel
          </button>
          <button
            className="modal-content-button ml-3"
            onClick={() => {
              if (newListNameInputRef.current) {
                updateSpaceMutation.mutate({
                  value: newListNameInputRef.current.value,
                  listId: list.id,
                  id: space.id,
                  isCopyList: true,
                });
              }
              setIsCopyList(false);
            }}
          >
            add list
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopyListModal;
