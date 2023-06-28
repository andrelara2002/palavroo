class Character {

    constructor(letter, times = 0) {
        this.schema = {
            letter,
            close: false,
            hit: false,
            times,
            dead: false
        }
    }

    setScore(key) { this.schema[key] = true; this.schema.times -= 1; if (this.schema.times < 0) this.schema.dead = true }

    setClose() { this.setScore('close') }
    setHit() { this.setScore('hit') }

    getSchema() { return this.schema }

}


export default class StringProcessor {

    constructor(base_word) {


        this.schema = {
            characters: [],
            base_word
        }
    }

    serialize(word) {

        if (!word) console.error('No Word Passed to Serializer')

        return word?.split('').map((letter, index, word) => {

            const times = word.filter(x => x === letter).length

            return new Character(letter, times)

        })

    }

    build() {
        this.schema.characters = this.serialize(this.schema.base_word)
    }


    compare(word) {
        const word_characters = this.serialize(word)

        return word_characters.map(character => {
            return this.schema.characters.forEach(base_character => {

                const { letter: base_letter, times: base_times } = base_character.getSchema()
                const { letter } = character.getSchema()

                if (letter === base_letter) letter.setHit()
                if (this.schema.base_word.includes(letter)) letter.setClose()

            })
        })
    }

    getLength() {
        return this.schema.base_word.length
    }

    getCharacters() { return this.schema }

}