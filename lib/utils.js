export const getRotationIndex = (name) => {
    if (!name) return 0
    let hash = 0
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return Math.abs(hash)
}

export const localizeText = (text, cityName, cityIndex) => {
    if (!cityName || !text) return text
    const localPhrases = [
        `trusted in ${cityName}`,
        `serving the ${cityName} industrial belt`,
        `${cityName}'s preferred engineering hub`,
        `available across ${cityName}`
    ]
    const phrase = localPhrases[cityIndex % localPhrases.length]

    return text
        .replace(/Chennai/g, cityName)
        .replace(/industrial hub/g, phrase)
        .replace(/industrial region/g, `${cityName} manufacturing zone`)
        .replace(/engineering hub/g, `${cityName} technical center`)
}
