import React from 'react'

import { getRandomWithSize } from '../services/palavroo_api'

import { modular, randomNumber, count } from '../utils/math';
import { Audio } from 'react-loader-spinner';

import RICIBs from 'react-individual-character-input-boxes';
import Modal from '../components/modal';

export default function Game() {

    //REACT FUNCTIONS SETUP 

    const QUANTITY_OF_LIFES = 8;
    const IS_MOBILE = window.innerWidth < 600;

    const [word, setWord] = React.useState(localStorage.getItem('word') || '')
    const [update, setUpdate] = React.useState(true)
    const [loading, setLoading] = React.useState(true)
    const [tryWord, setTryWord] = React.useState('')
    const [originalWord, setOriginalWord] = React.useState('')
    const [tries, setTries] = React.useState(JSON.parse(localStorage.getItem('tries')) || [])
    const [lifes, setLifes] = React.useState(JSON.parse(localStorage.getItem('lifes')) || QUANTITY_OF_LIFES)
    const [success, setSuccess] = React.useState(false)
    const [failure, setFailure] = React.useState(false)
    const [difficult, setDifficult] = React.useState(1)

    React.useEffect(() => {
        word ? setLoading(false) : getData()
    }, [update])

    //SETTINGS AND DATA TRANSACTION FUNCTIONS

    const getData = async () => {
        let size
        switch (parseInt(difficult)) {
            case 1:
                size = randomNumber(4, 5)
                break;
            case 2:
                size = randomNumber(6, 7)
                break;
            case 3:
                size = randomNumber(8, 9)
                break;
            case 4:
                size = randomNumber(10, 14)
                break;
            default:
                break;
        }

        const response = await getRandomWithSize(Math.round(size))
        const _word = replaceAccents(response.data)

        setOriginalWord(response.data)
        setWord(_word.toLowerCase())

        localStorage.setItem('word', _word)
        setLoading(false)
    }

    //GAMEPLAY LOGIC

    const testWord = () => {
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
                localStorage.setItem('tries', JSON.stringify([...tries, tryWord]))
                tries.length >= QUANTITY_OF_LIFES ? setFailure(true) : decreaseLifes();
            }
        }
    }

    const decreaseLifes = () => {
        setLifes(lifes - 1);
        localStorage.setItem('lifes', lifes - 1)
    }

    //LOGIC AND INTERNAL TRANSACTIONS

    const handleWord = (e) => {
        console.log(e)
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


    const forceUpdate = () => {
        setLoading(true)
        setTryWord('');
        setTries([]);
        setLifes(QUANTITY_OF_LIFES)
        setSuccess(false)
        setFailure(false)
        localStorage.removeItem('word')
        localStorage.removeItem('tries')
        getData()
    }

    //LAYOUT AND SCREEN CONSTRUCTION

    const renderTriesInBoxes = () => {
        return tries.map((item, index) => {
            const _word = item.split('')
            return <div key={index} className='letter-box' style={{ width: word.length * 53 }}>
                {renderLetters(_word)}
            </div>
        })
    }

    const renderLetters = (_word) => {
        const letterCount = count(_word.join().replaceAll(",", ''));
        let wordLetterCount = count(word)
        const totalLetterCount = count(word)

        return _word.map((letter, index) => {

            let _class = 'letter ';

            if (letter === word[index]) {
                _class += 'correct'
            }
            else if (word.includes(letter)) {
                wordLetterCount[letter] > 0 ? _class += 'close' : _class += 'normal'
                wordLetterCount = {
                    ...wordLetterCount,
                    [letter]: modular(wordLetterCount[letter]) - 1
                }
            }
            else _class += 'normal'

            return <span
                key={index}
                className={_class}>{letter}
            </span>
        })
    }

    if (loading) {
        return <Audio
            height="100"
            width="100"
            color='grey'
            ariaLabel='loading'
        />
    }

    else {
        return (
            <div className='app'>
                <Modal // Modal for success
                    title={'Parabéns'}
                    hidden={!success}
                    description={`Você acertou a palavra ${originalWord}`}
                    buttonLabel={"Jogar novamente"}
                    onClick={() => { forceUpdate() }}
                />
                <Modal // Modal for failure
                    title={"Acabaram suas vidas!"}
                    description={`A palavra era: ${originalWord}`}
                    buttonLabel={"Jogar novamente"}
                    hidden={!failure}
                    onClick={() => { forceUpdate() }}
                />
                <header className='container'>
                    <strong>{`Tentativas restantes: ${lifes}`}</strong>
                    <div className="header_buttons">
                        <select name="Dificuldade" value={difficult} onChange={(e) => setDifficult(e.target.value)}>
                            <option value={1}>Fácil (4,5 letras)</option>
                            <option value={2}>Médio (6,7 letras)</option>
                            <option value={3}>Difícil (8,9 letras)</option>
                            <option value={4}>Insano (10,12 letras)</option>
                        </select>
                        <button
                            className='button restricted-content'
                            onClick={() => { forceUpdate() }}
                            type={'button'}>Mudar palavra</button>
                    </div>
                </header>
                <div className='wrapper'>
                    <div className='words'>
                        <div className='tries-box'>{renderTriesInBoxes()}</div>
                        <RICIBs
                            amount={word.length}
                            autofocus={true}
                            handleOutputString={e => { handleWord(e) }}
                            inputRegExp={/^[a-zA-Z0-9]$/}
                            inputString={''}
                            inputProps={Array(word.length).fill({
                                style:
                                    { width: '1rem', height: "1rem", position: 'relative', fontSize: '1rem' }
                            })}
                        />
                    </div>
                    <button onClick={() => { testWord() }}>Jogar</button>
                </div>
            </div>
        )
    }
}