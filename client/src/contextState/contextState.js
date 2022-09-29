import React, { useEffect, useState } from 'react'
import contextAPI from './contextAPI'

const ContextState = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState({name: '', email: '', id: ''})

    const login = (nameParam, emailParam, idParam, tokenParam) => {
        setIsLoggedIn({
            name: nameParam,
            email: emailParam,
            id: idParam,
            token: tokenParam
        })
    }

    const logout = () => {
        setIsLoggedIn({
            name: '',
            email: '',
            id: ''
        })
    }

    const auth = () => {
        if (isLoggedIn.email && isLoggedIn.name && isLoggedIn.id){
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        setIsLoggedIn(isLoggedIn)
    }, [isLoggedIn])

    return (
        <contextAPI.Provider value={{ isLoggedIn, login, logout, auth }}>
            {props.children}
        </contextAPI.Provider>
    )
}

export default ContextState