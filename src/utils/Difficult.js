import { randomNumber } from "./math";

export default function defineDifficult(difficult) {

    const difficulties = [
        [4, 5],
        [6, 7],
        [8, 9],
        [10, 14]
    ]

    const [start, end] = difficulties[difficult + 1]

    let size = randomNumber(start, end)

    return Math.round(size)
}