import BatteryStatus from "./components/battery-status.component";
import BirthdayCountdown from "./components/birthday-countdown.component";

/**
 *
 * @author Trần Ngọc Anh Dũng
 */
function App() {
  return (
    <section className="container mx-auto p-6 flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <BatteryStatus />
      <div className="mt-5">
        <BirthdayCountdown />
      </div>
    </section>
  );
}

export default App;
