import React from 'react'
import reactDom from 'react-dom';

import { getRandomWithSize } from '../services/palavroo_api'
import { getWordMeaning } from '../services/dicionario_api';

import { modular, randomNumber, count } from '../utils/math';
import { Audio } from 'react-loader-spinner';

import RICIBs from 'react-individual-character-input-boxes';
import Modal from '../components/modal';

export default function Game() {

    //REACT FUNCTIONS SETUP 

    const QUANTITY_OF_LIFES = 8;

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
    const [closeLetters, setCloseLetters] = React.useState([])
    const [correctLetters, setCorrectLetters] = React.useState([])
    const [incorrectWords, setIncorrectWords] = React.useState([])
    const [state, setState] = React.useState({
        word: '',
        tries: [],
        lifes: QUANTITY_OF_LIFES,
        success: false,
        failure: false,
        difficult: 1,
        closeLetters: [],
        correctLetters: [],
        incorrectWords: [],
        update: true,
        loading: true,
        tryWord: '',
        originalWord: ''
    })

    React.useEffect(() => {
        word ? setLoading(false) : getData()

        let _tries = ''
        for (let i = 0; i < word.length; i++) { _tries += " " }

        setTries(Array(QUANTITY_OF_LIFES).fill(_tries))

    }, [update, word])

    document.getElementById('root').onkeydown = (e) => {
        if (e.keyCode === 13) {
            console.log(e.keyCode)
            testWord()
        }
    }

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

        /* let _tries = ''
        for (let i = 0; i < word.length; i++) { _tries += " " }

        setTries(Array(QUANTITY_OF_LIFES).fill(_tries)) */

        setOriginalWord(response.data)
        setWord(_word.toLowerCase())

        localStorage.setItem('word', _word)
        setLoading(false)
    }

    //GAMEPLAY LOGIC

    const testWord = () => {
        console.log(`TRY WORD:${tryWord} WORD: ${word}`)
        const _triedWord = tries

        _triedWord[QUANTITY_OF_LIFES - lifes] = tryWord

        //Check if word is fully completed
        if (tryWord[0] !== '' && tryWord[0] !== undefined) {
            // Case word is correct
            if (word === tryWord.toLocaleLowerCase()) {
                setTries(_triedWord) //setTries([...tries, tryWord])
                setSuccess(true)
            }
            //Case word is incorrect
            else {
                setTries(_triedWord) // setTries([...tries, tryWord])
                localStorage.setItem('tries', JSON.stringify([...tries, tryWord]))
                if (lifes - 1 === 0) { setFailure(true) } else decreaseLifes();
            }
        }
    }

    const decreaseLifes = () => {
        setLifes(lifes - 1);
        localStorage.setItem('lifes', lifes - 1)
    }

    //LOGIC AND INTERNAL TRANSACTIONS

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


    const forceUpdate = () => {
        setLoading(true)
        setTryWord('');
        setTries([]);
        setCloseLetters([]);
        setCorrectLetters([]);
        setIncorrectWords([]);
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
                if (!correctLetters.includes(letter)) {
                    setCorrectLetters([...correctLetters, letter])
                }
            }
            else if (word.includes(letter)) {
                if (wordLetterCount[letter] > 0) {
                    _class += 'close'
                    if (!closeLetters.includes(letter)) {
                        setCloseLetters([...closeLetters, letter])
                    }
                }
                else {
                    _class += 'normal'
                }
                wordLetterCount = {
                    ...wordLetterCount,
                    [letter]: modular(wordLetterCount[letter]) - 1
                }
            }
            else {
                _class += 'normal'
                if (!incorrectWords.includes(letter)) {
                    setIncorrectWords([...incorrectWords, letter])
                }
            }

            return <span
                key={index}
                className={_class}>{letter}
            </span>
        })
    }

    const renderDictionary = () => {
        const dictionaryLetters = [
            //Qwerty letters
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
            'Z', 'X', 'C', 'V', 'B', 'N', 'M',
        ]
        return dictionaryLetters.map((letter, index) => {
            let _class = 'letter '
            if (correctLetters.includes(letter.toLowerCase())) {
                _class += 'correct'
            }
            else if (closeLetters.includes(letter.toLowerCase())) {
                _class += 'close'
            }
            else if (incorrectWords.includes(letter.toLowerCase())) {
                _class += 'incorrect'
            }
            else _class += 'normal'
            return <span key={index} className={_class}>{letter}</span>
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
                    className={'failed'} 
                    hidden={!failure}
                    onClick={() => { forceUpdate() }}
                />
                <header className='container'>
                    <strong>{`Tentativas restantes: ${lifes-1}`}</strong>
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
                        <RICIBs
                            amount={word.length}
                            autofocus={true}
                            handleOutputString={e => { handleWord(e) }}
                            inputRegExp={/^[a-zA-Z0-9]$/}
                            inputString={''}
                            inputProps={Array(word.length).fill({
                                style:
                                {
                                    width: '1rem', height: "1rem", position: 'relative', fontSize: '1rem',
                                    color: 'rgb(235, 235, 235)', backgroundColor: '#1d1d1d'
                                }
                            })}
                        />
                        <div className='tries-box'>{renderTriesInBoxes()}</div>
                        <div className='dictionary'>{renderDictionary()}</div>
                    </div>
                    <button style={{ width: `${2.95 * word.length}rem` }} onClick={() => { testWord() }}>Jogar</button>
                </div>
            </div>
        )
    }
}