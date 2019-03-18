<template>
  <el-dialog 
    title="自定义表格配置"
    :visible.sync="p_visible"
    custom-class="znl-gridconfig"
    @open="$emit('open', true)"
    @close="$emit('close', true)" 
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
      <el-tabs 
        v-model="activeName"
        type="card">

        <el-tab-pane 
          label="列配置" 
          name="columnConfog">
          <el-table :data="columnsConfig"
                  :max-height="338"
                  class="customGrid"
                  :row-style="(row,index)=>index===sortIndex?{backgroundColor:'#ede9dd'}:{}">
            <el-table-column type="expand"
                            header-align="center"
                              v-if="hasEditRole('authUsers','tags','cellColor')"> 
                            <!-- v-if="true"> -->
              <template slot-scope="scope">
                <el-tabs :value="hasEditRole('tags','cellColor')&&scope.row.isTag?'tags':'cellColor'"
                        @tab-click="tabChanged">
                  <el-tab-pane label="标签配置"
                              name="tags"
                              v-if="scope.row.isTag&&hasEditRole('tags')">
                    <el-row :gutter="10"
                            v-for="(tag,index) in scope.row.tags"
                            :key="index">
                      <el-col :span="12">
                        <el-input v-model="tag.name" />
                      </el-col>
                      <el-col :span="8">
                        <el-color-picker v-model="tag.color"></el-color-picker>
                      </el-col>
                      <el-col :span="4">
                        <a href="#"
                          v-if="scope.row.tags.length-1===index"
                          @click="addTagCondition(scope.row.binding)">添加</a>
                        <a href="#"
                          v-if="scope.row.tags.length>1"
                          @click="removeTagCondition(scope.row.binding,index)">删除</a>
                        <a href="#"
                          v-else
                          @click="clearTagCondition(scope.row.binding,index)">清除</a>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                  <el-tab-pane label="单元格颜色"
                              name="cellColor"
                                v-if="!scope.row.isTag&&hasEditRole('cellColor')"> 
                    <div style="width:99%">
                    <el-row :gutter="10"
                            v-for="(cellColor,index) in scope.row.cellColors"
                            :key="index">
                      <el-col :span="6">
                        <el-select v-model="cellColor.operator"
                                  @change="val=>{cellColor.params=val&&scope.row.dataType!==4&&operators[val].paramsNum>1?new Array(operators[cellColor.operator].paramsNum):''}">
                          <!-- <el-option label="请选择"
                                    value="" /> -->
                          <el-option v-for="(operator,key) in operators"
                                    :key="key"
                                    :label="operator.name"
                                    :value="key"
                                    :disabled="operator.typeSupport.indexOf(scope.row.dataType)<0">
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="8">
                        <el-date-picker v-if="scope.row.dataType===4"
                                        placeholder="选择日期"
                                        format="yyyy/MM/dd"
                                        :type="cellColor.operator&&operators[cellColor.operator].paramsNum >1?'daterange':'date'"
                                        v-model="cellColor.params" />
                        <el-input v-else-if="cellColor.operator&&operators[cellColor.operator].paramsNum>1"
                                  v-for="(num,index) in operators[cellColor.operator].paramsNum"
                                  :key="index"
                                  :value="cellColor.params&&cellColor.params.length>=num?cellColor.params[num-1]:''"
                                  @change="val=>{cellColor.params[num-1]=val}" />
                        <el-input v-else
                                  :value="cellColor.params"
                                  @change="val=>{cellColor.params=val}" />
                      </el-col>
                      <el-col :span="6">
                        <el-color-picker v-model="cellColor.color"></el-color-picker>
                      </el-col>
                      <el-col :span="4">
                        <a href="#"
                          v-if="scope.row.cellColors.length-1===index"
                          @click="addCellColorCondition(scope.row.binding)">添加</a>
                        <a href="#"
                          v-if="scope.row.cellColors.length>1"
                          @click="removeCellColorCondition(scope.row.binding,index)">删除</a>
                        <a href="#"
                          v-else
                          @click="clearCellColorCondition(scope.row.binding,index)">清除</a>
                      </el-col>
                    </el-row>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="权限"
                              name="authUsers"
                              v-if="hasEditRole('authUsers')"> 
                    <div class="auth-column"
                        v-show="users.length">
                      <el-checkbox v-model="scope.row.checkedAll"
                                  @change="checkAllUser(scope.row.name,$event)">全选</el-checkbox>
                  
                      <el-checkbox-group v-model="scope.row.authUsers"
                                        @change="(val)=>{checkUser(scope.row.name,val)}">
                        <el-checkbox v-for="(user,index) in users"
                                    :label="user.id"
                                    :key="index">{{user.name}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                    <span v-if="isLoadingUsers">正在加载...</span>
                  </el-tab-pane>
                </el-tabs>

              </template>
            </el-table-column>
            <el-table-column label="列名" header-align="center">
              <template slot-scope="scope">
                <div :class="['znl-dragging-cell', 'znl-dragging-cell-'+scope.$index]" :draggable="true" title="可拖动至任意行配置" @dragstart.stop="dragstartNative(scope.$index, $event)"
          @dragend.stop="dragendNative(scope.$index, $event)">
                <el-input size="mini"
                          v-model="scope.row.header"
                          v-if="hasEditRole('header')"></el-input>
                <span class="unEditable columnEneditStyle"
                      v-else>{{scope.row.header}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="宽度" header-align="center">
              <template slot-scope="scope">
                <div :class="['znl-dragging-cell', 'znl-dragging-cell-'+scope.$index]" :draggable="true" title="可拖动至任意行配置" @dragstart.stop="dragstartNative(scope.$index, $event)"
          @dragend.stop="dragendNative(scope.$index, $event)">
                <el-input size="mini"
                          type="number"
                          v-model="scope.row.width"
                          v-if="hasEditRole('width')"></el-input>
                <span class="unEditable"
                      v-else>{{scope.row.width}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="是否显示"
                              header-align="center"
                            align="center">
              <template slot-scope="scope">
                <div :class="['znl-dragging-cell', 'znl-dragging-cell-'+scope.$index]" :draggable="true" title="可拖动至任意行配置" @dragstart.stop="dragstartNative(scope.$index, $event)"
          @dragend.stop="dragendNative(scope.$index, $event)">
                <el-switch v-model="scope.row.visible"
                          active-text=""
                          inactive-text=""
                          :width="38"
                          :disabled="!hasEditRole('visible')"></el-switch>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="是否只读"
                            align="center"
                            header-align="center"
                            v-if="hasEditRole('isReadOnly')">
              <template slot-scope="scope">
                <div :class="['znl-dragging-cell', 'znl-dragging-cell-'+scope.$index]" :draggable="true" title="可拖动至任意行配置" @dragstart.stop="dragstartNative(scope.$index, $event)"
          @dragend.stop="dragendNative(scope.$index, $event)">
                <el-switch v-model="scope.row.isReadOnly"
                          active-text=""
                          inactive-text=""
                          :width="38"></el-switch>
                </div>
              </template>
            </el-table-column>
            <el-table-column class-name="sort-column"
                            align="center"
                            header-align="center"
                            :width="100"
                            v-if="hasEditRole('sort')">
              <template slot-scope="scope">
                <div :class="['znl-dragging-cell', 'znl-dragging-cell-'+scope.$index]" :draggable="true" title="可拖动至任意行配置" @dragstart.stop="dragstartNative(scope.$index, $event)"
          @dragend.stop="dragendNative(scope.$index, $event)">
                <a href="#"
                  :class="{invisible:scope.$index===0}"
                  @click.stop.prevent="sortUp(scope.$index, 1)">
                    <i class="iconfont icon-left_nav_arrow-up-ic"></i>
                </a>
                <a href="#"
                  :class="{invisible:scope.$index===columns.length-1}"
                  @click.stop.prevent="sortDown(scope.$index, 1)">
                    <i class="iconfont icon icon-left_nav_arrow-down-"></i>
                </a>
                </div>
              </template>
            </el-table-column>
          </el-table>   
        </el-tab-pane>

        <el-tab-pane 
          label="参数设置" 
          name="parameterConfig"
          v-if="$slots['parameter-config']">
          <slot name="parameter-config"></slot>
        </el-tab-pane>

      </el-tabs>

      <template slot="footer">

        <div class="pull-left" v-if="activeName==='columnConfog'">
          <span> 每页：</span>
          <el-input-number 
            class="page-size"
            size="small"
            v-model="p_pageSize"
            :min="1"
            :step="5">
          </el-input-number>
        </div>

        <el-button 
          type="text"
          class='btn-reset'
          size="small"
          :loading="loading&&submitTarget==='reset'"
          @click="reset">{{activeName==='columnConfog' ? '重置列配置' : '重置参数配置'}}
        </el-button>

        <el-button 
          type=""
          :disabled="loading"
          class="znl-btn-auxiliary"
          @click="cancel">取消
        </el-button>

        <el-button 
          type="primary"
          :loading="p_loadingFlag"
          class="znl-btn-main"
          @click="confirm">{{loadingText}}
        </el-button>

      </template> 
  </el-dialog>
</template>
<script>
import { mixin as propSyncMixin } from '~/mixins/propSync.js'
import { mixin as actionMixin } from '~packages/action-flex-grid/src/action.js'

const CELLCOLOR_CONDITION_DEFAULT = {
  operator: '',
  color: '#FF0000',
  params: '',
  expression: ''
}

const TAG_CONDITION_DEFAULT = {
  name: '',
  color: '#000000'
}

const COLUMN_TYPES = {
  0: Object,
  1: String,
  2: Number,
  3: Boolean,
  4: Date,
  5: Array
}

const OPERATORS = {
  greaterThan: {
    name: '大于',
    paramsNum: 1,
    typeSupport: [2, 4],
    action (field, value = '', type = Number) {
      switch (type) {
        case Number:
          if (_.isNaN(Number.parseFloat(value))) break
          return '{' + field + '}>' + value
        case Date:
          if (_.isNaN(Date.parse(value))) break
          return 'new Date("{' + field + '}")>new Date("' + value + '")'
        default:
          return '0===1'
      }
    }

  },
  lessThan: {
    name: '小于',
    paramsNum: 1,
    typeSupport: [2, 4],
    action (field, value = '', type = Number) {
      switch (type) {
        case Number:
          if (_.isNaN(Number.parseFloat(value))) break
          else return '{' + field + '}<' + value
        case Date:
          if (_.isNaN(Date.parse(value))) break
          else return 'new Date("{' + field + '}")<new Date("' + value + '")'
        default:
          return '0===1'
      }
    }
  },
  equal: {
    name: '等于',
    paramsNum: 1,
    typeSupport: [1, 2, 3, 4],
    action (field, value = '', type = String) {
      switch (type) {
        case String:
          return '"{' + field + '}"==="' + (value || '') + '"'
        case Number:
        case Boolean:
          if (!_.isBoolean(value) || !_.isFinite(value)) break
          else return '{' + field + '}===' + value
        case Date:
          if (_.isNaN(Date.parse(value))) break
          else return 'new Date("' + value + '")===new Date("{' + field + '}")'
        default:
          return '0===1'
      }
    }
  },
  unEqual: {
    name: '不等于',
    paramsNum: 1,
    typeSupport: [1, 2, 3, 4],
    action (field, value = '', type = String) {
      switch (type) {
        case String:
          return '"{' + field + '}"!=="' + value + '"'
        case Number:
        case Boolean:
          if (!_.isBoolean(value) || _.isNaN(Number.parseFloat(value))) break
          else return '{+' + field + '}!==+' + value
        case Date:
          if (_.isNaN(Date.parse(value))) break
          return 'new Date("' + value + '")!==new Date("{' + field + '}")'
        default:
          return '0!==0'
      }
    }
  },
  between: {
    name: '区间',
    paramsNum: 2,
    typeSupport: [2, 4],
    action (field, values, type = Number) {
      if (!_.isArray(values) || values.length < 2 || _.some(values, value => _.isUndefined(value))) {
        return '0===1'
      } else {
        switch (type) {
          case Number:
            if (_.isNaN(Number.parseFloat(values[0])) || _.isNaN(Number.parseFloat(values[1]))) break
            else return '{' + field + '}>=' + values[0] + '&&{' + field + '}<=' + values[1]
          case Date:
            if (_.isNaN(Date.parse(values[0])) || _.isNaN(Date.parse(values[1]))) break
            return 'new Date("{' + field + '}")>=new Date("' + values[0] + '")&&new Date("{' + field + '}")<=new Date("' + values[1] + '")'
          default:
            return '0===1'
        }
      }
    }
  },
  contains: {
    name: '包含',
    paramsNum: 1,
    typeSupport: [1],
    action (field, value = '', type = String) {
      return '"{' + field + '}".indexOf("' + value + '")>-1'
    }
  }
}

const EDIT_ROLE_CONFIG = {
  '1': ['width', 'sort'],
  '2': ['header', 'width', 'visible', 'sort', 'tags', 'cellColor', 'authUsers'],
  '3': []
}

export default {
  name: 'ZnlGridconfig',

  mixins: [propSyncMixin, actionMixin],

  components: {

  },

  props: {
    loading: Boolean,
    open: {
      type: Boolean,
      default: false,
      propsync: true
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    pageSize: {
      type: Number,
      default: 10,
      propsync: true
    },
    role: {
      type: [Number, String],
      default: 1,
      validator (value) {
        return _.contains(['1', '2', '3'], value + '')
      }
    },
    visible: {
        type: Boolean,
        default: false,
        propsync: true
    },
    users: {
      type: Array,
      default: () => {
        return []
      }
    },
    loadingFlag: {
      type: Boolean,
      default: false,
      propsync: true
    }
  },

  data () {
    return {
      operators: OPERATORS,
      isLoadingUsers: false,
      columnsConfig: [],
      sortIndex: -1,
      submitTarget: '',
      loadingText: '确定',
      activeName: 'columnConfog',
      isDraging: false
    }
  },

  created () {
  },

  mounted () {  
    this.columnsConfig = this.columns.filter(t => !t.isSystem).map((column, index) => {
      return _.extend({}, column, {
        authUsers: column.authUsers || [],
        cellColors: (column.extraConfig && column.extraConfig.cellColors && column.extraConfig.cellColors.length ? column.extraConfig.cellColors : [_.clone(CELLCOLOR_CONDITION_DEFAULT)]).slice(),
        tags: (column.extraConfig && column.extraConfig.tags && column.extraConfig.tags.length ? column.extraConfig.tags : [_.clone(TAG_CONDITION_DEFAULT)]).slice(),
        checkedAll: false
      })
    })
  },

  watch: {
    columns (val) {
        this.columnsConfig = val.filter(t => !t.isSystem).map((column, index) => {
        return _.extend({}, column, {
          authUsers: column.authUsers || [],
          cellColors: (column.extraConfig && column.extraConfig.cellColors && column.extraConfig.cellColors.length ? column.extraConfig.cellColors : [_.clone(CELLCOLOR_CONDITION_DEFAULT)]).slice(),
          tags: (column.extraConfig && column.extraConfig.tags && column.extraConfig.tags.length ? column.extraConfig.tags : [_.clone(TAG_CONDITION_DEFAULT)]).slice(),
          checkedAll: false
        })
      })
    },
    user (val) {
      _.each(this.columnsConfig, column => {
        column.checkedAll = !!column.authUsers && column.authUsers.length === val.length
      })
    }
    // parameterConfig (val) {
    //   this.parameterConfigData = JSON.parse(JSON.stringify(val))
    // }
  },

  methods: {
    hasEditRole (...fields) {
      return !!EDIT_ROLE_CONFIG[this.role + ''] && !!_.filter(EDIT_ROLE_CONFIG[this.role + ''], r => _.contains(fields, r)).length
    },

    sortUp (index, step) {
      const prev = this.columnsConfig[index - step]
      const currect = this.columnsConfig.splice(index, 1)[0]
      const currectSort = currect.sort
      this.columnsConfig.splice(index - step, 0, currect)
      _.each(this.columnsConfig, (item, index) => {
        item.sort = index
      })
    },

    dragstartNative (index, event) {
      this.isDraging = true
    },

    dragendNative (index, event) {
      let fristRowCell = this.$el.querySelectorAll('#pane-columnConfog .el-table__row')[0]
      let Stepping = Math.floor((event.pageY - fristRowCell.getBoundingClientRect().top) / 40)
      if (Stepping - index > 0) {
        this.sortDown(index, Stepping - index)
      } else if (Stepping - index < 0){
        this.sortUp(index, index - Stepping)
      }
      this.isDraging = false
    },

    sortDown (index, step) {
      const next = this.columnsConfig[index + step]
      const currect = this.columnsConfig.splice(index, 1)[0]
      const currectSort = currect.sort
      // currect.sort = next.sort
      // next.sort = currectSort
      this.columnsConfig.splice(index + step, 0, currect)
      // this.sortIndex = index + step
      _.each(this.columnsConfig, (item, index) => {
        item.sort = index
      })
    },

    checkAllUser (name, e) {
      const column = _.find(this.columnsConfig, column => column.name === name)
      // column.authUsers = e.target.checked ? this.users.map(user => user.id) : []
      column.authUsers = e ? this.users.map(user => user.id) : []
    },

    checkUser (name, value) {
      const column = _.find(this.columnsConfig, column => column.name === name)
      column.checkedAll = column.authUsers.length === this.users.length
    },
    addCellColorCondition (field) {
      let column = _.find(this.columnsConfig, column => column.binding === field)
      column.cellColors.push(_.extend({}, CELLCOLOR_CONDITION_DEFAULT))
    },
    removeCellColorCondition (field, index) {
      let column = _.find(this.columnsConfig, column => column.binding === field)
      column.cellColors.splice(index, 1)
    },
    clearCellColorCondition (field, index) {
      let column = _.find(this.columnsConfig, column => column.binding === field)
      _.extend(column.cellColors[index], CELLCOLOR_CONDITION_DEFAULT)
    },
    addTagCondition (field) {
      let column = _.find(this.columnsConfig, column => column.binding === field)
      column.tags.push(_.extend({}, TAG_CONDITION_DEFAULT))
    },
    removeTagCondition (field, index) {
      let column = _.find(this.columnsConfig, column => column.binding === field)
      column.tags.splice(index, 1)
    },
    clearTagCondition (field, index) {
      let column = _.find(this.columnsConfig, column => column.binding === field)
      _.extend(column.tags[index], TAG_CONDITION_DEFAULT)
    },
    
    tabChanged (tab) {
        this.$emit('tab-changed', tab.name)
    },

    async confirm () {
      this.p_loadingFlag = true
      this.loadingText = ''
      this.submitTarget = 'confirm'
      let columns = _.map(this.columnsConfig, column => {
        if (column.isTag) {
          column.extraConfig = JSON.stringify({ 'tags': _.filter(column.tags, tag => tag.name) })
        } else {
          column.extraConfig = JSON.stringify({
            'cellColors': _.map(_.filter(column.cellColors, cell => cell.operator), cell => {

              return _.extend({}, cell, {
                expression: cell.operator && this.operators[cell.operator].action(column.binding, cell.params, COLUMN_TYPES[column.dataType])
              })
            })
          })
        }
        let presentCol = this.$parent.$el.querySelectorAll('.el-table .el-table__body-wrapper tbody tr td')
        _.each(presentCol, item => {
          if (item.getAttribute('getcolor') === 'true') {
            item.removeAttribute('getcolor')
          }
        })
        return _.clone(column)
      })
      await this.$emit('confirm', columns, this.p_pageSize, this.parameterConfigData)
    },
    
    reset () {
      this.submitTarget = 'reset'
      this.$emit('reset', this.activeName)
    },
    cancel () {
      this.p_visible = false
    }
  }
}
</script>
