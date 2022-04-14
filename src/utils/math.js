export function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


export function count(string) {
    return string.split("").reduce((a, letter) => {
        var currentCount = a[letter];
        if (currentCount) {
            currentCount = currentCount + 1; // If previously counted + 1
        } else {
            currentCount = 1; // Else initialize with first occurence.
        }

        a[letter] = currentCount; //Store the new count.

        return a;
    }, {});
}

export function modular(number) {
    return number < 0 ? number * -1 : number
}