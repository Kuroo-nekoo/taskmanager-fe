import * as React from "react";
import { useQueryClient } from "react-query";
import { useRouter } from "next/router";
import AddCategoryGroup from "../../Category/components/AddCategoryGroup";
import { ISpace } from "../../../intefaces/space";
import useAddSpace from "../../spaces/hooks/useAddSpace";
import useDeleteSpace from "../../spaces/hooks/useDeleteSpace";
import { BiRightArrow, BiDownArrow } from "react-icons/bi";

const Sidebar = () => {
  const queryClient = useQueryClient();
  const spaces = queryClient.getQueryData<ISpace[]>("spaces");
  const addSpaceInputRef = React.useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [isOpenSpaceTab, setIsOpenSpaceTab] = React.useState(false);
  const [isAddSpace, setIsAddSpace] = React.useState(false);

  const addSpaceMutation = useAddSpace(queryClient);
  const deleteSpaceMutation = useDeleteSpace(queryClient);

  return (
    <div className="h-screen col-span-2 border-r border-black border-solid">
      {spaces &&
        spaces.map((space) => {
          return (
            <>
              <button
                className="w-full bg-gray-200 p-2 flex items-center justify-center"
                onClick={() => {
                  setIsOpenSpaceTab(!isOpenSpaceTab);
                }}
              >
                space
                {isOpenSpaceTab ? (
                  <BiDownArrow
                    style={{ display: "inline", marginLeft: "12px" }}
                  ></BiDownArrow>
                ) : (
                  <BiRightArrow
                    style={{ display: "inline", marginLeft: "12px" }}
                  ></BiRightArrow>
                )}
              </button>
              {isOpenSpaceTab ? (
                <div key={space.id}>
                  {isAddSpace ? (
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
                  ) : (
                    <button
                      className="block"
                      onClick={() => {
                        setIsAddSpace(!isAddSpace);
                      }}
                    >
                      new space +
                    </button>
                  )}
                  {space.value}
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
                        <div className="ml-3" key={list.value}>
                          <div
                            className="inline"
                            onClick={(e) => {
                              // if (!router.asPath.includes("list")) {
                              router.push(`lists/${list.id}`);
                              // }
                            }}
                          >
                            {list.value}
                          </div>
                          <AddCategoryGroup list={list}></AddCategoryGroup>
                        </div>
                      );
                    })}
                </div>
              ) : null}
            </>
          );
        })}
    </div>
  );
};

export default Sidebar;
