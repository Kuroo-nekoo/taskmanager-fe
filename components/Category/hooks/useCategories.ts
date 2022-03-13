import axios from "axios";
import { useQuery } from "react-query";
import { ICategory } from "../../../intefaces/category";

export default function useCategories(listId?: string | string[]) {
  return useQuery("categories", getCategories);
}

export const getCategories = async () => {
  const categoryUrl = "http://localhost:4000/categories";

  try {
    const res = await axios.get<ICategory[]>(categoryUrl);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
