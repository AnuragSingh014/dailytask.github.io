//if not existing, creating an object and adding new information to the object
function getAndUpdate() {
    title = document.getElementById('title').value;
    description = document.getElementById('description').value;
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push([title, description]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([title, description]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    update();
}



function update() {
    if (localStorage.getItem('itemsJson') == null) {
        var itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);             // converting json object to string
    }
    

    let tableBody = document.getElementById("tableBody");
    let str = "";
    // iterating through the object and submiting its values in table
    itemJsonArray.forEach((element, index) => {
        str += `
            <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td> 
            <td><button class="button" onclick="deleted(${index})">Delete</button></td> 
            </tr>`;
    });
    tableBody.innerHTML = str;
}


add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();


function deleted(itemIndex) {
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}


function clearStorage() {
    if (confirm("you want to kill all your task")) {
        localStorage.clear();
        update()
    }
}