export default function replaceAccents(str) {
    const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž'
    const accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz"
    const strAccents = str.split('')
    const strAccentsOut = strAccents.map((letter) => {
        const accentIndex = accents.indexOf(letter)
        return accentIndex !== -1 ? accentsOut[accentIndex] : letter
    })
    return strAccentsOut.join('')
}