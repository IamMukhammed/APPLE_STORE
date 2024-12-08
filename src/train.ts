console.log("Hello World");


function getPositive(arr: number[]): string {
    return arr
        .filter((num: number) => num > 0) // Faqat ijobiy sonlarni tanlab olish
        .join(''); // Tanlangan sonlarni birlashtirish
}

console.log(getPositive([1, -4, 2])); // "12"