<template>
  <div>
    <div style="width: 1540px;height:6vh;background-color: whitesmoke;">
      <router-link to="/">
        <div><img :src="this.logourl" style="width: 20vh;height:6vh;position: absolute;"></div>
      </router-link>
      <div style="left:25vh;position: absolute">
        <el-button type="text" icon="el-icon-arrow-left"
          style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;" @click="returnbefore">返回</el-button>
      </div>
      <div style="left:90vh;position: absolute">
        <el-button type="text" icon="el-icon-s-claim"
          style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;" @click="toProject">项目管理</el-button>
      </div>
      <div style="left:110vh;position: absolute">
        <el-button type="text" icon="el-icon-user-solid"
          style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;" @click="toMem">成员管理</el-button>
      </div>
      <router-link :to="{ path: '/filetreetry' }" target="_blank" rel="opener">
      <div style="left:130vh;position: absolute">
        <el-button type="text" icon="el-icon-user-solid"
                   style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;" @click="">团队文档中心</el-button>
      </div></router-link>
      <!-- <div style="left:123vh;position: absolute"><el-button type="text" icon="el-icon-picture" style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;">UML绘制</el-button></div>-->
      <div style="left:175vh;position: absolute"><img :src="this.userhead"
          style="border-radius: 50%;width: 6vh;height: 6vh"></div>
      <div style="left:185vh;position: absolute;top:1.5vh"><b>{{ this.username }}</b></div>


      <div style="position: absolute;left:42vh;top: 1.5vh"><span>当前团队:</span></div>
      <div style="width:110px;position: absolute;left:52vh;top:0.9vh">
        <v-select
            :items="teams"
            item-text="team_name"
            item-value="teamID"
            v-model="teamid"
            label=""
            placeholder="选择团队"
            hide-details="auto"
            dense
            class="mr-4"
            @change="changeteam(teamid)"
        >
          <template #item="{item}">
            <Avatar :username="item.team_name" :background="item.team_name" color="#fff" style="vert-align: middle; " ::inline="true" />
            <span style="padding-left: 20px;padding-bottom: 20px;padding-top: 20px">{{ item.team_name }}</span>
          </template>
        </v-select>
      </div>
      <!--      <v-btn style="left:60vh;position: absolute;top:0.6vh" @click="showteam=!showteam" depressed>-->
      <!--        <span>{{this.teamname}}</span>-->
      <!--        <v-icon>{{ showteam ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>-->
      <!--        <div v-show="showteam" style="position: absolute;top:18vh;left:13vh">-->
      <!--          <v-card class="mx-auto" outlined max-width="300" tile>-->
      <!--            <v-list flat>-->
      <!--              <v-subheader>团队列表</v-subheader>-->
      <!--              <v-list-item-group v-model="selectedItem" color="primary">-->
      <!--                <v-list-item v-for="(item, i) in items" :key="i" @click="changeteam(item)">-->

      <!--                  <Avatar :username="item.name" :backgroundcolor="item.name" color="#fff"-->
      <!--                          style="vertical-align: middle;" :inline="true" />-->
      <!--                  &nbsp;&nbsp;&nbsp;&nbsp;-->

      <!--                  <v-list-item-content two-line>-->
      <!--                    <v-list-item-title v-text="item.name"></v-list-item-title>-->
      <!--                  </v-list-item-content>-->

      <!--                </v-list-item>-->
      <!--              </v-list-item-group>-->
      <!--            </v-list>-->
      <!--          </v-card>-->
      <!--        </div>-->
      <!--      </v-btn>-->
      <!--      <v-btn style="left:60vh;position: absolute;top:0.6vh" @click="showteam=!showteam" depressed>-->
      <!--        <span>{{this.teamname}}</span>-->
      <!--        <v-icon>{{ showteam ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>-->
      <!--        <div v-show="showteam" style="position: absolute;top:18vh;left:13vh">-->
      <!--          <v-card class="mx-auto" outlined max-width="300" tile>-->
      <!--                  &nbsp;&nbsp;&nbsp;&nbsp;-->

      <!--                  <v-list-item-content two-line>-->
      <!--                    <v-list-item-title v-text="item.name"></v-list-item-title>-->
      <!--                  </v-list-item-content>-->

      <!--                </v-list-item>-->
      <!--              </v-list-item-group>-->
      <!--            </v-list>-->
      <!--          </v-card>-->
      <!--        </div>-->
      <!--      </v-btn>-->

      <!--<el-tooltip class="item" effect="dark" :content="this.now_textname" placement="bottom"><div style="left:62vh;position: absolute;top:1.5vh"><b>当前文档</b></div></el-tooltip>-->
    </div>
  </div>
</template>

<script>
import Avatar from "vue-avatar";
import qs from "qs";
export default {
  name: "Projectlevelbanner",
  components: {
    Avatar
  },
  data() {
    return {
      editor1: null,
      newContent: '',
      logourl: 'https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/1.png',
      userhead: '',
      username: '',
      teamname: JSON.parse(sessionStorage.getItem('TeamName')),
      teamid: JSON.parse(sessionStorage.getItem('TeamID')),
      textdata: [
      ],
      now_id: 0,
      now_textname: '',
      ifnew: 0,
      inputname: '',

      select: 'cwcw',
      selectedItem: 1,
      showteam: false,

      teams: [
      ],
      items: [
      ],
    }
  },
  created() {
    this.$axios.get('/api/user/get_user_info ').then(
      res => {
        this.userhead = res.data.data.img;
        this.username = res.data.data.username;
        console.log(this.userhead)
      }
    );
    this.$axios.post(
        '/api/team/show_my_team_list'
    ).then(res => {
      console.log(res.data);
      this.teams = res.data.team_list;
      console.log('团队信息:'+this.teams);
    }).catch(err => {
          console.log(err);
        }
    );
  },
  methods:{
    changeteam(teamid){
      console.log(teamid);
      sessionStorage.setItem('TeamID', JSON.stringify(teamid));
      //页面刷新
      window.location.reload();
      this.changeproject(teamid);
    },
    changeproject(teamid) {
      this.$axios({
        method: 'post',
        url: '/api/project/get_project_list',
        data: qs.stringify({
          teamID: teamid,
        })
      })
          .then(res => {
            console.log(res.data)
            if (res.data.errno === 0) {
              this.$message.success("切换团队成功");
              // console.log(res.data)
              this.items = res.data.project_list;
              if(this.items.length>0){
                console.log("当前团队的项目为"+this.items);
              }else{
                console.log("当前团队没有项目");
              }
            } else {
              alert(res.data.msg);
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
    },
    toProject(){
      console.log("跳转到项目层")
      this.$router.push("/projectdashboard")
    },
    toMem(){
      console.log("跳转到成员管理")
      this.$router.push("/memberMain")
    },
    tofilecenter(){
      console.log("跳转到文档中心");
      sessionStorage.setItem('now_textid',JSON.stringify(0));
      this.$router.push("/filetreetry");
    },
    returnbefore(){
      this.$router.go(-1);
    },
  },

}
</script>

<style scoped>
</style>
