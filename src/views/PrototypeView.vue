<template>
  <div>
    <!-- <div>
      <v-card class="mx-auto" max-width="300" tile>
        <v-list dense>
          <v-subheader>页面列表</v-subheader>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div> -->
    <div class="Prototype">
      <Toolbar />

      <main>
        <!-- 左侧组件列表 -->
        <section class="left" overflow:auto>
          <PageList :nameList=namelist />
          <ComponentList />
          <RealTimeComponentList />
        </section>
        <!-- 中间画布 -->
        <section class="center">
          <div class="content" @drop="handleDrop" @dragover="handleDragOver" @mousedown="handleMouseDown"
            @mouseup="deselectCurComponent">
            <Editor />
          </div>
        </section>
        <!-- 右侧属性列表 -->
        <section class="right">
          <el-tabs v-if="curComponent" v-model="activeName">
            <el-tab-pane label="属性" name="attr">
              <component :is="curComponent.component + 'Attr'" />
            </el-tab-pane>
            <el-tab-pane label="动画" name="animation" style="padding-top: 20px;">
              <AnimationList />
            </el-tab-pane>
            <el-tab-pane label="事件" name="events" style="padding-top: 20px;">
              <EventList />
            </el-tab-pane>
          </el-tabs>
          <CanvasAttr v-else></CanvasAttr>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/Editor/index'
import ComponentList from '@/components/ComponentList' // 左侧列表组件
import PageList from '@/components/PageList' // 左侧页面列表组件
import AnimationList from '@/components/AnimationList' // 右侧动画列表
import EventList from '@/components/EventList' // 右侧事件列表
import componentList from '@/custom-component/component-list' // 左侧列表数据
import Toolbar from '@/components/Toolbar'
import { deepCopy } from '@/utils/utils'
import { mapState } from 'vuex'
import generateID from '@/utils/generateID'
import { listenGlobalKeyDown } from '@/utils/shortcutKey'
import RealTimeComponentList from '@/components/RealTimeComponentList'
import CanvasAttr from '@/components/CanvasAttr'

export default {
  components: { Editor, ComponentList, AnimationList, EventList, Toolbar, RealTimeComponentList, CanvasAttr, PageList },
  data() {
    return {
      activeName: 'attr',
      reSelectAnimateIndex: undefined,
      namelist: [],
      socket: null,
      connectCount: 0,
      heartInterval: null,
    }
  },
  computed: mapState([
    'componentData',
    'curComponent',
    'isClickComponent',
    'canvasStyleData',
    'editor',
  ]),
  created() {
    this.restore()
    // 全局监听按键事件
    listenGlobalKeyDown()
    this.initSocket()
  },
  methods: {

    /**
     * 建立连接是http
     * 消息推送都是tcp连接，没有同源限制
     * 服务端人员try catch 消息推送不成功，则关闭连接
     */
    initSocket() {
      // 建立连接 （线上环境）
      const url = `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/socket`
      this.socket = new WebSocket(`${url}/meeting/wsServer/PC-${this.$store.getters.userId}`)

      this.socket.onmessage = (evt) => {
        if (evt.data === '连接成功' || evt.data.includes('refresh')) {
          this.heartCheck() // 重置心跳检测
          // this.onRefresh() // 接收到推送消息，刷新列表
        }
      }
      // 监听窗口事件，当窗口关闭时，主动断开websocket连接
      window.onbeforeunload = () => {
        this.socket.close()
        this.heartInterval && clearTimeout(this.heartInterval)
      }
    },
    /**
     * 定时发送心跳包
     * 59s发送一次心跳，比nginx设置的最大连接时间短一点，以达到在临界点重置连接时间
     */
    heartCheck() {
      const that = this
      this.heartInterval && clearTimeout(this.heartInterval)
      this.heartInterval = setInterval(() => {
        if (this.socket.readyState === 1) { // 连接状态
          this.socket.send('ping')
        } else {
          that.connectCount += 1
          if (that.connectCount <= 5) {
            this.initSocket() // 断点重连5次
          }
        }
      }, 59 * 1000)
    },

    /**
     * 从后端获取数据初始化页面
     */
    restore() {
      let teamID = JSON.parse(sessionStorage.getItem('TeamID'));
      let projectID = JSON.parse(sessionStorage.getItem('ProjectID'));
      let prototypeID = JSON.parse(sessionStorage.getItem('prototypeID'));
      let fatherID = JSON.parse(sessionStorage.getItem('project_root_fileID'));
      console.log("open_prototype 时的teamID: " + teamID);
      console.log("open_prototype 时的projectID: " + projectID);
      console.log("open_prototype 时的prototypeID: " + prototypeID);
      console.log("open_prototype 时的fatherID:" + fatherID);
      this.$axios.post(
        '/api/prototype/open_prototype',
        this.$qs.stringify({
          teamID: teamID,
          projectID: projectID,
          fatherID: fatherID,
          prototypeID: prototypeID,
        })
      ).then(response => {
        console.log("打开原型图的后端反馈 ", response.data);
        this.namelist = response.data.namelist;
        // 获取namelist的第一项
        let firstItem = this.namelist[0];
        console.log("debug: 打开原型图时存储首页的pageID: " + firstItem.pageID);
        sessionStorage.setItem('pageID', JSON.stringify(firstItem.pageID));
        console.log("debug: 打开原型图时的first_componentdata: ");
        console.log(response.data.first_component);
        console.log("debug: 打开原型图时的first_canvasStyle: ");
        console.log(response.data.first_canvasStyle);
        this.$store.commit('setComponentData', JSON.parse(response.data.first_component));
        this.$store.commit('setCanvasStyle', JSON.parse(response.data.first_canvasStyle));
      }).catch(err => {
        console.error(err);
      })
      // // 用保存的数据恢复画布
      // if (localStorage.getItem('canvasData')) {
      //   this.$store.commit('setComponentData', JSON.parse(localStorage.getItem('canvasData')))
      // }

      // if (localStorage.getItem('canvasStyle')) {
      //   this.$store.commit('setCanvasStyle', JSON.parse(localStorage.getItem('canvasStyle')))
      // }
    },

    handleDrop(e) {
      e.preventDefault()
      e.stopPropagation()
      const index = e.dataTransfer.getData('index')
      const rectInfo = this.editor.getBoundingClientRect()
      if (index) {
        const component = deepCopy(componentList[index])
        component.style.top = e.clientY - rectInfo.y
        component.style.left = e.clientX - rectInfo.x
        component.id = generateID()
        this.$store.commit('addComponent', { component })
        this.$store.commit('recordSnapshot')
      }
    },

    handleDragOver(e) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },

    handleMouseDown(e) {
      e.stopPropagation()
      this.$store.commit('setClickComponentStatus', false)
      this.$store.commit('setInEditorStatus', true)
    },

    deselectCurComponent(e) {
      if (!this.isClickComponent) {
        this.$store.commit('setCurComponent', { component: null, index: null })
      }

      // 0 左击 1 滚轮 2 右击
      if (e.button != 2) {
        this.$store.commit('hideContextMenu')
      }
    },
  },
}
</script>

<style lang="scss">
.Prototype {
  height: 100vh;
  background: #fff;

  main {
    height: calc(100% - 64px);
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;

      &>div {
        overflow: auto;

        &:first-child {
          border-bottom: 1px solid #ddd;
        }
      }
    }

    .right {
      position: absolute;
      height: 100%;
      width: 288px;
      right: 0;
      top: 0;

      .el-select {
        width: 100%;
      }
    }

    .center {
      margin-left: 200px;
      margin-right: 288px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }

  .global-attr {
    padding: 10px;
  }
}
</style>
