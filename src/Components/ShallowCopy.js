import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

    // const [name, setName] = useState('');
    // const arrayCount = useState(0);

    // const count = arrayCount[0];
    // const setCount = arrayCount[1];

    const [detail, setDetails] = useState({
        count: 0,
        name: ''
    })

    const handleInputChange = (e) => {
        setDetails((prev) => ({
            ...prev,
            name: e.target.value
        }))
    }

    return (
        <div className="App">
            <input type={"text"} onChange={handleInputChange} />
            <h1>Hello {detail.name} and {detail.count}</h1>
            <button onClick={() => setDetails({
                ...detail,
                count: detail.count + 1
            })}>{detail.count}</button>
        </div>
    );
}

export default App;
