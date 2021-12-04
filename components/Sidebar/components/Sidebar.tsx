import * as React from "react";
import { useQueryClient } from "react-query";
import useAddCategory from "../../Category/hooks/useAddCategory";
import useLists from "../../List/hooks/useLists";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const addCategoryValueInputRef = React.useRef<HTMLInputElement | null>(null);
  const addCategoryColorInputRef = React.useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const addCategoryMutation = useAddCategory(queryClient);
  const listQuery = useLists(queryClient);
  const router = useRouter();

  return (
    <div className="h-screen col-span-2 border-r border-black border-solid">
      {listQuery.isSuccess && (
        <>
          <input
            type="text"
            ref={addCategoryValueInputRef}
            placeholder="enter category value here"
          ></input>
          <input
            type="text"
            ref={addCategoryColorInputRef}
            placeholder="enter category value here"
          ></input>
          <button
            onClick={() => {
              if (
                addCategoryValueInputRef.current &&
                addCategoryColorInputRef.current
              ) {
                addCategoryMutation.mutate({
                  value: addCategoryValueInputRef.current.value,
                  color: addCategoryColorInputRef.current.value,
                });
              }
            }}
          >
            add
          </button>
          <div>
            {listQuery.data &&
              listQuery.data.map((list) => {
                return (
                  <div
                    key={list.value}
                    onClick={() => {
                      router.push(`lists/${list.id}`, undefined, {
                        shallow: true,
                      });
                    }}
                  >
                    {list.value}
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
