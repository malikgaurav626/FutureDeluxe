import "./aestheticbtn.css";
export default function AestheticNavButton({ children }) {
  return (
    <button
      className="nav-btn"
      onClick={() => window.open("https://github.com/malikgaurav626", "_blank")}
    >
      {children}
    </button>
  );
}
