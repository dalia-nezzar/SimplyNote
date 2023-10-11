function moveTask(event, id) {
    const { name } = event.target;
    fetch("http://localhost:8080/moveTaskDone", {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, id })
    }).then(response => response.json()).then(status => {
        // console.log(status);
        window.location.reload();
    }).catch(err => console.log(err));
}
function deleteTask(id) {
    fetch("http://localhost:8080/deleteTask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
    }).then(response => response.json()).then(message => {
        console.log(message);
        window.location.reload();
    }).catch(err => console.log(err));
}