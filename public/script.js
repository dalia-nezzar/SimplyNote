function moveTask(event, id) {
    fetch("/moveTaskDone", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: event.target.name, id })
    }).then(response => response.json()).then(status => {
        // console.log(status);
        if (status === 1) {
            event.target.name = "done";
            event.target.checked = true;
        } else {
            event.target.name = "todo";
            event.target.checked = false;
        }
        window.location.href = "/";
    }).catch(err => console.log(err));
}

function deleteTask(id) {
    fetch("/deleteTask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
    }).then(response => response.json()).then(message => {
        // console.log(message);
        window.location.href="/";
    }).catch(err => console.log(err));
}
