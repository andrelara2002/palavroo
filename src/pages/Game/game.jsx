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

            const { tries, line, col, word: { schema: { base_word } } } = state


            switch (e.keyCode) {
                case 13:

                    const tried_word = new StringProcessor()

                    tried_word.buildFrom(tries[line].schema.characters)

                    const comparation = tried_word.compareWords(tried_word.schema.base_word, base_word)



                    tries[line].schema = comparation

                    console.log(tries)

                    setState({ ...state, col: 0, line: line + 1, tries })

                    return

                case 8:

                    tries[line].schema.characters[col - 1].schema.letter = ' '
                    setState({ ...state, tries, col: state.col - 1 < 0 ? 0 : state.col - 1 })

                    break

                default:

                    tries[line].schema.characters[col].schema.letter = e.key

                    setState({ ...state, tries, col: state.col + 1 > 5 ? 5 : state.col + 1 })
                    break
            }

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