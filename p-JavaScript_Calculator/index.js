const keys = getKeys();

const App = () => {
  const [formula, setFormula] = React.useState("");
  const [display, setDisplay] = React.useState("0");

  const handleClick = (event) => {
    if (event.target.innerText == "C") {
      setFormula("");
      setDisplay("0");
    } else {
      buttonPress(event.target.innerText, formula, setFormula, setDisplay);
    }
  };

  return (
    <div id="calculator">
      <Display output={display} />
      <Rows clicker={handleClick} />
    </div>
  );
};

const Display = (props) => {
  return <div id="display">{props.output}</div>;
};

const Rows = (props) => {
  return (
    <div>
      {keys.map((row) => {
        return (
          <div class="d-flex flex-row flex-nowrap">
            {renderRow(row, props.clicker)}
          </div>
        );
      })}
    </div>
  );
};

function renderRow(row, clicker) {
  const noWay = () => alert("This button does nothing!");
  return row.map((myButton) => {
    if (myButton.text === "")
      return (
        <div class="col keybutton" onClick={noWay}>
          {" "}
        </div>
      );
    return (
      <div onClick={clicker} id={myButton.keyId} class="col keybutton">
        {myButton.text}
      </div>
    );
  });
}

ReactDOM.render(<App />, document.getElementById("root"));

// HELPER FUNCTIONS (outside the components!)

function calculate(formula) {
  // we'll use eval to simplify the equation evaluation
  // BUT since eval is dangerous, we'll first make
  // sure there's nothing but the expected chars.
  let valid = /^[0-9\.\+\-\/\ \*]+$/;
  if (!valid.test(formula)) return false;
  return parseFloat(parseFloat(eval(formula)).toPrecision(15)).toString();
}

function buttonPress(button, formula, setFormula, setDisplay) {
  //process the button presses in a discrete function
  //DRY on setting the two fields
  function setAll(str) {
    if (formula == "0") formula = "";
    setFormula(str);
    setDisplay(str);
  }

  //handle one operator after another
  function testPrior() {
    let one = formula.substring(formula.length - 1);
    let two = formula.substring(formula.length - 2, formula.length - 1);

    if (one == "-" && button === "+") {
      return formula === " -" ? "0" : formula.substring(0, formula.length - 1);
    }
    if (button === "-") return formula + " -";
    if (button !== two && button !== one) {
      console.log("it's different", formula.substring(0, formula.length - 2));
      return formula.substring(0, formula.length - 2) + button + " ";
    }
    return formula;
  }

  //handling the 16 possible cases (other than C)
  switch (button) {
    case "=":
      let result = calculate(formula);
      if (result !== false) {
        //if it's a whole number, return an integer
        if (parseInt(result) == result) result = parseInt(result);
        setAll(result.toString());
      }
      break;
    case ".":
      if (formula.substring(formula.length - 1) == ".") break;
      //test for extra decimals
      let forms = formula.split(" ");
      let lastbit = forms[0];
      if (forms.length > 1) lastbit = forms[forms.length - 1];
      if (/\./.test(lastbit)) break;
      //okay then
      setAll(formula + ".");
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      //add test for operator then minus & remove 1 space for clearly negative number? 3 + 5 * 6 - 2 / 4
      setAll(formula === "0" ? button : formula + button);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      if (formula === "0" && button === "-") setAll("-");
      if (formula === "0") break;
      if (/\d/.test(formula[formula.length - 1])) {
        setAll(formula + ` ${button} `);
        break;
      }
      setAll(testPrior());
      break;
    case "0":
      if (formula === "0") break;
      let last = formula.substring(formula.length - 2);
      if (last === " 0" || last === "-0") break;
      if (/[\d\.\ ]/.test(formula[formula.length - 1]))
        setAll(formula + button);
      break;
  }
}

function getKeys() {
  //returns the calculator layout
  return [
    [
      { text: "C", keyId: "clear" },
      { text: "=", keyId: "equals" }
    ],
    [
      { text: "1", keyId: "one" },
      { text: "2", keyId: "two" },
      { text: "3", keyId: "three" },
      { text: "*", keyId: "multiply" }
    ],
    [
      { text: "4", keyId: "four" },
      { text: "5", keyId: "five" },
      { text: "6", keyId: "six" },
      { text: "/", keyId: "divide" }
    ],
    [
      { text: "7", keyId: "seven" },
      { text: "8", keyId: "eight" },
      { text: "9", keyId: "nine" },
      { text: "+", keyId: "add" }
    ],
    [
      { text: "", keyId: "blank" },
      { text: "0", keyId: "zero" },
      { text: ".", keyId: "decimal" },
      { text: "-", keyId: "subtract" }
    ]
  ];
}
