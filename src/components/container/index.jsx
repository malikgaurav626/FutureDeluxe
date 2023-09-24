import "./container.css";

export default function Container({ children, refProp }) {
  return (
    <>
      <div
        className="container-container"
        ref={refProp}
        id="containerContainerId"
      >
        {children}
      </div>
    </>
  );
}
