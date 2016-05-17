/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
//简写getElementById（）方法为 $()
function $(id) {
    return document.getElementById(id);
}

var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

function addAqiData() {
    var city = $("aqi-city-input").value.trim();
    var data = $("aqi-value-input").value.trim();
    if (/[^A-Za-z\u4e00-\u9fa5]/.test(city)) {
        alert("城市名必须为中英文字符！");
        return false;
    } else if (/[^\d]/.test(data))  {
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
    for (var city in aqiData) {
        temp += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td><button>删除</button></td></tr>";
    }
    $("aqi-table").innerHTML = temp;
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
function delBtnHandle(target) {
    // do sth.
    var currentRow = target.parentNode.parentNode;
    var city = currentRow.cells[0].innerHTML;
    delete aqiData[city];
    renderAqiList();
}


function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    //$("add-btn").onclick = addBtnHandle;
    $("add-btn").addEventListener("click", addBtnHandle);

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var delBtn = $("aqi-table").getElementsByTagName("button");
    $("aqi-table").addEventListener("click", function(event) {
        if (event.target && event.target.nodeName.toLowerCase() === "button") {
            delBtnHandle(event.target);
        }
    });
}


init();
