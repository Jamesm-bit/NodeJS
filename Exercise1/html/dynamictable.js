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



function sendData(i, f, l) {
    const XHR = new XMLHttpRequest();
    XHR.addEventListener("load", (event) => {
        alert('Sent Correctly')
    })
    XHR.addEventListener('error', (event) => {
        alert('Something went Wrong')
    })

    let user = {
        id: i,
        fName: f,
        lName: l
    }

    let body = JSON.stringify(user)
    XHR.open('POST', "/", true)
    XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    XHR.send(body)
}

function deleteData(i) {
    const DXHR = new XMLHttpRequest();
    DXHR.addEventListener("load", (event) => {
        alert('Sent Correctly')
    })
    DXHR.addEventListener('error', (event) => {
        alert('Something went Wrong')
    })

    let user = {
        id: i,
    }

    let body = JSON.stringify(user)
    DXHR.open('POST', "/delete", true)
    DXHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    DXHR.send(body)
}

function uncheck(i) {
    if (document.getElementById("cB" + i)) {
        if (document.getElementById("checkbx").checked) {
            document.getElementById("checkbx").checked = false
        }
    }
    showcurrselec
}

function checkall() {
    if (checkbx.checked) {
        let boxes = document.getElementsByClassName("chk")
        for (let x = 0; x < boxes.length; x++) {
            let box = boxes[x]
            box.checked = true
        }
        x = 0
    } else {
        let boxes = document.getElementsByClassName("chk")
        for (let x = 0; x < boxes.length; x++) {
            let box = boxes[x]
            box.checked = false
        }
        x = 0
    }
    document.getElementById("totalselec").innerHTML = showcurrselec()

}

function showcurrselec() {
    let yt = 0
    for (p = 0; p < boxes2.length; p++) {
        if (boxes2[p].checked == true) {
            yt++
        }
    }
    document.getElementById("totalselec").innerHTML = `Total ${yt} Rows`
}

function addelement(num, f, l) {
    let m;
    m = num
    if (!num) {
        i++
        m = i
    }

    let fnames = document.getElementsByClassName("innamef")
    let lnames = document.getElementsByClassName("innamel")
    let ids = document.getElementsByClassName("inid")



    if (fnames.length > 0) {
        for (let z = 0; z < ids.length; z++) {
            if (m == ids[z].innerHTML) {
                m++
            }
            for (let y = 0; y < fnames.length; y++) {
                if (l == lnames[y].innerHTML && f == fnames[z].innerHTML) {
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
    fNameTag.innerHTML = f

    lNameTag = document.createElement("p")
    lNameTag.setAttribute("id", "lName" + m)
    lNameTag.setAttribute("class", "innamel")
    lNameTag.innerHTML = l

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

    document.getElementById("cB" + m).addEventListener("click", uncheck.bind(null, m))
    document.getElementById("edit" + m).addEventListener("click", editpush.bind(null, m))
    document.getElementById("del" + m).addEventListener("click", del.bind(null, m))
    return (m)

}

function getData() {
    let nameData;
    $.get("/names", (data) => {
        nameData = data;
        for (item in nameData) {
            addelement(nameData[item].id, nameData[item].fName, nameData[item].lName)
        }
    })
}

getData()

function editFinish() {
    

    let fNameChange = document.getElementById("fname").value
    let lNameChange = document.getElementById("lname").value
    console.log(v)
    console.log(fNameChange)
    console.log(lNameChange)
    let previousFName = document.getElementById("fName" + v)
    previousFName.innerHTML = fNameChange

    let previousLName = document.getElementById("lName" + v)
    previousLName.innerHTML = lNameChange
    document.getElementById("edit" + v).style.visibility = "visible"
    document.getElementById("del" + v).style.visibility = "visible"
    document.getElementById("confirmEdit").style.visibility = "hidden"
    document.getElementById("Add").style.visibility = "visible"
    document.getElementById("fname").value = ""
    document.getElementById("lname").value = ""
    document.getElementById("checkdel").style.visibility = "visible"
    document.getElementById("checkbx").style.visibility = "visible"
    boxes = document.getElementsByClassName("chk")
    for (let x = 0; x < boxes.length; x++) {
        let boxinv = boxes[x]
        boxinv.style.visibility = "visible"
    }
    sendData(v,fNameChange,lNameChange)
}

function editpush(j) {
    console.log(j)
    let fNameChange = document.getElementById("fName" + j).innerHTML
    let lNameChange = document.getElementById("lName" + j).innerHTML

    document.getElementById("fname").value = fNameChange
    document.getElementById("lname").value = lNameChange

    let fbuttons = document.getElementsByClassName("fNameButton")
    let lbuttons = document.getElementsByClassName("lNameButton")

    for (item in fbuttons) {
        if (item != "length" && item != "item" && item != "namedItem") {
            fbuttons[item].style.visibility = "visible"
            lbuttons[item].style.visibility = "visible"
        }
    }

    v = j
    document.getElementById("checkdel").style.visibility = "hidden"
    document.getElementById("checkbx").style.visibility = "hidden"
    document.getElementById("edit" + v).style.visibility = "hidden"
    document.getElementById("del" + v).style.visibility = "hidden"
    document.getElementById("confirmEdit").style.visibility = "visible"
    document.getElementById("Add").style.visibility = "hidden"
    boxes = document.getElementsByClassName("chk")
    for (let x = 0; x < boxes.length; x++) {
        let boxinv = boxes[x]
        boxinv.style.visibility = "hidden"
    }

}

function del(z) {
    console.log(z)
    /*
    document.getElementById("fName"+i).remove()
    document.getElementById("lname"+i).remove()
    document.getElementById("edit"+i).remove()
    document.getElementById("del"+i).remove()
    */
    document.getElementById("div" + z).remove()
    document.getElementById("cB" + z).remove()
    deleteData(z)
}

function add() {
    fname = document.getElementById("fname").value
    lname = document.getElementById("lname").value
    let idnum = addelement(null, fname, lname)
    sendData(idnum, fname, lname)
}

function render() {
    for (let u = 0; u < 10; u++) {
        addelement("test", "test" + u)
    }

    if (document.getElementById("checkbx").checked == true) {
        checkall()
    }
}
function removechecked() {

    boxes = document.getElementsByClassName("chk")
    divs = document.getElementsByClassName("div")
    document.getElementById("checkbx").checked = false
    for (let x = 0; x < boxes.length; x++) {
        console.log(x)
        let box = boxes[x]
        let div = divs[x]

        if (box.checked) {
            box.parentNode.removeChild(box)
            div.parentNode.removeChild(div)
            x = 0
        }
    }
    for (x = 0; x < boxes.length; x++) {
        console.log(x)
        let box = boxes[x]
        let div = divs[x]

        if (box.checked) {
            box.parentNode.removeChild(box)
            div.parentNode.removeChild(div)
            x = 0
        }
    }
}



document.getElementById("checkbx").addEventListener("click", checkall)
document.getElementById("checkdel").addEventListener("click", removechecked)
document.getElementById("render").addEventListener("click", render)
document.getElementById("confirmEdit").addEventListener("click", editFinish.bind(null, v))
document.getElementById("Add").addEventListener("click", add)