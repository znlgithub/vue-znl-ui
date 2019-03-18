<template>
  <div
    :class="[
    'base-flex-grid',
    'baseStyleDefalut',
    baseStyleSuccess ? 'baseStyleSuccess':''
    ]"
    v-if="tableShow"
  >

    <template>

      <div
        class="table-container"
        @keydown.self="tableContainerKeydown"
        tabindex="1"
        @blur="() => {tableContainerFocus = false}"
        :title="tableTip"
        v-focus="tableContainerFocus"
        ref="tabcontainer"
      >

        <el-table
          :class="['baseElementGrid',isFieldsSearch?'isFieldsSearchLine':'znl-table_nosearch-line']"
          :data="itemSourceCom"
          :show-header="true"
          ref="baseElementGrid"
          :max-height="maxHeightCom"
          :border="border"
          :row-class-name="tableRowClassNameCom"
          :cell-class-name="cellClassNameCom"
          :header-row-class-name="headerRowClassName"
          :header-cell-class-name="headerCellClassNameCom"
          :empty-text="emptyText"
          :stripe="stripe"
          :row-key="computeRowKey"
          :highlight-current-row="false"
          :show-summary="showSummary"
          :sum-text="sumText"
          :summary-method="summaryMethod"
          tooltip-effect="light"
          :style="elementTableStyle"
          :height="!isNaN(height) ? height + 'px' : height"
          @sort-change="sortChange"
          @row-contextmenu="rowContextmenu"
          @select="select"
          @select-all="selectAll"
          @row-click="rowClick"
          @cell-click="cellClick"
          @cell-dblclick="cellDblclick"
          @selection-change="selectionChange"
          @header-contextmenu="headerContextmenu"
        >

          <el-table-column
            name="_Checked"
            type="selection"
            :width="30"
            class-name="table-selection"
            header-align="center"
            :reserve-selection="true"
            v-if="isMultiRowsCheck"
            :fixed="isMultiRowsCheckFixed"
          >
          </el-table-column>

          <el-table-column
            v-for="(column, index) in checkColumns"
            :name="column.name"
            :key='index'
            :binding="column.binding"
            :label="column.header"
            :width="column.width"
            :fixed="column.isFixed"
            :class-name="columnClassNameHandler(column)"
            :column-key="column.binding"
            :prop="column.binding"
            :resizable="true"
            :align="column.align?column.align:'left'"
            header-align="center"
            :show-overflow-tooltip="true"
            :data-type="column.dataType"
            v-if="column.visible && (typeof column.hasRole === 'undefined' ||  !!column.hasRole)"
            :label-class-name="labelClassNameHandler(column, index)"
            :render-header="renderHeader"
          >

            <template slot-scope="scope">

              <div
                :style="textStyleFuc(scope, column)"
                :tabindex="tabindex"
                :draggable="cellDraggable"
                @dragstart.stop="onDragstart($event, scope)"
                @dragend.stop="onDragend($event, scope)"
                :class="[
                  'znl-tablecell',
                  column.dataType === 2 ?'is-right' :( column.align?`is-${column.align}`:'is-center'),
                  column.className?column.className: '',
                  column.isCheckedColumn?'CheckedColumn':'',
                  (scope.row[column.binding] !== oldItemSource[scope.$index][column.binding]) && gridtype==='action'?'cellDataChange':'',
                  gridtype !== 'base' && !column.isReadOnly && column.dataType === 2 && !!scope.row[column.binding] && isNaN(scope.row[column.binding]) ? 'znl-errDataType' : ''
                  ]"
              >

                <span v-if="!column.isCheckedColumn && !column.elements && !column.buttons && !column.renderCell">
                  {{scope.row[column.name] | dataMapFilters(column,scope.row) | customFilterIn(column,scope.row)}}
                </span>

                <cell-render
                  v-if="column.renderCell"
                  :render="h=>column.renderCell(h, {row: scope.row,column: column, columnIndex: index})"
                >
                </cell-render>

                <div v-if="column.elements">
                  <div
                    v-for="(item, index) in (typeof column.elements)==='function'? column.elements(scope.row):column.elements"
                    :key="index"
                    v-html="item.name"
                    @click="item.click"
                    @mouseenter="item.mouseenter"
                    @mouseleave="item.mouseleave"
                  >
                  </div>
                </div>

                <el-checkbox
                  v-if="column.isCheckedColumn"
                  v-model="scope.row[column.binding]"
                >
                </el-checkbox>

                <el-button
                  v-for="(button,index) in (typeof column.buttons)==='function'? column.buttons(scope.row):column.buttons"
                  :key="index"
                  size="mini"
                  :class="[
                      'eleBtnStyle',button.className?button.className:'',
                      typeof button.className === 'function' ? button.className(scope.row) : ''
                      ]"
                  v-if="typeof button.when === 'undefined' ? true: (typeof button.when=== 'function' ? button.when(scope.row):button.when)"
                  v-html="typeof button.content === 'function' ? button.content(scope.row):button.content"
                  @click.stop="button.click(scope.row, changeRow)"
                  @mouseenter.native.stop="!!btnMouseEnterMenus && $refs.mouseEnterMenus.Btnmouseenter($event, scope.row, column)"
                  @mouseleave.native.stop="!!btnMouseEnterMenus && $refs.mouseEnterMenus.mouseleaveBtnlists(false)"
                >
                </el-button>

                <i
                  v-if="gridtype !== 'base' && !column.isReadOnly"
                  title="数据类型错误"
                  class="iconfont icon-table_error_ic icon-errdataType"
                >
                </i>

              </div>

            </template>
          </el-table-column>

          <el-table-column
            name="shortcutColumn"
            :width="40"
            :class-name="isFieldsSearch ? 'znl-shortcut-column has-search-row' : 'znl-shortcut-column'"
            header-align="center"
            :render-header="renderShortcutColumn"
            v-if="showShortcutColumnCom"
          >
          </el-table-column>

        </el-table>

      </div>

    </template>

    <div>

      <right-menu
        ref="contextMenu"
        :right-menus="rightMenus"
        :columns="checkColumns"
        :on-refresh="onRefresh"
        v-move-to.body
      >
      </right-menu>

      <mouse-enter-menus
        ref="mouseEnterMenus"
        :btn-mouse-enter-menus="btnMouseEnterMenus"
        v-move-to.body
        @mouse-menu-config="obj => $emit('mouse-menu-config', obj)"
      >
      </mouse-enter-menus>

      <header-context-menu
        ref="headerContextMenu"
        :columns="checkColumns"
        :show-shortcut-column="showShortcutColumn"
        :visible-columns-array="visibleColumnsArray"
        v-move-to.body
        :on-save-config="onSaveConfig"
        :is-show-visible="isShowVisible"
        @openseting="$emit('openseting')"
        @change-column="changeColumn"
        @switch-hide-column="(column,columns)=>{$emit('switch-hide-column', column,columns)}"
      >
      </header-context-menu>

      <table-change-column
        :column="tableChangeColumn"
        :visible.sync="showTableChangeColumn"
        @change-column="column => $emit('change-column', column)"
      >
      </table-change-column>

    </div>

    <el-select
      ref="editSelect"
      v-show="idSelectShow"
      class="znl-editinput idEditSelect"
      popper-class="znl-editinput-dropdown"
      v-model="editSelectData"
      :multiple="multiple"
      :style="znlEditInputStyle"
      @change="val=>{multiple && $emit('multiple-change',val,currentRow)}"
      @visible-change="editInputBlurVisibleChange"
    >

      <el-option
        v-for="(item,index) in columnDataMap"
        :key="index"
        :label="item.value"
        :value="item.key"
        :disabled="!!item.disabled"
      >
        <span
          class="znl-selected-checked"
          v-if="multiple"
        >
          <el-checkbox
            :disabled="!!item.disabled"
            v-model="checkedArray[index]"
          >{{ item.value }}</el-checkbox>
        </span>
      </el-option>

    </el-select>

    <el-date-picker
      ref="editDatepick"
      v-show="idDatepickerShow"
      class="znl-editinput idEditDatepick"
      v-model="editDatepickerData"
      :style="znlEditInputStyle"
      @blur="() => editInputBlur('datapicker')"
      popper-class="znl-editDataPicker"
      value-format="yyyy-MM-dd"
    >
    </el-date-picker>

    <input
      type="text"
      ref="idEditInput"
      class="znl-editinput idEditInput"
      v-show="idInputShow"
      v-model="editInputValue"
      :style="znlEditInputStyle"
      @blur="editInputBlur"
      @keydown.stop="editInputKeydown($event,editInputValue)"
    >
    </input>

    <el-row
      class="footer"
      v-if="onPageChanged&&paginationPosition==='bottom'"
      :style="footerStyle"
    >

      <div class="znl-footer-slot">
        <slot name="znlfooterslot"></slot>
      </div>

      <el-pagination
        small
        class="znl-pagination"
        :style="footerStyle"
        layout="prev, pager, next, total"
        :page-size="pageSize"
        :total="totalCount"
        :current-page.prop="pageIndex"
        @current-change="onPageChanged"
      >
      </el-pagination>

    </el-row>

    <div class="EditInputContainer"></div>

  </div>
