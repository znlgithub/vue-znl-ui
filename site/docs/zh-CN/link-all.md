<script>
  let signalrMixins = require('../scripts/signalr').default
  let linkAllMixins = require('../scripts/linkAll').default
  let znlTest = require('../scripts/test').default
  module.exports = {
    mixins: [signalrMixins, linkAllMixins],
    components: {znlTest},
    methods: {
      addNewTopic () {
        this.$refs.znlLinkAll.changeTopic('vvv')
      },
      addNewTopic1 () {
        this.$refs.znlLinkAll.changeTopic('iii')
      },
      filetypeErr (msg) {
        console.log(msg)
      },
      downFileMethod (fileInfo) {
        console.log(fileInfo)
      }
    }
  };
</script>

<style>

</style>
## LinkAll 会话组件


### 基本用法


:::demo 

```html
<znl-button :width="100" :height="40" @click="visible=true">点击弹出</znl-button>

<znl-link-all
  region="oss-cn-shenzhen"
  access-key-id="LTAIG4tSAAfBZoeq"
  access-key-secret="NJxgcQKthSRf2oDFAIz673y4AOVCy2"
  bukect="vitozhang"
  oss-file-url="//vitozhang.oss-cn-shenzhen.aliyuncs.com/"
  :oss="require('ali-oss/dist/aliyun-oss-sdk.js')"
  folder="test1"
  :fill-padding="50"
  :down-file-method="downFileMethod"

  ref="znlLinkAll"
  @filetype-err="filetypeErr"
  :file-types="['.dox', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.csv', '.pdf', '.txt', '.jpg', '.jpeg', '.png', '.bmp', '.gif', '.TIFF']"
  :visible.sync="visible"
  :topic-list="topicList"
  :all-topic-list="allTopicList"
  :topic-user-list="topicUserList"
  :at-record-list="atRecordList"
  :user-info="userInfo"
  pm-avartar-url="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2989372740,3674058361&fm=27&gp=0.jpg"
  @delete-topic-search-record="deleteTopicSearchRecord"
  @get-topic-at-record-list="getTopicAtRecordList"
  @get-topic-list="getTopicList"
  @get-topic-list-byname="getTopicRecordListByName"
  @get-topic-search-record-list="getTopicSearchRecordList"
  @get-all-topic-list="getAllTopicList"
  @send-topic="sendTopic"
  @get-contacts-list="getContactsList"
  @top-topic="topTopic"
  @cancel-top-topic="cancelTopTopic"
  @delete-topic="deleteTopic"
  @oss-upload-completed="ossUploadCompleted">

</znl-link-all>
<!-- <textarea id="target"></textarea>
<p><button id="btn">插入话题</button></p> -->
<hr/>
<znl-button @click="addNewTopic">话题入口</znl-button>
<znl-button @click="addNewTopic1">话题入口1</znl-button>


<script>
  export default {
    data () {
      return {

        }
      }
    }
  }
</script>

```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值 | 默认值  |
|--------- |------------- |-------- |------- |-------- |
| region            | OSS参数   | String   |  |  |
| access-key-id     | OSS参数   | String   |  |  |
| access-key-secret | OSS参数   | String   |  |  |
| bukect            | OSS参数   | String   |  |  |
| oss-file-url      | OSS参数   | String   |  |  |
| oss               | OSS的SDK方法  | Function |                                          |                               |
| folder | OSS参数:存储到OSS时的目录名 | String   |    | makesureFile |
| visible.sync | 组件是否显示 | Boolean |   | false |
| topic-list | 话题列表 | Array | | |
| all-topic-list | 所有/搜索话题列表 | Array | | |
| topic-user-list | 联系人列表 | Array | | |
| at-record-list | @列表 | Array | | |
| file-types | 允许上传的文件格式 | Array |  | []默认允许所有文件 |
| user-info | 用户信息 | Object | | |
| pm-avartar-url | 默认信息头像地址 | String | | |
| fill-padding | 上下留空间距 | Number |  | 0 |
| down-file | 下载用户上传文件的方法 | Function | | |



### Slot
| name | 说明 |
|------|--------|
| 默认 | |

### METHODS
| name | 说明 | 参数 |
| ---- | ---- | ---- |
| changeTopic | 外部话题入口方法 | 话题名称 |


### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| get-topic-list | 获取话题列表 | topicInfo{} |
| get-topic-list-byname | 获取话题列表 | 话题关键字 |
| get-all-topic-list | 获取所有话题 | |
| send-topic | 发布话题 | {MsgContent, TopicName,ToUserID,Attach}, {InitMsg,ClearMsg,ActiveTopic} |
| top-topic | 置顶 | Topic |
| delete-topic | 删除话题 | |
| cancel-top-topic | 取消置顶 | Topic |
| delete-topic-search-record | 删除历史搜索记录 | id |
| get-topic-at-record-list | 获取@列表 | |
| get-topic-search-record-list | 获取搜索历史列表 | |
| get-contacts-list | 获取联系人列表 | |
| oss-upload-completed | oss上传完成后 | |
| filetype-err | 文件格式错误后的msg信息 | |


