import React from "react"

import './style.css'

export default function Letter({ enabled, character, index }) {

    let type = 'letter '

    if (character?.dead) type += ' incorrect'

    else if (character?.close) type += ' close'

    else if (character?.hit) type += ' correct'

    else type += ' normal'

    return <span
        key={index}
        className={type}>
        {character.letter}
    </span>

}