let i = 0
let v = 0
let divlist = null
let fNameTag = null
let lNameTag = null
let listele = null
let editbutton = null
let delbutton = null
let checkBox = null
let boxes = null
let divs = null
let boxes2 = document.getElementsByClassName("chk")
let checkBoxes = document.getElementsByClassName("chk");


/*
used to send created names to node to create or update in the data base
*/
function sendData(idNum, firstName, lastName) {
    let user = {
        id: idNum,
        fName: firstName,
        lName: lastName
    }
    let body = JSON.stringify(user)
    try {
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data)
            })
    } catch (err) {
        console.error('Error:', err)
    }
}

/*
used to send the id number to the database to delete the endtry with the matching id
*/
function deleteData(idNum) {
    let user = {
        id: idNum,
    }

    let body = JSON.stringify(user)
    try {
        fetch('/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(response => console.log('response is ',response.json()))
            .then(data => {
                console.log('Success:', data)
            })
    } catch (err) {
        console.error('Error:', err)
    }
}

// when a box is unchecked it unchecks the box and updates the count of selected boxes
const unCheck = (idNum) => {
    if ($("#cB" + idNum) && $("#checkbx").is(':checked')) {
        $("#checkbx").prop('checked', false);
    }
    showCurrentlySelected();
}

// when the check all box is selected it goes through each of the checkboxes for entries and then checks them and then updates the count of checked boxes
const checkAll = () => {
    checkBoxes = document.getElementsByClassName("chk");
    for (let item in checkBoxes) {
        checkBoxes[item].checked = $('#checkbx').is(':checked') ? true : false;
    }
    showCurrentlySelected()
}

//updates the count of currently checked boxes on the page
const showCurrentlySelected = () => {
    let checkedRows = 0;
    for (let item in checkBoxes) {
        if (checkBoxes[item].checked == true && typeof (checkBoxes[item]) == 'object') {
            checkedRows++;
        }
    }
    $("#totalselec").html(`Total ${yt} Selected Rows`);
}

// creates the elements and buttons for each addtional name that is added to the list and returns the id number for the created name
const addElement = (idNum, firstName, lastName) => {
    let m;
    m = idNum
    if (!num) {
        i++
        m = i
    }

    const fNames = $(".innamef");
    const lNames = $(".innamel");
    const ids = $(".inid")



    if (fNames.length > 0) {
        for (let z = 0; z < ids.length; z++) {
            if (m == ids[z].innerHTML) {
                m++
            }
            for (let y = 0; y < fNames.length; y++) {
                if (l == lNames[y].innerHTML && f == fNames[z].innerHTML) {
                    return
                }
            }

        }
    }

    divlist2 = document.createElement("div")
    divlist2.setAttribute("id", "div21")
    divlist2.setAttribute("class", "divhold")

    divlist = document.createElement("div")
    divlist.setAttribute("id", "div" + m)
    divlist.setAttribute("class", "div")

    checkBox = document.createElement('input')
    checkBox.setAttribute("class", "chk")
    checkBox.setAttribute("id", "cB" + m)
    checkBox.type = "checkbox"

    idTag = document.createElement("p")
    idTag.setAttribute("id", "id" + m)
    idTag.setAttribute("class", "inid")
    idTag.innerHTML = m

    fNameTag = document.createElement("p")
    fNameTag.setAttribute("id", "fName" + m)
    fNameTag.setAttribute("class", "innamef")
    fNameTag.innerHTML = firstName

    lNameTag = document.createElement("p")
    lNameTag.setAttribute("id", "lName" + m)
    lNameTag.setAttribute("class", "innamel")
    lNameTag.innerHTML = lastName

    listele = document.getElementById("list")

    editbutton = document.createElement("button")
    editbutton.setAttribute("class", "fNameButton")
    editbutton.textContent = "Edit";
    editbutton.id = ("edit" + m)

    delbutton = document.createElement("button")
    delbutton.setAttribute("class", "lNameButton")
    delbutton.textContent = "Delete";
    delbutton.id = ("del" + m)

    document.getElementById("fname").value = ""
    document.getElementById("lname").value = ""

    divlist2.appendChild(checkBox)
    divlist.appendChild(fNameTag)
    divlist.appendChild(lNameTag)
    divlist.appendChild(editbutton)
    divlist.appendChild(delbutton)
    divlist.appendChild(idTag)
    divlist2.appendChild(divlist)
    listele.appendChild(divlist2)

    document.getElementById("cB" + m).addEventListener("click", unCheck.bind(null, m))
    document.getElementById("edit" + m).addEventListener("click", editpush.bind(null, m))
    document.getElementById("del" + m).addEventListener("click", del.bind(null, m))
    
    return (m)

}

// gets the currently created names and ids from the mongoDB and creates them on the webcite
const getData = () => {
    fetch('/names', {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
    .then(response => response.json())
    .then(data => {
        for (item in data) {
            console.log(item)
            addElement(data[item].id, data[item].fName,data[item].lName)
        }
    })
}

getData()

// when the user has finished updating the first and last name it updates the row on the webpage and updates the row in the database
const editFinish = () => {
    $("#fName" + v).html($("#fname").val());
    $("#lName" + v).html($("#lname").val());
    $("#edit" + v).css("visibility", "visible");
    $("#del" + v).css("visibility", "visible");
    $("#confirmEdit").css("visibility", "hidden");
    $("#Add").css("visibility", "visible");
    $("#fname").val('');
    $("#lname").val('');
    $("#checkdel").css("visibility", "visible");
    $("#checkbx").css("visibility", "visible");
    checkBoxes = $(".chk");
    for (let item in checkBoxes) {
        if (item < 10) {
            checkBoxes[item].style.visibility = "visible";
        }
    }
    sendData(v, fNameChange, lNameChange)
}

// sends the first and last name of the row that was selected to the edit feilds and disables buttons that would cause errors
const editpush = (buttonIdNum) => {
    v = buttonIdNum;
    $("#fname").val($("#fName" + v).html());
    $("#lname").val($("#lName" + v).html());
    let fButtons = $(".fNameButton");
    let lButtons = $(".lNameButton");
    for (item in fButtons) {
        /* turn into one and condition */
        if (item != "length" && item != "item" && item != "namedItem" && item < 10) {
            fButtons[item].style.visibility = "visible";
            lButtons[item].style.visibility = "visible";
        }
    }
    $("#checkdel").css('visibility', 'hidden');
    $("#checkbx").css('visibility', 'hidden');
    $("#edit" + v).css('visibility', 'hidden');
    $("#del" + v).css('visibility', 'hidden');
    $("#confirmEdit").css("visibility", "visible");
    $("#Add").css('visibility', 'hidden');
    $("#cB" + v).css('visibility', 'hidden');
}

// deletes the row at the inputed id number and removes it from the database
const del = (idNum) => {
    document.getElementById("div" + idNum).remove()
    document.getElementById("cB" + idNum).remove()
    deleteData(idNum)
}

// adds the created buttons to the webpage and adds the items to the database
const add = () => {
    fname = document.getElementById("fname").value
    lname = document.getElementById("lname").value
    let idnum = addElement(null, fname, lname)
    sendData(idnum, fname, lname)

}

// renders ten lines of test data to the database and the webpage
const render = () => {
    for (let u = 0; u < 10; u++) {
        addElement(u, "test", "test" + u)
        sendData(u, "test", "test" + u)
    }
    getData()
    if (document.getElementById("checkbx").checked == true) {
        checkAll()
    }
}

//removes all checked lines from the database and the webpage. it runs multiple times to make sure that all items are deleted properly
const removechecked = () => {
    let ids = document.getElementsByClassName("inid");
    checkBoxes = document.getElementsByClassName("chk");
    document.getElementById("checkbx").checked = false;

    for (item in ids) {

        if (!(item == 'length' || item == 'item' || item == 'namedItem')) {
            if (checkBoxes[item].checked) {
                del(ids[item].innerHTML)
            }
        }

    }
    ids = document.getElementsByClassName("inid");
    checkBoxes = document.getElementsByClassName("chk");
    for (item in ids) {

        if (!(item == 'length' || item == 'item' || item == 'namedItem')) {
            if (checkBoxes[item].checked) {
                del(ids[item].innerHTML)
            }
        }

    }
    ids = document.getElementsByClassName("inid");
    checkBoxes = document.getElementsByClassName("chk");
    for (item in ids) {

        if (!(item == 'length' || item == 'item' || item == 'namedItem')) {
            if (checkBoxes[item].checked) {
                del(ids[item].innerHTML)
            }
        }

    }
    ids = document.getElementsByClassName("inid");
    checkBoxes = document.getElementsByClassName("chk");
    for (item in ids) {

        if (!(item == 'length' || item == 'item' || item == 'namedItem')) {
            if (checkBoxes[item].checked) {
                del(ids[item].innerHTML)
            }
        }

    }
    checkAll()
}

document.getElementById("checkbx").addEventListener("click", checkAll)
document.getElementById("checkdel").addEventListener("click", removechecked)
document.getElementById("render").addEventListener("click", render)
document.getElementById("confirmEdit").addEventListener("click", editFinish.bind(null, v))
document.getElementById("Add").addEventListener("click", add)