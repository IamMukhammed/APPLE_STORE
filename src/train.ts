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

function missingNumber(nums: number[]): number {
    const n: number = nums.length;
    const expectedSum: number = (n * (n + 1)) / 2;
    const actualSum: number = nums.reduce((sum, num) => sum + num, 0);
    return expectedSum - actualSum;
}

const result: number = missingNumber([3, 0, 1]);
console.log(result);