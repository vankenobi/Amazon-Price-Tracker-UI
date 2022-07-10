<template>
    <div class="row">
        <div class="container col-md-6 p-5 mt-5" style="text-align: left; border: 3px solid #242f41; border-radius: 8px;">
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input v-model.trim="EmailSettings.Username" type="email" class="form-control"  aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input v-model.trim="EmailSettings.Password" type="password" class="form-control" >
            </div>
            <div class="row">
                <div class="mb-3 col-md-6">
                    <label for="exampleInputEmail1" class="form-label">Host</label>
                    <input v-model.trim="EmailSettings.Host" type="email" class="form-control" aria-describedby="emailHelp">
                </div>
                <div class="mb-3 col-md-6">
                    <label for="exampleInputEmail1" class="form-label">Port</label>
                    <input v-model.trim="EmailSettings.Port" type="number" class="form-control">
                </div>
            </div>
            <div class="form-check form-switch">
                <input v-model.trim="EmailSettings.EnableSsl" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">Enable SSL</label>
            </div>
        <button @click.prevent="saveMailSettings" class="btn btn-success mt-3">Save the Changes</button>
    </form>
    </div>
    </div>
    
    
    
</template>
<script>
import axios from 'axios';
/*
"EmailSettings": {
    "Port": 587,
    "Host": "smtp.gmail.com",
    "EnableSsl": true,
    "Credentials": {
      "Username": "pricetrackerappforamazon@gmail.com",
      "Password": "$@r5!Q2$e9"
    }
  }
*/ 
export default {
    data() {
        return {
            EmailSettings : {
                Port : null,
                Host : null,
                EnableSsl: true,
                Username: null,
                Password: null
            }
        }
    },
    
    methods: {
        saveMailSettings(){
            console.log(this.EmailSettings);
            
            const config = { headers: {'Content-Type': 'application/json'} };
            axios.post('http://44.204.241.92:8080/api/Mails/SetMailServerSettings',this.EmailSettings,config)
            .then(response => {
                console.log(response);
            })
            .catch(e => { console.log(e) });
            this.$delete(this.EmailSettings.Username); 
            this.clearMailSettings();
        },

        clearMailSettings(){
            this.EmailSettings.Port = null;
            this.EmailSettings.Host = null;
            this.EmailSettings.EnableSsl = true;
            this.EmailSettings.Username = null;
            this.EmailSettings.Password = null;
        }
    },
}
</script>


