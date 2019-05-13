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
                                <input type="checkbox" v-bind:id = "index" v-bind:value= "user.id" v-model="approve"
                                  v-confirm="{loader: true, ok: dialog => approveUserRequest(dialog,user),
                                                                    cancel: dialog => cancelAction(dialog),
                                                                    message: 'Are you sure you want to approve this user?'}" 
                                >Approve
                        
                             </label>
                        </td>
                        <td>
                                <label><input type="checkbox" v-bind:id = "index" v-bind:value= "user.id" v-model="reject"
                                 v-confirm="{loader: true, ok: dialog => rejectUserRequest(dialog, user),
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
            reject:[]
        };
    },

    mounted() {
        this.getNewUsers();
    },

    methods: {
        getNewUsers() {
            API.getNewUsers().then(res => {
            this.users = res
        })
      },
      async approveUserRequest(dialog,user,index) {
          user.isActive = true;
          try { 
              await API.updateUser(user);
              if(res.result == 'ok') this.approve.push(user.id);
          } catch(err) {
              alert("unable update the user");
          }
           dialog.close();
        },
      async rejectUserRequest(dialog,user,index) {
           user.isAction = false;
          try { 
              await API.updateUser(user);
              if(res.result == 'ok') this.reject.push(user.id);
          } catch(err) {
              alert("unable update the user");
          }
           dialog.close();
        },
      cancelAction(dialog) {
			dialog.close();
        }
    } 
};
</script>


<style lang="scss">
.web-page-table {

}
</style>