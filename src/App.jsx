import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);

  const passRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumberAllowed) str += "0123456789";
    if (isCharAllowed) str += "!@#$%^&*()_+";
    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, isCharAllowed, isNumberAllowed]);

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    passRef.current?.select();
  };

  useEffect(() => {
    generatePassword();
  }, [length, isCharAllowed, isNumberAllowed]);

  return (
    <>
      <div className="title">
        <h2>Password Generator</h2>
      </div>
      <div>
        <div style={{ display: "flex" }}>
          <label for="">Password</label>
          <input
            type="text"
            value={password}
            name=""
            id=""
            placeholder=""
            readOnly
            ref={passRef}
          />
          <button onClick={copyPassword}>copy</button>
        </div>
        <div className="opt">
          <div className="opt-children">
          <input
            type="range"
            value={length}
            min={6}
            max={30}
            style={{ cursor: "pointer" }}
            onChange={(e) => setLength(e.target.value)}
            name="length"
            id=""
            placeholder=""
          />        
          <label for="length">Length: {length}</label>
          </div>
          <div className="sec">
          <div className="opt-children ">
          <input
            type="checkbox"
            defaultChecked={isNumberAllowed}
            style={{ cursor: "pointer" }}
            onChange={() => setIsNumberAllowed((prev) => !prev)}
            name="number"
            id=""
            placeholder=""
          />
          <label for="number">Number</label>
          </div>
          <div className="opt-children">
          <input
            type="checkbox"
            defaultChecked={isCharAllowed}
            style={{ cursor: "pointer" }}
            onChange={() => setIsCharAllowed((prev) => !prev)}
            name="char"
            id=""
            placeholder=""
          />
          <label for="char">Character</label>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
