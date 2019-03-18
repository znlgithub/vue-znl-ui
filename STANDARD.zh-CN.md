## Znl前端Vue项目开发CSS命名规范



### 1. 每个视图层（Views/Pages）下面的组件的最外层容器采用 `p + 组件名` 的方式命名，如:



通过类名快速定位一个`视图层组件`。



```
<template>
    <div class="p-distr">
       ...
    </div>
</template>
```




### 2. 每个业务组件（components）下面的组件的最外层容器采用 `m + 组件名` 的方式命名，如:



通过类名快速定位一个`业务层组件`。



```
<template>
    <div class="m-plan-list">
       ...
    </div>
</template>
```



### 2. 每个业务组件的内部元素采用 `m + 组件名+元素（Element）/修饰符（Modifier）` 的方式命名，如:



- 通过类名快速定位到具体组件以及大概位置；
- 避免类名嵌套过深的问题，在容器类下直接写一层即可



```html
<template>
    <div class="m-spplierlst">
       
      	<div class="m-spplierlst-header"
       		...
   		</div>
      
      	<div class="m-spplierlst-button"
       		
            <div class="m-spplierlst-button-active"
       			...
   			</div>
  
   		</div>
    </div>
</template>

<style scoped>
  	// 减少嵌套层级，一般最多三级
	.m-spplierlst{
      .m-spplierlst-header{}
      .m-spplierlst-button{}
      .m-spplierlst-button-active{}
	}
</style>
```



```
常用元素（Element）:

    结构类：header, main, content, footer

    文本类：txt, link,

    表单类：form, input, label

    表格类：table, cloumn, row, cell

    列表类：list, item, filed

    按钮：button
    
常用修饰符（Modifier）

    状态类：primary, success, warning, error, active

    形状类：large, big, small

    样式类：fl, center, middle, fr

    容器类：box, wrap
```



### 3. 每个组件的 style标签都需要添加 `scoped` 属性：



大部分情况下，组件样式只允许作用在该组件内，除非需要特殊修改子组件样式，否则都必须添加该属性



```
<style scoped>
    ...
</style>
```



### 4. 选择器之间的嵌套不允许超过3层, 禁止使用`标签选择器`



- 为便于代码阅读和后期维护，以及避免权重所带来的影响，大多数情况下选择器之间的嵌套不允许超过3层,特殊情况不超过5层。
- 基于 CSS 选择器的解析规则（从右向左），避免使用通用标签名作为选择器的一环可以提高 CSS 匹配性能。



```html
<!-- 不允许的写法(嵌套过深) --> 
<style scoped>
    .m-plan-list{
      .m-plan-list-header{
        .m-plan-list-title{
          .m-plan-list-span{
          }
        }
      }
    }
</style>

<!-- 不允许的写法(标签选择，消耗查找性能) --> 
<style scoped>
    .p-content{
      .p-content-list{
         li{ }
      }
    } 
</style>

编译后：
.p-content .p-content-list li {}

```



### 5. 组件/公用类的使用方法



- 全局通用样式定义在common.scss;

- 使用通用类如`clearfix`（清除浮动），`pull-left`（左浮动）等具有含义的类名;

- 使用`@extend`引用sass变量;

- 基于让 CSS 更简洁以及代码的复用考虑，建议使用 `%placeholders` 定义，使用 `@extend` 引用。

  - `%placeholders`，只是一个占位符，只要不通过 `@extend` 调用，编译后不会产生任何代码量

  - 使用 `@extend` 引用，每次调用相同的 `%placeholders` 时，编译出来相同的 CSS 样式会进行合并（反之，如果使用 `@include` 调用定义好的 `@mixin`，编译出来相同的 CSS 样式不会进行合并）

  - 这里的组件类特指那些不会动态改变的 CSS 样式，注意与那些可以通过传参生成不同数值样式的 `@mixin` 方法进行区分

    ​

### 6. css样式书写时按照定位、盒模型、样式、功能的顺序

```
<style scoped>
    .m-list {
        /* 定位 */
        position: absolute;
        left: 0;
        z-index: 10;

        /* 盒模型 */
        float: left;
        display: block;
        flex: 1;
        align-items: center;
        width: 0;
        height: 0;
        padding: 0;
        margin: 0;
        border: 0;
        outline: 0;

        /* 样式 */
        background: #fff;
        color: #fff;
        font: italic bold 12px/20px arial,sans-serif;

        /* 功能 */
        transition: all 1s;
        transform: translate(10px, 10px);
        cursor: pointer;
    }
</style>
```



### 7. 覆盖第三方组件库样式



- 所有`znl-vue-ui`组件库样式外层均以`znl-组件名`格式，大部分为1~2层，因此外部通用的项目覆盖，建立单独的`scss`文件用以全局覆盖样式，保证在组件样式后引用时以同类名覆盖即可。

  ​

```
如： 项目整体修改 znl-button 主按钮（style-type='main'）的样式

.znl-button.main {
    border: 1px solid #ED9E00;
    background-color: #ED9E00;
    color: #fff;
}
```



