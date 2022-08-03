<template>
  <div class="home">
    <div class="home-header">
      <div class="home-header-left">
        <div class="home-header-left-title">
          <span>项目回收站</span>
        </div>
      </div>
      <div class="home-header-right">
        <div class="home-header-right-img">
          <v-btn style="border-radius: 50%">
            <v-avatar size="40px" style="border-radius: 50%">
              <img src="../../assets/logo.png" alt="">
            </v-avatar>
          </v-btn>
        </div>
      </div>
    </div>
    <div class="home-content">
      <div class="left">
        <v-icon>mdi-alert-circle</v-icon>
        <div class="slogan">您删除的项目或文件将在此保留3天，然后将被永久删除</div>
      </div>
    </div>
    <div class="home-content-1">
      <div class="right">
        <v-text-field
            v-model="search"
            label="搜索"
            append-icon="mdi-magnify"
            class="search"
        ></v-text-field>
      </div>
    </div>
    <div class="home-content-2">
      <img src="../../assets/empty-join.svg" class="empty-img empty-join-img" alt="">
      <div class="empty-header">无项目</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      admins: [
        ['成员管理', 'mdi-account-cog'],
        ['操作日志', 'mdi-book-open-outline'],
      ],
    }
  }
}
</script>
<style scoped>
.home {
  width: 1060px;
  height: 90px;
  position: fixed;
  top: 20px;
  right: 0;
  border: 1px solid #ccc;
}
.home-header {
  width: 70%;
  height: 70px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-shadow: 0 0 0 #e0e0e0;
  position: fixed;
  top: 20px;
  right: 0;
}
.home-header-left {
  display: flex;
  align-items: center;
}
.home-header-left-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
.home-header-right {
  display: flex;
  align-items: center;
}
.home-header-right-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 20px;
}
.but_1 {
  position: fixed;
  top: 100px;
  right: 320px;
  width: 150px;
  height: 0;
  background-color: #fff;
  box-shadow: 0 0 10px #e0e0e0;
  border-radius: 5px;
}
.but_2 {
  position: fixed;
  top: 100px;
  right: 160px;
  width: 150px;
  height: 0;
  background-color: #fff;
  box-shadow: 0 0 10px #e0e0e0;
  border-radius: 5px;
}
.but_3 {
  position: fixed;
  top: 92px;
  right: 2px;
  width: 150px;
  height: 0;
  background-color: #fff;
  box-shadow: 0 0 10px #e0e0e0;
  border-radius: 10px;
}
.li_1 {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}
.li_2 {
  height: 66px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}
.tit_1 {
  text-align: left;
}
.tit_1_1 {
  text-align: left;
  margin-left: 20px;
}
.home-content {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  position: fixed;
  left: 31%;
  top: 27%;
  transform: translateY(-80px);
}
.home-content .left {
  font-size: 14px;
  color: rgb(125, 139, 148);
  line-height: 1px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  padding: 14px 12px;
  background: rgb(242, 242, 242);
  border-radius: 4px;
}
.home-content-1 {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  position: fixed;
  right: 1%;
  top: 27%;
  transform: translateY(-80px);
}
.home-content-1 .right {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  background: rgb(242, 242, 242);
  border-radius: 4px;
  padding: 14px 12px;
  height: 53px;
}
.home-content-2 {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  flex-flow: column wrap;
  -webkit-box-align: center;
  align-items: center;
  position: fixed;
  left: 60%;
  top: 50%;
  transform: translateY(-80px);
}
.home-content-2 .empty-header {
  font-size: 18px;
  line-height: 16px;
  color: rgb(31, 41, 46);
  margin-top: 8px;
  font-weight: 500;
}
</style>