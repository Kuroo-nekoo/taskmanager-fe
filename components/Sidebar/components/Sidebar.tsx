import * as React from "react";
import { useQueryClient } from "react-query";
import AddCategoryGroup from "../../Category/components/AddCategoryGroup";
import { ISpace } from "../../../intefaces/space";
import useAddSpace from "../../spaces/hooks/useAddSpace";
import useDeleteSpace from "../../spaces/hooks/useDeleteSpace";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import UpdateSpaceGroup from "../../spaces/components/UpdateSpaceGroup";
import { IoIosMore } from "react-icons/io";
import SpaceSettingModal from "../../spaces/components/SpaceSettingModal";
import Modal from "../../Modal/components/Modal";
import AddListModal from "../../List/components/AddListModal";
import useDeleteList from "../../List/hooks/useDeleteList";

const Sidebar = () => {
  const queryClient = useQueryClient();
  const spaces = queryClient.getQueryData<ISpace[]>("spaces");
  const addSpaceInputRef = React.useRef<HTMLInputElement | null>(null);
  const [isOpenSpaceTab, setIsOpenSpaceTab] = React.useState(false);
  const [isAddSpace, setIsAddSpace] = React.useState(false);
  const [isAddList, setIsAddList] = React.useState(false);
  const [isSettingSpace, setIsSettingSpace] = React.useState(false);

  const addSpaceMutation = useAddSpace(queryClient);
  const deleteSpaceMutation = useDeleteSpace(queryClient);
  const deleteListMutation = useDeleteList(queryClient);

  return (
    <div className="h-screen col-span-2 border-r border-black border-solid ">
      <button
        className="w-full p-2 flex items-center justify-between text-lg hover:bg-gray-50 uppercase px-4"
        onClick={() => {
          setIsOpenSpaceTab(!isOpenSpaceTab);
        }}
      >
        space
        {isOpenSpaceTab ? (
          <IoIosArrowDown
            style={{ display: "inline", marginLeft: "12px" }}
          ></IoIosArrowDown>
        ) : (
          <IoIosArrowForward
            style={{ display: "inline", marginLeft: "12px" }}
          ></IoIosArrowForward>
        )}
      </button>
      <div className="border-gray-200 border-solid border-b">
        <button
          className="block bg-gray-100 hover:bg-gray-200 w-full"
          onClick={() => {
            setIsAddSpace(!isAddSpace);
          }}
        >
          new space +
        </button>
        {isAddSpace && (
          <div className="block">
            <input type="text" ref={addSpaceInputRef} />
            <button
              onClick={() => {
                if (addSpaceInputRef.current) {
                  addSpaceMutation.mutate({
                    value: addSpaceInputRef.current.value,
                  });
                }
              }}
            >
              add
            </button>
            <button
              className="ml-3"
              onClick={() => {
                setIsAddSpace(!isAddSpace);
              }}
            >
              cancel
            </button>
          </div>
        )}
        {isOpenSpaceTab &&
          spaces &&
          spaces.map((space) => {
            return (
              <>
                <div key={space.id}>
                  <div className="flex justify-between items-center px-4 relative">
                    {space.value}
                    {isSettingSpace && (
                      <SpaceSettingModal
                        setIsSettingSpace={setIsSettingSpace}
                        setIsAddList={setIsAddList}
                      ></SpaceSettingModal>
                    )}
                    {isAddList && (
                      <Modal>
                        <AddListModal
                          setIsAddList={setIsAddList}
                          space={space}
                        ></AddListModal>
                      </Modal>
                    )}
                    <button
                      onClick={() => {
                        setIsSettingSpace(!isSettingSpace);
                      }}
                    >
                      <IoIosMore style={{ display: "inline" }}></IoIosMore>
                    </button>
                  </div>
                  <UpdateSpaceGroup space={space}></UpdateSpaceGroup>
                  <button
                    className="ml-3"
                    onClick={() => {
                      deleteSpaceMutation.mutate(space.id);
                    }}
                  >
                    delete
                  </button>
                  {space.lists &&
                    space.lists.map((list) => {
                      return (
                        <div className="ml-3" key={list.id}>
                          <Link href={`/lists/${list.id}`}>
                            <a>{list.value}</a>
                          </Link>
                          <button
                            className="ml-3"
                            onClick={() => {
                              deleteListMutation.mutate(list.id);
                            }}
                          >
                            delete
                          </button>
                          <AddCategoryGroup list={list}></AddCategoryGroup>
                        </div>
                      );
                    })}
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;
