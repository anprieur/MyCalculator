import { useCalcul } from "../hooks/useCalcul";

export function Button({ value }) {
  const classicOp = ["÷", "x", "-", "+", "="];
  const otherOp = ["AC", "+/-", "%"];
  const option = [".", "minus" /*, "opt"*/];

  const { calcul, ajoutEltCalcul, supprEltCalcul, resetCalcul, invCalcul } =
    useCalcul();

  let styleButton, actionButton;

  let type = "";
  if (classicOp.includes(value)) {
    type = "classic";
  } else if (otherOp.includes(value)) {
    type = "other";
  } else if (option.includes(value)) {
    type = "option";
  } else if (/[0-9]/.test(value)) {
    type = "number";
  } else {
    type = "unknown";
  }

  switch (type) {
    case "classic":
      styleButton = { background: "var(--classic-op)" };
      actionButton = () => {
        ajoutEltCalcul(value);
      };
      break;

    case "other":
      styleButton = { background: "var(--other-op)" };
      actionButton = () => {
        if (value === "AC") {
          resetCalcul();
        } else if (value === "+/-") {
          invCalcul();
        } else {
          ajoutEltCalcul(value);
        }
      };
      break;

    case "option":
      styleButton = { background: "var(--number)" };
      actionButton = () => {
        if (value === "minus") {
          supprEltCalcul();
        } else {
          ajoutEltCalcul(value);
        }
      };
      break;

    case "number":
      styleButton = { background: "var(--number)" };
      actionButton = () => {
        ajoutEltCalcul(value);
      };
      break;

    default:
      styleButton = {};
      actionButton = () => {};
      break;
  }

  return (
    <button
      className="ButtonOpSimple"
      style={styleButton}
      onClick={actionButton}
    >
      {value === "minus" ? "←" : value}
    </button>
  );
}
