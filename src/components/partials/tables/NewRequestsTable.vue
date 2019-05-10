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
                             <label>
                                <input type="checkbox" v-bind:id = "index" v-bind:value= "user.id" :disabled="approve.length >= max && approve.indexOf(index) == -1" v-model="approve"
                                  v-confirm="{loader: true, ok: dialog => approveUserRequest(dialog,user,index),
                                                                    cancel: dialog => cancelAction(dialog),
                                                                    message: 'Are you sure you want to approve this user?'}" 
                                >
                        
                             </label>
                        </td>
                        <td>
                                <label><input type="checkbox" v-bind:id = "index" v-bind:value= "user.id" v-model="reject"
                                 v-confirm="{loader: true, ok: dialog => rejectUserRequest(dialog, user,index),
                                                                    cancel: dialog => cancelAction(dialog),
                                                                    message: 'Are you sure you want to reject this user?'}"> Reject</label>
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
            approve:[],
            reject:[],
             max: 2
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
      async updateUser(updatedUser) {
          var res = await API.updateUser(updatedUser);
          if (res.result=="ok") {
             console.debug("I am success");
            //dialog.close();
         }      
         else {
             console.debug("this is not success");
         }
      },
      approveUserRequest(dialog,user,index) {
           let user_action = dialog.node;
           console.log("this is the user_action", user.email)
           user.isActive = true;
           this.updateUser(user);
           this.approve.push(user.id);
           dialog.close();
        },
      rejectUserRequest(dialog,user,index) {
           //let user_action = dialog.node();
           //console.log("this is the user_action", user_action)
           user.isAction = false;
           this.reject.push(user.id);
           dialog.close();
        },
      cancelAction(dialog) {
			//dialog.close();
        }
    } 
};
</script>


<style lang="scss">
.web-page-table {

}
</style>