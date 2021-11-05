"user strict";

/* Goal :Add, Delete, (id, description, created time)*/

//Gather info from input
//Button on click and add the task to the list
//where will you store the input value? [] maybe?
//render list  (for loop list[i])


// -- Tasks
/*
    1. render the data that is already there, if no data -> print no data
    2. handle save only on button click, input handling, validation, save, error message
    3. delete function
    4. done button
*/

//Declare variables
const taskInput = document.querySelector('#newTask');//input field
const addBtn = document.getElementById('addBtn');

let todoList = [
    {
        id: 1,
        description: 'Learn HTML, CSS,JS',
        createdTime: 'Fri Jul 25 2021 01:19:19 GMT-0400 (Eastern Daylight Time) '
    },
    {
        id: 2,
        description: 'Go Out for a walk',
        createdTime: 'Fri Jul 26 2021 01:19:19 GMT-0400 (Eastern Daylight Time) '
    },
    {
        id: 3,
        description: 'Prep for dinner',
        createdTime: 'Fri Jul 27 2021 01:19:19 GMT-0400 (Eastern Daylight Time) '
    }
]; 

//Render the list 
function renderList() {
    let output = "";

    for (let i = 0; i < todoList.length; i++) {
        output += '<tr id = \"row_' + `${todoList[i].id}` + '"><th scope = \"row\">' + `${todoList[i].id}` + '</th>\n';
        output += '<td>' + `${todoList[i].createdTime}` + '</td>\n';
        output += '<td>' + `${todoList[i].description}` + '</td>\n';
        output += '<td><button type = \"button\" class=\"btn btn-md btn-danger\" value = ' + todoList[i].id + ' onClick = filteredTask(' + `${todoList[i].id}` + ')> delete </button></td>';
        output += '<td><button id = \"edit_' + `${todoList[i].id}` + '" type = \"button\" class=\"btn btn-md btn-info\" value = ' + todoList[i].id + ' onClick = updateTask(' + `${todoList[i].id}` + ')> Edit </button></td></tr>';
    }

    document.querySelector("#result").innerHTML = output;
   
}

renderList();



// storage is empty/ data
// randomize id must be unique
let count = 0;//global variable
function generateId(){
    const currentIndex = todoList.length-1;
    //console.log(currentIndex);
    const currentID = todoList[currentIndex].id;
    return count = currentID + 1;
}

//CREATE METHOD
let handleSave = () => {
    console.log("handling save..");
    console.log(taskInput.value);
    console.log(!!taskInput.value);
     if (taskInput.value) {

        let currentDate = new Date();
        const CreateTaskObjects = () => ({
                id: generateId(),
                description: taskInput.value,
                createdTime: currentDate
        })

        todoList = [...todoList, CreateTaskObjects()]
        console.log(todoList);
        renderList();

     } else {
         document.querySelector('#newTask').style.borderColor = "red";
         //console.log('The inpout is empty. Please add new task.');
     }
    
 }

//DELETE METHOD
//Method 1: using splice method
 function removeTask(task_id) {
     for( let j = 0; j < todoList.length; j++){
         if(todoList[j].id === task_id){
            todoList.splice(j, 1);
            break;
         }
     }
     
     renderList();
 }

// Method 2: using FILTER METHOD
//Declare a function to keep unmtached items
function isTaskHasId(task, task_id){
    return task.id != task_id;
}

//Below are longer form expressing line 118
// todoList.filter(function(task) {
//     return isTaskHasId(task, task_id);
// });

function filteredTask(task_id){
    todoList = todoList.filter(task => isTaskHasId(task, task_id));
    renderList();
}

//EDIT Method

function updateTask(task_id){
    let row = document.getElementById("row_"+ task_id);
    console.log(row);

    let cell = row.children[2];
    console.log(cell);

    let oriText = cell.innerHTML;
    console.log(oriText);

    cell.innerHTML = '<input type =\"text\" value = \"'+ oriText + '\" />';

    let editBtn = document.getElementById("edit_"+ task_id);
    console.log(editBtn);

    editBtn.innerHTML = "Save";
    editBtn.onclick = () => saveTask(task_id);
}

function saveTask(task_id){
    let row = document.getElementById("row_"+ task_id);
    let cell = row.children[2];
    console.log("Cell is: " + cell);
    let newText = cell.children[0].value;
    console.log(task_id + " | " + newText);

    todoList.filter(task => task.id === task_id)[0].description = newText;

    cell.innerHTML = newText;

    let editBtn = document.getElementById("edit_"+ task_id);
    editBtn.innerHTML = "Edit";

    editBtn.onclick = () => updateTask(task_id);

    renderList();


}


//events
    addBtn.addEventListener("click", handleSave);
