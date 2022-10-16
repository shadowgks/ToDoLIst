//get value
let InputTitel = document.querySelector("#InputTitel");
//Checked radio
let checkF_B;
let priority_menu = document.querySelector("#priority_menu");
let status_menu = document.querySelector("#status_menu");
let input_Date = document.querySelector("#input_Date");
let input_description = document.querySelector("#InputComment");


//Button Save Form
let Btn_Save = document.querySelector("#Btn_Save");
//Button clear Form
let Btn_clear = document.querySelector("#Btn_clear");


//Function Click button save
Btn_Save.addEventListener("click",(e)=>{
    e.preventDefault();
    if(Radio_Feature.checked == true){
        checkF_B = document.querySelector('#Radio_Feature').value;
    }else if(Radio_Bug.checked == true){
        checkF_B = document.querySelector('#Radio_Bug').value;
    }
    Add();
    Clear();
})

//Function Click button clear 
Btn_clear.addEventListener("click",(e)=>{
    e.preventDefault();
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
    console.log(newTask);

    //Add Elements To Array
    dataTask.push(newTask);
    //Create Local Storage
    localStorage.setItem('tasks',JSON.stringify(dataTask));

    if(InputTitel.value == "" || priority_menu.value == "" || status_menu.value == "" || input_Date.value == "" || InputComment.value == ""){
            alert("Please Fill in Fields");
    }
};

//Read
//Function Show_Task
function Show_Task(){
    const list = document.querySelector("#to-do-tasks");
    const row = document.createElement("div");
    for(let i=0; i<dataTask.length; i++){
        if(dataTask[i].status == "To_do"){
            row.innerHTML +=`
                <button class="bg-light d-flex align-items-center border-0 w-100 mb-2 py-3 px-0">
                <div class="fs-4 text-success">
                    <i class="fa-solid fa-circle-question px-3"></i>
                </div>
                <div class="text-start">
                    <div class="fw-bolder fs-5">${dataTask[i].titel}</div>
                            <div class="pb-1">
                                    <div class="opacity-50">#${i+1} created in ${dataTask[i].date}</div>
                                    <div class="fw-bold" title="${dataTask[i].description}">${dataTask[i].description}</div>
                            </div>
                <div class="">
                    <span class="badge text-bg-primary">${dataTask[i].priority}</span>
                    <span class="badge text-bg-secondary">${dataTask[i].checkFB}</span>
                </div>
                </div>
                </button>
                `;

            list.appendChild(row);
            }else if(dataTask[i].status == "In Progress"){

            }else if(dataTask[i].status == "Done"){

            }
    
    } 
}
//Show Tasks
Show_Task();