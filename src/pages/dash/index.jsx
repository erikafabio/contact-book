import { useContext } from "react"
import { Contact } from "../../components/contact"
import { UserContext } from "../../context/userContext"
import "../dash/styles.css"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

export const Dashboard = () => {

    const {user, contacts, createContact} = useContext(UserContext)

    const formSchema = yup.object().shape({
        name: yup.string().required("Nome completo é obrigatório"),
        email: yup.string().required("Email é obtigatório").email("Email inválido"),
        phoneNumber: yup.string().required("Telefone é obrigatório")
    })

    const { register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    })
    
    return(
        <div className="container-dashboard">
            <header>
                <h1>{user.name}</h1>
                <div>
                    <p>{user.email}</p>
                    <p>{user.phoneNumber}</p>
                </div>
            </header>
            <div className="container-new-contact">
                <form className="form-new-contact" onSubmit={handleSubmit(createContact)}>
                <label htmlFor="name" className="label-contact">Nome Completo</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Nome Completo"
                        className="input-contact"
                        {...register("name")}
                    />
                    <span>{errors.name?.message}</span>

                    <label className="label-contact" htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        placeholder="email@mail.com"
                        className="input-contact"
                        {...register("email")}
                    />
                    <span>{errors.email?.message}</span>

                    <label className="label-contact" htmlFor="phoneNumber">Telefone</label>
                    <input 
                        type="text" 
                        name="phoneNumber" 
                        id="phoneNumber" 
                        placeholder="xx xxxxx-xxxxs"
                        className="input-contact"
                        {...register("phoneNumber")}
                    />
                    <span>{errors.phoneNumber?.message}</span>
                    <button type="submit" className="contact-button">+</button>
                </form>
            </div>
            <h3>Seus contatos:</h3>
            <div className="container-contacts">
                {
                    contacts?.length > 0 ? (
                        contacts.map((item) => {
                            return <Contact key={item.id} name={item.name} email={item.email} phoneNumber={item.phoneNumber} />
                        })
                    ) : (
                        <p>Sem contatos por enquanto</p>
                    )
                }
                
            </div>
        </div>
    )
}