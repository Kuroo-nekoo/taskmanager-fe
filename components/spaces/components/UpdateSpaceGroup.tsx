import * as React from "react";
import { useQueryClient } from "react-query";
import { ISpace } from "../../../intefaces/space";
import useUpdateSpace from "../../spaces/hooks/useUpdateSpace";

const UpdateSpaceGroup = ({ space }: { space: ISpace }) => {
  const queryClient = useQueryClient();
  const updateSpaceInputRef = React.useRef<HTMLInputElement | null>(null);

  const updateSpaceMutation = useUpdateSpace(queryClient);

  return (
    <div>
      <input placeholder="update space value" ref={updateSpaceInputRef}></input>
      <button
        onClick={() => {
          if (updateSpaceInputRef.current) {
            updateSpaceMutation.mutate({
              value: updateSpaceInputRef.current.value,
              id: space.id,
            });
          }
        }}
      >
        update
      </button>
    </div>
  );
};

export default UpdateSpaceGroup;
