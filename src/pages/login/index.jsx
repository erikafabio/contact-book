import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import "../login/styles.css"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../context/userContext"

export const Login = () => {

    const { onSubmitLogin } = useContext(UserContext)
    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        email: yup.string().required("Email é obtigatório").email("Email inválido"),
        password: yup.string().required("Senha é obrigatória")
    })
    
    const { register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    })

    return(
        <div className="glass-container">
            <form onSubmit={handleSubmit(onSubmitLogin)} className="form-container">
                <h2>
                    Faça seu login
                </h2>
                <div className="input-container">
                    <label className="label-form" htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        placeholder="email@mail.com"
                        className="input-value-entry"
                        {...register("email")}
                    />
                    <span>{errors.email?.message}</span>

                    <label className="label-form" htmlFor="password">Senha</label>
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        placeholder="********"
                        className="input-value-entry"
                        {...register("password")}
                        />
                    <span>{errors.password?.message}</span>
                </div>
                <button type="submit">Login</button>

                <p>Não tem uma conta? <button className="register-button" onClick={() => navigate('/register')} >Registre-se aqui!</button></p>
            </form>
        </div>
    )
}