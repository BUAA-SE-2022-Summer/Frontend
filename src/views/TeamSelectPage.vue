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
                    <v-card-actions class="text-h6 white--text" style="height: 55px">
                      <v-btn :class="{ 'show-btns': hover }" depressed outlined color="primary"
                        style="border-radius: 4px;height: 35px;position: absolute;left:30px"
                        @click="toProject(project.id)">
                        进入团队
                      </v-btn>
                      <v-btn :class="{ 'show-btns': hover }" depressed outlined
                        style="border-radius: 4px;height: 35px;position: absolute;left:160px"
                        @click="exitProject(project.id)">
                        退出团队
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
              <span>全部团队</span>
              <v-text-field v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="mdi-magnify"
                label="Search" style="position: absolute;left:125px;width:200px;"></v-text-field>
              <template v-if="$vuetify.breakpoint.mdAndUp">
                <v-select v-model="sortBy" flat solo-inverted hide-details :items="keys"
                  prepend-inner-icon="mdi-magnify" label="Sort by" style="position: absolute;left:350px;width:200px;">
                </v-select>
                <v-btn-toggle v-model="sortDesc" mandatory style="position: absolute;left:575px;width:98px;">
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
              <v-col>
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
              </v-col>
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
                    <v-card-actions class="text-h6 white--text" style="height: 55px">
                      <v-btn :class="{ 'show-btns': hover }" depressed outlined color="primary"
                        style="border-radius: 4px;height: 35px;position: absolute;left:30px"
                        @click="toProject(project.id)">
                        进入团队
                      </v-btn>
                      <v-btn :class="{ 'show-btns': hover }" depressed outlined
                        style="border-radius: 4px;height: 35px;position: absolute;left:160px"
                        @click="exitProject(project.id)">
                        退出团队
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </template>

          <template v-slot:footer>
            <v-row class="mt-2" align="center" justify="center">
              <span class="grey--text" style="position: relative;left:1px;top:3px">Items per page</span>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on"
                    style="width: 60px;position: relative;left:-510px;top:-25px">
                    {{ itemsPerPage }}
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(number, index) in itemsPerPageArray" :key="index"
                    @click="updateItemsPerPage(number)">
                    <v-list-item-title>{{ number }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-spacer></v-spacer>

              <span class="mr-4 grey--text" style="position: relative;left:1050px;top:-50px">
                Page {{ page }} of {{ numberOfPages }}
              </span>
              <v-btn fab small dark color="blue darken-3" class="mr-1" @click="formerPage"
                style="position: relative;left: 540px;top: -84px">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab small dark color="blue darken-3" class="ml-1" @click="nextPage"
                style="position: relative;left: 550px;top: -84px">
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
      itemsPerPageArray: [3, 7, 11],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 3,
      sortBy: 'name',
      keys: [
        'team_name',
        'team_manager',
        'member_num',
      ],
      teams: [
        {
          name: '团队一',
          creator: 'actor',
          time: '2000-01-01',
          number: 1,
        },
        {
          name: '团队二',
          creator: 'actor',
          time: '2000-01-01',
          number: 2,
        },
        {
          name: '团队三',
          creator: 'actor',
          time: '2000-01-01',
          number: 3,
        },
        {
          name: '团队四',
          creator: 'actor',
          time: '2000-01-01',
          number: 1,
        },
        {
          name: '团队四',
          creator: 'actor',
          time: '2000-01-01',
          number: 1,
        },
        {
          name: '团队四',
          creator: 'actor',
          time: '2000-01-01',
          number: 1,
        },
        {
          name: '团队四',
          creator: 'actor',
          time: '2000-01-01',
          number: 1,
        },
        {
          name: '团队四',
          creator: 'actor',
          time: '2000-01-01',
          number: 1,
        },
        {
          name: '团队四',
          creator: 'actor',
          time: '2000-01-01',
          number: 1,
        },
      ],
      recentTeams: [
        {
          name: '团队四',
          actor: 'actor',
          time: '2000-01-01',
          number: 1,
        },
        {
          name: '团队四',
          actor: 'actor',
          time: '2000-01-01',
          number: 1,
        },
        {
          name: '团队四',
          actor: 'actor',
          time: '2000-01-01',
          number: 1,
        },
        {
          name: '团队四',
          actor: 'actor',
          time: '2000-01-01',
          number: 1,
        },
      ],
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
  },
}
</script>
