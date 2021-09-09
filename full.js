const userArea = document.getElementById('userArea');
const formArea = document.getElementById('formArea');

function renderUser (users) {
    const userDiv = document.createElement("div");
    userDiv.id = `user: ${users.id}`;
  
    const userName = document.createElement("p");
    userName.textContent = users.name;
    
    const userEmail = document.createElement("p");
    userEmail.textContent = users.email;
    
    let hr = document.createElement('hr')

    userDiv.append(userName, userEmail, hr);
    userArea.appendChild(userDiv);
}


function submitData(e) {
    e.preventDefault();
    const inputOfForm = e.target;
    const name = inputOfForm.querySelector("#name").value;
    const email = inputOfForm.querySelector("#email").value;
  
    if (name !== "" && email !== "") {
      const info = {
          name: name,
          email: email
        };

        const configObj = {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             Accept: "application/json",
           },
           body: JSON.stringify(info),
        };
        
     fetch("http://localhost:3000/users", configObj)
        .then((resp) => resp.json())
        .then(data => renderUser(data));
       formArea.reset(); 
    } else {
          alert("Input Required");
        }
}


function getData () {
    fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(user => {
        user.forEach(renderUser);
    })
    .catch(err => alert(err))
}


function init() {
    getData();
    formArea.addEventListener('submit', submitData);
}
init();




