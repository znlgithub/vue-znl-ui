import ZnlDialog from 'packages/dialog/index'
import ZnlInput from 'packages/input/index'

export default {
  name: 'ChangeColumn',

  data () {
    return {
      newColumnHeader: ''
    }
  },

  components: {
    ZnlDialog,
    ZnlInput
  },

  props: {
    visible: Boolean,
    column: {
      type: Object,
      default () {
        return {
          header: ''
        }
      }
    }
  },

  methods: {
    closeHandler () {
      this.$emit('update:visible', false)
    },

    inputHandler (value) {
      this.newColumnHeader = value
    },

    confirmCallBack () {
      this.$emit('change-column', _.extend({}, this.column, {header: this.newColumnHeader}))
      this.$emit('update:visible', false)
    }
  },

  watch: {
    visible (val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.newColumnEdit.handleFocus()
        })
      }
    }
  },

  render (h) {
    if (this.visible) {
      return (
        <znl-dialog
          visible = { !!this.visible }
          onClose = { this.closeHandler }
          width = { `300px` }
          height = { 150 }
          class = "znl-change-column"
          confirm-call-back = { this.confirmCallBack }
          >
          <div>
  
            <div class = "change-column_row">
              <znl-input
                title = "旧列名："
                value = {this.column.header}
                disabled = { true }
                >
              </znl-input>
            </div>
  
            <div class = "change-column_row">
              <znl-input
                ref = "newColumnEdit"
                title = "新列名："
                value = {this.column.header}
                onInput = { this.inputHandler }
                >
              </znl-input>
            </div>
  
          </div>
        </znl-dialog>
      )
    } else {
      return null
    }
  }
}