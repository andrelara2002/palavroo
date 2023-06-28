import './DictionaryStyle.css'

export default function Dictionary({ word }) {

    const { characters } = word

    const dictionaryLetters = [
        //Qwerty letters
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M',
    ]


    return <section className="dictionary">
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

                return <span key={index} className={type}>{letter}</span>

            })
        }
    </section>

}