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
        style="position: absolute;left:500px;border-color: ghostwhite;border-radius: 0px;height:60px;background-color: ghostwhite">
        <b>个人信息</b>
      </el-button>
    </div>
    <div style="position: absolute;height:900px;background-color: whitesmoke;top:60px;width: 100%">
      <el-card class="box-card" style="width: 1000px;height:700px;position: absolute;left:270px;top:40px">
        <div slot="header" class="clearfix">
          <span><b>个人信息更改</b></span>
        </div>
        <div>
          <el-upload class="avatar-uploader" action="#" accept="image/png,image/gif,image/jpg,image/jpeg"
            :show-file-list="false" :before-upload="beforeAvatarUpload" :http-request="uploadimg" :limit="1"
            style="position: absolute;height: 200px;width: 200px;background-color: whitesmoke">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" style="position: absolute;left: 10px;top:10px"></i>
          </el-upload>
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
    };
  },
  methods: {
    returnwelcome() {
      this.$router.push('/');
    },
    uploadimg(file) {
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
  width: 178px;
  height: 178px;
  display: block;
}
</style>
