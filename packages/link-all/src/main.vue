<template>
  <!-- <div 
    v-show="visible"
    class="znl-link-all-shade"
    > -->

    <div
      class="znl-link-all"
      :style="znlLinkAllStyle"
      @contextmenu.stop = "znlLinkAllClickHandler"
      >

      <div 
        class="znl-link-all_switch" 
        @click="linkAllSwitch"
        :title="visible ? '按F2键可收起哦' : '按F2键可打开哦'">
        <i :class="['iconfont', !visible ? 'icon-arrow_left_btn' : 'icon-arrow_retract_btn']"></i>
        <!-- :style="znlLinkAllSwitchStyle" -->
      </div>
      
      <div class="znl-link-all_header" :style="znlLinkAllHeaderStyle">

        <div class="znl-link-all_title" :title="activeTopic">
          <span>{{activeTopic}}</span>
        </div>

        <div class="znl-link-all_action" @click="linkAllActionHandler">

          <span class="linkall_menu" title="话题动态" data-type="allTopic">
           <i class="iconfont icon-linkall__ic" data-type="allTopic"></i>
          </span>

          <span class="linkall_menu" title="消息" data-type="about">
            <i class="iconfont icon-linkall__ic1" data-type="about"></i>
            <span class="znl-link-all_tip" v-if="messageShow"></span>
          </span>

          <span class="linkall_menu" title="搜索" data-type="search">
            <i class="iconfont icon-linkall_search_ic" data-type="search"></i>
          </span>

        </div>

      </div>

      <div class="znl-link-all_body" :style="znlLinkAllBodyStyle">

        <component
          ref="mainComponent"
          :is="componentId"
          :topic-list="topicList"
          :all-topic-list="allTopicList"
          :topic-user-list="topicUserList"
          :active-topic="activeTopic"
          :list-type="listType"
          :at-record-list="atRecordList"
          :user-info="userInfo"
          :pm-avartar-url="pmAvartarUrl"
          :file-types="fileTypes"
          :down-file-method="downFileMethod"
          @get-topic-list="getTopicList"
          @get-topic-list-byname="getTopicListByname"
          @filetype-err="msg=>{filetypeErr(msg)}"
          @get-topic-search-record-list="$emit('get-topic-search-record-list')"
          @get-topic-at-record-list="$emit('get-topic-at-record-list')"
          @get-all-topic-list="topicName=>$emit('get-all-topic-list', topicName)"
          @send-topic="(config,obj)=>$emit('send-topic',config,obj)"
          @get-contacts-list="$emit('get-contacts-list')"
          @top-topic="topic=>{$emit('top-topic', topic)}"
          @cancel-top-topic="topic=>{$emit('cancel-top-topic', topic)}"
          @delete-topic="topic=>{$emit('delete-topic', topic)}"
          @delete-topic-search-record="id=>$emit('delete-topic-search-record', id)"
          @oss-upload-completed="(isSuccess, obj)=>{$emit('oss-upload-completed', isSuccess, obj)}"
          @publish-new-topic="publishNewTopic"

          :region="region"
          :access-key-id="accessKeyId"
          :access-key-secret="accessKeySecret"
          :bukect="bukect"
          :oss-file-url="ossFileUrl"
          :oss="oss"
          :folder="folder"
          >
        </component>

      </div>


    </div>

  <!-- </div> -->
</template>

