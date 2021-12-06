import * as React from "react";
import Sidebar from "../../components/Sidebar/components/Sidebar";
import CategoryList from "../../components/Category/components/CategoryList";
import { dehydrate, QueryClient, useQuery } from "react-query";
import axios from "axios";
import useCategories from "../../components/Category/hooks/useCategories";
import useSpaces from "../../components/spaces/hooks/useSpaces";

const List = () => {
  const categoryQuery = useCategories();
  const spaceQuery = useSpaces();

  return (
    <div className="w-screen h-screen grid grid-cols-12">
      <Sidebar></Sidebar>
      <div className="px-16 py-16 w-full col-span-10">
        <CategoryList></CategoryList>
      </div>
    </div>
  );
};

export default List;

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("categories", async () => {
    try {
      const res = await axios.get("http://localhost:4000/categories");
      return res.data;
    } catch (err) {
      console.error(err);
    }
  });

  await queryClient.prefetchQuery("spaces", async () => {
    try {
      const res = await axios.get("http://localhost:4000/spaces");
      return res.data;
    } catch (err) {
      console.error(err);
    }
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
