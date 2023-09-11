import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const Lottie = ({
  animationData,
  width,
  height,
  loop = false,
  autoPlay = true,
  mBottom = 25,
  filter = "brightness(1)",
  style = {},
  onClick,
  onComplete = () => {},
}) => {
  const element = useRef(null);
  const lottieInstance = useRef();
  const hasLoaded = useRef(true);
  useEffect(() => {
    if (hasLoaded.current) {
      if (element.current) {
        lottieInstance.current = lottie
          .loadAnimation({
            animationData,
            loop: loop,
            autoplay: autoPlay,
            container: element.current,
            playCount: 0,
          })
          .addEventListener("complete", (e) => {
            onComplete(e);
          });
      }
      hasLoaded.current = false;
    }
  }, [animationData]);
  return (
    <div
      onClick={() => {
        onClick(lottieInstance);
      }}
      style={{
        height: height,
        width: width,
        marginBottom: mBottom,
        transition: `all 0.15s linear`,
        filter: filter,
        pointerEvents: "none",
        ...style,
      }}
      ref={element}
    ></div>
  );
};

export default Lottie;
