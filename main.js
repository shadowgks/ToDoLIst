
var index_Global ;


//Get id Btn Form Modal
let Btn_Save = document.getElementById("Btn_save");
let Btn_Edite = document.getElementById("Btn_edite");
let Btn_Delete = document.getElementById("Btn_delete");


//Function Click btn save
Btn_Save.addEventListener("click",(e)=>{
    e.preventDefault();
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
    const form = document.forms["tasks"];
    let newTask = {
        //get name iputs
        titel : form.InputTitel.value,  
        checkFB : form.flexRadioDefault.value,
        priority : form.priority_menu.value,
        status : form.status_menu.value,
        date : form.input_Date.value,
        description : form.InputComment.value,
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
    let to_do = document.querySelector("#to_do_tasks");
    let in_progress = document.querySelector("#in_progress_tasks");
    let done = document.querySelector("#done_tasks");

    //Clear container div
    document.querySelector("#to_do").innerHTML = "";
    document.querySelector("#in_progress").innerHTML = "";
    ddocument.querySelector("#done").innerHTML = "";

    //get title tasks
    let countTodo = document.getElementById("to-do-tasks-count");
    let countinProgress = document.getElementById("in-Progress-tasks-count");
    let countDone = document.getElementById("done-tasks-count");

    //Count Table
    countTodo.innerHTML = 0;
    countinProgress.innerHTML = 0;
    countDone.innerHTML = 0;

    let selectStatus;

    //Loop dataTask
    for(let i=0; i<dataTask.length; i++){
        if(dataTask[i].status == "To_do"){
            countTodo.innerHTML++;
            document.querySelector("#to_do").innerHTML +=`
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
            document.querySelector("#in_progress").innerHTML +=`
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
            
        }
        selectStatus.innerHTML +=`
            <button onclick="btn_Tasks(${i})" class="bg-light d-flex align-items-center border-0 w-100 mb-2 py-3 px-0 ref" data-bs-toggle="modal" 
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

//Delete
//function Btn Form Modal
function btn_Tasks(index){
    Btn_Save.style.display = 'none';
    Btn_Edite.style.display = 'block';
    Btn_Delete.style.display = 'block';

    index_Global = index;
    
    // InputTitel.value = dataTask[index].titel;
    // // checkF_B.value = dataTask[index].checked=checkF_B;
    // priority_menu.value = dataTask[index].priority;
    // status_menu.value = dataTask[index].status;
    // input_Date.value = dataTask[index].date;
    // input_description.value = dataTask[index].description;
    // console.log(index);
     //btn delete modal
    

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


Btn_Delete.addEventListener("click",()=>{
    dataTask.splice(index_Global,1);
    localStorage.tasks = JSON.stringify(dataTask);
    Show_Task();
});

//Show Tasks
Show_Task();