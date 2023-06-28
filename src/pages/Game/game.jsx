import React, { useState, useEffect } from 'react'

import { Audio } from 'react-loader-spinner'
import StringProcessor from '../../utils/StringProcessor'
import Row from '../../components/Row/Row'
import Dictionary from '../../components/Dictionary/Dictionary'

import './style.css'



export default function Game() {

    const [state, setState] = useState({
        word: undefined,
        tries: undefined,
        loading: true,
        lifes: 8
    })

    useEffect(() => {

        const stringProcessor = new StringProcessor('banana')

        stringProcessor.build()

        const tries = Array.from({ length: state.lifes }, (_, index) => {

            return Array.from({ length: 6 }, (_, index) => {
                return {
                    close: false,
                    hit: false,
                    letter: ' ',
                    times: 0,
                    dead: false
                }
            })
        })


        setState({ ...state, word: stringProcessor, loading: false, tries })


    }, [])

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
        return <main >
            <section style={{ gap: 10, display: 'grid' }}>
                {
                    state.tries.map(word => {
                        return <Row
                            characters={word}
                            enabled={false}
                        />
                    })
                }
            </section>

            <Dictionary word={state.word?.getCharacters()} />
        </main>
    }
}