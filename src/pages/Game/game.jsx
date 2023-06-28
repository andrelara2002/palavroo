import React, { useState, useEffect } from 'react'

import { Audio } from 'react-loader-spinner'
import StringProcessor from '../../utils/StringProcessor'
import LetterRow from '../../components/Row/Row'
import Dictionary from '../../components/Dictionary/Dictionary'

import './style.css'
import { v4 } from 'uuid'



export default function Game() {

    const [state, setState] = useState({
        word: undefined,
        tries: undefined,
        loading: true,
        lifes: 8,
        line: 0,
        col: 0
    })

    useEffect(() => {

        const stringProcessor = new StringProcessor('banana')

        stringProcessor.build()

        const tries = Array.from({ length: state.lifes }, (_, index) => {

            const stringProcessor = new StringProcessor(' '.repeat(6))

            stringProcessor.build()

            return stringProcessor

        })


        setState({ ...state, word: stringProcessor, loading: false, tries })

    }, [])

    useEffect(() => {

        function handleKeyPress(e) {

            if (e.keyCode === 13) {
                /* TODO: implement compare string function */

                setState({ ...state, col: 0, line: state.line + 1 })
                return
            }

            const { tries, line, col } = state

            tries[line].schema.characters[col].schema.letter = e.key

            setState({ ...state, tries, col: state.col + 1 })


        }

        window.addEventListener('keydown', handleKeyPress)


        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [state])




    if (state.loading)
        return (
            <Audio
                height="100"
                width="100"
                color='grey'
                ariaLabel='loading'
            />
        )


    else {
        return <main className='bg-slate-950 h-screen grid place-items-center align-middle' >
            <section>
                {
                    state.tries?.map((try_, index) => {
                        const row_key = v4()

                        return <LetterRow
                            characters={try_.schema.characters}
                            enabled={index === state.line}
                            key={row_key}
                        />
                    })
                }
            </section>

            <Dictionary word={state.word?.getCharacters()} />
        </main >
    }
}