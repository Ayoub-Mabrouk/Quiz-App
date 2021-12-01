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
      constructor({first_name, last_name, email, profession}) {
        super(first_name, last_name, email);
        this.profession = profession;
      }
    }
  class Student extends User {
    constructor(first_name, last_name, email) {
      super(first_name, last_name, email);
    }
  }
  class Subject {
    static static_id = 0;
    constructor(name, type, children) {
      this.id = `${[...this.constructor.name].shift()}${[
        ...this.constructor.name,
      ].pop()}${++Subject.static_id}${Date.now()}${Math.floor(
        Math.random() * 100
      )}${Math.floor(Math.random() * 100)}`;
      this.name = name;
      this.type = type;
      this.children = JSON.parse(JSON.stringify(children));
    }
  }
  class Question {
    static static_id = 0;
    constructor(text, answers=[], points, level) {
      this.id = `${[...this.constructor.name].shift()}${[
        ...this.constructor.name,
      ].pop()}${++Question.static_id}${Date.now()}${Math.floor(
        Math.random() * 100
      )}${Math.floor(Math.random() * 100)}`;
      this.text = text;
      this.points = points;
      this.answers = answers;
      this.level = level;
    }
  }
  class Answer {
    static static_id = 0;
    constructor(text, correct) {
      this.id = `${[...this.constructor.name].shift()}${[
        ...this.constructor.name,
      ].pop()}${++Answer.static_id}${Date.now()}${Math.floor(
        Math.random() * 100
      )}${Math.floor(Math.random() * 100)}`;
      this.text = text;
      this.correct = correct;
    }
  }
  
  class Level {
      static static_id = 0;
      constructor(text, min_points,max_points) {
        this.id = `${[...this.constructor.name].shift()}${[
          ...this.constructor.name,
        ].pop()}${++Level.static_id}${Date.now()}${Math.floor(
          Math.random() * 100
        )}${Math.floor(Math.random() * 100)}`;
        this.min_points = min_points;
        this.max_points = max_points;
      }
    }

    export  {User,Teacher,Student,Subject,Question,Answer,Level};