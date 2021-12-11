import * as React from "react";
import { useQueryClient } from "react-query";
import AddCategoryGroup from "../../Category/components/AddCategoryGroup";
import { ISpace } from "../../../intefaces/space";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { IoIosMore } from "react-icons/io";
import SpaceSettingModal from "../../spaces/components/SpaceSettingModal";
import Modal from "../../Modal/components/Modal";
import AddListModal from "../../List/components/AddListModal";
import useDeleteList from "../../List/hooks/useDeleteList";
import AddSpaceModal from "../../spaces/components/AddSpaceModal";
import EditSpaceModal from "../../spaces/components/EditSpaceModal";

const Sidebar = () => {
  const queryClient = useQueryClient();
  const spaces = queryClient.getQueryData<ISpace[]>("spaces");
  const [isOpenSpaceTab, setIsOpenSpaceTab] = React.useState(false);
  const [isAddSpace, setIsAddSpace] = React.useState(false);
  const [isAddList, setIsAddList] = React.useState(false);
  const [isSettingSpace, setIsSettingSpace] = React.useState(false);
  const [isUpdateSpace, setIsUpdateSpace] = React.useState(false);

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
        <div className="m-4">
          {isOpenSpaceTab && (
            <button
              className="block bg-gray-100 hover:bg-gray-200 w-full rounded-sm"
              onClick={() => {
                setIsAddSpace(!isAddSpace);
              }}
            >
              new space +
            </button>
          )}
          {isAddSpace && (
            <Modal>
              <AddSpaceModal setIsAddSpace={setIsAddSpace}></AddSpaceModal>
            </Modal>
          )}
        </div>

        {isOpenSpaceTab &&
          spaces &&
          spaces.map((space) => {
            return (
              <>
                <div key={space.id}>
                  <div className="flex justify-between items-center px-4 relative">
                    <div className="block">{space.value}</div>
                    {isSettingSpace && (
                      <SpaceSettingModal
                        setIsSettingSpace={setIsSettingSpace}
                        setIsAddList={setIsAddList}
                        setIsUpdateSpace={setIsUpdateSpace}
                        space={space}
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
                    {isUpdateSpace && (
                      <Modal>
                        <EditSpaceModal
                          space={space}
                          setIsUpdateSpace={setIsUpdateSpace}
                        ></EditSpaceModal>
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
                  {space.lists &&
                    space.lists.map((list) => {
                      return (
                        <div className="hover:bg-gray-200" key={list.id}>
                          <Link href={`/lists/${list.id}`}>
                            <a className="ml-3">{list.value}</a>
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
