define('main', ['rd.controls.FoldSelector'], function() {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.FoldSelector']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function(scope) {

            scope.allItems = [
                { id: 0, label: "江苏省" },
                { id: 1, label: "浙江省" },
                { id: 2, label: "广东省" },
                { id: 3, label: "广西省" },
                { id: 4, label: "河北省" },
                { id: 5, label: "河南省" },
                { id: 6, label: "湖北省" },
                { id: 7, label: "湖南省" },
                { id: 8, label: "新疆省" },
                { id: 9, label: "四川省" },
            ];

            scope.dimSelectedItems = [
                { id: 3, label: "广西省" },
                { id: 7, label: "湖南省" },
                { id: 4, label: "河北省" },
            ];

            scope.raiseErrorAct = function(event, info) {
                var errorCode = info.code;
                var errorMsg = '';
                if (errorCode == 101) {
                    errorMsg = '【自定义error】选择条目不可为空！';
                } else if (errorCode == 102) {
                    errorMsg = '【自定义error】至少选择2条信息！';
                } else {
                    errorMsg = '【自定义error】其它异常！';
                }
                console.log('异常码:' + info.code + ';\n自定义异常信息：' + errorMsg + ';\n控件返回异常信息：' + info.message);
            }
        }

    ]);
});
