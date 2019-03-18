<template>
  <div 
    class="znl-link-all_topic-line" 
    :style="topicLineStyle" 
    v-loading="uploadLoading"
    element-loading-text="请稍后">

    <div class="znl-link-all_message-box" v-show="visible">
      <div class="title">确定删除这条内容吗？</div>
      <div class="footer">
        <znl-button style-type="main" :width="50" :height="30" @click="deleteTopic(deleteRow)">确定</znl-button>
        <znl-button :width="50" :height="30" @click="visible=false">取消</znl-button>
      </div>
    </div>

    <div class="znl-link-all_topic-line-wapper">

      <div 
        class="znl-topic-line" 
        :class="[item.IsTop ? 'znl-top-line_top': '']"
        v-for="(item, index) in topicListCom" 
        :key="index">

        <div class="topic-line_header">

          <div class="user-info">
            <div class="user-head">
              <img :src="item.AvartarUrl"></img>
            </div>
            <div class="user-name-time">
              <span>{{item.FromUserName}}</span>&nbsp;
              <span>{{item.CreatedStr}}</span>

            </div>
          </div>

          <div class="operate" v-if="!item.UserDefined">
              <i 
                class="iconfont icon-left_nav_show_btn" 
                @mouseenter.stop="operateMouseenter(item)"
                @mouseleave.stop="operateMouseleave(item)"></i>
          </div>

          <div 
            class="topic-line_operate" 
            v-show="item.operateShow" 
            @mouseenter.stop="operateMouseenter(item)"
            @mouseleave.stop="operateMouseleave(item)">

            <div class="stick_btn" @click="topTopic(item)">{{item.IsTop ? '取消置顶' : '置顶'}}</div>
            <div class="delete_btn" v-if="userInfo.Id === item.FromUserID" @click="deleteRow=item,item.operateShow=false,visible=true">删除</div>

          </div>
        </div>

          <div class="topic-line_content">

            <cell-render
              :render="h=>renderCell(h, item, index)">
            </cell-render>

            <span 
              v-if="typeof item.showAllMsg !== 'undefined' && item.MsgContent !== linkAllMsg" 
              class='show-all-content' data-type = 'showAllContent'
              :title="item.showAllMsg ? '收起话题' : '展开话题'"
              @click.stop="() => {$set(item, 'showAllMsg', !item.showAllMsg)}">
              {{item.showAllMsg ? '收起' : '全文'}}
            </span>

            <div class="topic-line_content-files" v-if="item.AttachIDs.length>0" @click="downFileHandler">
              <ul>
                <li v-for="(file,i) in item.AttachIDs" :key="i">
                  <a 
                  :href="downFileMethod ? 'javascript:void(0);' : file.Url" 
                  :download="!downFileMethod"
                  :data-name="file.Name"
                  :data-url="file.Url"
                   class="link">
                    <i class="iconfont icon-linkall_attachment_i"></i>
                    {{file.Name}}
                  </a>
                </li>
              </ul>
            </div>

          </div>
    
      </div>

      <div v-if="topicListCom.length === 0" class="znl-link-all_no-list">
        暂无内容，去记录一条内容吧
      </div>

    </div>

    <div class="topic-line_footer-container">

      <div class="topic-line_footer-files">

        <ul>

          <li 
            class="topic-line_footer-files-row"
            v-for="(item, index) in fileList"
            :key="index"
            >
            <span class="nowarp">
              <i class="iconfont icon-linkall_attachment_i"></i>
              {{item.FileName}}
            </span>

            <i class="iconfont icon-close_btn" @click="closeFile(item, index)" title="删除文件"></i>
          </li>

        </ul>

      </div>

      <div class="topic-line_footer">

        <div class="topic-line_footer-send">

          <textarea 
            class="topic-line_footer-send-input"
            :class="[isFocus?'is-focus':'']"
            :rows="2"
            ref="textareaInput"
            wrap="hard"
            v-model="MsgContent"
            :cols="5"
            @focus.self="isFocus=true"
            @blur.self="isFocus=false"
            @keydown.stop.ctrl.enter="sendTopic('ctrlEnter', $event)"
            @keydown.stop.enter="sendTopic('enter', $event)"
            >
          </textarea>
          <!-- <pre>{{MsgContent}}</pre> -->

          <div class="znl-clear"></div>

          <contacts 
            :topic-user-list = "topicUserList"
            :contacts-list-show.sync = "contactsListShow"
            ref = "contactsList">
          </contacts>

        </div>

        <div class="topic-line_footer-tabs" @click="linkAllFooterHandler">

          <span class="item" data-type="newTopic" title="插入话题"> <i class="iconfont icon-linkall__ic" data-type="newTopic"></i>话题</span>

          <span class="line"></span>

          <span class="item" data-type="atContact" title="@ta"><i class="iconfont icon-linkall__ic1" data-type="atContact"></i>at</span>

          <span class="line"></span>

          <span class="item" data-type="accessory" title="上传附件">
            <input type="file" class="link-all_file" ref="uploadFile" @change="changeHandler">
            <span class="accessory" data-type="accessory">
              <i class="iconfont icon-linkall_attachment_i" data-type="accessory"></i>
              附件
            </span>
          </span>

          <znl-button 
            :width="58" 
            :height="20" 
            style-type="link" 
            @click="sendTopic" 
            class="sendbtn"
            :disabled="disabled">
            发布
            <i :class="['iconfont', !dialogMiniShow ? 'icon-arrow_unfold_btn' : 'icon-arrow_up_btn']" @click.stop="selectSendMode"></i>
          </znl-button>

          <dialog-mini
          :visible.sync="dialogMiniShow"
          :show-close="false"
          :options="{
            right: 10,
            bottom: 74
          }"
          >
          <div ref="selectSendMode" class="select-send-mode" @blur="closeSelectSendMode()" @click="closeSelectSendMode()" tabindex="-1">
            <el-radio 
                :border="false" 
                v-model="sendModeType" 
                :label="1">
                按Enter发布消息
                <i class="iconfont icon-bomlist_save_btn1"></i>
            </el-radio>
            <el-radio 
                :border="false" 
                v-model="sendModeType"
                :label="2">
                按Ctrl+Enter发布消息
                <i class="iconfont icon-bomlist_save_btn1"></i>                
            </el-radio>
          </div>
          </dialog-mini>

        </div>
      </div>

    </div>

  </div>
