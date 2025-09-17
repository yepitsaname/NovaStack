export default function Logo() {
  return (
    <div className="logo-container">
      <svg viewBox="0 0 600 600" >
        <polyline className="logo-stroke" points="170,570 170,90 360,300" />
        <polyline className="logo-stroke" points="342,180 498,48 498,510 240,270 240,390 170,450" />
        <polyline className="logo-stroke" points="170,570 365,385" />

        <circle className="logo-dot dot1" cx="170" cy="570" r="15" />
        <circle className="logo-dot dot2" cx="498" cy="48" r="15" />
        <circle className="logo-dot dot3" cx="170" cy="450" r="15" />
      </svg>
    </div>
  );
}