import React from "react"

import './style.css'

export default function Letter({ enabled, character }) {


    const condition = character.schema.letter && character.schema.letter !== ' '

    let type = 'letter '

    if (character?.schema.close) type += ' bg-amber-400 border-amber-700'

    else if (character?.schema.hit) type += ' bg-teal-500 border-teal-700'


    /* TODO: Implement change index of letter on click */

    return <span className={`flex items-center justify-center border-2 border-b-4 border-slate-800 px-6 py-3 rounded-md font-bold text-md w-10 min-w-full ${condition ? 'text-slate-100' : 'text-transparent'} ${type}`}>
        <strong className="capitalize">{condition ? character.schema.letter : '.'}</strong>
    </span>

}