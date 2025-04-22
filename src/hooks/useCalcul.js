import { createContext, useContext, useState, useReducer } from "react";

const CalculContext = createContext({
  calcul: "0",
  ajoutEltCalcul: () => {},
  supprEltCalcul: () => {},
  resetCalcul: () => {},
  invCalcul: () => {},
});

export function useCalcul() {
  return useContext(CalculContext);
}

export function CalculContextProvider({ children }) {
  const [calcul, setCalcul] = useState("0");
  const [state, dispatch] = useReducer(calculReducer, { calcul: calcul });

  function ajoutEltCalcul(value) {
    document.getElementById("originCalcul").textContent = "";
    if (value === "=") {
      calcul !== "0" ? setCalcul(makeCalcul(calcul)) : "";
    } else {
      calcul === "0" ? setCalcul(value) : setCalcul(calcul + value);
    }
  }

  const supprEltCalcul = () => {
    calcul.length == 1 ? setCalcul("0") : setCalcul(calcul.slice(0, -1));
    document.getElementById("originCalcul").textContent = "";
  };

  const resetCalcul = () => {
    setCalcul("0");
    document.getElementById("originCalcul").textContent = "";
  };

  const invCalcul = () => {
    console.log("Dernier signe iverser");
    let opList = [];

    for (let i = 0; i < calcul.length; i++) {
      if (
        !/[0-9.]/.test(calcul[i]) &&
        !(/[-+]/.test(calcul[i]) && !/[0-9.]/.test(calcul[i - 1]))
      ) {
        opList.push(i);
      }
    }

    if (calcul[opList[opList.length - 1]] === "-") {
      setCalcul(
        calcul.slice(0, opList[opList.length - 1]) +
          "+" +
          calcul.slice(opList[opList.length - 1] + 1, calcul.length)
      );
    } else if (calcul[opList[opList.length - 1]] === "+") {
      setCalcul(
        calcul.slice(0, opList[opList.length - 1]) +
          "-" +
          calcul.slice(opList[opList.length - 1] + 1, calcul.length)
      );
    } else if (calcul[opList[opList.length - 1] + 1] === "-") {
      setCalcul(
        calcul.slice(0, opList[opList.length - 1] + 1) +
          "" +
          calcul.slice(opList[opList.length - 1] + 2, calcul.length)
      );
    } else if (opList.length === 0 && calcul[0] === "-") {
      setCalcul(calcul.slice(1, calcul.length));
    } else {
      setCalcul(
        calcul.slice(0, opList[opList.length - 1] + 1) +
          "-" +
          calcul.slice(opList[opList.length - 1] + 1, calcul.length)
      );
    }

    document.getElementById("originCalcul").textContent = "";
  };

  return (
    <CalculContext.Provider
      value={{
        calcul,
        ajoutEltCalcul,
        supprEltCalcul,
        resetCalcul,
        invCalcul,
      }}
    >
      {children}
    </CalculContext.Provider>
  );
}

function calculReducer(state, action) {
  /** regrouper les fonctions */
}

function makeCalcul(calcul) {
  document.getElementById("originCalcul").textContent = calcul;

  console.log("----- Nouveau calcul: -----");

  let nb1 = "",
    nb2 = "",
    ret,
    retFinal,
    opList = [],
    opListP = [];

  for (let i = 0; i < calcul.length; i++) {
    if (
      !/[0-9.]/.test(calcul[i]) &&
      !(/[-+]/.test(calcul[i]) && !/[0-9.]/.test(calcul[i - 1]))
    ) {
      opList.push(i);
      /[x÷%]/.test(calcul[i]) ? opListP.push(i) : "";
    }
  }
  console.log("Liste index opérateurs: " + opList);
  console.log("Liste index opérateurs prioritaires: " + opListP);

  ret = Array(opList.length).fill(0);
  console.log(ret);

  for (const opP of opListP) {
    if (opP === opList[0]) {
      nb1 = calcul.slice(0, opP);
    } else if (ret[opList.indexOf(opP) - 1] !== 0) {
      nb1 = ret[opList.indexOf(opP) - 1];
    } else {
      nb1 = calcul.slice(opList[opList.indexOf(opP) - 1] + 1, opP);
    }
    nb2 = calcul.slice(opP + 1, opList[opList.indexOf(opP) + 1]);

    console.log("nb1: " + nb1 + ", nb2: " + nb2 + ", op: " + opP);

    retFinal = ret[opList.indexOf(opP)] = switchCalcul(calcul, opP, nb1, nb2);
  }

  for (const op of opList) {
    if (!opListP.includes(op)) {
      if (op === opList[0]) {
        nb1 = calcul.slice(0, op);
      } else {
        nb1 = ret[opList.indexOf(op) - 1];
      }

      if (ret[opList.indexOf(op) + 1] === 0 || !ret[opList.indexOf(op) + 1]) {
        nb2 = calcul.slice(op + 1, opList[opList.indexOf(op) + 1]);
      } else {
        nb2 = ret[opList.indexOf(op) + 1];
      }

      console.log("nb1: " + nb1 + ", nb2: " + nb2 + ", op: " + op);

      retFinal = ret[opList.indexOf(op)] = switchCalcul(calcul, op, nb1, nb2);
    }
  }
  console.log("Résultat calcul: tab-> " + ret + " / number-> " + retFinal);

  console.log(" ");
  return retFinal.toString();
}

function switchCalcul(calcul, op, nb1, nb2) {
  let retInt;

  switch (calcul[op]) {
    case "+":
      retInt = Number.parseFloat(nb1) + Number.parseFloat(nb2);
      console.log("Résultat op: " + retInt);
      ret = retInt;
      break;

    case "-":
      retInt = Number.parseFloat(nb1) - Number.parseFloat(nb2);
      console.log("Résultat op: " + retInt);
      ret = retInt;
      break;

    case "x":
      retInt = Number.parseFloat(nb1) * Number.parseFloat(nb2);
      console.log("Résultat op: " + retInt);
      ret = retInt;
      break;

    case "÷":
      retInt = Number.parseFloat(nb1) / Number.parseFloat(nb2);
      console.log("Résultat op: " + retInt);
      ret = retInt;
      break;

    case "%":
      retInt = Number.parseFloat(nb1) % Number.parseFloat(nb2);
      console.log("Résultat op: " + retInt);
      ret = retInt;
      break;
  }

  return ret;
}
