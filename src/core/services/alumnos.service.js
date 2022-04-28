import axios from "axios";

class alumnosService
{
    endpoint="api/v1/"
    getAllAlumnos()
    {
        return axios.get('http://localhost:3000/alumnos')
    }
    getAlumnosById(id)
    {
        return axios.get(`http://localhost:3000/alumnos/${id}`)
    }
}

export default new alumnosService()