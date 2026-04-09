export function addStepToForm() {
    const projectForm = document.querySelector("#project-form");
    const fields = projectForm.querySelector(".fields");

    const entry = document.createElement("div");
    entry.classList.add("field")
    const entryID = crypto.randomUUID();
    entry.dataset.fieldId = `field-${entryID}`;

    const label = document.createElement("label");
    label.htmlFor = "steps[]";
    label.textContent = "*Step: "
    entry.appendChild(label);

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.name = "steps[]";
    textInput.placeholder = "Project Step";
    textInput.required = true;
    entry.appendChild(textInput);

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "X";
    entry.appendChild(removeBtn);

    removeBtn.addEventListener("click", () => {
        removeStepFromForm(entryID);
    });

    fields.appendChild(entry);
}

function removeStepFromForm(id) {
    const step = document.querySelector(`[data-field-id=field-${id}]`);
    step.remove();
}