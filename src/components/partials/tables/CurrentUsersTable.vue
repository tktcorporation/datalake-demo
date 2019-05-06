<template>
    <div class="current-users-table card w-100 h-100">
        
        <div class="card-body">

            <table class="table table-striped table-responsive">
                <thead>
                  <tr>
                        <th>Email</th>
                        <th>User Level</th>
                        <th>Remove User</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for = "(user,index) in this.users" v-bind:key="index">
                        <td>
                            {{user.email}}
                        </td>
                        <td>
                            <div class="dropdown">
                                <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">{{user.level}}
                                    <span class="caret"></span></button>
                                        <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Admin</a></li>                                                           
                                        </ul>
                            </div>
                        </td>
                        
                        <td scope="row" class="trashIconContainer">
                            <i class="far fa-trash-alt" v-confirm="{loader: true, ok: dialog => deleteUser(dialog, user,index),
                                                                    cancel: dialog => cancelDelete(dialog),
                                                                    message: 'Are you sure you want to delete this user?'}"></i>
                        </td>
                       
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>

import _ from "lodash";
import moment from "moment";
import API from "../../../api";
import Vue from "vue";


export default {

    name: "current-users-table",
    
    data() {
        return {
            users:[],
        };
    },

    mounted() {
        this.getAllUsers();
    },

    methods: {
        async getAllUsers() {
            API.getAllUsers().then(res => {
            this.users = res
        })
      },
      async confirmDelete(deletedUser,index) {
          console.log(deletedUser.id)
          if (index > -1) {
                this.users.splice(index, 1);
          }
          //TO DO: need to add api call
          //API.removeUser(deletedUser);

      },
      deleteUser(dialog,user,index) {
            console.log(user.email)
            this.confirmDelete(user,index)
            dialog.close()
        },
      cancelDelete(dialog) {
			dialog.close()
		}  

    }
};
</script>


<style lang="scss">
.web-page-table {

}
</style>