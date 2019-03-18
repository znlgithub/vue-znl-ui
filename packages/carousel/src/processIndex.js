export const PROCESSINDEX = (config) => {
  if (config.itemCount === config.length) {
    return config.index
  }
  let isProcessMore = config.length - config.itemCount >= 3
  if (config.itemCount === 1) {
    if (config.activeIndex === 0 && config.index === config.length - 1) {
      return -1;
    } else if (config.activeIndex === config.length - 1 && config.index === 0 ) {
      return config.length;
    } 
  } else if (config.itemCount === 2) {
    if (config.activeIndex === 0 && config.index === config.length - 1) {
      return -1;
    } else if (config.activeIndex === config.length - 1 && config.index === 0 ) {
      return config.length;
    } else if (config.activeIndex === config.length - 1 && config.index === 1 ) {
      return config.length + 1;
    }else if (config.activeIndex === config.length - 2 && config.index === 0 ) {
      return config.length;
    } 
  } else if (config.itemCount === 3) {
    if (config.activeIndex === 0 && config.index === config.length - 1) {
      return -1;
    } else if (config.activeIndex === 0 && config.index ===config.length - 2 ) {
      return -2;
    } else if (config.activeIndex === 1 && config.index ===config.length - 1 ) {
      return -1;
    } else if (config.activeIndex === config.length - 2 && config.index === 0 ) {
      return config.length;
    } else if (config.activeIndex === config.length - 1 && config.index === 0 ) {
      return config.length;
    } else if (config.activeIndex === config.length - 1 && config.index === 1 ) {
      return config.length + 1;
    }   
  } else if (config.itemCount === 4) {
    // console.log(config.activeIndex, config.index)
    if (config.activeIndex === 0 && config.index === config.length - 1) {
      return -1;
    } else if (config.activeIndex === 0 && config.index === config.length - 2) {
      return -2;
    } else if (config.activeIndex === 1 && config.index === config.length - 1) {
      return -2;
    } else if (config.activeIndex === config.length - 2 && config.index === 0 ) {
      return config.length;
    }else if (config.activeIndex === config.length - 2 && config.index === 1 ) {
      return config.length + 1;
    } else if (config.activeIndex === config.length - 3 && config.index === 0 ) {
      return config.length;
    } else if (config.activeIndex === config.length - 1 && config.index === 0 ) {
      return config.length;
    } else if (config.activeIndex === config.length - 1 && config.index === 1 ) {
      return config.length + 1;
    } else if (config.activeIndex === config.length - 1 && config.index === 2 ) {
      return config.length + 2;
    }  
  } else if (config.itemCount === 5) {
    if (config.activeIndex === 0 && config.index === config.length - 1) {
      return -1;
    } else if (config.activeIndex === 0 && config.index === config.length - 2) {
      return -2;
    } else if (config.activeIndex === 0 && config.index === config.length - 3 && isProcessMore) {
      return -3;
    } else if (config.activeIndex === 1 && config.index === config.length - 1) {
      return -1;
    } else if (config.activeIndex === 1 && config.index === config.length - 2 && isProcessMore) {
      return -2;
    } else if (config.activeIndex === 2 && config.index === config.length - 1 && isProcessMore) {
      return -1;
    } else if (config.activeIndex === 2 && config.index === config.length - 2 && isProcessMore) {
      return -2;
    } else if (config.activeIndex === config.length - 3 && config.index === 0  && isProcessMore) {
      return config.length;
    } else if (config.activeIndex === config.length - 2 && config.index === 0) {
      return config.length;
    } else if (config.activeIndex === config.length - 2 && config.index === 1) {
      return config.length + 1;
    }else if (config.activeIndex === config.length - 1 && config.index === 0 ) {
      return config.length;
    } else if (config.activeIndex === config.length - 1 && config.index === 1) {
      return config.length + 1;
    } else if (config.activeIndex === config.length - 1 && config.index === 2  && isProcessMore) {
      return config.length + 2;
    } else if (config.activeIndex === config.length - 1 && config.index === 3  && isProcessMore) {
      return config.length + 3;
    }
  }
  return config.index
}

export const PROCESSANIMATING = (config) => {
  let oldOther = config.oldIndex - 1 < 0 ? config.length - 1 : config.oldIndex - 1
  let activeOther = config.activeIndex - 1 < 0 ? config.length - 1 : config.activeIndex - 1
  
  let activeAdd = config.activeIndex + 1 > config.length - 1 ? 0 : config.activeIndex + 1
  let activeAdd_1 = config.activeIndex + 1 > config.length - 1 ? 1 : config.activeIndex + 1
  let activeAdd5 = config.activeIndex + 2 > config.length - 1 ? 0 : config.activeIndex + 2
  let activeAdd_2 = config.activeIndex + 2 > config.length - 1 ? 1 : config.activeIndex + 2
  let activeOther5 = config.activeIndex - 2 < 0 ? config.length - 1 : config.activeIndex - 2

  let oldAdd = config.oldIndex + 1 > config.length - 1 ? 0 : config.oldIndex + 1
  let oldAdd5 = config.oldIndex + 2 > config.length - 1 ? 0 : config.oldIndex + 2
  let oldOther5 = config.oldIndex - 2 < 0 ? config.length - 1 : config.oldIndex - 2
  let oldOther_2 = config.oldIndex - 2 < 0 ? config.length - 2 : config.oldIndex - 2

  let isProcessMore = config.length - config.itemCount >= 3
  // 判断加过渡的子组件
  if (config.itemCount <= 2) {
    return (
      config.index === config.activeIndex 
      || config.index === config.oldIndex 
      || config.index === activeAdd 
      || config.index === oldAdd
    )
  } else if (config.itemCount === 3) {
    return(
      config.index === config.activeIndex 
        || config.index === config.oldIndex 
        || config.index === activeAdd 
        || config.index === oldOther 
        || config.index === activeOther 
        || config.index === oldAdd
    )
  } else if (config.itemCount === 4) {
    return(
      config.index === config.activeIndex 
        || config.index === config.oldIndex 
        || config.index === activeAdd 
        || config.index === oldOther 
        || config.index === activeAdd5 
        || config.index === activeAdd_1
        || config.index === activeOther 
        || config.index === oldAdd
        || config.index === oldAdd5
    )
  } else if (config.itemCount >= 5) {
    return (
      config.index === config.activeIndex 
      || config.index === config.oldIndex 
      || config.index === activeAdd 
      || ((config.index === activeAdd_1)  && isProcessMore)
      || config.index === oldOther 
      || config.index === activeOther 
      || config.index === oldAdd 
      || ((config.index === activeAdd5))
      || ((config.index === oldOther5))
      || ((config.index === activeOther5) && isProcessMore)
      || ((config.index === oldAdd5) && isProcessMore)
      || ((config.index === oldOther_2))
    )
  } else {
    return (
      config.index === config.activeIndex 
      || config.index === config.oldIndex
    )
  }
}