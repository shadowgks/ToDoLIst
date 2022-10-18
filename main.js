//get value
let InputTitel = document.querySelector("#InputTitel");
//checkF_B Checked radio
let checkF_B;
let Radio_F= document.querySelector('#Radio_Feature');
let Radio_B = document.querySelector('#Radio_Bug');
let priority_menu = document.querySelector("#priority_menu");
let status_menu = document.querySelector("#status_menu");
let input_Date = document.querySelector("#input_Date");
let input_description = document.querySelector("#InputComment");
function checkinputRadio(){
    //Check Radio inpute
    if(Radio_F.checked == true){
        checkF_B = Radio_F.value;
    }else if(Radio_B.checked == true){
        checkF_B = Radio_B.value;
    }
}

//Get id Btn Form Modal
let Btn_Save = document.getElementById("Btn_save");
let Btn_Edite = document.getElementById("Btn_edite");
let Btn_Delete = document.getElementById("Btn_delete");



//Function Click btn save
Btn_Save.addEventListener("click",(e)=>{
    e.preventDefault();
    checkinputRadio();
    Add();
})

//Create Array dataTask and check if you empty!
let dataTask;
if(localStorage.tasks != null){
    dataTask = JSON.parse(localStorage.tasks);
}else{
    dataTask = [];
}




//Function Clear
function Clear(){
    InputTitel.value = "";
    priority_menu.value = "";
    status_menu.value = "";
    input_Date.value = "";
    InputComment.value = "";
}

//Create
//Function Add_Task 
function Add(){
    let newTask = {
        titel : InputTitel.value,
        checkFB : checkF_B,
        priority : priority_menu.value,
        status : status_menu.value,
        date : input_Date.value,
        description : input_description.value,
    };
    //test
    console.log(newTask);
    //check input if you empty
    if(InputTitel.value == "" || priority_menu.value == "" || status_menu.value == "" || input_Date.value == "" || InputComment.value == ""){
        alert("Please Fill in Fields!!!");
    }else{
    //Add Elements To Array
    dataTask.push(newTask);
    Show_Task();
    //Create Local Storage
    localStorage.setItem('tasks',JSON.stringify(dataTask));
    //Clear inputs
    Clear();
    }
    
};

//Read
//Function Show_Task
function Show_Task(){
    //get container div
    let to_do = document.querySelector("#to_do");
    let in_progress = document.querySelector("#in_progress");
    let done = document.querySelector("#done");

    //Clear container div
    to_do.innerHTML = "";
    in_progress.innerHTML = "";
    done.innerHTML = "";

    //get title tasks
    let countTodo = document.getElementById("to-do-tasks-count");
    let countinProgress = document.getElementById("in-Progress-tasks-count");
    let countDone = document.getElementById("done-tasks-count");

    //Count Table
    countTodo.innerHTML = 0;
    countinProgress.innerHTML = 0;
    countDone.innerHTML = 0;

    //Loop dataTask
    for(let i=0; i<dataTask.length; i++){
        if(dataTask[i].status == "To_do"){
            countTodo.innerHTML++;
            to_do.innerHTML +=`
            <button onclick="btn_Tasks(${i})" class="bg-light d-flex align-items-center border-0 w-100 mb-2 py-3 px-0" data-bs-toggle="modal" 
                data-bs-target="#exampleModal">
                <div class="fs-4 text-success">
                    <i class="fa-solid fa-circle-question px-3"></i>
                </div>
                <div class="text-start">
                    <div class="fw-bolder fs-5">${dataTask[i].titel}</div>
                            <div class="pb-1 w-100 pe-1">
                                <div class="opacity-50">#${i+1} created in ${dataTask[i].date}</div>
                                <div class="fw-bold " title="${dataTask[i].description}">${dataTask[i].description}</div>
                            </div>
                    <div>
                        <span class="badge text-bg-primary">${dataTask[i].priority}</span>
                        <span class="badge text-bg-secondary">${dataTask[i].checkFB}</span>
            </button>
            `;
        }else if(dataTask[i].status == "In Progress"){
            countinProgress.innerHTML++;
            in_progress.innerHTML +=`
            <button onclick="btn_Tasks(${i})" class="bg-light d-flex align-items-center border-0 w-100 mb-2 py-3 px-0" data-bs-toggle="modal" 
                data-bs-target="#exampleModal">
                    <div class="fs-4 text-success">
                        <i class="fa-solid fa-rotate-right px-3"></i>
                    </div>
                    <div class="text-start">
                        <div class="fw-bolder fs-5">${dataTask[i].titel}</div>
                        <div class="pb-1 w-100 pe-1">
                            <div class="opacity-50">#${i+1} created in ${dataTask[i].date}</div>
                            <div class="fw-bold " title="${dataTask[i].description}">${dataTask[i].description}</div>
                        </div>
                    <div>
                        <span class="badge text-bg-primary">${dataTask[i].priority}</span>
                        <span class="badge text-bg-secondary">${dataTask[i].checkFB}</span>
            </button>
            `;
        }else if(dataTask[i].status == "Done"){
            countDone.innerHTML++;
            done.innerHTML +=`
            <button onclick="btn_Tasks(${i})" class="bg-light d-flex align-items-center border-0 w-100 mb-2 py-3 px-0" data-bs-toggle="modal" 
                data-bs-target="#exampleModal">
                <div class="fs-4 text-success">
                <i class="fa-solid fa-circle-check px-3"></i>
                </div>
                <div class="text-start">
                    <div class="fw-bolder fs-5">${dataTask[i].titel}</div>
                            <div class="pb-1 w-100 pe-1">
                                <div class="opacity-50">#${i+1} created in ${dataTask[i].date}</div>
                                <div class="fw-bold " title="${dataTask[i].description}">${dataTask[i].description}</div>
                            </div>
                    <div>
                        <span class="badge text-bg-primary">${dataTask[i].priority}</span>
                        <span class="badge text-bg-secondary">${dataTask[i].checkFB}</span>
            </button>
            `;
        }
    } 
}

//Delete
//function Btn Form Modal
function btn_Tasks(index){
    Btn_Save.style.display = 'none';
    Btn_Edite.style.display = 'block';
    Btn_Delete.style.display = 'block';

    InputTitel.value = dataTask[index].titel;
    // checkF_B.value = dataTask[index].checked=checkF_B;
    priority_menu.value = dataTask[index].priority;
    status_menu.value = dataTask[index].status;
    input_Date.value = dataTask[index].date;
    input_description.value = dataTask[index].description;
    
    //btn delete modal
    Btn_Delete.addEventListener("click",(index)=>{
        dataTask.splice(index,1);
        localStorage.tasks = JSON.stringify(dataTask);
        Show_Task();
    });
    //btn update modal
    Btn_Edite.addEventListener("click",(index)=>{
        
    })
}
function btn_add_tasks(){
    Btn_Edite.style.display = 'none';
    Btn_Delete.style.display = 'none';
    Btn_Save.style.display = 'block';
    Clear();
}
//Show Tasks
Show_Task();
