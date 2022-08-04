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
              <img src="../../assets/logo.svg" alt="">
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
              <v-list-item-icon class="tit_1">
                <v-icon>mdi-menu</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="tit_1_1">图标</v-list-item-title>
              <v-list-item-action>
                <v-icon>mdi-check</v-icon>
              </v-list-item-action>
            </v-list-item>

            <v-list-item @click="">
              <v-list-item-icon class="tit_1">
                <v-icon>mdi-format-list-bulleted</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="tit_1_1">列表</v-list-item-title>
            </v-list-item>

          </v-list-group>
        </v-list>
      </button>
    </div>
    <div class="home-content">
      <div v-if="(!hasTeam) && (!hasProject) && (!hasFile)">
        <img src="../../assets/empty-star.svg" class="empty-img empty-join-img" alt=""
          style="margin-left: 260px;margin-top: 70px">
        <div class="empty-header" style="font-size: 18px;
  line-height: 16px;
  color: rgb(31, 41, 46);
  margin-top: 8px;
  margin-left: 300px;
  font-weight: 500;">无团队</div>
        <span class="empty-desc is-show" style="margin-left: 220px;font-size: 12px">在新建中创建属于你的团队吧</span>
      </div>
      <div v-else-if="(hasTeam) && (!hasProject) && (!hasFile)">
        <img src="../../assets/empty-star.svg" class="empty-img empty-join-img" alt=""
          style="margin-left: 260px;margin-top: 70px">
        <div class="empty-header" style="font-size: 18px;
  line-height: 16px;
  color: rgb(31, 41, 46);
  margin-top: 8px;
  margin-left: 300px;
  font-weight: 500;">无项目</div>
        <span class="empty-desc is-show" style="margin-left: 270px;font-size: 12px">点击新建创建项目吧</span>
      </div>
      <div v-else-if="(hasTeam) && (hasProject) && (!hasFile)">
        <img src="../../assets/empty-all.png" class="empty-img" alt="">
        <div class="empty-header">点击下方模块快速创建</div>
        <div class="create-button-wrapper">
          <div class="dbieLX">
            <ul class="createBox" style="width: 480px;">
              <li data-type="prototype" data-disabled="no" class="create-box-item prototype" @click="create_1">
                <span class="icon">
                  <img class="icon_1" src="../../assets/原型图.png" alt="">
                </span>
                <span class="name">原型图</span>
              </li>
              <li data-type="aboard" data-disabled="no" data-beta="false" class="create-box-item aboard">
                <span class="icon">
                  <img class="icon_1" src="../../assets/UML图.png" alt="">
                </span>
                <span class="name">UML图</span>
              </li>
              <li data-type="profile" data-disabled="no" class="create-box-item profile">
                <span class="icon">
                  <img class="icon_1" src="../../assets/文档.png" alt="">
                </span>
                <span class="name">文档</span>
              </li>
            </ul>
            <input hidden multiple="" type="file" accept=".sketch">
          </div>
        </div>
      </div>
      <div v-else>
        <v-row class="fill-height" align="center" justify="center">
          <template v-for="(item, i) in items">
            <v-col :key="i" cols="12" md="3">
              <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" style="padding: 0 0 0 0;">
                  <v-img :src="item.img" width="250px" height="225px" style="border-radius: 10px;">
                    <v-card-title class="text-h6 white--text">
                      <v-row class="fill-height flex-column" justify="space-between">
                        <p class="mt-4 subheading text-left">
                          {{ item.title }}
                        </p>

                        <div>
                          <p class="ma-0 text-body-1 font-weight-bold font-italic text-left">
                            {{ item.text }}
                          </p>
                          <p class="text-caption font-weight-medium font-italic text-left">
                            {{ item.subtext }}
                          </p>
                        </div>

                        <div class="align-self-center">
                          <v-btn v-for="(icon, index) in icons" :key="index" :class="{ 'show-btns': hover }"
                            :color="transparent" icon style="border-radius: 50%">
                            <v-icon :class="{ 'show-btns': hover }" :color="transparent">
                              {{ icon }}
                            </v-icon>
                          </v-btn>
                        </div>
                      </v-row>
                    </v-card-title>
                  </v-img>
                </v-card>
              </v-hover>
            </v-col>
          </template>
        </v-row>
      </div>
      <!--        <div class="list-group">-->
      <!--          <div class="list-wrapper">-->
      <!--            <ul class="list-group" style="list-style: none;margin: 0;padding: 0">-->
      <!--              <button class="list-group-btn" @click="">-->
      <!--                <li class="list-group-item" v-for="item in list">-->
      <!--                  <div class="list-group-item-wrapper">-->
      <!--                    <span class="list-group-item-action">-->
      <!--                      <img class="list-group-item-action-img" :src="item.img" alt="">-->
      <!--                    </span>-->
      <!--                    <div class="list-group-item-title">-->
      <!--                      <span class="list-group-item-title-text">{{item.name}}</span>-->
      <!--                    </div>-->
      <!--                  </div>-->
      <!--                </li>-->
      <!--              </button>-->
      <!--            </ul>-->
      <!--          </div>-->
      <!--        </div>-->
    </div>
  </div>
