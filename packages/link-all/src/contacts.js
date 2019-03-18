export default {
  name: 'Contacts',

  data () {
    return {
      activeConcact: null,
      concactIndex: 0
    }
  },

  props: {
    topicUserList: {
      type: Array,
      default () {
        return []
      }
    },
    contactsListShow: Boolean
  },

  methods: {
    selectContact (e) {
      let targetDateDom = e.srcElement || e.target
      let userId = targetDateDom.dataset.userid
      let userName = targetDateDom.dataset.username
      if (userId) {
        this.$parent.MsgContent += `${userName} `
        this.$parent.ToUserID = userId
        this.$parent.$refs.textareaInput.focus()
      } else {
      }
      e.stopPropagation()
      this.$nextTick(() => {
        this.$emit('update:contactsListShow', false)
        this.activeConcact = null
      })
    },

    contactsListKeydownHandler (event, topicUserList) {
      if (event.keyCode === 38) {
        this.activeConcactHandler(true, topicUserList)
      } else if (event.keyCode === 40) {
        this.activeConcactHandler(false, topicUserList)
      } else if (event.keyCode === 13){
        if (this.activeConcact) {
          let userName = this.activeConcact.UserName
          let userId = this.activeConcact.UserId
          this.$parent.MsgContent += `${userName} `
          this.$parent.ToUserID = userId
          this.$parent.$refs.textareaInput.focus()
          this.$nextTick(() => {
            this.colseSelectList()
          })
        }
      }
      event.preventDefault()
      event.stopPropagation()
    },

    activeConcactHandler (type, topicUserList) {
      if(!this.activeConcact) {
        this.activeConcact = topicUserList[0]
        this.concactIndex = 0
      } else {
        if (type) {
          this.activeConcact = this.concactIndex <= 0 
          ? (this.concactIndex = topicUserList.length - 1, topicUserList[topicUserList.length - 1]) 
          : topicUserList[--this.concactIndex]
        } else {
          this.activeConcact = this.concactIndex >= topicUserList.length - 1 
          ? (this.concactIndex = 0, topicUserList[0]) 
          : topicUserList[++this.concactIndex]
        }
      }
      this.$nextTick(() => {
        let activeRow = this.$el.querySelector('.contact-row.active')
        activeRow.focus()
        this.$emit('update:contactsListShow', true)
      })
      // console.log(this.concactIndex, this.activeConcact.UserName, topicUserList.length)
    },

    colseSelectList () {
      this.$emit('update:contactsListShow', false)
      this.activeConcact = null
    },

    onBlurHandler (event) {
      this.$nextTick(() => {
        _.delay(() => {
          let findActive = _.some(document.activeElement.classList, item => {
            return item === 'contact-row'
          })

          let isRowTarget = _.some(event.target.classList, item => {
            return item === 'contact-row'
          })
          if (!findActive || isRowTarget) {
            this.colseSelectList()
          }
        }, 200)
      })
    },

    atListClassHandler (concact) {
      if (this.activeConcact && (this.activeConcact.UserId === concact.UserId)) {
        return 'active'
      }
    }
  },

  render (h) {
    let _this = this
      return (
        <div
          class = {`topic-line_footer-contacts-list ${this.contactsListShow ? '' : 'hide'}`}
          tabindex = "-1"
          on-blur = { (event) => { _this.onBlurHandler(event)}}
          on-click = { (event) => {_this.selectContact(event)}}
          on-keydown = {event => _this.contactsListKeydownHandler(event, _this.topicUserList)}
          >
          <ul>
            <li class = "contact-row" key="-1">选择@的人</li>
            {
              _this.topicUserList.map((item, index) => {
                return (
                  <li 
                    key = {index} 
                    tabindex = {index}
                    data-userid = {item.UserId}
                    data-username = {item.UserName}
                    class = {`contact-row ${_this.atListClassHandler(item)}`}>
                    {item.UserName}
                  </li>
                )
              })
            }
          </ul>
        </div>
      )
  }
}