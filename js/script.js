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
let selectShow = document.getElementById('cart');

const Storageget = (getData) => JSON.parse(localStorage.getItem(getData)) || [];
let storage = Storageget('users');
let cart = Storageget('cart');
// let isValid = false;// let isIndex = null;

const submitData = () => {
    event.preventDefault();

    const inputIdget = inputId.value || Math.floor(Math.random() * 1000);
    const dataObj = {Id : inputIdget, Name : name.value, Age : age.value, Email : email.value, Password : password.value, Address1 : address1.value, Address2 : address2.value, City : city.value, Zip : zip.value}
    storage = inputId.value ? storage.map((data) => data.Id == inputIdget ? dataObj : data) : [...storage,dataObj];
    localStorage.setItem("users",JSON.stringify(storage))
    console.log("data object",storage);
    viewData();
    
    name.value = age.value = email.value = password.value = address1.value =address2.value = city.value = zip.value = '';
}


const handleEdit = (id) => {
    let EditData = storage.find((data) => data.Id == id)

    if(EditData){
        ({Id : inputId.value, Name : name.value, Age : age.value, Email : email.value, Password : password.value, Address1 : address1.value, Address2 : address2.value, City : city.value, Zip : zip.value} = EditData)
    }else{
        alert("data not edit");
    }
    viewData();
}

const handleDelete = (id) => (localStorage.setItem("users",JSON.stringify(storage = storage.filter((item) => item.Id != id))),viewData())   

const viewData = () => {
    show.innerHTML = storage.map((data) =>
        `<tr><td>${data.Id}</td>
        <td>${data.Name}</td>
        <td>${data.Age}</td>
        <td>${data.Email}</td>
        <td>${data.Password}</td>
        <td>${data.Address1}</td>
        <td>${data.Address2}</td>
        <td>${data.City}</td>
        <td>${data.Zip}</td>
        <td><button class='btn text-bg-primary' onclick='handleSelect(${data.Id})'}>Select</button>
        <button class='btn text-bg-success' onclick='handleEdit(${data.Id})'}>Update</button>
        <button class='btn text-bg-danger' onclick='handleDelete(${data.Id})'}>Delete</button></td></tr>`
    ).join('');
}

const countData = () => (document.getElementById('countData').innerHTML = cart.length);
const tPrice = () => (cart.reduce((total, item) => total + (item.Zip || 0) * (item.quan || 1), 0));

const handleSelect = (id) => {
    let selectRec = storage.find((selectData) => selectData.Id == id);
    if(selectRec && !cart.some((item) => item.Id == id)){
        cart.push(selectRec);
        localStorage.setItem('cart', JSON.stringify(cart));
    }else{
        alert("Data Cannot Be Same..");
    }
    viewCart(),countData();
}

const quantity = (id, valueChange) => {
    cart = cart.map((data) => {
        if(data.Id == id){
            return { ...data, quan: Math.max((data.quan || 1) + valueChange, 1) };
        }else{
            return data;
        }
    });
    localStorage.setItem('cart', JSON.stringify(cart)),viewCart();
}

const removeFromCart = (id) => ( localStorage.setItem("cart",JSON.stringify(cart = cart.filter((item) => item.Id != id))),viewCart(),countData())

const viewCart = () => {
    selectShow.innerHTML = cart.map((data) => 
        `<tr>
                <td>${data.Id}</td>
                <td>${data.Name}</td>
                <td>${data.Age}</td>
                <td>${data.Email}</td>
                <td>${data.Password}</td>
                <td>${data.Address1}</td>
                <td>${data.Address2}</td>
                <td>${data.City}</td>
                <td>${data.Zip}</td>
                <td><a href="#" class="btn btn-success me-2" onclick="return quantity(${data.Id}, 1)">+</a>${data.quan || 1}<a href="#" class="btn btn-danger ms-2" onclick="return quantity(${data.Id},-1)">-</a></td>
                <td><button class='btn text-bg-danger' onclick='removeFromCart(${data.Id})'>Remove</button></td>
            </tr>`
        ).join('');
        const totalprice = tPrice();
        document.getElementById("total-price").innerHTML = `Total Price :- ₹ ${totalprice.toFixed(2)}`;
}
viewData(),viewCart(),countData();