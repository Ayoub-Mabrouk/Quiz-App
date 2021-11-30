import {User,Teacher,Student,Subject,Question,Level} from "./classes.js"


let ayoub = new User("ayoub", "mabrouk", "aaa");
console.log(ayoub.tostring());
let sef = new User("ayoub", "mabrouk", "aaa");
console.log(sef.tostring());
let hassan = new Teacher("hassan", "eass", "haasan@ggg", "js");
console.log(hassan.tostring());
console.log({ ...ayoub });
