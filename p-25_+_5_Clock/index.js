//ONE GLOBAL VAR to prevent re-renders from messing it up
var clock_interval;

const App = () => {
  const us = React.useState;
  const [current_clock, setCurrent] = us("session");
  const [active_clock, setActive] = us("none");
  const [session_clock, setSession] = us(1500);
  const [session_count, setSessionCount] = us(1500);
  const [break_clock, setBreak] = us(300);
  const [break_count, setBreakCount] = us(300);
  const [timer_label, setTimerLabel] = us("Ready");
  const [session_label, setSessionLabel] = us("Work Time: ");
  const [break_label, setBreakLabel] = us("Break Time: ");

  function changeClock(event) {
    // extract session-* or break-* and set "clock" and "change" vars
    let opts = event.target.id.split("-");
    let change = 0;
    let clock = opts[0];
    if (opts[1] === "increment") change += 60;
    if (opts[1] === "decrement") change -= 60;

    if (clock == "session") {
      // prevent exceeding maximums or minimums
      if (session_clock + change > 3600) return false;
      if (session_count + change < 0) return false;
      setSession(session_clock + change);
      setSessionCount(session_count + change);
    } else if (clock === "break") {
      // prevent exceeding maximums or minimums
      if (break_clock + change > 3600) return false;
      if (break_count + change < 0) return false;
      setBreak(break_clock + change);
      setBreakCount(break_count + change);
    }
  }

  function startStop() {
    console.log("debug start/stop");
    // if button == stop, stops interval
    // if button == start, starts interval
    if (active_clock !== "none") {
      clearTimeout(clock_interval);
      setActive("none");
    } else {
      console.log("current", current_clock);
      setActive(current_clock);
      clock_interval = setTimeout(
        runClocks,
        1000,
        current_clock,
        session_count
      );
    }
  }

  function resetClocks() {}

  function runClocks(current, count) {
    console.log("called", current, count);
    // called by interval
    if (current === "session") {
      if (count < 1) {
        // play alarm
        // switch active to break
        clearTimeout(clock_interval);
        setActive("none");
        // start new interval
      } else {
        setSessionCount(count - 1);
        clock_interval = setTimeout(runClocks, 1000, current, count - 1);
      }
    }
  }

  return (
    <div id="clock">
      <div id="clock-title">
        <span id="timer-title">Pomodoro Timer</span>
      </div>
      <div>
        <Clocks
          current_clock={active_clock}
          session_label={session_label}
          break_label={break_label}
          timer_label={timer_label}
          session_clock={session_clock}
          session_count={session_count}
          break_time={break_count}
          incDec={changeClock}
          start_stop={startStop}
          reset={resetClocks}
        />
      </div>
    </div>
  );
};

const Clocks = (props) => {
  //set the start-stop button value
  let running = "Stop";
  if (props.current_clock === "none") running = "Start";

  return (
    <div
      id="clock-row"
      class="d-flex flex-row bd-highlight justify-content-evenly"
    >
      {/* INCREMENT / DECREMENT WORK TIME */}

      <div class="inc-dec">
        <i
          id="session-increment"
          class="fas fa-chevron-circle-up"
          onClick={props.incDec}
        ></i>
        <br />
        <i
          id="session-decrement"
          class="fas fa-chevron-circle-down"
          onClick={props.incDec}
        ></i>
        <br />
      </div>

      {/* WORK TIME CLOCK */}

      <div class="clock-holder">
        <div id="session-label" class="clock-labels">
          {props.session_label}
          <span id="session-length">
            {Math.floor(props.session_clock / 60)}
          </span>
        </div>
        <span id="session-length">{makeClockString(props.session_count)}</span>
      </div>

      {/* ACTION BUTTONS */}

      <div class="action-buttons">
        <div id="timer-label">
          {props.timer_label}
          <br />
          <span class="small"></span>
        </div>
        <button id="start-stop" onClick={props.start_stop}>
          {running}
        </button>
        <br />
        <button id="reset" onClick={props.reset}>
          Reset
        </button>
        <br />
      </div>

      {/* BREAK CLOCK */}

      <div class="clock-holder">
        <div id="break-label" class="clock-labels">
          {props.break_label}
          <span id="break-length">{Math.floor(props.break_time / 60)}</span>
        </div>
        <span id="break-length">{makeClockString(props.break_time)}</span>
      </div>

      {/* INCREMENT / DECREMENT BREAK TIME */}

      <div class="inc-dec">
        <i
          id="break-increment"
          class="fas fa-chevron-circle-up"
          onClick={props.incDec}
        ></i>
        <br />
        <i
          id="break-decrement"
          class="fas fa-chevron-circle-down"
          onClick={props.incDec}
        ></i>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// HELPER FUNCTIONS

function makeClockString(clock) {
  //takes # of seconds, returns MM:SS formatted string
  clock = parseInt(clock);
  let mins = Math.floor(clock / 60);
  let secs = clock % 60;
  // return timer with mins and secs left-padded to 2 digits
  return `${mins < 10 ? "0" : ""}${mins.toString()}:${
    secs < 10 ? "0" : ""
  }${secs.toString()}`;
}
