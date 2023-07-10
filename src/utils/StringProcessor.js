export class Character {

    constructor(letter, times = 0, close = false, hit = false, dead = false) {
        this.schema = {
            letter,
            close,
            hit,
            times,
            dead
        }
    }

    setScore(key) { }

    setClose() { this.schema.close = true; if (this.schema.times < 0) this.schema.dead = true }
    setHit() { this.schema.hit = true; this.schema.times -= 1; if (this.schema.times < 0) this.schema.dead = true }

    getSchema() { return this.schema }

}


export default class StringProcessor {

    constructor(base_word = '') {


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

    rebuild(base_string_processor) {
        this.schema = base_string_processor
        return this.schema
    }

    buildFrom(object_characters = []) {
        const word = object_characters.map(character => character.schema.letter).join('')
        this.schema.base_word = word

        this.build()
    }

    flat(characters = []) { return characters.map(x => x.schema?.letter).join('') }

    compare(word) {
        const word_characters = this.serialize(word)

        word_characters.forEach((character, word_index) => {

            this.schema.characters.forEach((base_character, base_index) => {

                const { letter: base_letter, times: base_times } = base_character.getSchema()
                const { letter } = character.getSchema()

                if (letter === base_letter && base_index === word_index) base_character.setHit()
                else if (this.schema.base_word.includes(letter) && base_times > 0) base_character.setClose()

            })

        })
        return { characters: this.schema.characters, base_word: this.flat(this.schema.characters) }
    }

    compareWords(word1, word2) {
        const length = Math.max(word1.length, word2.length);

        for (let i = 0; i < length; i++) {
            const letter1 = word1[i];
            const letter2 = word2[i];


            if (letter1 === letter2) {

                // Rule 2: Set hit when the letters match at the same position

                this.schema.characters[i].setHit();

            }
            else if (word2.includes(letter1)) {

                // Rule 2: Set close when the word has a letter but is not at the position
                this.schema.characters[i].setClose();
            }
        }

        this.schema.base_word = word1

        return this.schema
    }

    getLength() { return this.schema.base_word.length }

    getCharacters() {
        return this.schema
    }

    setCharacter(index, letter, { times }) {
        this.character[index] = new Character(letter, times || 0)
    }

}