<template>
  <div class="znl-upload" v-if="type==='upload_stock'" v-loading="uploadLoading" :element-loading-text="loadingText">
    <div class="subhead"><span>{{subhead}}</span></div>
    <div class="upload-body-wrapper">
      <div class="upload_step">
        <h3 class="upload_step_header">Step 01</h3>
        <ul>
          <li class="upload_step_row" v-if="jurisdictionCom('template')">
            <a download :href="templateHref">点此下载Excel文件模板</a>
          </li>
          <li class="upload_step_row" v-if="jurisdictionCom('filteringRules')">
            严格按照模板文件的格式填写库存信息<span class="upload_step_textbutton" @click="visible=true">（点击查看各列内容的检测与过滤规则）</span>
          </li>
          <li class="upload_step_row" v-if="jurisdictionCom('fccid')">
            目前您的认证仓库编号如下：
            <slot name="warehousecode"></slot>
          </li>
        </ul>
      </div>
    </div>
    <div class="upload-body-wrapper">
      <div class="upload_step">
        <h3 class="upload_step_header">Step 02</h3>
        <ul>
          <li class="upload_step_row" v-if="jurisdictionCom('SType') && promotionTypes.length > 0">
            <span>选择推广类型</span>
            <div class="upload_step_selete">
              <el-radio 
                v-for="item in promotionTypes"
                :key="item.key"
                v-model="promotionType" 
                :label="item.key" 
                border>{{item.value}}
              </el-radio>
            </div>
          </li>

          <li class="upload_step_row" v-if="jurisdictionCom('uploadMode')">
            <span>选择库存匹配规则</span>
            <div class="upload_step_selete_UploadMode">
              <el-radio 
                v-for="item in matchingRules"
                :key="item.key"
                :border="false" 
                v-model="stockRule" 
                :label="item.key">
                <span v-html="item.value"></span>
              </el-radio>
            </div>
          </li>
          
          <li class="upload_step_row" v-if="jurisdictionCom('uploadMode')">
            <span>上传模式</span>
            <div class="upload_step_selete_UploadMode">
              <el-radio 
                v-for="item in uploadSchemas"
                :key="item.key"
                :border="false" 
                v-model="uploadSchema" 
                :label="item.key">
                <span v-html="item.value"></span>
              </el-radio>
            </div>
          </li>

          <li class="upload_step_row" v-if="!jurisdictionCom('upload')">
            {{rulesTip}}
          </li>
          
        </ul>
        <div class="upload_step_file" v-if="jurisdictionCom('upload')">
          <div class="file_container">
            <i class="iconfont icon-admin_file_ic"></i>
            <span class="fileinput_container">
              <input type="file" :accept="accept" name="file" ref="uploadFile" id="fileId" @change="fileInputChange" />
              <span>{{fileName}}</span>
            </span>
          </div>
        </div>
      </div>
      <div v-if="jurisdictionCom('upload')" class="upload-tip"><span>*</span>导入的库存将替换系统中现有的优势库存或现货库存</div>
    </div>
    <div class="upload-footer-wrapper" v-if="jurisdictionCom('upload') && !$slots.footer">
      <a href="javascript:void(0)" :class="['uplode_submit_btn', 'alreadyUploaded']" @click="submit">提交</a>
    </div>
    <slot v-if="$slots.footer" name="footer"></slot>
    <filtering-rules
    :visible.sync="visible"
    show-title="推广库存信息资料的检测与过滤规则"
    width="830px"
    height="650px"
    >
      <slot name="filteringRules" slot="filteringRules"></slot>
    </filtering-rules>
  </div>

  <div 
    v-else-if="type==='upload_pic'" 
    class="znl-upload-pic"
    :style="uploadPicStyle"
    v-loading="uploadLoading" 
    :element-loading-text="loadingText">

    <div class="znl-upload-pic_header" v-if="!!title">
      <span>{{title}}</span>
    </div>

    <div class="znl-upload-pic_body" @click="$refs.uploadFile.click()">

      <span v-if="!uploadSuccessSrc && !imgUrl" class="img-container" :style="imgContainerStyle"></span>
      <img 
        :width="252" 
        :height="113" 
        v-else-if="!!uploadSuccessSrc || !!imgUrl" 
        :src="imgSrcCom">
      </img>

    </div>

    <div class="znl-upload-pic_footer" v-show="uploadBtnShow && !$slots.footer">

      <div v-if="multiple" class="files-count">已选文件数量: {{filesCount}}</div>

      <div class="fileinput_container">
        <input 
          type="file" 
          name="file" 
          ref="uploadFile" 
          class="fileId fileinput" 
          :accept="accept" 
          @change="fileInputPicChange" 
          :multiple="multiple?'multiple':false" />

        <znl-button style-type="main" :height="30" :width="96" @click="$refs.uploadFile.click()">点击上传</znl-button>

        <div class="explain">
          <span v-if="!$slots.explain">
            <span>图片大小限制为4M以内</span>
            <span>图片格式支持JPG，JPEG，PNG</span>
          </span>

          <slot name="explain"></slot>
        </div>
      </div>

    </div>

    <slot name="footer"></slot>

  </div>
