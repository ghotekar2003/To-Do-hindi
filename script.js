const addUserBtn = document.getElementById('adduser');
const btnText = addUserBtn.innerText;
const usernameTextField = document.getElementById('username');
const recordsDisplay = document.getElementById('records');
let userArray = [];
let edit_id = null ;

let objStr = localStorage.getItem('user');
if(objStr!= null){

    userArray = JSON.parse(objStr);
}
// console.log(userArray);


DisplayInfo();
addUserBtn.onclick=()=>{
    const name = usernameTextField.value ;
    if(edit_id!=null){
        //edit
        userArray.splice(edit_id,1,{'name' : name})
        edit_id = null;
    }
    else{
        //insert
        userArray.push({'name' : name});
    }
   
    console.log(userArray);
    SaveInfo(userArray);
    usernameTextField.value = ' ';
  
    addUserBtn.innerText = btnText;
}


function SaveInfo(userArray){
    let str = JSON.stringify(userArray);
    localStorage.setItem('user', str);
    DisplayInfo();
}

function DisplayInfo(){
    let statement = ' ' ;
    userArray.forEach((user,i) =>{
        statement += ` <tr>
        <th scope="row">${i+1}</th>
        <td>${user.name}</td>
        <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo{${i}}'></i> <i class="btn btn-danger text-white fa fa-trash-o" onclick='DeleteInfo{${i}}'></i></td>
      </tr>`;
    });
    recordsDisplay.innerHTML = statement;

}

function EditInfo(id){
edit_id = id ;
usernameTextField.value = userArray[id].name;         
addUserBtn.innerText = 'Save Changes';

}

function DeleteInfo(id){
userArray.splice(id,1);
SaveInfo(userArray);

}