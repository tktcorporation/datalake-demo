<template>
    <div class="current-users-table card w-50">
        
        <div class="card-body">

            <table class="table table-striped table-responsive">
                <thead>
                  <tr>
                        <th>Email</th>
                        <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="(user,index) in this.users" v-bind:key="index" >
                        <td>
                            {{user.email}}
                        </td>
                        <td>
                          <div :class=actions> 
                             <label>
                                <input type="checkbox" v-bind:id = index :value= "user.id" v-model="actions">
                                                                  Approve 
                             </label>
                             <span>{{ actions }}</span>
                          </div>  
                        </td>
                        <td>
                            <div :class=actions>
                                <label><input type="checkbox" id = "reject" value="reject" v-model="actions"
                                 v-confirm="{loader: true, ok: dialog => updateUserRequest(dialog, user,index),
                                                                    cancel: dialog => cancel(dialog),
                                                                    message: 'Are you sure you want to reject this user?'}"> Reject</label>
                            </div>
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

export default {

    name: "new-requests-table",


    data() {
        return {
            users:[],
            actions:[]
        };
    },

    mounted() {
        this.getNewUsers();
    },

    methods: {
        async getNewUsers() {
            API.getNewUsers().then(res => {
            this.users = res
        })
      },
        async updateUser(user) {
           // API.updateUsers().then(res => {
            //this.users = res
        //})
        //alert("this is submitted");
        return API.updateUser(user)
      },
       updateUserRequest(dialog,user,index) {
           console.log("this is the action::::" + actions)
           /*if(this.actions.includes("approve")) {
               console.log("this is approve")
               dialog.close()
           }
           /*if (this.updateUser(user)=="OK") {  
               console.log("updated")
               dialog.close()
            }*/
            dialog.close()
        },
      cancel(dialog) {
			dialog.close()
        },
    } 
};
</script>


<style lang="scss">
.web-page-table {

}
</style>