<template>
    <div class="current-users-table card w-100 h-100">
        
        <div class="card-body">

            <table class="table table-striped table-responsive">
                <thead>
                  <tr>
                        <th>Email</th>
                        <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="(user,index) in this.users" v-bind:key="index">
                        <td>
                            {{user.email}}
                        </td>
                        <td>
                            <label for="approve">
                                <input type="checkbox" id=approve value="approve"
                                 v-confirm="{loader: true, ok: dialog => updateUserRequest(dialog, user,index),
                                                                    cancel: dialog => cancel(dialog),
                                                                    message: 'Are you sure you want to approve this user?'}"> 
                                 Approve </label>
                        </td>
                        <td>
                            <div class="checkbox">
                                <label><input type="checkbox" v-confirm="{loader: true, ok: dialog => updateUserRequest(dialog, user,index),
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
            users:[]
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
      },
       updateUserRequest(dialog,user,index) {
            
            if(user.isActive) {
               console.log(user.email)
            }
            else {
              console.log("This is inactive")  
            }
            this.updateUser(user)
            dialog.close()
        },
      cancel(dialog) {
			dialog.close()
		}  


    }
};
</script>


<style lang="scss">
.web-page-table {

}
</style>