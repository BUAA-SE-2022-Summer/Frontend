<template>
    <!--    全屏容器    -->
    <div ref="pageDiv" @mousemove="demo_move" @mouseup="demo_up" :class="{ 'zlevelTop': mouseDownState }"
        style="position: absolute;top: 0;height: 100%;width: 100%">
        <div>
            <div>
                <div style="width: 100vw;height:6vh;background-color: whitesmoke;">
                    <router-link to="/">
                        <div style="width: 30vh;height:6vh;position: absolute;color:black;font-size :30px;left:2vw">
                            MoBook
                        </div>
                    </router-link>
                    <div style="position: absolute;left:90vh;height:6vh;background-color: whitesmoke">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select=""
                            style="background-color: whitesmoke;height: 7vh;top:-1vh" text-color="black"
                            active-text-color="red" router>
                            <el-menu-item index="/textbustest"><b>文档</b></el-menu-item>
                            <el-menu-item index="/prototype"><b>原型设计</b></el-menu-item>
                            <el-menu-item index="/project/uml"><b>uml绘制</b></el-menu-item>
                        </el-menu>
                    </div>
                    <div v-if="this.userhead" style="left:175vh;position: absolute"><img :src="this.userhead"
                            style="border-radius: 50%;width: 6vh;height: 6vh"></div>
                    <div v-else style="left:175vh;position: absolute; margin-top:3px">
                        <Avatar :username="this.username" :background-color="this.username" color="#fff"
                            :size="this.AvatarSize" style="vertical-align: middle;" :inline="true" />
                    </div>
                    <div style="left:185vh;position: absolute;top:1.5vh"><b>{{ this.username }}</b></div>
                    <!--<el-tooltip class="item" effect="dark" :content="this.teamname" placement="bottom">
                        <div style="left:42vh;position: absolute;top:1.5vh"><b>当前团队</b></div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="this.projectname" placement="bottom">
                        <div style="left:52vh;position: absolute;top:1.5vh"><b>当前项目</b></div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" placement="bottom">
                        <div style="left:62vh;position: absolute;top:1.5vh"><b>当前原型图</b></div>
                    </el-tooltip>-->
                    <div style="left:46vh;position: absolute;top:1.5vh"><b>{{ this.projectname }}</b></div>
                    <div v-if="this.now_file_name" style="left:59vh;position: absolute;top:1.5vh">-></div>
                    <div style="left:62vh;position: absolute;top:1.5vh"><b>{{ this.now_file_name }}</b></div>
                </div>
                <div v-if="this.ifnew === 0" style="margin-top:auto">
                    <el-tooltip class="item" effect="dark" content="新建原型图" placement="bottom">
                        <div style="position: absolute;width:40px;height:40px;left:20px;top:55px"><i
                                class="el-icon-document-add" style="" @click="changenew"></i></div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="分享原型图" placement="bottom">
                        <div style="position: absolute;width:40px;height:40px;left:120px;top:55px"><i
                                class="el-icon-document-checked" style="" @click="dialog = true"></i></div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="选择模板" placement="bottom">
                        <div style="position: absolute;width:40px;height:40px;left:230px;top:55px"><i
                                class="el-icon-edit-outline" style="" @click="drawer = true"></i></div>
                    </el-tooltip>
                </div>
                <div v-if="this.ifnew === 1" style="width: 21vh;position: absolute;">
                    <el-input v-model="inputname" placeholder="请输入原型图名称"></el-input>
                    <el-button type="primary" style="position: absolute;width: 9vh;" @click="createnewpro">确认
                    </el-button>
                    <el-button type="error" style="position: absolute;width: 9vh;left:220px" @click="closecreate">取消
                    </el-button>
                </div>
                <div style="position: absolute;width: 300px;height:80vh;background-color: white;top:12vh">
                    <prolist />
                </div>
                <div style="display: flex;">
                    <PrototypeView ref="canvas" />
                </div>
                <el-drawer title="请选择一个模板" :visible.sync="drawer" :direction="direction" :before-close="handleClose"
                    :size="size">
                    <!--<span>我来啦!</span>-->
                    <div @mouseover="over1" @mouseleave="leave">
                        <el-button type="primary" icon="el-icon-s-management" style="width: 300px;" @click="open1">
                            学术交流平台 PC版本</el-button>
                    </div>
                    <div @mouseover="over2" @mouseleave="leave">
                        <el-button type="primary" icon="el-icon-s-management"
                            style="width: 300px;background-color: orange" @click="open2">学术交流平台 平板版本</el-button>
                    </div>
                    <div @mouseover="over3" @mouseleave="leave">
                        <el-button type="primary" icon="el-icon-s-management"
                            style="width: 300px;background-color: yellowgreen" @click="open3">学术交流平台 安卓版本</el-button>
                    </div>
                    <div @mouseover="over4" @mouseleave="leave">
                        <el-button type="primary" icon="el-icon-s-management"
                            style="width: 300px;background-color: #b3d4fc" @click="open4">线上商城 PC版本</el-button>
                    </div>
                    <div @mouseover="over5" @mouseleave="leave">
                        <el-button type="primary" icon="el-icon-s-management"
                            style="width: 300px;background-color: palevioletred" @click="open5">线上商城 平板版本</el-button>
                    </div>
                    <div @mouseover="over6" @mouseleave="leave">
                        <el-button type="primary" icon="el-icon-s-management"
                            style="width: 300px; background-color: aqua" @click="open6">线上商城 安卓版本</el-button>
                    </div>
                </el-drawer>
                <div><img v-if="this.show === 1" src="../img/PC_学术.png"
                        style="width: 165vh;height:500px;position: absolute;left:300px;top:12vh"></div>
                <div><img v-if="this.show === 2" src="../img/Ipad_学术.png"
                        style="width: 165vh;height:500px;position: absolute;left:300px;top:12vh"></div>
                <div><img v-if="this.show === 3" src="../img/phone_学术.png"
                        style="width: 165vh;height:500px;position: absolute;left:300px;top:12vh"></div>
                <div><img v-if="this.show === 4" src="../img/PC_购物.png"
                        style="width: 165vh;height:500px;position: absolute;left:300px;top:12vh"></div>
                <div><img v-if="this.show === 5" src="../img/Ipad_购物.png"
                        style="width: 165vh;height:500px;position: absolute;left:300px;top:12vh"></div>
                <div><img v-if="this.show === 6" src="../img/phone_购物.png"
                        style="width: 165vh;height:500px;position: absolute;left:300px;top:12vh"></div>
            </div>
        </div>
        <!-- 点击蒙版  -->
        <div v-if="attrOpen" @click.stop="closeAtrrMenu"
            style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index:998 "></div>
        <!--  多功能菜单 -->
        <div :class="{ 'six-more-modal-btn': attrOpen, 'moreModal': !attrOpen, 'more-tran-animate': !mouseDownState }"
            ref="attrActionMgr" :style="position" @mousedown="attr_menu_down">
            <!--  触发器 -->
            <div v-if="!attrOpen" @click="demo_click" class="imgMore">
                组件设置
            </div>
            <!--  菜单  -->
            <div v-else>
                <!-- <CanvasAttr /> -->
                <el-tabs v-if="curComponent" v-model="activeName">
                    <el-tab-pane label="属性" name="attr">
                        <component :is="curComponent.component + 'Attr'" />
                    </el-tab-pane>
                </el-tabs>
                <div v-else>
                    还没选择组件噢
                </div>
            </div>
        </div>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    分享原型图
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    原型图在分享后将会生成一个链接，该链接可供任何人访问查看原型图的预览
                </v-card-text>
                <div v-if="is_sharing">
                    <v-card-text>
                        本原型图已处于分享状态，分享链接为<h4>{{ url }}</h4>
                    </v-card-text>
                    <div class="text-center">
                        <v-btn rounded color="primary" dark @click="closeshare">
                            取消分享
                        </v-btn>
                    </div>
                </div>
                <div v-else>
                    <v-card-text>
                        本原型图尚未处于分享状态，是否开启分享
                    </v-card-text>
                    <div class="text-center">
                        <v-btn rounded color="primary" dark @click="openShare">
                            打开分享
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import prolist from "../components/prototype/PrototypeList";
import qs from "qs";
import Prototype from "../components/prototype/PrototypeView.vue";
import PrototypeView from "../components/prototype/PrototypeView.vue";
import Avatar from 'vue-avatar';
//-------------------------------------------------
//-----------------------原型图相关组件------------
//-------------------------------------------------
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
    components: { Avatar, prolist, Prototype, PrototypeView, AnimationList, EventList, componentList, RealTimeComponentList, CanvasAttr },
    name: "prototype",
    props: {
        // 通过position来设置初始定位
        position: {
            type: Object,
            default: function () {
                return {
                    top: "32.25rem",
                    left: "0"
                }
            }
        }
    },
    computed: mapState([
        'componentData',
        'curComponent',
        'isClickComponent',
        'canvasStyleData',
        'editor',
    ]),
    data() {
        return {
            template_1_component: [{ "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 1473, "height": 663, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 47, "left": 73 }, "id": "F8-Y2GIPlZ_uYarmZvMMm" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "CircleShape", "label": "\u5706\u5f62", "propValue": "&nbsp;logo", "icon": "24gl-circle", "style": { "rotate": 0, "opacity": 1, "width": 125, "height": 119, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 76, "left": 113 }, "id": "srAmdrDFe3eUllqtmw26m" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "CircleShape", "label": "\u5706\u5f62", "propValue": "&nbsp;avartar", "icon": "24gl-circle", "style": { "rotate": 0, "opacity": 1, "width": 125, "height": 117, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 87, "left": 1216 }, "id": "uKUruHSBEpOb7zYwP2Bbf" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "VText", "label": "\u6587\u5b57", "propValue": "&nbsp;name", "icon": "wenben", "request": { "method": "GET", "data": [], "url": "", "series": false, "time": 1000, "paramType": "", "requestCount": 0 }, "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 28, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "", "color": "", "top": 128, "left": 1379 }, "id": "VewPrBnym4KXt-sL_1x2j" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "LineShape", "label": "\u76f4\u7ebf", "propValue": "", "icon": "zhixian", "style": { "rotate": 0, "opacity": 1, "width": 1460, "height": 1, "backgroundColor": "#000", "top": 242, "left": 73 }, "id": "0US0kE918LcCv859selsO" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "VText", "label": "\u6587\u5b57", "propValue": "xx\u5b66\u672f\u4ea4\u6d41\u5e73\u53f0", "icon": "wenben", "request": { "method": "GET", "data": [], "url": "", "series": false, "time": 1000, "paramType": "", "requestCount": 0 }, "style": { "rotate": 0, "opacity": 1, "width": 370, "height": 54, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "", "color": "", "top": 57, "left": 700 }, "id": "R6A6iJiFlCzBNYe6qseh0" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5173\u952e\u5b57", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 78, "height": 51, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 167, "left": 421 }, "id": "3QWdkhEqiWyt1jnPPLrGi" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5173\u952e\u5b57", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 78, "height": 51, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 167, "left": 569 }, "id": "C2As5m6EHFQQ8Y8A5tEXM" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5173\u952e\u5b57", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 78, "height": 51, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 167, "left": 700 }, "id": "HjV-vv8YksyG52zIaXDFD" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5173\u952e\u5b57", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 78, "height": 51, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 167, "left": 846 }, "id": "1cxDsgzgTdUcKfStqr38n" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5173\u952e\u5b57", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 78, "height": 51, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 167, "left": 998 }, "id": "wHimAVm84Tpxunzk3b7L1" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;list", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 144, "height": 338, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 291, "left": 96 }, "id": "v6gGH9ZBAof9DrbYuG7wh" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 70, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 309, "left": 344 }, "id": "oNq7FwE5dJCgxgpA43YOq" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 70, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 431, "left": 344 }, "id": "oHmBDLzhq7qMv8jiOk53V" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 70, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 572, "left": 344 }, "id": "g5XnvmxOqEUeVYCc_yjs_" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 70, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 309, "left": 630 }, "id": "3zf1jZ8yXQwy05fj3YC9-" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 70, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 431, "left": 630 }, "id": "1H39JyKSlSX-WV_NHybur" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 70, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 572, "left": 639 }, "id": "KZVD4K9QtzwP0Xp7JzCoY" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 70, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 309, "left": 906 }, "id": "T4BxcpCdQZFtYUzsxCbvK" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 70, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 431, "left": 906 }, "id": "216NN6SEPMA_HhsoqCFHA" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 70, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 572, "left": 906 }, "id": "VhouRmXgrJp_gPRZkpG8b" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "search&nbsp;", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 318, "height": 38, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 111, "left": 588 }, "id": "FrkBA0OhLW2ias94_L-Ey" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;my-files", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 279, "height": 361, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 309, "left": 1216 }, "id": "1zQxrCn4TP3H3QkFVfqzw" }],
            template_1_style: { "width": "3840", "height": "2160", "scale": 48, "color": "#000", "opacity": 1, "background": "#fff", "fontSize": 14 },
            template_2_component: [{ "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 714, "height": 389, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 83, "left": 120 }, "id": "yEFj4v067Jvm_knluQ9QU" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "CircleShape", "label": "\u5706\u5f62", "propValue": "&nbsp;logo", "icon": "24gl-circle", "style": { "rotate": 0, "opacity": 1, "width": 78, "height": 81, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 100.13999999999999, "left": 167 }, "id": "b5kkZ8ZBEO_odMYI4HTJt" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "CircleShape", "label": "\u5706\u5f62", "propValue": "&nbsp;\u5934", "icon": "24gl-circle", "style": { "rotate": 0, "opacity": 1, "width": 42, "height": 41, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 120.13999999999999, "left": 712 }, "id": "5lZAv17TDifxZZeghwGGv" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "LineShape", "label": "\u76f4\u7ebf", "propValue": "", "icon": "zhixian", "style": { "rotate": 0, "opacity": 1, "width": 701, "height": 1, "backgroundColor": "#000", "top": 187, "left": 126.5 }, "id": "sFRRql2I1uCtvuFazR9oK" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;list", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 65, "height": 259, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 198, "left": 146 }, "id": "8HkPk_5eaZnRpvUg4zdzv" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 36, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 209, "left": 269 }, "id": "DzYDV6-pXvKXBn4-7ZOHi" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 33, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 212, "left": 568 }, "id": "qI0bagVEdnkg2rVwxr1cS" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 40, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 291, "left": 269 }, "id": "U2L5HSRmEvq-iH5aVPBOD" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 34, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 297, "left": 568 }, "id": "Wxh78bbIQ4fSn3exjrPGx" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 43, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 393, "left": 269 }, "id": "0PYgtQVlJrewjAPMmq2Xb" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 37, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 399, "left": 568 }, "id": "Ctl3PHjM-UOkL4stpn-se" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "search&nbsp;", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 26, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 127.63999999999999, "left": 377 }, "id": "-rsCTiusUblY98zFwYuCH" }],
            template_2_style: { "width": "2030", "height": "1348", "scale": 48, "color": "#000", "opacity": 1, "background": "#fff", "fontSize": 14 },
            template_3_component: [{ "id": "2Vm6yUgPVsq35pXTAkKVe", "component": "Group", "label": "\u7ec4\u5408", "icon": "zuhe", "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "style": { "rotate": 0, "opacity": 1, "left": 31, "top": 203, "width": 354, "height": 614 }, "propValue": [{ "animations": [], "events": {}, "groupStyle": { "transform": "rotate(0deg)", "opacity": 1, "width": "99.71751412429379%", "height": "100%", "fontWeight": 400, "letterSpacing": "0px", "textAlign": "center", "borderColor": "#000", "borderWidth": "1px", "borderStyle": "solid", "verticalAlign": "middle", "top": "0%", "left": "0.2824858757062147%" }, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 353, "height": 614, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 193, "left": 46 }, "id": "B-h_I5heOUy0bFkEeuNMc" }, { "animations": [], "events": {}, "groupStyle": { "transform": "rotate(0deg)", "opacity": 1, "width": "32.48587570621469%", "height": "19.218241042345277%", "fontWeight": 400, "letterSpacing": "0px", "textAlign": "center", "borderColor": "#000", "borderWidth": "1px", "borderStyle": "solid", "verticalAlign": "middle", "top": "3.420195439739414%", "left": "6.497175141242938%" }, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "CircleShape", "label": "\u5706\u5f62", "propValue": "avartar", "icon": "24gl-circle", "style": { "rotate": 0, "opacity": 1, "width": 115, "height": 118, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 214, "left": 68 }, "id": "Q8dy6MH42CRGERMxuqXNS" }, { "animations": [], "events": {}, "groupStyle": { "transform": "rotate(0deg)", "opacity": 1, "width": "56.49717514124294%", "height": "9.120521172638437%", "fontWeight": 400, "letterSpacing": "0px", "textAlign": "center", "borderColor": "#000", "borderWidth": "1px", "borderStyle": "solid", "verticalAlign": "middle", "top": "8.469055374592834%", "left": "42.090395480225986%" }, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;search banner", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 56, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 245, "left": 194 }, "id": "Q08yVH3L5bKyL90dGgEnE" }, { "animations": [], "events": {}, "groupStyle": { "transform": "rotate(0deg)", "opacity": 1, "width": "100%", "height": "0.16286644951140067%", "backgroundColor": "#000", "top": "25.2442996742671%", "left": "0%" }, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "LineShape", "label": "\u76f4\u7ebf", "propValue": "", "icon": "zhixian", "style": { "rotate": 0, "opacity": 1, "width": 354, "height": 1, "backgroundColor": "#000", "top": 348, "left": 45 }, "id": "vfWbKqZCDleXKXCYhqhPV" }, { "animations": [], "events": {}, "groupStyle": { "transform": "rotate(0deg)", "opacity": 1, "width": "15.254237288135593%", "height": "66.12377850162866%", "fontWeight": 400, "letterSpacing": "0px", "textAlign": "center", "borderColor": "#000", "borderWidth": "1px", "borderStyle": "solid", "verticalAlign": "middle", "top": "28.501628664495115%", "left": "4.80225988700565%" }, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "\u5206\u7c7b\u6807\u5fd7\uff08\u4e00\u4e2a\u4fa7\u680f\uff09&nbsp;", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 54, "height": 406, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 368, "left": 62 }, "id": "N1RNSa4PUThekKrrQgyhO" }, { "animations": [], "events": {}, "groupStyle": { "transform": "rotate(0deg)", "opacity": 1, "width": "29.37853107344633%", "height": "7.32899022801303%", "fontWeight": 400, "letterSpacing": "0px", "textAlign": "center", "borderColor": "#000", "borderWidth": "1px", "borderStyle": "solid", "verticalAlign": "middle", "top": "28.501628664495115%", "left": "25.141242937853107%" }, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 104, "height": 45, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 368, "left": 134 }, "id": "J4LVC1DC56GfEqiVliW7T" }, { "animations": [], "events": {}, "groupStyle": { "transform": "rotate(0deg)", "opacity": 1, "width": "28.53107344632768%", "height": "6.026058631921824%", "fontWeight": 400, "letterSpacing": "0px", "textAlign": "center", "borderColor": "#000", "borderWidth": "1px", "borderStyle": "solid", "verticalAlign": "middle", "top": "39.57654723127036%", "left": "25.98870056497175%" }, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 101, "height": 37, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 436, "left": 137 }, "id": "OQGQ9aFj_l98adLAbBHsN" }, { "animations": [], "events": {}, "groupStyle": { "transform": "rotate(0deg)", "opacity": 1, "width": "30.225988700564972%", "height": "6.026058631921824%", "fontWeight": 400, "letterSpacing": "0px", "textAlign": "center", "borderColor": "#000", "borderWidth": "1px", "borderStyle": "solid", "verticalAlign": "middle", "top": "49.185667752442995%", "left": "25.141242937853107%" }, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 107, "height": 37, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 495, "left": 134 }, "id": "AasIxtGL4eFOZUjgMFgVE" }, { "animations": [], "events": {}, "groupStyle": { "transform": "rotate(0deg)", "opacity": 1, "width": "31.07344632768362%", "height": "6.026058631921824%", "fontWeight": 400, "letterSpacing": "0px", "textAlign": "center", "borderColor": "#000", "borderWidth": "1px", "borderStyle": "solid", "verticalAlign": "middle", "top": "60.26058631921825%", "left": "25.141242937853107%" }, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 110, "height": 37, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 563, "left": 134 }, "id": "UDr2JBeIhZ2H3XWND9Hj3" }, { "animations": [], "events": {}, "groupStyle": { "transform": "rotate(0deg)", "opacity": 1, "width": "31.35593220338983%", "height": "6.026058631921824%", "fontWeight": 400, "letterSpacing": "0px", "textAlign": "center", "borderColor": "#000", "borderWidth": "1px", "borderStyle": "solid", "verticalAlign": "middle", "top": "71.49837133550488%", "left": "24.858757062146893%" }, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 111, "height": 37, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 632, "left": 133 }, "id": "DWv2WhT136wXAREnf9ugg" }, { "animations": [], "events": {}, "groupStyle": { "transform": "rotate(0deg)", "opacity": 1, "width": "31.35593220338983%", "height": "6.026058631921824%", "fontWeight": 400, "letterSpacing": "0px", "textAlign": "center", "borderColor": "#000", "borderWidth": "1px", "borderStyle": "solid", "verticalAlign": "middle", "top": "82.89902280130293%", "left": "24.858757062146893%" }, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;file", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 111, "height": 37, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 702, "left": 133 }, "id": "CCm5VOSSquj4EBKi-2S6y" }, { "animations": [], "events": {}, "groupStyle": { "transform": "rotate(0deg)", "opacity": 1, "width": "21.1864406779661%", "height": "23.289902280130292%", "fontWeight": 400, "letterSpacing": "0px", "textAlign": "center", "borderColor": "#000", "borderWidth": "1px", "borderStyle": "solid", "verticalAlign": "middle", "top": "28.501628664495115%", "left": "69.2090395480226%" }, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u6536\u85cf\u5939", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 75, "height": 143, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 368, "left": 290 }, "id": "rU3lJqi-LYQfXPQwrNzwG" }, { "animations": [], "events": {}, "groupStyle": { "transform": "rotate(0deg)", "opacity": 1, "width": "20.056497175141246%", "height": "23.941368078175895%", "fontWeight": 400, "letterSpacing": "0px", "textAlign": "center", "borderColor": "#000", "borderWidth": "1px", "borderStyle": "solid", "verticalAlign": "middle", "top": "61.88925081433225%", "left": "70.33898305084746%" }, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u6211\u7684\u6587\u7ae0", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 71, "height": 147, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 573, "left": 294 }, "id": "rmt2YLTLR4jygQgJjks6b" }] }],
            template_3_style: { "width": "428", "height": "976", "scale": 100, "color": "#000", "opacity": 1, "background": "#fff", "fontSize": 14 },
            template_4_component: [{ "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 1205, "height": 653, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 94, "left": 204 }, "id": "tyXLEWidSEUduo1BDcSJB" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "CircleShape", "label": "\u5706\u5f62", "propValue": "&nbsp;logo", "icon": "24gl-circle", "style": { "rotate": 0, "opacity": 1, "width": 97, "height": 102, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 119, "left": 248 }, "id": "8ix8EFh57twnRAyfcKuRu" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;searchbanner", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 333, "height": 50, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 154, "left": 494 }, "id": "KPbcyEpUL-4OIBWPRt8-B" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u70ed\u95e8\u5546\u54c1", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 470, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 237, "left": 236 }, "id": "LQgJYCdxpWhbZtDKZQukw" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5546\u54c1\u5927\u5168", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 344, "height": 473, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 234, "left": 579 }, "id": "swMjZw7YIZCE772f1lCqD" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u4f60\u53ef\u80fd\u559c\u6b22\u7684\u5546\u54c1", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 293, "height": 470, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 235.5, "left": 1063 }, "id": "N6crcmupxcJE4uEaU_7zW" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u8d2d\u7269\u8f66\uff08\u5c55\u793a\u4e00\u90e8\u5206\uff0c\u70b9\u51fb\u8fdb\u5165\u4e0b\u4e00\u4e2a\u9875\u9762\uff09", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 225, "height": 105, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 111, "left": 1088 }, "id": "x8NJqV8wDWaVomlaYOQsH" }],
            template_4_style: { "width": "3840", "height": "2160", "scale": 48, "color": "#000", "opacity": 1, "background": "#fff", "fontSize": 14 },
            template_5_component: [{ "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 859, "height": 525, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 89, "left": 66 }, "id": "032NJIlX44YaMPS3SR8pY" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "CircleShape", "label": "\u5706\u5f62", "propValue": "&nbsp;", "icon": "24gl-circle", "style": { "rotate": 0, "opacity": 1, "width": 45, "height": 45, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 109, "left": 85 }, "id": "MhxWMHbn0tgqNwnKb0fPN" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "VText", "label": "\u6587\u5b57", "propValue": "logo", "icon": "wenben", "request": { "method": "GET", "data": [], "url": "", "series": false, "time": 1000, "paramType": "", "requestCount": 0 }, "style": { "rotate": 0, "opacity": 1, "width": 200, "height": 28, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "", "color": "", "top": 117.5, "left": 149 }, "id": "dd_7N-rs2bHY27xeg7uM8" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "CircleShape", "label": "\u5706\u5f62", "propValue": "&nbsp;\u5934", "icon": "24gl-circle", "style": { "rotate": 0, "opacity": 1, "width": 62, "height": 64, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 109, "left": 813 }, "id": "ot4yBNi9UbVxxRqDhbCRg" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "seach-banner&nbsp;", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 340, "height": 35, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 123.5, "left": 301 }, "id": "lW_gbLRYMwGhLomuUXl2q" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u63a8\u8350", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 58, "height": 26, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 183, "left": 220 }, "id": "TKbeS77nupuPcL771eH6p" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u63a8\u8350", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 58, "height": 26, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 183, "left": 321 }, "id": "8TWi3C5Cy5kSEUU9eu9uU" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u63a8\u8350", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 58, "height": 26, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 183, "left": 417 }, "id": "C9aXCR5pnfyX4IJXSgP93" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u63a8\u8350", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 58, "height": 26, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 183, "left": 522 }, "id": "s0KQ8yIPa8URJWOxlPZRc" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u63a8\u8350", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 58, "height": 26, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 183, "left": 615 }, "id": "9Jj54sFlgtwZMrWrlqmdy" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u63a8\u8350", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 58, "height": 26, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 183, "left": 707 }, "id": "kKBbRiyB6ECg5gzHjXvaD" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;list(\u63d0\u4f9b\u5206\u7c7b)", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 115, "height": 349, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 237, "left": 85 }, "id": "smkn5V-mrZoWz5iUxF8SC" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5546\u54c1", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 93, "height": 66, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 237, "left": 241 }, "id": "JYt5vayAclaZu3ys8bk2Q" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5546\u54c1", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 93, "height": 66, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 366, "left": 241 }, "id": "ukQsyU0y8p0GnD0NViHzj" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5546\u54c1", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 93, "height": 66, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 507, "left": 241 }, "id": "8t5CLmQ20knPCMGmwOOng" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5546\u54c1", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 93, "height": 66, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 237, "left": 504.5 }, "id": "YSwHvXxTTu2vnbLop22ys" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5546\u54c1", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 93, "height": 66, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 366, "left": 510 }, "id": "m6N1FbtgAJAxLkdrCGFZp" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5546\u54c1", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 93, "height": 66, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 507, "left": 382 }, "id": "xSo_0PFAB-Xjm0eLJscYg" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5546\u54c1", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 93, "height": 66, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 366, "left": 382 }, "id": "fqJpr35XTwpOqsEz6Ln_J" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5546\u54c1", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 93, "height": 66, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 237, "left": 379 }, "id": "LFcWkzdkFqaWkuK1GQRCS" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5546\u54c1", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 93, "height": 66, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 507, "left": 515 }, "id": "GRuJiKd5i9FWS0tENx_tL" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u731c\u6211\u559c\u6b22", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 195, "height": 120, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 246, "left": 680 }, "id": "3Ng1uqEniDKppcEWmiy8y" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u8d2d\u7269\u8f66", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 208, "height": 136, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 419, "left": 680 }, "id": "cUtomSwhLXqLPo_W8_hOo" }],
            template_5_style: { "width": "2030", "height": "1348", "scale": 48, "color": "#000", "opacity": 1, "background": "#fff", "fontSize": 14 },
            template_6_component: [{ "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 315, "height": 585, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 113, "left": 14 }, "id": "_ora3TXBaaH0kPL6F4Gdc" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "CircleShape", "label": "\u5706\u5f62", "propValue": "&nbsp;avatrar", "icon": "24gl-circle", "style": { "rotate": 0, "opacity": 1, "width": 101, "height": 97, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 132, "left": 27 }, "id": "0UHoQ0VHwB-VPUE_G3zsw" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u8d2d\u7269\u8f66", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 109, "height": 79, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 141, "left": 189 }, "id": "-reV5o4FuTSrPfVK1bAj1" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;search-banner", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 289, "height": 42, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 255, "left": 27 }, "id": "OeaCCD-BBkSrah-ZL6RkN" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;list\u5206\u7c7b", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 54, "height": 302, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 334, "left": 32 }, "id": "VsdTv2rsTnwehMnVGS9uL" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5546\u54c1", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 84, "height": 60, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 334, "left": 123 }, "id": "CRySM1ArZeNmt60vwfCVW" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5546\u54c1", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 84, "height": 60, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 438, "left": 123 }, "id": "Gggy-Om9bKF0JXGBiDEPJ" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5546\u54c1", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 84, "height": 60, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 543, "left": 123 }, "id": "lTDi_ndXP3I1QuPke2HnP" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5546\u54c1", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 84, "height": 60, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 334, "left": 232 }, "id": "H_Quxo13tnn6Mp0KLzjy7" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5546\u54c1", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 84, "height": 60, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 438, "left": 238 }, "id": "HsIKebSZITsHMD2KG5Nr5" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "RectShape", "label": "\u77e9\u5f62", "propValue": "&nbsp;\u5546\u54c1", "icon": "juxing", "style": { "rotate": 0, "opacity": 1, "width": 84, "height": 60, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 543, "left": 238 }, "id": "sRP98JVMufKFA8AzFBss_" }, { "animations": [], "events": {}, "groupStyle": {}, "isLock": false, "collapseName": "", "linkage": { "duration": 0, "data": [{ "id": "", "label": "", "event": "", "style": [{ "key": "", "value": "" }] }] }, "component": "CircleShape", "label": "\u5706\u5f62", "propValue": "&nbsp;\u6362", "icon": "24gl-circle", "style": { "rotate": 0, "opacity": 1, "width": 51, "height": 39, "fontSize": "", "fontWeight": 400, "lineHeight": "", "letterSpacing": 0, "textAlign": "center", "color": "", "borderColor": "#000", "borderWidth": 1, "backgroundColor": "", "borderStyle": "solid", "borderRadius": "", "verticalAlign": "middle", "top": 636, "left": 189 }, "id": "a7LOAn2teGDSARaK72Qt7" }],
            template_6_style: { "width": "428", "height": "976", "scale": 80, "color": "#000", "opacity": 1, "background": "#fff", "fontSize": 14 },
            code: '',
            url: '',
            is_sharing: JSON.parse(sessionStorage.getItem('is_sharing')),
            dialog: false,
            now_file_name: JSON.parse(sessionStorage.getItem('now_file_name')),
            //----------------------
            //------悬浮按钮组------
            //----------------------
            dial_direction: 'left',
            dial_right: true,
            dial_bottom: true,
            dial_transition: 'scale-transition',
            //----------------------
            //-------选中的组件-----
            //----------------------
            activeName: 'attr',
            reSelectAnimateIndex: undefined,
            //----------------------
            //------浮动按钮--------
            //----------------------
            attrOpen: false,     //  attr菜单展开状态
            mouseDownState: false,   //  鼠标点击状态
            iX: 0, iY: 0,
            dX: 0, dY: 500,   //  初始定位
            lastMoveIndex: 0,    //  拖拽计数
            curMoveIndex: 0, //  历史计数
            //----------------------
            activeIndex: '/prototype',    // 当前激活的tab页
            AvatarSize: 40,// 用户头像大小
            size: '300',//抽屉的宽度
            drawer: false,
            direction: 'ltr',
            editor1: null,
            newContent: '',
            userhead: '',
            username: '',
            teamname: JSON.parse(sessionStorage.getItem('TeamName')),
            projectname: JSON.parse(sessionStorage.getItem('projectName')),
            projectid: JSON.parse(sessionStorage.getItem('ProjectID')),
            teamid: JSON.parse(sessionStorage.getItem('TeamID')),
            fatherid: JSON.parse(sessionStorage.getItem('project_root_fileID')),
            ifnew: 0,
            inputname: '',
            choice: 0,
            show: 0,
        }
    },
    created() {
        this.$axios.get('/api/user/get_user_info ').then(
            res => {
                this.userhead = res.data.data.img;
                this.username = res.data.data.username;
            }
        );
        this.$axios.post(
            '/api/prototype/share_prototype',
            this.$qs.stringify({
                projectID: JSON.parse(sessionStorage.getItem('ProjectID'))
            })
        ).then(
            res => {
                this.code = res.data.code;
                this.url = "http://www.horik.cn/share?" + this.code
                console.log("分享的url");
            }
        )
    },
    methods: {
        closeshare() {
            this.$axios.post(
                '/api/prototype/close_sharing',
                this.$qs.stringify({
                    projectID: JSON.parse(sessionStorage.getItem('ProjectID'))
                }))
                .then(res => {
                    if (res.data.errno == 0) {
                        this.is_sharing = false;
                        this.$message.success(res.data.msg)
                    }
                })
        },
        openShare() {
            this.$axios.post(
                '/api/prototype/share_prototype',
                this.$qs.stringify({
                    projectID: JSON.parse(sessionStorage.getItem('ProjectID'))
                })
            ).then(
                res => {
                    this.code = res.data.code;
                    this.url = "http://www.horik.cn/share?" + this.code
                    console.log("分享的url");
                }
            )
            this.is_sharing = true;
            // this.$axios.post(
            //     '/api/prototype/close_sharing',
            //     this.$qs.stringify({
            //         projectID: JSON.parse(sessionStorage.getItem('ProjectID'))
            //     }))
            //     .then(res => {
            //         console.log(res.data);
            //         if (res.data.errno == 0) {
            //             this.$message.success(res.data.msg)
            //         }
            //     })
        },
        returnbefore() {
            this.$router.push('/projectdashboard');
        },
        leave() {
            this.show = 0;
        },
        over1() {
            this.show = 1;
        },
        over2() {
            this.show = 2;
        },
        over3() {
            this.show = 3;
        },
        over4() {
            this.show = 4;
        },
        over5() {
            this.show = 5;
        },
        over6() {
            this.show = 6;
        },
        open1() {
            this.choice = 1;
            this.show = 0;
            this.insertbody();
        },
        open2() {
            this.choice = 2;
            this.insertbody();
        },
        open3() {
            this.choice = 3;
            this.insertbody();
        },
        open4() {
            this.choice = 4;
            this.insertbody();
        },
        open5() {
            this.choice = 5;
            this.insertbody();
        },
        open6() {
            this.choice = 6;
            this.insertbody();
        },
        insertbody() {
            // cur = JSON.parse(sessionStorage.getItem('prototypeID'));
            // if (this.cur === 0) {
            //     this.$message.error('当前未选择文档');
            // }
            // else {
            this.$confirm('此操作会覆盖当前选择的文件内容, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '导入成功!'
                });
                if (this.choice === 1) {
                    this.$store.commit('setComponentData', JSON.parse(this.template_1_component));
                    this.$store.commit('setCanvasStyle', JSON.parse(this.template_1_style));
                }
                if (this.choice === 2) {
                    alert("tmp")
                    console.log("debug");
                    console.log(this.template_2_component);
                    console.log(JSON.stringify(this.template_2_component));
                    this.$store.commit('setComponentData', (this.template_2_component));
                    this.$store.commit('setCanvasStyle', (this.template_2_style));
                }
                if (this.choice === 3) {
                    this.$store.commit('setComponentData', this.template_3_component);
                    this.$store.commit('setCanvasStyle', this.template_3_style);
                }
                if (this.choice === 4) {
                    this.$store.commit('setComponentData', this.template_4_component);
                    this.$store.commit('setCanvasStyle', this.template_4_style);
                }
                if (this.choice === 5) {
                    this.$store.commit('setComponentData', this.template_5_component);
                    this.$store.commit('setCanvasStyle', this.template_5_style);
                }
                if (this.choice === 6) {
                    this.$store.commit('setComponentData', this.template_6_component);
                    this.$store.commit('setCanvasStyle', this.template_6_style);
                }
                this.savepro();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消导入'
                });
            });
            // }
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done(
                    );
                })
                .catch(_ => { });
        },
        load() {
            this.editor1.replaceContent(this.newContent);
        },
        closecreate() {
            this.ifnew = 0;
        },
        changenew() {
            this.ifnew = 1;
        },
        createnewpro() {
            this.$axios({
                method: 'post',           /* 指明请求方式，可以是 get 或 post */
                url: '/api/prototype/create_prototype',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
                data: qs.stringify({
                    teamID: this.teamid,
                    projectID: this.projectid,
                    prototypeName: this.inputname,
                    fatherID: this.fatherid
                })
            })
                .then(res => {/* res 是 response 的缩写 */
                    if (res.data.errno === 0) {
                        this.$message.success("文档创建成功");
                        window.location.reload();
                        //this.$router.go(0);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log(err);         /* 若出现异常则在终端输出相关信息 */
                });
            this.ifnew = 0;
        },
        deletepro() {
            this.$axios({
                method: 'post',
                url: '/api/prototype/delete_prototype',
                data: qs.stringify({
                    prototypeID: JSON.parse(sessionStorage.getItem('prototypeID')),
                })
            }).then(res => {
                console.log(res.data)
                if (res.data.errno === 0) {
                    this.$message.success("删除成功");
                    window.location.reload();
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(err => {
                console.log(err);         /* 若出现异常则在终端输出相关信息 */
            })
        },
        savepro() {
            this.$message.success("保存文件成功");
        },
        //---------------------------------------------------------
        //-------------------画布属性悬浮球效果--------------------
        //---------------------------------------------------------
        //  鼠标按下
        attr_menu_down(event) {
            //  如果打开了菜单，则不做响应
            if (this.attrOpen) {
                this.mouseDownState = false;
                return
            }
            console.log("attr_menu_down", event);
            /* 此处判断  pc 或 移动端 得到 event 事件 */
            var touch;
            if (event.touches) {
                touch = event.touches[0];
            } else {
                touch = event;
            }
            // 鼠标点击 面向页面 的 x坐标 y坐标
            let { clientX, clientY } = touch;
            // 鼠标x坐标 - 拖拽按钮x坐标  得到鼠标 距离 拖拽按钮 的间距
            this.iX = clientX - this.$refs.attrActionMgr.offsetLeft;
            // 鼠标y坐标 - 拖拽按钮y坐标  得到鼠标 距离 拖拽按钮 的间距
            this.iY = clientY - this.$refs.attrActionMgr.offsetTop;
            // 设置当前 状态为 鼠标按下
            this.mouseDownState = true;
        },
        //  鼠标拖拽
        demo_move(event) {
            //鼠标按下 切移动中
            if (this.mouseDownState) {
                console.log("demo_move", event);
                /* 此处判断  pc 或 移动端 得到 event 事件 */
                var touch;
                if (event.touches) {
                    touch = event.touches[0];
                } else {
                    touch = event;
                }
                // 鼠标移动时 面向页面 的 x坐标 y坐标
                let { clientX, clientY } = touch;
                //当前页面全局容器 dom 元素  获取容器 宽高
                let {
                    clientHeight: pageDivY,
                    clientWidth: pageDivX
                } = this.$refs.pageDiv;
                /* 鼠标坐标 - 鼠标与拖拽按钮的 间距坐标  得到 拖拽按钮的 左上角 x轴y轴坐标 */
                let [x, y] = [clientX - this.iX, clientY - this.iY];

                //拖拽按钮 dom 元素  获取 宽高 style 对象
                let {
                    clientHeight: attrActionMgrY,
                    clientWidth: attrActionMgrX,
                    style: attrActionMgrStyle
                } = this.$refs.attrActionMgr;
                /* 此处判断 拖拽按钮 如果超出 屏幕宽高 或者 小于
                   设置 屏幕最大 x=全局容器x y=全局容器y 否则 设置 为 x=0 y=0
                */
                if (x > pageDivX - attrActionMgrX) x = pageDivX - attrActionMgrX;
                else if (x < 0) x = 0;
                if (y > pageDivY - attrActionMgrY) y = pageDivY - attrActionMgrY;
                else if (y < 0) y = 0;
                this.dX = x; this.dY = y;
                // 计算后坐标  设置 按钮位置
                attrActionMgrStyle.left = `${x}px`;
                attrActionMgrStyle.top = `${y}px`;
                attrActionMgrStyle.bottom = "auto";
                attrActionMgrStyle.right = "auto";
                //  move Index
                this.lastMoveIndex++;
                //  当按下键滑动时， 阻止屏幕滑动事件
                event.preventDefault();
            }
        },
        //    鼠标抬起
        demo_up(event) {
            console.log("demo_up", event);
            //  当前页面全局容器 dom 元素  获取容器 宽高
            let {
                clientHeight: windowHeight,
                clientWidth: windowWidth
            } = document.documentElement;
            console.log('全局容器:', windowWidth, windowHeight);
            //  拖拽按钮 dom 元素  获取 宽高 style 对象
            let {
                clientHeight: attrActionMgrY,
                clientWidth: attrActionMgrX,
                style: attrActionMgrStyle
            } = this.$refs.attrActionMgr;

            console.log('拖拽按钮', attrActionMgrY, attrActionMgrX, attrActionMgrStyle);

            // 计算后坐标  设置 按钮位置
            if (this.dY > 0 && this.dY < (windowHeight - 50)) { //  不在顶部 且 不在底部
                if (this.dX <= (windowWidth / 2)) {  //  left 小于等于屏幕一半
                    attrActionMgrStyle.left = 0;
                    attrActionMgrStyle.right = 'auto';
                } else { //  left 大于屏幕一半
                    attrActionMgrStyle.left = 'auto';
                    attrActionMgrStyle.right = 0;
                }
                if (this.dY >= (windowHeight / 2)) {   //  宽度大于1/2时，是将top改为auto，调整bottom
                    attrActionMgrStyle.top = 'auto';
                    attrActionMgrStyle.bottom = (windowHeight - this.dY - 50) + 'px';
                }
            } else {
                if (this.dY === 0) {  //  在顶部
                    attrActionMgrStyle.top = 0;
                    attrActionMgrStyle.bottom = 'auto';
                } else if (this.dY === (windowHeight - 50)) {
                    attrActionMgrStyle.bottom = 0;
                    attrActionMgrStyle.top = 'auto';
                }
                if (this.dX >= (windowWidth / 2)) {  //  右侧是将left改为auto，调整right
                    attrActionMgrStyle.left = 'auto';
                    attrActionMgrStyle.right = (windowWidth - this.dX - 50) + 'px';
                }
            }
            this.mouseDownState = false;
        },
        //    单击事件
        demo_click() {
            console.log("demo_click|moveIndex:", this.lastMoveIndex, this.curMoveIndex);
            //  mouseup 后会激活click事件
            //  如果上一次down事件到下一次click事件中经历10次以下move，则视为纯点击事件
            if (this.lastMoveIndex - this.curMoveIndex <= 10) {
                //  点击事件
                this.attrOpen = !this.attrOpen;
                if (this.attrOpen) {
                    //  打开菜单
                }
            }
            this.curMoveIndex = this.lastMoveIndex
        },
        //    点击空白关闭菜单
        closeAtrrMenu() {
            this.attrOpen = false;
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
    }
}

</script>

<style scoped>
.zlevelTop {
    z-index: 9999;
}

.more-tran-animate {
    transition: 0.5s;
}

.moreModal {
    /* 如果碰到滑动问题，1.3 请检查 z-index。z-index需比web大一级*/
    z-index: 9999;
    position: fixed;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #337AB7;
    line-height: 40px;
    text-align: center;
    color: #fff;
    opacity: 0.6;
}

.moreModal:hover {
    opacity: 1;
}

.six-more-modal-btn {
    overflow: auto;
    padding: 10px;
    position: fixed;
    z-index: 1000;
    width: auto;
    height: auto;
    background: #fff;
    color: #EB5E5E;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.imgMore {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
</style>