</template>

<script>
import filteringRules from './filteringRules.vue'
import ZnlButton from '~packages/button/src/main.vue'
export default {
  name: 'znl-upload',

  components: {
    filteringRules,
    ZnlButton
  },

  data () {
    return {
      uploadSchema: 1,
      promotionType: 4,
      stockRule: 0,
      ossData: '',
      visible: false,
      uploadLoading: false,
      percentage: 0,
      fileInfo: {},
      fileName: '未选择任何文件',
      uploadSuccessSrc: '',
      filesCount: 0
    }
  },

  props: {
    region: String,
    accessKeyId: String,
    accessKeySecret: String,
    bukect: String,
    ossFileUrl: String,

    multiple: {
      type: Boolean,
      default: false
    },
    accept: String,

    maxFileSize: {
      type: Number,
      default: 6 * 1024 * 1024
    },
    loading: {
      type: Boolean,
      default: false
    },
    promotionTypes: {
      type: Array,
      default: () => {
        return [
          // {
          //   key: 4,
          //   value: '上传原装正品',
          //   isDefault: true
          // },
          // {
          //   key: 6,
          //   value: '上传保证有料',
          //   isDefault: false
          // },
          // {
          //   key: 9,
          //   value: '上传优势推广',
          //   isDefault: false
          // }
        ]
      }
    },
    matchingRules: {
      type: Array,
      default: () => {
        return [
          {
            key: 1,
            value: '相同 <span class="bold-span">型号、品牌、封装</span> 的库存视为同一条库存',
            isDefault: true
          },
          {
            key: 2,
            value: '相同 <span class="bold-span">型号、品牌、封装、年份</span> 的库存视为同一条库存',
            isDefault: false
          }
        ]
      }
    },
    uploadSchemas: {
      type: Array,
      default: () => {
        return [
          {
            key: 1,
            value: '覆盖模式：会先清空您选择的推广类型中的原有库存，重新导入本次上传的库存。',
            isDefault: true
          },
          {
            key: 2,
            value: '更换模式：不清空原有库存，按照您选择的推广类型和库存匹配规则替换和新增库存。',
            isDefault: false
          }
        ]
      }
    },
    loadingText: {
      type: String,
      default: '文件正在上传，请稍后'
    },
    subhead: {
      type: String,
      default: '上传成功后展示类型的优先级为：原装正品>保证有料>优势推广'
    },
    jurisdiction: { // 权限
      type: Array,
      // default: ['template', 'filteringRules','fccid','uploadMode','SType', 'upload']
      default: () => {
        return []
      }
    },
    fileTypes: {
      type: Array,
      default:() => {
        return ['.csv']
      }
    },
    templateHref: String,
    rulesTip: {
      type: String,
      default: '暂未购买任何推广库存，请联系正能量客服！'
    },
    folder: {
      type: String,
      default: 'makesureFile'
    },
    submitFuc: Function,
    autoInit: true,
    oss: Function,
    title:String,
    type: {
      type: String,
      default: 'upload_stock',
      validator(value) {
        return _.contains(['upload_stock', 'upload_pic'], value)
      }
    },

    width: {
      type: [String, Number],
      default: '340px'
    },
    defaultPic: {
      type: String,
      default: 'scenery'
    },
    maxFilesCount: {
      type: Number,
      default: 10
    },
    uploadBtnShow: {
      type: Boolean,
      default: true
    },
    imgUrl: {
      type: String,
      default: ''
    }
  },

  computed: {
    uploadPicStyle () {
      let style = {}
      style.width = _.isNumber(this.width) ? this.width + 'px' : this.width

      return style
    },

    imgSrcCom () {
      return this.uploadSuccessSrc ? this.uploadSuccessSrc : (this.imgUrl ? this.imgUrl : '')
    },

    imgContainerStyle () {
      let style = {}
      switch (this.defaultPic) {
        case 'IDCardFront': // 身份证正面
          style.backgroundPosition = '-259px -157px'
          break;

        case 'IDCardVerso': // 身份证反面
          style.backgroundPosition = '-518px -157px'
          break;

        case 'Charter': // 营业执照
          style.backgroundPosition = '0 -147px'
          break;

        case 'Scenery': // 默认
          style.backgroundPosition = '0 -272px'
          break;
      
        default:
          break;
      }

      return style
    }
  },

  watch: {
    loading (loading) {
      this.uploadLoading = loading
    },

    promotionTypes () {
      this.computedDefault()
    },

    uploadSchemas () {
      this.computedDefault()
    },

    matchingRules () {
      this.computedDefault()      
    }
  },

  methods: {
    jurisdictionCom (rule) {
      return !(_.indexOf(this.jurisdiction, rule) > -1)
    },

    setImgUrl (url) {
      if (url) {
        this.uploadSuccessSrc = url
      }
    },

     // 处理上传，将文件上传到阿里云
    doUpload () {
      this.uploadLoading = true
      const _this = this
      let OSS = this.oss
      const client = new OSS.Wrapper({
        region: _this.region,
        accessKeyId: this.accessKeyId,
        accessKeySecret: this.accessKeySecret,
        bucket: _this.bukect
      })

      _this.percentage = 0

      let files = this.$refs.uploadFile.files
      const file = this.$refs.uploadFile.files[0]

      let uploadFiles = files
      if (uploadFiles.length > this.maxFilesCount) {
        uploadFiles = {}
        for(let i = 0; i++; i< this.maxFilesCount) {
          uploadFiles[i] = files[i]
        }
      }
      if (file && !this.multiple) {
        this.uploadToOss(client, file)
      }
      // if (this.multiple) {
      //   this.filesCount = uploadFiles.length
      //   _.each(uploadFiles, item => {
      //     this.uploadToOss(client, item)
      //   })
      // }
    },

    uploadToOss (client, file) {
      const _this = this
      // 随机命名
      let randomName = this.folder + '/' + this.random_string(6) + '_' + new Date().getTime() + '.' + file.name.split('.').pop()
      // 上传
      client.multipartUpload(randomName, file, {
        progress: function* (percentage, cpt) {
          // 上传进度
          _this.percentage = percentage
        }
      }).then((results) => {
        // 上传完成
        let filepath = this.ossFileUrl + results.name
        let successSrcArr = results.res.requestUrls[0].split('?')
        this.uploadSuccessSrc = successSrcArr[0]
        this.onUploadCompleted(file.name, file.size, successSrcArr[0])
      }).catch((err) => {
        _this.$emit('upload-completed', false, {
          maxFileSize: this.maxFileSize,
          message: '上传失败',
          errObj: err
        })
          this.uploadLoading = false
      })
    },

    // 随机生成文件名
    random_string (len) {
      len = len || 32
      var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var maxPos = chars.length
      var pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },

    // 文件成功上传到阿里云后
    onUploadCompleted (fileName, fileSize, fileUrl) {
      this.uploadLoading = false
      this.fileInfo = {
        FileName: fileName, 
        FileSize: fileSize,
        MaxFileSize: this.maxFileSize,
        UploadUrl: fileUrl
      }
      if (fileSize < this.maxFileSize) {
        this.$emit('upload-completed', true, {
          fileName: fileName, 
          fileSize: fileSize,
          maxFileSize: this.maxFileSize,
          fileUrl: fileUrl
        })
      } else {
        this.$emit('upload-completed', false, {
          fileName: fileName, 
          fileSize: fileSize,
          maxFileSize: this.maxFileSize,
          fileUrl: fileUrl,
          message: '文件大小超出限制'
        })
      }
    },

    fileInputChange () {
      this.uploadLoading = true
      if (_.isUndefined(this.$refs.uploadFile.files[0])) {
        this.uploadLoading = false
        this.fileName = '未选择任何文件'
        return
      }
      let fileName = this.$refs.uploadFile.files[0].name
      let sizeVerify = this.$refs.uploadFile.files[0].size < this.maxFileSize
      if (!sizeVerify) {
        this.uploadLoading = false
        this.clearFile()
        return this.$emit('filetype-err', '文件大小超过限制')
      }
      let fileTypeVerify = false 
      _.find(this.fileTypes, item => {
        // if (fileName.endsWith(item)) {
        if (fileName.match(item+'$')) {
          return (fileTypeVerify = true)
        }
      })
      if (fileTypeVerify) {
        this.fileName = fileName        
        this.doUpload()
      } else {
        let text = this.fileTypes.join(',')
        this.uploadLoading = false
        this.$emit('filetype-err', '文件格式验证失败,只允许上传' + text + '的格式文件')
      }
    },

    fileInputPicChange (file) {
      this.uploadLoading = true
      if (_.isUndefined(this.$refs.uploadFile.files[0])) {
        this.uploadLoading = false
        this.fileName = '未选择任何文件'
        return
      }
      let sizeVerify = this.$refs.uploadFile.files[0].size < this.maxFileSize
      if (!sizeVerify) {
        this.uploadLoading = false
        this.clearFile()
        return this.$emit('filetype-err', '文件大小超过限制')
      }
      
      let fileName = this.$refs.uploadFile.files[0].name
      let fileTypeVerify = false 
      _.find(this.fileTypes, item => {
        if (fileName.match(item+"$")) {
          return (fileTypeVerify = true)
        }
      })
      if (fileTypeVerify) {
        this.fileName = fileName        
        this.doUpload()
      } else {
        let text = this.fileTypes.join(',')
        this.uploadLoading = false
        this.$emit('filetype-err', '文件格式验证失败,只允许上传' + text + '的格式文件')
      }
    },

    initUpload () {
      this.uploadLoading = false
    },

    submit () {
      this.fileInfo.SType = this.promotionType
      this.fileInfo.UploadMode = this.uploadSchema
      this.fileInfo.StockRule = this.stockRule
      this.submitFuc(this.fileInfo).then(() => {
        this.autoInit && this.initUpload() && this.clearFile()
      }, () => {
        this.autoInit && this.initUpload() && this.clearFile()
      })
    },

    clearFile () {
      this.uploadSuccessSrc = false
      this.$refs.uploadFile.value = ''
    },

    computedDefault () {
      let promotionType =  _.find(this.promotionTypes, item => {
        return !!item.isDefault
      })
      this.promotionType = promotionType ? promotionType.key : ''
      
      this.uploadSchema = _.find(this.uploadSchemas, item => {
        return !!item.isDefault
      }).key
      this.stockRule = _.find(this.matchingRules, item => {
        return !!item.isDefault
      }).key
    }
  },

  mounted () {
   this.computedDefault()
  }
}
</script>
