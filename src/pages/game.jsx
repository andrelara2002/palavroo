import React from 'react'

import { getRandomWithSize } from '../services/palavroo_api'
import RICIBs from 'react-individual-character-input-boxes';

export default function Game() {
    const QUANTITY_OF_LIFES = 8;

    const [word, setWord] = React.useState(localStorage.getItem('word') || '')
    const [update, setUpdate] = React.useState(true)
    const [loading, setLoading] = React.useState(true)
    const [tryWord, setTryWord] = React.useState('')
    const [originalWord, setOriginalWord] = React.useState('')
    const [tries, setTries] = React.useState(JSON.parse(localStorage.getItem('tries')) || [])
    const [lifes, setLifes] = React.useState(JSON.parse(localStorage.getItem('lifes')) || QUANTITY_OF_LIFES)
    const [success, setSuccess] = React.useState(false)

    const getData = async () => {
        const response = await getRandomWithSize(5)
        const _word = replaceAccents(response.data)

        setOriginalWord(response.data)
        setWord(_word)

        localStorage.setItem('word', _word)
        setLoading(false)
    }

    React.useEffect(() => {
        word ? setLoading(false) : getData()
    }, [update])

    const handleWord = (e) => {
        setTryWord(e.toLocaleLowerCase())
    }

    const replaceAccents = (str) => {
        const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž'
        const accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz"
        const strAccents = str.split('')
        const strAccentsOut = strAccents.map((letter) => {
            const accentIndex = accents.indexOf(letter)
            return accentIndex !== -1 ? accentsOut[accentIndex] : letter
        })
        return strAccentsOut.join('')
    }

    const testWord = () => {
        console.log(`Word: ${word} tryWord: ${tryWord}`)
        //Check if word is fully completed
        if (tryWord[0] !== '' && tryWord[0] !== undefined) {
            // Case word is correct
            if (word.match(tryWord.toLocaleLowerCase())) {
                setTries([...tries, tryWord])
                setSuccess(true)
            }
            //Case word is incorrect
            else {
                setTries([...tries, tryWord])
                setTryWord('');
                decreaseLifes();
                localStorage.setItem('tries', JSON.stringify([...tries, tryWord]))
            }
        }
    }

    const decreaseLifes = () => {
        setLifes(lifes - 1);
        localStorage.setItem('lifes', lifes - 1)
    }

    const forceUpdate = () => {
        setLoading(true)
        setTryWord('');
        setTries([]);
        setLifes(QUANTITY_OF_LIFES)
        setSuccess(false)
        localStorage.removeItem('word')
        localStorage.removeItem('tries')
        getData()
    }

    const renderTriesInBoxes = () => {
        return tries.map((item, index) => {
            const _word = item.split('')
            return <div key={index} className='letter-box' style={{ width: word.length * 53 }}>
                {renderLetters(_word)}
            </div>
        })
    }

    const renderLetters = (_word) => {
        return _word.map((letter, index) => {
            return <span
                key={index}
                className={
                    `letter ${letter === word[index] ? 'correct' : word.includes(letter) ? 'close' : 'normal'}`
                }>{letter}</span>
        })
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    else {
        return (
            <div className='container'>
                <div className='modal' hidden={!success}>
                    <h1>Parabéns!</h1>
                    <h2>Você acertou a palavra {originalWord}</h2>
                    <button onClick={forceUpdate}>Jogar novamente</button>
                </div>
                <header className='container'>
                    <div>{`Tentativas restantes: ${lifes}`}</div>
                </header>
                <div>
                    <div className='words'>
                        {renderTriesInBoxes()}
                        <RICIBs
                            amount={word.length}
                            autofocus={true}
                            handleOutputString={e => { handleWord(e) }}
                            inputRegExp={/^[a-zA-Z0-9]$/}
                        />
                    </div>
                </div>
                <button onClick={() => { testWord() }}>Testar</button>
            </div>
        )
    }
}