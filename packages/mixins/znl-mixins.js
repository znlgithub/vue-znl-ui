export default {
    name: 'znlMixins',
    data () {
        return {
        }
    },
    watch: {

    },
    methods: {
        testMethod ( source, sendto, val) {
            _.each(sendto, item => {
                this.$refs[item].sendtoData = val
            })
        },
        monitorEvent () {  // 监听子组件事件
            // console.log(this.$refs)
            _.each(this.$refs, item => {
                if (!_.isUndefined(item.sendto)) {
                    this.$refs[item.$vnode.data.ref].$on('eventStart', this.testMethod) // 初始化执行'eventStart'
                }
            })
        }
    },
    mounted () {
       this.monitorEvent()
    }
}