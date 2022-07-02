<template>
  <div class="about">
    <h1 class="text-center text-weight-regular text-capitalize my-5">
      fill the data in this form
    </h1>
    <v-container>
      <v-form>
        <v-card>
          <v-row>
            <v-col cols="6">
              <v-row>
                <v-col cols="12" class="px-5">
                  <v-text-field
                    label="Fullname"
                    placeholder="Enter your full name here"
                    class="mx-5"
                    v-model="name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="px-5">
                  <v-text-field
                    label="Age"
                    hint="Enter you age"
                    class="mx-5"
                    v-model="age"
                  ></v-text-field>
                </v-col>
                <v-col class="px-5">
                  <v-select
                    :items="items"
                    class="mx-5"
                    label="Select Coding Language"
                    v-model="coding"
                  ></v-select>
                </v-col>
                <v-col cols="12" class="px-5">
                  <v-select
                    :items="expereince"
                    class="mx-5"
                    label="Your Expereince"
                    v-model="exp"
                  ></v-select>
                </v-col>
                <v-col cols="12" class="px-5">
                  <v-btn class="green white--text mx-5" large @click="addData()">Add</v-btn>
                  <v-btn class="secondary white--text" large @click="reset()">Reset</v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-img class="mx-auto mt-5" src="../assets/logo.svg" width="300"></v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import {db,colRef} from '../../src/firebase-config';
import {addDoc} from '@firebase/firestore'
export default {
  data() {
    return {
      items: ["Python", "Java", "JavaScript", "php"],
      expereince:["<1 yr","1-2 yr","2-3 yr","3-4 yr","4-5yr",">5 yr"],
      age:0,name:'',coding:'',exp:''
    };
  },
  methods:{
    addData(){
      addDoc(colRef,{
        name:this.name,
        age:this.age,
        coding:this.coding,
        exp:this.exp
      })
      .then(()=>alert("Data stored succesfully..........."))
      .catch(err=>console.log(err));
    }
  }
};
</script>
