<template>
<v-card style="width:400px">
    <v-card-title>忘记密码</v-card-title>
    <v-text-field outlined label="昵称" v-model="name"></v-text-field>
    <v-text-field outlined label="新的密码" v-model="password"></v-text-field>
    <v-text-field outlined label="邮箱" v-model="email"></v-text-field>
    <v-btn @click="send_code" style="background-color: white;margin-bottom: 8px;width: 400px;font-size: 20px;">点击发送验证码</v-btn>
    <v-text-field outlined label="验证码" v-model="code"></v-text-field>
    <v-text-field outlined label="密码确认" v-model="password2"></v-text-field>
    <v-btn @click="reset_password" style="background-color: white;margin-bottom: 8px;width: 400px;font-size: 20px;">重置</v-btn>
    <v-btn @click="cancel" style="background-color: white;margin-bottom: 8px;width: 400px;font-size: 20px;float: right">取消</v-btn>
    
</v-card>
</template>
<script>
import qs from 'qs'
export default {
    data(){
        return{
            name:"",
            password:"",
            email:"",
            code:"",
            password2:"",

          show2:false,
        }
    },
    methods:{
        send_code(){
        this.$axios({
        method: 'post',
        url: '/api/user/send_code ',
        data: qs.stringify({
          username:this.name,
          password:this.password,
          email:this.email
          // teamID: 1
        })
      })
        .then(res => {
          if (res.data.errno === 0) {
            console.log(res.data)
            this.$message.success(res.data.msg)
          }else{
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    reset_password(){
        this.$axios({
        method: 'post',
        url: '/api/user/reset_password  ',
        data: qs.stringify({
          username:this.name,
          password:this.password2,
          email:this.email,
          code:this.code
          // teamID: 1
        })
      })
        .then(res => {
          console.log(res.data)
          if (res.data.errno === 0) {
            this.$message.success(res.data.msg)
          }else{
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
      cancel() {
        this.show2 = false;
        //设置另一组件中data中的值
        this.$emit('change2', false);
      },
    },
}
</script>