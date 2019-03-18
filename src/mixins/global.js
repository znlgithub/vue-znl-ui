import { getDocumentRect } from '~/utils/dom'
export default {
  data () {
    return {
      globalDomRect: {
        clientWidth: 0,
        clientHeight: 0,
        headerHeight: 50,
        tabHeaderHeight: 38,
        siderWidth: 160,
        contentHeight: 0,
        contentWidth: 0,
        actionHeight: 38,
        footerHeight: 32,
        contentHeightWithoutTab: 0,
        fromModuleHeight: 0,
        fromModuleBtnsHeight: 40,
        dialogTitleHeight: 50,
        dialogFooterHeight: 45,
        dialogBodyMargin: 50
      }
    }
  },
  props: {

  },
  methods: {
    globalDomResize () {
      const domRect = getDocumentRect()
      this.globalDomRect.clientHeight =  domRect.height
      this.globalDomRect.clientWidth =  domRect.width
    }
  },
  mounted () {
    this.globalDomResize()
    // on(window, 'resize', this.globalDomResize)
  },
  destory () {
    // off(window, 'resize', this.globalDomResize)
  }
}
