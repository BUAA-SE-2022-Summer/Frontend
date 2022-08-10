<template>
  <div style="">
    <!-- <div style="width: 100vw;height:6vh;background-color: whitesmoke;">
  <router-link to="/">
    <div>
      <img :src="this.logourl" style="width: 30vh;height:6vh;position: absolute;">
      </div>
  </router-link>
  <div style="left:90vh;position: absolute">
    <el-button type="text" icon="el-icon-document"
      style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;">文档</el-button>
  </div>
  <div style="left:105vh;position: absolute">
    <el-button type="text" icon="el-icon-s-platform"
      style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;">原型设计
    </el-button>
  </div>
  <div style="left:123vh;position: absolute">
    <el-button type="text" icon="el-icon-picture"
      style="background-color: whitesmoke;border-color: whitesmoke;height:6vh;position: absolute;">UML绘制
    </el-button>
  </div>
      <div style="position: absolute;left:90vh;height:6vh;background-color: whitesmoke">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select=""
                 style="background-color: whitesmoke;height: 7vh;top:-1vh" text-color="black"
                 active-text-color="red" router>
          <el-menu-item index="/textbustest"><b>文档</b></el-menu-item>
          <el-menu-item index="/prototype"><b>原型设计</b></el-menu-item>
          <el-menu-item index="3"><b>uml绘制</b></el-menu-item>
        </el-menu>
      </div>
  <div style="left:185vh;position: absolute;top:1.5vh"><b>{{ this.username }}</b></div>
  <el-tooltip class="item" effect="dark" :content="this.teamname" placement="bottom">
    <div style="left:42vh;position: absolute;top:1.5vh"><b>当前团队</b></div>
  </el-tooltip>
  <el-tooltip class="item" effect="dark" :content="this.projectname" placement="bottom">
    <div style="left:52vh;position: absolute;top:1.5vh"><b>当前项目</b></div>
  </el-tooltip>
  <el-tooltip class="item" effect="dark" :content="this.now_textname" placement="bottom">
    <div style="left:62vh;position: absolute;top:1.5vh"><b>当前文档</b></div>
  </el-tooltip>
