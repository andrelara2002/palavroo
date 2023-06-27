export default function Dictionary(characters = []) {
    const dictionaryLetters = [
        //Qwerty letters
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M',
    ]
    return characters.map((character, index) => {

        let type = 'letter '

        if (character.dead) type += 'incorrect'

        else if (character.close) type += 'close'

        else if (character.hit) type += 'correct'

        else type += 'normal'

        return <span key={index} className={type}>{letter}</span>
    })
}