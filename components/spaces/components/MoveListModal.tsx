import * as React from "react";
import { useQueryClient } from "react-query";
import { GrClose } from "react-icons/gr";
import { ISpace } from "../../../intefaces/space";
import useUpdateSpace from "../hooks/useUpdateSpace";
import useDeleteList from "../../List/hooks/useDeleteList";
import { IList } from "../../../intefaces/list";
import { RiArrowDownSFill } from "react-icons/ri";

export const MoveListModal = ({
  setIsMoveList,
  list,
}: {
  setIsMoveList: Function;
  list: IList;
}) => {
  const queryClient = useQueryClient();
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const updateSpaceMutation = useUpdateSpace(queryClient);
  const deleteListMutation = useDeleteList(queryClient);
  const spaces = queryClient.getQueryData<ISpace[]>("spaces");
  const [space, setSpace] = React.useState<ISpace | null>(spaces![0]);
  const [isSelectSpace, setIsSelectSpace] = React.useState(false);

  React.useEffect(() => {
    const detectOutsideClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsMoveList(false);
      }
    };
    document.addEventListener("click", detectOutsideClick);

    return () => {
      setIsMoveList(false);
      document.removeEventListener("click", detectOutsideClick);
    };
  }, [setIsMoveList]);

  return (
    <div className="w-4/12 modal" ref={wrapperRef}>
      <div className="modal-title">
        MOVE LIST
        <button
          onClick={() => {
            setIsMoveList(false);
          }}
        >
          <GrClose></GrClose>
        </button>
      </div>
      <div className="modal-content">
        <div className="block">move {list.value} to:</div>
        <button
          className="modal-content-select "
          onClick={() => {
            setIsSelectSpace(!isSelectSpace);
          }}
        >
          {space && space.value}
          <RiArrowDownSFill
            style={{
              display: "inline",
              marginLeft: "auto",
            }}
          ></RiArrowDownSFill>
        </button>
        <div className="transform translate-y-2">
          {isSelectSpace &&
            spaces &&
            spaces.map((space) => {
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
        <div className="mt-20 flex">
          <button
            onClick={() => {
              setIsMoveList(false);
            }}
            className="modal-content-button ml-auto"
          >
            cancel
          </button>
          <button
            className="modal-content-button ml-3"
            onClick={() => {
              if (space) {
                updateSpaceMutation.mutate({
                  id: space.id,
                  listId: list.id,
                  isMoveList: true,
                });
              }
              setIsMoveList(false);
            }}
          >
            move
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoveListModal;
