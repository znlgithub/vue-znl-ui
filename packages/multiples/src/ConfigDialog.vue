<template>
  <znl-dialog
    class="znl-layout-config-dialog"
    :visible="visible"
    title="页面配置"
    width="450px"
    @close="$emit('update:visible', false)"
  >
  <div>
    <div class="item title">
      <span class="title">表名</span>
      <span>是否显示</span>
    </div>
    <div v-for="(item, index) in menus" :key="item.name" class="item" v-if="typeof item.allowDeploy === 'undefined' ? true : item.allowDeploy">

      <span class="title">{{item.title || item.name}}</span>

      <znl-switch 
        v-model="item.visible"
        active-color="#13ce66"
        inactive-color = "#ccc"
        @change="$emit('page-change', item.visible, $parent.menus[index], index)"
        >
      </znl-switch>

    </div>
  </div>

  <div slot="footer" class="footer">
    <znl-button v-if="!!onResetSetting" type="text" @click.stop="resetSetting">重置配置</znl-button>
    <znl-button :height="30" :width="50" @click.stop="$emit('update:visible', false)">关闭</znl-button>
    <znl-button v-if="!!onSaveConfig" :height="30" :width="50" style-type="main" @click.stop="confirmCallBack">确认</znl-button>
  </div>

  </znl-dialog>
</template>
<script>
  import znlDialog from 'packages/dialog/index';
  import znlSwitch from 'packages/switch/index';

  export default {
    name: 'ConfigDialog',

    props: {
      visible: Boolean,
      onSaveConfig: Function,
      onResetSetting: Function,
      menus: {
        type: Array,
        default () {
          return []
        }
      }
    },

    components: {znlDialog, znlSwitch},

    data () {
      return {
        value: false
      }
    },

    methods: {
      resetSetting () {
        if (typeof this.onResetSetting === 'function') {
          let ResetSetting = this.onResetSetting()
          if (ResetSetting && ResetSetting.then) {
            ResetSetting.then(() => {
              this.$emit('update:visible', false)
            })
          }
        }
      },

      async confirmCallBack () {
        let config = _.map(this.menus, item => {
          return {
            name: item.name,
            visible: item.visible,
            title: item.title,
            hasRight: item.hasRight,
            index: item.index
          }
        })

        if (typeof this.onSaveConfig === 'function') {
          let saveConfig = this.onSaveConfig(config)
          if (saveConfig && saveConfig.then) {
            saveConfig.then(() => {
              this.$emit('update:visible', false)
            })
          }
        }
      }
    }
  }
</script>
