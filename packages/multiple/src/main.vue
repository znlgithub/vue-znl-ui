<template>
  <div class="znl-multiple iconfont"
    :class="[!visible ? 'hide': '', dragState ? 'multiple-draging' : '', allowDrag ? '' : 'ban-drag']"
    :style="multipleStyle" 
    v-show="isShow"
    v-if="hasRight && visible"
    :data-index="index"
    :draggable="dragState && allowDrag"
    :droppable="dragState && allowDrag"
    @dragstart.stop="dragstart($event)"
    @dragend.stop="dragend($event)"
    @drop.stop="drop($event)"
    @dragenter.stop="dragenter($event)"
    @dragover.stop="dragover($event)"
    @dragleave.stop="dragleave($event)"
    >

    <slot></slot>

  </div>
</template>

<script>

  export default{

    name: 'Multiple',

    data () {
      return {
        space: '',
        isShow: true,
        visible: true,
        hasRight: true,
        index: 0,
        title: '',
        dragState: false,
        allowDrag: true
      }
    },

    props: {
      fixed: {
        type: Boolean,
        default: false
      }, 
      name: String
    },

    computed: {
      multipleStyle () {
        let style = {}
        if (this.space) {
          let marginBottom =  _.isNumber(this.space) ? this.space + 'px' : this.space
          style.marginBottom = marginBottom
        }

        return style
      }
    },

    methods: {
      setData(obj) {
        this.visible = obj.visible
        this.hasRight = obj.hasRight
        this.title = obj.title
        this.index = obj.index
        this.allowDrag = typeof obj.allowDrag === 'undefined' ? true : obj.allowDrag
        // this.sortByIndex()
      },

      setDragState (val) {
        this.dragState = val
      },

      // sortByIndex () {
      //   this.$nextTick(() => {
      //     let new_list = this.$parent.$refs.multipleScroll
      //     let new_list_child = new_list.children
      //     new_list_child = Array.prototype.slice.call(new_list_child).sort(function(a,b){
      //     　　return a.dataset.index - b.dataset.index > 0
      //     })
      //     new_list_child.forEach(function(el){
      //       console.log('sort', el)
      //     　　new_list.appendChild(el);
      //     })
      //   })
      // },

      // 拖
      dragstart (event) {
        let Index = (event.target || event.srcElement).dataset.index
        let textData = JSON.stringify({
          Index: Index
        })
        // console.log('dragstart 当用户开始拖动一个元素或选中的文本时触发', event)
        event.dataTransfer.setData("text/plain", textData)
      },
      // drag () {
      //   // console.log('drag 当拖动元素或选中的文本时触发')
      // },
      dragend (event) {
        // console.log('dragend 当拖拽操作结束时触发 (比如松开鼠标按键或敲“Esc”键)', event)
        event.dataTransfer.clearData()
      },
      // 放
      dragenter (event) {
        // console.log('dragenter 当拖动元素或选中的文本到一个可释放目标时触发');
        event.preventDefault()
        let target = event.target || event.srcElement
        this.classOperation('add', target)
      },
      dragover (event) {
        // console.log('dragover 当元素或选中的文本被拖到一个可释放目标上时触发（每100毫秒触发一次）。')    
        event.preventDefault()
      },
      dragleave () {
        // console.log('dragleave 当拖动元素或选中的文本离开一个可释放目标时触发');
        let target = event.target || event.srcElement
        this.classOperation('remove', target)
        event.preventDefault()
      },

      // dragexit () {
      //   console.log('dragexit 当元素变得不再是拖动操作的选中目标时触发')
      // },
      drop (event) {
          // console.log('drop 当元素或选中的文本在可释放目标上被释放时触发', event, event.dataTransfer.getData("text"))
          let layoutConfig = this.$parent.layoutConfig
          let target = event.target || event.srcElement
          this.classOperation('remove', target)
          let Index = this.getIndex(target).dataset.index
          let targtSortData = {
            Index: Index
          }

          let srcSortData

          try {
            srcSortData = JSON.parse(event.dataTransfer.getData("text"))
          } catch (error) {
            console.log('drag positional fault')
          }

          if (!srcSortData || targtSortData.Index === srcSortData.Index) return
         
          // let sortConfig = layoutConfig.sort((a, b) => {
          //   return a.index > b.index
          // })

          let sortConfig =  _.sortBy(layoutConfig, (item) => {
            return item.index
          })

          let targtColumn = _.find(sortConfig, column => {
            return column.index - targtSortData.Index === 0
          })

          let srcColumn = _.find(sortConfig, column => {
            return column.index - srcSortData.Index === 0
          })


          if (!srcColumn || !targtColumn) return

          sortConfig.splice(_.indexOf(sortConfig, srcColumn), 1)
          if (_.indexOf(sortConfig, targtColumn) === sortConfig.length - 1) {
            sortConfig.push(srcColumn)
          } else {
            sortConfig.splice(_.indexOf(sortConfig, targtColumn) + 1, 0, srcColumn)
          }

          _.each(sortConfig, (column, index) => {
            column.index = index
          })

          if (typeof this.$parent.onSaveConfig === 'function') {
            let saveconfig = this.$parent.onSaveConfig(sortConfig)
            if(saveconfig && saveconfig.then) {
              saveconfig.then(() => {
                this.$parent.sortByIndex()
              })
            } else {
              this.$parent.sortByIndex()
            }
          }
          event.preventDefault()
      },

      classOperation(type, target) {
        if (typeof target.dataset.index !== 'undefined') {
          target.classList[type]('znl-multiple_dragin')
        } else if (typeof target.parentElement.dataset.index !== 'undefined') {
          target.parentElement.classList[[type]]('znl-multiple_dragin')          
        }
      },

      getIndex(target) {
        if (!target) return false
        let searchRes = _.indexOf(target.classList, 'znl-multiple')
        if (searchRes > -1) {
          return target
        }
        return this.getIndex(target.parentElement)
      }
    },

    mounted () {
      this.$parent.menus.push(this)
    }
  }
</script>


