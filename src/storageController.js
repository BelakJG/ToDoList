const projectsKey = "myProjects";

export function initStorage() {
    if (localStorage.getItem(projectsKey) === null) {
        localStorage.setItem(projectsKey, JSON.stringify([{"id":"Example Project",
                                                            "title":"This is my Title",
                                                            "description":"Give me a description",
                                                            "dueDate":"2026-04-20",
                                                            "priority":"medium",
                                                            "completed":"false",
                                                            "steps[]":["Step 1","Second Step","Three"]}]));
    }
}

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
    dataObject["completed"] = data.get("completed");
    dataObject["steps[]"] = data.getAll("steps[]");
    
    storedProjects.push(dataObject);
    localStorage.setItem(projectsKey, JSON.stringify(storedProjects));
}

export function getProjectsData() {
    if (localStorage.getItem(projectsKey) === null) {
        localStorage.setItem(projectsKey, JSON.stringify([]));
    }
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

export function updateValueInStorage(id, key, value) {
    let index = -1;
    const storedProjects = JSON.parse(localStorage.getItem(projectsKey));
    for (let i = 0; i < storedProjects.length; i++) {
        if (storedProjects[i]["id"] == id) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        storedProjects[index][key] = value;
        localStorage.setItem(projectsKey, JSON.stringify(storedProjects));
    }
}