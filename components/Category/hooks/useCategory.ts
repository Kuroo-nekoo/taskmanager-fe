import axios from "axios";
import { useQuery } from "react-query";
import { ICategory } from "../../../intefaces/category";

export default function useCategory() {
  const categoryUrl = "http://localhost:4000/categories";

  return useQuery("categories", async () => {
    try {
      const res = await axios.get<ICategory[]>(categoryUrl);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  });
}
