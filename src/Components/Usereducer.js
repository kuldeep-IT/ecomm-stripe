import logo from './logo.svg';
import './App.css';
import { useEffect, useReducer, useRef, useState } from 'react';

const initialState = { count: 0 }

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { ...state, count: state.count + 1 }
        case 'decrement':
            return { ...state, count: state.count - 1 }
        default:
            return state
    }
}

function App() {

    const [state, dispatch] = useReducer(reducer, initialState)

    const handleIncrement = () => {
        dispatch({ type: 'increment' })
    }

    const handleDecrement = () => {
        dispatch({ type: 'decrement' })
    }

    return (
        <div className="App">
            <div>{state.count}</div>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button>
        </div>
    );
}

export default App;
