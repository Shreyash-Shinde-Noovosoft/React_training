import { useState } from 'react'

function F({toggle}) {
    if (toggle){
            return (<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. 
            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
            pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
            vulputate eget, arcu. In enim justo, rhoncus ut,
            </p>)
        }
  }

export default function Toggle () {
    const [toggle, setToggle] = useState(true);

    function handleChange () {
        setToggle(!toggle);
    }

    return (
        <>
        <h1>Toggle</h1>
        <div>
            <button onClick={handleChange}>{toggle ? 'Hide' : 'Show Content'}</button>
            <F toggle={toggle} />
        </div>
        </>
    )
}