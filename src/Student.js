class Student
{
  constructor(data)
  {
    let data_clone = Object.assign({}, data)
    this.name = data_clone['name'];
    this.regNo = data_clone['regNo'];
    this.age = data_clone['age'];
    this.dob = data_clone['dob'];
    this.left = null;
    this.right = null;
  }
}

module.exports = Student;