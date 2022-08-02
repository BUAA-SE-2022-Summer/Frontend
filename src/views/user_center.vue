<template>
  <div>
    <div class="banner" style="position: fixed;z-index: 9999;width: 100%;height:60px;background-color: ghostwhite">
      <div class="mobook_head">
        <img src="../img/墨书头.png"
          style="position: absolute;top:0px;left:70px;width: 40px;height: 40px;border-radius: 50%;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 10px"
          @click="returnwelcome">
      </div>
      <div class="name" style="position: absolute;top:15px;left:130px;font-size: 20px"><b>墨书</b></div>
      <el-button
        style="position: absolute;left:500px;border-color: ghostwhite;border-radius: 0px;height:60px;background-color: ghostwhite" @click="jumpchange">
        <b>个人信息修改</b>
      </el-button>
      <el-button
          style="position: absolute;left:650px;border-color: ghostwhite;border-radius: 0px;height:60px;background-color: ghostwhite" @click="jumpcenter">
        <b>个人中心</b>
      </el-button>
      <img :src="this.userhead" style="position: absolute;top:0px;left:1300px;width: 40px;height: 40px;border-radius: 50%;border-color: white;border-width: 1px;margin-right: 50px;margin-top: 10px" slot="reference" >
      <div  style="position: absolute;top:20px;left:1360px"><b>{{this.username}}</b></div>
    </div>
    <div style="position: absolute;height:900px;background-color: whitesmoke;top:60px;width: 100%">
      <el-card class="box-card" style="width: 1000px;height:800px;position: absolute;left:270px;top:40px">
        <div slot="header" class="clearfix">
          <span><b>个人信息更改</b></span>
        </div>
        <div style="position: absolute;top: 63px; font-size: 10px;color: #999999">
          头像
        </div>
        <div>
          <el-upload class="avatar-uploader" action="#" accept="image/png,image/gif,image/jpg,image/jpeg"
            :show-file-list="false" :before-upload="beforeAvatarUpload" :http-request="uploadimg" :limit="1" :on-success="handlesuccess"
            style="position: absolute;height: 200px;width: 200px;background-color: whitesmoke">
            <!--<img v-if="this.imageUrl === this.imageUrl1 && this.imageUrl!==''" :src="this.imageUrl" class="avatar">-->
            <i  class="el-icon-plus avatar-uploader-icon" style="position: absolute;left: 10px;top:10px"></i>
          </el-upload>
        </div>
        <div style="position: absolute;top: 295px; font-size: 10px;color: #999999">
          昵称
        </div>
        <div style="position: absolute;width: 550px;top: 320px;">
          <el-input v-model="username" placeholder="请输入新的昵称"></el-input>
        </div>
        <div style="position: absolute;top: 365px; font-size: 10px;color: #999999">
          姓名
        </div>
        <div style="position: absolute;width: 550px;top: 390px;">
          <el-input v-model="real_name" placeholder="请输入新的真实姓名"></el-input>
        </div>
        <div style="position: absolute;top: 435px; font-size: 10px;color: #999999">
          电子邮箱
        </div>
        <div style="position: absolute;width: 550px;top: 460px;">
          <el-input v-model="email" placeholder="请输入新的电子邮箱"></el-input>
        </div>
        <div style="position: absolute;top: 505px; font-size: 10px;color: #999999">
          电话
        </div>
        <div style="position: absolute;width: 550px;top: 530px;">
          <el-input v-model="phone" placeholder="请输入新的电话号码"></el-input>
        </div>
        <div style="position: absolute;top: 575px; font-size: 10px;color: #999999">
          个性签名
        </div>
        <div style="position: absolute;width: 750px;top: 600px;">
          <el-input v-model="profile" placeholder="请输入新的个性签名" type="textarea"></el-input>
        </div>
        <div style="position: absolute;top:700px;left:450px;">
          <el-button type="primary" @click="update">更新资料</el-button>
        </div>
      </el-card>
    </div>
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
      imageUrl1:'',
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
          }
      );
  },
  methods: {
    handlesuccess(){
      this.$refs.upload.clearFiles();
    },
    returnwelcome() {
      this.$router.push('/');
    },
    uploadimg(file) {
      this.imageUrl1 = '';
      let formData = new FormData();
      formData.append('img', file.file);
      this.$axios.post(
        '/user/update_user_img',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      ).then(
        res => {
          if (res.data.errno === 0) {
            this.$message.success("头像上传成功");
            this.imageUrl = res.data.url;
            this.userhead = this.imageUrl;
          }
          else {
            this.$message.error(res.data.msg);
          }
        }
      )
        .catch(err => {
          console.log(err);
        })
    },
    beforeAvatarUpload(file) {
      this.imageUrl1 = '';
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!');
      }
      return (isJPG || isPNG) && isLt10M;
    },
    update() {
      if (this.username === '') {
         alert('昵称不能为空');
      } else {
        this.$axios.post('/user/update_user_info ', qs.stringify(
            {
              username: this.username,
              password: this.password,
              real_name: this.real_name,
              email: this.email,
              phone: this.phone,
              profile: this.profile,

            }
        )).then(
            res => {
              if (res.data.errno === 0) {
                this.$message.success("修改信息成功");
              } else {
                this.$message.error(res.data.msg);
              }
            }
        )
      }
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