</template>

<script>
import KEYCODE from "./keycode";
import cellRender from "@/commonComponents/cellRender.js";
import { mixin as propSyncMixin } from "~/mixins/propSync";
import Mixins from "~/mixins/global.js";
import { mixin as focusMixin } from "~/directives/focus";
import { mixin as moveToMixin } from "~/directives/moveTo";
import { mixin as baseMixin } from "./base";
import copy from "clipboard-copy";
import BUS from "~/global/bus";
import RightMenu from "./rightMenu";
import MouseEnterMenus from "./mouseEnterMenus";
import HeaderContextMenu from "./headerContextMenu";
import TableChangeColumn from "./changeColumn";
import { debug } from "util";
// import ElTable from 'packages/table/index'

const EXPRESSION_CALC = function(expression, data, defaultVal) {
  if (_.isUndefined(expression)) {
    var matched = false;
  } else if (_.isBoolean(expression)) {
    matched = expression;
  } else if (_.isString(expression)) {
    let pattern = expression;
    let fields = _.uniq(pattern.match(/{\w+}/g));
    for (let i = 0; i < fields.length; i++) {
      let fieldName = fields[i].replace("{", "").replace("}", "");
      let regex = window.eval("/" + fields[i] + "/g");
      let transfromData = data[fieldName];
      if (defaultVal) {
        _.each(defaultVal, item => {
          if (item.value === data[fieldName] || item.key === data[fieldName]) {
            transfromData = item.value;
          }
        });
      }
      pattern = _.has(data, fieldName) && pattern.replace(regex, transfromData);
    }
    try {
      matched = window.eval(pattern);
    } catch (e) {
      matched = defaultVal;
    }
  } else if (_.isFunction(expression)) {
    matched = expression(data);
  }
  return !!matched;
};

const ADDITIONALKEYS = {
  isEdit: "isEdit"
};

