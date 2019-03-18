<template>
  <div
    :class="[
      'znl-component-input',
      border? 'znl-border-input': '',
      disabled?'znl-disabled':'',
      isMustFill?'znl-must-fill':'',
      authFailed?'znl-input_authFailed':'',
      layout]"
    :style="componentInputStyle"
  >

    <label
      :class="['znl-input-title', isMustFill?'isMustFill':'']"
      :style="{
        height: height + 'px',
        'line-height': height + 'px',
        width: titleWidth
      }"
      v-if="!!title"
    >{{title}}
    </label>

    <div
      class="znl-pattern-tip"
      v-if="patternShow"
      :style="znlPatternTipStyle"
    >
      {{patternTip}}
    </div>

    <el-input
      :style="inputStyle"
      :class="[
          'znl-input-type',
          'znl-input-default',
          $slots.prefix?'znlPrefix':''
          ]"
      v-if="formType==='input'"
      v-model="inputValue"
      ref="input"
      :clearable="clearable"
      :maxlength="maxlength"
      :minlength="minlength"
      :placeholder="placeholder"
      :disabled="disabled"
      :suffix-icon="suffixIcon"
      :rows="rows"
      :size="size"
      :autofocus="autofocus"
      :form="form"
      :resize="resize"
      :type="type"
      :name="name"
      :tabindex="tabindex"
      :auto-complete="autoComplete"
      :autosize="autosize"
      @keydown.native="e=>$emit('keydown', e)"
      @blur="inputBlur"
      @change="change"
      @clear="val=>{$emit('clear', val)}"
      @focus="e=>{patternShow=false,$emit('focus', e)}"
    >
      <slot
        name="prefix"
        slot="prefix"
      ></slot>
      <slot
        name="suffix"
        slot="suffix"
      ></slot>
    </el-input>

    <el-autocomplete
      :style="{
          height: height + 'px',
          width: 'auto',
          'line-height': height + 'px',
          'margin-left': !!title&&layout==='left'?titleWidth:0
        }"
      :class="[
          'znl-input-type',
          'znl-input-autocomplete',
          isMustFill?'isMustFill':''
          ]"
      v-else-if="formType==='autocomplete'"
      :fetch-suggestions="fetchSuggestions"
      :trigger-on-focus="false"
      :clearable="clearable"
      :custom-item="customItem"
      v-model="inputValue"
      ref="input"
      :maxlength="maxlength"
      :minlength="minlength"
      :placeholder="placeholder"
      :disabled="disabled"
      :suffix-icon="suffixIcon"
      :rows="rows"
      :size="size"
      :label="label"
      :autofocus="autofocus"
      :form="form"
      :resize="resize"
      :type="type"
      :name="name"
      :tabindex="tabindex"
      @select="d=>{$emit('select', d)}"
      @blur="e=>{$emit('blur', e)}"
      @change="change"
      @focus="e=>{$emit('focus', e)}"
    >
    </el-autocomplete>

    <el-select
      v-model="selectValue"
      :class="[
          'znl-input-type',
          'znl-input-select',
          multiple?`znl-select-multiple`:'',
          !tagsClear?'znl-select-tags-clear':'',
          isMustFill?'isMustFill':'']"
      :style="{
          height: height + 'px',
          width: 'auto',
          'line-height': height + 'px',
          'margin-left': !!title&&layout==='left'?titleWidth:0
        }"
      v-else-if="formType==='select'"
      ref="select"
      :multiple="multiple"
      :placeholder="placeholder"
      :disabled="!!disabled"
      :clearable="clearable"
      :name="name"
      :popper-class="popperClass"
      :value-key="valueKey"
      :multiple-limit="multipleLimit"
      :tabindex="tabindex"
      :filterable="filterable"
      :allowCreate="allowCreate"
      :remote="remote"
      :loading="loading"
      :remote-method="remoteMethod"
      :default-first-option="defaultFirstOption"
      @remove-tag="removeTag"
      @change="change"
      @clear="val=>{$emit('clear', val)}"
      @blur="e=>{$emit('blur', e)}"
      @focus="e=>{$emit('focus', e)}"
      @visible-change="val=>{$emit('visible-change', val)}"
    >
      <el-option
        v-for="(item, index) in selectOptions"
        :key="index"
        :value="item.key"
        :label="item.value"
        :disabled="!!item.disabled"
      >
        <span
          class="znl-selected-checked"
          v-if="multiple"
        >
          <el-checkbox
            :disabled="item.disabled"
            @change="val=>$emit('multiple-change',val, selectOptions[index])"
            v-model="checkedArray[index]"
          >
            {{ item.value }}
          </el-checkbox>
        </span>
      </el-option>
    </el-select>

    <el-date-picker
      :class="[
          'znl-input-type',
          'znl-input-date',
          isMustFill?'isMustFill':'']"
      :style="{
            height: height + 'px',
            width: 'auto',
            'line-height': height + 'px',
            'margin-left': !!title&&layout==='left'?titleWidth:0
          }"
      v-else-if="formType==='datepicker'"
      v-model="datePickerValue"
      :tabindex="tabindex"
      ref="datepicker"
      :disabled="disabled"
      :editable="editable"
      :clearable="clearable"
      :placeholder="placeholder"
      :end-placeholder="endPlaceholder"
      :start-placeholder="startPlaceholder"
      :type="dateType"
      :format="format"
      :value-format="valueFormat"
      :align="align"
      :name="name"
      :picker-options="pickerOptions"
      :popper-class="popperClass"
      :readonly="readonly"
      :range-separator="rangeSeparator"
      @change="change"
      @blur="e=>{$emit('blur', e)}"
      @focus="e=>{$emit('focus', e)}"
    >
    </el-date-picker>

  </div>
