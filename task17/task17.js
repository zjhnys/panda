/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/


// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};


// 用于渲染图表的数据
var chartData = {};


var aqiChart = document.getElementsByClassName('aqi-chart-wrap')[0];
// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/* 从题目中给出的示意图看，颜色应该和空气质量有关 */
function getColor(colorData) {

 /* 随机颜色   var temp = (1 - colorData / 500)
    var colors = "#" + parseInt((1 - (colorData / 500)) * 0xffffff).toString(16);
    if (colors.length < 7) {
        colors += '0';
    }*/
    if(colorData>400){
        return "black";
    }else if(colorData>300){
        return "purple";
    }else if(colorData>200){
        return "red";
    }else if(colorData>100){
        return "blue";
    }else{
        return "#90EE90";
    }
}
/**
 * 渲染图表
 */
function renderChart() {
    var temp = "";
    for (var p in chartData) {
        temp += "<div title=" + p + ":" + chartData[p] + " class=" + pageState.nowGraTime + " style='height:" + chartData[p] + "px;background:" + getColor(chartData[p]) + ";'></div>";
    }
    aqiChart.innerHTML = temp;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
    // 确定是否选项发生了变化 
    if (e.target.value == pageState.nowGraTime) {
        return false;
    } else {
        pageState.nowGraTime = e.target.value;
    }
    initAqiChartData();
    renderChart();
}
// 设置对应数据

// 调用图表渲染函数

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    pageState.nowSelectCity = this.value;
    initAqiChartData();
    renderChart();
}
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var formTime = document.getElementsByName("gra-time");
    for (var i = 0, len = formTime.length; i < len; i++) {
        formTime[i].onclick = graTimeChange;
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    var cityList = document.getElementById("city-select");
    cityList.innerHTML = "";
    var temp = "<option id='-1'>--请选择城市--</option>";
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    for (var city in aqiSourceData) {
        temp += "<option id='" + city + "'>" + city + "</option>";
    }
    cityList.innerHTML = temp;
    /*给select设置事件，当选项发生变化时调用函数citySelectChange*/
    cityList.addEventListener('change', citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    var city = pageState.nowSelectCity;
    var time = pageState.nowGraTime;
    if (city == -1) {
        alert("请选择城市");
    }
    var tempData = aqiSourceData[city];
    if (time === "day") {
        chartData = tempData;
    }
    if (time === "week") {
        chartData = {};
        var weekData = 0,
            count = 0,
            weeks = 0;
        for (var d in tempData) {
            weekData += tempData[d];
            count++;
            if ((new Date(d)).getDay() == 0) {
                weeks++;
                chartData["第" + weeks + "周"] = Math.round(weekData / count);
                weekData = 0;
                count = 0;
            }
        }
        if (count > 0) {
            chartData["第" + (weeks + 1) + "周"] = Math.round(weekData / count);
        }
    }
    if (time === "month") {
        chartData = {};
        var total = 0,
            count = 0,
            month = 0;
        for (var d in tempData) {
            total += tempData[d];
            count++;
            if ((new Date(d)).getMonth() != month) {
                month++;
                chartData[month + "月"] = Math.round(total / count);
                total = 0;
                count = 0;
            }
            chartData[month+1 + "月"] = Math.round(total / count);
        }
        
    }
    // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
}

init();
