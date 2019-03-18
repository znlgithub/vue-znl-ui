export default {
  data() {
    return {
      visible: true,
      topicList: [],
      allTopicList: [],
      topicUserList: [],
      atRecordList: [],
      userInfo: {}
    }
  },

  methods: {
    init () {
      this.getUserInfo()
      this.getTopicAtRecordList()
    },
    ossUploadCompleted (isSucess, obj) {
      console.log(isSucess, obj)
    },

    sendTopic (config, obj) {
      if (!config.MsgContent) return
      this.getStartConnectionData('releaseTopic', config, (res) => {
        obj.InitMsg()
        if (obj.NewTopics) {
          this.$refs.znlLinkAll.changeTopic(obj.NewTopics[0])
        } else {
          this.getTopicRecordListByName(obj.ActiveTopic)
        }
      }, e => {
        console.log('err', e)
      })
    },

    getContactsList () {
      this.getStartConnectionData('GetTopicUserList', (res) => {
        this.topicUserList = res
      }, e => {
        console.log('err', e)
      })
    },

    getTopicList (topic) {
      let TopicId = topic.TopicId - 0
      this.activeTopic = topic.TopicName || ''
      // 来源于@列表时更改未读
      if (topic.source === 'atList') {
        this.hasReadTopicAt(topic)
      }
      this.getStartConnectionData('TopicList', TopicId,(res) => {
        this.topicList = res
      }, e => {
        console.log('err', e)
      })
    },

    hasReadTopicAt (topic) {
      let Id = topic.ID - 0
      this.getStartConnectionData('HasReadTopicAt', Id,(res) => {
        this.getTopicAtRecordList()
      }, e => {
        console.log('err', e)
      })
    },

    getTopicSearchRecordList () {
      this.allTopicList = []
      this.getStartConnectionData('GetTopicSearchRecordList', (res) => {
        console.log('历史', res)
        this.allTopicList = res
      }, e => {
        console.log('err', e)
      })
    },

    getTopicRecordListByName (topicName) {
      this.getStartConnectionData('GetTopicRecordListByName', topicName,(res) => {
        this.topicList = res
      }, e => {
        console.log('err', e)
      })
    },

    getTopicAtRecordList () {
      this.getStartConnectionData('GetTopicAtRecordList',(res) => {
        this.atRecordList = res
        console.log('getTopicAtRecordList', res)
      }, e => {
        console.log('err', e)
      })
    },

    deleteTopicSearchRecord (id) {
      this.getStartConnectionData('DeleteTopicSearchRecord', id, (res) => {
        this.getTopicSearchRecordList()
      }, e => {
        console.log('err', e)
      })
    },

    getAllTopicList (topicName) {
      this.getStartConnectionData('GetAllTopicList', topicName, (res) => {
        this.allTopicList = res
      }, e => {
        console.log('err', e)
      })
    },

    topTopic (Topic) {
      this.getStartConnectionData('TopTopic', Topic.Id,(res) => {
        this.getTopicRecordListByName(Topic.TopicName)
      }, e => {
        console.log('err', e)
      })
    },

    cancelTopTopic (Topic) {
      this.getStartConnectionData('CancelTopTopic', Topic.Id,(res) => {
        this.getTopicRecordListByName(Topic.TopicName)
      }, e => {
        console.log('err', e)
      })
    },

    deleteTopic (Topic) {
      this.getStartConnectionData('DeleteTopic', Topic.Id, (res) => {
        this.getTopicRecordListByName(Topic.TopicName)
      }, e => {
        console.log('err', e)
      })
    },

    getUserInfo () {
      this.getStartConnectionData('GetUserInfo', (res) => {
        this.userInfo = res
      }, e => {
        console.log('err', e)
      })
    }
  },
  
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  }
}