export default function Configuration() {
  return (
    <>
      <h1>Configuration</h1>
      <form>
        <label for="Widgets"></label>
        <select name="widgets">
          <option value="">Pending Tasks</option>
          <option value="">System Health</option>
          <option value="">Current Tasks</option>
          <option value="">Recent Activity</option>
          <option value="">Real-Time Events</option>
          <option value="">SYCAPS Trends</option>
          <option value="">System Availablitiy</option>
          <option value="">Task Completion Analyics</option>
          <option value="">Account Logs</option>
        </select>
        <ul>
          <li>Widgets</li>
        </ul>
      </form>
    </>
  );
}
