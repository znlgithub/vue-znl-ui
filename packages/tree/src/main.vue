<template>
  <div :class="[treeClass]" @scroll="scroll">
    <draggable
      v-model="treeDatas"
      :options="{
        group:'a',
        sort: true,
        animation:150,
        disabled: false,
        filter: draggableFilter
        }"
      :move="checkMove"
      :no-transition-on-drag="true"
      :forceFallback="true"
      @filter="onFilter"
      @start="onStart"
      @end="onEnd"
      @update="onUpdate"
      @add="onAdd"
      @remove="onRemove"
      >
      <!-- <transition-group
        :name="!drag? 'list-complete' : null"
        :pull="false"
        :revertClone="true"
        class="znl-transition-group"
        :css="true"> -->
        <div
          v-for="(item, index) in treeDatas"
          :key="index"
          >
          <div 
            :class="['tree-row']"
            >
            <i 
            :class="['icon-arrow-drop-updown','iconfont', !!item.IsUnfold?FolderUnfoldIconClass:FolderNoUnfoldIconClass]"
            v-if="item.HasChild"
            @click.stop="changeUpdown(item, $event)"
            ></i>
            <span 
              :class="['folder-name', isActive(item)?'active':'']"
              :draggable="true"
              :data-id="item.FolderId"
              :data-level="levelCom"
              @dragstart.stop="ondragstart($event, item)"
              @dragover="ondragover($event, item)"
              @dragend.stop="ondragend($event, item)"
              @dblclick.stop="changeUpdown(item, $event)"
              @click.stop="dropUpdownClick(item, $event)">

              <img v-if="!icon" class="folder-svg" src="~assets/imgs/admin_folder_ic.svg" alt="svg"/>
              <i v-else :class = "['iconfont', icon]"></i>

              <span class="itemname">{{item.Name}}</span>
              
              <input 
                :class="['name_edit_input']"
                id="nameeditinput"
                v-if="item.isNameEditInput"
                autofocus
                @keydown.enter="nameEditEnd(item, $event)"
                @blur="nameEditEnd(item, $event)"
                v-model="item.Name"
                type="text"/>
              <i 
                :class="['folder-option-icon', 'iconfont', FolderOptionIconClass]"
                :style="{
                  right: 0 - iconPosition.left + 'px'
                }"
                v-if="isFolderOptionIconShow(item) && !item.isNameEditInput"
                ></i>
            </span>
            <draggable
                v-if="item.HasChild"
                v-model="item.Children"
                :options="{
                  group:'a',
                  animation:150
                  }"
                :move="checkMove"
                :no-transition-on-drag="true"
                :forceFallback="true"
                >
                <znl-collapse-transition>
                  <znl-tree 
                    v-show="item.IsUnfold"
                    :has-edit="false"
                    :icon="icon"
                    tree-class="tree-wrapper"
                    :active-change-row="activeRow"
                    :delete-config="deleteConfig"
                    ref="treechild"
                    :level="levelCom"
                    @drag-in="(id, row)=>{$emit('drag-in', id, row)}"
                    @start-id="id=>{startId=id}"
                    @drag-end="(startId, endId)=>{clearActive(),$emit('drag-end', startId, endId)}"
                    @id-change="(startId, endId, interimId)=>{endId=endId,interimId=interimId,clearActive(),$emit('id-change',startId, endId, interimId)}"
                    @edit-end="val=>$emit('edit-end', val)"
                    @active-change="val=>{$emit('active-change', val),activeRow=val}"
                    @is-edit-show="isEditShow"
                    @end="onEnd"
                    @change-tip-text="val=>{tipText=val}"
                    @change-config="val=>{
                      $emit('change-config', val),
                      canRename=val.canRename,
                      canDelete=val.canDelete,
                      canAddFolder=val.canAddFolder}"
                    @node-click="item=>{$emit('node-click',item)}"
                    @start="val=>$emit('start',val,treeDatas)"
                    @node-expand-change="val=>$emit('node-expand-change', val)"
                    :datas.sync="item.Children">
                  </znl-tree>
                </znl-collapse-transition>
                    <!-- @draggable-in="(outval, inval)=>{$emit('draggable-in', outval, inval)}" -->
            </draggable>
          </div>
        </div>
      <!-- </transition-group> -->
    </draggable>
    <div 
      v-if="hasEdit"
      v-show="editContarerObj.isShow"
      ref="znltreeEditfolder"
      class="znl-tree-editfolder"
      tabindex="-1"
      @blur="editContarerObj.isShow = false"
      :style="{
        left: editContarerObj.left,
        top: editContarerObj.top
      }"
      >
      <div class="item" v-if="canAddFolder" @click="addFolder">增加</div>
      <div class="item" v-if="canRename" @click="changeFolderName">改名</div>
      <div class="item" v-if="canDelete" @click="deleteFolder(false, $event)">删除</div>
    </div>
    <div 
      v-if="hasEdit"
      v-show="editContarerObj.isShowConfirmBox"
      class="znl-tree-confirm_box"
      @blur="editContarerObj.isShowConfirmBox = false"
      :style="{
        left: editContarerObj.left,
        top: editContarerObj.top
      }"
      tabindex="-1"
      >
      <div class="header">{{tipText}}</div>
      <div class="item confirm-box">
        <span @click="deleteFolder(true)">删除</span>
        <span @click="editContarerObj.isShowConfirmBox = false">取消</span>
        </div>
      <!-- <div class="item" @click="editContarerObj.isShowConfirmBox = false">取消</div> -->
    </div>
    <div 
      class="add-folder"
      v-show="isAddFolderShow"
      >
      <input 
      ref="addFolderInput"
      class="addFolderInput" 
      focus="isAddFolderShow" 
      type="text" 
      placeholder="输入完成后按回车/Enter键即可"
      @keydown.enter.stop="addNewFolderEnd"
      @blur="addNewFolderEnd"
      v-model="newFolder.Name"/>
    </div>
  </div>
