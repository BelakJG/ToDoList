import "./style.css";
import { addStepToForm } from "./form.js";
console.log("loaded");

const projectForm = document.querySelector("#project-form");
projectForm.addEventListener("submit", (Event) => {
    Event.preventDefault();
    const data = new FormData(projectForm);
    projectForm.reset();
});

const stepBtn = document.querySelector("#add-step");
stepBtn.addEventListener("click", () => {
    addStepToForm();
});