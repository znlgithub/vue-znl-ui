<template>
  <div class="action-flex-grid">
    <base-flex-grid
      ref="baseFlexGrid"
      :columns="columns"
      :height="height"
      gridtype="action"
      :min-height="minHeight"
      :max-height="maxHeight"
      :item-source="itemSourceCom"
      :is-multi-rows-check="isMultiRowsCheck"
      :is-fields-search="isFieldsSearch"
      :search-fields="searchFields"
      :page-size="pageSize"
      :page-index="pageIndex"
      :total-count="totalCount"
      :right-menus="gridRightMenus"
      :on-search="onSearch"
      :on-refresh="onRefresh"
      :on-page-changed="onPageChanged"
      :show-summary="showSummary"
      :sum-text="sumText"
      :stripe="stripe"
      :border="border"
      :summary-method="summaryMethod"
      :is-multi-rows-check-fixed="isMultiRowsCheckFixed"
      :table-row-class-name="tableRowClassName"
      :header-row-class-name="headerRowClassName"
      :cell-class-name="cellClassName"
      :header-cell-class-name="headerCellClassName"
      :btn-mouse-enter-menus="btnMouseEnterMenus"
      :pagination-position="paginationPosition"
      :cellDraggable="cellDraggable"
      :table-tip="tableTip"
      :footer-height="footerHeight"
      :cell-line-height="cellLineHeight"
      :shortcut-column-handler="shortcutColumnHandler"
      :show-shortcut-column="showShortcutColumn"
      :on-save-config="onSaveConfig"
      :enter-cellmoves-direction="enterCellmovesDirection"
      :empty-text="emptyText"
      @openseting="$emit('openseting')"
      @swop-columns="(cols,size,flag)=>$emit('swop-columns',cols,size,flag)"
      @switch-hide-column="(column,columns)=>{$emit('switch-hide-column', column,columns)}"
      @shortcut-column-switch="(val,cols)=>$emit('shortcut-column-switch', val, cols)"
      @multiple-change="(val,row)=>{$emit('multiple-change',val,row)}"
      @edit:cell-ended="(value,oldValue,colName,grid,rowIndex,colIndexObj)=>{$emit('edit:cell-ended',value,oldValue,colName,grid,rowIndex,colIndexObj)}"
      @ondblclick="(row, column, cell, event)=>{$emit('ondblclick', row, column, cell, event)}"
      @has-edit-rows="(val)=>{$emit('has-edit-rows', val)}"
      @select-change="(rows, row)=>{$emit('select-change', rows, row)}"
      @checked-rows-count="(val)=>{$emit('checked-rows-count', val)}"
      @select-check-rows="(val,check)=>{$emit('select-check-rows',val,check)}"
      @selection-changed="(val)=>{$emit('selection-changed',val )}"
      @mouse-menu-config="obj=>$emit('mouse-menu-config', obj)"
      @change-column="column => $emit('change-column', column)"
      @cell-click="(row, column, cell, event) => $emit('cell-click', row, column, cell, event)"
      @current-row-change="row => $emit('current-row-change', row)"
    >

      <slot
        name="znlfooterslotaction"
        slot="znlfooterslot"
      ></slot>

    </base-flex-grid>
  </div>
</template>


<script>
import BaseFlexGrid from "~packages/base-flex-grid/src/main.vue";
import { mixin as actionMixin } from "./action";

