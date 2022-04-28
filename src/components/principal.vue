<template>
  <div>
    <div>
      Alumno: JUAN ROSALES MARTINEZ
    </div>

    <div v-for="curso in cursos"
          :key="curso.id">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{curso.code}}</span>
        </v-card-title>
        <v-list-item>
          <v-btn  type="button" @click="matricular(curso.id)">Matricularse</v-btn>
        </v-list-item>
      </v-card>
    </div>

  </div>
</template>

<script>
import cursosService from "../core/services/cursos.service"
import matriculasService from "../core/services/matriculas.service";
import UsersService from "../core/services/users.service"
export default {

  name: "principal",
  data: () => ({
    cursos:[],
    maticulas:[]
  }),
  methods:{
    getMatriculas(){
      matriculasService.getByAlumnos_id(UsersService.currentUser).then(
        response=>{
          this.maticulas=response.data;
        }
      )
    },
    getCursos(){
      cursosService.getAllCursos().then(
          response =>{
            this.cursos = response.data;
          }
      )
    },
    matricular(curso_id){
      matriculasService.postMatricula({
        cursos_id: curso_id,
        alumnos_id: UsersService.currentUser,
        date: `"${(new Date()).getFullYear()}/${(new Date()).getMonth()+1}/${(new Date()).getDay()} ${(new Date()).getHours()}:${(new Date()).getMinutes()}"`
      })
    }

  },
  mounted () {
    this.getMatriculas();
    this.getCursos();
  }
}
</script>

<style scoped>

</style>