export default function Logo() {
  return (
    <div className="logo-container">
      <svg viewBox="0 0 600 600" >
        <polyline className="logo-stroke" points="150,570 150,90 340,300" />
        <polyline className="logo-stroke" points="322,180 478,48 478,510 220,270 220,390 150,450" />
        <polyline className="logo-stroke" points="150,570 345,385" />

        <circle className="logo-dot dot1" cx="150" cy="570" r="15" />
        <circle className="logo-dot dot2" cx="478" cy="48" r="15" />
        <circle className="logo-dot dot3" cx="150" cy="450" r="15" />
      </svg>
    </div>
  );
}