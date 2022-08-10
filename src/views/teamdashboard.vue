<template>
  <div id="app">
    <v-app id="inspire">
      <Workspacebanner></Workspacebanner>
      <v-container>
        <v-data-iterator :items="recentTeams" hide-default-footer>
          <template v-slot:header>
            <v-dialog v-model="dialogExit" max-width="500px">
              <v-card>
                <v-card-title class="text-h5 text-center">你确定要退出该团队吗？</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" depressed outlined flat @click="exitTeamOK">
                    确定
                  </v-btn>
                  <v-btn color="blue darken-1" depressed outlined flat @click="close">
                    取消
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-toolbar dark color="blue darken-3" class="mb-1" style="width: 1280px;height: 58px">
              <span>最近查看</span>
            </v-toolbar>
          </template>
          <template v-slot:default="props">
            <v-row>
              <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="3" lg="3">
                <v-hover v-slot="{ hover }">
                  <v-card :elevation="hover ? 15 : 2" style="border-radius: 10px;width: 280px">
                    <v-card-title class="text-h6" style="padding-top: 2px;padding-bottom: 2px">
                      <v-row class="fill-height flex-column" justify="space-between">
                        <p class="mt-4 subheading text-center">
                          {{ item.name }}
                        </p>
                      </v-row>
                    </v-card-title>

                    <v-divider style="margin: 1px"></v-divider>

                    <v-list dense>
                      <v-list-item>
                        <v-icon style="padding-left: 30px;color:lightseagreen">mdi-alphabetical-variant</v-icon>
                        <span style="background-color: white;padding-left: 15px">团队名:</span>
                        <span class="align-end" style="padding-left: 10px">{{ item.team_name }}</span>
                      </v-list-item>
                      <v-list-item>
                        <v-icon style="padding-left: 30px;color:#0086b3">mdi-account-circle-outline</v-icon>
                        <span style="background-color: white;padding-left: 15px">创建人:</span>
                        <span class="align-end" style="padding-left: 10px">{{ item.team_manager }}</span>
                      </v-list-item>
                      <v-list-item>
                        <v-icon style="padding-left: 30px;color:darkseagreen">mdi-account-multiple-outline</v-icon>
                        <span style="background-color: white;padding-left: 15px">团队人数:</span>
                        <span class="align-end" style="padding-left: 10px">{{ item.member_num }}</span>
                      </v-list-item>
                    </v-list>
                    <v-card-actions class="text-h6 white--text" style="height: 55px;display: flex;">
                      <v-btn :class="{ 'show-btns': hover }" depressed outlined color="primary"
                        style="border-radius: 4px;height: 35px;" @click="goTeam(item)">
                        进入团队
                      </v-btn>
                      <v-btn :class="{ 'show-btns': hover }" depressed outlined color="red" style="border-radius: 4px;height: 35px;margin-left: auto;
 order:2" @click="exitTeam(item)">
                        退出团队
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </template>
<!--          <template v-else-if="this.recentTeams.length === 0">-->
<!--            <img src="../assets/noteam.png" alt="" style="padding-left: 44%;">-->
<!--            <div style="padding-left: 48%;">无团队</div>-->
<!--            <div style="padding-left: 43%;font-size: 8px">你最近没有进入任何团队，懈怠了吧！</div>-->
<!--          </template>-->
        </v-data-iterator>
      </v-container>
      <v-container>
        <v-data-iterator :items="teams" :items-per-page.sync="itemsPerPage" :page.sync="page" :search="search"
          :sort-by="sortBy" :sort-desc="sortDesc" hide-default-footer>
          <template v-slot:header>
            <v-dialog v-model="dialogAdd" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">新建团队</v-card-title>
                <v-col>
                  <v-text-field label="团队名称" v-model="addName"></v-text-field>
                </v-col>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                  <v-btn color="blue darken-1" text @click="createTeam">创建</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogExit" max-width="500px">
              <v-card>
                <v-card-title class="text-h5 text-center">你确定要退出该团队吗？</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" depressed outlined flat @click="exitTeamOK">
                    确定
                  </v-btn>
                  <v-btn color="blue darken-1" depressed outlined flat @click="close">
                    取消
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogChooseManager" max-width="500px">
              <v-card>
                <v-card-title class="text-h5 text-center">你需要选择一位成员作为团队管理员</v-card-title>
                <v-select :items="exitUserList" item-text="username" item-value="userID" v-model="userID" label=""
                  placeholder="请选择" hide-details="auto" dense class="mr-4" style="width: 506px"
                  @change="changeManager(userID)">
                  <template #item="{ item }">
                    <Avatar :username="item.username" :background="item.username" color="#fff"
                      style="vert-align: middle; " ::inline="true" />
                    <span style="padding-left: 24px;padding-bottom: 20px;padding-top: 20px">{{ item.username }}</span>
                    <span style="padding-left: 32px;padding-bottom: 20px;padding-top: 20px">邮箱:{{ item.email }}</span>
                  </template>
                </v-select>
              </v-card>
            </v-dialog>
            <v-toolbar dark color="blue darken-3" class="mb-1" style="width: 1280px;height: 58px">
              <span style="float:left;">全部团队</span>
              <v-text-field v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="mdi-magnify"
                label="搜索" style="position: absolute;left:550px;width:200px;"></v-text-field>
              <template v-if="$vuetify.breakpoint.mdAndUp">
                <v-select v-model="sortBy" flat solo-inverted hide-details :items="keys"
                  prepend-inner-icon="mdi-magnify" label="Sort by" style="position: absolute;left:800px;width:200px;">
                </v-select>
                <v-btn depressed color="blue" style="position: absolute;left:120px;" @click="logcreate">
                  <v-icon>mdi-plus</v-icon>
                  <span>新建团队</span>
                </v-btn>
                <v-divider style="margin: 1px"></v-divider>
                <v-btn-toggle v-model="sortDesc" mandatory style="float:right;">
                  <v-btn depressed color="blue" :value="false">
                    <v-icon>mdi-arrow-up</v-icon>
                  </v-btn>
                  <v-btn depressed color="blue" :value="true">
                    <v-icon>mdi-arrow-down</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </template>
            </v-toolbar>
          </template>
          <template v-slot:default="props">
              <v-row>
                <v-col v-for="item in props.items" :key="item.team_name" cols="12" sm="6" md="3" lg="3">
                  <v-hover v-slot="{ hover }">
                    <v-card :elevation="hover ? 15 : 2" style="border-radius: 10px;width: 280px">
                      <v-card-title class="text-h6" style="padding-top: 2px;padding-bottom: 2px">
                        <v-row class="fill-height flex-column" justify="space-between">
                          <p class="mt-4 subheading text-center">
                            {{ item.name }}
                          </p>
                        </v-row>
                      </v-card-title>

                      <v-divider style="margin: 1px"></v-divider>

                      <v-list dense>
                        <v-list-item>
                          <v-icon style="padding-left: 30px;color:lightseagreen">mdi-alphabetical-variant</v-icon>
                          <span style="background-color: white;padding-left: 15px">团队名:</span>
                          <span class="align-end" style="padding-left: 10px">{{ item.team_name }}</span>
                        </v-list-item>
                        <v-list-item>
                          <v-icon style="padding-left: 30px;color:#0086b3">mdi-account-circle-outline</v-icon>
                          <span style="background-color: white;padding-left: 15px">创建人:</span>
                          <span class="align-end" style="padding-left: 10px">{{ item.team_manager }}</span>
                        </v-list-item>
                        <v-list-item>
                          <v-icon style="padding-left: 30px;color:darkseagreen">mdi-account-multiple-outline</v-icon>
                          <span style="background-color: white;padding-left: 15px">团队人数:</span>
                          <span class="align-end" style="padding-left: 10px">{{ item.member_num }}</span>
                        </v-list-item>
                      </v-list>
                      <v-card-actions class="text-h6 white--text" style="height: 55px;display: flex;">
                        <v-btn :class="{ 'show-btns': hover }" depressed outlined color="primary"
                               style="border-radius: 4px;height: 35px;" @click="goTeam(item)">
                          进入团队
                        </v-btn>
                      <v-btn :class="{ 'show-btns': hover }" depressed outlined color="red" style="border-radius: 4px;height: 35px;margin-left: auto;
 order:2" @click="exitTeam(item)">
                          退出团队
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
<!--            <div v-else>-->
<!--              <img src="../assets/noteam.png" alt="" style="padding-left: 44%;">-->
<!--              <div style="padding-left: 48%;">无团队</div>-->
<!--              <div style="padding-left: 43%;font-size: 8px">你还没有团队，快去创建一个吧！</div>-->
<!--            </div>-->
          </template>

          <template v-slot:footer>
            <v-row class="mt-2" align="center" justify="center">
              <div style="display:flex">
                <div class="grey--text" style="float:left">4 Items per page</div>
                <div class="mr-4 grey--text" style="margin-left:auto;float:right">
                  Page {{ page }} of {{ numberOfPages }}
                </div>
              </div>
              <v-btn fab small dark color="blue darken-3" class="mr-1" @click="formerPage">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab small dark color="blue darken-3" class="ml-1" @click="nextPage">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
    </v-app>
  </div>
