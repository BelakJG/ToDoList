const projects = document.querySelector("#projects");

export function CreateProject(projectData) {
    console.log(projectData);

    const project = document.createElement("details");
    project.open = true;
    project.classList.add("project");
    const projectID = crypto.randomUUID();
    project.dataset.projectId = projectID;

    const summary = document.createElement("h3");
    summary.textContent = projectData.get("title");
    project.appendChild(summary);

    const description = document.createElement("p");
    description.textContent = projectData.get("description");
    project.appendChild(description);

    const list = document.createElement("ul");
    for (const step of projectData.getAll("steps[]")) {
        if (!step.trim()) {
            continue;
        }

        const item = document.createElement("li");
        item.textContent = step;
        list.appendChild(item);
    }
    project.appendChild(list);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete Project";
    deleteBtn.addEventListener("click", () => {
        removeProject(projectID);
    });
    project.appendChild(deleteBtn);

    projects.prepend(project);
}

function removeProject(projectID) {
    const project = projects.querySelector(`[data-project-id="${projectID}"]`);
    if (project){
        project.remove(); 
    }
}