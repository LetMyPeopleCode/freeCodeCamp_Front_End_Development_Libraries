//ONE GLOBAL VAR to prevent re-renders from messing it up
var clock_interval;

const App = () => {

  const defaults = {
    session: 1500,
    break: 300
  };

  const us = React.useState;
  const [active_clock, setActive] = us("none");
  const [session_clock, setSession] = us(defaults.session);
  const [session_count, setSessionCount] = us(defaults.session);
  const [break_clock, setBreak] = us(defaults.break);
  const [break_count, setBreakCount] = us(defaults.break);
  const [timer_label, setTimerLabel] = us("Session");
  const [session_label, setSessionLabel] = us("Work Time: ");
  const [break_label, setBreakLabel] = us("Break Time: ");
  const [start_stop, setStart] = us("Start");

  function changeClock(event) {
    // extract session-* or break-* and set "clock" and "change" vars
    if (clock_interval !== undefined) {
      alert("Both clocks must be stopped to change them.");
      return false;
    }
    let opts = event.target.id.split("-");
    let change = 0;
    let clock = opts[0];
    if (opts[1] === "increment") change += 60;
    if (opts[1] === "decrement") change -= 60;

    if (clock == "session") {
      // prevent exceeding maximums or minimums
      if (session_clock + change > 3600) return false;
      if (session_count + change < 1) return false;
      if (session_clock + change < 1) return false;
      setSession(session_clock + change);
      setSessionCount(session_count + change);
    } else if (clock === "break") {
      // prevent exceeding maximums or minimums
      if (break_clock + change > 3600) return false;
      if (break_count + change < 1) return false;
      if (break_clock + change < 1) return false;
      setBreak(break_clock + change);
      setBreakCount(break_count + change);
    }
  }

  function startStop() {
    // if button == stop, stops interval
    // if button == start, starts interval
    if (start_stop === "Stop") {
      document.getElementById("beep").load();
      clearTimeout(clock_interval);
      clock_interval = undefined;
      setTimerLabel("Ready");
      setStart("Start");
    } else {
      document.getElementById("beep").load();
      let current_clock, clock_count;
      if (active_clock === "none") {
        setActive("session");
        current_clock = "session";
        clock_count = session_count;
      } else {
        current_clock = active_clock;
        clock_count = current_clock === "session" ? session_count : break_count;
      }
      setStart("Stop");
      setTimerLabel(current_clock === "session" ? "Session" : "Break");
      clock_interval = setTimeout(runClocks, 1000, current_clock, clock_count);
    }
  }

  function resetClocks() {
    clearTimeout(clock_interval);
    clock_interval = undefined;
    setSession(defaults.session);
    setSessionCount(defaults.session);
    setBreak(defaults.break);
    setBreakCount(defaults.break);
    setActive("none");
    setTimerLabel("Ready");
    setStart("Start");
    document.getElementById("beep").load();
  }

  function runClocks(current, count) {
    // called by Timeout
    let sesClocks = {
      altactive: "break",
      altcount: break_clock,
      setCount: setSessionCount,
      clock: session_clock
    };
    let brkClocks = {
      altactive: "session",
      altcount: session_clock,
      setCount: setBreakCount,
      clock: break_clock
    };
    let useClock = current == "session" ? sesClocks : brkClocks;
    if (count < 1) {
      // play alarm
      document.getElementById("beep").play();
      // switch active to break
      clock_interval = setTimeout(
        runClocks,
        1000,
        useClock.altactive,
        useClock.altcount
      );
      setActive(useClock.altactive);
      useClock.setCount(useClock.clock);
    } else {
      clock_interval = setTimeout(runClocks, 1000, current, count - 1);
      useClock.setCount(count - 1);
    }
    setTimerLabel(useClock.altactive === "break" ? "Session" : "Break");
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
          break_clock={break_clock}
          break_count={break_count}
          incDec={changeClock}
          start_stop_click={startStop}
          start_stop_status={start_stop}
          reset={resetClocks}
        />
      </div>
    </div>
  );
};

const Clocks = (props) => {
  let timernum =
    props.current_clock === "session" || props.current_clock === "none"
      ? props.session_count
      : props.break_count;

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
            {Math.ceil(props.session_clock / 60) > 0
              ? Math.ceil(props.session_clock / 60)
              : 1}
          </span>
        </div>
        <span id="session-display">{makeClockString(props.session_count)}</span>
      </div>

      {/* ACTION BUTTONS */}

      <div class="action-buttons">
        <div id="timer-label">{props.timer_label}</div>
        <button id="start_stop" onClick={props.start_stop_click}>
          {props.start_stop_status}
        </button>
        <br />
        <button id="reset" onClick={props.reset}>
          Reset
        </button>
        <div id="time-left">{makeClockString(timernum)}</div>

        <br />
      </div>

      {/* BREAK CLOCK */}

      <div class="clock-holder">
        <div id="break-label" class="clock-labels">
          {props.break_label}
          <span id="break-length">{Math.ceil(props.break_clock / 60)}</span>
        </div>
        <span id="break-display">
          {makeClockString(props.break_count, "break")}
        </span>
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
      <audio
        id="beep"
        src="https://letmypeoplecode.github.io/freeCodeCamp_Front_End_Development_Libraries/sounds/dwarven_mountain_loop.mp3"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// HELPER FUNCTIONS

function makeClockString(clock, id = "id") {
  //takes # of seconds, returns MM:SS formatted string
  clock = parseInt(clock);
  let mins = Math.floor(clock / 60);
  let secs = clock % 60;
  // return timer with mins and secs left-padded to 2 digits
  return `${mins < 10 ? "0" : ""}${mins.toString()}:${
    secs < 10 ? "0" : ""
  }${secs.toString()}`;
}
