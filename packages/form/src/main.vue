<template>
  <el-row class="znl-formContainer" type="flex" justify="space-around">
    <el-col>
        <slot name="znl-form"></slot>
    </el-col>
    <!-- <el-col 
        v-for="(item, index) in $slots['znl-form'][0].children"
        :key="index">
            <div v-html="item.elm"></div>
    </el-col>  -->
  </el-row>
</template>
<script>
    export default {
        name: 'ZnlForm',
        data () {
            return {

            }
        },
        mounted () {
            // let container = document.createElement('div')
            // container.appendChild()
            console.log(this.$slots)
        }
    }
</script>
