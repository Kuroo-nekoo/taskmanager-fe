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

  React.useEffect(() => {
    return () => {
      setIsAddList(false);
    };
  }, [setIsAddList]);

  return (
    <div className="flex w-4/12 mx-auto bg-white h-2/6 flex-col rounded-lg">
      <div className="w-full text-3xl border-b border-gray-200 border-solid p-6 flex justify-between items-center ">
        CREAT LIST
        <button
          onClick={() => {
            setIsAddList(false);
          }}
        >
          <GrClose></GrClose>
        </button>
      </div>
      <div className="bg-gray-100 h-full rounded-b-lg p-6 flex flex-col">
        <label className="block" htmlFor="addListInput">
          List name:
        </label>
        <input
          id="addListInput"
          type="text"
          className="border border-gray-300 border-solid h-10"
          ref={addListInputRef}
        ></input>
        <div className="mt-auto flex">
          <button
            onClick={() => {
              setIsAddList(false);
            }}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ml-auto"
          >
            cancel
          </button>
          <button
            className="ml-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 "
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