export default {
  name: "ZnlBaseflexgrid",

  mixins: [focusMixin, moveToMixin, baseMixin, Mixins, propSyncMixin],

  components: {
    cellRender,
    RightMenu,
    MouseEnterMenus,
    HeaderContextMenu,
    TableChangeColumn
    // ElTable
  },

  data() {
    return {
      multiple: false,
      checkedArray: [],
      oldItemSource: [],
      clearOldItemSource: true,
      checkColumns: [],
      fieldsFilter: {},
      clickCellData: {},
      cellContent: "",
      checkedRows: [], // 复选框选中的所有项(k,v)
      checkedRowsCount: 0,
      currentSelection: [],
      currentRow: null,
      currentColumn: {
        binding: ""
      },
      oldColumn: {},
      oldRow: {},
      rowIndex: "",
      columnIndex: "",
      baseStyleSuccess: false,
      itemSourceCom: [],
      tableContainerFocus: false,
      idInputShow: false,
      idSelectShow: false,
      idDatepickerShow: false,
      columnDataMap: [],
      editSelectData: "",
      editDatepickerData: "",
      oldValue: "",
      editType: "",
      mouseEnterRow: {},
      visibleArray: [],
      visibleColumnsArray: [],
      showVisibleColumn: false,
      tableShow: true,
      isAllSelection: false,
      isRenderAllSelection: true,
      showTableChangeColumn: false,
      tableChangeColumn: {},
      isShowVisible: true,
      tabindex: null,
      tableHeaderDrag: false
    };
  },

  filters: {
    dataMapFilters(val, col, row) {
      let value = val;
      if (!col.multiple && col.dataMap && col.dataMap.length > 0) {
        _.find(col.dataMap, item => {
          if (val === item.key || val === item.value) {
            value = item.value;
          }
        });
      } else if (col.multiple && col.mapping) {
        value = "";
        let mapList = row[col.mapping]; // 选项
        if (_.isUndefined(row[col.binding])) {
          row[col.binding] = "[]";
        }
        let crrentList = _.isArray(row[col.binding])
          ? row[col.binding]
          : JSON.parse(row[col.binding]); // 绑定值
        let maps = _.map(mapList, item => {
          // 选项key集合
          return item.key;
        });
        _.each(mapList, (item, index) => {
          _.each(crrentList, (data, j) => {
            if (item.key === data) {
              value && (value += col.separator || "/");
              value += item.value;
            }
          });
        });
      }
      value = _.isUndefined(value) ? "" : value;
      return value;
    },

    customFilterIn(val, col, row) {
      if (col.customFilter) {
        return col.customFilter(val, col, row);
      } else {
        return val;
      }
    }
  },

  props: {
    emptyText: {
      type: String,
      default: "暂无数据"
    },
    onSaveConfig: Function,
    customFilter: Function,
    cellLineHeight: {
      type: Number,
      default: 28
    },
    showShortcutColumn: {
      type: Boolean,
      default: true
    },
    isMultiRowsCheckFixed: {
      type: Boolean,
      default: true
    },
    tableTip: {
      type: String,
      default: null
    },
    paginationPosition: {
      typr: String,
      default: "bottom"
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    sumText: {
      type: String,
      default: "合计"
    },
    summaryMethod: Function,
    gridtype: {
      type: String,
      default: "base"
    },
    tableRowClassName: {
      type: Function
    },
    headerRowClassName: {
      type: Function
    },
    cellClassName: {
      type: Function
    },
    headerCellClassName: {
      type: Function
    },
    cellDraggable: {
      type: Boolean,
      default: false
    },
    maxHeight: [String, Number],
    minHeight: [String, Number],
    height: [String, Number],
    footerHeight: Number,
    shortcutColumnHandler: Function,
    enterCellmovesDirection: Boolean
  },

  computed: {
    editInputValue: {
      get() {
        if (this.currentColumn && !!this.currentColumn.IsUpperCase) {
          return (
            this.currentRow &&
            this.currentRow[this.currentColumn["binding"]] &&
            _.isFunction(
              this.currentRow[this.currentColumn["binding"]].toUpperCase
            ) &&
            this.currentRow[this.currentColumn["binding"]].toUpperCase()
          );
        } else {
          return (
            this.currentRow &&
            this.currentRow[this.currentColumn["binding"]] &&
            this.currentRow[this.currentColumn["binding"]]
          );
        }
      },
      set(val) {
        if (this.currentColumn && !!this.currentColumn.IsUpperCase) {
          this.currentRow[this.currentColumn["binding"]] = val.toUpperCase();
        } else {
          this.currentRow[this.currentColumn["binding"]] = val;
        }
      }
    },

    maxHeightCom() {
      if (this.maxHeight) {
        return this.maxHeight;
      }
    },

    footerStyle() {
      let style = {};
      style.height = this.footerHeight + "px";
      style.lineHeight = this.footerHeight + "px";
      return style;
    },

    elementTableStyle() {
      let style = {};
      style.width = "100%";
      // style.height = _.isNumber(this.height) ? this.height + 'px' : this.height
      if (this.minHeight) {
        style.minHeight = this.minHeight + "px";
      }
      return style;
    },

    znlEditInputStyle() {
      let style = {};
      style.height = this.cellLineHeight - 4 + "px";
      style.lineHeight = this.cellLineHeight - 4 + "px";
      return style;
    },

    showShortcutColumnCom() {
      let hasMore = false;
      _.find(this.checkColumns, (column, index) => {
        if (!column.isSystem && !this.visibleArray[index]) {
          hasMore = true;
          return column;
        }
      });
      return this.showShortcutColumn && hasMore;
    }
  },

  watch: {
    columns: "setColumns",

    searchFields: {
      handler(newVal, oldVal) {
        this.fieldsFilter = _.extend({}, this.fieldsFilter, newVal);
      },
      deep: true
    },

    itemSource(itemSource) {
      if (itemSource.length === 0) {
        return (this.itemSourceCom = []);
      }
      this.gridItemSourceData();
      this.setToggleRowSelection();
    },

    itemSourceCom: {
      handler(itemSource) {
        let newItemSource = _.map(itemSource, item => {
          return _.omit(item, (value, key) => {
            return _.has(ADDITIONALKEYS, key);
          });
        });
        let oldItemSource = _.map(this.oldItemSource, item => {
          return _.omit(item, (value, key) => {
            return _.has(ADDITIONALKEYS, key);
          });
        });
        // 是否存在更改项
        let itemSourceLength = itemSource.length;
        itemSourceLength > 0 &&
          this.$emit("has-edit-rows", !_.isEqual(newItemSource, oldItemSource));
      },
      deep: true
    }
  },

  methods: {
    columnClassNameHandler(column) {
      let className = "";

      if (this.gridtype === "action" && column.isReadOnly && !column.isSystem) {
        className += " znl-is-read-only";
      } else if (column.IsRequired) {
        className += " znl-is-required";
      }
      return className;
    },

    labelClassNameHandler(column, index) {
      let className = `znl-label-column-${column.binding}`;

      if (this.visibleArray.length > 0) {
        if (!this.visibleArray[index]) {
          className += " visible-column";
        }
      }

      return className;
    },

    changeColumn(column) {
      this.showTableChangeColumn = true;
      this.tableChangeColumn = column;
    },

    tableRowClassNameCom(RowObj) {
      let computedClass = "";
      let DisplayEditClass = "";
      if (
        this.computeRowKey(RowObj.row) === this.computeRowKey(this.currentRow)
      ) {
        computedClass = "current-row";
      }
      if (RowObj.row.DisplayEdit) {
        DisplayEditClass = "DisplayEdit";
      }
      let rowClass = "";
      if (this.tableRowClassName) {
        rowClass = this.tableRowClassName(RowObj);
      }
      // return rowClass + ' ' + computedClass
      return `${rowClass} ${DisplayEditClass} ${computedClass}`;
    },

    headerContextmenu(column, event) {
      let contextColumn = _.find(this.checkColumns, col => {
        return col.binding === column.property;
      });
      let isShowVisible = this.visibleArray[
        _.indexOf(this.checkColumns, contextColumn)
      ];
      this.$refs.headerContextMenu.headerContextmenu(column, event);
      this.isShowVisible = isShowVisible;
    },

    renderShortcutColumn(h) {
      let _this = this;
      return h(
        "span",
        {
          attrs: {
            title: _this.showVisibleColumn ? "收缩列" : "更多列"
          },
          on: {
            click(event) {
              _this.znlShortcutColumnHandler(event);
            }
          }
        },
        [
          h("i", {
            attrs: {
              class: `iconfont ${
                _this.showVisibleColumn
                  ? "icon-arrow_left_btn"
                  : "icon-arrow_retract_btn"
              }`
            }
          })
        ]
      );
    },

    headerCellClassNameCom(CellObj) {
      let headerCellClassName = "znl-table-header_element-cell ";
      let cellClass = "";
      if (this.headerCellClassName) {
        cellClass = this.headerCellClassName(CellObj) || "";
      }
      return cellClass + " " + headerCellClassName;
    },

    cellClassNameCom(CellObj) {
      let computedClass = "znl-table_element-cell ";
      let isRowKeyEqual =
        this.computeRowKey(CellObj.row) === this.computeRowKey(this.currentRow);
      let isBindEqual = this.currentColumn
        ? CellObj.column.property === this.currentColumn.binding
        : false;
      if (
        isRowKeyEqual &&
        isBindEqual &&
        (this.idInputShow || this.idDatepickerShow || this.idSelectShow)
      ) {
        computedClass += "znl-editing";
      } else if (isRowKeyEqual && isBindEqual) {
        computedClass += "znl-current-cell";
      }
      let cellClass = "";
      if (this.cellClassName) {
        cellClass = this.cellClassName(CellObj) || "";
      }
      return cellClass + " " + computedClass;
    },

    sortChange() {
      this.oldItemSource = JSON.parse(
        JSON.stringify(this.$refs.baseElementGrid.tableData)
      );
    },

    doLayout() {
      return (
        this.$refs.baseElementGrid && this.$refs.baseElementGrid.doLayout()
      );
    },

    computeRowKey(row) {
      if (_.isNull(row) || _.isUndefined(row)) return false;
      // 不同项目ID-key不一致,采取序列化包含ID键值作为rowkey
      let rowkey = JSON.stringify(
        _.pick(row, (val, key) => {
          return /ID/i.test(key);
        })
      );
      if (!_.isUndefined(row["_PKRowindex"])) {
        return row["_PKRowindex"];
      } else if (rowkey === "{}") {
        return _.indexOf(this.itemSourceCom, row);
      } else {
        return rowkey;
      }
    },

    changeRow(row, name, data) {
      row[name] = data;
    },

    gridItemSourceData() {
      this.itemSourceCom = _.isArray(this.itemSource)
        ? this.itemSource
        : this.itemSource.items;
      if (this.clearOldItemSource && this.itemSourceCom.length > 0) {
        this.oldItemSource = JSON.parse(JSON.stringify(this.itemSourceCom));
      } else {
        this.clearOldItemSource = true;
      }
      return this.itemSourceCom;
    },

    setColumns(val) {
      this.tableShow = false;
      if (val.length) {
        this.checkColumns = val;
        this.$nextTick(() => {
          this.tableShow = true;
        });
        this.visibleArray = [];
        _.each(val, column => {
          this.visibleArray.push(column.visible);
        });
      }
    },

    cancelAllChecked() {
      // 取消选中
      this.clearSelection();
    },

    rowContextmenu(row, e) {
      // 右击事件
      this.$refs.contextMenu.rowContextmenu(row, e);
    },

    renderHeader(h, obj) {
      // 列标题 Label 区域渲染使用的 Function
      let columns = _.filter(this.checkColumns, col => {
        return !col.isSystem && col.visible;
      });

      let column = _.find(this.checkColumns, item => {
        return item.binding === obj.column.property;
      });

      let _this = this;

      let events = this.showShortcutColumn
        ? {
            mousemove(event) {
              let mouseLeft = event.clientX;
              let targetLeft =
                event.target.getBoundingClientRect().left +
                event.target.getBoundingClientRect().width;
              if (targetLeft - mouseLeft < 20) {
                _this.tableHeaderDrag = false;
              } else {
                _this.tableHeaderDrag = true;
              }
            },
            // 拖
            dragstart(event) {
              // console.log(event.target.getBoundingClientRect().width + event.target.getBoundingClientRect().left - event.clientX )
              // if(event.target.getBoundingClientRect().width + event.target.getBoundingClientRect().left - event.clientX < 100) {
              //   return
              // }
              let Binding = (event.target || event.srcElement).dataset.binding;
              let Sort = (event.target || event.srcElement).dataset.sort;
              let textData = JSON.stringify({
                Binding: Binding,
                Sort: Sort
              });
              BUS.srcSortData = {
                Binding: Binding,
                Sort: Sort
              };
              // console.log('dragstart 当用户开始拖动一个元素或选中的文本时触发', textData)
              event.dataTransfer.setData("text", textData);
            },
            // drag () {
            //   // console.log('drag 当拖动元素或选中的文本时触发')
            // },
            dragend(event) {
              // console.log('dragend 当拖拽操作结束时触发 (比如松开鼠标按键或敲“Esc”键)', event)
              event.dataTransfer.clearData();
            },
            // 放
            dragenter(event) {
              // console.log('dragenter 当拖动元素或选中的文本到一个可释放目标时触发');
              let target = event.target || event.srcElement;
              target.classList.add("znl-header_dragin");
              event.preventDefault();
            },
            dragover(event) {
              // console.log('dragover 当元素或选中的文本被拖到一个可释放目标上时触发（每100毫秒触发一次）。')
              event.preventDefault();
            },
            dragleave() {
              // console.log('dragleave 当拖动元素或选中的文本离开一个可释放目标时触发');
              let target = event.target || event.srcElement;
              target.classList.remove("znl-header_dragin");
              event.preventDefault();
            },

            // dragexit () {
            //   // console.log('dragexit 当元素变得不再是拖动操作的选中目标时触发')
            // },
            drop(event) {
              // console.log('drop 当元素或选中的文本在可释放目标上被释放时触发', event, event.dataTransfer.getData("text"), event.currentTarget)
              let target = event.target || event.srcElement;
              target.classList.remove("znl-header_dragin");

              let Binding = target.dataset.binding;
              let Sort = target.dataset.sort;
              let targtSortData = {
                Binding: Binding,
                Sort: Sort
              };

              let srcSortData;

              try {
                srcSortData = JSON.parse(event.dataTransfer.getData("text"));
              } catch (error) {
                console.log("drag positional fault");
              }

              // 如果拖动传值取不到，则取自定义值
              if (!srcSortData.Binding && BUS.srcSortData) {
                srcSortData = BUS.srcSortData;
              }

              if (!srcSortData || targtSortData.Binding === srcSortData.Binding)
                return;

              let targtColumn = _.find(columns, column => {
                return column.binding === targtSortData.Binding;
              });

              let srcColumn = _.find(columns, column => {
                return column.binding === srcSortData.Binding;
              });
              if (!srcColumn || !targtColumn) return;

              columns.splice(_.indexOf(columns, srcColumn), 1);
              columns.splice(_.indexOf(columns, targtColumn), 0, srcColumn);

              _.each(columns, (column, index) => {
                column.sort = index;
              });

              _this.$emit("swop-columns", columns, _this.pageSize, true);
              event.preventDefault();
            }
          }
        : {};

      return h(
        "div",
        {
          class: "znl-cell-header"
        },
        [
          this.isFieldsSearch
            ? h(
                "div",
                {
                  class: "search-input",
                  on: {
                    click: this.searchInputClick
                  }
                },
                [
                  h(
                    column.dataType === 4
                      ? "el-date-picker"
                      : column.showDropDown
                      ? "el-select"
                      : "el-input",
                    {
                      class: {
                        "input-readonly": !column.isFieldSearch,
                        hasValue:
                          !_.isUndefined(_this.fieldsFilter[column.binding]) &&
                          _this.fieldsFilter[column.binding] !== ""
                      },
                      props: {
                        value:
                          column.dataType === 4 &&
                          _this.fieldsFilter[column.binding]
                            ? _this.fieldsFilter[column.binding].split(",")
                            : typeof _this.fieldsFilter[column.binding] ===
                              "undefined"
                            ? ""
                            : _this.fieldsFilter[column.binding],
                        clearable: true,
                        "value-format":
                          column.dataType === 4 ? "yyyy-MM-dd" : "",
                        readonly: !column.isFieldSearch,
                        type: column.dataType === 4 ? "daterange" : "",
                        "popper-class": column.showDropDown
                          ? "header-selected"
                          : column.dataType === 4
                          ? "header-datepicker"
                          : "",
                        placeholder: "",
                        disabled: column.showDropDown
                          ? !column.isFieldSearch
                          : false, // 选择框未提供readonly属性，使用disable属性
                        filterable: column.showDropDown,
                        "allow-create": column.showDropDown,
                        "default-first-option": column.showDropDown
                      },
                      nativeOn: {
                        keydown(e) {
                          if (!column.showDropDown) {
                            _this.search(e);
                          }
                        },
                        contextmenu(e) {
                          e.stopPropagation();
                          // e.returnvalue = false
                          e.preventDefault();
                          return false;
                        }
                      },
                      on: {
                        input(val) {
                          if (column.dataType === 4) {
                            if (_.isNull(val)) {
                              return _this.$set(
                                _this.fieldsFilter,
                                column.binding,
                                ""
                              );
                            }
                            let transfromDate = JSON.parse(
                              JSON.stringify(val)
                            ).join(",");
                            _this.$set(
                              _this.fieldsFilter,
                              column.binding,
                              transfromDate
                            );
                          } else {
                            _this.$set(_this.fieldsFilter, column.binding, val);
                          }
                        },
                        change(val) {
                          if (
                            (column.dataType === 4 || column.showDropDown) &&
                            val !== ""
                          ) {
                            _this.search({ keyCode: 13 });
                          }
                        },
                        focus() {
                          _this.clearSelection();
                          _this.tableContainerFocus = false;
                        },
                        clear(val) {
                          _this.search({ keyCode: 13 });
                        }
                      }
                    },
                    [
                      column.showDropDown
                        ? column.dataMap.map(item => {
                            if (
                              _.isUndefined(item.value) &&
                              _.isUndefined(item.key)
                            ) {
                              return null;
                            } else {
                              return h("el-option", {
                                props: {
                                  label: item.value,
                                  value: item.key
                                }
                              });
                            }
                          })
                        : ""
                    ]
                  )
                ]
              )
            : "",
          h(
            "div",
            {
              class: "header-label",

              attrs: {
                draggable: !!_this.showShortcutColumn && _this.tableHeaderDrag,
                droppable: !!_this.showShortcutColumn && _this.tableHeaderDrag,
                "data-sort": column ? column.sort : "",
                "data-binding": column ? column.binding : ""
              },

              on: events
            },
            [
              column && column.renderHeader
                ? h("cell-render", {
                    props: {
                      render: h => {
                        return column.renderHeader(h, column);
                      }
                    }
                  })
                : obj.column.label
            ]
          )
        ]
      );
    },

    searchInputClick(e) {
      // 阻止搜索框触发表头排序
      e.stopPropagation();
    },

    select(selection, row) {
      this.checkedRows = selection;
      this.isAllSelection = this.checkedRows.length === this.itemSource.length;
      this.$emit("select-check-rows", row, !!selection.length);
      this.$emit("checked-rows-count", this.checkedRows.length);
      this.$emit("select-change", this.checkedRows, row);
    },

    selectAll(selection) {
      this.checkedRows = selection;
      this.checkedRowsCount = this.checkedRows.length;
      this.$emit("checked-rows-count", this.checkedRows.length);
      this.$emit("select-change", selection);
    },

    getCurrentSelection() {
      return this.currentSelection;
    },

    znlShortcutColumnHandler() {
      this.showVisibleColumn = !this.showVisibleColumn;
      if (this.shortcutColumnHandler) {
        this.shortcutColumnHandler();
      } else {
        if (this.showVisibleColumn) {
          this.visibleArray = [];
          this.visibleColumnsArray = [];
          _.each(this.checkColumns, column => {
            this.visibleArray.push(column.visible);
            if (
              !column.isSystem &&
              (_.isUndefined(column.hasRole) || column.hasRole)
            ) {
              this.$set(column, "visible", true);
              this.visibleColumnsArray.push(JSON.parse(JSON.stringify(column)));
            }
          });
        } else {
          _.each(this.checkColumns, (column, index) => {
            if (!column.isSystem) {
              this.$set(column, "visible", this.visibleArray[index]);
            }
          });
        }
      }
      this.$emit(
        "shortcut-column-switch",
        this.showVisibleColumn,
        this.checkColumns
      );
      this.$nextTick(() => {
        this.doLayout();
      });
    },

    selectionChange(selection) {
      // 选项发生变化时,当前选择项
      this.currentSelection = selection;
    },

    clearSelection() {
      // 清空选择
      this.checkedRows = [];
      this.checkedRowsCount = 0;
      this.currentRow = null;
      this.$emit("checked-rows-count", this.checkedRows.length);
      // 取消保存按钮编辑样式
      this.$emit("has-edit-rows", false);
      if (this.$refs.baseElementGrid) {
        return this.$refs.baseElementGrid.clearSelection();
      } else {
        return () => {};
      }
    },

    getCheckedRows() {
      return this.checkedRows;
    },

    getCheckedKeys() {
      return this.checkedRows.length !== 0
        ? this.checkedRows
        : [this.currentRow];
    },

    search(event) {
      // 搜索
      if (event.keyCode === 13) {
        this.onSearch(this.fieldsFilter);
        this.clearSelection();
      }
      if (event.ctrlKey && event.keyCode === 67) {
        let gridSearch =
          this.$parent.$parent.$parent.$parent.$children[0].$children[0]
            .$children[0].$children[3] || this;
        copy(gridSearch.cellContent);
      }
    },
    // 颜色配置处理
    textStyleFuc(scope, column) {
      let style = {};
      let operators = column.extraConfig && column.extraConfig.cellColors;
      let dataMap = column.dataMap;
      if (operators && operators.length > 0) {
        _.each(operators, item => {
          if (EXPRESSION_CALC(item.expression, scope.row, dataMap)) {
            style.color = item.color;
          }
        });
      }
      let isRowKeyEqual =
        this.computeRowKey(scope.row) === this.computeRowKey(this.currentRow);
      let isBindEqual = this.currentColumn
        ? column.binding === this.currentColumn.binding
        : false;
      style.height = this.cellLineHeight + "px";
      if (isRowKeyEqual && isBindEqual) {
        style.lineHeight = this.cellLineHeight - 4 + "px";
      } else {
        style.lineHeight = this.cellLineHeight + "px";
      }
      return style;
    },

    onDragstart(event, scope) {
      BUS.isDragEnd = false;
      if (!scope.row) return;
      BUS.listActiveRow = scope.row;
    },

    onDragend(event, scope) {
      BUS.isDragEnd = true;
      _.delay(() => {
        BUS.listActiveRow = null;
        BUS.dragInJSONData = "";
      }, 500);
    },

    // scrollTo (size) {
    //   console.log(this.$refs.baseElementGrid.$el.querySelector('.el-table__body'), size)
    //   this.$refs.baseElementGrid && (this.$refs.baseElementGrid.$el.querySelector('.el-table__body').scrollTop = size)
    // },

    getColumn(name) {
      let list = _.filter(this.checkColumns, col => {
        return col.visible === true;
      });
      for (let i = 0; i < list.length; i++) {
        if (name === list[i].name) {
          return {
            col: list[i],
            index: i,
            tableColumnIndex: this.isMultiRowsCheck ? i + 1 : i
          };
        }
      }
    },

    getRowIndex(row) {
      let itemKeysArr = _.map(this.itemSourceCom, item => {
        return this.computeRowKey(item);
      });
      return _.indexOf(itemKeysArr, this.computeRowKey(row));
    },

    keyEvent(event) {
      let { cell, nextColunm, nextCell, noVisibleCols, nextRow } = {};
      let trs = this.$el.querySelectorAll(".el-table__row");
      noVisibleCols = _.filter(this.checkColumns, column => {
        return !!column.visible;
      });
      cell = event.srcElement.parentElement.parentElement;
      if (event.keyCode === 13 || event.keyCode === 9 || event.keyCode === 39) {
        // 回车 tab
        nextColunm = noVisibleCols[++this.columnIndex];
        nextRow = this.currentRow;
        nextCell = cell.parentElement.nextSibling;
        // 处理只读
        while (nextColunm && nextColunm.isReadOnly) {
          nextColunm = noVisibleCols[++this.columnIndex];
          nextCell = nextCell.nextSibling;
        }
      } else if (event.keyCode === 37) {
        nextColunm = noVisibleCols[--this.columnIndex];
        nextRow = this.currentRow;
        nextCell = cell.parentElement.previousSibling;
        // 处理只读
        while (nextColunm && nextColunm.isReadOnly) {
          nextColunm = noVisibleCols[--this.columnIndex];
          nextCell = nextCell.previousSibling;
        }
      } else if (event.keyCode === 38) {
        nextColunm = noVisibleCols[this.columnIndex];
        let colIndex = this.isMultiRowsCheck
          ? this.columnIndex + 1
          : this.columnIndex;
        if (this.rowIndex <= 0) {
          nextCell = trs[this.rowIndex].querySelectorAll("td")[colIndex];
          nextRow = this.itemSourceCom[this.rowIndex];
        } else {
          nextCell = trs[--this.rowIndex].querySelectorAll("td")[colIndex];
          nextRow = this.itemSourceCom[this.rowIndex];
        }
      } else if (event.keyCode === 40) {
        nextColunm = noVisibleCols[this.columnIndex];
        let colIndex = this.isMultiRowsCheck
          ? this.columnIndex + 1
          : this.columnIndex;
        if (this.rowIndex >= this.itemSourceCom.length - 1) {
          nextCell = trs[this.rowIndex].querySelectorAll("td")[colIndex];
          nextRow = this.itemSourceCom[this.rowIndex];
        } else {
          nextCell = trs[++this.rowIndex].querySelectorAll("td")[colIndex];
          nextRow = this.itemSourceCom[this.rowIndex];
        }
      }
      let znlEditinput = this.$refs.idEditInput;
      this.$el.querySelector(".EditInputContainer").appendChild(znlEditinput);
      this.$nextTick(() => {
        if (nextColunm) {
          this.currentColumn = nextColunm;
          this.currentRow = nextRow;
          this.cellDblclick(this.currentRow, nextColunm, nextCell, event);
        }
      });
    },

    editInputKeydown(event, editInputValue) {
      if (
        this.editType === "dblclick" &&
        event.keyCode !== 13 &&
        this.currentRow[this.currentColumn["binding"]] !== "" &&
        !_.isNull(this.currentRow[this.currentColumn["binding"]])
      )
        return;
      let keyCodes = [9, 13, 37, 38, 39, 40];
      if (_.indexOf(keyCodes, event.keyCode) > -1) {
        this.idInputShow = false; // 隐藏编辑框
        this.tableContainerKeydown(event);
      }
    },

    editInputBlurVisibleChange(selectVis) {
      if (selectVis === true) return;
      this.idSelectShow = false;
      this.$nextTick(() => {
        this.editInputBlur("select");
      });
    },

    editInputBlur(type) {
      this.idInputShow = false;
      this.idSelectShow = false;
      this.idDatepickerShow = false;
      this.clearOldItemSource = true;
      let gridobj = {
        row: this.oldRow,
        rows: this.itemSourceCom,
        column: this.oldColumn,
        // inpValue: row[column.property],
        getColumn: this.getColumn,
        setCellData: (rowIndex, columnIndex, value) => {
          let columns = _.filter(this.checkColumns, col => {
            return !!col.visible;
          });
          this.itemSourceCom[rowIndex][columns[columnIndex].binding] = value;
        }
      };
      this.$nextTick(() => {
        if (
          !this.currentRow.isReadOnly &&
          !this.currentColumn.isReadOnly &&
          this.currentColumn.showDropDown &&
          type === "select"
        ) {
          let inpValue = this.currentColumn["multiple"]
            ? JSON.stringify(this.editSelectData)
            : this.editSelectData;
          gridobj.inpValue = inpValue;
          let znlEditinput = this.$el.querySelector(
            ".znl-editinput.idEditSelect"
          );
          this.$el
            .querySelector(".EditInputContainer")
            .appendChild(znlEditinput);
          this.$set(this.currentRow, this.currentColumn["binding"], inpValue);
          this.$emit(
            "edit:cell-ended",
            inpValue,
            this.oldValue,
            this.currentColumn["binding"],
            gridobj,
            this.getRowIndex(this.currentRow),
            this.getColumn(this.currentColumn["binding"])
          );
          this.oldValue = "";
          this.multiple = false;
        } else if (
          !this.currentRow.isReadOnly &&
          !this.currentColumn.isReadOnly &&
          this.currentColumn.dataType &&
          this.currentColumn.dataType === 4 &&
          type === "datapicker"
        ) {
          gridobj.inpValue = this.editDatepickerData;
          let znlEditinput = this.$el.querySelector(
            ".znl-editinput.idEditDatepick"
          );
          this.$el
            .querySelector(".EditInputContainer")
            .appendChild(znlEditinput);
          this.currentRow[
            this.currentColumn["binding"]
          ] = this.editDatepickerData;

          this.$emit(
            "edit:cell-ended",
            this.editDatepickerData,
            this.oldValue,
            this.currentColumn["binding"],
            gridobj,
            this.getRowIndex(this.currentRow),
            this.getColumn(this.currentColumn["binding"])
          );
          this.oldValue = "";
        } else if (!this.oldRow.isReadOnly && !this.oldColumn.isReadOnly) {
          gridobj.inpValue = this.oldRow[this.oldColumn["binding"]];
          let znlEditinput = this.$refs.idEditInput;
          this.$el
            .querySelector(".EditInputContainer")
            .appendChild(znlEditinput);

          if (this.$el.querySelectorAll(".cellDataChange").length > 0) {
            this.$emit("has-edit-rows", true);
          }

          let editEndRow = JSON.parse(JSON.stringify(this.oldRow));
          let editEndColumn = JSON.parse(JSON.stringify(this.oldColumn));
          let afterValue = editEndRow[editEndColumn["binding"]];

          this.$emit(
            "edit:cell-ended",
            afterValue,
            this.oldValue,
            editEndColumn["binding"],
            gridobj,
            this.getRowIndex(editEndRow),
            this.getColumn(editEndColumn["binding"])
          );
          this.oldValue = "";
        }
      });
    },

    cellDblclick(row, column, cell, event, editkey) {
      // 双击单元格
      this.editType = event.type;
      _.find(this.oldItemSource, item => {
        if (this.computeRowKey(item) === this.computeRowKey(row)) {
          this.oldValue = item[this.currentColumn["binding"]];
          return;
        }
      });
      // 当前列
      this.$emit("ondblclick", row, this.currentColumn, cell, event);
      if (
        this.gridtype === "base" ||
        column.type === "selection" ||
        (this.currentColumn.isReadOnly && !row.DisplayEdit)
      ) {
        return;
      }
      this.clearOldItemSource = false;
      this.currentRow = row;
      this.oldRow = row;
      this.oldColumn = this.currentColumn;
      const disableCellEdit = row.ReadOnlyBindings
        ? !!(row.ReadOnlyBindings.indexOf(this.currentColumn["binding"]) > -1)
        : false;
      if (
        !row.isReadOnly &&
        (!this.currentColumn.isReadOnly || row.DisplayEdit) &&
        this.currentColumn.showDropDown &&
        !disableCellEdit
      ) {
        this.editSelectData = this.currentColumn.multiple ? [] : "";
        this.columnDataMap = this.currentColumn.multiple
          ? this.currentRow[this.currentColumn.mapping]
          : this.currentColumn.dataMap;
        this.idSelectShow = true;
        if (this.currentColumn.multiple) {
          this.multiple = this.currentColumn.multiple;
        } else {
          this.multiple = false;
        }
        this.$nextTick(() => {
          this.editSelectData = this.currentColumn.multiple
            ? JSON.parse(row[this.currentColumn.binding])
            : row[this.currentColumn.binding];
          if (
            _.isNull(this.editSelectData) ||
            _.isUndefined(this.editSelectData)
          ) {
            this.editSelectData = this.currentColumn.multiple ? [] : "";
          }
          // 多选
          if (this.multiple) {
            _.each(this.columnDataMap, (data, i) => {
              if (this.editSelectData.indexOf(data.key) > -1) {
                this.$set(this.checkedArray, i, true);
              } else {
                this.$set(this.checkedArray, i, false);
              }
            });
          }
          let znlEditinput = this.$el.querySelector(
            ".znl-editinput.idEditSelect"
          );
          let editCell = cell.querySelector(".znl-tablecell");
          editCell && editCell.appendChild(znlEditinput);
          this.$refs.editSelect.visible = true;
        });
      } else if (
        !row.isReadOnly &&
        (!this.currentColumn.isReadOnly || row.DisplayEdit) &&
        this.currentColumn.dataType &&
        this.currentColumn.dataType === 4 &&
        !disableCellEdit
      ) {
        this.idDatepickerShow = true;
        this.$nextTick(() => {
          this.editDatepickerData = row[this.currentColumn.binding];
          let znlEditinput = this.$el.querySelector(
            ".znl-editinput.idEditDatepick"
          );
          let editCell = cell.querySelector(".znl-tablecell");
          editCell && editCell.appendChild(znlEditinput);
          this.$refs.editDatepick.handleFocus();
        });
      } else if (
        !row.isReadOnly &&
        (!this.currentColumn.isReadOnly || row.DisplayEdit) &&
        !disableCellEdit
      ) {
        this.idInputShow = true;
        this.$nextTick(() => {
          if (!_.isUndefined(editkey)) {
            this.$set(this.currentRow, this.currentColumn["binding"], editkey);
          } else {
            this.currentRow[this.currentColumn["binding"]] =
              row[this.currentColumn.binding];
          }
          let { znlEditinput, editCell } = {};
          znlEditinput = this.$refs.idEditInput;
          editCell = cell.querySelector(".znl-tablecell");
          editCell && editCell.appendChild(znlEditinput);
          znlEditinput.focus();
        });
      }
    },

    rowClick(r, e, c) {
      // 单击行
      if (this.computeRowKey(r) !== this.computeRowKey(this.currentRow)) {
        this.$emit("current-row-change", r);
      }
      this.currentRow = r;
      _.each(this.itemSourceCom, (item, index) => {
        if (this.computeRowKey(r) === this.computeRowKey(item)) {
          this.rowIndex = index;
        }

        return r;
      });
      this.$emit("event-start", r);
      // 点击非编辑单元格时隐藏编辑单元格
      this.$emit("selection-changed", r);
      this.$emit("select-check-rows", r, !!r);
    },

    cellClick(row, column, cell, event) {
      // 单击单元格
      this.$emit("cell-click", row, column, cell, event);
      if (column.type === "selection") return;
      if (event.target.tagName !== "INPUT") {
        this.tableContainerFocus = true;
      }
      let currentColumn = _.find(this.checkColumns, item => {
        return item.binding === column.columnKey;
      });
      this.currentColumn = currentColumn;
      this.cellContent = cell.innerText;
      this.columnIndex =
        this.getColumn(column.property) &&
        this.getColumn(column.property).index;
    },

    toggleRowSelection(item, type) {
      return this.$refs.baseElementGrid.toggleRowSelection(item, type);
    },

    setToggleRowSelection() {
      // 返回值中_checked为true的为选中状态
      this.checkedRows = [];
      _.each(this.itemSourceCom, (item, index) => {
        if (item["_Checked"]) {
          this.toggleRowSelection(item, true);
          this.checkedRows.push(item);
        }
      });
      this.$emit("checked-rows-count", this.checkedRows.length);
    },

    tableContainerKeydown(event) {
      let noVisibleCols = _.filter(this.checkColumns, col => {
        return col.visible === true;
      });
      this.columnIndex =
        this.getColumn(this.currentColumn.binding) &&
        this.getColumn(this.currentColumn.binding).index;
      if ((event.ctrlKey || event.metaKey) && event.keyCode === 67) {
        // 复制
        let currentCell = this.$el.querySelector(".znl-current-cell");
        currentCell && copy(currentCell.innerText || "");
      } else if (
        ((event.keyCode > 64 && event.keyCode < 91) || // 字母
        (event.keyCode > 47 && event.keyCode < 58) || // 大键盘数字
        (event.keyCode > 95 && event.keyCode < 106) || // 小键盘数字
          event.keyCode === 8) && // 退格
        !_.isUndefined(this.columnIndex) &&
        noVisibleCols[this.columnIndex] &&
        !noVisibleCols[this.columnIndex].dataMap &&
        noVisibleCols[this.columnIndex].dataType !== 4 &&
        (!noVisibleCols[this.columnIndex].isReadOnly ||
          this.currentRow.DisplayEdit)
      ) {
        if (this.$el.querySelector(".znl-editing")) return;
        // 按键直接输入
        // 存在列序号、非下拉选择、非日期框、非只读、非选择列
        let cell = this.$el.querySelector(".znl-current-cell");
        let eventKey = event.key;
        if (_.isUndefined(eventKey)) {
          eventKey = KEYCODE.keyCode[event.keyCode];
        }
        if (eventKey === "Backspace") {
          eventKey = "";
        }
        // this.oldColumn = this.currentColumn;
        // this.oldRow = this.currentRow;
        if (!_.isNull(this.currentRow)) {
          this.cellDblclick(
            this.currentRow,
            this.currentColumn,
            cell,
            event,
            eventKey
          );
        }
        event.preventDefault();
      } else if (event.keyCode === 37) {
        this.tabindexCom();
        if (this.columnIndex > 0) {
          this.columnIndex--;
        }
        this.currentColumn = noVisibleCols[this.columnIndex];
        this.$nextTick(() => {
          let znlTablecell = this.$el.querySelector(
            ".znl-current-cell .znl-tablecell"
          );
          znlTablecell && znlTablecell.focus();
          this.tableContainerFocus = true;
        });
        event.preventDefault();
      } else if (
        event.keyCode === 39 ||
        (event.keyCode === 13 && !this.enterCellmovesDirection)
      ) {
        this.tabindexCom();
        if (this.columnIndex < noVisibleCols.length - 1) {
          this.columnIndex++;
        }
        this.currentColumn = noVisibleCols[this.columnIndex];
        this.$nextTick(() => {
          let znlTablecell = this.$el.querySelector(
            ".znl-current-cell .znl-tablecell"
          );
          znlTablecell && znlTablecell.focus();
          this.tableContainerFocus = true;
        });
        event.preventDefault();
      } else if (event.keyCode === 38) {
        this.tabindexCom();
        if (this.rowIndex > 0) {
          this.rowIndex--;
        }
        this.currentRow = this.itemSourceCom[this.rowIndex];
        this.$nextTick(() => {
          let znlTablecell = this.$el.querySelector(
            ".znl-current-cell .znl-tablecell"
          );
          znlTablecell && znlTablecell.focus();
          this.tableContainerFocus = true;
        });
        event.preventDefault();
      } else if (
        event.keyCode === 40 ||
        (event.keyCode === 13 && this.enterCellmovesDirection)
      ) {
        this.tabindexCom();
        if (this.rowIndex < this.itemSourceCom.length - 1) {
          this.rowIndex++;
        }
        this.currentRow = this.itemSourceCom[this.rowIndex];
        this.$nextTick(() => {
          let znlTablecell = this.$el.querySelector(
            ".znl-current-cell .znl-tablecell"
          );
          znlTablecell && znlTablecell.focus();
          this.tableContainerFocus = true;
        });
        event.preventDefault();
      }
    },

    tabindexCom() {
      this.tabindex = 1;
      _.delay(() => {
        this.tabindex = null;
      }, 200);
    },

    checkRow(index) {
      if (this.itemSourceCom.length > 0) {
        if (_.isUndefined(index)) {
          this.currentRow = this.itemSourceCom[0];
        } else {
          this.currentRow = this.itemSourceCom[index];
        }
      }
    },

    toggleAllSelection(chckedValue, store) {
      this.isAllSelection = chckedValue;
      const data = store.store.states.data || [];
      if (data.length === 0) return;
      data.forEach((item, index) => {
        if (chckedValue) {
          this.$refs.baseElementGrid.toggleRowSelection(item, true);
        } else {
          this.$refs.baseElementGrid.toggleRowSelection(item, false);
        }
      });
    },

    changeCurrentCell(currentRow, currentColumn) {
      if (currentColumn) {
        this.currentColumn = currentColumn;
      }
      if (currentRow) {
        this.currentRow = currentRow;
      }
      this.$nextTick(() => {
        // this.$refs.tabcontainer.focus()
        this.tableContainerFocus = true;
      });
    }
  },

  mounted() {
    this.setColumns(this.columns);
    this.$nextTick(() => {
      this.setToggleRowSelection();
      // _.delay(() => {
      //   this.scrollTo(200)
      // }, 1000)
    });

    this.fieldsFilter = _.extend(
      this.fieldsFilter,
      JSON.parse(JSON.stringify(this.searchFields))
    );
  },

  beforeDestroy() {}
};
</script>
