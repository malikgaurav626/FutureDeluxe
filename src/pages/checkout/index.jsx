import { useDispatch, useSelector } from "react-redux";
import "./checkout.css";
import { setRouteLocation } from "../../redux/store";

export default function Checkout() {
  const data = useSelector((state) => state.data);
  const totalCheckout = useSelector((state) => state.totalCheckout);
  const dispatch = useDispatch();

  function handleGoBack() {
    const cartContainer = document.getElementById("checkoutContainerId");
    const containerContainer = document.getElementById("containerContainerId");
    cartContainer.style.animation =
      "animata-fadeAway 0.2s linear 0s 1 forwards";
    containerContainer.style.overflowY = "auto";
    setTimeout(() => {
      dispatch(setRouteLocation(2));
    }, 400);
  }

  function handleOrder() {
    const cartContainer = document.getElementById("checkoutContainerId");
    const containerContainer = document.getElementById("containerContainerId");
    cartContainer.style.animation =
      "animata-fadeAway 0.2s linear 0s 1 forwards";
    containerContainer.style.overflowY = "auto";

    setTimeout(() => {
      dispatch(setRouteLocation(5));
    }, 400);
  }

  return (
    <>
      <div
        className="cart-container d-flex justify-content-center align-items-center"
        id="checkoutContainerId"
      >
        <div className="cart-body-container position-relative">
          <div className="cart-title d-flex align-items-center">
            <p className="m-0 mt-1">Checkout</p>
            <span className="go-back ms-auto me-1" onClick={handleGoBack}>
              go back
            </span>
          </div>
          {data
            ?.filter((product) => product.carted)
            ?.map((product, i) => (
              <>
                <div key={"chekout-" + i} className="checkout-element">
                  <div className="checkout-element-title w-100 d-flex">
                    <span>{product.title}</span>
                    <span className="ms-auto">x {product.count}</span>
                  </div>
                </div>
                <div>
                  <hr></hr>
                </div>
              </>
            ))}
          <div className="checkout-total d-flex">
            <span className="me-auto">Total</span>${totalCheckout}+taxes
          </div>

          <div className="address-container">
            <div className="address-title mt-4">Address</div>
            <div className="address-form">
              <form
                className="address-from-class d-flex flex-column align-items-center"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  className="address-input"
                  placeholder="Contact"
                ></input>
                <input
                  type="text"
                  className="address-input"
                  placeholder="Psuedo Card No."
                  id="CardNoId"
                ></input>
                <div className="d-flex justify-content-center">
                  <input
                    type="text"
                    className="address-input"
                    id="month"
                    placeholder="Month"
                  ></input>
                  <input
                    type="text"
                    className="address-input"
                    id="year"
                    placeholder="Year"
                  ></input>
                </div>
                <input
                  type="text"
                  className="address-input cvv"
                  placeholder="CVC"
                ></input>
                <button className="submit-btn" onClick={handleOrder}>
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
