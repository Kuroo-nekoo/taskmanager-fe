import * as React from "react";
import { useQueryClient } from "react-query";
import AddCategoryGroup from "../../Category/components/AddCategoryGroup";
import { ISpace } from "../../../intefaces/space";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { IoIosMore } from "react-icons/io";
import SpaceSettingModal from "../../spaces/components/SpaceSettingModal";
import Modal from "../../Modal/components/Modal";
import useDeleteList from "../../List/hooks/useDeleteList";
import AddSpaceModal from "../../spaces/components/AddSpaceModal";
import SpaceListItem from "../../spaces/components/SpaceListItem";

const Sidebar = () => {
  const queryClient = useQueryClient();
  const spaces = queryClient.getQueryData<ISpace[]>("spaces");
  const [isOpenSpaceTab, setIsOpenSpaceTab] = React.useState(false);
  const [isAddSpace, setIsAddSpace] = React.useState(false);

  const deleteListMutation = useDeleteList(queryClient);

  return (
    <div className="h-screen col-span-2 border-r border-gray-300 border-solid">
      <div className="border border-gray-200 border-solid">
        <button
          className="w-full p-2 flex items-center justify-between text-lg hover:bg-gray-50 uppercase"
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
        {isOpenSpaceTab && (
          <div className="border-gray-200 border-solid border-b">
            <div className="p-4">
              <button
                className="block bg-gray-100 hover:bg-gray-200 w-full rounded-sm"
                onClick={() => {
                  setIsAddSpace(!isAddSpace);
                }}
              >
                new space +
              </button>
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
                  <React.Fragment key={space.id}>
                    <SpaceListItem space={space}></SpaceListItem>
                  </React.Fragment>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
