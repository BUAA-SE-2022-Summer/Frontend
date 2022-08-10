<template>
  <div>
    <div class="Prototype">


      <main>
        <!-- 左侧组件列表 -->
        <!-- <section class="left" overflow:auto>
          <PageList />
          <ComponentList />
          <RealTimeComponentList />
        </section> -->
        <!-- 中间画布 -->
        <section class="center">
          <div class="content" @drop="handleDrop" @dragover="handleDragOver" @mousedown="handleMouseDown"
            @mouseup="deselectCurComponent">
            <Editor />
          </div>
        </section>

        <!-- 右侧属性列表 -->
        <!-- <section class="right">
          <el-tabs v-if=" " v-model="activeName">
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
        </section> -->
      </main>
      <Toolbar ref="toolbar" />
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

export default {
  components: { Editor, ComponentList, AnimationList, EventList, Toolbar, RealTimeComponentList, PageList },
  data() {
    return {
      //---------------------------------
      activeName: 'attr',
      reSelectAnimateIndex: undefined,
      pageList: this.$store.state.pageList,
      /**
       *  websocket
       */
      lockReconnect: false, //是否真正建立连接
      timeout: 58 * 1000, //58秒一次心跳
      timeoutObj: null, //心跳心跳倒计时
      serverTimeoutObj: null, //心跳倒计时
      timeoutnum: null, //断开 重连倒计时 
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
    // 全局监听按键事件
    listenGlobalKeyDown()
    // 初始化webSocket
    this.initWebSocket();
  },
  mounted() {
    this.currentTime();
  },
  //--------------------------------------------------------------------------------------
  //--------------------Websocket相关-----------------------------------------------------
  //--------------------------------------------------------------------------------------
  // 销毁定时器
  beforeDestroy() {
    // alert("触发")
    console.log('prototype销毁' + JSON.parse(sessionStorage.getItem('pageID')))
    this.$axios.post(
      '/api/prototype/delete_page_user',
      this.$qs.stringify({
        pageID: JSON.parse(sessionStorage.getItem('pageID')),
      })
    )
    if (this.formatDate) {
      clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
    }
    clearInterval(this.websocketsend());
  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  methods: {
    //--------------------------------------------------------------------------------------
    //--------------------Websocket相关-----------------------------------------------------
    //--------------------------------------------------------------------------------------
    currentTime() {
      setInterval(this.formatDate, 500);
      setInterval(this.websocketsend(), 500); //定时器 每500ms执行一次save
    },
    /**
     * 初始化webSocket
     */
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://123.57.69.30:8000/edit_prototype";
      this.websock = new WebSocket(wsuri);
      // 客户端接收服务端数据时触发
      this.websock.onmessage = this.websocketonmessage;
      // 连接建立时触发
      this.websock.onopen = this.websocketonopen;
      // 通信发生错误时触发
      this.websock.onerror = this.websocketonerror;
      // 连接关闭时触发
      this.websock.onclose = this.websocketclose;
    },
    // 连接建立时触发
    websocketonopen() {
      //开启心跳
      console.log("websocket连接成功");
      this.start();
      //连接建立之后执行send方法发送数据
      // let actions = {"room":"007854ce7b93476487c7ca8826d17eba","info":"1121212"};
      // this.websocketsend(JSON.stringify(actions));
    },
    // 通信发生错误时触发
    websocketonerror() {
      console.log("出现错误");
      this.reconnect();
    },
    // 客户端接收服务端数据时触发
    websocketonmessage(e) {
      console.log("接收到服务端数据：");
      console.log(e.data);
      console.log(JSON.parse(e.data).pageComponentData);
      console.log(JSON.parse(e.data).pageCanvasStyle);
      this.$store.commit('setComponentData', JSON.parse(e.data).pageComponentData);   // 设置组件数据
      this.$store.commit('setCanvasStyle', JSON.parse(e.data).pageCanvasStyle); // 设置画布样式
      //收到服务器信息，心跳重置
      this.reset();
    },
    // 向服务器端发送数据
    websocketsend() {
      //数据发送
      let data = {
        prototypeID: JSON.parse(sessionStorage.getItem('prototypeID')),
        pageID: JSON.parse(sessionStorage.getItem('pageID')),
        pageComponentData: this.$store.state.componentData,
        pageCanvasStyle: this.$store.state.canvasStyleData
      }
      let Data = JSON.stringify(data);
      console.log("正在向服务器发送数据：");
      console.log(Data);
      this.websock.send(Data);
    },
    // 连接关闭时触发
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
      //重连
      this.reconnect();
    },
    reconnect() {
      //重新连接
      console.log("正在重新连接...");
      var that = this;
      if (that.lockReconnect) {
        return;
      }
      that.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      that.timeoutnum && clearTimeout(that.timeoutnum);
      that.timeoutnum = setTimeout(function () {
        //新连接
        that.initWebSocket();
        that.lockReconnect = false;
      }, 5000);
    },
    reset() {
      //重置心跳
      var that = this;
      //清除时间
      clearTimeout(that.timeoutObj);
      clearTimeout(that.serverTimeoutObj);
      //重启心跳
      that.start();
    },
    start() {
      //开启心跳
      console.log("开启心跳");
      var self = this;
      self.timeoutObj && clearTimeout(self.timeoutObj);
      self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
      self.timeoutObj = setTimeout(function () {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (self.websock.readyState == 1) {
          //如果连接正常
          console.log("正常连接");
          // self.websock.send("heartCheck"); //这里可以自己跟后端约定
        } else {
          //否则重连
          self.reconnect();
        }
        self.serverTimeoutObj = setTimeout(function () {
          //超时关闭
          self.websock.close();
        }, self.timeout);
      }, self.timeout);
    },

    /**
     * [现已废弃]
     * 从localStorage获取数据初始化页面
     */
    restore() {
      // 用保存的数据恢复画布
      if (localStorage.getItem('canvasData')) {
        this.$store.commit('setComponentData', JSON.parse(localStorage.getItem('canvasData')))
      }

      if (localStorage.getItem('canvasStyle')) {
        this.$store.commit('setCanvasStyle', JSON.parse(localStorage.getItem('canvasStyle')))
      }
    },

    //--------------------------------------------------------------------------------------
    //--------------------原型图绘制相关-----------------------------------------------------
    //--------------------------------------------------------------------------------------
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
  height: auto;
  background: #fff;

  main {
    // height: calc(100%);
    // position: relative;

    // .left {
    //   position: absolute;
    //   height: 100%;
    //   width: 200px;
    //   left: 300px;
    //   top: 0;

    //   &>div {
    //     overflow: auto;

    //     &:first-child {
    //       border-bottom: 1px solid #ddd;
    //     }
    //   }
    // }

    // .right {
    //   position: absolute;
    //   height: 100%;
    //   width: 288px;
    //   right: 0;
    //   top: 0;

    //   .el-select {
    //     width: 100%;
    //   }
    // }

    .center {
      margin-left: 300px;

      background: #f5f5f5;
      height: auto;
      overflow: auto;

      .content {
        margin-bottom: 100px;
        width: auto;
        height: auto;
        overflow: auto;
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }

  // .global-attr {
  //   padding: 10px;
  // }
}
</style>
