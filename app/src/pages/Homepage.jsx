import { ReactTyped } from "react-typed";

const text = "Mission Statement:<br/>With NovaStack, every team — from frontline operators to HQ — sees exactly what matters most, in a system that feels like it was built just for them."
export default function Homepage() {
  return (
    <>
      <div className="logo-container">

        <svg>

          <polyline className="logo-stroke" points="200,600 200,120 390,330" />
          <polyline className="logo-stroke" points="372,210 528,78 528,540 270,300 270,420 200,480" />
          <polyline className="logo-stroke" points="200,600 395,415" />

          <circle className="logo-dot dot1" cx="200" cy="600" r="15" />
          <circle className="logo-dot dot2" cx="528" cy="78" r="15" />
          <circle className="logo-dot dot3" cx="200" cy="480" r="15" />
        </svg>

      </div >
      <div className="mission-statement" width="50%">
        <p align="left">
          <ReactTyped
            startWhenVisible
            strings={[text]}
            typeSpeed={1} />
        </p>
      </div>
    </>
  );
}
