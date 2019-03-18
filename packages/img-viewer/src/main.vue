<template>
   <znl-dialog
    class="znl-Imgviewer"
    :visible="visible"
    :title="title"
    @open="$emit('open', true)"
    @close="$emit('close', true), $emit('update:visible', false)" 
    >
      <znl-carousel 
          arrow="hover" 
          :autoplay="false"
          :initial-index="initialIndex">
          <znl-carousel-item 
            v-for="(item, index) in imgSrcArray" 
            :key="index"
            >

            <h4>URL{{index}}: {{ item }}</h4>

            <img class="znl-imgviewer-img" :src="item" alt="大图">

          </znl-carousel-item>
      </znl-carousel>

      <div slot="footer" >
          <znl-button @click="$emit('update:visible', false)" :width="60" :height="30">关闭</znl-button>
      </div>
  </znl-dialog>
</template>
<script>
import {getDocumentRect, setStyle} from '~/utils/dom'

export default {
  name: 'ZnlImgViewer',

  data () {
    return {
    }
  },

  components: {
  },

  props: {
    title: String,
    visible: {
      type: Boolean,
      default: false
    },
    imgSrcArray: {
        type: Array
    },
    initialIndex: {
        type: Number,
        default: 0
    }
  },

  watch: {

  },

  methods: {
  },

  mounted () {
  }
}
</script>

