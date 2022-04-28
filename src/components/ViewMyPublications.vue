<template >
  <v-app >

    <template >
      <v-btn
          color="primary"
          dark
          class="mb-2"
          @click="setDialog(true)"
      >
        New Publication
      </v-btn>
    </template>

    <!--Inicio Formulario de publicacion-->
    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">User Profile</span>
          </v-card-title>

          <div class="text-center">
            <v-menu
                open-on-hover
                top
                offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                  Chose your Pet
                </v-btn>
              </template>

              <div  v-for="pet in pets"
                    :key= pet.id>
              <v-list v-if='pet.isPublished!==true'>
                <v-list-item

                >
                  <v-list-item-title  type="button" @click="filFormPubication(pet)">{{ pet.name }}</v-list-item-title>
                </v-list-item>
              </v-list>

              </div>

            </v-menu>
          </div>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      label="type"
                      v-model="tipo"
                      disabled
                      required
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      label="attention"
                      v-model="attention"
                      disabled
                      hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      label="race*"
                      v-model="race"
                      hint="example of persistent helper text"
                      persistent-hint
                      disabled
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      label="age"
                      v-model="age"
                      disabled
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      label="urlToImage"
                      v-model="urlToImage"
                      disabled
                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                      label="comment"
                      v-model="comment"

                      required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="Close"
            >
              Close
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="Save"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!--Final Formulario de publicacion-->



    <br/>

    <v-responsive :aspect-ratio="16/9">

      <v-container class="myPublications"  >
        <v-row >
          <v-col
              v-for="publication in publications"
              :key="publication.id"
              cols="12"
              sm="6"
              md="4"
          >
            <div v-for="pet in pets" :key="pet.id">

              <v-card
                v-if="pet.id===publication.petId"
                class="mx-auto"
                max-width="344"
            >


                <v-img
                    :src="pet.urlToImage"
                    class="white--text align-end"
                    height="200"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                >
                  <v-card-title  v-text="pet.name"></v-card-title>
                </v-img>

              <v-card-subtitle>
                {{publication.comment}}
              </v-card-subtitle>

              <v-card-actions>
                <v-btn
                    color="orange lighten-2"
                    text
                    @click="editPublication(pet,publication)"
                >
                  Edit
                </v-btn>

                <v-btn
                    color="orange lighten-2"
                    text
                    @click="DeletePublication(publication.id)"
                >
                  Delete
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn
                    icon
                    @click=" showInfCard(pet.id)"
                >
                  <v-icon>{{ showAux==pet.id || (showAux==1&&pet.id==0) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="showAux==pet.id || (showAux==1&&pet.id==0)">
                  <v-divider></v-divider>


                  <v-card-text overline style="text-align:left" >
                    Name: {{pet.name}} <br/>
                    Type: {{pet.type}} <br/>
                    Required Attention: {{pet.attention}} <br/>
                    Race: {{pet.race}} <br/>
                    Age: {{pet.age}} <br/>
                    Image: {{pet.urlToImage}} <br/>
                    Is Adopted?: {{pet.isAdopted}}
                  </v-card-text>

                </div>
              </v-expand-transition>
            </v-card>

            </div>

          </v-col>
        </v-row>
      </v-container>


    </v-responsive>

  </v-app>

</template>

<script>
import PublicationsService from "../core/services/publications.service.js"
import UserService from "../core/services/users.service.js"
import PetsService from "../core/services/pets.service"

export default {
  name: "ViewMyPublications",
  data: () => ({
    show: -1,
    showAux: -1,
    editActivate: false,
    publications:[],
    currentPetId:-1,
    currentPublicationId:-1,
    tipo: '',
    name: '',
    attention: '',
    race: '',
    age: '',
    urlToImage: '',
    isAdopted: '',
    userId: '',
    comment: '',
    datetime: '00/00/00',
    pets:[],
    truevalue: true,
    _id: 0,
    dialog: false,
  }),
  publicationId:null,
  methods: {
    defaultForm(){
      this.currentPetId=-1;
      this.currentPublicationId=-1;
      this.tipo= '';
      this.name= '';
      this.attention= '';
      this.race= '';
      this.age= '';
      this.urlToImage= '';
      this.isAdopted= '';
      this.userId= '';
      this.comment= '';
    },
    getPets(){
      PetsService.getPets(UserService.storageUser).then(
      response =>{
        this.pets=response.data;
        console.log(this.pets)
      }
      )
    },
    getDisplayPublications(publication) {
      return {
        id: publication.id,
        comment: publication.comment
      }
    },
    retrievePublications() {
      console.log("Get user Publications");
      PublicationsService.getUserPublications(UserService.storageUser)
          .then(response => {
            console.log(response);
            this.publications = response.data;
          })
    },
    showInfCard(id){

      if(id!=0){
        this.showAux=-id*this.show;
      }
      else{
        this.showAux= -this.show;
      }
      console.log(this.showAux)
      this.show=-this.show;

    },
    editPublication(Pet, Publication){
      this.dialog=true;
      this.editActivate=true;
      this.tipo= Pet.type;
      this.name= Pet.name;
      this.attention= Pet.attention;
      this.race= Pet.race;
      this.age= Pet.age;
      this.urlToImage= Pet.urlToImage;
      this.isAdopted= Pet.isAdopted;
      this.userId= Pet.userId;
      this.comment= Publication.comment;
      this.datetime= "12/12/12";
      this.currentPetId= Pet.id;
      this.currentPublicationId= Publication.id;
    },
    Save(){
      if(this.editActivate){
        console.log("Inicio")

        console.log(this.comment)
        console.log(this.currentPetId)
        console.log(this.datetime)
        console.log(this.userId)
        console.log("Final")

      PublicationsService.putPublication(this.currentPublicationId,{
        Comment:this.comment,
        PetId: this.currentPetId,
        DateTime: this.datetime,
        UserId: this.userId
      }).then(
          this.retrievePublications,
          this.getPets,
          this.dialog=false,
        this.editActivate=false,
        this.defaultForm  ,
      );
      }
      else{
        PublicationsService.postNewPublication({
          comment:this.comment,
          petId: this.currentPetId,
          datetime: this.datetime,
          userId: this.userId
        }).then(
            this.retrievePublications,
        )

        PetsService.putPet(this.currentPetId, {
          id: this.currentPetId,
          type: this.tipo,
          name: this.name,
          attention: this.attention,
          race: this.race,
          age: this.age,
          urlToImage: this.urlToImage,
          isAdopted: this.isAdopted,
          isPublished: true,
          userId: this.userId
        }).then(
            this.getPets,
        )
            this.dialog=false,
            this.editActivate=false,
            this.defaultForm()
      }
    },
    Close(){
      this.dialog=false;
      this.editActivate=false;
      this.defaultForm();
    },
    DeletePublication(id)
    {
      PublicationsService.DeletePublication(id).then(
          this.retrievePublications
      );
    },
    setDialog(flag){
      this.dialog=flag;
    },
    filFormPubication(Pet){
      this.tipo= Pet.type;
      this.name= Pet.name;
      this.attention= Pet.attention;
      this.race= Pet.race;
      this.age= Pet.age;
      this.urlToImage= Pet.urlToImage;
      this.isAdopted= Pet.isAdopted;
      this.userId= Pet.userId;
      this.datetime= '00/00/00';
      this.currentPetId= Pet.id;
      this.retrievePublications();
      this.getPets();

    }

  },
  mounted () {
    this.retrievePublications();
    this.getPets();
  },
}
</script>

<style scoped>

</style>
