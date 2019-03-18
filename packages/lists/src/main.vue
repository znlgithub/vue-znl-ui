<template>
  <div :class="['znl-lists', loadingType]" 
    v-loading="loading"
    :element-loading-text="loadingType==='icon'?znlLoadingText:' '"
    :style="listStyle">

    <slot name="list-prepend" ref="listPrepend"></slot>

    <div class="znl-list-title-row">

      <div class="znl-gridModuleHeader" :style="titleStyle" v-if="showTitleRow">

         <slot 
          v-if="$slots.header" 
          name="header" 
          class="znl-header-text">
        </slot>

        <span 
          v-else-if="header"
          :title="!!isActivity ? (tableActivity?'收起表格':'展开表格') : ''" 
          @click.stop.prevent="isActivity ? (tableActivity=!tableActivity) : ''"
          :class="[
            'znl-header-text',
            !!isActivity && 'header-title',
            !!$slots['action-form']?'bottom-line':'']">{{'· '+header}}

          <i v-if="tooltipContent!==''" class="iconfont icon-table_error_ic" :title="tooltipContent" ></i>

          <a 
            href="#" 
            :title="tableActivity?'收起表格':'展开表格'" 
            class="znl-icons tableActivity" 
            v-if="!!isActivity">
              <i :class="['iconfont', !tableActivity?'icon-table_unfold_n1':'icon-table_pack-up_btn_n1']"></i>
          </a>

        </span>

        <div class="heading-slot" v-if="$slots['heading-slot']">
          <slot name="heading-slot"></slot>
        </div>

        <div class="rightbtns">

          <el-pagination
              v-if="footerPosition==='top'"
              :class="['znl-header-pagination']"
              :small="true"
              layout="slot,prev, next"
              :page-size="pageSize"
              :total="totalCount"
              :current-page="currentPageIndex"
              @current-change="pageChanged">

              <span class="pagination-slot">
                <span class="jumper-span">
                  <input 
                  type="text" 
                  :min="0" 
                  :max="Math.ceil(totalCount/pageSize)" 
                  v-model="pageIndexComputed" 
                  @keydown.enter="pageChanged(pageIndexComputed)">
                  <span>{{pageIndex}}</span>
                </span>
                /{{Math.ceil(totalCount/pageSize)}}
              </span>

          </el-pagination>

          <span class="znl-line" v-if="footerPosition==='top'"></span>

          <div v-if="isMultiRowsCheck" class="selectedReminder">
            已选中<b>{{checkedRowsCount.length}}</b> 行
          </div>

          <a 
            href="#" 
            title="刷新" 
            :class="['znl-icons', loading ? 'znl-refresh-loading' : '']" 
            v-if="!!onRefresh" 
            @click.stop.prevent="refresh">
            <i class="iconfont icon-table_refresh_btn_n"></i>
          </a>

        </div>

      </div>

    </div>

    <div class="znl-lists-wrapper" v-show="tableActivity">

      <div 
        :class="[
          'znl-list-header',
          type==='erp' ? 'erp_list_header' : type === 'bomai' ? 'bomai_list_header' : '']" 
          v-if="showHeader"
          :style="headerStyle">

        <slot name="header-prepend"></slot>
          
        <ul class="header-yul">

          <li v-if="isFieldsSearch" class="list-search-row">
              <ul 
              :class="[
                'header-xul', 
                type==='erp' ? 'erp_search' : type === 'bomai' ? 'bomai_search' : '']">
                <li  v-for="(col, index) in columns"
                    :key="index"
                    v-if="col.visible !== false"
                    :class="['list-search']"
                    :style="{
                      width: col.realWidth + 'px'
                    }">
                    <div class="cell">
                      <el-select 
                        v-if="col.dataMap && col.dataMap.length>0"
                        v-model="fieldsData[col.binding]"
                        :class="[fieldsData[col.binding]!==''?'searching':'']"
                        :readonly="!col.isFieldSearch"
                        :clearable="true"
                        @change="search(fieldsData)"
                        >
                        <el-option
                          v-for="item in col.dataMap"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key">
                        </el-option>
                      </el-select>
                      <div v-else class="input-contain">
                        <el-input  
                          :class="[searchEndParams[col.binding]===''||typeof searchEndParams[col.binding] === 'undefined'?'':'searching']"
                          :readonly="!col.isFieldSearch"
                          v-model="fieldsData[col.binding]"
                          @keydown.enter.native="()=>{search(fieldsData)}"
                        >
                        </el-input>
                      </div>
                    </div>
                </li>
              </ul>
          </li>

          <li>
              <ul 
                :class="[
                  'header-xul',
                  border?'znl-lists_header-xul-border':'',
                  type==='erp' ? 'erp_header' : type === 'bomai' ? 'bomai_header' : '']">

                <li 
                  class="select-header select" 
                  v-if="isMultiRowsCheck"
                  :style="headerRowStyle">
                  <div class="cell">
                    <el-checkbox v-model="allChecked" @change="selectAll"></el-checkbox>
                  </div>
                </li>
                
                <li  v-for="(col, index) in columns"
                    :key="index"
                    v-if="col.visible !== false"
                    :style="[headerRowStyle, {width: col.realWidth + 'px'}]"
                    :class="[
                      'list-header',
                      headerAlign==='left'?'left':'',
                      headerAlign==='center'?'center':'',
                      headerAlign==='right'?'right':'',
                      col.headerClassName?col.headerClassName:''
                      ]">

                    <div 
                      :ref="'headerCell-'+col.binding" 
                      class="cell" 
                      v-if="!col.headerElement && !col.renderHeader" 
                      @click="(e)=>{$emit('header-click', col, $refs['headerCell-'+col.binding][0])}">
                      {{col.header}}
                    </div>

                    <div 
                      :ref="'headerCell-'+col.binding" 
                      class="cell" 
                      v-if="!!col.headerElement" 
                      @click="(e)=>{$emit('header-click', col, $refs['headerCell-'+col.binding][0])}" 
                      v-html="col.headerElement(col.header)">
                    </div>

                    <cell-render
                      v-if="col.renderHeader"
                      :render="h=>col.renderHeader(h, {column: col, columnIndex: index})">
                    </cell-render>

                    <div 
                    v-if="resizable" 
                    class="znl-lists_header-line"
                    :draggable="true"
                    @dragstart="handleDragstart($event, col)"
                    @dragover="handleDragover($event, col)"
                    @dragend="handleDragend($event, col)"
                    ></div>
                </li>
              </ul>
          </li>

        </ul>

        <slot name="header-append"></slot>

      </div>

      <div 
        v-if="itemSource.length > 0 && !$slots.body" 
        class="znl-list-body"
        :style="bodyStyle">

        <ul :class="['body-yul', listTip?'listTip':'']" :title="listTip">
            <li v-for="(item, index) in itemSource"
                :key="index"
                :class="[
                  'znl-lists-row', 
                  border?'znl-lists_row-border':'',
                  listRowClassName(item, index),
                  listRowClassNameSelf(item, index),
                  type==='erp' ? 'erp_list_row' : type === 'bomai' ? 'bomai_list_row' : '']"
                :style="listRowStyle(item, index)"
                @click.stop="rowClick(item, index)"
                >

                <ul class="body-xul">

                  <li class="select-box select" v-if="isMultiRowsCheck">
                    <div class="cell">
                      <el-checkbox 
                        v-model="checkedArray[index]"
                        @change="select"
                        ></el-checkbox>
                    </div>
                  </li>

                  <li  v-for="(col, j) in columns"
                      :key="j"
                      :class="[
                      'list-col', 
                      col.className?col.className:'',
                      col.isCheckedColumn?'checked-column':''
                      ]"
                      v-if="col.visible !== false"
                      :style="{
                          width: col.realWidth + 'px'
                        }">

                      <div class="cell" v-if="!col.element && !col.buttons && !col.isCheckedColumn && !col.renderCell">
                        {{item[col.binding] | dataMapFilters(col) | customFilterIn(col,item)}}
                      </div>

                      <cell-render
                        v-if="col.renderCell"
                        :render="h=>col.renderCell(h, {row: item,column: col, columnIndex: j})">
                      </cell-render>

                      <div class="cell" v-if="!!col.element" v-html="col.element(item[col.binding], {row: item, colunm: col, columnIndex: j})">
                      </div>

                      <div class="cell" v-if="!!col.buttons">
                        <el-button
                          v-for="(btn,m) in (typeof col.buttons === 'function' ? col.buttons(item, col) : col.buttons)"
                          :key="m"
                          :class="btn.class"
                          @click="btn.click(item, col)"
                          @mouseenter.native.stop="Btnmouseenter($event, item, col)"
                        ><span v-html="btn.icon"></span>{{btn.name}}</el-button> 
                      </div>

                      <div class="cell" v-if="!!col.isCheckedColumn">
                        <el-checkbox 
                          v-model="item[col.binding]"
                          >
                        </el-checkbox>
                      </div>

                  </li>
                </ul>

                <cell-render v-if="item.renderRow" :render="h=>item.renderRow(h, {row: item, rowIndex: index})"></cell-render>
            </li>
        </ul>

      </div>

      <slot v-else-if="$slots.body" name="body"></slot>

      <div v-else-if="!$slots.empty" class="lists-empty-data">暂无数据</div>

      <slot v-else-if="$slots.empty" name="empty"></slot>

      <slot></slot>
    </div>

    <div 
      :class="[
        'znl-list-footer',
          type==='erp' ? 'erp_list_footer' : type === 'bomai' ? 'bomai_list_footer' : '',
        footerPosition]"
      :style="footerStyle"
      v-if="showFooter && footerPosition !== 'top'"
      v-show="tableActivity">
      <div class="znl-footer-slot" v-if="$slots.znlfooterslot">
          <slot name="znlfooterslot"></slot>
      </div>

      <el-pagination 
          v-else
          :small="type==='erp'"
          layout="prev, pager, next, total"
          :class="['znl-pagination']"
          :page-size="pageSize"
          :total="totalCount"
          :current-page="pageIndex"
          @current-change="currentChange">
      </el-pagination>
    </div>

    <div class="wj-right-menu znl-btnMouseEnterMenus"
        v-if="btnMouseEnterMenus.List.length!==0"
        ref="mouseMenuConfig"
        v-show="mouseMenuConfig.show"
        v-focus="mouseMenuConfig.show"
        tabindex="-1"
        @mouseleave.stop="mouseMenuConfig.show=false"
        @blur="mouseMenuConfig.show=false"
        @keyup.esc="mouseMenuConfig.show=false"
        :style="{left:mouseMenuConfig.left + 'px',top:mouseMenuConfig.top + 'px'}">
      <ul>
        <template v-for="(menu, index) in gridBtnMouseMenus">
          <li :key="index" v-if="menu.isShow">
            <span class="menu-item"
              @click="(e)=>{menu.click(mouseEnterRow)}">
              <i :class="['iconfont',menu.iconName]"></i> 
              {{menu.name}}</span>
          </li>
        </template>
      </ul>
    </div>
    
  </div>
