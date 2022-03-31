export default function Modal({ title, hidden, description, onClick, buttonLabel }) {

    return <div className='modal' hidden={hidden}>
        <h1>{title}</h1>
        <h2>{description}</h2>
        <button onClick={()=>{onClick()}}>{buttonLabel}</button>
    </div>
}