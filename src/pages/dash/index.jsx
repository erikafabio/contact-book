import { useContext } from "react"
import { Contact } from "../../components/contact"
import { UserContext } from "../../context/userContext"

export const Dashboard = () => {

    const {user, contacts} = useContext(UserContext)

    return(
        <div className="container-dashboar">
            <header>
                <h1>{user.name}</h1>
                <div>
                    <p>{user.email}</p>
                    <p>{user.phoneNumber}</p>
                </div>
            </header>
            <div className="container-contacts">
                {
                    contacts?.length > 0 ? (
                        contacts.map((item) => {
                            return <Contact key={item.id} name={item.name} email={item.email} phoneNumber={item.phoneNumber} />
                        })
                    ) : (
                        <p>Sem contatos por enquanto.</p>
                    )
                }
                
            </div>
        </div>
    )
}