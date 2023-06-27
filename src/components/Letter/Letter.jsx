import React from "react"

export default function Letter({ enabled, character }) {

    let type = enabled ? 'enabled' : 'disabled'

    if (character.dead) type += ' incorrect'

    else if (character.close) type += ' close'

    else if (character.hit) type += ' correct'

    else type += ' normal'

    return <span className={type}>{character?.letter}</span>

}