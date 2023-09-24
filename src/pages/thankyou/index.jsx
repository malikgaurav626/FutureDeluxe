import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./thank.css";
import { setData, setRouteLocation } from "../../redux/store";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function Thankyou() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  function handleGoBack() {
    const resetData = data.map((product) => {
      if (product.carted) {
        return { ...product, carted: false, count: 0 };
      }
      return product;
    });
    dispatch(setData(resetData));
    const thankContainer = document.getElementById("thankContainerId");
    const containerContainer = document.getElementById("containerContainerId");
    const canvasContainer = document.getElementById("canvasContainerId");
    thankContainer.style.animation =
      "animata-fadeAway 0.2s linear 0s 1 forwards";
    containerContainer.style.overflowY = "auto";
    canvasContainer.style.animation =
      "animata-fadeAway 0.2s linear 0s 1 forwards";

    setTimeout(() => {
      dispatch(setRouteLocation(1));
    }, 400);
  }

  function handleGoHome() {
    const resetData = data.map((product) => {
      if (product.carted) {
        return { ...product, carted: false, count: 0 };
      }
      return product;
    });
    dispatch(setData(resetData));
    const thankContainer = document.getElementById("thankContainerId");
    thankContainer.style.animation =
      "animata-fadeAway 0.2s linear 0s 1 forwards";
    const containerContainer = document.getElementById("containerContainerId");
    containerContainer.style.overflowY = "hidden";
    setTimeout(() => {
      dispatch(setRouteLocation(0));
    }, 400);
  }

  return (
    <>
      <div
        className="cart-container d-flex justify-content-center flex-column align-items-center"
        id="thankContainerId"
      >
        <div className="cart-body-container position-relative d-flex justify-content-center align-items-center">
          <AnimatedProgressBar />
          <div className="bottom-nav d-flex w-100 p-2 ps-3 pe-3">
            <div className="bottom-nav-btn me-auto" onClick={handleGoHome}>
              go to homepage
            </div>
            <div className="bottom-nav-btn ms-auto" onClick={handleGoBack}>
              shop more
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const AnimatedProgressBar = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prevPercentage) => {
        const newPercentage = prevPercentage + 1;
        if (newPercentage > 100) {
          clearInterval(interval); // Clear the interval when the progress reaches 100
          return 100; // Set the percentage to 100
        }
        return newPercentage;
      });
    }, 30); // Adjust the interval time as per your preference

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "300px",
        height: "300px",
      }}
    >
      <CircularProgressbar
        value={percentage}
        strokeWidth={0.2}
        styles={buildStyles({
          pathColor: "#c5c6d5",
          textColor: "#1b1e26",
          trailColor: "#1b1e26",
        })}
      />
      <div className="placing-order">placing order</div>
    </div>
  );
};
