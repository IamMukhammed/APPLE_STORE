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
Traditional API
Rest API
GraphQL API
...
*/

/*
TFD => Traditional Frontend Development => BSSR (Admin)     => EJS
MFD => Modern Frontend Development      => SPA (Users' app) => REACT
*/

/*
cookies
    Request join
    Self destroy
*/


function countVowels(str: string): number {
    const vowels: string[] = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  
    let count: number = 0;
  
    for (let char of str) {
      if (vowels.includes(char)) {
        count++;
      }
    }
  
    return count;
  }
  
  console.log(countVowels("string")); // 1