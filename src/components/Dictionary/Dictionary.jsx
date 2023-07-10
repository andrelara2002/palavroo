import { v4 } from 'uuid'
import './DictionaryStyle.css'

export default function Dictionary({ characters }) {


    const dictionaryLetters = [
        //Qwerty letters
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Enter'
    ]

    /* TODO: Implement onclick functions */


    return <section className="dictionary
             bg-slate-900 rounded-lg shadow-sm p-3 max-w-lg grid grid-cols-10  text-center gap-2 "
    >
        {
            dictionaryLetters.map((letter, index) => {

                let type

                characters.map((character) => {

                    if (letter === character.schema.letter?.toUpperCase()) {


                        if (character?.schema.hit) type += ' bg-teal-500 border-teal-700'

                        else if (character?.schema.close) type += ' bg-amber-400 border-amber-700'


                    }

                })

                if (!type) type += ' bg-slate-800'

                return <span key={v4()} className={`p-2 rounded-md font-bold text-slate-100 ${letter.length > 1 ? 'col-span-2' : ''} ${type}`}>{letter}</span>

            })
        }
    </section>

}