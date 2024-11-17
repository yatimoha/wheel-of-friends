import gsap from "gsap";
import "./App.scss";
import { useEffect, useRef, useState } from "react";
import Wheel from "./components/Wheel";
import * as data from "./__mocks__/slaves.json";
import { randomColor } from "randomcolor";

const { city, gender, name, surname } = data;
const renderData = [city, gender, name, surname];

function formatData(elements) {
  return elements.map((item) => {
    const calculatedValue = 100 / (elements.length - 1);
    return {
      name: item,
      value: calculatedValue,
    };
  });
}

function App() {
  const count = useRef(0);
  const wheelRef = useRef();
  const [colors, setColors] = useState([]);
  const [wheelData, setWheelData] = useState(
    formatData(renderData[count.current])
  );
  console.log(wheelData);

  useEffect(() => {
    const newColors = randomColor({
      count: wheelData.length,
    });
    setColors(newColors);
  }, [wheelData]);

  useEffect(() => {
    let wheel = wheelRef.current;
    // let rotation = 0;
    let slowingDown = false;
    let timeout;

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);

    function handleKeyDown(e) {
      if (e.keyCode === 32 && slowingDown === false) {
        spinThatWheel(e);
      }
    }

    function handleClick(e) {
      if (slowingDown === false) {
        spinThatWheel(e);
      }
    }

    function spinThatWheel(e) {
      let duration = 100;

      if (duration > 150) duration = 150;

      animateWheel(duration);
      slowingDown = true;
    }

    function animateWheel(duration) {
      let randomNum = Math.floor(Math.random() * 10);
      let rotation = 30 * duration + 30 * randomNum;
      let tl = gsap.timeline({ onComplete: resetWheel });

      console.log(rotation)
      tl.from(wheel, { 
        ease: "power1.out",
        rotation: 0,
        duration: .5,
      }).to(wheel, {
        ease: "elastic.out(1,0.3)",
        duration: 3.5,
        rotation: rotation,
      });
    }

    function resetWheel() {
      timeout = setTimeout(() => {
        slowingDown = false;
        count.current += 1;
        if (count.current > renderData.length - 1) {
          count.current = 0;
        }
        setWheelData(formatData(renderData[count.current]));
      }, 250);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
      clearTimeout(timeout);
    };
  }, [wheelData]);

  return (
    <div className="App">
      <div className="logo">
        <span className="logo__text">Wheel of</span>
        <span className="logo__text second">Slaves</span>
        <span className="logo__shadow">Wheel of</span>
        <span className="logo__shadow second">Slaves</span>
      </div>

      <div className="arrow"></div>

      <Wheel innerRef={wheelRef} data={wheelData} colors={colors}></Wheel>

      <button className="reset-btn">Spin a slave! (press F)</button>
      {/* <div className="rights">all rights reserved</div> */}
    </div>
  );
}

export default App;
