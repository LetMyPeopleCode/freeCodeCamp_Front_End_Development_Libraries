const sounds = {
  Q: "Q.wav",
  W: "W.wav",
  E: "E.wav",
  A: "A.mp3",
  S: "S.wav",
  D: "D.wav",
  Z: "Z.wav",
  X: "X.wav",
  C: "C.wav"
};

//Sounds used here came from free sample packs and may not be used by others.
const soundprefix = "https://letmypeoplecode.github.io/freeCodeCamp_Front_End_Development_Libraries/sounds/";

const App = () => {
  const [play, setPlay] = React.useState("");
  return (
    <div id="drum-machine" align="center">
      <h1>Sound Board</h1>
      <p>Click a button or type its letter to play a sound</p>
      <div id="display">Now Playing: {play}</div>
      <div class="d-flex justify-content-between flex-row" id="key-row">
        <Pad letter="Q" play={play} set={setPlay} />
        <Pad letter="W" play={play} set={setPlay} />
        <Pad letter="E" play={play} set={setPlay} />
        <Pad letter="A" play={play} set={setPlay} />
        <Pad letter="S" play={play} set={setPlay} />
        <Pad letter="D" play={play} set={setPlay} />
        <Pad letter="Z" play={play} set={setPlay} />
        <Pad letter="X" play={play} set={setPlay} />
        <Pad letter="C" play={play} set={setPlay} />
      </div>
    </div>
  );
};

const Pad = (props) => {
  //handle keypresses
  const getKey = (event) => {
    if (event.code.replace("Key", "") === props.letter) triggerIt();
  };

  //listen for keypresses
  //remove before adding to avoid tons of listeners (possible memory leak)
  document.removeEventListener("keydown", getKey);
  document.addEventListener("keydown", getKey);
  
  //Change status to done - handle player "ended"
  const beDone = (event) => {
    event.target.removeEventListener("ended", beDone);
    props.set(props.letter + " (Done)");
  };

  //Play the sound, set an "ended" listener, update status/state
  const triggerIt = () => {
    let audio = document.getElementById(props.letter);
    audio.addEventListener("ended", beDone);
    audio.play();
    props.set(props.letter + " (Playing)");
  };

  return (
    <div class="p2 ">
      <button
        class="drum-pad"
        value={props.letter}
        onClick={triggerIt}
        id={"play-" + props.letter}
      >
        {props.letter}
        <audio
          class="clip"
          src={soundprefix + sounds[props.letter]}
          id={props.letter}
        />
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));