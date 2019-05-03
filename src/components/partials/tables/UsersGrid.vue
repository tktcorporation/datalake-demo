<template>
  <div class="container">
      <v-client-table 
          :data="tableData"
          :columns="columns" 
          :options="options">
      </v-client-table>
  </div>
</template>

<script>
import API from '../../../api';
export default {
    name: "users-table",
    data() {
        return {
            columns: [ 'email', 'isActive'],
            tableData: [],
            options: {
                headings: {
                   
                    email: 'Email',
                    isActive: 'Status'
                },
                //sortable: ['name', 'isActive'],
                //filterable: ['name', 'isActive']
            }
        }
    },
    mounted() {
        this.getNewUsers();
    },
    methods:{
        async getNewUsers() {
            API.getNewUsers().then(res => {
            this.tableData = res
        })
     }
            
    } 
 
}
</script>

<style>
#app {
  width: 95%;
  margin-top: 50px; 
}

.VuePagination {
  text-align: center;
}

.vue-title {
  text-align: center;
  margin-bottom: 10px;
}

.vue-pagination-ad {
  text-align: center;
}

.glyphicon.glyphicon-eye-open {
  width: 16px;
  display: block;
  margin: 0 auto;
}

th:nth-child(3) {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}

</style>