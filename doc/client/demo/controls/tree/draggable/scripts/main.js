define('main', ['rd.controls.Tree'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Tree','rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function($scope) {
    	$scope.isDrag = false;
    	$scope.toggleDraggable = function(){
    		$scope.isDrag = !$scope.isDrag;
    		if($scope.isDrag){
    			alert("可以拖拽节点！");
    		}else{
    			alert("节点被冻结！");
    		}
    	}
    }]);
});