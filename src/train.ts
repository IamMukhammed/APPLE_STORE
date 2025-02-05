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

type Person = { age: number };

function sortByAge(people: Person[]): Person[] {
    return people.sort((a, b) => a.age - b.age);
}

// Sinov:
console.log(sortByAge([{ age: 23 }, { age: 21 }, { age: 13 }]));
// Natija: [{ age: 13 }, { age: 21 }, { age: 23 }]