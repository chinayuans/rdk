define('main', ['rd.controls.BasicSelector'], function() {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.BasicSelector']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function(scope) {

            scope.cityData = [
                { id: 0, label: "江苏省" },
                { id: 1, label: "浙江省" },
                { id: 2, label: "广东省" },
                { id: 3, label: "广西省" },
                { id: 4, label: "河北省" },
                { id: 5, label: "河南省" },
                { id: 6, label: "湖北省" },
                { id: 7, label: "湖南省" },
                { id: 8, label: "新疆省" },
                { id: 9, label: "四川省" }
            ];

            scope.validateByFun = function(val) {
                var reg = new RegExp('^[1-9]\\d{0,2}$');
                return reg.test(val);
            }
        }

    ]);
});
