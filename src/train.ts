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

function objectToArray(obj: Record<string, any>): [string, any][] {
    return Object.entries(obj);
  }
  
  const result = objectToArray({ a: 10, b: 20 });
  console.log(result);