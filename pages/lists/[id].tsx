import * as React from "react";
import Sidebar from "../../components/Sidebar/components/Sidebar";
import CategoryList from "../../components/Category/components/CategoryList";
import { dehydrate, QueryClient } from "react-query";
import useSpaces, { getSpaces } from "../../components/spaces/hooks/useSpaces";
import { useRouter } from "next/dist/client/router";
import { GetServerSideProps } from "next";
import useList, { getList } from "../../components/List/hooks/useList";

const List = () => {
  const router = useRouter();
  const spaceQuery = useSpaces();
  const listQuery = useList(router.query.id as string);

  return (
    <>
      <div className="w-screen h-screen grid grid-cols-12">
        <Sidebar></Sidebar>
        <CategoryList></CategoryList>
      </div>
    </>
  );
};

export default List;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  if (!Array.isArray(context.query.id) && context.query.id) {
    await queryClient.prefetchQuery("list", getList(context.query.id));
  }

  await queryClient.prefetchQuery("spaces", getSpaces);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
