<template>
  <div>
    <v-card width="400px">
      <v-card-title style="">修改个人信息</v-card-title>
      <div style="margin-top:10px">
          <el-tooltip class="item" effect="dark" content="点此上传头像" placement="right" >
          <el-upload class="avatar-uploader" action="#" accept="image/png,image/gif,image/jpg,image/jpeg"
            :show-file-list="false" :before-upload="beforeAvatarUpload" :http-request="uploadimg" :limit="1" :on-success="handlesuccess"
            style="position: absolute;height: 150px;width: 150px;background-color: whitesmoke;border-radius: 50%">
           
            <i class="el-icon-plus avatar-uploader-icon" style="position: absolute;left: -12px;top:-10px"></i>
          </el-upload>
          </el-tooltip>
      </div>
      <div style="margin-top:200px;">
        <v-text-field
              v-model="username"
              :rules="nameRules"
              :counter="20"
              label="昵称"
              required
            ></v-text-field>
          <v-text-field
              v-model="real_name"
              :rules="nameRules"
              :counter="10"
              label="真实姓名"
              required
            ></v-text-field>
          <v-text-field
              v-model="email"
              :rules="nameRules"
              :counter="20"
              label="邮箱"
              required
            ></v-text-field>
          <v-text-field
              v-model="phone"
              :rules="nameRules"
              :counter="20"
              label="手机号码"
              required
            ></v-text-field>
          <v-text-field
              v-model="profile"
              :rules="nameRules"
              :counter="20"
              label="个人简介"
              required
            ></v-text-field>
            <div @click="update" style="color:black;text-align: center;width: 100%;font-size: 20px;">
              <span>更新资料</span>
            </div>
               </div>
      
        
    </v-card>
    <!-- <div class="banner" style="position: fixed;z-index: 9999;width: 100%;height:60px;background-color: ghostwhite">
        <div style="position: absolute;top: 63px; font-size: 10px;color: #999999">
          头像
        </div>
        <div>
          <el-tooltip class="item" effect="dark" content="点此上传头像" placement="right" >
          <el-upload class="avatar-uploader" action="#" accept="image/png,image/gif,image/jpg,image/jpeg"
            :show-file-list="false" :before-upload="beforeAvatarUpload" :http-request="uploadimg" :limit="1" :on-success="handlesuccess"
            style="position: absolute;height: 150px;width: 150px;background-color: whitesmoke;border-radius: 50%">
           
            <i class="el-icon-plus avatar-uploader-icon" style="position: absolute;left: -12px;top:-10px"></i>
          </el-upload>
          </el-tooltip>
        </div>
        
      
    </div> -->
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
      password:'',
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
            this.password = res.data.data.password;
            console.log(this.profile);
            console.log(this.password);
            console.log(this.userhead)
          }
      );
      this.userhead = JSON.parse(sessionStorage.getItem('imgurl'));
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
            this.imageUrl = res.data.url;
            this.userhead = this.imageUrl;
            sessionStorage.setItem('imgurl',JSON.stringify(this.imageUrl));
            this.$message.success("头像上传成功");
            // window.location.reload();
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
    },
    insert1(){
      this.profile+='全栈大佬就是我。';
    },
    insert2(){
      this.profile+='和我组队，直接带飞。';
    },
    insert3(){
      this.profile+='Carry全场。';
    },
    insert4(){
      this.profile+='哥就是传说。';
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
