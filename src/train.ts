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


// TASK - I

function majorityElement(nums: number[]): number | null {
    const countMap: { [key: number]: number } = {};
    
    for (const num of nums) {
        countMap[num] = (countMap[num] || 0) + 1;
    }

    let maxCount = 0;
    let majorityElement: number | null = null;

    for (const num in countMap) {
        if (countMap[num] > maxCount) {
            maxCount = countMap[num];
            majorityElement = parseInt(num, 10);
        }
    }

    return majorityElement;
}

console.log(majorityElement([1, 2, 3, 4, 5, 4, 3, 4])); // 4