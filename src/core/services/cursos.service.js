//import http from "./http-common"
import axios from "axios";

class cursosService
{
    endpoint="api/v1/"
    getAllCursos()
    {
        return axios.get('http://localhost:3000/cursos')
    }

    getCursosDisponibles(alumnos_id)
    {
        return axios.get(`http://localhost:3000/cursos?alumnos_id!=${alumnos_id}`)
    }
}

export default new cursosService()