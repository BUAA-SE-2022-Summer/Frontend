<template>
  <div class="home">
    <div class="home-header">
      <div class="home-header-left">
        <div class="home-header-left-title">
          <span>我的工作台</span>
        </div>
      </div>
      <div class="home-header-right">
        <div class="home-header-right-img">
          <v-btn style="border-radius: 50%">
            <v-avatar size="40px" style="border-radius: 50%">
              <img src="../assets/logo.png" alt="">
            </v-avatar>
          </v-btn>
        </div>
      </div>
    </div>
    <div class="home-middle">
      <button class="but_1">
        <v-list width="100%" class="li_1">
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>更新时间</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item @click="">
              <v-list-item-title class="tit_1">更新时间</v-list-item-title>
              <v-list-item-action>
                <v-icon>mdi-check</v-icon>
              </v-list-item-action>
            </v-list-item>

            <v-list-item @click="">
              <v-list-item-title class="tit_1">创建时间</v-list-item-title>
            </v-list-item>

            <v-divider />

            <v-list-item @click="">
              <v-list-item-title class="tit_1">名称</v-list-item-title>
            </v-list-item>

            <v-list-item @click="">
              <v-list-item-title class="tit_1">创建者</v-list-item-title>
            </v-list-item>

            <v-divider />

            <v-list-item @click="">
              <v-list-item-title class="tit_1">升序</v-list-item-title>
            </v-list-item>

            <v-list-item @click="">
              <v-list-item-title class="tit_1">降序</v-list-item-title>
              <v-list-item-action>
                <v-icon>mdi-check</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list>
      </button>
      <button class="but_2">
        <v-list width="100%" class="li_1">
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>全部类型</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item @click="">
              <v-list-item-title class="tit_1">全部类型</v-list-item-title>
              <v-list-item-action>
                <v-icon>mdi-check</v-icon>
              </v-list-item-action>
            </v-list-item>

            <v-list-item @click="">
              <v-list-item-title class="tit_1">原型图</v-list-item-title>
            </v-list-item>


            <v-list-item @click="">
              <v-list-item-title class="tit_1">UML图</v-list-item-title>
            </v-list-item>

            <v-list-item @click="">
              <v-list-item-title class="tit_1">文档</v-list-item-title>
            </v-list-item>


          </v-list-group>
        </v-list>
      </button>
      <button class="but_3">
        <v-list width="100%">
          <v-list-group class="li_2">
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>mdi-menu</v-icon>
              </v-list-item-icon>
            </template>

            <v-list-item @click="">
              <v-list-item-icon>
                <v-icon>mdi-menu</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="tit_1_1">图标</v-list-item-title>
              <v-list-item-action>
                <v-icon>mdi-check</v-icon>
              </v-list-item-action>
            </v-list-item>

            <v-list-item @click="">
              <v-list-item-icon class="tit_1"><v-icon>mdi-format-list-bulleted</v-icon></v-list-item-icon>
              <v-list-item-title class="tit_1_1">列表</v-list-item-title>
            </v-list-item>

          </v-list-group>
        </v-list>
      </button>
    </div>
    <div class="home-content">
      <img src="../assets/empty-all.png" class="empty-img" alt="">
      <div class="empty-header">点击下方模块快速创建</div>
      <!--      <span class="empty-desc is-hidden">请调整上方筛选项</span>-->
      <div class="create-button-wrapper">
        <div class="dbieLX">
          <ul class="createBox" style="width: 480px;">
            <li data-type="prototype" data-disabled="no" class="create-box-item prototype">
              <span class="icon">
                <img class="icon_1" src="../assets/原型图.png" alt="">
              </span>
              <span class="name">原型图</span>
            </li>
            <li data-type="aboard" data-disabled="no" data-beta="false" class="create-box-item aboard">
              <span class="icon">
                <img class="icon_1" src="../assets/UML图.png" alt="">
              </span>
              <span class="name">UML图</span>
            </li>
            <li data-type="profile" data-disabled="no" class="create-box-item profile">
              <span class="icon">
                <img class="icon_1" src="../assets/文档.png" alt="">
              </span>
              <span class="name">文档</span>
            </li>
          </ul>
          <input hidden multiple="" type="file" accept=".sketch">
        </div>
      </div>
      <div class="list-group">
        <div class="list-wrapper">
          <ul class="list-group" style="list-style: none;margin: 0;padding: 0">
            <li class="list-group-item" v-for="item in list">
              <div class="list-group-item-wrapper">
                  <span class="list-group-item-action">
                    <img class="list-group-item-action-img" :src="item.img" alt="">
                  </span>
                <div class="list-group-item-title">
                  <span class="list-group-item-title-text">{{item.name}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import HelloWorld from '../components/HelloWorld'

export default {
  name: 'Home',
  data() {
    return {
      list: [
        {
          name: '原型图',
          img: '../assets/原型图.png',
        },
        {
          name: 'UML图',
          img: '../assets/UML图.png',
        },
        {
          name: '文档',
          img: '../assets/文档.png',
        }
      ]
    }
  }
}
</script>
<style scoped>
.home {
  width: 1060px;
  height: 167px;
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
  flex-flow: column wrap;
  -webkit-box-align: center;
  align-items: center;
  position: fixed;
  left: 42%;
  top: 37%;
  transform: translateY(-80px);
}
.home-content .empty-header {
  font-size: 18px;
  line-height: 16px;
  color: rgb(31, 41, 46);
  margin-top: 8px;
  font-weight: 500;
}
.home-content .empty-desc.is-hidden {
  font-size: 12px;
  line-height: 16px;
  margin-top: 8px;
  color: rgb(79, 79, 79);
  font-weight: 400;
}
.home-content .create-button-wrapper {
  margin-top: 16px;
}
.home-content .empty-img {
  width: 100px;
  height: 100px;
}
.dbieLX .createBox {
  width: 480px;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  justify-content: center;
  margin-top: -10px;
}
.dbieLX .createBox > li {
  padding: 10px;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  cursor: pointer;
}
.dbieLX .createBox > li .icon {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100px;
  height: 80px;
  border-radius: 8px;
  background-color: rgb(242, 242, 242);
}
.dbieLX .createBox > li .icon .icon_1 {
  width: 50%;
  height: 50%;
}
.dbieLX .createBox > li .name {
  font-size: 14px;
  line-height: 16px;
  margin-top: 12px;
  color: rgb(91, 107, 115);
}
.list-group {
  display: flex;
}
.list-group-item {
  margin-right: 52px;
}
.list-group-item-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background-color: rgb(242, 242, 242);
}
.list-group-item-action-img {
  width: 100%;
  height: 100%;
}
.list-group-item-title {
  text-align: center;
}
</style>