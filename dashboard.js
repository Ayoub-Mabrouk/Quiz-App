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
questions_link.addEventListener("click", show_question_tab);
answers_link.addEventListener("click", show_answer_tab);


let Teachers=[];
 
async function Get_all_teachers() {
  const response = await fetch("http://localhost:3000/Teachers");
  Teachers = await response.json();
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
  ${e.profession}
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
    } else {
      console.log("fill all the teacher's input");
    }
  };
  
}
show_teacher_tab();



//
//
// THE QUESTIONS PART
//
//
//

let Questions=[]
async function get_all_questions() {
  const response = await fetch("http://localhost:3000/Questions");
  Questions = await response.json();
}

async function create_questions_table() {
  Questions=[];
  let levels = await Level.get_all_levels();
  let subjects = await Subject.get_all_subjects();
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
  ${subjects.filter(sub=>sub.id==e.subjectID)[0].text}
</td>
<td class="
      p-2
      md:border md:border-grey-500
      text-left
      block
      md:table-cell
    ">
  ${e.text}
</td>
<td class="
      p-2
      md:border md:border-grey-500
      text-left
      block
      md:table-cell
    ">
    ${e.points}
</td>
<td class="
      p-2
      md:border md:border-grey-500
      text-left
      block
      md:table-cell
    ">
    ${levels.filter(level=>level.id==e.level)[0].min_points}-${levels.filter(level=>level.id==e.level)[0].max_points}
</td>
</tr>`)
  );
}
async function show_question_tab() {
  
  let subjects = await Subject.get_all_subjects();
  let levels = await Level.get_all_levels();

  content_container.innerHTML=`<form action="" id="form_add_question" class="md:w-1/2 w-full">
  <div class="shadow-xl">
    <div class="
          border-b border-gray-300
          flex
          items-center
          bg-red-500
          rounded-t-lg
        ">
      <label class="text-red-100 w-24 text-right ml-4 mr-8" for="name">Question</label>
      <input class="
            flex-1
            p-4
            pl-0
            bg-transparent
            placeholder-gray-300
            outline-none
            text-white
          " type="text" id="name" name="text" placeholder="the question" />
    </div>

    <div class="border-b border-gray-300 flex items-center bg-red-500">
      <label class="text-red-100 w-24 text-right ml-4 mr-8" for="last_name">Points</label>
      <input class="
            flex-1
            p-4
            pl-0
            bg-transparent
            placeholder-gray-300
            outline-none
            text-white
          " type="number" value="" id="points" name="points" placeholder="Points" />
    </div>



<div class="flex relative w-full justify-between bg-red-500 items-center">
    <label class="text-red-100 w-24 text-right ml-4 mr-8" for="last_name">Level</label>
      <select name="level" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <option value="" disabled selected>Please choose a level</option>
        ${levels.map(e=>`<option value=${e.id}>${e.min_points}-${e.max_points}</option>`).join``}
      </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
</div>



<div class="flex relative w-full justify-between bg-red-500 items-center">
    <label class="text-red-100 w-24 text-right ml-4 mr-8" for="last_name">Subject</label>
      <select name="subjectID" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <option value="" disabled selected>Please choose subject</option>
        ${subjects.filter(e=>e.type=="parent")?.map(parent=>`<optgroup label=${parent.text}>${subjects.filter(sub=>sub.type=="" && parent.children.includes(sub.id))?.map(sub=>`<option value=${sub.id}>${sub.text}</option>`).join('')}</optgroup>`).join('')}       
      </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
</div>




    
  </div>
  <div class="flex mt-4">
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
      Add Question
    </button>
  </div>
</form>
<div class="question_table_container w-8/12">
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
          Subject
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
              rounded-tl-lg
            ">
          Question
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
          Points
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
          Level
        </th>
      </tr>
    </thead>
    <tbody class="block md:table-row-group" id="tbody">
      
    </tbody>
  </table>
</div>`


  await create_questions_table();
  form_add_question.onsubmit = async (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    let min=levels.filter(level=>level.id==data.level)[0].min_points;
    let max=levels.filter(level=>level.id==data.level)[0].max_points;
    if(data.points<min || data.points>max){
      console.log("choose points from the interval");
      return;
    }
    let T= new Teacher({});
    T.add_question(data)
    show_question_tab();
  }}

//
//
//answers
//
//


async function show_answer_tab() {
  content_container.innerHTML=` <form action="" id="form_add_answer" class="md:w-1/2 w-full">
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
</form>`

  form_add_answer.onsubmit = async (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    
      let response = await fetch("http://localhost:3000/Answers", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(new Teacher({...data})),
      });
      show_answer_tab();
    
  };
  
}