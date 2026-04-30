import './styles/Form.css'
import {useState} from 'react'

export default function BasicForm() {
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [gender, setGender] = useState("male");
    // const [agreeTerms, setagreeTerms] = useState(false);
    // const [country, setCountry] = useState("");

    const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "male",
    agreeTerms: false,
    country: ""
    });

    const handleChange = (event) => {
    const {name, type, checked, value} = event.target;
    setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value
    })
    }

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    };

    return (
        <form className='form-container' onSubmit={handleSubmit}>
            <div className='form-group'>
                <label>Name:</label>  
                    <input name="name" type="text" value={formData.name} onChange={handleChange}/>
                              
            </div>

            <div className='form-group'>
                <label>Email:
                    <input name="email" type="email" value={formData.email} onChange={handleChange}/>
                </label>                
            </div>
            <div className='form-group'>
                <label>Password:
                    <input name="password" type="password" value={formData.password} onChange={handleChange} />
                </label>                
            </div>

            <div className='form-group'>
                <label>Country:</label>
                
                <select name="country" value={formData.country} onChange={handleChange}>
                    <option value="India">India</option>
                    <option value="Japan">Japan</option>
                    <option value="USA">USA</option>
                </select>                
            </div>

            <div className='form-group'>
                <label>
                    <input type="radio"
                    name = "gender"
                    value="male"
                    checked = {formData.gender === "male"}
                    onChange={handleChange} />
                    Male
                </label>
                <label>
                    <input type="radio"
                    name = "gender"
                    value="female"
                    checked = {formData.gender === "female"}
                    onChange={handleChange} />
                    Female
                </label>                
            </div>

            <div className='form-group'>
                <label>
                <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                />
                Agree to terms
                </label>                
            </div>


            <button type="submit">Submit</button>

        </form>
    )

    
}