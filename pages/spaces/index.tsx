import { GetServerSideProps } from "next";
import * as React from "react";
import { dehydrate, QueryClient } from "react-query";
import Sidebar from "../../components/Sidebar/components/Sidebar";
import useSpaces, { getSpaces } from "../../components/spaces/hooks/useSpaces";

const List = () => {
  const spaceQuery = useSpaces();

  return (
    <div className="w-screen h-screen grid grid-cols-12">
      <Sidebar></Sidebar>
    </div>
  );
};
export default List;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("spaces", getSpaces);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
