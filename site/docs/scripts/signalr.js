import 'signalr'
const HUBNAME = 'linkAllHub'

export default {
  name: 'signalrMixins',

  data () {
    return {
      connection: {},
      websock: null,
      demoChatHubProxy: {},
      clientMethodSets: [ // 客户端方法注册
        {
          name: 'RefreshAtRecordList',
          method: () => {
            console.log('RefreshAtRecordList')
            this.getTopicAtRecordList() // 刷新@列表
          }
        }
      ]
    }
  },

  methods: {
    get_sl_url () {
      let url = '//api.bom.ai/im/'
      let hostname = location.hostname
      if (/^[local]/.test(hostname)) {
        url = '//192.168.1.10:8005/'
      }
      if (/^[test]/.test(hostname)) {
        url = '//test.bom.ai:8088/'
      }
      return url
    },

    getCookie (cname) {
      // const isProduction = process.env.NODE_ENV === 'production'
      if (document.cookie.length > 0) {
        var cstart = document.cookie.indexOf(cname + '=')
        if (cstart !== -1) {
          cstart = cstart + cname.length + 1
          var cend = document.cookie.indexOf(';', cstart)
          if (cend === -1) cend = document.cookie.length
          return unescape(document.cookie.substring(cstart, cend))
        }
      }
      return ''
    },

    // 链接
    startConnection () {
      this.connection = $.hubConnection(this.get_sl_url(), {
        qs: {
          'token': this.getCookie('token')
        }})
      console.log(this.getCookie('token'))
      this.demoChatHubProxy = this.connection.createHubProxy(HUBNAME)
      this.demoChatHubProxy.on('broadcastMessage', function (userName, message) {}) // 注册broadcastMessage方法
      this.createHubProxy(this.connection) // 遍历注册客户端方法

      // 初始化
      _.delay(() => {

      }, 20)
    },

    createHubProxy (hub) {
      let proxy = hub.createHubProxy(HUBNAME)
      // 注册客户端方法
      this.clientMethodSets.map((item) => {
        proxy.on(item.name, item.method)
      })
      return proxy
    },

    getStartConnectionData (methodName, ...args) {
      let funcs = _.filter(args, item => {
        return _.isFunction(item)
      })
      let {success, error} = {
        success: args.length && funcs.length && _.isFunction(funcs[0]) ? funcs[0] : () => {},
        error: args.length && funcs.length && _.isFunction(funcs[1]) ? funcs[1] : () => {}
      }
      let datas = _.filter(args, item => {
        return !_.isFunction(item)
      })
      if (!this.connection.start) return
      return this.connection.start({ withCredentials: false })
      .done(() => {
        if (datas.length === 0) {
          this.demoChatHubProxy.invoke(methodName)
          .done((response) => {
            return this.successResponseHandler({data: response, success: success, error: error})
          })
          .fail((e) => {
            console.log('fail', e)
          })
        } else if (datas.length === 1) {
          this.demoChatHubProxy.invoke(methodName, _.isUndefined(datas[0])?null:datas[0])
          .done((response) => {
            return this.successResponseHandler({data: response, success: success, error: error})
          })
          .fail((e) => {
            console.log('fail', e)
          })
        } else if (datas.length === 2) {
          this.demoChatHubProxy.invoke(methodName,
            _.isUndefined(datas[0])?null:datas[0],
            _.isUndefined(datas[1])?null:datas[1]
          )
          .done((response) => {
            return this.successResponseHandler({data: response, success: success, error: error})
          })
          .fail((e) => {
            console.log('fail', e)
          })
        } else if (datas.length === 3) {
          this.demoChatHubProxy.invoke(methodName,
            _.isUndefined(datas[0])?null:datas[0],
            _.isUndefined(datas[1])?null:datas[1],
            _.isUndefined(datas[2])?null:datas[2]
          )
          .done((response) => {
            return this.successResponseHandler({data: response, success: success, error: error})
          })
          .fail((e) => {
            console.log('fail', e)
          })
        } else if (datas.length === 4) {
          this.demoChatHubProxy.invoke(methodName,
            _.isUndefined(datas[0])?null:datas[0],
            _.isUndefined(datas[1])?null:datas[1],
            _.isUndefined(datas[2])?null:datas[2],
            _.isUndefined(datas[3])?null:datas[3]
          )
          .done((response) => {
            return this.successResponseHandler({data: response, success: success, error: error})
          })
          .fail((e) => {
            console.log('fail', e)
          })
        } else if (datas.length === 5) {
          this.demoChatHubProxy.invoke(methodName,
            _.isUndefined(datas[0])?null:datas[0],
            _.isUndefined(datas[1])?null:datas[1],
            _.isUndefined(datas[2])?null:datas[2],
            _.isUndefined(datas[3])?null:datas[3],
            _.isUndefined(datas[4])?null:datas[4]
          )
          .done((response) => {
            return this.successResponseHandler({data: response, success: success, error: error})
          })
          .fail((e) => {
            console.log('fail', e)
          })
        }
      })
      .fail(() => {
        console.log('Could not connect')
        // CheckBindWx()
      })
    },

    successResponseHandler ({ data, success, error } = {}) {
      let errorMsg = ''
      if (data) {
        switch (data.Code) {
          case 0:
            return _.isFunction(success) ? (success(data.Data) || {}) : data.Data
          case 120:
            errorMsg = '会话参数错误'
            break
          case 500:
            errorMsg = '系统异常'
            break
        }
      } else {
        errorMsg = '数据异常，请稍后再试'
      }
      if (errorMsg) {
        // this.$message({message: data.Message, type: 'error', duration: 3000})
        return _.isFunction(error) ? (error({code: data.Code, msg: errorMsg}) || {}) : data.Message
      }
    },

    initWebSocket(){ //初始化weosocket
      // const wsuri = process.env.WS_API + "/websocket/threadsocket";
      const wsuri = 'ws:' + this.get_sl_url()
      this.websock = new WebSocket(wsuri);
      console.log(this.websock)
      // this.websock.onmessage = this.websocketonmessage;
      // this.websock.onclose = this.websocketclose;
    }
  },
  
  mounted () {
    this.startConnection()
    // this.initWebSocket()
  }
}
