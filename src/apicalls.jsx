import { setData, setFilteredData } from "./redux/store";
export async function getData(dispatch) {
  const response = await fetch("https://fakestoreapi.com/products");
  let data = await response.json();

  data.forEach((ele) => {
    ele["carted"] = false;
    ele["wished"] = false;
    ele["count"] = 0;
  });
  console.log("data", data);

  dispatch(setData(data));
  dispatch(setFilteredData(data));
}
