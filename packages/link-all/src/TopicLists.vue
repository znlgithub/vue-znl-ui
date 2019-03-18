<template>
  <div class="znl-link-all_topic-list">
    
    <div class="znl-link-all_topic-list-header" :class="[listType]">
      
      <span v-if="listType==='allTopic'" class="topic">话题</span>
      <span v-if="listType==='allTopic'" class="update-time">更新时间</span>

      <input 
        v-if="listType==='searchTopic'" 
        class="znl-link-all_search-input" 
        type="text"
        placeholder="搜索型号"
        v-model="searchTopicName"
        @keydown.enter="$emit('get-all-topic-list', `${searchTopicName.trim()}`)">
      
      <znl-button 
        style-type="link" 
        :height="34" 
        :width="46"  
        v-if="listType==='searchTopic'" 
        @click.stop="$emit('get-all-topic-list', `${searchTopicName.trim()}`)">
        <i  class="iconfont icon-linkall_search_ic"></i>
      </znl-button>

    </div>

    <div 
      class="znl-link-all_topic-list-body" 
      :style="topicListBodyStyle"
      @click="linkAllRowHandler">

      <!-- <ul> -->

        <znl-scrollbar
          tag="ul"
          >

          <li class="znl-link-all-row title" v-if="listType==='searchTopic' && !searchTopicName">搜索记录</li>

          <li 
            class="znl-link-all-row addNew"
            data-topicname="关于LinkAll"
            v-if="listType==='allTopic'">

              <!-- <span 
              class="newtopic"
              data-topicname="关于LinkAll">
              关于LinkAll
            </span> -->
            <span 
              class="row-topic" 
              data-topicname="关于LinkAll">
              #关于LinkAll#
            </span>

            <span 
              class="row-update-time"
              data-topicname="关于LinkAll">
              2018-05-16
            </span>

          </li>

          <li 
            class="znl-link-all-row"
            v-for="(item, index) in allTopicListCom"
            :key="index"
            :data-topicid="item.TopicId"
            :data-topicname="item.TopicName">
            <span 
              class="row-topic" 
              :data-topicid="item.TopicId"
              :data-topicname="item.TopicName">
              
              {{item.TopicName}}

            </span>

            <span 
              class="row-update-time"
              v-if="listType==='allTopic'" 
              :data-topicid="item.TopicId"
              :data-topicname="item.TopicName">
              
              {{item.UpdateTimeStr | timeFilter}}
              
            </span>

            <span
              class="row-update-time"
              v-if="listType==='searchTopic' && !searchTopicName"
              :data-deleteid="item.ID"
              >
              <i class="iconfont icon-close_btn" :data-deleteid="item.ID"></i>
            </span>
          </li>

          <li class="znl-link-all-row title" v-if="searchTopicName && allTopicListCom.length === 0">按回车进行搜索</li>

        </znl-scrollbar>

      <!-- </ul> -->
      
    </div>
    

  </div>
</template>

<script>
  import ZnlScrollbar from 'packages/scrollbar/src/main.js'
  export default {
    name: 'TopicLists',

    props: {
      allTopicList: {
        type: Array,
        default () {
          return []
        }
      },

      listType: {
        type: String,
        default: 'allTopic'
      }
    },

    filters: {
      timeFilter (val) {
        let date = new Date(val)
        
        var y =  date.getUTCFullYear()
        var m = date.getUTCMonth() + 1
        var d = date.getUTCDate()

        if (_.isNaN(y)) {
          return val
        } else {
          return `${y}-${m}-${d}`
        }
      }
    },

    components: {
      ZnlScrollbar
    },

    computed: {
      allTopicListCom () {
        return _.filter(this.allTopicList, item => {
          return item.TopicName !== '#关于LinkAll#'
        })
      },

      topicListBodyStyle () {
        let style = {}
        style.height = this.$parent.linkAllDomSize.height - 92 + 'px'
        return style
      }
    },

    methods: {
      linkAllRowHandler (e) {
        let targetDateDom = e.srcElement || e.target
        let topicid = targetDateDom.dataset.topicid
        let topicname = targetDateDom.dataset.topicname
        let deleteid = targetDateDom.dataset.deleteid

        if (this.listType === 'allTopic') {
          topicid && this.$emit('get-topic-list', {TopicId:topicid, TopicName: topicname})
        } else if (this.listType === 'searchTopic' && _.isUndefined(deleteid)) {
          if (topicname === undefined) return
          topicname = topicname && topicname.substring(0, 1) === '#' ? topicname : `#${topicname}#`
          topicname && this.$emit('get-topic-list-byname', topicname) 
        } else if (!_.isUndefined(deleteid)) {
          this.$emit('delete-topic-search-record', deleteid - 0)
        }

        if (topicname === '关于LinkAll') {
          // this.$emit('publish-new-topic', topicname)
          this.$emit('get-topic-list-byname', '#关于LinkAll#') 
        }
      }
    },

    data () {
      return {
        searchTopicName: ''
      }
    },

    watch: {
      listType (listType) {
        if (listType === 'allTopic') {
          this.$emit('get-all-topic-list')
        } else if (listType === 'searchTopic') {
          this.$emit('get-topic-search-record-list')
        }
      },

      searchTopicName (val) {
        !val && this.$emit('get-topic-search-record-list')
      }
    },

    mounted () {
      this.$nextTick(() => {
        if (this.listType === 'allTopic') {
          this.$emit('get-all-topic-list')
        } else if (this.listType === 'searchTopic') {
          this.$emit('get-topic-search-record-list')
        }
      })
    }
  }
</script>
