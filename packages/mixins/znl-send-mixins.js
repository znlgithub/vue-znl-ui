
export default {
  data () {
    return {
    }
  },
  props: {
    sendto: Array // 必需
  },
  methods: {
    emitCommont (data) {
        this.$emit('eventStart', this.$vnode.data.ref, this.sendto, data)
    }
  }
}
