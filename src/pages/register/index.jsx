import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import "../login/styles.css"
import "../register/styles.css"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../context/userContext"

export const Register = () => {

    const { onSubmitRegister } = useContext(UserContext)
    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        name: yup.string().required("Nome completo é obrigatório"),
        email: yup.string().required("Email é obtigatório").email("Email inválido"),
        password: yup.string().required("Senha é obrigatória")
        .matches(/[A-Z]/, "Deve conter ao menos 1 letra maiúscula")
        .matches(/([a-z])/, "Deve conter ao menos 1 letra minúscula")
        .matches(/(\d)/, "Deve conter ao menos 1 número")
        .matches(/(\W)|_/, "Deve conter ao menos 1 caracter especial")
        .matches(/.{8,}/, "Deve conter ao menos 8 dígitos"),
        phoneNumber: yup.string().required("Telefone é obrigatório")
    })
    
    const { register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    })

    return(
        <div className="glass-container-register">
            <form onSubmit={handleSubmit(onSubmitRegister)} className="form-container-register">
                <h2>
                    Faça seu cadastro
                </h2>
                <div className="input-container">
                    <label className="label-form" htmlFor="name">Nome Completo</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Lily Tucker Pritchett"
                        className="input-value-entry"
                        {...register("name")}
                    />
                    <span>{errors.name?.message}</span>

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

                    <label className="label-form" htmlFor="phoneNumber">Telefone</label>
                    <input 
                        type="text" 
                        name="phoneNumber" 
                        id="phoneNumber" 
                        placeholder="xx xxxxx-xxxxs"
                        className="input-value-entry"
                        {...register("phoneNumber")}
                    />
                    <span>{errors.phoneNumber?.message}</span>
        
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
                <button type="submit">Cadastrar</button>

                <p>Já tem uma conta? <button className="register-button" onClick={() => navigate('/')} >Acesse aqui!</button></p>
            </form>
        </div>
    )
}