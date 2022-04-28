import axios from "axios";

export default axios.create({
    baseURL: "https://grupoevobackend20220427191245.azurewebsites.net",
    headers:{Authorization: localStorage.getItem('token')}
});