export default  {
    title: {
        text: '',
        align: 'left',
        x: 0, //center
        style: {
            'font-size': '18px',
            'margin-right': '15px',
            'color': '#4D4D4D',
            'font-weight': 'Bold',
            'font-family': 'Tahoma, Arial ,"Microsoft YaHei"',
            'padding': '0 5px'
        }
    },
    chart: {
        type: 'line', // column垂直柱状 bar水平柱状
        height: '800px',
        borderWidth: 0,
        backgroundColor: '#f2f2f2', 
        animation: true,
    },
    subtitle: {
        text: '',
        x: -20
    },
    xAxis: { // 横坐标配置
        title: {
        text: 'year'
        },
        categories: []
    },
    yAxis: { // 纵坐标配置
        title: {
        text: ''
        },
        plotLines: [{ // 标识线
        value: 23,
        width: 0,
        color: '#808080'
        }]
    },
    tooltip: { 
        valueSuffix: '' // 数据显示单位
    },
    legend: {  // 图例
        layout: 'vertical', // 排列方式，垂直。 默认：horizontal 水平
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: []

}