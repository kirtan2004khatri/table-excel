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
        id="table"
        :columns="head"
        :rows="rows"
        theme="black-rhino"
        max-height="300px"
        :line-numbers="false"
        :select-options="{ enabled: true }"
        @on-row-click="rowfunc"
        @on-cell-click="cellfunc"
        @on-select-all="selectAll"
        @on-row-mouseenter="enterfunc"
        @on-row-mouseleave="leavefunc"
        @on-search="searchfunc"
        :search-options="{
          enabled: true,
        }"
      >
        <div slot="table-actions">This is is the text</div>
      </vue-good-table>
    </v-container>
  </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import jsPdf from "jspdf";
import autoTable from "jspdf-autotable";
import { colRef } from "../../src/firebase-config";
import { onSnapshot } from "@firebase/firestore";
export default {
  name: "Home",
  data() {
    return {
      head: [
        { label: "Name", field: "name", filterOptions: { enabled: true },dataKey:"name",title:"Name"},
        {
          label: "Age",
          field: "age",
          type: "number",
          filterOptions: { enabled: true },
          dataKey:"age",
          title:"Age"
        },
        {
          label: "Coding Lang",
          field: "coding",
          filterOptions: { enabled: true },
          dataKey:"coding",
          title:"Coding Lang"
        },
        { label: "Expereince", field: "exp", filterOptions: { enabled: true },dataKey:"exp",title:"Expereince"},
      ],
      rows: [],
    };
  },
  components: {
    VueGoodTable,
  },
  methods: {
    fetchData() {
      let data = [],
        arr = [];
      onSnapshot(colRef, (snapshot) => {
        snapshot.docs.forEach((e) => {
          data.push({ ...e.data(), id: e.id });
        });
        this.rows = data;
        console.log(data);
        data = [];
      });
    },
    download() {
      let arr = [],
        header = [];
      // This is for the header
      header.push([]);
      this.head.forEach((e) => {
        header[0].push(e.field);
      });
      let doc = new jsPdf('p','pt');

      //logic for sorting an array in correct way form object
      this.rows.forEach((e, index) => {
        arr.push([]);
        for (let i of header[0]) {
          arr[index].push(e[i]);
        }
      });
      // autoTable(doc, {
      //   head: header,
      //   body: arr,
      //   margin: { top: 20, right: 10, bottom: 10, left: 10 },
      //   didParseCell: function (HookPage) {
      //     if (HookPage.cell.text == "JavaScript") {
      //       HookPage.cell.styles.fillColor = "yellow";
      //     }
      //     if (HookPage.cell.text == "Python") {
      //       HookPage.cell.styles.fillColor = "cyan";
      //     }
      //     console.log(HookPage);
      //   },
      // });
      let htmlCode=document.getElementsByTagName('thead');
      console.log(htmlCode);
      // htmlCode=htmlCode[0].innerHTML;
      // autoTable(doc,this.head,this.rows);
      doc.autoTable(this.head,this.rows);
      // autoTable(doc,{
      //   head:[["Name","Age","Coding Lang","Expereince"]],
      //   body:{html:'#vgt-table  '}
      // })

      // let count = doc.internal.getNumberOfPages();

      // for (let i = 1; i <= count; i++) {
      //   doc.setPage(i);
      //   doc.setFontSize(15);
      //   doc.text("Header", 10, 12);
      //   doc.setLineWidth(0.3);
      //   doc.line(5, 15, 205, 15);
      //   doc.setFontSize(12);
      //   doc.text(
      //     `Page ${i} of ${count}`,
      //     15,
      //     doc.internal.pageSize.height - 10
      //   );
      // }

      doc.save("yeah.pdf");
    },
    validation(row) {
      return row.age > 18 ? "" : "red";
    },
    rowfunc(params) {
      // console.log(params.row);
      // console.log(params.pageIndex);
      // console.log(params.selected);
      // console.log(params.event);
    },
    cellfunc(params) {
      console.log(params.row);
      console.log(params.column);
      console.log(params.rowIndex);
      console.log(params.event);
    },
    selectAll(params) {
      console.log(params.selected);
      console.log(params.selectedRows);
    },
    enterfunc(params) {
      console.log(params.row);
      console.log(params.pageIndex);
    },
    leavefunc(params) {
      console.log(params.row);
      console.log(params.pageIndex);  
    },
    searchfunc(params) {
      console.log(params.searchTerm);
      console.log(params.rowCount);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
