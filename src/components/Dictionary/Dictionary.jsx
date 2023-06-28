import { v4 } from 'uuid'
import './DictionaryStyle.css'

export default function Dictionary({ word }) {

    const { characters } = word

    const dictionaryLetters = [
        //Qwerty letters
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Enter'
    ]


    return <section className="dictionary
             bg-slate-900 rounded-lg shadow-sm p-3 max-w-lg grid grid-cols-10  text-center gap-2 "
    >
        {
            dictionaryLetters.map((letter, index) => {

                let type = 'letter '

                characters.map((character) => {

                    if (letter === character.letter) {

                        if (character.schema.dead) type += 'incorrect'

                        else if (character.schema.close) type += 'close'

                        else if (character.schema.hit) type += 'correct'
                    }

                    else type += 'normal'

                })

                return <span key={v4()} className={`bg-slate-800 p-2 rounded-md font-bold text-slate-100 ${letter.length > 1 ? 'col-span-2' : ''}`}>{letter}</span>

            })
        }
    </section>

}