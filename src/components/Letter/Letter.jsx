import React from "react"

import './style.css'

export default function Letter({ enabled, character }) {

    const condition = character.schema.letter && character.schema.letter !== ' '

    let type = 'letter '

    if (character?.dead) type += ' incorrect'

    else if (character?.close) type += ' close'

    else if (character?.hit) type += ' correct'

    else type += ' normal'

    return <span className={`flex items-center justify-center ${enabled ? 'bg-slate-800 shadow-sm shadow-slate-500' : 'bg-transparent'} border-2 border-b-4 border-slate-800 px-6 py-3 rounded-md font-bold text-md w-10 min-w-full ${condition ? 'text-slate-100' : 'text-transparent'}`}>
        <strong>{condition ? character.schema.letter : '.'}</strong>
    </span>

}