import { useDispatch, useSelector } from "react-redux";
import "./dashboard.css";
import {
  setData,
  setFilteredData,
  setSelectedFilters,
} from "../../redux/store";
import { useEffect } from "react";

export default function Dashboard({
  refProp,
  handleCartClick,
  handleWishClick,
}) {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state) => state.selectedFilters);
  const data = useSelector((state) => state.data);
  const filteredData = useSelector((state) => state.filteredData);

  function handleCartAddition(product) {
    let newData = data.filter((ele) => ele.id !== product.id);
    let processedProduct = { ...product, carted: true, count: 1 };
    newData = [...newData, processedProduct];
    newData.sort((a, b) => (a.id > b.id ? 1 : -1));
    dispatch(setData(newData));
  }
  function handleCartDelete(product) {
    let newData = data.filter((ele) => ele.id !== product.id);
    let processedProduct = { ...product, carted: false, count: 0 };
    newData = [...newData, processedProduct];
    newData.sort((a, b) => (a.id > b.id ? 1 : -1));
    dispatch(setData(newData));
  }
  function handleWishAddition(product) {
    let newData = data.filter((ele) => ele.id !== product.id);
    let processedProduct = { ...product, wished: true };
    newData = [...newData, processedProduct];
    newData.sort((a, b) => (a.id > b.id ? 1 : -1));
    dispatch(setData(newData));
  }

  useEffect(() => {
    const filteredData = data.filter((product) => {
      const categoryFilter =
        selectedFilters["category"] === 0 ||
        (selectedFilters["category"] === 1 &&
          product.category === "electronics") ||
        (selectedFilters["category"] === 2 &&
          product.category === "jewelery") ||
        (selectedFilters["category"] === 3 &&
          product.category === "men's clothing") ||
        (selectedFilters["category"] === 4 &&
          product.category === "women's clothing");

      const priceFilter =
        selectedFilters["price"] === 0 ||
        (selectedFilters["price"] === 1 &&
          product.price >= 0 &&
          product.price <= 50) ||
        (selectedFilters["price"] === 2 &&
          product.price >= 51 &&
          product.price <= 100) ||
        (selectedFilters["price"] === 3 &&
          product.price >= 101 &&
          product.price <= 200) ||
        (selectedFilters["price"] === 4 && product.price >= 200);

      const ratingFilter =
        selectedFilters["rating"] === 0 ||
        (selectedFilters["rating"] === 1 &&
          product.rating.rate >= 0 &&
          product.rating.rate <= 1) ||
        (selectedFilters["rating"] === 2 &&
          product.rating.rate >= 1.001 &&
          product.rating.rate <= 2) ||
        (selectedFilters["rating"] === 3 &&
          product.rating.rate >= 2.001 &&
          product.rating.rate <= 3) ||
        (selectedFilters["rating"] === 4 &&
          product.rating.rate >= 3.001 &&
          product.rating.rate <= 4) ||
        (selectedFilters["rating"] === 5 &&
          product.rating.rate >= 4.001 &&
          product.rating.rate <= 5);
      // Include the product if it passes both category and price filters
      return categoryFilter && priceFilter && ratingFilter;
    });

    dispatch(setFilteredData(filteredData));
    console.log("in here");
  }, [selectedFilters, dispatch, data]);

  return (
    <>
      <div className="dashboard-container" ref={refProp}>
        <div className="dashboard-listing-container">
          <div className="row m-0 p-0">
            <div className="col-md-12 col-lg-2 m-0 p-0 mt-2 filter-column text-center">
              <p className="dashboard-filter-heading ps-1 mb-0 text-start">
                Filters
              </p>
              <p className="sort-by">categories</p>
              <div className="d-flex justify-content-center filter-containers flex-wrap">
                <div
                  className={
                    "category " +
                    (selectedFilters["category"] == 0 ? "category-active" : "")
                  }
                  onClick={() => {
                    dispatch(
                      setSelectedFilters({ ...selectedFilters, category: 0 })
                    );
                  }}
                >
                  ~
                </div>
                <div
                  className={
                    "category " +
                    (selectedFilters["category"] == 1 ? " category-active" : "")
                  }
                  onClick={() => {
                    dispatch(
                      setSelectedFilters({ ...selectedFilters, category: 1 })
                    );
                  }}
                >
                  electronics
                </div>
                <div
                  className={
                    "category " +
                    (selectedFilters["category"] == 2 ? " category-active" : "")
                  }
                  onClick={() => {
                    dispatch(
                      setSelectedFilters({ ...selectedFilters, category: 2 })
                    );
                  }}
                >
                  jewelery
                </div>
                <div
                  className={
                    "category " +
                    (selectedFilters["category"] == 3 ? " category-active" : "")
                  }
                  onClick={() => {
                    dispatch(
                      setSelectedFilters({ ...selectedFilters, category: 3 })
                    );
                  }}
                >
                  {"men's clothing"}
                </div>
                <div
                  className={
                    "category " +
                    (selectedFilters["category"] == 4 ? " category-active" : "")
                  }
                  onClick={() => {
                    dispatch(
                      setSelectedFilters({ ...selectedFilters, category: 4 })
                    );
                  }}
                >
                  {"women's clothing"}
                </div>
              </div>

              <p className="sort-by">ratings</p>
              <div className="d-flex justify-content-center filter-containers flex-wrap">
                <div
                  className={
                    "category" +
                    (selectedFilters["rating"] == 0 ? " category-active" : "")
                  }
                  onClick={() => {
                    dispatch(
                      setSelectedFilters({ ...selectedFilters, rating: 0 })
                    );
                  }}
                >
                  ~
                </div>
                <div
                  className={
                    "category" +
                    (selectedFilters["rating"] == 1 ? " category-active" : "")
                  }
                  onClick={() => {
                    dispatch(
                      setSelectedFilters({ ...selectedFilters, rating: 1 })
                    );
                  }}
                >
                  0-1
                </div>
                <div
                  className={
                    "category" +
                    (selectedFilters["rating"] == 2 ? " category-active" : "")
                  }
                  onClick={() => {
                    dispatch(
                      setSelectedFilters({ ...selectedFilters, rating: 2 })
                    );
                  }}
                >
                  1.001 - 2
                </div>
                <div
                  className={
                    "category" +
                    (selectedFilters["rating"] == 3 ? " category-active" : "")
                  }
                  onClick={() => {
                    dispatch(
                      setSelectedFilters({ ...selectedFilters, rating: 3 })
                    );
                  }}
                >
                  2.001 - 3
                </div>
                <div
                  className={
                    "category" +
                    (selectedFilters["rating"] == 4 ? " category-active" : "")
                  }
                  onClick={() => {
                    dispatch(
                      setSelectedFilters({ ...selectedFilters, rating: 4 })
                    );
                  }}
                >
                  3.001 - 4
                </div>
                <div
                  className={
                    "category" +
                    (selectedFilters["rating"] == 5 ? " category-active" : "")
                  }
                  onClick={() => {
                    dispatch(
                      setSelectedFilters({ ...selectedFilters, rating: 5 })
                    );
                  }}
                >
                  4.001 - 5
                </div>
              </div>

              <p className="sort-by">prices</p>
              <div className="d-flex justify-content-center filter-containers flex-wrap">
                <div
                  className={
                    "category" +
                    (selectedFilters["price"] == 0 ? " category-active" : "")
                  }
                  onClick={() => {
                    dispatch(
                      setSelectedFilters({ ...selectedFilters, price: 0 })
                    );
                  }}
                >
                  ~
                </div>
                <div
                  className={
                    "category" +
                    (selectedFilters["price"] == 1 ? " category-active" : "")
                  }
                  onClick={() => {
                    dispatch(
                      setSelectedFilters({ ...selectedFilters, price: 1 })
                    );
                  }}
                >
                  $0-$50
                </div>
                <div
                  className={
                    "category" +
                    (selectedFilters["price"] == 2 ? " category-active" : "")
                  }
                  onClick={() => {
                    dispatch(
                      setSelectedFilters({ ...selectedFilters, price: 2 })
                    );
                  }}
                >
                  $51-$100
                </div>
                <div
                  className={
                    "category" +
                    (selectedFilters["price"] == 3 ? " category-active" : "")
                  }
                  onClick={() => {
                    dispatch(
                      setSelectedFilters({ ...selectedFilters, price: 3 })
                    );
                  }}
                >
                  $101-$200
                </div>
                <div
                  className={
                    "category mb-4" +
                    (selectedFilters["price"] == 4 ? " category-active" : "")
                  }
                  onClick={() => {
                    dispatch(
                      setSelectedFilters({ ...selectedFilters, price: 4 })
                    );
                  }}
                >
                  {"> $200"}
                </div>
              </div>

              <p
                className="dashboard-filter-heading external-link-heading ps-1 mb-0 text-start"
                onClick={handleCartClick}
              >
                Cart{" "}
                <img
                  src="/public/external-link.png"
                  className="external-link"
                ></img>
              </p>
              {data?.map((product, i) =>
                product.carted ? (
                  <div key={"c-" + i} className="sort-by d-flex">
                    {product.title}{" "}
                    <span
                      className="ms-auto me-1 mb-2"
                      onClick={() => handleCartDelete(product)}
                    >
                      <img
                        src="/public/delete.png"
                        className="delete-image"
                      ></img>
                    </span>
                  </div>
                ) : (
                  ""
                )
              )}

              <p
                className="dashboard-filter-heading external-link-heading ps-1 mb-0 text-start"
                onClick={handleWishClick}
              >
                Wishlist{" "}
                <img
                  src="/public/external-link.png"
                  className="external-link"
                ></img>
              </p>
              {data?.map((product, i) =>
                product.wished ? (
                  <div key={"w-" + i} className="sort-by">
                    {product.title}
                  </div>
                ) : (
                  ""
                )
              )}
            </div>

            <div className="col-md-12 col-lg-10 row m-0">
              {filteredData?.map((product, i) => (
                <div
                  key={"p-" + i}
                  className="col-lg-6 col-md-4 col-12 m-0 p-2 card-column"
                >
                  <div className="card row m-0 p-0 d-flex flex-lg-row flex-md-column flex-row border-light p-2">
                    <div className="col-lg-6 col-md-12 col-sm-6 col-12 d-flex justify-content-center flex-column align-items-center">
                      <img
                        src={product.image || "/public/placeholder.png"}
                        className="card-img-top"
                        alt="product image"
                      ></img>
                      <div className="dashboard-product-name d-flex justify-content-center mt-2">
                        {product.title}
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-12 col-sm-6 col-12 d-flex flex-column position-relative">
                      <div className="product-price">${product.price}</div>
                      <div className="product-description">
                        {product.description}
                      </div>
                      <button
                        className="dashboard-btn mt-4"
                        onClick={() => handleCartAddition(product)}
                      >
                        Add to cart
                      </button>
                      <button
                        className="dashboard-btn"
                        onClick={() => handleWishAddition(product)}
                      >
                        Add to wishlist
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
