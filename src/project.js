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

    const due = document.createElement("p");
    const date = new Date(projectData.get("dueDate"));
    const timeDiff = Math.floor((date - new Date()) / (1000 * 60 * 60 * 24));
    due.textContent = `Due on ${date.toLocaleDateString()}, in ${timeDiff} Days`;
    project.appendChild(due);

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

    const priorityList = projects.querySelector(`#${projectData.get("priority")}`);
    priorityList.appendChild(project);
}

function removeProject(projectID) {
    const project = projects.querySelector(`[data-project-id="${projectID}"]`);
    if (project){
        if (confirm("Delete Project?")) {
            project.remove();
        }
    }
}