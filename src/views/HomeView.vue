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
      <vue-good-table :columns="head" :rows="rows" theme="nocturnal" :search-options="{
        enabled: true,
        trigger: 'enter',
        skipDiacritics: true,
        placeholder: 'Search any data here....'
      }" :sort-option="{
  enabled: true
}" />
    </v-container>
  </div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import jsPdf from 'jspdf'
import autoTable from 'jspdf-autotable'
import { colRef } from '../../src/firebase-config'
import { onSnapshot } from '@firebase/firestore'
import { map } from '@firebase/util'
export default {
  name: 'Home',
  data() {
    return {
      head: [
        { label: 'Name', field: 'name' },
        { label: 'Age', field: 'age', type: 'number' },
        { label: 'Coding Lang', field: 'coding' },
        { label: 'Expereince', field: 'exp' }
      ],
      rows: []
    }
  },
  components: {
    VueGoodTable
  },
  methods: {
    fetchData() {
      let data = [], arr = [];
      onSnapshot(colRef, snapshot => {
        snapshot.docs.forEach(e => {
          data.push({ ...e.data(), id: e.id })
        });
        this.rows = data;
        console.log(data);
        data = [];
      });
    },
    download() {
      let arr = [], header = [];
      // This is for the header
      header.push([])
      this.head.forEach(e => {
        header[0].push(e.field)
      })
      let doc = new jsPdf();

    //logic for sorting an array in correct way form object 
      this.rows.forEach((e,index)=> {
        arr.push([])
        for (let i of header[0]) {
          arr[index].push(e[i]);
        }
      });
      autoTable(doc, {
        head: header,
        body: arr,
        didParseCell:function(HookPage){
          if(HookPage.cell.text=='JavaScript'){
            HookPage.cell.styles.fillColor="yellow"
          }
          if(HookPage.cell.text=="Python"){
            HookPage.cell.styles.fillColor="cyan"
          }
          console.log(HookPage);
        }
      });
      
    let count=doc.internal.getNumberOfPages();
    
    for(let i=0;i<count;i++){
      doc.setPage(i);
      doc.setFontSize(12);
      doc.line(20, 25, 60, 25);
      doc.text(`Page ${i+1} of ${count}`,15,doc.internal.pageSize.height-10);
      // console.log(doc.internal.getCurrentPageInfo());
    }

      doc.save('yeah.pdf'); 
    }
  },
  created() {
    this.fetchData();
  }
}
</script>
