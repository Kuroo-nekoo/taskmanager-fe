import axios from "axios";
import { useQuery } from "react-query";

export const getSpaces = async () => {
  const spaceUrl = "http://localhost:4000/spaces";

  try {
    const res = await axios.get(spaceUrl);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default function useSpaces() {
  return useQuery("spaces", getSpaces);
}
