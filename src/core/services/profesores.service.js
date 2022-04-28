import axios from "axios";

class profesoresService
{
    endpoint="api/v1/"
    getAllProfesores()
    {
        return axios.get('http://localhost:3000/profesores')
    }
}

export default new profesoresService()