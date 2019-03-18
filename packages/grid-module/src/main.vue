<template>
  <div
    :class="[
      'znl-grid-component',
      isActivity&&!tableActivity?'isActivity':'',
      loadingType
      ]"
    v-loading="p_loading"
    :element-loading-text="loadingType==='icon'?elementLoadingText:' '"
    :style="gridComponentStyle"
  >

    <div
      class="znl-content"
      v-show="p_gridShow"
    >

      <p
        class="znl-reload"
        v-if="isReload"
      >
        加载失败
        <a
          href="#"
          @click.stop.prevent="init"
        >重新加载</a>
      </p>

      <template v-else>
        <div
          v-if="showHeaderCom"
          class="isFieldsSearch"
          :style="headerStyle"
        >

          <div
            class="znl-gridModuleHeader"
            :style="headerStyle"
          >
            <slot
              v-if="$slots.header"
              name="header"
              class="znl-header-text"
            >
            </slot>
            <span
              v-else-if="header"
              :title="!!isActivity ? (tableActivity?'收起表格':'展开表格') : ''"
              @click.stop.prevent="isActivity ? (tableActivity=!tableActivity) : ''"
              :class="[
                'znl-header-text',
                !!isActivity && 'header-title',
                !!$slots['action-form']?'bottom-line':'']"
            >{{'· '+header}}

              <i
                v-if="tooltipContent!==''"
                class="iconfont icon-table_error_ic"
                :title="tooltipContent"
              ></i>

              <a
                href="#"
                :title="tableActivity?'收起表格':'展开表格'"
                class="znl-icons tableActivity"
                v-if="!!isActivity"
              >
                <i :class="['iconfont', !tableActivity?'icon-table_unfold_n1':'icon-table_pack-up_btn_n1']"></i>
              </a>

            </span>

            <action-btns
              :action-btns-com="actionBtnsCom"
              :el-width="elWidth"
            ></action-btns>

            <div class="heading-slot">
              <slot name="heading-slot"></slot>
            </div>

          </div>
          <div
            class="rightbtns"
            v-if="isShowRightbtns"
            :style="headerStyle"
          >

            <znl-button
              title="保存所有修改的内容"
              :style-type="!gridHasEditRows ? 'info' : 'main'"
              v-if="gridtype!=='base' && showSaveBtn"
              @click="saveRows"
              class="znl-grid-save"
              :height="22"
              :disabled="!gridHasEditRows"
            >
              保存
            </znl-button>

            <el-pagination
              v-if="paginationPosition==='top'"
              :class="['znl-header-pagination']"
              :small="true"
              layout="slot,prev, next"
              :page-size="pageSize"
              :total="totalCount"
              :current-page="currentPageIndex"
              @current-change="pageChanged"
            >
              <!-- <span @mouseenter="jumperShow=true">{{pageIndex}}/{{Math.ceil(totalCount/pageSize)}}</span> -->
              <span
                class="pagination-slot"
                ref="paginationSlot"
              >
                <span class="jumper-span">
                  <input
                    type="number"
                    :min="0"
                    :max="Math.ceil(totalCount/pageSize)"
                    v-model="pageIndexComputed"
                    @keydown.enter="pageChanged(pageIndexComputed)"
                  >

                  <span class="current-index">{{pageIndex}}</span>

                </span>
                /{{Math.ceil(totalCount/pageSize)}}
              </span>
            </el-pagination>

            <span
              class="znl-line"
              v-if="paginationPosition==='top'"
            ></span>

            <div
              v-if="isMultiRowsCheck"
              class="selectedReminder"
            >
              已选中<b>{{checkedRowsCount}}</b> 行
            </div>

            <div
              v-if="gridtype!=='base'"
              class="gridSave"
            >

              <el-button
                title="取消选中"
                size="mini"
                :class="['saveandout', 'znl-btn-close', checkedRowsCount>0?'isActive':'']"
                @click="cancelAllChecked"
              >
                <span class="el-icon-close"></span>
              </el-button>

              <span
                class="znl-line"
                v-show='showSaveBtn'
              ></span>

              <span
                :class="['znl-save-revocation', gridHasEditRows?'hasEditRows':'']"
                v-show='showSaveBtn'
              >

                <el-button
                  title="撤消"
                  size="mini"
                  class="saveandout znl-revocation"
                  @click="cancelEdit"
                >
                  <i class="iconfont icon-table-backout-btn"></i>
                </el-button>

              </span>

              <span class="znl-line"></span>

            </div>

            <div
              class="pull-right-regresh"
              v-if="!isReload"
            >

              <slot name="action-icons"></slot>

              <a
                href="#"
                title="刷新"
                :class="['znl-icons', p_loading ? 'znl-refresh-loading' : '']"
                v-if="!!onRefresh"
                @click.stop.prevent="refresh"
              >
                <i class="iconfont icon-table_refresh_btn_n"></i>
              </a>
              <a
                href="#"
                title="设置"
                class="znl-icons znl-setting"
                v-if="onSaveSetting"
                @click.stop.prevent="()=>{isSettingDialogShow=true}"
              >
                <i class="iconfont icon-table_set_btn_n"></i>
              </a>
            </div>

          </div>
        </div>

        <div
          class="znl-table-body-wrapper"
          v-show="tableActivity"
        >

          <div
            class="znl-action-form"
            v-if="!!$slots['action-form']"
            :style="actionFormStyle"
          >
            <slot name="action-form"></slot>
          </div>

          <from-module
            class="znl-from-module"
            :is-show-frombtns="isShowFrombtns"
            v-if="$slots['from-module']"
            :from-btns="fromBtnsCom"
            :from-save-btns="fromSaveBtnsCom"
            ref="fromModule"
            @get-height="height=>{fromModuleHeight=height, doLayout()}"
          >

            <div slot="fromModule">
              <slot name="from-module"></slot>
            </div>

            <div
              slot="fromContent"
              class="znl-from-content"
            >
              <slot name="from-content"></slot>
            </div>

          </from-module>

          <template>

            <div
              class="znl-table_base-case"
              :style="tableBaseCaseStyle"
            >
              <div
                class="znl-table-plug"
                v-if="$slots.tablePlug"
                ref="tablePlug"
                :style="tablePlugStyle"
              >
                <slot name="tablePlug"></slot>
              </div>

              <base-flex-grid
                v-if="gridtype==='base'"
                :style="baseCaseTableStyle"
                ref="baseFlexGrid"
                :resource-list="resourceList"
                :height="gridHeight"
                :stripe="stripe"
                :border="border"
                :max-height="gridMaxHeight"
                :min-height="gridMinHeight"
                :columns="columns"
                :item-source="itemSource"
                :is-fields-search="isFieldsSearch"
                :is-multi-rows-check="isMultiRowsCheck"
                :search-fields="searchFields"
                :page-size="pageSize"
                :page-index="pageIndex"
                :total-count="totalCount"
                :right-menus="gridRightMenus"
                :on-search="onSearch&&search"
                :on-refresh="onRefresh&&refresh"
                :on-page-changed="onPageChanged&&pageChanged"
                :show-summary="showSummary"
                :sum-text="sumText"
                :summary-method="summaryMethod"
                :table-row-class-name="tableRowClassName"
                :header-row-class-name="headerRowClassName"
                :cell-class-name="cellClassName"
                :header-cell-class-name="headerCellClassName"
                :is-multi-rows-check-fixed="isMultiRowsCheckFixed"
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
                @swop-columns="(cols,size,flag)=>{saveSetting(cols,size,flag)}"
                @switch-hide-column="saveConfig"
                @shortcut-column-switch="(val,cols)=>$emit('shortcut-column-switch', val, cols)"
                @multiple-change="(val,row)=>{$emit('multiple-change',val,row)}"
                @ondblclick="(row, column, cell, event)=>{$emit('ondblclick', row, column, cell, event)}"
                @select-change="(rows, row)=>{$emit('select-change', rows, row)}"
                @checked-rows-count="(val)=>{checkedRowsCount=val}"
                @selection-changed="d=>{$emit('selection-changed',d)}"
                @mouse-menu-config="obj=>$emit('mouse-menu-config', obj)"
                @change-column="saveConfig"
                @cell-click="(row, column, cell, event) => $emit('cell-click', row, column, cell, event)"
                @openseting="isSettingDialogShow=true"
                @current-row-change="row => $emit('current-row-change', row)"
              >

                <slot
                  name="znl-footer-slot"
                  slot="znlfooterslot"
                ></slot>

              </base-flex-grid>

              <action-flex-grid
                v-else-if="gridtype==='action'"
                :style="baseCaseTableStyle"
                ref="actionFlexGrid"
                :resource-list="resourceList"
                :height="gridHeight"
                :max-height="gridMaxHeight"
                :min-height="gridMinHeight"
                :columns="columns"
                :item-source="itemSource"
                :is-fields-search="isFieldsSearch"
                :is-multi-rows-check="isMultiRowsCheck"
                :search-fields="searchFields"
                :page-size="pageSize"
                :page-index="pageIndex"
                :total-count="totalCount"
                :stripe="stripe"
                :border="border"
                :right-menus="gridRightMenus"
                :show-add-row-right-menu="showAddRowRightMenu"
                :on-before-add-row="onBeforeAddRow"
                :on-save-row="onSaveRow"
                :on-save-rows="onSaveRows"
                :on-delete-row="onDeleteRow"
                :on-delete-checked-row="onDeleteCheckedRows"
                :on-search="onSearch&&search"
                :on-refresh="onRefresh&&refresh"
                :on-page-changed="onPageChanged&&pageChanged"
                :show-save-btn="showSaveBtn"
                :show-delete-row-right-menu="showDeleteRowRightMenu"
                :show-summary="showSummary"
                :sum-text="sumText"
                :summary-method="summaryMethod"
                :table-row-class-name="tableRowClassName"
                :header-row-class-name="headerRowClassName"
                :cell-class-name="cellClassName"
                :header-cell-class-name="headerCellClassName"
                :is-multi-rows-check-fixed="isMultiRowsCheckFixed"
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
                @swop-columns="(cols,size,flag)=>{saveSetting(cols,size,flag)}"
                @switch-hide-column="saveConfig"
                @shortcut-column-switch="(val,cols)=>$emit('shortcut-column-switch', val, cols)"
                @multiple-change="(val,row)=>{$emit('multiple-change',val,row)}"
                @ondblclick="(row, col, cell, grid, noVisibleCols, index)=>{$emit('ondblclick', row, col, cell, grid, noVisibleCols, index)}"
                @has-err-for-edit="(val)=>{hasErrForEdit=val}"
                @edit-end-rows="(val)=>{this.$emit('edit-end-rows',val)}"
                @select-change="(rows, row)=>{$emit('select-change', rows, row)}"
                @has-edit-rows="hasEditRows"
                @checked-rows-count="(val)=>{checkedRowsCount=val}"
                @selection-changed="d=>{$emit('selection-changed',d)}"
                @edit:beginning="(value,colName,grid,rowIndex,colIndex)=>{$emit('edit:beginning',value,colName,grid,rowIndex,colIndex)}"
                @edit:cell-ended="(value,oldValue,colName,grid,rowIndex,colIndexObj)=>{$emit('edit:cell-ended',value,oldValue,colName,grid,rowIndex,colIndexObj)}"
                @edit:row-ended="(value,oldValue,grid,rowIndex,colIndex)=>{$emit('edit:row-ended',value,oldValue,grid,rowIndex,colIndex)}"
                @mouse-menu-config="obj=>$emit('mouse-menu-config', obj)"
                @change-column="saveConfig"
                @cell-click="(row, column, cell, event) => $emit('cell-click', row, column, cell, event)"
                @openseting="isSettingDialogShow=true"
                @current-row-change="row => $emit('current-row-change', row)"
              >

                <slot
                  name="znl-footer-slot"
                  slot="znlfooterslotaction"
                ></slot>

              </action-flex-grid>
            </div>

          </template>

          <slot
            v-if="$slots.default"
            :style="{height: 0}"
          ></slot>

        </div>

      </template>
    </div>
    <!-- 表格配置弹窗 -->
    <grid-config
      v-if="isSettingDialogShow"
      :visible="isSettingDialogShow"
      :columns="columns"
      :page-size="pageSize"
      :role="role"
      :users="users"
      :loading-flag="loadingFlag"
      @close="()=>{isSettingDialogShow=false}"
      @open="val=>{isSettingDialogShow = val}"
      @confirm="saveSetting"
      @tab-changed="configTabChanged"
      @reset="resetSetting"
    >

      <div
        slot="parameter-config"
        v-if="$slots.parameterConfig"
      >
        <slot name="parameterConfig"></slot>
      </div>

    </grid-config>
  </div>
