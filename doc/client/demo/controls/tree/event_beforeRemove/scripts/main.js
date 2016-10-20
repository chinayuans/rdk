define('main', ['rd.controls.Tree'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Tree','rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', function($scope, EventService, EventTypes) {

        $scope.reFun=function(treeId, treeNode){
        	return confirm("确认删除 节点 -- " + treeNode.label + " 吗？");
        }
        //也可以直接监听
        EventService.register('testZtree', "before_remove", function(event, data){
            console.log(data);
        });

    }]);
});