</template>
<script>
import { hasClass } from "~/utils/dom";
export default {
  name: "ZnlInput",

  data() {
    return {
      selectValue: "",
      datePickerValue: "",
      inputValue: "",
      znlPatternTipStyle: {},
      patternTimeId: "",
      patternShow: false,
      authFailed: false,
      checkedArray: []
    };
  },

  computed: {
    componentWidth() {
      return _.isFinite(this.width) ? this.width + "px" : this.width;
    },

    componentInputStyle() {
      let style = {};
      style.width = this.componentWidth;
      style.height =
        this.type === "textarea"
          ? ""
          : this.layout === "top" && this.title
          ? this.height * 2 + "px"
          : this.height + "px";
      style.lineHeight = this.height + "px";
      return style;
    },

    inputStyle() {
      let style = {};
      style.width = "auto";
      style.height = this.type === "textarea" ? "" : this.height + "px";
      style.lineHeight = this.height + "px";
      style.marginLeft =
        !!this.title && this.layout === "left" ? this.titleWidth : 0;
      return style;
    }
  },

  watch: {
    inputValue(val) {
      if (this.isUpperCase) {
        this.$emit("input", val.toUpperCase());
      } else {
        this.$emit("input", val);
      }
    },
    value: {
      handler(val) {
        if (this.formType === "input") {
          this.inputValue = this.value;
        } else if (
          !this.multiple &&
          this.formType === "select" &&
          this.selectOptions.length > 0
        ) {
          _.each(this.selectOptions, item => {
            if (item.value === val || item.key === val) {
              this.selectValue = item.key;
            }
          });
        } else if (
          this.multiple &&
          this.formType === "select" &&
          this.selectOptions.length > 0
        ) {
          this.selectValue = val;
          this.comChecked();
        } else if (this.formType === "datepicker") {
          this.datePickerValue = this.value;
        } else if (this.formType === "autocomplete") {
          this.$emit("input", val);
          this.inputValue = this.value;
        }
      },
      deep: true
    },
    selectOptions() {
      this.onInit();
    }
  },

  components: {},

  props: {
    allowCreate: {
      type: Boolean,
      default: false
    },
    defaultFirstOption: Boolean,
    filterable: Boolean,

    rangeSeparator: String,
    formType: {
      type: String,
      default: "input",
      validator(value) {
        return _.contains(
          ["input", "select", "datepicker", "autocomplete"],
          value
        );
      }
    },
    isUpperCase: {
      type: Boolean,
      default: false
    },
    multipleLimit: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: "text"
      // validator (value) {
      //     return _.contains(['text', 'textarea', 'year', 'month', 'date', 'week', 'datetime', 'datetimerange', 'daterange', 'password', 'file'], value)
      // }
    },
    dateType: {
      type: String,
      default: "date",
      validator(value) {
        return _.contains(
          [
            "year",
            "month",
            "date",
            "week",
            "datetime",
            "datetimerange",
            "daterange",
            "password"
          ],
          value
        );
      }
    },
    multiple: {
      tayp: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean, Date, Array],
      default: ""
    },
    maxlength: Number,
    minlength: Number,
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator(value) {
        return _.contains(["medium", "small", "mini"], value);
      }
    },
    prefixIcon: String,
    suffixIcon: String,
    rows: Number,
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    label: String,
    autofocus: {
      type: Boolean,
      default: false
    },
    form: String,
    resize: {
      type: String,
      default: "none",
      validator(value) {
        return _.contains(["none", "both", "horizontal", "vertical"], value);
      }
    },
    valueKey: {
      type: String,
      default: "value"
    },
    clearable: {
      type: Boolean,
      default: false
    },
    name: String,
    popperClass: String,
    selectOptions: {
      type: Array,
      default: () => {
        return [];
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    startPlaceholder: String,
    endPlaceholder: String,
    format: {
      type: String,
      default: "yyyy-MM-dd"
    },
    valueFormat: {
      type: String
    },
    align: String,
    title: String,
    layout: {
      type: String,
      default: "left",
      validator(value) {
        return _.contains(["top", "left"], value);
      }
    },
    titleWidth: {
      type: String,
      default: "50px"
    },
    isMustFill: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: "250px"
    },
    height: {
      type: Number,
      default: 30
    },
    border: {
      type: Boolean,
      default: false
    },
    fetchSuggestions: Function,
    customItem: String,
    pickerOptions: {
      type: Object,
      default() {
        return {};
      }
    },
    pattern: {
      type: String,
      default: ""
    },
    patternDelay: {
      type: Number,
      default: 3
    },
    patternTip: {
      type: String,
      default: "数据格式输入不正确"
    },
    autoComplete: {
      type: String,
      default: "off"
    },
    tagsClear: {
      type: Boolean,
      default: true
    },
    tabindex: {
      type: [String],
      default: "0"
    },
    remoteMethod: Function,
    remote: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    inputBlur(e) {
      this.$emit("blur", e);
      // 表单验证
      if (this.pattern && this.inputValue !== "") {
        if (!new RegExp(this.pattern).test(this.inputValue)) {
          this.authFailed = true;
          this.patternShow = true;
          this.$emit("pattern-authend", false);
          if (this.patternDelay) {
            this.patternTimeId = setTimeout(() => {
              this.patternShow = false;
              clearTimeout(this.patternTimeId);
            }, this.patternDelay * 1000);
          }
          this.znlPatternTipStyle = {
            top: this.height + "px"
          };
        } else {
          this.$emit("pattern-authend", true);
          this.patternShow = false;
          this.authFailed = false;
          clearTimeout(this.patternTimeId);
        }
      }
    },
    change(val) {
      if (this.formType === "select") {
        let selectVal = _.find(this.selectOptions, item => {
          return item.key === val;
        });
        if (this.multiple) {
          this.comChecked();
          this.$emit("change", val);
        } else {
          this.$emit("change", selectVal);
        }
      } else {
        this.$emit("change", val);
      }
      this.$emit("input", val);
    },
    removeTag(tag) {
      if (this.multiple) {
        this.$emit("remove-tag", tag);
      }
    },
    comChecked() {
      _.each(this.selectOptions, (data, i) => {
        if (this.selectValue.length === 0) {
          _.each(this.checkedArray, (item, m) => {
            this.$set(this.checkedArray, m, false);
          });
        }
        _.find(this.selectValue, (item, j) => {
          if (item === data.key) {
            this.$set(this.checkedArray, i, true);
            return item;
          } else {
            this.$set(this.checkedArray, i, false);
          }
        });
      });
    },
    onInit() {
      // 双向绑定初始值
      if (this.formType === "input") {
        this.inputValue = this.value;
      } else if (
        !this.multiple &&
        this.formType === "select" &&
        this.selectOptions.length > 0
      ) {
        let option = _.find(this.selectOptions, item => {
          return item.value === this.value || item.key === this.value;
        });
        option && (this.selectValue = option.key);
      } else if (
        this.multiple &&
        this.formType === "select" &&
        this.selectOptions.length > 0
      ) {
        this.selectValue = this.value;
        if (this.multiple) {
          this.comChecked();
        }
      } else if (this.formType === "datepicker") {
        this.datePickerValue = this.value;
      } else if (this.formType === "autocomplete") {
        this.inputValue = this.value;
      }
      this.$nextTick(() => {
        let type = this.formType === "autocomplete" ? "input" : this.formType;
        let inputDom =
          this.$refs[type] && this.$refs[type].$el.querySelector("input");
        if (inputDom && this.formType !== "input") {
          let parentDom = inputDom.parentElement;
          let grandpaDom = inputDom.parentElement.parentElement;
          if (hasClass(parentDom, "el-date-editor")) {
            parentDom.removeAttribute("tabindex");
          }
          if (hasClass(grandpaDom, "el-select")) {
            grandpaDom.removeAttribute("tabindex");
          }
          inputDom.setAttribute("tabindex", this.tabindex);
        }
      });
    },
    blur() {
      this.$refs.input.$el.querySelector("input").blur();
      if (this.formType === "autocomplete") {
        this.$refs.input.$children[1].showPopper = false;
      }
    },
    handleFocus() {
      if (this.formType === "select") {
        return this.$refs.select.handleFocus();
      } else if (this.formType === "input") {
        return this.$refs.input.$el.querySelector("input").focus();
      } else if (this.formType === "datepicker") {
        return this.$refs.datepicker.handleFocus();
        // showPicker
      }
    },
    clear() {
      this.inputValue = "";
      this.selectValue = "";
      this.datePickerValue = "";
    }
  },

  mounted() {
    this.onInit();
  }
};
</script>


