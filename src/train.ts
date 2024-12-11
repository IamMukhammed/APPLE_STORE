function getDigits(input: string): string {
    return input.replace(/\D/g, ""); // \D matndagi raqam bo'lmagan belgilarni ifodalaydi
}

// Misol:
console.log(getDigits("m14i1t")); // "141"