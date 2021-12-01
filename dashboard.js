import { User, Teacher, Student, Subject, Question, Level } from "./classes.js";

// let ayoub = new User("ayoub", "mabrouk", "aaa");
// console.log(ayoub.tostring());
// let sef = new User("ayoub", "mabrouk", "aaa");
// console.log(sef.tostring());
// let hassan = new Teacher("hassan", "eass", "haasan@ggg", "js");
// console.log(hassan.tostring());
// console.log({ ...ayoub });

// async function add_Teacher(data = {}) {
//     const response = await fetch('http://localhost:3000/Teachers', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     });
//     return response.json();
//   }
//   add_Teacher({...hassan});

let content_container = document.querySelector(".content_container");

//tab links
let teacher_link = document.querySelector("#teacher_link");
let questions_link = document.querySelector("#questions_link");
let subjects_link = document.querySelector("#subjects_link");
let tests_link = document.querySelector("#tests_link");
let form_add_teacher = document.querySelector("#form_add_teacher");
teacher_link.addEventListener("click", show_teacher_tab);

form_add_teacher.onsubmit = async (e) => {
  e.preventDefault();
  let data = Object.fromEntries(new FormData(e.target));
  if(Object.entries(data).every((e) => e[1].length > 0)) {
    let response = await fetch("http://localhost:3000/Teachers", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(new Teacher({...data})),
    });
    console.log(response.json());
  } else {
    console.log("fill all the teacher's input");
  }
};
let Teachers=[];
 
async function Get_all_teachers() {
  const response = await fetch("http://localhost:3000/Teachers");
  Teachers = await response.json();
  console.log(Teachers);
}

async function create_teachers_table() {
  Teachers=[];
  await Get_all_teachers();
  //get the table container to start modifiying it
  Teachers.map((e,i)=>
  tbody.insertAdjacentHTML(
    "beforeend",
    `<tr class="
    bg-gray-300
    border border-grey-500
    md:border-none
    block
    md:table-row
  ">
<td class="
      p-2
      md:border md:border-grey-500
      text-left
      block
      md:table-cell
    ">
  ${e.first_name}
</td>
<td class="
      p-2
      md:border md:border-grey-500
      text-left
      block
      md:table-cell
    ">
    ${e.last_name}
</td>
<td class="
      p-2
      md:border md:border-grey-500
      text-left
      block
      md:table-cell
    ">
    ${e.email}
</td>
<td class="
      p-2
      md:border md:border-grey-500
      text-left
      block
      md:table-cell
    ">
  Math
</td>
<td class="
      p-2
      md:border md:border-grey-500
      text-left
      block
      md:table-cell
    ">
  <button class="
        bg-red-500
        hover:bg-red-700
        text-white
        font-bold
        py-1
        px-2
        border border-red-500
        rounded
      ">
    Delete
  </button>
</td>
</tr>`)
  );
}
async function show_teacher_tab() {
  await create_teachers_table();
}
show_teacher_tab()
