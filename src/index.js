import "./style.css";
import { addStepToForm } from "./form.js";
import { CreateProject } from "./project.js";
import { storeProjectData, getProjectsData, initStorage } from "./storageController.js";
console.log("loaded");

initStorage();
function populateFromStorage() {
    const projectsData = getProjectsData();
    for (const project of projectsData) {
        const data = new FormData();
        for (const [key, value] of Object.entries(project)) {
            if (Array.isArray(value)) {
                for (const slice of value) {
                    data.append(key, slice);
                }
            } else {
                data.append(key, value);
            }
        }
        console.log(data);
        CreateProject(data);
    }
}

const projectForm = document.querySelector("#project-form");
projectForm.addEventListener("submit", (Event) => {
    Event.preventDefault();
    const data = new FormData(projectForm);
    data.append("id", crypto.randomUUID());
    data.append("completed", "false");
    CreateProject(data);
    storeProjectData(data);
    projectForm.reset();
});
const stepBtn = document.querySelector("#add-step");
stepBtn.addEventListener("click", () => {
    addStepToForm();
});

populateFromStorage();
