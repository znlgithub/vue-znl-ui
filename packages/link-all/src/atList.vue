<template>
  <div class="znl-link-all_at-list" @click.stop="atListClickHandler">

    <ul>
      <li v-for="(item, index) in atRecordList" :key="index" :data-topicid="item.TopicID" :data-id="item.ID" :data-topicname="item.TopicName">

          <div class="znl-link-all_at-list-line" :data-topicid="item.TopicID" :data-id="item.ID" :data-topicname="item.TopicName">

            <div class="user-head">
              <img :src="item.AvartarUrl" alt="">
              <span class="znl-link-all_tip user-head_not-read" v-if="!item.HasRead"></span>
            </div>

            <div class="at-info" :data-topicid="item.TopicID" :data-id="item.ID" :data-topicname="item.TopicName">
              <div :data-topicid="item.TopicID" :data-id="item.ID" :data-topicname="item.TopicName">

                <span class="user-name" :data-topicid="item.TopicID" :data-id="item.ID" :data-topicname="item.TopicName">{{item.FromUserName}}</span>

                <span class="user-time" :data-topicid="item.TopicID" :data-id="item.ID" :data-topicname="item.TopicName">
                  {{item.CreatedTimeStr}}
                </span>

              </div>
              <div :data-topicid="item.TopicID" :data-id="item.ID" :data-topicname="item.TopicName">

                <span class="topic-info" :data-topicid="item.TopicID" :data-id="item.ID" :data-topicname="item.TopicName">
                  在
                  <span 
                    class="znl-topic-line_link"
                    :data-topicid="item.TopicID" :data-id="item.ID" :data-topicname="item.TopicName"
                    >
                    {{item.TopicName}}
                  </span>话题 
                  <span class="znl-topic-line_at-span" :data-topicid="item.TopicID" :data-id="item.ID" :data-topicname="item.TopicName">@</span>了你
                </span>

              </div>
            </div>

          </div>

      </li>
    </ul>

    <div v-if="atRecordList.length === 0" class="znl-link-all_no-list">
      暂无消息，让小伙伴@我一下吧
    </div>

  </div>
</template>

<script>

  export default {
    name: 'AtList',

    props: {
      atRecordList: {
        type: Array,
        default () {
          return []
        }
      }
    },

    components: {

    },

    computed: {

    },

    methods: {
      atListClickHandler (e) {
        let targetDateDom = e.srcElement || e.target
        let topicid = targetDateDom.dataset.topicid
        let id = targetDateDom.dataset.id
        let topicname = targetDateDom.dataset.topicname
        topicid && this.$emit('get-topic-list', {
          TopicId: topicid - 0, 
          TopicName: topicname,
          ID: id,
          source: 'atList'})
      }
    },

    data () {
      return {}
    },

    mounted () {
      this.$nextTick(() => {
        this.$emit('get-topic-at-record-list')
      })
    }
  }
</script>
