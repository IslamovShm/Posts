import styles from "./Input.module.css"

const Input = ({type, placeholder, name, setInput}) => {

    const handleChange = (e) => {
        setInput(prev => ({...prev, [name]: e.target.value}))
    }

    return (
        <input type={type} name={name} placeholder={placeholder} required onChange={handleChange} />
    )
}

export default Input