export default function Homepage() {
  return (
    <div className="logo-container">
    <svg viewBox="0 0 120 120">
      {/* Outer: left vertical and lower-right "/\" shape */}
      <polyline
        className="logo-line"
        points="45,50 30,30 90,90"
      />
      {/* Top-right connector */}
      <line
        className="logo-line"
        x1="90"
        y1="30"
        x2="90"
        y2="90"
      />
      {/* Inner: mid-right upper diagonal */}
      <line
        className="logo-line"
        x1="50"
        y1="50"
        x2="90"
        y2="30"
      />
      {/* Inner: mid-left lower diagonal */}
      <line
        className="logo-line"
        x1="30"
        y1="60"
        x2="65"
        y2="90"
      />
      {/* Inner: diagonal inside middle */}
      <line
        className="logo-line"
        x1="30"
        y1="60"
        x2="90"
        y2="30"
      />

      {/* Dots on corners (nodes) */}
      <circle className="dot dot1" cx="30" cy="90" r="3" />
      <circle className="dot dot2" cx="30" cy="30" r="3" />
      <circle className="dot dot3" cx="90" cy="30" r="3" />
      <circle className="dot dot4" cx="90" cy="90" r="3" />
      <circle className="dot dot5" cx="65" cy="90" r="3" />
      <circle className="dot dot6" cx="50" cy="50" r="3" />
      <circle className="dot dot7" cx="30" cy="60" r="3" />
    </svg>
  </div>
  );
}
