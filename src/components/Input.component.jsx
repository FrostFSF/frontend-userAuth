import { useState } from "react";
import Symbol from "./Symbol.component";

const Input = ({ inputType, name, id, placeholder = '', attr, updateForm }) => {
    const [revealPassword, setRevealPassword] = useState(false)

    return (
    <>
      {attr.hasSymbol && <Symbol symbolName={attr.symbolName} classStyle={"absolute left-3"} />}
      <input
        className="input"
        type={revealPassword ? 'text' : inputType}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={updateForm}
      />
      {inputType === 'password' && <Symbol
        symbolName={revealPassword ? "eye" : "eye-crossed"}
        classStyle={"absolute right-3 cursor-pointer"}
        clickEvent={() => setRevealPassword(prev => !prev)}
      />}
    </>
  );
};

export default Input;
