const projects = document.querySelector("#projects");

class Project {
    _projectID = crypto.randomUUID();
    _title;
    _description;
    _dueDate;
    _priority;
    _steps;
    _completed = false;

    constructor(projectData) {
        this._title = projectData.get("title");
        this._description = projectData.get("description");
        this._dueDate = projectData.get("dueDate");
        this._priority = projectData.get("priority");
        this._steps = projectData.getAll("steps[]");
    }

    get projectID() {
        return this._projectID;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get dueDate() {
        return this._dueDate;
    }

    get priority() {
        return this._priority;
    }

    get steps() {
        return this._steps;
    }

    get completed() {
        return this._completed;
    }
}

export function CreateProject(projectData) {
    const project = new Project(projectData);
    displayProject(project);
}

function displayProject(project) {
    const projectDetails = document.createElement("details");
    projectDetails.open = true;
    projectDetails.classList.add("project");
    projectDetails.dataset.projectId = project.projectID;

    const summary = document.createElement("h3");
    summary.textContent = project.title;
    projectDetails.appendChild(summary);

    const description = document.createElement("p");
    description.textContent = project.description;
    projectDetails.appendChild(description);

    const due = document.createElement("p");
    const dateArray = project.dueDate.split("-");
    const year = dateArray[0];
    const month = dateArray[1] - 1;
    const day = dateArray[2];
    const date = new Date(year, month, day);
    const timeDiff = ((date - new Date()) / (1000 * 60 * 60 * 24)).toFixed(2);
    due.textContent = `Due on ${date.toLocaleDateString()}, in ${timeDiff} Days`;
    projectDetails.appendChild(due);
    projectDetails.dataset.daysTillDue = timeDiff;

    const list = document.createElement("ul");
    for (const step of project.steps) {
        if (!step.trim()) {
            continue;
        }

        const item = document.createElement("li");
        item.textContent = step;
        list.appendChild(item);
    }
    projectDetails.appendChild(list);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete Project";
    deleteBtn.addEventListener("click", () => {
        removeProject(project.projectID);
    });
    projectDetails.appendChild(deleteBtn);

    const priorityList = projects.querySelector(`#${project.priority}`);
    insertProject(priorityList, projectDetails);
}

function insertProject(priolist, project) {
    let next = priolist.firstElementChild;
    next = next.nextElementSibling;
    while (next) {
        let days = next.dataset.daysTillDue;
        if (days >= project.dataset.daysTillDue) {
            next.before(project);
            break;
        } else {
            next = next.nextElementSibling;
        }
    }
    if (!next) {
        console.log("end of list");
        priolist.appendChild(project);
    }
}

function removeProject(projectID) {
    const project = projects.querySelector(`[data-project-id="${projectID}"]`);
    if (project){
        if (confirm("Delete Project?")) {
            project.remove();
        }
    }
}