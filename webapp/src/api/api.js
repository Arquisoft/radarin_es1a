
//REACT_APP_API_URI is an enviroment variable defined in the file .env.development or .env.production
export async function addUser(username,email){
<<<<<<< HEAD
    const apiEndPoint= process.env.REACT_APP_API_URI || "http://localhost:5000/api"
    let response = await fetch(apiEndPoint+"/users/add", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({"name":username, "email":email})
      })
    return await response.json()
}

export async function getUsers(){
    const apiEndPoint= process.env.REACT_APP_API_URI || "http://localhost:5000/api"
    console.log(apiEndPoint)
    let response = await fetch(apiEndPoint+"/users/list")
    return await response.json()
=======
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
    let response = await fetch(apiEndPoint+'/users/add', {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'name':username, 'email':email})
      });
    return await response.json();
}

export async function getUsers(){
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
    console.log(apiEndPoint);
    let response = await fetch(apiEndPoint+'/users/list');
    return await response.json();
>>>>>>> 61eb7bd77943700f37dea1fef6b5ec6a8d5c4914
}