const layoutMixins = {
  methods: {
    updateColumnsWidth() {
      // if (Vue.prototype.$isServer) return;
      const fit = true;
      let bodyWidth = this.$el.clientWidth;
      let bodyMinWidth = 0;
    
      const flattenColumns = this.columns;
      let flexColumns = flattenColumns.filter((column) => typeof column.width !== 'number');
    
      flattenColumns.forEach((column) => { // Clean those columns whose width changed from flex to unflex
        if (typeof column.width === 'number' && column.realWidth) column.realWidth = null;
      });
      if (flexColumns.length > 0 && fit) {
        flattenColumns.forEach((column) => {
          bodyMinWidth += column.width || column.minWidth || 80;
        });
    
        const scrollYWidth = 0;
    
        if (bodyMinWidth <= bodyWidth - scrollYWidth) { // DON'T HAVE SCROLL BAR
          // this.scrollX = false;
    
          const totalFlexWidth = bodyWidth - scrollYWidth - bodyMinWidth;
          // console.log('计算值totalFlexWidth',  bodyWidth, scrollYWidth, bodyMinWidth)
          if (flexColumns.length === 1) {
            flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth;
          } else {
            // const allColumnsWidth = flexColumns.reduce((prev, column) => {
            //   return prev + (column.visible === false ? 0 : (column.minWidth || 80))
            // }, 0);
            const showlength = flexColumns.filter(item => {
              return item.visible !== false
            }).length
            const allColumnsWidth = showlength * (80)
            const selectWidth = this.isMultiRowsCheck ? (this.type === 'erp' ? 25 : 50) : 0
            bodyWidth = bodyWidth - selectWidth
            const flexWidthPerPixel = totalFlexWidth / allColumnsWidth;
            // console.log('计算值', totalFlexWidth, allColumnsWidth, flexWidthPerPixel)
            // let noneFirstWidth = 0;
    
            flexColumns.forEach((column, index) => {
              // if (index === 0) return;
              const flexWidth = Math.floor((column.minWidth || 80) * flexWidthPerPixel);
              // noneFirstWidth += flexWidth;
              // column.realWidth = (column.minWidth || 80) + flexWidth;
              column.realWidth = bodyWidth / showlength;
              // console.log('column.realWidth', column.realWidth, bodyWidth, showlength)
            });
            // console.log('flexColumns', flexColumns);
    
            // flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth - noneFirstWidth;
          }
        } else { // HAVE HORIZONTAL SCROLL BAR
          this.scrollX = true;
          flexColumns.forEach(function (column) {
            column.realWidth = column.minWidth;
          });
        }
    
        this.bodyWidth = Math.max(bodyMinWidth, bodyWidth);
        // this.table.resizeState.width = this.bodyWidth;
      } else {
        flattenColumns.forEach((column) => {
          if (!column.width && !column.minWidth) {
            column.realWidth = 80;
          } else {
            column.realWidth = column.width || column.minWidth;
          }
          bodyMinWidth += column.realWidth;
        });
        this.scrollX = bodyMinWidth > bodyWidth;
    
        this.bodyWidth = bodyMinWidth;
      }
    
      // const fixedColumns = this.store.states.fixedColumns;
    
      // if (fixedColumns.length > 0) {
      //   let fixedWidth = 0;
      //   fixedColumns.forEach(function (column) {
      //     fixedWidth += column.realWidth || column.width;
      //   });
    
      //   this.fixedWidth = fixedWidth;
      // }
    
      // const rightFixedColumns = this.store.states.rightFixedColumns;
      // if (rightFixedColumns.length > 0) {
      //   let rightFixedWidth = 0;
      //   rightFixedColumns.forEach(function (column) {
      //     rightFixedWidth += column.realWidth || column.width;
      //   });
    
      //   this.rightFixedWidth = rightFixedWidth;
      // }
    
      // this.notifyObservers('columns');
    }
  }
}
export {
  layoutMixins
}