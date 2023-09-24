import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import { setData, setRouteLocation, setTotalCheckout } from "../../redux/store";
import { useCallback, useEffect } from "react";

export default function Cart() {
  const data = useSelector((state) => state.data);
  const totalCheckout = useSelector((state) => state.totalCheckout);
  const dispatch = useDispatch();

  const handleCountIncrease = useCallback(
    (product) => {
      let newData = data.map((ele) => {
        if (ele.id === product.id) {
          return { ...ele, count: ele.count + 1 };
        }
        return ele;
      });
      dispatch(setData(newData));
    },
    [data, dispatch]
  );

  const handleCountDecrease = useCallback(
    (product) => {
      let newData = data.map((ele) => {
        if (ele.id === product.id && ele.count > 0) {
          return { ...ele, count: ele.count - 1 };
        }
        return ele;
      });
      dispatch(setData(newData));
    },
    [data, dispatch]
  );

  const handleChange = useCallback(
    (event, product) => {
      let newData = data.map((ele) => {
        if (ele.id === product.id && event.target.value > 0) {
          return { ...ele, count: Number(event.target.value) };
        } else if (ele.id === product.id && event.target.value <= 0) {
          return { ...ele };
        }
        return ele;
      });
      dispatch(setData(newData));
    },
    [data, dispatch]
  );

  function handleGoBack() {
    const cartContainer = document.getElementById("cartContainerId");
    const canvasContainer = document.getElementById("canvasContainerId");
    const containerContainer = document.getElementById("containerContainerId");
    cartContainer.style.animation =
      "animata-fadeAway 0.2s linear 0s 1 forwards";
    canvasContainer.style.animation =
      "animata-fadeAway 0.2s linear 0s 1 forwards";
    containerContainer.style.overflowY = "auto";
    setTimeout(() => {
      dispatch(setRouteLocation(1));
    }, 400);
  }
  function handleCheckoutClick() {
    const cartContainer = document.getElementById("cartContainerId");
    cartContainer.style.animation =
      "animata-fadeAway 0.2s linear 0s 1 forwards";
    setTimeout(() => {
      dispatch(setRouteLocation(4));
    }, 400);
  }
  function handleCartDelete(product) {
    let newData = data.filter((ele) => ele.id !== product.id);
    let processedProduct = { ...product, carted: false, count: 0 };
    newData = [...newData, processedProduct];
    newData.sort((a, b) => (a.id > b.id ? 1 : -1));
    dispatch(setData(newData));
  }

  useEffect(() => {
    const totalPrice = data
      .filter((item) => item.carted)
      .reduce((total, item) => total + item.price * item.count, 0)
      .toFixed(1);
    dispatch(setTotalCheckout(totalPrice));
  }, [data, dispatch]);

  return (
    <>
      <div
        className="cart-container d-flex justify-content-center align-items-center"
        id="cartContainerId"
      >
        <div className="cart-body-container position-relative">
          <div className="cart-title d-flex align-items-center">
            <p className="m-0 mt-1">Cart</p>
            <span className="go-back ms-auto me-1" onClick={handleGoBack}>
              go back
            </span>
          </div>
          {data
            ?.filter((product) => product.carted)
            ?.map((product, i) => (
              <div
                key={"c" + i}
                className="cart-listing-container row m-0 p-0 mt-4 justify-content-center"
              >
                <div className="col-2">
                  <img src={product.image} className="cart-img"></img>
                </div>
                <div className="col-10">
                  <div className="cart-listing-name d-flex me-auto">
                    {product.title}
                    <span
                      className="ms-auto me-1"
                      onClick={() => handleCartDelete(product)}
                    >
                      <img
                        src="/public/delete.png"
                        className="delete-image"
                      ></img>
                    </span>
                  </div>
                  <sub className="cart-listing-price">${product.price}</sub>
                  <div className="cart-item-number-btn">
                    <button
                      className="count-btn"
                      onClick={() => handleCountDecrease(product)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="count-input pb-0"
                      value={product.count}
                      onChange={(event) => handleChange(event, product)}
                    ></input>
                    <button
                      className="count-btn"
                      onClick={() => handleCountIncrease(product)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          <div className="checkout" onClick={handleCheckoutClick}>
            <p className="m-0 d-flex align-items-center">
              <span className="checkout-title d-flex align-items-center">
                Checkout
                <img className="checkout-img" src="/public/checkout.png"></img>
              </span>{" "}
              <span className="money m-0 ms-auto">
                ${totalCheckout}
                +taxes.
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
