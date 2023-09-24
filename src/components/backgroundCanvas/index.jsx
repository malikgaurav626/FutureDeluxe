import { useRef } from "react";
import "./canvas.css";
import { useEffect } from "react";

export default function BackgroundCanvas({ refProp }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();

    window.addEventListener("resize", handleResizeCanvas);

    function handleResizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    }
    function draw(i = 0) {
      for (let k = -canvas.width - 10 + i; k <= canvas.width + i; k += 60) {
        context.beginPath();
        context.strokeStyle = "#c5c6d5";
        context.moveTo(k, 0);
        context.lineTo(k, (2 * canvas.height) / 3);
        context.stroke();
      }
      for (let j = -canvas.width - 10 + i; j <= canvas.width + i; j += 60) {
        context.beginPath();
        context.strokeStyle = "#c5c6d5";
        context.moveTo(j, (2 * canvas.height) / 3);
        context.lineTo(2 * j - canvas.width / 2, canvas.height);
        context.stroke();
      }
    }
    function animata(i) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      draw(i);

      if (i > canvas.width) i = 10;
      requestAnimationFrame(() => animata(i + 1));
    }

    animata(0);

    return () => window.removeEventListener("resize", handleResizeCanvas);
  }, []);

  return (
    <>
      <div className="canvas-container" ref={refProp} id="canvasContainerId">
        <canvas className="canvas" ref={canvasRef}></canvas>
      </div>
    </>
  );
}
