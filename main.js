
//Button Save Form
let Btn_Save = document.querySelector("#Btn_Save");
//Function Click button save
Btn_Save.addEventListener("click",(e)=>{
    e.preventDefault();
    Add();
})

//Button clear Form
let Btn_clear = document.querySelector("#Btn_clear");
//Function Click button clear 
Btn_clear.addEventListener("click",(e)=>{
    e.preventDefault();
})

//Function Add Task
// document.querySelector("#Task_Form").addEventListener("submit",(e) =>{
function Add(e){

    let InputTitel = document.querySelector("#InputTitel").value;
    let Radio_Feature = document.querySelector("#Radio_Feature").value;
    let Radio_Bug = document.querySelector("#Radio_Bug").value;
    let priority_menu = document.querySelector("#priority_menu").value;
    let status_menu = document.querySelector("#status_menu").value;
    let input_Date = document.querySelector("#input_Date").value;
    let InputComment = document.querySelector("#InputComment").value;


    if(InputTitel == "" || priority_menu == "" || status_menu == "" || input_Date == "" || InputComment == ""){
            alert("Please Fill in Fields");
    }else{
        const list = document.querySelector("#to-do-tasks");
        const row = document.createElement("div");

        row.innerHTML = `
        <button class="bg-light d-flex align-items-center border-0 w-100 mb-2 py-3 px-0">
        <div class="fs-4 text-success">
			<i class="fa-solid fa-circle-question px-3"></i>
		</div>
		<div class="text-start">
			<div class="fw-bolder fs-5">${InputTitel}</div>
					<div class="pb-1">
							<div class="opacity-50">#1 created in ${input_Date}</div>
							<div class="fw-bold" title="${InputComment}">${InputComment}</div>
					</div>
		<div class="">
			<span class="badge text-bg-primary">${priority_menu}</span>
			<span class="badge text-bg-secondary">${Radio_Feature}</span>
		</div>
		</div>
        </button>
        `;

        list.appendChild(row);
    }

    
};
