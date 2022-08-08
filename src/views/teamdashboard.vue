<template>
  <div id="app">
    <v-app id="inspire">
      <Workspacebanner></Workspacebanner>
      <v-container>
        <v-data-iterator :items="recentTeams" hide-default-footer>
          <template v-slot:header>
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
                      <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                        <v-list-item-content style="padding-left: 35px">
                          {{ key}}:
                        </v-list-item-content>
                        <v-list-item-content>
                          {{item[key.toLowerCase()] }}
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                    <v-card-actions class="text-h6 white--text" style="height: 55px;display: flex;">
                      <v-btn :class="{ 'show-btns': hover }" depressed outlined color="primary"
                             style="border-radius: 4px;height: 35px;" @click="goTeam(item)">
                        进入团队
                      </v-btn>
                      <v-btn :class="{ 'show-btns': hover }" depressed outlined style="border-radius: 4px;height: 35px;margin-left: auto;
 order:2" @click="queryTeam(item)">
                        查看团队信息
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
      <v-container>
        <v-data-iterator :items="teams" :items-per-page.sync="itemsPerPage" :page.sync="page" :search="search"
                         :sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc" hide-default-footer>
          <template v-slot:header>
            <v-dialog v-model="dialogAdd" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">新建团队</v-card-title>
                <v-col>
                  <v-text-field label="项目名称" v-model="addName"></v-text-field>
                </v-col>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                  <v-btn color="blue darken-1" text @click="createTeam">创建</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!--查询团队信息的界面-->
            <v-dialog v-model="dialogLook" width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">团队信息</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6" lg="6">
                        <v-text-field
                            v-model="teamName"
                            label="团队名称"
                            required
                            readonly
                            style="border-radius: 4px;height: 35px;"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" lg="6">
                        <v-text-field
                            v-model="teamIntroduce"
                            label="团队介绍"
                            required
                            readonly
                            style="border-radius: 4px;height: 35px;"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" depressed outlined flat @click="dialogLookOK">
                    关闭
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-toolbar dark color="blue darken-3" class="mb-1" style="width: 1280px;height: 58px">
              <span style="float:left;">全部团队</span>
              <v-text-field v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="mdi-magnify"
                            label="Search" style="position: absolute;left:550px;width:200px;"></v-text-field>
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
                      <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                        <v-list-item-content :class="{ 'blue--text': sortBy === key }" style="padding-left: 35px">
                          {{ key }}:
                        </v-list-item-content>
                        <v-list-item-content class="align-end" :class="{ 'blue--text': sortBy === key }">
                          {{ item[key.toLowerCase()] }}
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                    <v-card-actions class="text-h6 white--text" style="height: 55px;display: flex;">
                      <v-btn :class="{ 'show-btns': hover }" depressed outlined color="primary"
                             style="border-radius: 4px;height: 35px;" @click="goTeam(item)">
                        进入团队
                      </v-btn>
                      <v-btn :class="{ 'show-btns': hover }" depressed outlined style="border-radius: 4px;height: 35px;margin-left: auto;
 order:2" @click="queryTeam(item)">
                        查看团队信息
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
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
import qs from "qs";
export default {
  data() {
    return {
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'name',

      dialogAdd: false,
      addName: '',

      dialogLook: false,
      teamName: '',
      teamIntroduce: '',


      keys: [
        'team_name',
        'team_manager',
        'member_num',
      ],
      teams: [],
      recentTeams: [],
    }
  },
  components: {
    Workspacebanner,
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
      this.dialogAdd = false
    },
    logcreate () {
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
              // 获取team_list的最近团队4个
              this.recentTeams = res.data.team_list.slice(0, 4);
            })
                .catch(err => {
                  console.log(err);
                });
            if (res.data.errno === 0) {
              this.$message.success("创建团队成功");
            } else {
              this.$message.error("创建团队失败");
            }
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
    queryTeam(item) {
      this.dialogLook = true;
      this.teamName = item.team_name;
    },
    dialogLookOK() {
      this.dialogLook = false;
      this.teamName = '';
    },
  },
  created() {
    this.$axios.post(
      '/api/team/show_my_team_list'
    ).then(res => {
      this.teams = res.data.team_list;
      // 获取team_list的最近团队4个
      this.recentTeams = res.data.team_list.slice(0, 4);
    });
  }
}
</script>
