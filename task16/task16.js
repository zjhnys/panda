/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

function $(id) {
    return document.getElementById(id);
}

var aqiData = {};
var cityInp = $("aqi-city-input");
var dataInp = $("aqi-value-input");
var addBtn = $("add-btn");
var aqiTable = $("aqi-table");

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

function addAqiData() {
    var city = cityInp.value.trim();
    var data = dataInp.value.trim();
    var reCity = /[^A-Za-z\u4e00-\u9fa5]+/g;
    var reData = /\D|\s/g;
    if (city && city.match(reCity)) {
        alert("城市名必须为中英文字符！");
        return false;
    } else if (!data || data.match(reData)) {
        alert("空气质量指数必须为整数！");
        return false;
    } else {
        aqiData[city] = data;
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var temp = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
     for(var p in aqiData){
        temp+="<tr><td>" + p +"</td><td>" + aqiData[p] + "</td><td><button>删除</button></td></tr>";
    }
    aqiTable.innerHTML = temp;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
//  */
function delBtnHandle() {
    // do sth.
    delete aqiData;
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    addBtn.onclick = addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
