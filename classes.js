class User {
  static static_id = 0;
  constructor(first_name, last_name, email) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.id = `${[...this.constructor.name].shift()}${[
      ...this.constructor.name,
    ].pop()}${++User.static_id}${Date.now()}${Math.floor(
      Math.random() * 100
    )}${Math.floor(Math.random() * 100)}`;
  }
  tostring() {
    return Object.entries(this).map((e) => `the ${e[0]} is ${e[1]}`).join`, `;
  }
}

class Teacher extends User {
  constructor({ first_name, last_name, email, profession }) {
    super(first_name, last_name, email);
    this.profession = profession;
  }
  async add_answer(answer) {

    let answerInstance = new Answer(answer);
    let response = await fetch(`http://localhost:3000/Questions/${answerInstance.questionId}`, {
      method: "GET",
    });
    let q = await response.json();
    
    let edited_question={...q,"answersId":[...q.answersId,answerInstance.id]}
    //edit question
     response = await fetch(`http://localhost:3000/Questions/${answerInstance.questionId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(edited_question),
    });

    // send question
     response = await fetch("http://localhost:3000/Answers", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(answerInstance),
    });

    console.log('added successfuly');
  }



  async add_subject(subject) {

    let subjectInstance = new Subject(subject);
    // console.log(subjectInstance);
    if(subjectInstance.type=='parent'){
      //  send subject
     let response = await fetch("http://localhost:3000/Subjects", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(subjectInstance),
    });
    console.log("subject added successfully");
    
    }else{
      let response = await fetch(`http://localhost:3000/Subjects/${subject.parentid}`, {
      method: "GET",
    });
    let s = await response.json();
    
    let edited_subject={...s,"children":[...s.children,subjectInstance.id]}
    //edit subject
      response = await fetch(`http://localhost:3000/Subjects/${subject.parentid}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(edited_subject),
    });

    //  send question
     response = await fetch("http://localhost:3000/Subjects", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(subjectInstance),
    });

    console.log('added successfuly');
    }
    

    
  }



  async add_question(question) {
    let questionInstance = new Question(question);
    let response = await fetch("http://localhost:3000/Questions", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(questionInstance),
    });
    let q = await response.json();
    return q;
  }


  async add_level(level) {
    let levelInstance = new Level(level);
    let response = await fetch("http://localhost:3000/Levels", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(levelInstance),
    });
    let l = await response.json();
    return l;
  }
}
class Student extends User {
  constructor(first_name, last_name, email) {
    super(first_name, last_name, email);
  }
}
class Subject {
  static static_id = 0;
  constructor({text, type, children=[]}) {
    this.id = `${[...this.constructor.name].shift()}${[
      ...this.constructor.name,
    ].pop()}${++Subject.static_id}${Date.now()}${Math.floor(
      Math.random() * 100
    )}${Math.floor(Math.random() * 100)}`;
    this.text = text;
    this.type = type;
    this.children = [...children];
  }

  static async get_all_subjects() {
    const response = await fetch("http://localhost:3000/Subjects");
    let Subjects = await response.json();
    return Subjects;
  }
}
class Question {
  static static_id = 0;
  constructor({ text, answers = [], points, subjectID, level }) {
    this.id = `${[...this.constructor.name].shift()}${[
      ...this.constructor.name,
    ].pop()}${++Question.static_id}${Date.now()}${Math.floor(
      Math.random() * 100
    )}${Math.floor(Math.random() * 100)}`;
    this.text = text;
    this.points = points;
    this.answers = answers;
    this.subjectID = subjectID;
    this.level = level;
  }

  static async get_all_questions() {
    const response = await fetch("http://localhost:3000/Questions");
    let Questions = await response.json();
    return Questions;
  }
}
class Answer {
  static static_id = 0;
  constructor({ questionId, text, correct }) {
    this.id = `${[...this.constructor.name].shift()}${[
      ...this.constructor.name,
    ].pop()}${++Answer.static_id}${Date.now()}${Math.floor(
      Math.random() * 100
    )}${Math.floor(Math.random() * 100)}`;
    this.questionId = questionId;
    this.text = text;
    this.correct = correct;
  }
}

class Level {
  static static_id = 0;
  constructor({name,min_points, max_points}) {
    this.id = `${[...this.constructor.name].shift()}${[
      ...this.constructor.name,
    ].pop()}${++Level.static_id}${Date.now()}${Math.floor(
      Math.random() * 100
    )}${Math.floor(Math.random() * 100)}`;
    this.name = name;
    this.min_points = min_points;
    this.max_points = max_points;
  }
  static async get_all_levels() {
    const response = await fetch("http://localhost:3000/Levels");
    let levels = await response.json();
    return levels;
  }
}

export { User, Teacher, Student, Subject, Question, Answer, Level };
