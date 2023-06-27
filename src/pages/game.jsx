import React, { useState, useEffect } from 'react'

import { Audio } from 'react-loader-spinner'
import StringProcessor from '../utils/StringProcessor'
import Row from '../components/Row/Row'
import Dictionary from '../components/Dictionary/Dictionary'



export default function Game() {

    const [state, setState] = useState({
        word: undefined,
        tries: undefined,
        loading: true,
        lifes: 8
    })

    useEffect(() => {

        const stringProcessor = new StringProcessor('banana')

        const tries = new Array(state.tries)

        tries.forEach(x => new Array(stringProcessor.getLength()))

        setState({ ...state, word: stringProcessor, loading: false, tries })

    }, [])

    if (loading)
        return (
            <Audio
                height="100"
                width="100"
                color='grey'
                ariaLabel='loading'
            />
        )


    else {
        <>
            <section>
                {
                    tries.map(word => {
                        <Row
                            characters={word}
                            enabled={false}
                        />
                    })
                }
            </section>

            <Dictionary />
        </>
    }
}