export default {
  name: "ZnlActionflexgrid",

  mixins: [actionMixin],

  components: {
    BaseFlexGrid
  },

  data() {
    return {
      editedRows: [],
      cacheItemSource: [],
      tags: [],
      currentTags: [],
      itemSourceCom: [],
      rowIndex: 0,
      row: {}
    };
  },

  props: {
    emptyText: {
      type: String,
      default: "暂无数据"
    },
    onSaveConfig: Function,
    cellLineHeight: {
      type: Number,
      default: 28
    },
    showShortcutColumn: {
      type: Boolean,
      default: true
    },
    shortcutColumnHandler: Function,
    tableTip: String,
    cellDraggable: Boolean,
    onBeforeAddRow: Function,
    ItemSource: Boolean,
    paginationPosition: String,
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    height: {
      type: [String, Number]
    },
    maxHeight: {
      type: [String, Number]
    },
    minHeight: {
      type: [String, Number]
    },
    searchFields: {
      type: Object,
      default() {
        return {};
      }
    },
    showSaveBtn: {
      type: Boolean,
      default: true
    },
    showDeleteRowRightMenu: {
      type: Boolean,
      default: true
    },
    isMultiRowsCheckFixed: {
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
    isMultiRowsCheck: {
      type: Boolean,
      default: false
    },
    summaryMethod: Function,
    tableRowClassName: Function,
    headerRowClassName: Function,
    cellClassName: Function,
    headerCellClassName: Function,
    isFieldsSearch: Boolean,
    btnMouseEnterMenus: Object,
    footerHeight: Number,
    enterCellmovesDirection: Boolean
  },

  created() {
    this.itemSourceCom = _.isArray(this.itemSource)
      ? this.itemSource
      : this.itemSource.items;
  },

  watch: {
    itemSource(val) {
      this.itemSourceCom = _.isArray(val) ? val : val.items;
      let trs = this.$el.querySelectorAll(".el-table__body tr");

      _.each(this.columns, item => {
        if (
          this.row[item.name] &&
          item.dataType === 2 &&
          !_.isFinite(this.row[item.name])
        ) {
          let colIndex =
            this.getColumn(item.name) && this.getColumn(item.name).index;
          let domCon =
            _.isFinite(colIndex) &&
            trs[this.rowIndex] &&
            trs[this.rowIndex]
              .querySelectorAll("td")
              [colIndex].querySelector(".icon-errdataType");
          domCon && domCon.classList.add("show");
        } else if (
          this.row[item.name] &&
          item.dataType === 2 &&
          _.isFinite(this.row[item.name])
        ) {
          let colIndex =
            this.getColumn(item.name) && this.getColumn(item.name).index;
          let domCon =
            _.isFinite(colIndex) &&
            trs[this.rowIndex] &&
            trs[this.rowIndex]
              .querySelectorAll("td")
              [colIndex].querySelector(".icon-errdataType");
          domCon && domCon.classList.remove("show");
        }
      });
    }
  },

  computed: {
    gridRightMenus() {
      const defaultMenus = [];
      if (this.showSaveBtn) {
        defaultMenus.push({
          iconName: "icon-save_btn_ic",
          text: "保存",
          disabled: (grid, ht) =>
            this.grid &&
            this.showSaveRowRightMenuDisabled &&
            this.rowSaveable(grid, ht),
          display: this.showSaveBtn,
          index: -13,
          click: (rowData, grid) => {
            this.saveRows();
          }
        });
        defaultMenus.push({
          iconName: "icon-backout_btn_ic",
          text: "撤销",
          disabled: (grid, ht) =>
            this.grid &&
            this.showSaveRowRightMenuDisabled &&
            this.rowSaveable(grid, ht),
          display: this.showSaveBtn,
          index: -12,
          click: (rowData, grid) => {
            this.cancelEdit();
          }
        });
      }
      if (this.showDeleteRowRightMenu) {
        defaultMenus.push({
          iconName: "icon-delete_btn_ic",
          text: "删除",
          disabled: (grid, ht) => this.grid && this.rowDeleteable(grid, ht),
          display: true,
          index: -11,
          click: rowData => {
            rowData && this.deleteRow(rowData.row);
          }
        });
      }
      _.some(defaultMenus, menu => menu.display) &&
        defaultMenus.push({
          type: "separator",
          index: -10
        });
      return _.union(defaultMenus, this.rightMenus);
    }
  },

  methods: {
    changeCurrentCell(currentRow, currentColumn) {
      return this.$refs.baseFlexGrid.changeCurrentCell(
        currentRow,
        currentColumn
      );
    },
    search() {
      return this.$refs.baseFlexGrid.search();
    },
    changeRow(row, name, data) {
      return this.$refs.baseFlexGrid.changeRow(row, name, data);
    },
    doLayout() {
      return this.$refs.baseFlexGrid.doLayout();
    },
    getColumn(name) {
      let list = [];
      let cols = this.$refs.baseFlexGrid.checkColumns;
      _.each(cols, item => {
        if (item.visible) {
          list.push(item);
        }
      });
      for (let i = 0; i < list.length; i++) {
        if (name === list[i].name) {
          return {
            col: list[i],
            index: i
          };
        }
      }
    },
    toggleRowSelection(row, type) {
      return this.$refs.baseFlexGrid.toggleRowSelection(row, type);
    },
    getCheckedRows() {
      return this.$refs.baseFlexGrid.getCheckedRows();
    },
    getCheckedKeys() {
      return this.$refs.baseFlexGrid.getCheckedKeys();
    },
    cancelAllChecked() {
      this.$refs.baseFlexGrid.cancelAllChecked();
    },
    gridItemSourceData() {
      return this.$refs.baseFlexGrid.gridItemSourceData();
    },
    clearSelection() {
      // 清空选择
      return this.$refs.baseFlexGrid.clearSelection();
    },
    getCurrentSelection() {
      return this.$refs.baseFlexGrid.getCurrentSelection();
    },
    checkRow(index) {
      return this.$refs.baseFlexGrid.checkRow(index);
    }
  },

  mounted() {}
};
</script>
