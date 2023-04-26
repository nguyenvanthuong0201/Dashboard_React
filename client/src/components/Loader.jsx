import { Html, useProgress } from "@react-three/drei";
import ProgressLoader from "./ProgressLoader";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html
      as='div'
      center
    >
      <div id="preloader">
        <div id="loader"></div>
      </div>
    </Html>
  );
};

export default CanvasLoader;
