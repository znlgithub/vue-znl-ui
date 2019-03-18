<style>
  
</style>

<script>
  // import ZnlCollapseTransition from '~/transitions/collapse-transition'
  import axios from 'axios'
  export default{
    name: 'tree-test',
    components: {
      // ZnlCollapseTransition
    },
    data () {
      return {
        // treeData: []
        treeData: [
          {
            Code: 'STK',
            Name: '一级目录1',
            HasChild: true, // 是否包含子目录
            IsFolder: true, // 是否为文件夹
            Children: [
              {
                Code: 'SSS',
                Name: '二级目录1',
                HasChild: true,
                IsFolder: true, // 是否为文件夹
                Children: [
                  {
                    Code: 'SSS',
                    Name: '三级目录1',
                    HasChild: false,
                    IsFolder: false, // 是否为文件夹
                  },
                  {
                    Code: 'SSS',
                    Name: '三级目录2',
                    HasChild: false
                  },
                  {
                    Code: 'SSS',
                    Name: '三级目录3',
                    HasChild: false
                  }
                ]
              },
              {
                Code: 'SSS',
                Name: '二级目录2',
                HasChild: false
              },
              {
                Code: 'SSS',
                Name: '二级目录3',
                HasChild: false
              }
            ]
          },
          {
            Code: 'STK',
            Name: '一级目录2',
            HasChild: true, // 是否包含子目录
            IsFolder: true, // 是否为文件夹
            Children: [
              {
                Code: 'SSS',
                Name: '二级目录4',
                HasChild: false
              },
              {
                Code: 'SSS',
                Name: '二级目录5',
                HasChild: false
              }
            ]
          },
          {
            Code: 'TTT',
            Name: '一级文件',
            HasChild: false,
            IsFolder: false
          }
        ]
      }
    },
    methods: {
      post (name, data, success, errer) {
        axios.post(name, data, {
            headers: {
            'Authorization': 'Tokenff0ce8a1-fdeb-4d17-ab25-cc7023b115da'
            }
          }).then((data) => {
            success(data.data.data)
          }, err => {
            errer(err)
          })
      },
      addFolder (parentFolder, newFolder) {
        console.log(parentFolder, newFolder)
      },
      nodeExpandChange (val) {
        console.log(val)
      },
      nodeClick (item) {
        console.log('nodeClick', item)
      },
      dragEnd (start, end) {
       console.log('测试dragEnd', start, end)
      },
      dragIn (id, row) {
        console.log('dragIn', id, row)
      },
      dragStart (val, datas) {
        console.log('start', val, datas)
      },
      deleteConfig (folder) {
        if (folder.HasChild) {
          return {
            tipText: '提示文字？？'
          }
        }
      },
      editEnd (val) {
        console.log('editend', val)
      },
      deleteAfter (folder) {
        console.log('after', folder)
      },
      draggableIn (outval, inval) {
        console.log(outval, inval)
      },
      dropUpdownClick () {
        this.$refs.znlTree.dropUpdownClick(this.treeData[0].Children[0].Children[0])
      }
    },
    mounted () {
    }
  }
</script>
<style lang="scss">
  .tree-test{
    width: 200px;
    /* height: 300px; */
    border: 1px solid #E6E6E6;
    margin: 0 auto;
  }
</style>

## Tree 树形控件

用清晰的层级结构展示文件树信息。

### 基础用法

基础的树形结构展示。

:::demo
```html
<div>
  <znl-tree
    ref="znlTree"
    :datas="treeData"
    :delete-config="deleteConfig"
  
    @node-expand-change="nodeExpandChange"

    @start="dragStart"
    @delete-after="deleteAfter"
    @edit-end="editEnd"
    @draggable-in="draggableIn"
    @add-folder="addFolder"
    @node-click="nodeClick"
    @drag-end="dragEnd"
    @drag-in="dragIn"
  >
  <!-- <i slot="icon" class="iconfont icon-linkall_search_ic"></i> -->
  </znl-tree>
  <znl-button @click="dropUpdownClick">单击选中</znl-button>
</div>

```
:::





### Attributes
| name          | Description                | default |   type   | indispensable | arguments |
| ------------- | -------------------------- | :-----: | :------: | ------------- | --------- |
| datas         | 文件树传入数据                    |   []    |  Array   | yes           |           |
| delete-config | 删除数据的配置，返回配置对象{tipText：‘’} |         | Function |               | 当前节点      |

### datas配置必含字段
| name          | Description                |
| ------------- | -------------------------- |
| Name | 文件名 |
| HasChild | 是否包含子目录 |
|IsFolder|是否为文件夹|
|HasRename|是否允许改名|
|HasAdd|是否允许添加|
|Children|（HasChild 为true时必须有该字段，数组）|

### datas配置可选字段
| name          | Description                |
| ------------- | -------------------------- |
| IsUnfold | 是否该级展开 |
| Slots | 自定义插槽 |



### 方法

| 方法名             | 说明                                       | 参数                                       |
| --------------- | ---------------------------------------- | ---------------------------------------- |
| dropUpdownClick | 选择数据方法 | 需要选择的数据节点 |

### Events
| name               | Description  |          arguments          |
| ------------------ | ------------ | :-------------------------: |
| node-expand-change | 点击展开或闭合节点时   |        当前节点的数据(item)        |
| node-click         | 点击节点 时触发     |        当前节点的数据(item)        |
| start              | 拖动开始时的当前目录数据 | 当前目录数据，整个文件树数据(item, datas) |
| delete-after       | 确认删除数据后触发    |           删除的节点数据           |
| edit-end           | 编辑文件名结束后触发   |           当前节点数据            |
| add-folder         | 新增文件夹后触发     |       （父节点数据，新增文件数据）        |
| drag-in            | 外部拖拽进后触发     |        （id, outrow）         |
| drag-end           | 内部拖拽后出发      |      （startId, endId）       |                     |


### Scoped Slot
| name | 说明 |
|------|--------|

