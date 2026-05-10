const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

export function locationWord(count) {
    return WORDS[count] ?? count.toString();
}

export function totalCourts(venues) {
    return venues.reduce((sum, v) => {
        const n = parseInt(v.courts);
        return sum + (isNaN(n) ? 0 : n);
    }, 0);
}
