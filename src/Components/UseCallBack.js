import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';

function App() {

    const [count, setCount] = useState(0)
    const [name, setName] = useState("")

    //function handleIncrement don't create every time after the using useCallback
    // else function recreated every time whenever the component re renders

    const handleIncrement = useCallback(() => {
        console.log("Function Re-created")
        setCount((prev) => prev + 1)
        console.log("this handle re rendered")
    }, [])

    // const handleIncrement = () => {
    //   console.log("Function Re-created")
    //   setCount((prev) => prev + 1)
    //   console.log("this handle re rendered")
    // }


    console.log("App Re Rendered!!!")


    return (
        <div className="App">
            <button onClick={handleIncrement}>Increment</button>

            <input value={name} onChange={(e) => setName(e.target.value)} />

        </div>
    );
}

export default App;
