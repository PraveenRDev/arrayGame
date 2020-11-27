var questions_list = [
    {
        id: 0,
        question: `How to add "Eagle" to the below array?`,
        codeBlock: `var birds = ["parrot", "peacock", "crow"]`,
        answers: [
            `birds.push("eagle")`,
            `birds = "Eagle"`,
            `birds[birds.length] = "Eagle"`,
            `birds.Eagle = "Eagle"`,
        ],
        correctAnswer: `birds[birds.length] = "Eagle"`,
        answerExplaination: `The reason this works so well is that the value of an array’s “length” property will always be exactly one higher than the index of the last element in the array. Why? Because while array indexes are zero-based (i.e. the first element in the array is element 0, and the second element in the array is element # 1, and the third element is element # 2, etc…), the array’s “length’”property is a one-based value (i.e., if there are three elements in the array, the length is: 3).
        `
    },
    {
        id: 1,
        question: `What is the data type of array?`,
        codeBlock: null,
        answers: [
            `object`,
            `array`,
            `array doesn't have a type`,
            `array takes type of the elements stored within`,
        ],
        correctAnswer: `object`,
        answerExplaination: `Arrays in JavaScript are numerically indexed: each array element’s “key” is its numeric index. So, in a way, each element is anonymous. This is because when you use methods of the Array object such as array.shift() or array.unshift(), each element’s index changes. So, after using array.shift(), array element # 2 becomes array element # 1, and so on. (array.pop() and array.push() may change the length of the array, but they don’t change the existing array element’s index numbers because you are dealing with the end of the array.)

        All this is to say that in a JavaScript array are a special kind of objects, with numbered indexes..`
    },
    {
        id: 2,
        question: `What property tells you the length of a JavaScript array?`,
        codeBlock: null,
        answers: [
            `length`,
            `size`,
            `noOfElements`,
            `sizeOf`,
        ],
        correctAnswer: `length`,
        answerExplaination: `The JavaScript array length property is given in a one-based context. So, a JavaScript array with one element will have a “length” of “1”. If a JavaScript array has four elements, then that array’s “length” property will have a value of “four”.`
    },
    {
        id: 3,
        question: `What is the index of the last element in the below array?`,
        codeBlock: `var fruitBasket = ["apple", 1, "orange", 2, "strawberry", 3, "lemon"]`,
        answers: [
            `6`,
            `invalid array`,
            `7`,
            `8`,
        ],
        correctAnswer: `6`,
        answerExplaination: `Last element's index of any array is (total number of elements - 1), Note JS arrays can hold different data types in it.`
    },
    {
        id: 4,
        question: `What does the array.shift() method do, and what does it return?`,
        codeBlock: null,
        answers: [
            `It removes the first element from the array and returns that element`,
            `It inserts an element to the beginning  of the array, and return the new array`,
            `It inserts an element to the beginning  of the array, and return that element`,
            `It removes the first element from the array and returns the new array`,
        ],
        correctAnswer: `It removes the first element from the array and returns that element`,
        answerExplaination: `The shift() method removes the first element from an array and returns that removed element. This method changes the length of the array.`
    },
    {
        id: 5,
        question: `What is the length of the below array?`,
        codeBlock: `var randomArray = [undefined]`,
        answers: [
            `undefined`,
            `1`,
            `0`,
            `Invalid`,
        ],
        correctAnswer: `1`,
        answerExplaination: `In JS undefined property represents the primitive value undefined, so we can store them in arrays and they will take their space.`
    },
    {
        id: 6,
        question: `What does myArray contain?`,
        codeBlock: `var myArray = [1,2,3].concat(['d', 'e', 'f'])`,
        answers: [
            `Invalid array: because of mismatching datatypes`,
            `[1, 2, 3, "d", "e", "f"]`,
            `["d","e","f"]`,
            `["d","e","f", 1,2,3]`,
        ],
        correctAnswer: `[1, 2, 3, "d", "e", "f"]`,
        answerExplaination: `The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.`
    },
    {
        id: 7,
        question: `Which is not a valid array operation`,
        codeBlock: null,
        answers: [
            `slice`,
            `splice`,
            `reverse`,
            `random`,
        ],
        correctAnswer: `random`,
        answerExplaination: `There is no 'random' array-method in JS, sort() is the method which is used to order array element in any order`
    },
    {
        id: 8,
        question: `How to remove the first element from an array`,
        codeBlock: null,
        answers: [
            `unshift`,
            `shift`,
            `pop`,
            `remove`,
        ],
        correctAnswer: `shift`,
        answerExplaination: `Refer Explaination of question 5`
    },
    {
        id: 9,
        question: `What are these called [[[]]]?`,
        codeBlock: null,
        answers: [
            `three-dimensional array`,
            `invalid array`,
            `empty array`,
            `two-dimensional array`,
        ],
        correctAnswer: `three-dimensional array`,
        answerExplaination: `A 3D array is a multi-dimensional array(array of arrays). A 3D array is a collection of 2D arrays . It is specified by using three subscripts:Block size, row size and column size. More dimensions in an array means more data can be stored in that array.`
    },
]