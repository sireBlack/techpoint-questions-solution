/**
 * Creates a deep clone of any array or object
 * @param {object} o The object to clone
 */
clone = (o) => {
    var output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
      v = o[key];
      output[key] = (typeof v === "object") ? clone(v) : v;
    }
    return output;
   }
  
   /**
    * @param {Array} arr The array to sort.
    */
   sortByAge = (arr) => {
    arr = arr.sort((student1, student2) => {
      return Number(student1.age) - Number(student2.age);
    });
   }
  
   /**
    * @param {Array} arr The arr to create the field on.
    */
   createAgeField = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].age = new Date().getFullYear() - new Date(arr[i]['dob']).getFullYear();
    }
   }
  
   /**
    * Builds the final output.
    * @param {object} output The output object.
    * @param {string} groupname
    * @param {Array} members
    * @param {Number} oldest
    * @param {Number} sum
    * @param {Array} regNos
    */
   collateResult = (output, groupname, members, oldest, sum, regNos) => {
    output['noOfGroups']++;
    output[groupname] = {
      members,
      oldest,
      sum, 
      regNos:sortRegNos(regNos)
    }
   }
  
   /**
    * Sorts the registration numbers in ascending order;
    * @param {Array} regNoArray The array to sort 
    * 
    */
   sortRegNos = (regNoArray) => {
    return regNoArray.sort((a, b) => {
      return a - b;
    })
   }
  
   /**
    * Handles when an empty array is passed to the classifier
    */
   handleEmptyArray = () => {
    throw new Error("Invalid data");
   }
  
   /**
    * classfies students based on some criteria:
    * 1. Each group has a maximum of 3 students.
    * 2. No student is in more than 1 group.
    * 3. The difference in years of the ages of student in any particular group is not more than 5.
    * @param {Array} input The list of students to classify
    * 
    */
  classifier = (input) => {
    let out = {noOfGroups: 0};
    let count = group_count = 1;
    let group_name = '';
    let sum,
      oldest = 0;
    let group = [];
    let regNos = [];
    if(!Array.isArray(input)) handleEmptyArray();
    else {
      // create clone of original list so as not to mutate the original list
      let cloned_input = clone(input); 
      if(cloned_input.length == 0) return out;
      
      createAgeField(cloned_input);
      sortByAge(cloned_input);
  
      if(cloned_input.length == 1) {
        regNos.push(input[0].regNo);
        collateResult(out, 'group1', input[0], input[0].age, input[0].age, regNos);
        return out;
      }
  
      let first_member = cloned_input[0];
      sum = first_member.age;
      oldest = first_member.age;
      regNos.push(Number(first_member.regNo));
      group.push(first_member);
    
      while(count < cloned_input.length) {
        // grouing starts
        let next_member = cloned_input[count];
        if(Math.abs(first_member.age - next_member.age) <= 5) { // group people with age difference < 5 together
          if(group.length == 3) { // group full, add to final output
            group_name = "group"+group_count++;
            collateResult(out, group_name, group, oldest, sum, regNos);
  
            // reset values to start new grouping
            group = [];
            sum = 0;
            oldest = 0; 
            regNos = [];
          }
  
          sum += next_member.age; // accumulate age in a group
          if(oldest < next_member.age) oldest = next_member.age; // get oldest student in group
          // keep regNos of every student per group
          regNos.push(Number(next_member.regNo)); 
          // add student to group
          first_member = next_member; 
          group.push(first_member);
  
          if(count == cloned_input.length - 1) { // end of list reached, add last group to output
            group_name = "group"+group_count++;
            collateResult(out, group_name, group, oldest, sum, regNos);
          }
        }else { // start new group
          group_name = "group"+group_count++;
          collateResult(out, group_name, group, oldest, sum, regNos);
          
          // reset values to start new grouping
          group = [];
          sum = 0;
          oldest = 0; 
          regNos = [];
  
          sum += next_member.age; // accumulate age in a group
          if(oldest < next_member.age) oldest = next_member.age; // get oldest student in group
          // keep regNos of every student per group
          regNos.push(Number(next_member.regNo)); 
          // add student to group
          first_member = cloned_input[count];
          group.push(first_member);
        }
        count++;
      }
      return out;
    }
  }
  
  
  module.exports = classifier;