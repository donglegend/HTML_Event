/**
 * 地图option
 * @type {Object}
 */
var mapOption = {
    title: {

    },
    tooltip: {
        show: false
        // trigger: "item",
        // formatter: function(params, ticket, callback) {
        //     var name = params.name || "其他";
        //     var v = params.value ? (Number(params.value) / 10) + "%" : "暂无数据";
        //     return name + ":  " + v;
        // }
    },
    dataRange: {
        min: 0,
        max: 100,
        show: false,
        color: ["#c35797", "#8c6cc3", "#5084ea", "#67b2ea"]
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {
                readOnly: false
            },
            restore: {},
            saveAsImage: {}
        }
    },
    series: [{
        name: 'mpfans',
        type: 'map',
        mapType: 'china',
        roam: false,
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false
            }
        },
        itemStyle: {
            normal: {
                areaColor: "#ccc",
                borderColor: "#000"
                // opacity: 0
            },
            emphasis: {
                areaColor: "#e56ae9",
                opacity: 0.3
            }
        },
        data: [],
        left: "5%"

    }]
};


var barOption = {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
            alignWithLabel: true
        }
    }],
    yAxis: [{
        type: 'value'
    }],
    series: [{
        name: '直接访问',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330]
    }]
};


module.exports = {
    mapOption: mapOption,
    barOption: barOption
}