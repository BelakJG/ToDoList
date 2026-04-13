const projectsKey = "myProjects";

export function storeProjectData(data) {
    if (localStorage.getItem(projectsKey) === null) {
        localStorage.setItem(projectsKey, JSON.stringify([]));
    }

    const storedProjects = JSON.parse(localStorage.getItem(projectsKey));
    
    const dataObject = {};
    dataObject["id"] = data.get("id");
    dataObject["title"] = data.get("title");
    dataObject["description"] = data.get("description");
    dataObject["dueDate"] = data.get("dueDate");
    dataObject["priority"] = data.get("priority");
    dataObject["steps"] = data.getAll("steps[]");
    
    storedProjects.push(dataObject);
    localStorage.setItem(projectsKey, JSON.stringify(storedProjects));
}

export function getProjectsData() {
    const storedProjects = JSON.parse(localStorage.getItem(projectsKey)) || [];
    return storedProjects;
}

export function removeProjectFromStorage(id) {
    const storedProjects = JSON.parse(localStorage.getItem(projectsKey));
    for (let i = 0; i < storedProjects.length; i++) {
        if (storedProjects[i]["id"] == id) {
            storedProjects.splice(i, 1);
            break;
        }
    }
    localStorage.setItem(projectsKey, JSON.stringify(storedProjects));
}