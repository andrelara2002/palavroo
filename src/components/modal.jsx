export default function Modal({ title, hidden, description, onClick, buttonLabel, className }) {

    return <div className={"modal " + className ? className : ''} hidden={hidden}>
        <h1>{title}</h1>
        <h2>{description}</h2>
        <button onClick={()=>{onClick()}}>{buttonLabel}</button>
    </div>
}