</div> -->
 <!-- 以下为展示过去uml的地方 -->
  <div style="width:80vw;margin: auto;margin-top: 50px;">
    <v-container fluid>
      <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar
            dark
            color="blue darken-3"
            class="mb-1"
          >
            <div>我的UML图</div>
            <v-divider></v-divider>
            <v-btn @click="createNew()">新的UML图</v-btn>
          </v-toolbar>
        </template>
  
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="8"
              md="6"
              lg="4"
            >
              <v-card>
                <v-card-title class="subheading font-weight-bold">
                   <span
                    class="d-inline-block text-truncate"
                    style="max-width: 100px;"
                  >
                  {{ item.xml_name }}
                  </span>
                  <v-divider></v-divider>
                 <v-btn style="background: transparent;" @click="deleteXML(item.xmlID)">删除</v-btn>
                <v-btn style="background: transparent;" @click="modifyXML(item)">编辑</v-btn>
                </v-card-title>
                <div>最后编辑时间：</div>
                <div>{{item.last_modify_time}}</div>
              </v-card>
            </v-col>
          </v-row>
        </template>
  
        <template v-slot:footer>
          <v-row class="mt-2" align="center" justify="center">
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
  
            <v-spacer></v-spacer>
  
            <span
              class="mr-4
              grey--text"
            >
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</div>
</template>
<script>
import qs from 'qs'
export default {
  data(){
    return{
      umlID:0,
      xmlSrc:"try",
      itemsPerPageArray: 8,
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: 'name',
      keys: [
        
      ],
      logourl: 'https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/1.png',
      activeIndex:'3',
      items: [
        {
          name: '第一张',
          xml:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxMjFweCIgaGVpZ2h0PSI2MXB4IiB2aWV3Qm94PSItMC41IC0wLjUgMTIxIDYxIiBjb250ZW50PSImbHQ7bXhmaWxlIGhvc3Q9JnF1b3Q7ZW1iZWQuZGlhZ3JhbXMubmV0JnF1b3Q7IG1vZGlmaWVkPSZxdW90OzIwMjEtMTAtMDdUMDM6MjU6NTEuNDU5WiZxdW90OyBhZ2VudD0mcXVvdDs1LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTVfNykgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzk0LjAuNDYwNi43MSBTYWZhcmkvNTM3LjM2JnF1b3Q7IGV0YWc9JnF1b3Q7eUM3cDVNMGpfaDJ2MFh3NDB3b2UmcXVvdDsgdmVyc2lvbj0mcXVvdDsxNS40LjMmcXVvdDsgdHlwZT0mcXVvdDtlbWJlZCZxdW90OyZndDsmbHQ7ZGlhZ3JhbSBpZD0mcXVvdDtlbVlSU0REUmtEUDJZZDNFWnkzciZxdW90OyBuYW1lPSZxdW90O1BhZ2UtMSZxdW90OyZndDtqWkpCVDRVd0RJQi96YTdtd1NMaVZYdytMNTR3OFR4WlpZdGpJNk04d0Y4dmM1dXdFQk12Vy91MWE3dTJoRmJkZkxHc0Z5K0dneUw1aWMrRVBwSTh6Mjd2c3ZWeVpQR2tLRXNQV2l1NVI2Y04xUElMd3N0SVI4bGhDTXdqTkVhaDdGUFlHSzJod1lReGE4MlV1bjBZbFdidFdRc0hVRGRNUWZMTzBUZkpVWGhhNXNYR24wRzJJbWJPaW50dmVXZk5aMnZOcUVNK2JUUjRTOGRpbUpCeUVJeWJhWWZvbWRES0dvTmU2dVlLbEd0cjJyR25QNnloNUFHWCtJbFlxd1dOLzRvUVAzRmxhZ3d4WG9VY25JczdtSnNDREhoenlEUUppVkQzckhINnRLNEVvUThDTzdWcTJTb2VDd25GWHNFaXpEc1VDcnVBNlFEdHNyb0VhMnpha3FyVE5wd3NNckViVEJFWUMvdlEvZ2JlK3JBS29SVlIzV2J3WTl2dE9EMS9Bdz09Jmx0Oy9kaWFncmFtJmd0OyZsdDsvbXhmaWxlJmd0OyI+PGRlZnMvPjxnPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzAwMDAwMCIgcG9pbnRlci1ldmVudHM9ImFsbCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjUgLTAuNSkiPjxzd2l0Y2g+PGZvcmVpZ25PYmplY3QgcG9pbnRlci1ldmVudHM9Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHJlcXVpcmVkRmVhdHVyZXM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjRXh0ZW5zaWJpbGl0eSIgc3R5bGU9Im92ZXJmbG93OiB2aXNpYmxlOyB0ZXh0LWFsaWduOiBsZWZ0OyI+PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiB1bnNhZmUgY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IHVuc2FmZSBjZW50ZXI7IHdpZHRoOiAxMThweDsgaGVpZ2h0OiAxcHg7IHBhZGRpbmctdG9wOiAzMHB4OyBtYXJnaW4tbGVmdDogMXB4OyI+PGRpdiBzdHlsZT0iYm94LXNpemluZzogYm9yZGVyLWJveDsgZm9udC1zaXplOiAwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsiPjxkaXYgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgZm9udC1zaXplOiAxMnB4OyBmb250LWZhbWlseTogSGVsdmV0aWNhOyBjb2xvcjogcmdiKDAsIDAsIDApOyBsaW5lLWhlaWdodDogMS4yOyBwb2ludGVyLWV2ZW50czogYWxsOyB3aGl0ZS1zcGFjZTogbm9ybWFsOyBvdmVyZmxvdy13cmFwOiBub3JtYWw7Ij5UaGlzIGlzIGEgdGVzdC48L2Rpdj48L2Rpdj48L2Rpdj48L2ZvcmVpZ25PYmplY3Q+PHRleHQgeD0iNjAiIHk9IjM0IiBmaWxsPSIjMDAwMDAwIiBmb250LWZhbWlseT0iSGVsdmV0aWNhIiBmb250LXNpemU9IjEycHgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlRoaXMgaXMgYSB0ZXN0LjwvdGV4dD48L3N3aXRjaD48L2c+PC9nPjxzd2l0Y2g+PGcgcmVxdWlyZWRGZWF0dXJlcz0iaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNFeHRlbnNpYmlsaXR5Ii8+PGEgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNSkiIHhsaW5rOmhyZWY9Imh0dHBzOi8vd3d3LmRpYWdyYW1zLm5ldC9kb2MvZmFxL3N2Zy1leHBvcnQtdGV4dC1wcm9ibGVtcyIgdGFyZ2V0PSJfYmxhbmsiPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTBweCIgeD0iNTAlIiB5PSIxMDAlIj5WaWV3ZXIgZG9lcyBub3Qgc3VwcG9ydCBmdWxsIFNWRyAxLjE8L3RleHQ+PC9hPjwvc3dpdGNoPjwvc3ZnPg==",
        },
        ]
    }
  },
  created(){
    this.get_user_xml()
  },
  
  computed: {
    numberOfPages () {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== `Name`)
    },
  },
  methods: {
    get_user_xml(){
      console.log("拉取xmls")
      this.$axios({
        method: 'post',
        url: '/api/file/get_user_xml ',
        data: qs.stringify({
          
        })
    })
        .then(res => {
        console.log(res.data)
        if (res.data.errno === 0) {
            this.$message.success("获取uml成功");
            this.items=res.data.xml_list
        } else {
            // alert(res.data.msg);
            this.$message.error(res.data.msg);
        }
        })
        .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },
    createNew(){
      console.log("创建新的UML图")
      this.$router.push({path:'/project/uml/design', query:{umlID:this.umlID, xmlSrc:this.xmlSrc}})
    },
    deleteXML(ID){
      this.$axios({
        method: 'post',
        url: '/api/file/delete_xml ',
        data: qs.stringify({
          'xmlID':ID
        })
    })
        .then(res => {
        console.log(res.data)
        if (res.data.errno === 0) {
            this.$message.success("删除uml成功");
        } else {
            // alert(res.data.msg);
            this.$message.error(res.data.msg);
        }
        })
        .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    modifyXML(item){
      this.umlID=item.xmlID
      this.xmlSrc=item.content
      this.$router.push({path:'/project/uml/design', query:{umlID:this.umlID, xmlSrc:this.xmlSrc}})
    }
  },
}
</script>
