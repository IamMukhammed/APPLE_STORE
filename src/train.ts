/* Project Satndarts:
- Logging standarts,
- Naming standarts 
    function, method, variable => Camel case:   goHome
    class => PASCAL                         :   MemberService
    folder => KEBAB                         :   
    css => SNAKE                            :   button_style
- Error handling => loyihamizdagi sodir bolyatgan turli hil errorlarni handling qilish
*/

// API => Aplication Programming Interface 

/* 
Traditional API ( form POST )
Rest API
GraphQL API
...
*/

/* 
Frontend Development:
    TFD => Traditional Frontend Development => BSSR (Admin)     => EJS
    MFD => Modern Frontend Development      => SPA (Users' app) => REACT
*/

/*
cookies
    Request join
    Self destroy
*/

/*
 Validation:
    Frontend validation
    Pipe validation
    Backend validation
    Database validation
*/

function countOccurrences(obj: Record<string, any>, key: string): number {
    let count = 0;

    for (const k in obj) {
        if (k === key) count++; // Agar kalit mos kelsa, sanash
        if (typeof obj[k] === "object" && obj[k] !== null) {
            count += countOccurrences(obj[k], key); // Rekursiya: ichki obyekt ichida qidaramiz
        }
    }

    return count;
}

// 🔥 Test qilamiz
const obj = { model: 'Bugatti', steer: { model: 'HANKOOK', size: 30 } };
console.log(countOccurrences(obj, "model")); // Output: 2