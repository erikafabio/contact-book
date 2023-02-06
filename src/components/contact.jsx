export const Contact = ({name, email, phoneNumber}) => {
    return(
        <div className="contac">
            <p>{name}</p>
            <p>{email}</p>
            <p>{phoneNumber}</p>
        </div>
    )
}