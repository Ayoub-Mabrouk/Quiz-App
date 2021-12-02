import { User, Teacher, Student, Subject, Question, Level } from "./classes.js";


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

// let content_container = document.querySelector(".content_container");

//tab links
let teacher_link = document.querySelector("#teacher_link");
let questions_link = document.querySelector("#questions_link");
let subjects_link = document.querySelector("#subjects_link");
let tests_link = document.querySelector("#tests_link");
teacher_link.addEventListener("click", show_teacher_tab);



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
  content_container.innerHTML=` <form action="" id="form_add_teacher" class="md:w-1/2 w-full">
  <div class="shadow-xl">
    <div class="
          border-b border-gray-300
          flex
          items-center
          bg-red-500
          rounded-t-lg
        ">
      <label class="text-red-100 w-24 text-right ml-4 mr-8" for="name">First Name</label>
      <input class="
            flex-1
            p-4
            pl-0
            bg-transparent
            placeholder-gray-300
            outline-none
            text-white
          " type="text" id="name" name="first_name" placeholder="your first name" />
    </div>

    <div class="border-b border-gray-300 flex items-center bg-red-500">
      <label class="text-red-100 w-24 text-right ml-4 mr-8" for="last_name">Last Name</label>
      <input class="
            flex-1
            p-4
            pl-0
            bg-transparent
            placeholder-gray-300
            outline-none
            text-white
          " type="text" id="last_name" name="last_name" placeholder="your last name" />
    </div>

    <div class="border-b border-gray-300 flex items-center bg-red-500">
      <label class="text-red-100 w-24 text-right ml-4 mr-8" for="profession">Profession</label>
      <input class="
            flex-1
            p-4
            pl-0
            bg-transparent
            placeholder-gray-300
            outline-none
            text-white
          " type="text" id="profession" name="profession" placeholder="your profession" />
    </div>

    <div class="flex items-center bg-red-500 rounded-b-lg mb-10">
      <label class="text-red-100 w-24 text-right ml-4 mr-8" for="email">Email</label>
      <input class="
            flex-1
            p-4
            pl-0
            bg-transparent
            placeholder-gray-300
            outline-none
            text-white
          " type="email" id="email" name="email" placeholder="your email" />
    </div>
  </div>
  <div class="flex">
    <button type="submit" class="
          mx-auto
          w-full
          bg-red-500
          p-3
          rounded
          text-red-100
          font-bold
          shadow
          hover:bg-red-700
        ">
      Add Teacher
    </button>
  </div>
</form>
<div class="teacher_table_container w-8/12">
  <table class="border-collapse block md:table shadow-xl w-full">
    <thead class="block md:table-header-group">
      <tr class="
            border border-grey-500
            md:border-none
            block
            md:table-row
            absolute
            -top-full
            md:top-auto
            -left-full
            md:left-auto md:relative
          ">
        <th class="
              bg-red-500
              p-2
              text-white
              font-bold
              md:border md:border-grey-500
              text-left
              block
              md:table-cell
              rounded-tl-lg
            ">
          First Name
        </th>
        <th class="
              bg-red-500
              p-2
              text-white
              font-bold
              md:border md:border-grey-500
              text-left
              block
              md:table-cell
            ">
          Last Name
        </th>
        <th class="
              bg-red-500
              p-2
              text-white
              font-bold
              md:border md:border-grey-500
              text-left
              block
              md:table-cell
            ">
          Email
        </th>
        <th class="
              bg-red-500
              p-2
              text-white
              font-bold
              md:border md:border-grey-500
              text-left
              block
              md:table-cell
            ">
          Profession
        </th>
        <th class="
              bg-red-500
              p-2
              text-white
              font-bold
              md:border md:border-grey-500
              text-left
              block
              md:table-cell
              rounded-tr-lg
            ">
          Manage
        </th>
      </tr>
    </thead>
    <tbody class="block md:table-row-group" id="tbody">
      
    </tbody>
  </table>
</div>`

  await create_teachers_table();
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
      show_teacher_tab();
      console.log(response.json());
    } else {
      console.log("fill all the teacher's input");
    }
  };
  
}
show_teacher_tab()



