import "./App.css";
import Container from "./components/container";
import BackgroundCanvas from "./components/backgroundCanvas";
import WelcomeBody from "./pages/welcome";
import Cart from "./pages/cart";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRouteLocation } from "./redux/store";
import Dashboard from "./pages/dashboard";
import { getData } from "./apicalls";
import Wishlist from "./pages/wish";
import Checkout from "./pages/checkout";
import Thankyou from "./pages/thankyou";
function App() {
  const welcomeRef = useRef();
  const canvasRef = useRef();
  const containerRef = useRef();
  const dashboardRef = useRef();
  const wishlistRef = useRef();
  const dispatch = useDispatch();
  const routeLocation = useSelector((state) => state.routeLocation);

  useEffect(() => {
    getData(dispatch);
  }, [dispatch]);
  function handleEnter() {
    const welcomeContainer = welcomeRef.current;
    const canvasContainer = canvasRef.current;
    canvasContainer.style.animation =
      "animata-fadeAway 0.2s linear 0s 1 forwards";
    welcomeContainer.style.animation =
      "animata-fadeAway 0.2s linear 0s 1 forwards";

    setTimeout(() => {
      dispatch(setRouteLocation(1));
      const container = containerRef.current;
      container.style.overflowY = "auto";
    }, 400);
  }
  function handleCartClick() {
    const dashboardContainer = dashboardRef.current;
    const container = containerRef.current;
    console.log(dashboardContainer);
    dashboardContainer.style.animation =
      "animata-fadeAway 0.2s linear 0s 1 forwards";
    console.log(dashboardContainer);
    container.style.overflowY = "hidden";
    setTimeout(() => {
      dispatch(setRouteLocation(2));
    }, 800);
  }
  function handleWishToCartClick() {
    const wishlistContainer = wishlistRef.current;
    const container = containerRef.current;
    wishlistContainer.style.animation =
      "animata-fadeAway 0.2s linear 0s 1 forwards";
    container.style.overflowY = "hidden";
    setTimeout(() => {
      dispatch(setRouteLocation(2));
    }, 800);
  }
  function handleWishClick() {
    const dashboardContainer = dashboardRef.current;
    const container = containerRef.current;
    console.log(dashboardContainer);
    dashboardContainer.style.animation =
      "animata-fadeAway 0.2s linear 0s 1 forwards";
    console.log(dashboardContainer);
    container.style.overflowY = "hidden";
    setTimeout(() => {
      dispatch(setRouteLocation(3));
    }, 800);
  }

  return (
    <>
      <div className="dashboard-main-heading">- Future Deluxe</div>
      <Container refProp={containerRef}>
        {routeLocation == 0 ? (
          <>
            <BackgroundCanvas refProp={canvasRef} />
            <WelcomeBody handleEnter={handleEnter} refProp={welcomeRef} />
          </>
        ) : routeLocation == 1 ? (
          <Dashboard
            refProp={dashboardRef}
            handleCartClick={handleCartClick}
            handleWishClick={handleWishClick}
          />
        ) : routeLocation == 2 ? (
          <>
            <BackgroundCanvas refProp={canvasRef} />
            <Cart />
          </>
        ) : routeLocation == 3 ? (
          <>
            <BackgroundCanvas refProp={canvasRef} />
            <Wishlist
              handleCartClick={handleWishToCartClick}
              refProp={wishlistRef}
            />
          </>
        ) : routeLocation == 4 ? (
          <>
            <BackgroundCanvas refProp={canvasRef} />
            <Checkout />
          </>
        ) : (
          <>
            <BackgroundCanvas refProp={canvasRef} />
            <Thankyou />
          </>
        )}
      </Container>
      {routeLocation == 1 && (
        <div className="dashboard-vapor-squad">- vaporSquad</div>
      )}
    </>
  );
}

export default App;
