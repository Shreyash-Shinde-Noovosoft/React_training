import './styles/Counter.css';
import { useState } from 'react'


export default function Counter() {
    const [count, setCount] = useState(0);
    return(
        <div className='container'>
        <h1>The count is {count}</h1>
        <button className='button' onClick={() => setCount(count+1)}>
            Increment
        </button>
        <button className='button' onClick={() => setCount(count-1)}>
            Decrement
        </button>
        <button className='button' onClick={() => setCount(0)}>
            Reset
        </button>
        </div>
    )

}