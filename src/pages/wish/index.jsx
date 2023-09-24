import { useDispatch, useSelector } from "react-redux";
import "./wish.css";
import { setRouteLocation, setData } from "../../redux/store";

export default function Wishlist({ handleCartClick, refProp }) {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  function handleGoBack() {
    const cartContainer = document.getElementById("cartContainerId");
    const canvasContainer = document.getElementById("canvasContainerId");
    const containerContainer = document.getElementById("containerContainerId");
    containerContainer.style.overflowY = "auto";
    cartContainer.style.animation =
      "animata-fadeAway 0.2s linear 0s 1 forwards";
    canvasContainer.style.animation =
      "animata-fadeAway 0.2s linear 0s 1 forwards";
    setTimeout(() => {
      dispatch(setRouteLocation(1));
    }, 400);
  }

  function handleCartAddition(product) {
    let newData = data.filter((ele) => ele.id !== product.id);
    let processedProduct = { ...product, carted: true, count: 1 };
    newData = [...newData, processedProduct];
    newData.sort((a, b) => (a.id > b.id ? 1 : -1));
    dispatch(setData(newData));
  }

  return (
    <>
      <div
        className="cart-container d-flex justify-content-center align-items-center"
        id="cartContainerId"
        ref={refProp}
      >
        <div className="cart-body-container position-relative">
          <div className="cart-title d-flex align-items-center">
            <p className="m-0 mt-1">Wishlist</p>
            <span className="go-back ms-auto me-1" onClick={handleGoBack}>
              go back
            </span>
          </div>
          {data
            ?.filter((product) => product.wished)
            ?.map((product, i) => (
              <div
                key={"c" + i}
                className="cart-listing-container row m-0 p-0 mt-4 justify-content-center"
              >
                <div className="col-2">
                  <img src={product.image} className="cart-img"></img>
                </div>
                <div className="col-10 flex-column d-flex">
                  <div className="cart-listing-name">{product.title}</div>
                  <sub className="cart-listing-price">${product.price}</sub>
                  <button
                    className="addToCartBtn dashboard-btn"
                    onClick={() => handleCartAddition(product)}
                  >
                    {product.carted ? "already in cart" : "Add to cart"}
                  </button>
                </div>
              </div>
            ))}
          <div className="wish-to-cart" onClick={handleCartClick}>
            Go to Cart
            <img className="checkout-img" src="/public/checkout.png"></img>
          </div>
        </div>
      </div>
    </>
  );
}
