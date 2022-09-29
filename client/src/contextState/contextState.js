import React, { useEffect, useState } from 'react'
import contextAPI from './contextAPI'

const ContextState = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState({ name: '', email: '', id: '' })

    const login = (nameParam, emailParam, idParam, tokenParam) => {
        const payload = {
            name: nameParam,
            email: emailParam,
            id: idParam
        }
        setIsLoggedIn(payload)
        localStorage.setItem('userLoggedIn', JSON.stringify(payload))
        localStorage.setItem('isLoggedIn', true)
    }

    const logout = () => {
        setIsLoggedIn({
            name: '',
            email: '',
            id: ''
        })
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userLoggedIn')
    }

    const auth = () => {
        if (isLoggedIn.email && isLoggedIn.name && isLoggedIn.id) {
            return true
        } else {
            return false
        }
    }

    // useEffect(() => {
    //     if (localStorage) {
    //         setIsLoggedIn(JSON.parse(localStorage.getItem('userLoggedIn')))
    //     }
    //     else {
    //         console.log(isLoggedIn)
    //     }
    // }, [])

    useEffect(() => {
        if (localStorage.length){
            setIsLoggedIn(JSON.parse(localStorage.getItem('userLoggedIn')))
        } else {
            setIsLoggedIn(isLoggedIn)
        }
    }, [])

    return (
        <contextAPI.Provider value={{ isLoggedIn, login, logout, auth }}>
            {props.children}
        </contextAPI.Provider>
    )
}

export default ContextState