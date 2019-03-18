<template>
  <znl-dialog 
    :visible="visible"
    :title="showTitle"
    :width="width"
    :height="height"
    class="filteringRules"
    @close="$emit('update:visible', false)"
    :append-to-body="true">
    <div slot="znl-dialog">
        <ul class="Bom_myupload_fromalert_row" v-if="!$slots.filteringRules">
          <li><span>列名</span><span>字符要求</span><span>格式要求</span></li>
          <li><span>型号</span><span>40个字符</span><span>型号不能为空且由英文字母、数字、点符号 “ . ” 、下划线 “ _ ” 、中杠 “ - ” 、加号 “ + ” 、井号 “ # ” 、逗号 “ , ” 、全角逗号 “ ，” 、全角中点号 “ ? ” 、@号 “ @ ” 、反斜杠 “ / ” 、百分号 “ % ” 、全角百分号 “ % ” 、$号 “ $ ” 、分号 “ : ” 、小括号 “ () ” 、等于号 “ = ” 、*号 “ * ” 、&amp;号 “ &amp; ” 组成</span></li>
          <li><span>品牌</span><span>40个字符</span><span>中文、英文字母、数字、横杠 “ - ” 、反斜杠 “ / ” 、&amp;号 “ &amp; ” 系统会过滤的内容：“ 现货 ” 、 “ 假一赔十 ” 、“ 厂家直销 ” ，不允许全角</span></li>
          <li><span>批号</span><span>20个字符</span><span>数字、加号 “ + ” 、反斜杠 “ / ” 、英文、括号 “ () ” ，不允许全角</span></li>
          <li><span>封装</span><span>20个字符</span><span>英文、数字、横杠 “ - ” 、括号 “ () ” 、点号 “ . ” ，不允许全角</span></li>
          <li><span>数量</span><span>数字</span><span>不能为空且大于0</span></li>
          <li><span>交易说明</span><span>40个字符</span><span>中文、数字、英文、点符号 “ . ” 、 中杠 “ - ” 、 斜杠 “ / ” 、 反斜杠 “ \ ” ，不允许全角</span></li>
          <li><span>仓库位置</span><span>数字</span><span>填写认证仓库所对应的编号，例如：仓库 1 的位置是 中国大陆 - 广东 - 深圳，在对应的库存的仓库位置列填 1 即可</span></li>
        </ul>
        <slot name="filteringRules"></slot>
    </div>
    <el-row slot="footer">
      <div >
        <p class="rule-warn">注意：当型号、品牌、封装位置这3列内容完全相同时，此类库存默认为相同库存</p>
      </div>
      <znl-button 
        style-type="main"
        :height="30"
        :width="100"
        @click="$emit('update:visible', false)">
        好的
      </znl-button>
    </el-row>
  </znl-dialog>
</template>
<script>
  export default {
    name: 'filteringRules',
    data () {
      return {}
    },
    props: {
      visible: Boolean,
      showTitle: String,
      width: [String, Number],
      height: [String, Number]
    }
  }
</script>
