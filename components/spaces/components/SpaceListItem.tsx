import { ISpace } from "../../../intefaces/space";
import * as React from "react";
import SpaceSettingModal from "./SpaceSettingModal";
import Modal from "../../Modal/components/Modal";
import EditSpaceModal from "./EditSpaceModal";
import { IoIosMore } from "react-icons/io";
import Link from "next/link";
import AddCategoryGroup from "../../Category/components/AddCategoryGroup";
import AddListModal from "../../List/components/AddListModal";

const SpaceListItem = ({ space }: { space: ISpace }) => {
  const [isOpenSpaceSetting, setIsOpenSpaceSetting] = React.useState(false);
  const [isAddList, setIsAddList] = React.useState(false);
  const [isUpdateSpace, setIsUpdateSpace] = React.useState(false);

  return (
    <div>
      <>
        <div key={space.id}>
          <div className="flex justify-between items-center relative">
            <div className="block ml-3">{space.value}</div>
            {isOpenSpaceSetting && (
              <SpaceSettingModal
                setIsOpenSpaceSetting={setIsOpenSpaceSetting}
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
                setIsOpenSpaceSetting(!isOpenSpaceSetting);
              }}
            >
              <IoIosMore
                className=""
                style={{ display: "inline", marginRight: "12px" }}
              ></IoIosMore>
            </button>
          </div>
          {space.lists &&
            space.lists.map((list) => {
              return (
                <div className="hover:bg-gray-200 py-1" key={list.id}>
                  <Link href={`/lists/${list.id}`}>
                    <a className="px-6">{list.value}</a>
                  </Link>
                  <AddCategoryGroup list={list}></AddCategoryGroup>
                </div>
              );
            })}
        </div>
      </>
    </div>
  );
};

export default SpaceListItem;