</template>
<script>
  import BUS from '~/global/bus'
  import ZnlCollapseTransition from 'packages/transition/collapse-transition'
  import draggable from 'vuedraggable'
  export default{
    name: 'znl-tree',

    components: {
      ZnlCollapseTransition,
      draggable
    },

    computed: {
      levelCom () {
        return this.level + 1
      }
    },

    data () {
      return {
        tipText: '',
        treeDatas: [],
        activeRow: {},
        editContarerObj:{
          left: 0,
          top: 0,
          isShow: false,
          isShowConfirmBox: false
        },
        newFolder: {
          Name: '',
          HasChild: false,
          IsFolder: true,
          HasRename: true,
          HasAdd: true,
          Children: null
        },
        startId: '',
        interimId: '',
        endId: '',
        iconPosition: {
          left: 0
        },
        isAddFolderShow: false,
        nowTime: '',
        oldTime: '',
        canRename: true, // 是否可以改名
        canDelete: true, // 是否允许删除
        canAddFolder: true, // 是否可以增加文件夹
        FolderIconClass: 'icon-admin_folder_ic1', // 文件夹图标
        FileIconClass: 'icon-admin_file_ic', // 单文件图标
        FolderUnfoldIconClass: 'icon-arrow_unfold_btn', // 目录展开图标
        FolderNoUnfoldIconClass: 'icon-arrow_retract_btn', // 目录闭合图标
        FolderOptionIconClass: 'icon-left_nav_show_btn' // 文件选项图标
      }
    },

    props: {
      level: {
        type: Number,
        default: 0
      },
      icon: String,
      datas: {
        type: Array,
        default () {
          return []
        }
      },
      activeChangeRow: Object, // 接受广播的activeRow
      treeClass: {
        type: String,
        default: 'znl-tree'
      },
      hasEdit: {
        type: Boolean,
        default: true
      },
      deleteConfig: Function
    },

    watch: {
      datas (datas) {
        this.treeDatas = JSON.parse(JSON.stringify(datas))
      },
      activeChangeRow (val) { // 使用广播的activeRow替换当前
        this.activeRow = val
      },
      interimId (val) {
        this.$parent.interimId = val
      }
    },

    methods: {
      activeChange (row) { // 接受子组件发出的activeRow并广播到所有子组件
        this.activeRow = row
      },

      isActive (item) { // 判断是否选中
        return _.isEqual(item, this.activeRow)
      },

      addFolder () {
        this.isAddFolderShow = true
        this.$nextTick(() => {
          this.$refs.addFolderInput.focus()
        })
      },

      addNewFolderEnd (event) {
        this.isAddFolderShow = false
        if (event.type === 'keydown' || _.isEmpty(this.newFolder.Name)) return
        if (_.isNull(this.activeRow.Children) || _.isUndefined(this.activeRow.Children)) {
          this.activeRow.Children = []
        }
        this.activeRow.Children.push(JSON.parse(JSON.stringify(this.newFolder)))
        this.activeRow.HasChild = true
        this.$emit('add-folder', this.activeRow, this.newFolder)
        this.$set(this.activeRow, 'IsUnfold', true)
        this.newFolder.Name = ''
      },

      changeUpdown (row, event) {
        // event.type === 'dblclick' && clearTimeout(this.clickTimeId)
        // 设置展开闭合属性
        this.$set(row, 'IsUnfold', !row.IsUnfold)
          // 是目录且有子节点时触发闭合改变事件
        row.IsFolder && row.HasChild && this.$emit('node-expand-change', row)
      },

      dropUpdownClick (row, event) { // 单击文件选项
        // 取消上次延时未执行的方法
        if (!_.isEqual(row, this.activeRow)) {
          this.activeRow = row
          this.$emit('active-change', row)
        }

        this.$nextTick(() => {
          let activeDom = this.$el.querySelector('.folder-name.active')
          if (!activeDom) return
          let activeRect = activeDom.getBoundingClientRect()
          let boxRect = this.$el.getBoundingClientRect()
          if (activeRect.top - boxRect.top > boxRect.height) {
            this.$el.scrollTop = activeRect.top - boxRect.top - boxRect.height + 50
          }
        })

        if (!event) return
        if (_.indexOf(event.target.classList, 'folder-name') > -1 || _.indexOf(event.target.classList, 'itemname') > -1) {
          // 触发节点点击事件
          this.$emit('node-click', row)

          //关闭编辑
          this.$emit('is-edit-show', this.editContarerObj)
        } else if (_.indexOf(event.target.classList, 'folder-option-icon') > -1) {
          this.canRename = !!row.HasRename
          this.canDelete = !!row.HasDelete
          this.canAddFolder = !!(row.IsFolder && row.HasAdd)
          this.$emit('change-config', {
            canRename: this.canRename,
            canDelete: this.canDelete,
            canAddFolder: this.canAddFolder
          })
          if (!this.canRename && !this.canDelete && !this.canAddFolder) return
          // 冒泡触发修改文件事件
          this.$set(this.editContarerObj, 'isShow', true)
          this.$set(this.editContarerObj, 'left', event.pageX - 55 + 'px')
          this.$set(this.editContarerObj, 'top', event.pageY + 10 + 'px')
          this.$emit('is-edit-show', this.editContarerObj)
          this.isEditShow(this.editContarerObj)
        }
        // }, 250)
      },

      isFolderOptionIconShow (row) {
        return !!row.HasRename || !!row.HasDelete || !!(row.IsFolder && row.HasAdd)
      },

      isEditShow (val) {
        this.$emit('is-edit-show',val)
        this.editContarerObj = val
        let editfolder =this.$refs.znltreeEditfolder
        // 获得焦点
        this.$nextTick(() => {
          editfolder && editfolder.focus()
        })
      },

      deleteFolder (type, event) { // 删除
        this.editContarerObj.isShow = false
        this.editContarerObj.isShowConfirmBox = false
        if (type) return this.$emit('delete-after', this.activeRow)
        let deleteConfig = this.deleteConfig && this.deleteConfig(this.activeRow)
        if (!deleteConfig) {
          this.$emit('delete-after', this.activeRow)
        } else {
          this.tipText = deleteConfig.tipText
          this.$emit('change-tip-text', this.tipText)
          this.editContarerObj.isShowConfirmBox = true
          this.$nextTick(() => {
            let confirm_box = this.$el.querySelector('.znl-tree-confirm_box')
            confirm_box && confirm_box.focus()
            this.$set(this.editContarerObj, 'left', event.pageX - 180 + 'px')
          })
        }
      },

      changeFolderName () { // 修改文件名
        this.$set(this.activeRow, 'isNameEditInput', true)
        this.$nextTick(() => {
          // 编辑框可能在子组件，采用dom查询
          let nameeditinput = this.$el.querySelector('#nameeditinput')
          nameeditinput && nameeditinput.focus()
        })
        this.editContarerObj.isShow = false
      },

      nameEditEnd (floder, event) { // 编辑结束
        this.$set(floder, 'isNameEditInput', false)
        if (event.type === 'keydown') return
        this.$emit('edit-end', floder)
      },

      draggableFilter (pointerEvent, domCon, sortable) {
      },

      checkMove (evt) {
        return true
      },

      onStart (val) {
        this.$emit('start', this.treeDatas)
      },

      onEnd (val) {
        // this.$emit('end', this.treeDatas)
      },

      onFilter (val) {
      },

      onUpdate (onUpdate) {
        // console.log('onUpdate', onUpdate, this.treeDatas)
      },

      onAdd (event) {
        this.$emit('drag-in', BUS.busEndId, BUS.listActiveRow)
        this.clearActive()
      },

      onRemove () {

      },

      // H5拖动
      clearActive () {
        let lines = document.querySelectorAll('.znl-tree .folder-name.active')
        _.each(lines, item => {
          item.classList.remove('active')
        })
      },

      ondragstart (event, row) {
        BUS.listActiveRow = null
        this.startId = event.srcElement.getAttribute('data-id')
        BUS.busStartId = this.startId
        BUS.interimId = event.srcElement.getAttribute('data-id')
        BUS.busStartLevel = event.srcElement.getAttribute('data-level')
      },

      ondragover (event, row) {

        // 外部拖入
        _.delay(() => {
          if (BUS.isDragEnd) {
            let jsonData = JSON.stringify(
              {
                id: BUS.busEndId,
                row: BUS.listActiveRow || {}
              }
            )
            if (BUS.dragInJSONData !== jsonData) {
              this.$emit('drag-in', BUS.busEndId, BUS.listActiveRow)
              BUS.dragInJSONData = jsonData
            }
          }
        }, 100)

        // active id 减少触发次数
        this.nowTime = new Date()
        if (this.nowTime - this.oldTime > 300) {
          this.dragHanler(event, row)
          this.oldTime = this.nowTime
        }
      },

      dragHanler (event, row) {
        let element = _.find(event.path, item => {
          if (_.indexOf(item.classList, 'folder-name') > -1) {
            return item
          }
        })
        let rowid = element.getAttribute('data-id')
        if (BUS.interimId === rowid) {
          return
        } else {
          this.clearActive()
          BUS.interimId = rowid
          this.endId = rowid
          BUS.busEndId = rowid
          BUS.busEndLevel = event.srcElement.getAttribute('data-level')
          this.$emit('id-change', BUS.startId, BUS.endId, BUS.interimId)
          element.classList.add('active')
        }
      },

      scroll (event) {
        this.$set(this.iconPosition, 'left', this.$el.scrollLeft)
        this.initIconPosition(this.$refs.treechild)
      },

      initIconPosition (component) {
        if (!component) return
        if (component.length) {
          _.each(component, item => {
            item.iconPosition = this.iconPosition
          })
          component[0].$refs && this.initIconPosition(component[0].$refs.treechild)
        }
      },

      ondragend (event, row) {
        this.clearActive()
        if (BUS.busStartLevel < BUS.busEndLevel) return
        this.$emit('drag-end', BUS.busStartId, BUS.busEndId)
        _.delay(() => {
          BUS.busStartId = null
          BUS.busEndId = null
        }, 100)
      }
    },

    mounted () {
      this.treeDatas = this.datas
    }
  }
</script>