</template>
<script>
import Workspacebanner from "@/views/Workspacebanner";
import Avatar from "vue-avatar";
import qs from "qs";
export default {
  data() {
    return {

      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'team_name',

      dialogAdd: false,
      addName: '',

      dialogExit: false,
      exitTeamID: '',
      exitTeamCreator: '',
      exitTeamNumber: '',
      userIdentity: '',
      exitUserList: [],
      dialogChooseManager: false,


      keys: [
        'team_name',
        'team_manger',
        'member_num',
      ],
      teams: [],
      recentTeams: [],
    }
  },
  components: {
    Workspacebanner,
    Avatar,
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.teams.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'Name')
    },
  },
  watch: {
    dialogAdd(val) {
      val || this.close()
    },
    dialogLook(val) {
      val || this.close()
    },
    dialogExit(val) {
      val || this.close()
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },
    close() {
      this.dialogAdd = false;
      this.dialogExit = false;
      this.dialogChooseManager = false;
    },
    logcreate() {
      this.dialogAdd = true;
    },
    createTeam() {
      this.$axios({
        method: 'post',
        url: '/api/team/create_team',
        data: this.$qs.stringify({
          team_name: this.addName,
        }
        )
      })
          .then(res => {
            // this.teams.push({
            //   teamID: res.data.teamID,
            //   team_name: this.addName,
            //   create_time: res.data.create_time,
            //   creator: res.data.creator,
            // })
            this.$axios.post(
                '/api/team/show_my_team_list'
            ).then(res => {
              this.teams = res.data.team_list;
            })
                .catch(err => {
                  console.log(err);
                });
            if (res.data.errno === 0) {
              this.$message.success("创建团队成功");
            } else {
              this.$message.error("创建团队失败");
            }

            this.$axios.post(
                '/api/team/recently_used_teams'
            ).then(res => {
              this.recentTeams = res.data.team_list;
              console.log("最近查看团队"+this.recentTeams);
              // this.recentTeams = res.data.team_list.slice(0, 4);
            }).catch(err => {
              console.log(err);
            });
          })
          .catch(err => {
            console.log(err);
          });
      this.close();
      this.addName = '';
    },
    goTeam(item) {
      sessionStorage.setItem('TeamID', JSON.stringify(item.teamID));
      console.log("选择的团队id为: " + item.teamID);
      sessionStorage.setItem('TeamName', JSON.stringify(item.team_name));
      console.log("选择的团队名为: " + item.team_name);
      this.$router.push('/projectdashboard');
    },
    // queryTeam(item) {
    //   this.dialogLook = true;
    //   this.teamName = item.team_name;
    //   this.teamCreator = item.team_manager;
    //   this.teamNumber = item.member_num;
    // },
    // dialogLookOK() {
    //   this.dialogLook = false;
    //   this.teamName = '';
    //   this.teamCreator = '';
    //   this.teamNumber = '';
    // },
    exitTeam(item) {
      this.dialogExit = true;
      this.exitTeamID = item.teamID;
      this.exitTeamCreator = item.team_manager;
      this.exitTeamNumber = item.member_num;
      this.userIdentity = item.is_creator;
    },
    exitTeamOK() {
      console.log("退出团队id为: " + this.exitTeamID);
      console.log("退出团队创建者为: " + this.exitTeamCreator);
      if (this.exitTeamNumber > 2 && this.userIdentity) {
        this.$axios({
          method: 'post',
          url: '/api/team/get_team_info',
          data: this.$qs.stringify({
            teamID: this.exitTeamID,
          }
          )
        })
          .then(res => {
            if (res.data.errno === 0) {
              this.exitUserList = res.data.user_list;
              this.dialogExit = false;
              this.dialogChooseManager = true;
            } else {
              this.$message.error("获取团队信息失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$axios({
          method: 'post',
          url: '/api/team/leave_team',
          data: this.$qs.stringify({
            teamID: this.exitTeamID,
          }
          )
        })
          .then(res => {
            if (res.data.errno === 0) {
              this.$message.success(res.data.msg);
            } else {
              this.$message.error("退出团队失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
        this.close();
        this.$axios.post(
          '/api/team/show_my_team_list'
        ).then(res => {
          this.teams = res.data.team_list;
        });
        this.$axios.post(
          '/api/team/recently_used_teams'
        ).then(res => {
          this.recentTeams = res.data.team_list;
          console.log("最近查看团队" + this.recentTeams);
          // this.recentTeams = res.data.team_list.slice(0, 4);
        }).catch(err => {
          console.log(err);
        });
      }
    },
    changeManager(userID) {
      console.log("选择的团队管理员为: " + userID);
      this.$axios({
        method: 'post',
        url: '/api/team/leave_team',
        data: this.$qs.stringify({
          teamID: this.exitTeamID,
          successorID: userID,
        }
        )
      })
        .then(res => {
          if (res.data.errno === 0) {
            this.$message.success(res.data.msg);
          } else {
            this.$message.error("退出团队失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogChooseManager = false;
      this.$axios.post(
        '/api/team/show_my_team_list'
      ).then(res => {
        this.teams = res.data.team_list;
      });
      this.$axios.post(
        '/api/team/recently_used_teams'
      ).then(res => {
        this.recentTeams = res.data.team_list;
        console.log("最近查看团队" + this.recentTeams);
        // this.recentTeams = res.data.team_list.slice(0, 4);
      }).catch(err => {
        console.log(err);
      });
    }
  },

  created() {
    this.$axios.post(
      '/api/team/show_my_team_list'
    ).then(res => {
      this.teams = res.data.team_list;
    });
    // 获取team_list的最近团队4个
    this.$axios.post(
      '/api/team/recently_used_teams'
    ).then(res => {
      this.recentTeams = res.data.team_list;
      console.log("最近查看团队" + this.recentTeams);
      // this.recentTeams = res.data.team_list.slice(0, 4);
    }).catch(err => {
      console.log(err);
    });
  }
}
</script>
