import axios from 'axios';

const deviceIpAddress = ""
const url = `http://${deviceIpAddress}:80/php_server/api/`;

//---------------------------------------[ Task related endpoints]---------------------------------------
export async function getTasks() {
    const response = await axios.get(url + 'task/read.php');

    return response;
}

export async function createTask(data) {
    const response = await axios.post(url + 'task/create.php', JSON.stringify(data)); //parameters => name

    return response;
}

//TODO: investigate what happeing with the app caching data
export async function deleteTask(data) {
    const response = await axios.delete(url + 'task/delete.php', {
        headers: {
            'Content-Type':'application/json'
        },
        data: JSON.stringify(data)
    }); //parameters => id

    return response;
}

export async function updateTask(data) {
    const response = await axios.put(url + 'task/update.php', JSON.stringify(data)); //parameters => id and new name

    return response;
}


//---------------------------------------[ User related endpoints]---------------------------------------
export async function registerUser(data) {
    const response = await axios.post(url + 'user/register_user.php', JSON.stringify(data)); //parameters => firstname, lastname, email, password

    return response;
}

export async function loginUser(data) {
    const response = await axios.get(url + `user/get_user.php?email=${data.email}&password=${data.password}`); //parameters => email, password

    return response;
}

//Currently not working
export async function updateAvatar(data) {
    const response = await axios.put(url + 'user/update_avatar.php', JSON.stringify(data)); //parameters => id and new name

    return response;
}