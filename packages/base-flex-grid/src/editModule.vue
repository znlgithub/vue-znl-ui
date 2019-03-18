<template>
  <div>
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
        <span class="znl-selected-checked" v-if="multiple">
          <el-checkbox :disabled="!!item.disabled" v-model="checkedArray[index]">{{ item.value }}</el-checkbox>
        </span>
      </el-option>

    </el-select>

    <el-date-picker
      ref="editDatepick"
      v-show="idDatepickerShow"
      class="znl-editinput idEditDatepick"
      v-model="editDatepickerData"
      :style="znlEditInputStyle"
      @blur="editInputBlur('datapicker')"
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

  </div>
</template>

<script>
  export default {
    name: 'EditModule',

    data () {

    },

    props: {

    },

    methods: {

    }
  }
</script>
