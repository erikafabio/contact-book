import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../service";

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    
    const token = localStorage.getItem("@TOKEN")
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
        console.log(data)
        api.post("/login", data)
        .then((resp) => {
            console.log(resp)
            window.localStorage.setItem("@TOKEN", resp.data.token)
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
              const { data } = await api.get("/contacts");
              setContacts(data)
      
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

            //setUser(resp.data.user)
            //setContacts([resp.data.user.contact])
        })
        .catch((err) => {
            console.log(err)
            localStorage.clear()
        })
    }

    useEffect(() => {
        getContacts()
      }, [])

    return(
        <UserContext.Provider value={{onSubmitLogin, onSubmitRegister, createContact, user, contacts}}>
            {children}
         </UserContext.Provider>
    )
}

export default UserProvider