</template>

<script>

import qs from "qs";

export default {
  name: 'Home',
  data() {
    return {
      active: true,
      hasTeam: true,
      hasProject: true,
      hasFile: true,
      teams: [],
      projects: [],
      files: [],
      list: [
      ],
      icons: ['mdi-rewind', 'mdi-play', 'mdi-fast-forward'],
      items: [
        {
          title: '原型图',
          text: `It's New Release Friday`,
          subtext: 'Newly released songs. Updated daily.',
          img: 'https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3264&q=80',
        },
        {
          title: 'UML图',
          text: 'Greatest Rock Hits',
          subtext: 'Lose yourself in rock tunes.',
          img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        },
        {
          title: '文档',
          text: 'Ambient Bass',
          subtext: 'Chill beats to mellow you out.',
          img: 'https://images.unsplash.com/photo-1542320868-f4d80389e1c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80',
        },
        {
          title: '原型图',
          text: `It's New Release Friday`,
          subtext: 'Newly released songs. Updated daily.',
          img: 'https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3264&q=80',
        },
        {
          title: 'UML图',
          text: 'Greatest Rock Hits',
          subtext: 'Lose yourself in rock tunes.',
          img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        },
        {
          title: '文档',
          text: 'Ambient Bass',
          subtext: 'Chill beats to mellow you out.',
          img: 'https://images.unsplash.com/photo-1542320868-f4d80389e1c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80',
        },
      ],
      txts:[],
      transparent: 'rgba(255, 255, 255, 0)',
      projectid:0,
    }
  },
  created() {
    this.projectid = sessionStorage.getItem('ProjectID');
    this.$axios({
      method: 'post',           /* 指明请求方式，可以是 get 或 post */
      url: '/file/project_root_filelist',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
      data: qs.stringify({
        projectID:this.projectid,
      })
    })
        .then(res => {/* res 是 response 的缩写 */
          if (res.data.errno === 0) {
            this.txt=res.data.filelist;
            this.$message.success("获取文件列表成功");
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
  },
  // created() {
  //   this.$axios({
  //     method: 'post',
  //     url: '/team/show_my_team_list',
  //   })
  //     .then(res => {
  //       if(res.data.team_list.length === 0) {
  //         this.hasTeam = false;
  //       } else {
  //         this.hasTeam = true;
  //         this.teams = res.data.team_list;
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // },
  methods: {
    create_1() {
      this.list.push({
        name: '原型图',
        img: '../../assets/原型图.png'
      })
      this.hasFile = true;
      alert('test')
    },
    hasproject() {
      this.$axios({
        method: 'post',
        url: '/project/get_project_list',
      })
        .then(res => {
          if (res.data.project_list.length === 0) {
            this.hasProject = false;
          } else {
            this.hasProject = true;
            this.projects = res.data.project_list;
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    hasfile() {
      this.$axios({
        method: 'post',
        url: '/file/get_file_list',
      })
        .then(res => {
          if (res.data.file_list.length === 0) {
            this.hasFile = false;
          } else {
            this.hasFile = true;
            this.files = res.data.file_list;
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
  }
}
</script>
<style scoped>
.home {
  width: 1096px;
  height: 167px;
  position: fixed;
  top: 2px;
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
  top: 2px;
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
  margin-left: 150px;
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
  margin-left: 176px;
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

.dbieLX .createBox>li {
  padding: 10px;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  cursor: pointer;
}

.dbieLX .createBox>li .icon {
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

.dbieLX .createBox>li .icon .icon_1 {
  width: 50%;
  height: 50%;
}

.dbieLX .createBox>li .name {
  font-size: 14px;
  line-height: 16px;
  margin-top: 12px;
  color: rgb(91, 107, 115);
}

.list-group {
  display: flex;
}

.list-group-btn {
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

.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
  margin-left: 18px;
}
</style>
