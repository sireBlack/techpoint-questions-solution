/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */
/**
 * This classifier uses a Binary Search Tree to perform its classfication.
 * The insertion criterion into the BST is:
 * if new student's age is 5 years more than the current student (node), the new student should go to the right of the current student
 * if not, the new student should go to the left of the current student.
 * As a result of the insertion technique, students that will be in the same group will always be at the left of their parent node. Hence in order to get the students in the same node, a "preorder" traversal will be performed.
 */
const Student = require('./Student');

const group_data = {
    memebers: [],
    oldest: 0,
    sum: 0,
    regNos: []
}

let root = null;
let group_count = 1;
let result = [];
let groups = [];
let no_of_groups = 0;
let output = {};

// helper function to create student
function createStudent(student_data) {
  return new Student(student_data)
}

function classifier(input) {
  if(!Array.isArray(input)) throw new Error("Invalid input");
  if( input.length == 0 ) return {noOfGroups: 0};
    let cloned_input = copy(input);

    if(cloned_input.length == 1) {
    let student = cloned_input[0];
    student.age = new Date().getFullYear() - new Date(student['dob']).getFullYear();
    
      return {noOfGroups: 1, group1: {
        members: [{name: student.name, age: student.age}], oldest: student.age, sum: student.age}
      } 
    }else {
      for (let student_datum of cloned_input) {
        // Creating a node and initailising 
        // with student_data 
        student_datum.age = new Date().getFullYear() - new Date(student_datum['dob']).getFullYear();

        let student = createStudent(student_datum);
                        
        // root is null then student will
        // be added to the tree and made root.
        if(root === null)
            root = student;
        else
    
        // find the correct position in the 
        // tree and add the student
        insertStudent(root, student);
      }
    }
    preorder(root);
    return formatOutput()
}

function insertStudent(student, newStudent) {
    // if the new student age is less than the old student age, move left
    if(Math.abs(newStudent.age - student.age) <= 5)
    {
        // if left is null insert student here
        if(student.left === null)
            student.left = newStudent;
        else

            // if left is not null recurr until null is found
            insertStudent(student.left, newStudent); 
    }

    // if the new student age is greater than the old student age, move right
    else
    {
        // if right is null insert student here
        if(student.right === null)
            student.right = newStudent;
        else

            // if right is not null recurr until null is found
            insertStudent(student.right,newStudent);
    }
}

/**
 * Returns the root of the student tree (usually the first student in the tree)
 */
function getRootStudent() {
    return root;
}
  
  /**
 * Splits and array into array of a specific size
 * @param {*} member_array : array to be splitted in chunks
 * @param {*} chunk_size : chunk size
 */
function splitMembers(member_array, chunk_size){
    while (member_array.length) 
        groups.push(member_array.splice(0, chunk_size));
}

function preorder(student) {

  if(student != null)
  {
      result.push(student);
      preorder(student.left);
      if(result.length > 3) { // a group may have more than 3 members, simply split them in three's
          splitMembers(result, 3);
      }else groups.push(result);
      result = [];
      preorder(student.right);
  }
}

/**
* Create the required output from the result of calling preOrder(student)
*/
function formatOutput() {
  // remove empty arrays
  if(groups.length == 0) return;
  const groupz = groups.filter(student => student.length > 0);

  // set the total number of groups
  output['noOfGroups'] = groupz.length;

  for (const group of groupz) {
      // sort the group data by age so that the oldest student will be the last per group
      group.sort((a, b) => {
          return a.age - b.age
      })

      // grouping starts here
      let student_group = Object.assign({}, group_data);

      // calculate total age in a group
      let group_age_total = group.map(student => student.age).reduce((acc, curr) => {
          return acc + curr;
      })
      student_group.sum = group_age_total; // set group total age 
      let group_members = [];
      let group_members_regNos = []
      group.map(student => {
          if(typeof student ==  "number");
          else {
              group_members.push({name: student.name, age: student.age});
              group_members_regNos.push(student.regNo);
          }
      });
      
      student_group.regNos = group_members_regNos; // set group reg numbers
      student_group.oldest = group[group.length - 1].age; // set group oldest to the last student in sorted group (above)
      student_group.memebers = group_members; // set group members
      
      // name group
      let group_name = "group"+group_count++;
      output[group_name] = student_group; // append groups to final output     
  }
  return output;   
}

// helper function to clone an array
function copy(o) {
  var output, v, key;
  output = Array.isArray(o) ? [] : {};
  for (key in o) {
      v = o[key];
      output[key] = (typeof v === "object") ? copy(v) : v;
  }
  return output;
}
module.exports = classifier;
