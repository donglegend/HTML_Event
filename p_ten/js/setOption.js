var $ = require("../../components/lib/$");
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');

var myChart = echarts.init(document.getElementById('main'));
myChart.setOption({
    grid: {	
        show: true,
        top: "20%",
        bottom: "20%",
        left: "15%",
        right: "15%"
    },

    tooltip: {
        z: 2,
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                opacity: 1,
                width: 2,
                color: "#fbae17"
            }
        }
    },
    tooltip: {},
    xAxis: {
    	
        data: [],
        axisLabel: {
            show: true,
            textStyle: {
                color: '#5a7aa7'
            }
        },
        axisLine:{
       		lineStyle:{
       			color:'#5a7aa7'
       		}
       }
        
    },
    yAxis: {
    		axisLabel: {
            show: true,
            textStyle: {
                color: '#5a7aa7'
            }
       },
       axisLine:{
       		lineStyle:{
       			color:'#5a7aa7'
       		}
       }
    		
    },
    series: [{
        type: 'line',
        data: [],
        itemStyle: {

            normal: {
                color: "#5a7aa7",
                borderColor: "#5a7aa7",


            }
            
        },
        label: {
            normal: {
                show: true,
                position: 'top'
            }
        }
    }]     
});

var reqUrl = 'http://hd.yeezan.com/yz_shidian/api.php?';
reqUrl = "api/"      

$.get(reqUrl+'get_now_fans',function (data) {
	var data = data.data;
	var i = data.length;
	var xAxisDate = [];
	var seriesData = [];
	var seriesDataNew = [];
	for( var j = 0; j<i ;j++){
		 xAxisDate.push(data[j].date);
		 seriesData.push(data[j].count);
	}
	xAxisDate.reverse();
	seriesDataNew = seriesDataNew.concat(seriesData);
	seriesDataNew.sort(function(a,b){return a-b})

      // 填入数据
    myChart.setOption({
        xAxis: {
            data: xAxisDate
        },
         yAxis: {
	    		min:Number(seriesDataNew[0])-5
	    },
        series: [{
            // 根据名字对应到相应的系列
            data: seriesData.reverse()
        }]
    });
},"json");