import "../components/styles.css"

export const Contact = ({name, email, phoneNumber}) => {
    return(
        <div className="contact">
            <p>{name}</p>
            <p>{email}</p>
            <p>{phoneNumber}</p>
        </div>
    )
}