<script>
  import TopicLists from './TopicLists.vue'
  import AtLists from './AtList.vue'
  import TopicLine from './TopicLine.vue'
  import { elResize, on, off } from '~/utils/dom'
  // import linkallSwithchImg from '~assets/imgs/linkall.png'
  // import Message from 'packages/message'

  export default{
    name: 'ZnlLinkAll',

    components: {
      TopicLists: TopicLists,
      TopicLine: TopicLine,
      AtLists: AtLists
    },

    props: {
      region: String,
      accessKeyId: String,
      accessKeySecret: String,
      bukect: String,
      ossFileUrl: String,
      oss: Function,
      folder: String,
      pmAvartarUrl: {
        type: String,
        default: ''
      },
      fileTypes: {
        type: Array,
        default:() => {
          return []
        }
      },
      downFileMethod: Function,

      visible: {
        type: Boolean,
        default: true
      },
      topicList: Array, // 话题列表
      allTopicList: Array, // 所有话题列表
      topicUserList: Array, // 联系人列表
      atRecordList: Array, // @消息列表
      userInfo: {
        type: Object,
        default () {
          return {}
        }
      },
      fillPadding: {
        type: Number,
        default: 0
      }
    },

    computed: {
      znlLinkAllStyle () {
        let style = {}
        style.right = this.visible ? 0 : '-360px'
        style.border = this.visible ? '' : 'none'
        style.boxShadow = this.visible ? '' : 'none'
        style.top = this.fillPadding + 'px'
        style.bottom = this.fillPadding + 'px'
        return style
      },

      // znlLinkAllSwitchStyle () {
      //   let style = {}
      //   style.backgroundImage = `url(${linkallSwithchImg})`
      //   return style
      // },

      znlLinkAllHeaderStyle () {
        let style = {}
        style.backgroundColor = this.visible ? '' : 'transparent'
        return style
      },

      znlLinkAllBodyStyle () {
        let style = {}
        style.height = this.linkAllDomSize.height - 51 + 'px'
        style.opacity = this.visible ? '1' : '0'
        return style
      },

      messageShow () {
        return _.filter(this.atRecordList, item => {
          return !item.HasRead
        }).length > 0
      }
    },

    watch: {
      componentId (val) {
        if (val === 'TopicLine') {
          this.textareaInputFocusHandler()
        }
      }
    },

    methods: {
      linkAllSwitch () {
        this.$emit('update:visible', !this.visible)
      },

      znlLinkAllClickHandler (event) {
        if(event.preventDefault){
          event.preventDefault()
        }
        event.returnValue = false
        return false
      },

      changeTopic (topicName) {
        if (!topicName) return
        let name = topicName.substring(0, 1) === '#' ? topicName : `#${topicName}#`
        this.activeTopic = name
        this.componentId = 'TopicLine'
        this.$emit('get-topic-list-byname', name)
        this.$nextTick(() => {
          this.$refs.mainComponent.initMsg && this.$refs.mainComponent.initMsg()
        })
        this.$emit('update:visible', true)
        this.textareaInputFocusHandler()
      },

      switchLinkAllOnOff (event) {
        if (event.code === 'F2') {
          this.$emit('update:visible', !this.visible)
        }
      },

      textareaInputFocusHandler () {
        this.$nextTick(() => {
          this.$refs.mainComponent.$refs.textareaInput.focus()
        })
      },

      publishNewTopic (topicName) {
        let name = topicName.substring(0, 1) === '#' ? topicName : `#${topicName}#`
        this.activeTopic = name
        this.componentId = 'TopicLine'
        // this.$nextTick(() => {
          // this.$refs.mainComponent.MsgContent = ''
          // this.$refs.mainComponent.addNewTopci()
        // })
      },

      linkAllActionHandler (e) {
        let targetDateDom = e.srcElement || e.target
        let type =  targetDateDom.getAttribute('data-type')

        switch (type) {
          case 'allTopic':
            this.activeTopic = '话题动态'
            this.componentId = 'TopicLists'
            this.listType = 'allTopic'
            break;

          case 'about':
            this.activeTopic = '消息'
            this.componentId = 'AtLists'
            break;

          case 'search':
            this.activeTopic = '搜索'
            this.componentId = 'TopicLists'
            this.listType = 'searchTopic'
            break;

          default:
            break;
        }

      },

      getTopicList (topic) {
        this.$emit('get-topic-list', topic)
        if (topic) {
          this.activeTopic = topic.TopicName
          this.componentId = 'TopicLine'
        }
      },

      getTopicListByname (topicName) {
        this.$emit('get-topic-list-byname',topicName)
        if (topicName) {
          this.activeTopic = topicName
          this.componentId = 'TopicLine'
        }
      },

      filetypeErr (msg) {
        this.$message({
          type: 'warning',
          message: msg
        })
        this.$emit('filetype-err', msg)
      },

      getLinkAllDomSize () {
         this.linkAllDomSize.height = (document.body.offsetHeight || document.documentElement.clientHeight) - this.fillPadding * 2
      },

      // Message (option) {
      //   if (this.visible) {
      //     return Message(Object.assign({}, {
      //       duration: 3000,
      //       center: true
      //     }, option, {
      //       customClass: 'znl-linkAll_message'
      //     }))
      //   }
      // }
    },

    data () {
      return {
        linkAllDomSize: {
          height: 500
        },
        componentId: 'TopicLists',
        activeTopic: '话题动态',
        listType: 'allTopic'
      }
    },

    mounted () {
      this.$nextTick(() => {
        this.getLinkAllDomSize()
      })
      elResize.on(document.body, this.getLinkAllDomSize)
      window && on(document, 'keydown', this.switchLinkAllOnOff)
    },

    destroyed () {
      elResize.off(document.body, this.getLinkAllDomSize)
       window && off(document, 'keydown', this.switchLinkAllOnOff)
    }
  }
</script>
