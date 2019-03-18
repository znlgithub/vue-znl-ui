
  export default{

    name: 'ZnlCart',

    props: {
      config: {
        type: Object,
        default() {
          return {
             //大圆的圆心
            bigX:100,
            bigY:100,
             //大圆的半径
            bigRadius:100,
            smallRadius:30,
            bigColor: 'black',
            startRadian: Math.PI / 2,   //第一个小圆的圆心位于大圆上的弧度值
            menus: [
                {
                    name: 'car',
                    click: () => {
                        console.log('car')
                    }
                },
                {
                    name: 'aaa',
                    click: () => {
                        console.log('aaa')
                    }
                },
                {
                  name: 'bbb',
                  click: () => {
                      console.log('bbb')
                  }
                },
                // {
                //   name: 'bbb',
                //   click: () => {
                //       console.log('bbb')
                //   }
                // },
                // {
                //   name: 'bbb',
                //   click: () => {
                //       console.log('bbb')
                //   }
                // }
            ]
          }
        }
      }
    },

    computed: {
        cartsConfig: {
            get () {
                _.each(this.config.menus, item => {
                     item.smallRadius = this.config.smallRadius
                })
                return this.config
            }
        }
    },

    render (h) {
      let _this = this
      return h('div', 
        {
          class: {
            'znl-cart': true
          }
        },
        [h(
          'canvas',
          {
            class: {
              'znl-cart-canvas': true
            },
            attrs: {
              width: '200',
              height: '200'
            },
            domProps: {
              innerHTML: '您的浏览器不支持canvas'
            },
            ref: 'znlCartCanvas',
            on: {
              click (e) {
                _this.reDraw(e, _this.$el, _this.$el.getContext("2d"));
              },
              mousemove (e) {
                _this.reDraw(e, _this.$el, _this.$el.getContext("2d"));
              }
            }
          }
        )]
      )
    },

    data () {
      return {
          startDegrees: this.config.startRadian
      }
    },

    watch: {
      
    },

    methods: {
      init () {
        let canvas = this.$refs.znlCartCanvas

        let ctx = canvas.getContext("2d")

        this.canvasInit(canvas, ctx)
      },

      canvasInit (canvas, ctx) {

        this.reDraw(false, canvas, ctx)

      },

      drawBigCircle (event, ctx) {

          let p = this.getEventPosition(event)

          ctx.beginPath()

          ctx.strokeStyle = this.cartsConfig.bigColor
          
          ctx.arc(
            this.cartsConfig.bigX,
            this.cartsConfig.bigY,
            this.cartsConfig.bigRadius,
            0,
            2 * Math.PI
          )

          ctx.stroke()

          ctx.beginPath()

          // 圆心
          ctx.fillStyle = '#fff';
          ctx.strokeStyle = this.cartsConfig.bigColor
          ctx.arc(
            this.cartsConfig.bigX,
            this.cartsConfig.bigY,
            30,
            0,
            2 * Math.PI
          )
          ctx.fill();
          // ctx.stroke()

          let isIn = false
          if (p !== undefined) {
              isIn = ctx.isPointInPath(p.x, p.y);
          }
          if (isIn && event.type === 'mousemove') {
            this.config.startRadian = -Math.PI / 2
          } else {
            this.config.startRadian = Math.PI / 2            
          }
      },

      drawSmallCircles (event, ctx) {

          let p = this.getEventPosition(event);  

          let menusLength = this.cartsConfig.menus.length

          let menuRadius = Math.PI / menusLength

          _.each(this.cartsConfig.menus, (item, index) => {
             //计算弧度值
              let radian = this.cartsConfig.startRadian - (index + 1) * Math.PI / menusLength;

              let b = this.cartsConfig.bigRadius * Math.cos(radian);
              let h = this.cartsConfig.bigRadius * Math.sin(radian);

              // //计算出小圆圆心坐标
              // let x = this.cartsConfig.bigX + b;
              // let y = this.cartsConfig.bigY + h;
              // ctx.beginPath();
              // ctx.fillStyle = '#ccc'
              // ctx.arc(x, y, item.smallRadius, 0, 2*Math.PI);
              // ctx.fill();

              ctx.fillStyle = '#71737A';
              ctx.strokeStyle = '#fff';
              ctx.beginPath();
              ctx.moveTo(this.cartsConfig.bigX, this.cartsConfig.bigY);

              // ctx.lineTo(h, b);
              ctx.arc(
                this.cartsConfig.bigX, 
                this.cartsConfig.bigY,
                this.cartsConfig.bigRadius,
                this.startDegrees,
                radian,
                true); 
              // ctx.lineTo(this.cartsConfig.bigX, this.cartsConfig.bigY);
              ctx.stroke()
              ctx.fill();

              // 文字
              let x = this.cartsConfig.bigRadius*(2/3) * Math.cos(radian+ Math.PI/(menusLength*2));
              let y = this.cartsConfig.bigRadius*(2/3) * Math.sin(radian+ Math.PI/(menusLength*2));
              // console.log(radian, radian + Math.PI/4, menuRadius)
              let textX = this.cartsConfig.bigX+x
              let textY = this.cartsConfig.bigY+y
              // console.log(b,h,x,y,textX,textY)
              ctx.fillStyle = '#fff';
              ctx.font = "20px serif";
              ctx.textAlign = "center";
              ctx.fillText(item.name, textX, textY)

              this.startDegrees = radian

              let isClickIn = false
              if (p !== undefined) {
                  isClickIn = ctx.isPointInPath(p.x, p.y);
              }
              if (isClickIn && event.type === 'click') {
                  item.click()
              }

          })
      },

      //坐标 
      getEventPosition (ev) {   

          var x, y;   

          if (ev.layerX || ev.layerX == 0) {   

              x = ev.layerX;   

              y = ev.layerY;   

          }else if (ev.offsetX || ev.offsetX == 0) { // Opera   

              x = ev.offsetX;   

              y = ev.offsetY;   

          }   

          return {x: x, y: y};   

      }, 

      // 重绘
      reDraw (event, canvas, ctx) {

        // console.log('reDraw', this.config.startRadian)

        this.startDegrees = this.config.startRadian

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //调用绘制过程
        
        this.drawSmallCircles(event, ctx);
        this.drawBigCircle(event, ctx);

      }
    },

    mounted () {
      this.init()
    }

  }

