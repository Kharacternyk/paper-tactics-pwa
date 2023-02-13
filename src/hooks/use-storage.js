import {useState} from "react"

export const useStorage = (key, defaultValue) => {
    const getInitialValue = () => {
        const storedString = localStorage.getItem(key)
        if (storedString === null) {
            return defaultValue
        }
        return JSON.parse(storedString)
    }
    const [value, setValue] = useState(getInitialValue)
    const setValuePersistently = newValue => {
        setValue(newValue)
        localStorage.setItem(key, JSON.stringify(newValue))
    }

    return [value, setValuePersistently]
}
