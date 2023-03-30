import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { MyNewComponent } from "./MyNewComponent";
import { CalculatorButton } from "./CalculatorButton";
import "./App.css";

function calculateOperation(number1, number2, operation) {
  switch (operation) {
    case "x":
      return number1 * number2;
    case "-":
      return number1 - number2;
    case "+":
      return number1 + number2;
    case "/":
      return number1 / number2;
    default:
      return 0;
  }
}

function App() {
  const [currentValue, setCurrentValue] = useState("0");
  const [lastOperation, setLastOperation] = useState();

  const handleButtonClick = (buttonValue) => {
    console.log(buttonValue);

    if (buttonValue === "." && currentValue.includes(".")) {
      return;
    }

    if (buttonValue === ".") {
      setCurrentValue(currentValue + buttonValue);
      return;
    }

    if (buttonValue === "+-") {
      setCurrentValue(currentValue * -1);
      return;
    }

    if (
      buttonValue === "/" ||
      buttonValue === "x" ||
      buttonValue === "+" ||
      buttonValue === "-" ||
      buttonValue === "=" ||
      buttonValue === "%"
    ) {
      if (typeof lastOperation === "undefined" && buttonValue === "%") {
        const percentaje = currentValue / 100;
        setCurrentValue(percentaje.toFixed(2));
        return;
      }

      if (typeof lastOperation === "undefined" && buttonValue === "=") {
        return;
      }

      if (typeof lastOperation === "undefined") {
        setCurrentValue(currentValue + buttonValue);
        setLastOperation(buttonValue);
        return;
      }

      const numbers = currentValue.split(lastOperation).map((element) => {
        if (element === "") {
          return null;
        }
        return Number(element);
      });

      if (numbers.length === 2 && numbers[1] !== null) {
        let operationResult;
        let lastNumber = numbers[1];

        if (buttonValue === "%") {
          lastNumber = (numbers[1] / 100) * numbers[0];
        }

        operationResult = calculateOperation(
          numbers[0],
          lastNumber,
          lastOperation
        );

        if (buttonValue === "=" || buttonValue === "%") {
          setCurrentValue(operationResult);
          setLastOperation(undefined);
          return;
        }

        setCurrentValue(operationResult + buttonValue);
        setLastOperation(buttonValue);
        return;
      }

      return;
    }

    if (buttonValue === "C") {
      console.log("me he reseteado");
      setCurrentValue("0");
      setLastOperation(undefined);
      return;
    }

    if (currentValue === "0") {
      setCurrentValue(buttonValue);
    } else {
      console.log(currentValue, buttonValue);
      setCurrentValue(currentValue + buttonValue);
    }
  };

  return (
    <div className="calculator">
      <div className="calculator__result">{currentValue}</div>
      <div className="calculator__actions">
        <CalculatorButton value="C" onClick={handleButtonClick} />
        <CalculatorButton value="+-" onClick={handleButtonClick} />
        <CalculatorButton value="%" onClick={handleButtonClick} />
        <CalculatorButton value="/" onClick={handleButtonClick} />
        <CalculatorButton value="7" onClick={handleButtonClick} />
        <CalculatorButton value="8" onClick={handleButtonClick} />
        <CalculatorButton value="9" onClick={handleButtonClick} />
        <CalculatorButton value="x" onClick={handleButtonClick} />
        <CalculatorButton value="4" onClick={handleButtonClick} />
        <CalculatorButton value="5" onClick={handleButtonClick} />
        <CalculatorButton value="6" onClick={handleButtonClick} />
        <CalculatorButton value="-" onClick={handleButtonClick} />
        <CalculatorButton value="1" onClick={handleButtonClick} />
        <CalculatorButton value="2" onClick={handleButtonClick} />
        <CalculatorButton value="3" onClick={handleButtonClick} />
        <CalculatorButton value="+" onClick={handleButtonClick} />
        <CalculatorButton value="0" onClick={handleButtonClick} />
        <CalculatorButton value="." onClick={handleButtonClick} />
        <CalculatorButton value="=" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
