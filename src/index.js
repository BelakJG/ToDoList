import "./style.css";
import { addStepToForm } from "./form.js";
import { CreateProject } from "./project.js";
import { storeProjectData, getProjectsData } from "./storageController.js";
console.log("loaded");

function populateFromStorage() {
    const projectsData = getProjectsData();
    for (const project of projectsData) {
        const data = new FormData();
        data.append("id", project["id"]);
        data.append("title", project["title"]);
        data.append("description", project["description"]);
        data.append("dueDate", project["dueDate"]);
        data.append("priority", project["priority"]);
        for (const step of project["steps"]) {
            data.append("steps[]", step);
        }

        CreateProject(data);
    }
}

const projectForm = document.querySelector("#project-form");
projectForm.addEventListener("submit", (Event) => {
    Event.preventDefault();
    const data = new FormData(projectForm);
    data.append("id", crypto.randomUUID());
    CreateProject(data);
    storeProjectData(data);
    projectForm.reset();
});
const stepBtn = document.querySelector("#add-step");
stepBtn.addEventListener("click", () => {
    addStepToForm();
});

populateFromStorage();
