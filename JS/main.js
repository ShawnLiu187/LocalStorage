const key = "liu00415";
let contacts = [];

let init = function () {
    if (localStorage.getItem(key)) {
        contacts = JSON.parse(localStorage.getItem(key));
    } else {
        contacts = starter;
        let str = JSON.stringify(starter);
        localStorage.setItem(key, str);
    }
    displayResults();

    document.querySelector(".fab").addEventListener("click", showForm);
    document.getElementById("btnCancel").addEventListener("click", hideForm);
    document.getElementById("btnSave").addEventListener("click", newContact);
    document.getElementById("btnEdit").addEventListener("click", newEditContact);
}

let showForm = function () {
    document.querySelector(".overlay").classList.remove("not");
    document.querySelector(".formContainer").classList.remove("not");
}

let showEditForm = function () {
    document.querySelector(".overlay").classList.remove("not");
    document.querySelector(".editformContainer").classList.remove("not");
}

let hideForm = function () {
    document.querySelector(".overlay").classList.add("not");
    document.querySelector(".formContainer").classList.add("not");
    document.querySelector(".editformContainer").classList.add("not");
    document.querySelector(".contactform").reset();
}

let displayResults = function () {
    let ul = document.querySelector(".contacts");
    let df = document.createDocumentFragment();

    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild)
    };

    if (function () {
            return 'content' in document.createElement('template');
        }) {
        console.log('template is working');
        let temp = document.getElementById('myTemplate');
        let content = temp.content;
        console.log(content);


        contacts.forEach(function (item, index) {
            let unit = content.cloneNode(true);

            let fullname = unit.querySelector('h3');
            let email = unit.querySelector('.email');
            let phoneNum = unit.querySelector('.phone');
            let spanX = unit.querySelector('span');
            let edit = unit.querySelector('.edit');

            fullname.innerHTML = item.fullname;
            email.innerHTML = item.email;
            phoneNum.innerHTML = item.phone;
            spanX.addEventListener("click", deleteItem);
            spanX.setAttribute("data-email", item.email);
            edit.addEventListener("click", editItem);
            edit.setAttribute("data-email", item.email);

            df.appendChild(unit);
        })
    } else {
        console.log('content is not working')
    }
    ul.appendChild(df);
}

let newEditContact = function(ev){
    ev.preventDefault();
    console.log("newEditContact is working!");
    let fullname = document.getElementById('editFullName').value.trim();
    let email = document.getElementById('editinput-email').value.trim();
    let phone = document.getElementById('editinput-phone').value.trim();
    let i = null;
    
    contacts.forEach(function(item, index){
        if(item.email == email){i = index;}
    })
    
    
    console.log("This is the INDEX!", i)
    
    contacts[i].fullname = fullname;
    contacts[i].phone = phone;
    
    localStorage.setItem(key, JSON.stringify(contacts));
    displayResults();
    
    hideForm();

    
}

let newContact = function (ev) {
    ev.preventDefault();
    console.log("newContact is working");
    let fullname = document.getElementById('fullName').value.trim();
    let email = document.getElementById('input-email').value.trim();
    let phone = document.getElementById('input-phone').value.trim();

    if (fullname && email && phone) {

        let emailList = [];

        contacts.forEach(contact => emailList.push(contact.email));

        console.log("Existing email list", emailList);



        let newItem = {
            fullname,
            email,
            phone
        };

        console.log(newItem, email);

        if (emailList.includes(email)) {
            alert("Cannot create new contact due to duplicate email!");
        } else {
            contacts.push(newItem);
        }

        localStorage.setItem(key, JSON.stringify(contacts));
        displayResults();
        hideForm();
    } else {
        alert("Please fill out the form!");
    }

}

let deleteItem = function (ev) {
    ev.preventDefault();
    let email = ev.target.getAttribute("data-email");
    contacts = contacts.filter(function (contact) {
        return contact.email != email;
    })
    localStorage.setItem(key, JSON.stringify(contacts));
    displayResults();
}

let editItem = function (ev) {
    ev.preventDefault();
    let email = ev.target.getAttribute("data-email");
    console.log(email);
    let editTarget = contacts.filter(function (contact) {
        return contact.email == email;
    });
    console.log(editTarget);

    showEditForm();

    document.getElementById('editFullName').value = editTarget[0].fullname;
    document.getElementById('editinput-email').value = editTarget[0].email;
    document.getElementById('editinput-phone').value = editTarget[0].phone;
}



document.addEventListener('DOMContentLoaded', init);
