define('main', [
    'rd.services.DataSourceService', 'rd.services.EventService',
    'rd.services.Utils', 'rd.attributes.ds',
], function() {

// 创建一个RDK的应用
var app = angular.module("rdk_app", [
    'rd.services.DataSourceService', 'rd.services.EventService',
    'rd.services.Utils', 'rd.attributes.ds',
]);
// 创建一个控制器
app.controller('rdk_ctrl', ['$scope', 'DataSourceService', function(scope, DataSourceService) {
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/

    //当这个处理器被执行时，ds_user和ds_city的值已经准备好了
    //这里可以放心的去访问他们
    scope.showUserCity = function(data) {
        //先将ds_user和ds_city处理成一个map
        var usrInfo = {};
        var ds_user = DataSourceService.get('ds_user');
        angular.forEach(ds_user.data, function(value, key) {
            usrInfo[value.id] = value.name;
        });

        var cityInfo = {};
        var ds_city = DataSourceService.get('ds_city');
        //由于ds_city的结果在实例2中已经被我们转为了字符串了，这里难以解析
        //数据源的rawData属性是未经过dataProcessor处理过的，因此使用rawData更方便
        angular.forEach(ds_city.rawData, function(value, key) {
            cityInfo[value.areaCode] = value.name;
        });

        //最后再处理一下用户和城市，转成一个字符串
        var result = '';
        angular.forEach(data, function(value, key) {
            result += usrInfo[value.user] + ' 来自于 ' + cityInfo[value.city] + '; ';
        });
        return result.trim();
    }
}

]);
});
