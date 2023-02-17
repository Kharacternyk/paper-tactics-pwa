import {useState} from "react"

export const useStorage = (key, defaultValue, storage = localStorage) => {
    const getInitialValue = () => {
        let storedString = null
        try {
            storedString = storage.getItem(key)
        } catch {}
        if (storedString === null) {
            return defaultValue
        }
        return JSON.parse(storedString)
    }
    const [value, setValue] = useState(getInitialValue)
    const setValuePersistently = newValue => {
        setValue(newValue)
        const serializedValue = JSON.stringify(newValue)
        try {
            storage.setItem(key, serializedValue)
        } catch {}
    }

    return [value, setValuePersistently]
}
