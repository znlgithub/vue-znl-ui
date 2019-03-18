<template>
  <div class="znl-upload">
    <el-upload class="elupload"
               ref="elupload"
               :action="uploadReqObj.url"
               :headers="uploadReqObj.headers"
               :data="uploadReqObj.data"
               :name="name"
               :multiple="multiple"
               :with-credentials="withCredentials"
               :show-file-list="showFileList"
               :drag="drag"
               :accept="accept"
               :list-type="listType"
               :auto-upload="isAutoUpload"
               :file-list="uploadFileList"
               :http-request="httpRequest"
               :disabled="disabled"
               :limit="limit"
               :on-preview="handlePreview"
               :on-remove="handleRemove"
               :on-error="handleError"
               :on-progress="handleProgress"
               :on-change="handleChange"
               :on-success="handleSuccess"
               :before-upload="handleBeforeUp"
               :before-remove="handleBeforeRemove"
               :on-exceed="handleOnExceed"
               >
        <!-- <slot></slot>
        <slot name="trigger"></slot> -->
        <div v-if="drag" :style="{height: '100%'}">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或<em>点击上传</em>
          </div>
        </div>

        <el-button v-else  size="small" type="primary">{{chooseBtnText}}</el-button>


        <el-button v-if="!isAutoUpload" size="small" type="success" @click="submitUpload">{{uploadBtnText}}</el-button>

        <div slot="tip" v-if="uploadTip" class="el-upload__tip">{{uploadTip}}</div>

    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'znl-upload',
  components: {
  },
  props: {
    uploadReqObj: {
      type: Object,
      default: () => {
        return {
          url: '',
          headers: {},
          data: {}
        }
      }
    },
    name: String,
    withCredentials: Boolean,
    showFileList: {
      typeL: Boolean,
      default: true
    },
    drag: {
      typeL: Boolean,
      default: false
    },
    accept: String,
    chooseBtnText: {
      type: String,
      default: '点击上传'
    },
    uploadBtnText: {
      type: String,
      default: '上传到服务器'
    },
    uploadTip: {
      type: String,
      default: ''
    },
    listType: {
      type: String,
      default: 'text',
      validator: (value) => {
        return _.contains(['text', 'picture', 'picture-card'], value)
      }
    },
    isAutoUpload: {
      type: Boolean,
      default: true
    },
    uploadFileList: {
      type: Array,
      default () {
        return []
      }
    },
    httpRequest: Function,
    disabled: {
      type: Boolean,
      default: false
    },
    limit: Number,
    multiple: {
      type: Boolean,
      default: false
    },
    // isShowFileList: false,
    // isDrag: false,
    // acceptType: 'image/*',
    // listType: 'picture',
  },
  data () {
    return {
      // headers: {
      //   'Authorization': ''
      // },
      // UploadUrlStr: getApiDomain() + '/FileUpload/Upload'
    }
  },
  methods: {
    handlePreview (file) {
      this.$emit('onPreview', file)
    },
    handleRemove (file, fileList) {
      this.$emit('onRemove', file, fileList)
    },
    handleProgress (event, file, fileList) {
      this.$emit('onPreview', event)
    },
    handleChange (file, fileList) {
      // this.uploadFileList = fileList.slice(-3)
      this.$emit('onChange', file, fileList)
    },
    handleBeforeUp (file) {
      this.$emit('onBeforeUpload', file)
    },
    handleBeforeRemove (file, fileList) {
      this.$emit('onBeforeRemove', file, fileList)
    },
    handleOnExceed (files, fileList) {
      this.$emit('OnExceed', files, fileList)
    },
    handleSuccess (response, file, fileList) {
      // this.uploadFileList = fileList
      this.$emit('onUploaded', response.data, file, fileList)
    },
    handleError (er, file, fileList) {
      this.$emit('onError', file, er)
      this.$message({ message: '上传失败:' + er, type: 'error' })
    },
    clearFiles () {
      return this.$refs.elupload.clearFiles()
    },
    abort () {
      return this.$refs.elupload.abort()
    },
    submitUpload() {
      this.$refs.elupload.submit()
    },
  },
  created () {
    // this.UploadUrlStr = getApiDomain() + '/FileUpload/Upload'
  },
  mounted () {
      console.log('test')
  }

}
</script>
