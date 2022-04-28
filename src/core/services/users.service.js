import http from "./http-common"
import axios from 'axios';
import authHeader from "../services/authHeader"
const API_URL = 'https://grupoevobackend20220427191245.azurewebsites.net/api/v1/users';


class UsersService {
    storageUser = -1;


    userService(){
       this.storageUser = JSON.parse(localStorage.getItem('user')).id
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem('user')).id
    }

    currentUser=0;
    test=0;

    getAll() {
        console.log(authHeader())
        return axios.get(API_URL);
    }
    getAllUsers(){
        return http.get(API_URL);
    }

    async getUsersById(index){
        return await http.get(`https://grupoevobackend20220427191245.azurewebsites.net/api/v1/users/${index}`)
    }

    async updateUserById(id,data){
        return await http.put(`https://grupoevobackend20220427191245.azurewebsites.net/api/v1/users/${id}`,data);
    }
    login(user, password){
        return http.get(`${API_URL}?user=${user}&&password=${password}`);
    }
    postUser(data){
        return axios.post(`https://grupoevobackend20220427191245.azurewebsites.net/api/v1/users/auth/sign-up`, data)
    }
    saveIdActual(data)
    {
        this.currentUser=data
        this.test=data
    }

    getIDActual()
    {
         console.log(this.test)
    }
}

export default new UsersService();
