<template>
  <div>
    <v-container class="d-flex justify-space-between align-center">
      <h1 class="my-4 font-weight-regular">Table To Excel And Pdf</h1>
      <v-btn class="error white--tex" @click="download">
        <v-icon>mdi-download</v-icon>
        Pdf
      </v-btn>
    </v-container>
  <v-container>
    <vue-good-table 
    :columns="head"
    :rows="rows"
    theme="nocturnal"
  />
  </v-container>
  </div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import {VueGoodTable} from 'vue-good-table'
import jsPdf from 'jspdf'
import autoTable from 'jspdf-autotable'
import {colRef} from '../../src/firebase-config'
import {onSnapshot} from '@firebase/firestore'
  export default {
    name: 'Home',
    data(){
      return{
        head:[
          {label:'Name',field:'name'},
          {label:'Age',field:'age',type:'number'},
          {label:'Coding Lang',field:'coding'},
          {label:'Expereince',field:'exp'}
        ],
        rows:[]
      }
    },
    components: {
      VueGoodTable
    },
    methods:{
      fetchData(){
        let data=[]
        onSnapshot(colRef,snapshot=>{
          snapshot.docs.forEach(e=>{
            data.push({...e.data(),id:e.id})
          });
          this.rows=data;
          console.log(data);
          data=[];
        });
      },
      download(){
        let arr=[],header=[];
        this.rows.forEach((a,b,c,d,)=>{
          // arr.push((Object.values(e)).sort());
          console.log(a,b,c,d);
        })
        // This is for the header
        header.push([])
        this.head.forEach(e=>{
          header[0].push(e.label)
        })
        console.log(arr)
        let doc=new jsPdf();
        autoTable(doc,{
          head:header,
          body:arr,
          // didParseCell:function(HookPage){
          //   if(HookPage.cell.text=='Python'){
          //     HookPage.cell.styles.fillColor="yellow"
          //   }
          //   console.log(HookPage);
          // }
        });
        // doc.save('yeah.pdf')
      }
    },
    created(){
      this.fetchData();
    }
  }
</script>