//
//
// THE QUESTIONS PART
//
//
//
let Questions=[]
async function get_all_questions() {
  const response = await fetch("http://localhost:3000/Quetions");
  Questions = await response.json();
  console.log(Questions);
}

async function create_questions_table() {
  Questions=[];
  await get_all_questions();
  //get the table container to start modifiying it
  Questions.map((e,i)=>
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
  content_container.innerHTML=` <form action="" id="form_add_question" class="md:w-1/2 w-full">
  <div class="shadow-xl">
    <div class="
          border-b border-gray-300
          flex
          items-center
          bg-red-500
          rounded-t-lg
        ">
      <label class="text-red-100 w-24 text-right ml-4 mr-8" for="name">First Name</label>
      <input class="
            flex-1
            p-4
            pl-0
            bg-transparent
            placeholder-gray-300
            outline-none
            text-white
          " type="text" id="name" name="first_name" placeholder="your first name" />
    </div>

    <div class="border-b border-gray-300 flex items-center bg-red-500">
      <label class="text-red-100 w-24 text-right ml-4 mr-8" for="last_name">Last Name</label>
      <input class="
            flex-1
            p-4
            pl-0
            bg-transparent
            placeholder-gray-300
            outline-none
            text-white
          " type="text" id="last_name" name="last_name" placeholder="your last name" />
    </div>

    <div class="border-b border-gray-300 flex items-center bg-red-500">
      <label class="text-red-100 w-24 text-right ml-4 mr-8" for="profession">Profession</label>
      <input class="
            flex-1
            p-4
            pl-0
            bg-transparent
            placeholder-gray-300
            outline-none
            text-white
          " type="text" id="profession" name="profession" placeholder="your profession" />
    </div>

    <div class="flex items-center bg-red-500 rounded-b-lg mb-10">
      <label class="text-red-100 w-24 text-right ml-4 mr-8" for="email">Email</label>
      <input class="
            flex-1
            p-4
            pl-0
            bg-transparent
            placeholder-gray-300
            outline-none
            text-white
          " type="email" id="email" name="email" placeholder="your email" />
    </div>
  </div>
  <div class="flex">
    <button type="submit" class="
          mx-auto
          w-full
          bg-red-500
          p-3
          rounded
          text-red-100
          font-bold
          shadow
          hover:bg-red-700
        ">
      Add Teacher
    </button>
  </div>
</form>
<div class="teacher_table_container w-8/12">
  <table class="border-collapse block md:table shadow-xl w-full">
    <thead class="block md:table-header-group">
      <tr class="
            border border-grey-500
            md:border-none
            block
            md:table-row
            absolute
            -top-full
            md:top-auto
            -left-full
            md:left-auto md:relative
          ">
        <th class="
              bg-red-500
              p-2
              text-white
              font-bold
              md:border md:border-grey-500
              text-left
              block
              md:table-cell
              rounded-tl-lg
            ">
          First Name
        </th>
        <th class="
              bg-red-500
              p-2
              text-white
              font-bold
              md:border md:border-grey-500
              text-left
              block
              md:table-cell
            ">
          Last Name
        </th>
        <th class="
              bg-red-500
              p-2
              text-white
              font-bold
              md:border md:border-grey-500
              text-left
              block
              md:table-cell
            ">
          Email
        </th>
        <th class="
              bg-red-500
              p-2
              text-white
              font-bold
              md:border md:border-grey-500
              text-left
              block
              md:table-cell
            ">
          Profession
        </th>
        <th class="
              bg-red-500
              p-2
              text-white
              font-bold
              md:border md:border-grey-500
              text-left
              block
              md:table-cell
              rounded-tr-lg
            ">
          Manage
        </th>
      </tr>
    </thead>
    <tbody class="block md:table-row-group" id="tbody">
      
    </tbody>
  </table>
</div>`

  await create_teachers_table();
  form_add_teacher.onsubmit = async (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    if(Object.entries(data).every((e) => e[1].length > 0)) {
      let response = await fetch("http://localhost:3000/Questions", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(new Question({...data})),
      });
      show_teacher_tab();
      console.log(response.json());
    } else {
      console.log("fill all the teacher's input");
    }
  };

