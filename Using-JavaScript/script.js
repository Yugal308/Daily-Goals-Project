const title = document.getElementById("title");
const desc = document.getElementById("desc");
const form = document.querySelector("form");
const container = document.querySelector(".container");

const tasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];

showTask();

function showTask(){
    tasks.forEach((value,index)=>{
        const div = document.createElement("div");
        div.setAttribute("class","task");

        const innerdiv = document.createElement("div");
        innerdiv.setAttribute("class","goals");
        div.append(innerdiv);
        
        const taskTitle = document.createElement("div");
        taskTitle.setAttribute("class","taskTitle");
        taskTitle.innerHTML = value.title;
        innerdiv.append(taskTitle);

        const taskDesc = document.createElement("div");
        taskDesc.setAttribute("class","taskDesc");
        taskDesc.innerHTML = value.description;
        innerdiv.append(taskDesc);
        
        const del = document.createElement("button");
        del.setAttribute("class","delete");
        del.innerHTML = "-";
        div.append(del);

        del.addEventListener("click",()=>{
            removeTasks();
            tasks.splice(index, 1);
            localStorage.setItem("tasks",JSON.stringify(tasks));
            showTask();
        });
        container.append(div);
    });
}

function removeTasks(){
    tasks.forEach(()=>{
        const div = document.querySelector(".task");
        div.remove();
    });
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    removeTasks();
    tasks.push({
        title: title.value,
        description: desc.value,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTask();
});

