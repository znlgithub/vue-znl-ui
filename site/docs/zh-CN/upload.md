<style>

</style>
<script>
  export default {
    data() {
      return {
        // region: '',
        // AccessKeyID: '',
        // AccessKeySecret: '',
        // Bukect: '',
        // ossFileUrl: '',
         region: 'oss-cn-shenzhen',
        AccessKeyID: 'LTAIRtFXJzh42aZN',
        AccessKeySecret: '8JeefIrEINGhVQwhihq0zPa11YjV6Y',
        Bukect: 'znl-erp-upload',
        ossFileUrl: '//znl-erp-upload.oss-cn-shenzhen.aliyuncs.com/',
        uploadArray: [{
          title: '前台'
        }]
        
      };
    },
    methods: {
      uploadCompleted (isSucess, fileInfo) {
        // 上传阿里云完成后，参数1： 是否上传成功； 参数2： 文件信息（文件大小超过设置的最大文件大小时也属于失败情况）
        console.log(isSucess, fileInfo)
        this.uploadArray.push({
           title: '前台'
        })
      },
      async submitFuc (info) {
        // 执行提交的方法，需异步方法
        console.log(123, info, info.fileUrl, info.fileName)
      },
      filetypeErr (msg) {
        // 文件格式验证失败时触发
        console.log(msg)
      },
      deletePic () {
        this.$refs.znlUpload[0].clearFile()
      }
    },

    mounted () {
      // this.$refs.upload[0].setImgUrl('//znl-erp-upload.oss-cn-shenzhen.aliyuncs.com/makesureFile/K8mwAh_1525686271200.png')
    }
  }
</script>

## Upload 上传

文件上传

### 基本用法

:::demo 通过`template-href`设置模板下载路径。
```html
  <znl-upload
  template-href="//bom-ai-read.oss-cn-shenzhen.aliyuncs.com/makesureFile/ImportTemp.csv"

  :region="region"
  :access-key-id="AccessKeyID"
  :access-key-secret="AccessKeySecret"
  :bukect="Bukect"
  :oss-file-url="ossFileUrl"

  :oss="require('ali-oss/dist/aliyun-oss-sdk.js')"

  :jurisdiction="[]"
  :submit-fuc="submitFuc"
  :auto-init="true"
  @upload-completed="uploadCompleted"
  @filetype-err="filetypeErr"
  >
  </znl-upload>

  <script>
    export default {
      methods: {
       
      }
    }
  </script>
```
:::

### 基本用法: 图片上传

:::demo 通过`template-href`设置模板下载路径。
```html
  <znl-upload
  ref="znlUpload"
  img-url=""
  v-for="(item, index) in uploadArray"
  :key="index"
  type="upload_pic"
  :title="item.title"
  :file-types="['.jpg','.jpeg','.png']"
  :upload-btn-show="false"

  :region="region"
  :access-key-id="AccessKeyID"
  :access-key-secret="AccessKeySecret"
  :bukect="Bukect"
  :oss-file-url="ossFileUrl"
  :oss="require('ali-oss/dist/aliyun-oss-sdk.js')"

  @upload-completed="uploadCompleted"
  @filetype-err="filetypeErr"

  >
    <div slot="explain">提示</div>
    <div slot="footer">123</div>
  </znl-upload>
    <button @click="deletePic">删除</button>
  <znl-upload
  type="upload_pic"
  title="企业法定代表人或个体经营户负责人身份证 正面"
  default-pic="IDCardFront"
  accept="image/*"
  >
  </znl-upload>

  <znl-upload
  type="upload_pic"
  title="企业法定代表人或个体经营户负责人身份证 反面"
  default-pic="IDCardVerso"
  >
  </znl-upload>

  <znl-upload
  type="upload_pic"
  title=" 营业执照"
  default-pic="Charter"
  >
  </znl-upload>

<script>
  export default {
    data() {
      return {
        region: '',
        AccessKeyID: '',
        AccessKeySecret: '',
        Bukect: '',
        ossFileUrl: ''
      };
    },
    methods: {
      uploadCompleted (isSucess, fileInfo) {
        // 上传阿里云完成后，参数1： 是否上传成功； 参数2： 文件信息（文件大小超过设置的最大文件大小时也属于失败情况）
        console.log(isSucess, fileInfo)
      }
    }
  }
</script>
```
:::


### Attribute
| 参数                | 说明                    | 类型       | 可选值                                      | 默认值                           |
| ----------------- | --------------------- | -------- | ---------------------------------------- | ----------------------------- |
| region            | OSS参数                 | String   |                                          |                               |
| access-key-id     | OSS参数                 | String   |                                          |                               |
| access-key-secret | OSS参数                 | String   |                                          |                               |
| bukect            | OSS参数                 | String   |                                          |                               |
| oss-file-url      | OSS参数                 | String   |                                          |                               |
| oss               | OSS的SDK方法             | Function |                                          |                               |
| folder            | 存储到OSS时的目录名           | String   |                                          | makesureFile                  |
| max-file-size     | 文件最大长度                | Number   |                                          | 6 * 1024 * 1024               |
| loading           | 组件loading             | Boolean  |                                          | false                         |
| promotion-types   | 推广类型数据                | Array    |                                          | 4/6/9 默认选项                    |
| upload-schemas    | 上传模式数据                | Array    |                                          | 1/2默认选项                       |
| matching-rules | 匹配规则数据 | Array | | |
| loading-text      | loading文字             | String   |                                          | 文件正在上传，请稍后                    |
| subhead           | 顶部提示                  | String   |                                          | 上传成功后展示类型的优先级为：原装正品>保证有料>优势推广 |
| jurisdiction      | 权限控制,隐藏不可见的模块         | Array    | 权限控制不显示的模块，默认全部显示，六个小模块 [**'template', 'filteringRules','fccid','uploadMode','SType', 'upload'**],分别为**模板下载，过滤规则，认证仓库编号，上传模式，推广类型，上传模块** |                               |
| file-types        | 文件格式,允许上传的文件后缀数组      | Array    |                                          | ['.csv']                      |
| template-href     | 模板的下载链接               | String   |                                          |                               |
| rules-tip         | 无上传权限的提示              | String   |                                          | 暂未购买任何推广库存，请联系正能量客服           |
| submit-fuc        | 提交时执行的方法，**需异步方法**    | Function |                                          |                               |
| auto-init         | 是否在提交成功后自动恢复初始状态并清空文件 | Boolean  |                                          | true                          |
|       |       |  |    |    |
| type | 上传类型 | String | upload_stock(默认库存上传)/upload_pic(图片上传) | upload_stock  |
| title | 标题 | String |  |  |
| title | 标题 | String |  |  |
| upload-btn-show | 是否显示上传按钮 | Boolean |  | true |
| width | 图片上传组件宽度 | String/Number |  | 340px |
| img-url | 替换默认图片背景的图片URL | String |  |  |
| default-pic | 默认背景图片 | String | IDCardFront(身份证正面)/IDCardVerso(身份证反面)/Charter(营业执照)/Scenery(默认照片) | Scenery |
| accept | 文件上传弹出窗口指定的文件类型 | String | input type=file支持的Mime类型  | |

### Methods
| 方法名        | 说明     | 参数   |
| ---------- | ------ | ---- |
| clearFile  | 清空文件   |      |
| initUpload | 重置按钮状态 |      |
| setImgUrl | 设置图片路径,会代替原有默认背景 |      |


### Solts

| name           | 说明       |
| -------------- | -------- |
| filteringRules | 验证规则弹框内容 |
| warehousecode  | 仓库编号内容   |
| footer         | 底部提交行    |
| explain | 图片上传的提示 |