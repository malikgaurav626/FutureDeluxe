import AestheticNavButton from "../../components/aestheticBtn";
import "./welcome.css";

export default function WelcomeBody({ handleEnter, refProp }) {
  return (
    <>
      <div className="welcome-container d-flex flex-column" ref={refProp}>
        <p className="main-heading">
          <span className="dash">-</span> Future{" "}
          <span className="psuedo-dash">-</span>
          Deluxe
          <sub className="iteration">09</sub>
        </p>
        <div className="vapor-squad">- by vaporSquad</div>
        <div>
          <AestheticNavButton>- Other Projects</AestheticNavButton>
        </div>
        <div className="d-sm-flex d-none">
          <button className="enter-btn" onClick={handleEnter}>
            - Ingress <span className="psuedo-dash">&nbsp;-</span>
          </button>
        </div>
        <button
          className="small-enter-btn d-sm-none no-select"
          onClick={handleEnter}
        >
          - Ingress
        </button>
        <sub className="iteration-2">09</sub>
      </div>
    </>
  );
}
