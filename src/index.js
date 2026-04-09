import "./style.css";
import { addStepToForm } from "./form.js";
import { CreateProject } from "./project.js";
console.log("loaded");

const projectForm = document.querySelector("#project-form");
projectForm.addEventListener("submit", (Event) => {
    Event.preventDefault();
    const data = new FormData(projectForm);
    CreateProject(data);
    projectForm.reset();
});

const stepBtn = document.querySelector("#add-step");
stepBtn.addEventListener("click", () => {
    addStepToForm();
});