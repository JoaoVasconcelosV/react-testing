import { useState } from "react";

export default function CheckNumber() {
  const [number, setNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isEven = number % 2 === 0;

  return (
    <div>
      <h1>Par ou ímpar?</h1>
      <input 
        type="text" 
        name="number" 
        placeholder="Digite um número..." 
        value={number}
        onChange={(e) => {
          const rawValue = e.target.value;
                    
          setNumber(rawValue);
          if(rawValue && isNaN(rawValue)) {
            setErrorMessage("Valor inválido");
            return;
          }

          setErrorMessage("");          
        }}
      /><br/>

      {errorMessage && <span role="alert">{errorMessage}</span>}<br/>
      <span role="presentation">{isEven ? "Par" : "Ímpar"}</span>
    </div>
  )
}