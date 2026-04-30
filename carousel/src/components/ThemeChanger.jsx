import {useState} from 'react'

export default function ThemeChanger() {
    const [theme, setTheme] = useState("Light");

    function handleChange() {
        if(theme === "Light"){
            setTheme("Dark")
        }
        else{
            setTheme("Light")
        }
        
    }

    return (
        <>
        <button onClick={handleChange}> Switch to {theme}</button>
        <div className={theme === "Light" ? "light-theme" : "dark-theme"}>
            <h2>Current Theme</h2>
            <h1>{theme}</h1>
            <p>{theme === "Light" ? "Light theme it is" : "Dark it is"}</p>
        </div>
        </>
    )
}