export default function Footer() {
  setInterval(() => {
    const date = new Date()
    document.querySelector(".date-time").innerHTML = date.toUTCString()
  }, 1000)

  return (
    <footer>
      <p className = 'date-time'></p>
    </footer>
  );
}
