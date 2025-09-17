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
      <div className="mission-statement">

      </div>
    </>
  );
}
