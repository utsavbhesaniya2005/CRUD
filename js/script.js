let inputId = document.getElementById('inputId');
let name = document.getElementById('inputName'); 
let age = document.getElementById('inputAge'); 
let email = document.getElementById('inputEmail'); 
let password = document.getElementById('inputPassword'); 
let address1 = document.getElementById('inputAddress1'); 
let address2 = document.getElementById('inputAddress2'); 
let city = document.getElementById('inputCity'); 
let zip = document.getElementById('inputZip');
let show = document.getElementById('show');

let storage = JSON.parse(localStorage.getItem('users')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
// let isValid = false;// let isIndex = null;

const submitData = () => {

    event.preventDefault();

    let id = inputId.value;

    const addData = () => {
        return record = {
            id : id ? id : Math.floor(Math.random() * 1000),
            name : name.value,
            age : age.value,
            email : email.value,
            password : password.value,
            address1 : address1.value,
            address2 : address2.value,
            city : city.value,
            zip : zip.value
        }
    }

    if(/*isValid*/id){

        storage = storage.map((getId) => {
            if(getId.id == /*isIndex*/id){

                return {
                    id : /*isIndex*/id,
                    ...addData()
                };
            }else{

                return getId;
            }
        });

        // isValid = false;// isIndex = null;
        inputId.value = '';
    }else{

        addData();

        storage.push(record);
    }

    
    name.value = age.value = email.value = password.value = address1.value =address2.value = city.value = zip.value = '';
    
    localStorage.setItem("users", JSON.stringify(storage));

    viewData();
}


const handleEdit = (id) => {

    let editRec = storage.find((selectRec) =>
        selectRec.id == id
    );

    name.value = editRec.name,
    age.value = editRec.age,
    email.value = editRec.email,
    password.value = editRec.password,
    address1.value = editRec.address1,
    address2.value = editRec.address2,
    city.value = editRec.city,
    zip.value = editRec.zip

    // isValid = true;// isIndex = id;
    inputId.value = id;
    
    viewData();
}

const handleDelete = (id) => {

    storage = storage.filter((item) => item.id != id);
    localStorage.setItem("users", JSON.stringify(storage));
    viewData();
}   

const viewData = () => {

    show.innerHTML = '';

    storage.forEach((rec) => {
        show.innerHTML += `<td>${rec.id}</td><td>${rec.name}</td><td>${rec.age}</td><td>${rec.email}</td><td>${rec.password}</td><td>${rec.address1}</td><td>${rec.address2}</td><td>${rec.city}</td><td>${rec.zip}</td><td><button class='btn text-bg-primary' onclick='handleSelect(${rec.id})'}>Select</button><button class='btn text-bg-success' onclick='handleEdit(${rec.id})'}>Update</button><button class='btn text-bg-danger' onclick='handleDelete(${rec.id})'}>Delete</button></td>`;
    });
}

const countData = () => {
    document.getElementById('countData').innerHTML = cart.length;
}

const handleSelect = (id) => {
    let selectRec = storage.find((selectData) => (
        selectData.id == id
    ));

    let isData = cart.some((item) => item.id == id);

    if(!isData){
        cart.push(selectRec);
        localStorage.setItem('cart', JSON.stringify(cart));
    }else{
        alert("Data Cannot Be Same..");
    }

    viewCart();
    countData();
}

const quantity = (id, valueChange) => {
    cart = cart.map((data) => {
        if(data.id == id){
            let newQuantity = (data.quan || 1) + valueChange;
            if (newQuantity < 1) newQuantity = 1;

            return { ...data, quan: newQuantity };
        }else{
            return data;
        }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    viewCart();
}

const removeFromCart = (id) => {
    storage = storage.filter((item) => item.id != id);
    localStorage.setItem('cart', JSON.stringify(storage));
    countData();
    viewCart();
}

const viewCart = () => {

    cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart').innerHTML = '';

    cart.forEach((data) => {
        document.getElementById('cart').innerHTML += `
            <tr>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.age}</td>
                <td>${data.email}</td>
                <td>${data.password}</td>
                <td>${data.address1}</td>
                <td>${data.address2}</td>
                <td>${data.city}</td>
                <td>${data.zip}</td>
                <td><a href="#" class="btn btn-success me-2" onclick="return quantity(${data.Id}, 1)">+</a>${data.quan || 1}<a href="#" class="btn btn-danger ms-2" onclick="return quantity(${data.Id}, -1)">-</a></td>
                <td><button class='btn text-bg-danger' onclick='removeFromCart(${data.id})'>Remove</button></td>
            </tr>
        `;
    });
}

viewData();
viewCart();
countData();