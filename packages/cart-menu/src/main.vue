<template>

  <div class="znl-cart-menu">
    
     <canvas @click="CartMenuClick"  class="ZnlCart" width="150" height="150">浏览器不支持canvas</canvas> 

  </div>

</template>

<script>
  const colors = (function () {
        return ( "aliceblue,antiquewhite,aqua,aquamarine,azure,beige,bisque,black,blanchedalmond,blue," +
        "blueviolet,brown,burlywood,cadetblue,chartreuse,chocolate,coral,cornflowerblue,cornsilk," +
        "crimson,cyan,darkblue,darkcyan,darkgoldenrod,darkgray,darkgreen,darkgrey,darkkhaki,darkmagenta," +
        "darkolivegreen,darkorange,darkorchid,darkred,darksalmon,darkseagreen,darkslateblue,darkslategray," +
        "darkslategrey,darkturquoise,darkviolet,deeppink,deepskyblue,dimgray,dimgrey,dodgerblue,firebrick," +
        "floralwhite,forestgreen,fuchsia,gainsboro,ghostwhite,gold,goldenrod,gray,green,greenyellow,grey," +
        "honeydew,hotpink,indianred,indigo,ivory,khaki,lavender,lavenderblush,lawngreen,lemonchiffon," +
        "lightblue,lightcoral,lightcyan,lightgoldenrodyellow,lightgray,lightgreen,lightgrey,lightpink," +
        "lightsalmon,lightseagreen,lightskyblue,lightslategray,lightslategrey,lightsteelblue,lightyellow," +
        "lime,limegreen,linen,magenta,maroon,mediumaquamarine,mediumblue,mediumorchid,mediumpurple," +
        "mediumseagreen,mediumslateblue,mediumspringgreen,mediumturquoise,mediumvioletred,midnightblue," +
        "mintcream,mistyrose,moccasin,navajowhite,navy,oldlace,olive,olivedrab,orange,orangered,orchid," +
        "palegoldenrod,palegreen,paleturquoise,palevioletred,papayawhip,peachpuff,peru,pink,plum,powderblue," +
        "purple,rebeccapurple,red,rosybrown,royalblue,saddlebrown,salmon,sandybrown,seagreen,seashell,sienna," +
        "silver,skyblue,slateblue,slategray,slategrey,snow,springgreen,steelblue,tan,teal,thistle,transparent," +
        "tomato,turquoise,violet,wheat,white,whitesmoke,yellow,yellowgreen" ).split(',');
  })()

  export default{
    name: 'ZnlCartMenu',
    
    data () {
      return {}
    },

    methods: {
      CartMenuClick (e) {
        console.log('1', e)
      },

      CanvasInit () {
        let canvas = this.$el.querySelector('.ZnlCart')
        console.log(canvas)
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ccc';
        ctx.beginPath();
        ctx.moveTo(75, 75);
        ctx.arc(75, 75, 75, Math.PI * - 0.5,Math.PI * 0.5,false);
        ctx.fill();
        ctx.closePath();
      }
    },

    mounted () {
      this.CanvasInit()

      this.$parent.carts.push(this)
    }
  }
</script>
