<template>
  <div>
    <v-card width="400px" >
      <v-card-title style="">个人信息</v-card-title>
      <img :src="this.userhead" style="width: 210px;height:210px;position: absolute;left:20px;border-radius: 50%">
      <div style="margin-top:250px">
      <v-text-field width="100%" style="" label="昵称" v-model="this.username">
      {{this.username}}</v-text-field>
      <v-text-field width="100%" style="margin-top: 20px;" label="姓名" v-model="this.real_name">
      姓名
       <v-icon>mdi-heart</v-icon><v-spacer></v-spacer>
      {{this.real_name}}</v-text-field>
      <v-text-field width="100%" style="margin-top: 20px;" label="邮箱" v-model="this.email">
      邮箱
       <v-icon>mdi-heart</v-icon><v-spacer></v-spacer>
      {{this.email}}</v-text-field>
      <v-text-field width="100%" style="margin-top: 20px;" label="手机号" v-model="this.phone">
      手机号
       <v-icon>mdi-heart</v-icon><v-spacer></v-spacer>
      {{this.phone}}</v-text-field>
      </div>
   </v-card>
  </div>
</template>
<script>
import qs from "qs";

export default {
  name: "user_center",
  data() {
    return {
      imageUrl: '',
      uploadimgurl:'/user/update_user_img ',
      username:'',
      userhead:'',
      real_name:'',
      email:'',
      phone:'',
      profile:'',
      username1:'',
    };
  },
  created() {
    this.$axios.get('/user/get_user_info ').then(
        res => {
          this.username = res.data.data.username;
          this.userhead = res.data.data.img;
          this.real_name = res.data.data.real_name;
          this.email = res.data.data.email;
          this.phone = res.data.data.phone;
          this.profile = res.data.data.profile;
          this.username1 = this.username;
          console.log(this.userhead)
        }
    );
  },
  methods: {
    returnwelcome() {
      this.$router.push('/');
    },
    jumpchange(){
      this.$router.push('/user_center');
    },
    jumpcenter(){
      this.$router.push('/true_user_center');
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 200px;
  height: 200px;
  display: block;
}
</style>
