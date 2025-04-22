import { useContext } from "react";
import { Button } from "./components/Button";
import { useCalcul } from "./hooks/useCalcul.js";
import "./styles.css";

export default function App() {
  const { calcul } = useCalcul();

  return (
    <div className="App">
      <h2 id="originCalcul"></h2>
      <h1>{calcul}</h1>
      <div className="OpSimpleContainer">
        <div className="OpSimpleLine">
          <Button value="AC" />
          <Button value="+/-" />
          <Button value="%" />
          <Button value="÷" />
        </div>

        <div className="OpSimpleLine">
          <Button value="7" />
          <Button value="8" />
          <Button value="9" />
          <Button value="x" />
        </div>

        <div className="OpSimpleLine">
          <Button value="4" />
          <Button value="5" />
          <Button value="6" />
          <Button value="-" />
        </div>

        <div className="OpSimpleLine">
          <Button value="1" />
          <Button value="2" />
          <Button value="3" />
          <Button value="+" />
        </div>

        <div className="OpSimpleLine">
          <Button value="minus" />
          <Button value="0" />
          <Button value="." />
          <Button value="=" />
        </div>
      </div>
    </div>
  );
}
