//Create Array dataTask and check if you empty!
let dataTask;
if(localStorage.tasks == null){
    dataTask = [];
}else{
    dataTask = JSON.parse(localStorage.tasks);
}

//Get id Btn Form Modal
let btnSave = document.getElementById("Btn_save");
let btnEdite = document.getElementById("Btn_edite");
let btnDelete = document.getElementById("Btn_delete");

//index items tasks
var indexGlobal;

//Dec Form
const form = document.forms["tasks"];

//Function Click btn save
btnSave.addEventListener("click",(e)=>{
    e.preventDefault();
    Add();
})

//Create
//Function Add_Task 
function Add(){
    let newTask = {
        //get name iputs
        titel : form.inputTitel.value,  
        checkFB : form.flexRadioDefault.value,
        priority : form.priorityMenu.value,
        status : form.statusMenu.value,
        date : form.inputDate.value,
        description : form.inputDesciption.value,
    };
    //test
    console.log(newTask);
    //check input if you empty
    if(form.inputTitel.value == "" 
    || form.flexRadioDefault.value == "" 
    || form.priorityMenu.value == "" 
    || form.statusMenu.value == "" 
    || form.inputDate.value == "" 
    || form.inputDesciption.value == ""){
        alert("Please Fill in Fields!!!");
    }else{
    //Add Elements To Array
    dataTask.push(newTask);
    Show_Task();
    //Create Local Storage
    localStorage.setItem('tasks',JSON.stringify(dataTask));
    }
    
};

//Read
//Function Show_Task
function Show_Task(){
    //Clear container div
    document.querySelector("#to_do_tasks").innerHTML = "";
    document.querySelector("#in_progress_tasks").innerHTML = "";
    document.querySelector("#done_tasks").innerHTML = "";

    //get title tasks count
    document.getElementById("to-do-tasks-count").innerHTML = 0;
    document.getElementById("in-Progress-tasks-count").innerHTML = 0;
    document.getElementById("done-tasks-count").innerHTML = 0;

    //This select choise Status
    let selectStatus;

    //Loop dataTask
    for(let index=0; index<dataTask.length; index++){
        if(dataTask[index].status == "To_do"){
            document.getElementById("to-do-tasks-count").innerHTML++;
            selectStatus = document.querySelector("#to_do_tasks");
            //<i class="fa-solid fa-circle-question px-3"></i>
        }else if(dataTask[index].status == "In Progress"){
            document.getElementById("in-Progress-tasks-count").innerHTML++;
            selectStatus = document.querySelector("#in_progress_tasks");
            //<i class="fa-solid fa-rotate-right px-3"></i>
        }else if(dataTask[index].status == "Done"){
            document.getElementById("done-tasks-count").innerHTML++;
            selectStatus = document.querySelector("#done_tasks");
            //<i class="fa-solid fa-circle-check px-3"></i>
        }

        //Affiche buttone tasks
        selectStatus.innerHTML +=`
            <button onclick="Btn_Tasks(${index})" class="bg-light d-flex align-items-center border-0 w-100 mb-2 py-3 px-0 ref" data-bs-toggle="modal" 
                data-bs-target="#exampleModal">
                <div class="fs-4 text-success">
                <i class="fa-solid fa-circle-question px-3"></i>
                </div>
                <div class="text-start">
                    <div class="fw-bolder fs-5">${dataTask[index].titel}</div>
                            <div class="pb-1 w-100 pe-1">
                                <div class="opacity-50">#${index+1} created in ${dataTask[index].date}</div>
                                <div class="fw-bold " title="${dataTask[index].description}">${dataTask[index].description}</div>
                            </div>
                    <div>
                        <span class="badge text-bg-primary">${dataTask[index].priority}</span>
                        <span class="badge text-bg-secondary">${dataTask[index].checkFB}</span>
            </button>
            `;
    } 
}

//function Btn tasks
function Btn_Tasks(index){
    btnSave.style.display = 'none';
    btnEdite.style.display = 'block';
    btnDelete.style.display = 'block';

    //initialize indexGlobal 
    indexGlobal = index;
    
    //Remplier Inputs
    form.inputTitel.value = dataTask[index].titel;
    form.flexRadioDefault.value = dataTask[index].checkFB;
    form.priorityMenu.value = dataTask[index].priority;
    form.statusMenu.value = dataTask[index].status;
    form.inputDate.value = dataTask[index].date;
    form.inputDesciption.value = dataTask[index].description;
}

function Btn_Add_Tasks(){
    btnEdite.style.display = 'none';
    btnDelete.style.display = 'none';
    btnSave.style.display = 'block';

    //Clear inputs
    form.reset();
}

//Delete
btnDelete.addEventListener("click",(e)=>{
    e.preventDefault();
    dataTask.splice(indexGlobal,1);
    localStorage.tasks = JSON.stringify(dataTask);
    Show_Task();
});

//Update
btnEdite.addEventListener("click",(e)=>{
    e.preventDefault();
    dataTask[indexGlobal].titel = form.inputTitel.value;
    dataTask[indexGlobal].checkFB = form.flexRadioDefault.value;
    dataTask[indexGlobal].priority = form.priorityMenu.value;
    dataTask[indexGlobal].status = form.statusMenu.value;
    dataTask[indexGlobal].date = form.inputDate.value;
    dataTask[indexGlobal].description = form.inputDesciption.value;
    localStorage.tasks = JSON.stringify(dataTask);
    Show_Task();
})
