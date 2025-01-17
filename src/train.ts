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

function mergeSortedArrays(arr1: number[], arr2: number[]): number[] {
    return [...arr1, ...arr2].sort((a, b) => a - b);
}

console.log(mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]));