</template>
<script>
  import cellRender from '@/commonComponents/cellRender.js'
  import BUS from '~/global/bus'
  import { mixin as focusMixin } from '~/directives/focus'
  // import ZnlScrollbar from 'packages/scrollbar/src/main.js'
  import { layoutMixins } from './layout';
  const isServer = typeof window === 'undefined'
  export default{
    name: 'znl-lists',

    props: {
      itemSource: {
        type: Array,
        default () {
          return []
        }
      },
      listTip: {
        type: String,
        default: ''
      },
      btnMouseEnterMenus: {
        type: Object,
        default: () => {
          return {
            List: [],
            Binding: ''
          }
        }
      },
      loadingType: {
        type: String,
        default: 'icon',
        validator (value) {
          return _.contains(['icon', 'animation'], value)
        }
      },
      isMultiRowsCheck: {
        type: Boolean,
        default: true
      },
      isFieldsSearch: {
        type: Boolean,
        default: false
      },
      isInit: {
        type: Boolean,
        default: true
      },
      columns: {
        type: Array,
        default () {
          return []
        }
      },
      listRowClassName: {
        type: Function,
        default () {
          return () => { return '' }
        }
      },
      listRowStyle: {
        type: Function,
        default () {
          return {}
        }
      },
      type: {
        type: String,
        default: 'erp',
        validator(value) {
          return _.contains(['erp', 'bomai'], value)
        }
      },
      onInit: Function,
      onRefresh: Function,
      pageSize: {
        type: Number,
        default: 20,
        validator (val) {
          return val > 0
        }
      },
      pageIndex: {
        type: Number,
        default: 1,
        validator (val) {
          return val > 0
        }
      },
      totalCount: {
        type: Number,
        default: 0,
        validator (val) {
          return val >= 0
        }
      },
      searchFields: Object,
      onSearch: Function,
      loading: {
        type: Boolean,
        default: false
      },
      showTitleRow: Boolean,
      onPageChanged: Function,
      footerPosition: {
        type: String,
        default: 'center',
        validator(value) {
          return _.contains(['center', 'left', 'right', 'top'], value)
        }
      },
      znlLoadingText: {
        type: String,
        default: '数据加载中,请稍后...'
      },
      headerAlign: {
        type: String,
        default: 'left',
        validator (value) {
          return _.contains(['center', 'left', 'right'], value)
        }
      },
      border: {
        type: Boolean,
        default: false
      },
      resizable: {
        type: Boolean,
        default: false
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      showFooter: {
        type: Boolean,
        default: true
      },
      height: {
        type: [String, Number],
        default: '100%'
      },
      maxHeight: {
        type: [String, Number]
      },
      minHeight: {
         type: [String, Number]
      },
      headerHeight: {
        type: Number,
        default () {
          if (this.type === 'erp') {
            return 28
          } else {
            return 50
          }
        }
      },
      titleHeight: {
        type: Number,
        default () {
          if (this.type === 'erp') {
            return 28
          } else {
            return 50
          }
        }
      },
      footerHeight: {
        type: Number,
        default () {
          if (this.type === 'erp') {
            return 30
          } else {
            return 50
          }
        }
      },
      isActivity: {
        type: Boolean,
        default: false
      },
      header: {
        type: String,
        default: ''
      },
      showCurrentRow: {
        type: Boolean,
        default: true
      },
      tooltipContent: {
        type: String,
        default: ''
      }
    },

    components: {
      // draggable,
      cellRender
      // ZnlScrollbar
    },

    mixins: [focusMixin, layoutMixins],

    created () {
      if (isServer) {
        console.log('list is runing server')
        this.init()
      }
    },

    data () {
      return {
        mouseMenuConfig: {
          show: false,
          left: 0,
          top: 0
        },
        // itemSourceCom: [],
        currentRow: null,
        fieldsData: {},
        searchEndParams: {},
        allChecked: false,
        checkedRows: [],
        checkedArray: [],
        headerHeightCom: 0,
        listPrependHeight: 0,
        tableActivity: true,
        jumperShow: false,
        pageIndexCom: 1,
        currentPageIndex: 1
      }
    },

    computed: {
      pageIndexComputed: {
        get () {
          return this.pageIndexCom
        },

        set (val) {
          this.pageIndexCom = val
        }
      },

      gridBtnMouseMenus () {
        const defaultMenus = []
        _.each(this.btnMouseEnterMenus.List,  item => {
          if (_.isUndefined(item.isShow)) {
            _.extend(item, {
              isShow: true
            })
          }
        })
        return _.sortBy(_.union(defaultMenus, this.btnMouseEnterMenus.List), 'index')
      },

      checkedRowsCount () {
        return _.filter(this.checkedArray, item => {
          if (!!item) {
            return !!item
          }
        })

      },

      listStyle () {
        let style = {}
        style.height = isNaN(this.height) ? this.height : this.height + 'px'
        style.maxHeight = isNaN(this.maxHeight) ? this.maxHeight : this.maxHeight + 'px'
        style.minHeight = isNaN(this.minHeight) ? this.minHeight : this.minHeight + 'px'
        return style
      },

      titleStyle () {
        let style = {}
        style.height = this.titleHeight + 'px'
        style.lineHeight = this.titleHeight + 'px'
        return style
      },

      headerStyle () {
        let style = {}
        let height = this.$slots['header-prepend'] 
        ? this.$slots['header-append'] ? this.headerHeight * 3 : this.headerHeight * 2
        : this.$slots['header-append'] ? this.headerHeight * 2 : this.headerHeight
        style.height = height + 'px'
        style.lineHeight = this.headerHeight + 'px'
        this.headerHeightCom = height
        return style
      },

      headerRowStyle () {
        let style = {}
        style.height = this.headerHeight + 'px'
        style.lineHeight = this.headerHeight + 'px'
        return style
      },

      footerStyle () {
        let style = {}
        style.height = this.footerHeight + 'px'
        style.lineHeight = this.footerHeight + 'px'
        return style
      },

      bodyStyle () {
        let style = {};
        if ((this.height === 'auto' || this.height === '100%') && !this.maxHeight) {
          return style
        }


        let listHeight = isNaN(this.height) ? this.height.substr(0, this.height.length - 2) : this.height;
        let listMaxHeight = this.maxHeight ? isNaN(this.maxHeight) ? this.maxHeight.substr(0, this.maxHeight.length - 2) : this.maxHeight : 0;


        let footerShow = this.showFooter && this.footerPosition !== 'top'

        let height = this.showHeader
        ? footerShow 
          ? listHeight - this.headerHeightCom - this.footerHeight - this.listPrependHeight 
          : listHeight - this.headerHeightCom - this.listPrependHeight
        : footerShow 
          ? listHeight - this.footerHeight - this.listPrependHeight 
          : listHeight - this.listPrependHeight;

        // let listMaxHeight = isNaN(this.maxHeight) ? this.maxHeight.substr(0, this.maxHeight.length - 2) : this.maxHeight;

        let maxHeight = this.showHeader
        ? footerShow 
          ? listMaxHeight - this.headerHeightCom - this.footerHeight - this.listPrependHeight 
          : listMaxHeight - this.headerHeightCom - this.listPrependHeight
        : footerShow 
          ? listMaxHeight - this.footerHeight - this.listPrependHeight 
          : listMaxHeight - this.listPrependHeight;


        if (this.showTitleRow) {
          height = height - this.titleHeight
          maxHeight = maxHeight - this.titleHeight
        }


        style.height = height + 'px'
        style.maxHeight = maxHeight + 'px'

        return style
      }
    },

    filters: {
      dataMapFilters (val, col) {
        let value = val
        if (col.dataMap && col.dataMap.length > 0) {
          _.find(col.dataMap, item => {
            if (val === item.key || val === item.value) {
              value = item.value
            }
          })
        }
        return value
      },

      customFilterIn (val, col, row) {
        if (col.customFilter) {
          return col.customFilter(val, col, row)
        } else {
          return val
        }
      }
    },

    watch: {
      searchFields: {
        handler: 'search',
        deep: true
      },

      pageIndex (index) {
        this.pageIndexComputed = index
        this.currentPageIndex = index
      },

      itemSource: {
        handler (itemSource) {
          _.each(itemSource, (item, index) => {
            this.checkedArray[index] = false
          })
          // this.itemSourceCom = JSON.parse(JSON.stringify(this.itemSource))
          
          this.select()
          // this.selectAll()
        },
        deep: true
      },

      $slots (val) {
        this.$nextTick(() => {
          this.listPrependHeightMethod()
        })
      },

      tableActivity (val) {
        this.$emit('switch-to-hide', val)
      },

      columns: {
        deep: true,
        handler () {
          this.updateColumnsWidth()
        }
      }
    },

    methods: {
      init () {
        this.$emit('update:loading', true)
        let res = this.isInit && this.onInit()
        if (res && res.then) {
          res.then(() => {
            this.$nextTick(() => {
              this.$emit('update:loading', false)
            })
          })
        } else {
           this.$nextTick(() => {
             this.$emit('update:loading', false)
           })
        }
      },

      rowClick (row, index) {
        !_.isEqual(row, this.currentRow) && this.$emit('selection-changed', row)
        this.currentRow = row
      },

      pageChanged(pageIndex) {
        this.currentPageIndex = pageIndex
        let pageChanged = this.onPageChanged && this.onPageChanged(pageIndex)
        this.$emit('update:loading', true)
        if (!_.isUndefined(pageChanged) && pageChanged.then) {
          pageChanged.then(response => {
            _.delay(() => {
              this.$emit('update:loading', false)
            }, 200)
          }, e => {
            this.$emit('update:loading', false)
          })
        } else {
          this.$emit('update:loading', false)
        }
      },

      refresh() {
        let refresh = this.onRefresh && this.onRefresh()
        this.clearSelect()
        this.$emit('update:loading', true)
        if (!_.isUndefined(refresh) && refresh.then) {
          refresh.then(response => {
            _.delay(() => {
              this.$emit('update:loading', false)
            }, 200)
          }, e => {
            this.$emit('update:loading', false)
          })
        } else {
          this.$emit('update:loading', false)
        }
      },

      currentChange (index) {
        this.$emit('update:loading', true)
        let res = this.onPageChanged(index)
        if (res && res.then) {
          res.then(() => {
            _.delay(() => {
              this.$emit('update:loading', false)
            }, 200)
          })
        } else {
          _.delay(() => {
            this.$emit('update:loading', false)
          }, 200)
        }
        this.changeCurrent(index)
        
      },

      toggleTableShow (val) {
        if (_.isUndefined(val)) {
          this.tableActivity = !this.tableActivity
        } else {
          if (val) {
            this.tableActivity = true
          } else {
            this.tableActivity = false
          }
        }
      },

      handleDragstart (event, column) {
      },
      handleDragover (event, column) {
      },
      handleDragend (event, column) {
      },
      ondragover (event, row) {
      },  
      onDragstart (event, row) {
        if (!row) return
        BUS.listActiveRow = row
      },
      // draggableAdd () {
      //   this.itemSourceCom = JSON.parse(JSON.stringify(this.itemSource))        
      // },
      // onMoved (event) {
      // },
      // draggableRemove (event) {
      //   this.itemSourceCom = JSON.parse(JSON.stringify(this.itemSource))
      // },

      // checkMove (evt, originalEvent) {
      //   let targetItem = evt.relatedContext.element
      //   if (_.indexOf(this.itemSourceCom, targetItem) < 0) {
      //     return true
      //   }
      //   return false
      // },

      Btnmouseenter (event, row, column) {
        if (column.binding !== this.btnMouseEnterMenus.Binding) return
        this.mouseEnterRow = row
        this.mouseMenuConfig.show = true
        this.$refs.mouseMenuConfig.focus()
        this.mouseMenuConfig.left = event.pageX - 60
        this.mouseMenuConfig.top = event.pageY + 20
      },

      select (val) {
        this.checkedRows = []
        let checkedRows = _.filter(this.checkedArray, (item, index) => {
          if (item) {
            this.checkedRows.push(this.itemSource[index])
            return item
          }
        })
        if (!val) {
          this.currentRow = null
        }
        if (checkedRows.length === this.checkedArray.length) {
          this.allChecked = true
        } else {
          this.allChecked = false          
        }

      },

      selectAll (val) {
        _.each(this.checkedArray, (item, index) => {
           this.$set(this.checkedArray, index, val)
          })
        if (val) {
          this.checkedRows = this.itemSource
        } else {
          this.checkedRows = []
          this.currentRow = null
        }
      },

      getSelectRows () {
        return this.checkedRows.length === 0 ? (_.isNull(this.currentRow) ? [] : [this.currentRow]) : this.checkedRows
      },

      clearSelect () {
         _.each(this.checkedArray, (item, index) => {
           this.$set(this.checkedArray, index, false)
          })
        this.allChecked = false
        this.checkedRows = []
        this.currentRow = null
      },

      changeCurrent (index) {
        this.clearSelect()
      },

      listRowClassNameSelf (row, index) {
        return _.isEqual(row, this.currentRow) && this.showCurrentRow ? 'current-row' : ''
      },

      async search (params) {
        this.$emit('update:loading', true)
        this.onSearch && this.onSearch(params)
        this.searchEndParams = JSON.parse(JSON.stringify(params))
        _.delay(() => {
          this.$emit('update:loading', false)          
        }, 200)
      },

      listPrependHeightMethod () {
        this.$nextTick(() => {
          this.listPrependHeight = this.$slots['list-prepend'] ? this.$slots['list-prepend'][0].elm.offsetHeight : 0
        })
      }
    },

    mounted () {
      if (!isServer) {
        this.init()
        this.$nextTick(() => {
          this.listPrependHeightMethod()
        })
        this.updateColumnsWidth()
      }
    }
  }
</script>
