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
                          {{ key }}:
                        </v-list-item-content>
                        <v-list-item-content>
                          {{ item[key.toLowerCase()] }}
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                    <v-card-actions class="text-h6 white--text" style="height: 55px display: flex;">
                      <v-btn :class="{ 'show-btns': hover }" depressed outlined color="primary"
                        style="border-radius: 4px;height: 35px;" @click="goTeam(item)">
                        进入团队
                      </v-btn>
                      <v-btn :class="{ 'show-btns': hover }" depressed outlined style="border-radius: 4px;height: 35px;margin-left: auto;
 order:2" @click="exitProject(project.id)">
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
            <v-toolbar dark color="blue darken-3" class="mb-1" style="width: 1280px;height: 58px">
              <span style="float:left;">全部团队</span>
              <v-text-field v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="mdi-magnify"
                label="Search" style="position: absolute;left:125px;width:200px;"></v-text-field>
              <template v-if="$vuetify.breakpoint.mdAndUp">
                <v-select v-model="sortBy" flat solo-inverted hide-details :items="keys"
                  prepend-inner-icon="mdi-magnify" label="Sort by" style="position: absolute;left:350px;width:200px;">
                </v-select>
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
              <!-- <v-col>
                <v-hover v-slot="{ hover }">
                  <v-card :elevation="hover ? 15 : 2" height="252px" width="280px" style="border-radius: 10px;">
                    <v-img style="border-radius: 10px;">
                      <v-card-title class="text-h6" style="padding-top: 2px;padding-bottom: 2px">
                        <v-row class="fill-height flex-column" justify="space-between">
                          <p class="mt-4 subheading text-center">
                            新建团队
                          </p>
                        </v-row>
                      </v-card-title>
                      <v-card-actions class="text-h6" style="padding-left:87px">
                        <v-btn class="text-h6" style="width:100px;height: 100px;" @click="newTeam">
                          <v-icon large class="mr-2" style="font-size: 10px">
                            mdi-plus
                          </v-icon>
                        </v-btn>
                      </v-card-actions>
                      <v-card-text class="text-center" style="padding: 2px">点击上方新建按钮创建团队</v-card-text>
                    </v-img>
                  </v-card>
                </v-hover>
              </v-col> -->
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
                    <v-card-actions class="text-h6 white--text" style="height: 55px display: flex;">
                      <v-btn :class="{ 'show-btns': hover }" depressed outlined color="primary"
                        style="border-radius: 4px;height: 35px;" @click="goTeam(item)">
                        进入团队
                      </v-btn>
                      <v-btn :class="{ 'show-btns': hover }" depressed outlined style="border-radius: 4px;height: 35px;margin-left: auto;
 order:2" @click="exitProject(project.id)">
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
export default {
  data() {
    return {
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'name',
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
    goTeam(item) {
      sessionStorage.setItem('TeamID', JSON.stringify(item.TeamID));
      this.$router.push('');
    }
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