</template>

<script>
import { mixin as propSyncMixin } from "~/mixins/propSync";
import globalMixin from "~/mixins/global";
import BaseFlexGrid from "~packages/base-flex-grid/src/main.vue";
import ActionFlexGrid from "~packages/action-flex-grid/src/main.vue";
import GridConfig from "~packages/grid-config/src/main.vue";
import { elResize, getDocumentRect, removeClass } from "~/utils/dom";
import ActionBtns from "~packages/grid-module/src/action-btns.vue";
import FromModule from "~packages/grid-module/src/from-module.vue";
// import ZnlCollapseTransition from 'packages/transition/collapse-transition'
const PK_COLUMN = "_PKIndex";
const PK_INDEX = "_PKRowindex";
export default {
  name: "ZnlGridmodule",

  mixins: [propSyncMixin, globalMixin],

  components: {
    BaseFlexGrid,
    ActionFlexGrid,
    ActionBtns,
    FromModule,
    GridConfig
    // ZnlCollapseTransition
  },

  props: {
    emptyText: {
      type: String,
      default: "暂无数据"
    },
    shortcutColumnHandler: Function,
    tableTip: String,
    cellDraggable: Boolean,
    tablePlugWidth: {
      type: Number,
      default: 230
    },
    paginationPosition: {
      type: String,
      default: "bottom",
      validator(value) {
        return _.contains(["bottom", "top"], value);
      }
    },
    cellLineHeight: {
      type: Number,
      default: 28
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    tableRowClassName: Function,
    headerRowClassName: Function,
    cellClassName: Function,
    headerCellClassName: Function,
    isMultiRowsCheckFixed: {
      type: Boolean,
      default: true
    },
    btnMouseEnterMenus: Object,
    role: {
      type: [Number, String],
      default: 1,
      validator(value) {
        return _.contains(["1", "2", "3"], value + "");
      }
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
    isShowRightbtns: {
      type: Boolean,
      default: true
    },
    actionBtns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    fromSaveBtns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    isInit: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false,
      propsync: true
    },
    gridtype: {
      type: String,
      default: "base",
      validator(value) {
        return _.contains(["base", "action"], value);
      }
    },
    fromBtns: Array,
    header: String,
    columns: Array,
    frozenColumns: Number,
    itemSource: {
      type: Array,
      default: () => {
        return [];
      }
    },
    resourceList: Array,
    isMultiRowsCheck: Boolean,
    isFieldsSearch: Boolean,
    searchFields: Object,
    pageSize: Number,
    pageIndex: Number,
    totalCount: Number,
    rightMenus: Array,
    showAddRowRightMenu: {
      type: Boolean,
      default: true
    },
    role: [Number, String],
    onInit: Function,
    onRefresh: Function,
    onSearch: Function,
    onBeforeAddRow: Function,
    onSaveRow: Function,
    onSaveRows: Function,
    onDeleteRow: Function,
    onDeleteCheckedRows: Function,
    onPageChanged: Function,
    onSaveSetting: Function,
    onSaveConfig: Function,
    onResetSetting: Function,
    onResetParams: Function,
    hasZnlBtns: {
      type: Boolean,
      default: true
    },
    initData: {
      type: Boolean,
      default: true
    },
    gridShow: {
      type: Boolean,
      default: true,
      propsync: true
    },
    showDeleteRowRightMenu: {
      type: Boolean,
      default: true
    },
    showSaveBtn: {
      type: Boolean,
      default: true
    },
    users: {
      type: Array,
      default: () => {
        return [];
      }
    },
    layoutType: {
      type: String,
      default: "spa",
      validator(value) {
        return _.contains(["spa", "other"], value);
      }
    },
    isShowFrombtns: {
      type: Boolean,
      default: true
    },
    tooltipContent: {
      type: String,
      default: ""
    },
    elementLoadingText: {
      type: String,
      default: "数据加载中,请稍后..."
    },
    isActivity: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: "100%"
    },
    maxHeight: {
      type: Number
    },
    minHeight: {
      type: Number
    },
    actionFormHeight: {
      type: Number,
      default: 38
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    headerHeight: {
      type: Number,
      default: 38
    },
    footerHeight: {
      type: Number,
      default: 32
    },
    loadingType: {
      type: String,
      default: "icon",
      validator(value) {
        return _.contains(["icon", "animation"], value);
      }
    },
    enterCellmovesDirection: Boolean
  },

  data() {
    return {
      tableActivity: true,
      fieldTags: [],
      isSettingDialogShow: false,
      isReload: false,
      // gridHeight: 0,
      // gridMaxHeight: 0,
      // gridMinHeight: 0,
      checkedRowsCount: 0,
      gridHasEditRows: false,
      actionBtnsCom: [],
      fromBtnsCom: [],
      fromSaveBtnsCom: [],
      elWidth: 0,
      loadingFlag: false,
      hasPageLoading: true,
      hasErrForEdit: 0,
      jumperShow: false,
      fromModuleHeight: 0,
      pageIndexCom: 1,
      currentPageIndex: 1
      // searchModle: {}
    };
  },

  computed: {
    showHeaderCom() {
      // return this.hasZnlBtns && this.showHeader
      let showHeader =
        !!this.header ||
        !!(this.actionBtns.length > 0) ||
        !!this.$slots["heading-slot"] ||
        !!this.$slots.header ||
        this.gridtype === "action" ||
        this.paginationPosition === "top" ||
        !!this.isMultiRowsCheck ||
        !!this.onRefresh ||
        !!this.onSaveSetting;

      if (!(this.hasZnlBtns && this.showHeader)) {
        return false;
      } else {
        return showHeader;
      }
    },

    pageIndexComputed: {
      get() {
        return this.pageIndexCom - 0;
      },

      set(val) {
        this.pageIndexCom = val;
      }
    },

    showShortcutColumn() {
      return !!this.onSaveSetting;
    },

    tablePlugStyle() {
      return {
        width: this.tablePlugWidth + "px"
      };
    },

    baseCaseTableStyle() {
      let style = {};
      if (this.$slots.tablePlug) {
        style.marginLeft = this.tablePlugWidth + 5 + "px";
      }
      return style;
    },

    gridRightMenus() {
      let customGridSetting = [
        {
          iconName: "columns",
          text: "自定义表格",
          click: (s, e) => {
            this.isSettingDialogShow = true;
          }
        }
      ];
      if (this.onSaveSetting) {
        return (this.rightMenus || []).concat(customGridSetting);
      } else {
        return this.rightMenus;
      }
    },

    gridComponentStyle() {
      let style = {};
      if (this.maxHeight) {
        style.maxHeight = this.maxHeight + "px";
      }

      if (this.minHeight) {
        style.minHeight = this.minHeight + "px";
      }

      if (this.isActivity && !this.tableActivity) {
        style.height = this.headerHeightCom + "px";
      } else {
        style.height = _.isNumber(this.height)
          ? this.height + "px"
          : this.height;
      }
      return style;
    },

    headerStyle() {
      let style = {};
      style.height = this.headerHeight + "px";
      style.lineHeight = this.headerHeight + "px";
      return style;
    },

    actionFormStyle() {
      let style = {};
      style.height = this.actionFormHeight + "px";
      style.lineHeight = this.actionFormHeight + "px";
      return style;
    },

    tableBaseCaseStyle() {
      let style = {};
      // 表格+footer
      if (this.maxHeight) {
        style.maxHeight = this.gridMaxHeight + this.footerHeightCom + "px";
      }
      if (_.isNumber(this.gridHeight)) {
        style.height = this.gridHeight + this.footerHeightCom + "px";
      }
      return style;
    },

    actionFormHeightCom() {
      return !!this.$slots["action-form"] ? this.actionFormHeight : 0;
    },

    headerHeightCom() {
      return this.showHeaderCom ? this.headerHeight : 0;
    },

    footerHeightCom() {
      return this.onPageChanged && this.paginationPosition === "bottom"
        ? this.footerHeight
        : 0;
    },

    gridMaxHeight() {
      // 表格表格
      return (
        this.maxHeight -
        this.actionFormHeightCom -
        this.headerHeightCom -
        this.footerHeightCom -
        this.fromModuleHeight
      );
    },

    gridMinHeight() {
      if (this.minHeight) {
        return (
          this.minHeight -
          this.actionFormHeightCom -
          this.headerHeightCom -
          this.footerHeightCom -
          this.fromModuleHeight
        );
      }
    },

    gridHeight() {
      if (this.height && this.height.substr && this.height.substr(-1) === "%") {
        return this.height;
      } else if (
        this.height &&
        this.height.substr &&
        this.height.substr(-2) === "px"
      ) {
        let height = parseFloat(this.height.substr(0, this.height.length - 2));
        return (
          height -
          this.actionFormHeightCom -
          this.headerHeightCom -
          this.footerHeightCom -
          this.fromModuleHeight
        );
      } else if (this.height && parseFloat(this.height)) {
        return (
          this.height -
          this.actionFormHeightCom -
          this.headerHeightCom -
          this.footerHeightCom -
          this.fromModuleHeight
        );
      }
    }
  },

  watch: {
    tableActivity(val) {
      this.$emit("switch-to-hide", val);
    },

    pageIndex(index) {
      // console.log('watch', index)
      this.pageIndexComputed = index;
      this.currentPageIndex = index;
    },

    columns(val) {
      this.fieldTags = _.chain(val)
        .filter(column => column.isTag)
        .map(column => {
          return { name: column.name, tags: column.extraConfig.tags };
        })
        .value();
    },

    searchFields: {
      handler: "search",
      deep: true
    },

    actionBtns() {
      this.btnWidthInit();
    },

    fromBtns() {
      this.btnWidthInit();
    },

    fromSaveBtns() {
      this.btnWidthInit();
    }
  },

  methods: {
    async init(refresh) {
      if (this.hasPageLoading && this.isInit) {
        // 只在初始加载时显示页面loading及隐藏表格
        this.$emit("page-loading", true);
        this.p_gridShow = false;
      } else {
        this.p_loading = true;
      }
      this.isReload = false;
      let init = this.onInit && this.onInit(null, refresh);
      if (_.isBoolean(init)) {
        !init && (this.isReload = true);
        this.p_gridShow = true;
        this.p_loading = false;
        this.$emit("page-loading", false);
      } else if (!_.isUndefined(init) && init.then && this.initData) {
        init.then(
          response => {
            _.delay(() => {
              this.p_loading = false;
              this.isReload = false;
            }, 200);
            this.p_gridShow = true;
            this.$emit("page-loading", false);
            this.hasPageLoading = false;
          },
          e => {
            console.log(e);
            this.p_loading = false;
            this.p_gridShow = true;
            this.$emit("page-loading", false);
            this.hasPageLoading;
            this.isReload = true;
          }
        );
      }
    },

    getChangedData() {
      if (this.gridtype === "base") {
        return [];
      } else {
        return (
          this.$refs.actionFlexGrid &&
          this.$refs.actionFlexGrid.getChangedData()
        );
      }
    },

    reFMHeight() {
      if (this.$slots["from-module"]) {
        return this.$refs.fromModule.reFMHeight();
      }
      this.doLayout();
    },

    doLayout() {
      if (this.gridtype === "base") {
        return this.$refs.baseFlexGrid && this.$refs.baseFlexGrid.doLayout();
      } else if (this.gridtype === "action") {
        return (
          this.$refs.actionFlexGrid && this.$refs.actionFlexGrid.doLayout()
        );
      }
    },

    toggleRowSelection(row, type) {
      if (this.gridtype === "base") {
        return this.$refs.baseFlexGrid.toggleRowSelection(row, type);
      } else {
        return this.$refs.actionFlexGrid.toggleRowSelection(row, type);
      }
    },
    changeCurrentCell(currentRow, currentColumn) {
      if (this.gridtype === "base") {
        return this.$refs.baseFlexGrid.changeCurrentCell(
          currentRow,
          currentColumn
        );
      } else {
        return this.$refs.actionFlexGrid.changeCurrentCell(
          currentRow,
          currentColumn
        );
      }
    },

    toggleTableShow(val) {
      if (_.isUndefined(val)) {
        this.tableActivity = !this.tableActivity;
      } else {
        if (val) {
          this.tableActivity = true;
        } else {
          this.tableActivity = false;
        }
      }
    },

    search(params) {
      this.p_loading = true;
      // this.searchModle = params
      let fieldsFilter = {};
      if (this.gridtype === "base") {
        fieldsFilter = this.$refs.baseFlexGrid.fieldsFilter;
      } else {
        fieldsFilter = this.$refs.actionFlexGrid.$refs.baseFlexGrid
          .fieldsFilter;
      }
      for (var key in fieldsFilter) {
        if (_.isNull(fieldsFilter[key])) {
          delete fieldsFilter[key];
        }
      }
      let items = _.extend(fieldsFilter, params);
      let serach = this.onSearch && this.onSearch(items);
      if (!_.isUndefined(serach) && serach.then) {
        // this.p_loading = this.loading ? true: false
        serach.then(
          response => {
            _.delay(() => {
              this.p_loading = false;
            }, 200);
          },
          e => {
            this.p_loading = false;
          }
        );
      } else {
        this.p_loading = false;
      }
      this.clearSelection();
    },

    hasEditRows(val) {
      this.gridHasEditRows = val;
    },

    cancelEdit() {
      this.$refs.actionFlexGrid.cancelEdit();
    },

    changeRow(row, name, data) {
      if (this.gridtype === "base") {
        return this.$refs.baseFlexGrid.changeRow(row, name, data);
      } else {
        return this.$refs.actionFlexGrid.changeRow(row, name, data);
      }
    },

    saveRows() {
      this.$refs.actionFlexGrid.saveRows();
    },

    refresh() {
      let refresh = this.onRefresh && this.onRefresh();
      this.clearSelection();
      if (!_.isUndefined(refresh) && refresh.then) {
        this.p_loading = true;
        refresh.then(
          response => {
            _.delay(() => {
              this.p_loading = false;
            }, 200);
          },
          e => {
            this.p_loading = false;
          }
        );
      }
      // 当前单元格
      let editEnds = this.$el.querySelectorAll(".currentCell");
      _.each(editEnds, item => {
        removeClass(item, "currentCell");
      });
    },

    cancelAllChecked() {
      if (this.gridtype === "base") {
        this.$refs.baseFlexGrid && this.$refs.baseFlexGrid.cancelAllChecked();
      } else {
        this.$refs.actionFlexGrid &&
          this.$refs.actionFlexGrid.cancelAllChecked();
      }
    },

    pageChanged(pageIndex) {
      this.currentPageIndex = pageIndex;
      let pageChanged = this.onPageChanged && this.onPageChanged(pageIndex);
      this.p_loading = true;
      if (!_.isUndefined(pageChanged) && pageChanged.then) {
        pageChanged.then(
          response => {
            _.delay(() => {
              this.p_loading = false;
            }, 200);
          },
          e => {
            this.p_loading = false;
          }
        );
      } else {
        this.p_loading = false;
      }
    },

    gridItemSourceData() {
      if (this.gridtype === "base") {
        return this.$refs.baseFlexGrid.gridItemSourceData();
      } else {
        return this.$refs.actionFlexGrid.gridItemSourceData();
      }
    },

    getSelectedRows() {
      if (this.gridtype === "base") {
        return this.$refs.baseFlexGrid.getSelectedRows();
      } else {
        return this.$refs.actionFlexGrid.getSelectedRows();
      }
    },

    addRow(isNew) {
      if (this.gridtype === "action") {
        this.$refs.actionFlexGrid.addRow(isNew);
      }
    },

    deleteRow(deleteItem) {
      this.$refs.actionFlexGrid.deleteRow(deleteItem);
    },

    deleteCheckedRows() {
      this.$refs.actionFlexGrid.deleteCheckedRows();
    },

    saveSetting(columns, pageSize, flag) {
      let saveSetting =
        this.onSaveSetting && this.onSaveSetting(columns, pageSize);
      if (_.isBoolean(saveSetting) && saveSetting) {
        this.isSettingDialogShow = false;
        this.init(true);
        !flag && this.$message({ message: "保存设置成功", type: "success" });
      } else if (!_.isUndefined(saveSetting) && saveSetting.then) {
        this.p_loading = true;
        saveSetting.then(
          response => {
            this.p_loading = false;
            this.isSettingDialogShow = false;
            this.loadingFlag = false;
            this.init(true);
            !flag &&
              this.$message({ message: "保存设置成功", type: "success" });
          },
          e => {
            this.p_loading = false;
            !flag && this.$message({ message: "保存设置失败", type: "error" });
          }
        );
      }
    },

    saveConfig(column) {
      let saveConfig = this.onSaveConfig && this.onSaveConfig(column);
      if (_.isBoolean(saveConfig) && saveConfig) {
        this.init(true);
        this.changeShowVisibleColumn();
        this.$message({ message: "修改成功", type: "success" });
      } else if (!_.isUndefined(saveConfig) && saveConfig.then) {
        this.p_loading = true;
        saveConfig.then(
          response => {
            this.p_loading = false;
            this.init(true);
            this.changeShowVisibleColumn();
            this.$message({ message: "修改成功", type: "success" });
          },
          e => {
            this.p_loading = false;
            this.$message({ message: "修改失败", type: "error" });
          }
        );
      }
    },

    changeShowVisibleColumn() {
      if (this.gridtype === "action") {
        this.$refs.actionFlexGrid.$refs.baseFlexGrid.showVisibleColumn = false;
      } else {
        this.$refs.baseFlexGrid.showVisibleColumn = false;
      }
    },

    resetSetting(type) {
      if (type === "columnConfog") {
        let resetSetting = this.onResetSetting && this.onResetSetting();
        if (_.isBoolean(resetSetting) && resetSetting) {
          this.isSettingDialogShow = false;
          this.init(true);
        } else if (!_.isUndefined(resetSetting) && resetSetting.then) {
          this.p_loading = true;
          resetSetting.then(
            response => {
              this.p_loading = false;
              this.isSettingDialogShow = false;
              this.init(true);
            },
            e => {
              this.p_loading = false;
            }
          );
        }
      } else if (type === "parameterConfig") {
        let resetParams = this.onResetParams && this.onResetParams();
        if (_.isBoolean(resetParams) && resetParams) {
          this.isSettingDialogShow = false;
          this.init(true);
        } else if (!_.isUndefined(resetParams) && resetParams.then) {
          this.p_loading = true;
          resetParams.then(
            response => {
              this.p_loading = false;
              this.isSettingDialogShow = false;
              this.init(true);
            },
            e => {
              this.p_loading = false;
            }
          );
        }
      }
    },

    getCheckedRows() {
      if (this.gridtype === "base") {
        return this.$refs.baseFlexGrid.getCheckedRows();
      } else {
        return this.$refs.actionFlexGrid.getCheckedRows();
      }
    },

    getCheckedKeys() {
      if (this.gridtype === "base") {
        return this.$refs.baseFlexGrid.getCheckedKeys();
      } else {
        return this.$refs.actionFlexGrid.getCheckedKeys();
      }
    },

    clearSelection() {
      if (this.gridtype === "base") {
        if (!this.$refs.baseFlexGrid) return false;
        return this.$refs.baseFlexGrid.clearSelection();
      } else {
        if (!this.$refs.actionFlexGrid) return false;
        return this.$refs.actionFlexGrid.clearSelection();
      }
    },

    btnWidthInit() {
      this.actionBtnsCom = this.actionBtns;
      _.each(this.actionBtnsCom, item => {
        this.$set(item, "hasBtn", true);
        if (_.isUndefined(item.isShow)) {
          this.$set(item, "isShow", true);
        }
      });

      this.fromBtnsCom = this.fromBtns;
      if (
        !_.isUndefined(this.fromBtnsCom) &&
        !_.isUndefined(this.fromBtnsCom[0])
      ) {
        _.each(this.fromBtnsCom, item => {
          this.$set(item, "hasBtn", true);
          if (_.isUndefined(item.isShow)) {
            this.$set(item, "isShow", true);
          }
        });
      }

      this.fromSaveBtnsCom = this.fromSaveBtns;
      _.each(this.fromSaveBtnsCom, item => {
        if (item) {
          this.$set(item, "hasBtn", true);
        }
        if (item && _.isUndefined(item.isShow)) {
          this.$set(item, "isShow", true);
        }
      });
    },

    configTabChanged(tabName) {
      if (tabName === "authUsers") {
        this.$emit("config-tab-changed");
      }
    },

    checkRow(index) {
      if (this.gridtype === "base") {
        return this.$refs.baseFlexGrid.checkRow(index);
      } else {
        return this.$refs.actionFlexGrid.checkRow(index);
      }
    },

    elResizeFunc() {
      // 按钮组宽度计算
      this.elWidth = this.$el.offsetWidth;
    },

    paginationTitle() {
      let next = this.$el.querySelector(".btn-next");
      let prev = this.$el.querySelector(".btn-prev");
      next && (next.title = "下一页");
      prev && (prev.title = "上一页");
    }
  },

  mounted() {
    this.isInit && this.init();

    this.$nextTick(() => {
      // 按钮组初始化
      this.btnWidthInit();
      // 按钮组宽度计算
      this.elWidth = this.$el.offsetWidth;
    });

    this.paginationTitle();

    elResize.on(document.body, this.elResizeFunc);
  },

  created() {},

  destroyed() {
    elResize.off(document.body, this.elResizeFunc);
  }
};
</script>

