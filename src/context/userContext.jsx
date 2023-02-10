import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../service";

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    
    const token = localStorage.getItem("@TOKEN")
    const id = localStorage.getItem("@ID")
    const [user, setUser] = useState({})
    const [contacts, setContacts] = useState([])
    const navigate = useNavigate()

    const onSubmitRegister = (data) => {
        console.log(data)
        api.post("/users", data)
        .then((resp) => {
            console.log(resp)
           navigate("/")
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const onSubmitLogin = (data) => {
        api.post("/login", data)
        .then((resp) => {
            console.log(resp)
            window.localStorage.setItem("@TOKEN", resp.data.token)
            window.localStorage.setItem("@ID", resp.data.id)
            setUser(data)
            navigate("/dashboard")
        })
        .catch((err) => {
            console.log(err)
            localStorage.clear()
        })
    }

    const getContacts = async () => {
        if (token) {
            try {
              api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
              const { data } = await api.get(`/users/${id}`);
              setContacts(data.contact)
              console.log(data)
              setUser(data)
      
            } catch (error) {
              console.log(error)
            }
        }
    }

    const createContact = (data) => {
        console.log(data)
        api.post("/contact", data)
        .then((resp) => {
            console.log(resp)
            setContacts(...contacts, data)
        })
        .catch((err) => {
            console.log(err)
            localStorage.clear()
        })
    }

    useEffect(() => {
        getContacts()
    }, [token])
    
    useEffect(() => {
        onSubmitLogin()
    }, [])

    return(
        <UserContext.Provider value={{onSubmitLogin, onSubmitRegister, createContact, user, contacts}}>
            {children}
         </UserContext.Provider>
    )
}

export default UserProvider