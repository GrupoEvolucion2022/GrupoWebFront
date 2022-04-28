import axios from "axios";

class matriculasService
{
    getAllMatriculas()
    {
        return axios.get('http://localhost:3000/matriculas')
    }

    getById(id){
        return axios.get(`http://localhost:3000/matriculas/${id}`)
    }

    getByAlumnos_id(alumnos_id){
        return axios.get(`http://localhost:3000/matriculas/alumnos_id=${alumnos_id}`)
    }

    postMatricula(data) {
        return axios.post(`http://localhost:3000/matriculas`, data);
    }

    updateMatriculaById(id,data){
        return axios.put(`http://localhost:3000/matriculas/${id}`,data);
    }
}

export default new matriculasService()