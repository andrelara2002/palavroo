import React from 'react'

import { getRandomWithSize } from '../services/palavroo_api'

export default function Game() {
    const [word, setWord] = React.useState(localStorage.getItem('word') || '')
    const [update, setUpdate] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [tryWord, setTryWord] = React.useState('')

    const getData = async () => {
        const response = await getRandomWithSize(5)
        setWord(response.data)
        localStorage.setItem('word', response.data)
        setLoading(false)
    }

    React.useEffect(() => {
        word ? setLoading(false) : getData()
    }, [update])


    const testWord = () => {
        if (word === tryWord) {
            alert('Parabéns!');
            setLoading(true)
            setTryWord('');
            getData()
            setUpdate(!update);
        } else {
            alert(`Errou! A palavra era ${word}, você escreveu ${tryWord}`)
        }
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    else {
        return (
            <div className='container'>
                <div
                    className='rounded-md p-8 bg-gray-200 shadow-lg
                    bg-slate-900 text-white
                    align-middle justify-center text-xl'
                >Word now is: {word}</div>
                <div><input value={tryWord} onChange={e => { setTryWord(e.target.value) }} /></div>
                <button onClick={() => { testWord() }}>Testar</button>
            </div>
        )
    }
}