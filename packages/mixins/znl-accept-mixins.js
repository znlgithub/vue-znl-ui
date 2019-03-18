export default {
    name: 'znlAcceptMixins',
    data () {
        return {
            sendtoData: ''
        }
    },
    watch: {
        sendtoData (val) {
            this.AcceptData && this.AcceptData(val)
        }
    },
    methods: {
       
    },
    mounted () {
      
    }
}