</template>

<script>

  import { getStrLeng } from '~/utils/dom';
  import cellRender from '@/commonComponents/cellRender.js';
  import Contacts from './contacts';
  import ZnlButton from 'packages/button';
  import DialogMini from 'packages/dialog-mini';
  export default {
    name: 'TopicLine',

    components: {
      cellRender,
      Contacts,
      ZnlButton,
      DialogMini
    },

    props: {
      region: String,
      accessKeyId: String,
      accessKeySecret: String,
      bukect: String,
      ossFileUrl: String,
      oss: Function,
      downFileMethod: Function,
      topicList: {
        type: Array,
        default () {
          return []
        }
      },
      allTopicList: {
        type: Array,
        default () {
          return []
        }
      },
      topicUserList: {
        type: Array,
        default () {
          return []
        }
      },
      activeTopic: {
        type: String,
        default: ''
      },
      fileTypes: {
        type: Array,
        default:() => {
          return []
        }
      },
      maxFileSize: {
        type: Number,
        default: 6 * 1024 * 1024
      },
      folder: {
        type: String,
        default: 'makesureFile'
      },
      userInfo: {
        type: Object,
        default () {
          return {}
        }
      },
      pmAvartarUrl: {
        type: String,
        default: ''
      }
    },

    filters: {
     
    },

    computed: {
      topicListCom () {
        let timeStr = `今天 ${new Date().getHours()}:${new Date().getMinutes()}`
        let list = [
          {
            FromUserName: '产品经理',
            CreatedStr: timeStr,
            AvartarUrl: this.pmAvartarUrl,
            AttachIDs: [],
            MsgContent: this.linkAllMsg,
            IsTop: true,
            UserDefined: true
          }
        ]
        return this.activeTopic === '#关于LinkAll#' ? list.concat(this.topicList) : this.topicList
      },

      topicLineStyle () {
        let style = {}

        style.paddingBottom = 80 + this.fileList.length * 30 + 'px'

        return style
      },

      Attach () {
        return _.map(this.fileList, item => {
          return {
            Url: item.UploadUrl,
            Name: item.FileName
          }
        })
      }
    },

    watch: {
      MsgContent (val) {
        this.MsgChange(val)
      },

      topicList () {
        this.$nextTick(() => {
          this.topicListCom.map((item, index) => {
            let height = this.$el.querySelectorAll('.znl-topic-line')[index].querySelector('.topic-line_content').offsetHeight
            if (height > 105) {
              this.$set(item, 'showAllMsg', false)
            }
          })
        })
      }
    },

    data () {
      return {
        MsgContent: this.activeTopic  + '  ',
        ToUserID: '',
        strLeng: 0,
        percentage: 0,
        contactsListShow: false,
        isFocus: false,
        fileList: [],
        uploadSuccessSrc: '',
        uploadLoading: false,
        visible: false,
        deleteRow: '',
        disabled: true,
        dialogMiniShow: false,
        sendModeType: 1,
        timeId: null,
        linkAllMsg: `<span class='znl-linkall_system-topic'>&nbsp;&nbsp;&nbsp;&nbsp;亲爱的ERP用户，您好！欢迎进入LinkAll。LinkAll是一个记事中心，您可以在ERP软件中从带有<i class='iconfont icon-linkall__ic'></i>图标的话题入口进入话题，在话题内和同事进行交流，记录有用的工作信息。所有信息仅作为内部使用，不对外公开。<br/> &nbsp;&nbsp;&nbsp;&nbsp;为了提供更好的产品体验，您在使用过程中如有任何反馈建议，请直接回复本话题，我们会尽快处理。感谢您的参与！<span>`
      }
    },

    methods: {
      operateMouseenter (item) {
        clearTimeout(item.timeId)
        this.$set(item, 'operateShow', true)
      },

      operateMouseleave (item) {
        item.timeId = setTimeout(() => {
          this.$set(item, 'operateShow', false)
          clearTimeout(item.timeId)
        }, 100);
      },

      contentTranfrom (MsgContent, chat, replacement) {
        let labelPattern = new RegExp(chat, 'g')
        let labelTexts = MsgContent.match(labelPattern) || []
        _.each(labelTexts, (item, index) => {
          MsgContent = MsgContent.replace(new RegExp(chat), typeof replacement === 'function' ? replacement(item) : replacement)
        })
        return MsgContent
      },

      renderCell (h, topic, index) {
        if (!topic.MsgContent) return

        let vm = this
        let MsgContent = topic.MsgContent

        if (this.activeTopic !== '#关于LinkAll#' || (this.activeTopic === '#关于LinkAll#' && MsgContent !== this.linkAllMsg)) {
          // XSS防御
          MsgContent = this.contentTranfrom(MsgContent, '<', `&lt;`)
          MsgContent = this.contentTranfrom(MsgContent, '>', `&gt;`)
          MsgContent = this.contentTranfrom(MsgContent, '"', `&quot;`)
          MsgContent = this.contentTranfrom(MsgContent, ' ', `&nbsp;`)
        }

        MsgContent = this.contentTranfrom(MsgContent, '\n', `<br/>`)

        let pattern = /#(.+?)#/g
        let texts = MsgContent.match(pattern) || []

        let atPattern = /@(.+?)&nbsp;/g
        let atTexts = MsgContent.match(atPattern) || []

        _.each(texts, (item, index) => {
          MsgContent = MsgContent.replace(new RegExp(item), `<span class="znl-topic-line_link" title="跳转到${item}话题" data-topic-name=${item}> ${item} </span>`)
        })

        _.each(atTexts, (item, index) => {
          MsgContent = MsgContent.replace(new RegExp(item), `<span class="znl-topic-line_at-span"> ${item} </span>`)
        })

        return h('div', {
          domProps: {
            innerHTML: MsgContent
          },
          attrs: {
            class: `topic-line_msg-content
              ${ 
                typeof topic.showAllMsg !== 'undefined' 
                && !topic.showAllMsg 
                && topic.MsgContent !== this.linkAllMsg ? 'maxHeight' : ''
              }`
          },
          on: {
            click (e) {
              let targetDateDom = e.target || e.srcElement
              let topicName = targetDateDom.getAttribute('data-topic-name')
              if (topicName && vm.activeTopic !== topicName) {
                vm.$emit('get-topic-list-byname', topicName)
              }
            }
          }
        })
      },

      closeFile (fileInfo, index) {
        this.fileList.splice(index, 1)
      },

      clearMsg () {
        this.MsgContent = ''
        this.fileList = []
      },

      initMsg () {
        this.MsgContent = this.activeTopic
        this.fileList = []
      },

      MsgChange (val) {
        let lastChar = val.substr(val.length - 1, 1)
        if (lastChar === '@') {
          this.contactsListShow = true
          this.strLeng = getStrLeng(val)
          this.$emit('get-contacts-list')
          this.$nextTick(() => {
            this.$refs.contactsList.$el.focus()
          })
        }

        let content = ''

        let pattern = /#(.+?)#/g
        let texts = val.match(pattern) || []

        _.each(texts, (item, index) => {
          content = val.replace(new RegExp(item), ` `)
        })
        // 截取到有话题且有其他内容
        // 或者无话题,有内容时可以发布
        if (content.trim().length > 0 && texts.length > 0 || content.trim().length === 0 && texts.length === 0 && val.trim().length > 0) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      },

      sendTopic (type, event) {
        if (this.disabled) return;
        if (type === 'ctrlEnter' && this.sendModeType === 1 && event.ctrlKey) {
          this.MsgContent += '\n'
          this.$nextTick(() => {
            this.$refs.textareaInput.scrollTop = 1000
          })
        }
        if (!type || !event || type === 'ctrlEnter' && this.sendModeType === 2 || type === 'enter' && this.sendModeType === 1 && event.ctrlKey === false) {
          let pattern = /#(.+?)#/g
          let texts = this.MsgContent.match(pattern)
          this.$emit('send-topic', {
            MsgContent: this.MsgContent,
            TopicName: this.activeTopic,
            ToUserID: this.ToUserID,
            Attach: this.Attach
          }, {
            InitMsg: this.initMsg,
            ClearMsg: this.clearMsg,
            ActiveTopic: this.activeTopic,
            NewTopics: texts
          })
        }
      },

      closeSelectSendMode() {
        this.timeId = setTimeout(() => {
          this.dialogMiniShow = false
          clearTimeout(this.timeId)
        }, 150)
      },

      selectSendMode () {
        if (this.disabled) return;
        this.dialogMiniShow = !this.dialogMiniShow;
        if (this.dialogMiniShow) {
          clearTimeout(this.timeId)
          this.$nextTick(() => {
            this.$refs.selectSendMode.focus()
          })
        }
      },

      topTopic (topic) {
        if (!topic.IsTop) {
          this.$emit('top-topic', topic)
        } else {
          this.$emit('cancel-top-topic', topic)          
        }
      },

      deleteTopic (topic) {
        this.$emit('delete-topic', topic)
        this.visible = false
      },

      addNewTopci () {
        let con = '在这里输入你想要说的话题'

        // this.MsgContent = this.MsgContent.replace(/\n/g, "<br/>>");
        let pattern = /#(.+?)#/g
        let texts = this.MsgContent.match(pattern)
        if (!_.some(texts, item => {return item === `#${con}#`})) {
          this.MsgContent += `#${con}#`
        }

        let input = this.$refs.textareaInput
  
        var l = this.MsgContent.length
        this.$nextTick(() => {
          if( input.createTextRange){//IE浏览器
            var range =  input.createTextRange()
            range.moveEnd("character",-l)
            range.moveEnd("character",l-1)
            range.moveStart("character", l - 1 - this.MsgContent.length)
            range.select();
          }else{
            input.setSelectionRange(l-1-con.length,l-1);
            input.focus();
          }
        })
      },

      linkAllFooterHandler (e) {
        let targetDateDom = e.srcElement || e.target
        let type = targetDateDom.getAttribute('data-type')
        switch (type) {
          case 'newTopic':
            this.addNewTopci()
            break;

          case 'atContact':
            if (!this.contactsListShow) {
              this.MsgContent += '@'
            }
            break;

          case 'accessory':
            this.$refs.uploadFile.click()
            break;

          default:
            break;
        }
      },

      downFileHandler (event) {
        if (!this.downFileMethod) return
        let fileInfo = {}
        fileInfo.Name = event.target.dataset.name
        fileInfo.Url = event.target.dataset.url
        this.downFileMethod(fileInfo)
        return false
      },

      // 处理上传，将文件上传到阿里云
      doUpload () {
        this.uploadLoading = true
        const _this = this
        let OSS = this.oss
        const client = new OSS.Wrapper({
          region: _this.region,
          accessKeyId: this.accessKeyId,
          accessKeySecret: this.accessKeySecret,
          bucket: _this.bukect
        })

        _this.percentage = 0

        const file = this.$refs.uploadFile.files[0]

        if (file) {
          this.uploadToOss(client, file)
        }
      },

      // 随机生成文件名
      random_string (len) {
        len = len || 32
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        var maxPos = chars.length
        var pwd = ''
        for (let i = 0; i < len; i++) {
          pwd += chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return pwd
      },

      uploadToOss (client, file) {
        const _this = this
        // 随机命名
        let randomName = this.folder + '/' + this.random_string(6) + '_' + new Date().getTime() + '.' + file.name.split('.').pop()
        // 上传
        client.multipartUpload(randomName, file, {
          progress: function* (percentage, cpt) {
            // 上传进度
            _this.percentage = percentage
          }
        }).then((results) => {
          // 上传完成
          let filepath = this.ossFileUrl + results.name
          this.uploadSuccessSrc = results.res.requestUrls[0]
          this.onUploadCompleted(file.name, file.size, filepath)
        }).catch((err) => {
          _this.$emit('oss-upload-completed', false, {
            maxFileSize: this.maxFileSize,
            message: '上传失败',
            errObj: err
          })
            this.uploadLoading = false
        })
      },

      // 文件成功上传到阿里云后
      onUploadCompleted (fileName, fileSize, fileUrl) {

        this.fileList.push({
          FileName: fileName, 
          FileSize: fileSize,
          UploadUrl: fileUrl
        })

        this.uploadLoading = false
        this.fileInfo = {
          FileName: fileName, 
          FileSize: fileSize,
          MaxFileSize: this.maxFileSize,
          UploadUrl: fileUrl
        }
        if (fileSize < this.maxFileSize) {
          this.$emit('oss-upload-completed', true, {
            fileName: fileName, 
            fileSize: fileSize,
            maxFileSize: this.maxFileSize,
            fileUrl: fileUrl
          })
        } else {
          this.$emit('oss-upload-completed', false, {
            fileName: fileName, 
            fileSize: fileSize,
            maxFileSize: this.maxFileSize,
            fileUrl: fileUrl,
            message: '文件大小超出限制'
          })
        }
      },

      changeHandler (e) {
        let file = this.$refs.uploadFile.files[0]

        this.uploadLoading = true
        if (_.isUndefined(file)) {
          this.uploadLoading = false
          return
        }
        // 文件格式验证
        let fileName = this.$refs.uploadFile.files[0].name

        let fileTypeVerify = false
        if (this.fileTypes.length > 0) {
          _.find(this.fileTypes, item => {
            if (fileName.match(item+'$')) {
              return (fileTypeVerify = true)
            }
          })
        }

        if (fileTypeVerify) {
          this.doUpload()
        } else {
          let text = this.fileTypes.join(',')
          this.uploadLoading = false
          this.$emit('filetype-err', '文件格式验证失败,只允许上传' + text + '的格式文件')
        }
      }

      // setContactListPosition () {
      //   let domPosition = this.$refs.textareaInput.getBoundingClientRect()
      //   this.contactsListStyle.left = domPosition.left + 'px'
      //   this.contactsListStyle.top = domPosition.top - this.$refs.contactsList.offsetHeight + 'px'
      // }
    },

    mounted () {

    }
  }
</script>
