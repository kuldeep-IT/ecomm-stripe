import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

    const [name, setName] = useState('');
    const [count, setCount] = useState(0);

    const inputEle = useRef()

    const handleInputChange = (e) => {
        setName(e.target.value)
    }

    useEffect(() => {
        setCount((prev) => (prev + 1))
    }, [])

    return (
        <div className="App">
            <input type={"text"} onChange={handleInputChange} ref={inputEle} />
            <h1>Hello {name} and {count}</h1>

            <button onClick={() => {
                inputEle.current.style.width = '300px'
            }}>Click Here</button>

        </div>
    );
}

export default App;
