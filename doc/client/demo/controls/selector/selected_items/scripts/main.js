define('main', ['rd.controls.Selector', 'rd.controls.FoldSelector', 'rd.controls.BasicSelector'], function() {
    var app = angular.module("rdk_app", ['rd.controls.Selector', 'rd.controls.FoldSelector', 'rd.controls.BasicSelector']);
    app.controller('myCtrl', ['$scope', '$timeout', 'EventService', 'EventTypes', function(scope, $timeout, EventService, EventTypes) {

        scope.groupData = {
            "title1": [{ id: 0, label: "江苏省" }, { id: 1, label: "浙江省" }],
            "title2": [{ id: 2, label: "广东省" }, { id: 3, label: "广西省" },
                { id: 4, label: "河北省" }, { id: 5, label: "河南省" }
            ]
        };

        scope.groupSelectedItems = {
            "title1": [{ id: 0, label: "江苏省" }, { id: 1, label: "浙江省" }],
            "title2": [{ id: 2, label: "广东省" }]
        };


        scope.changeHandler = function(event, data) {
            console.log(scope.groupSelectedItems);
        }

        scope.clickHandler = function(){
            scope.groupSelectedItems = {
                "title1": [{ id: 0, label: "江苏省" }, { id: 1, label: "浙江省" }],
                "title2": [{ id: 2, label: "广东省" }, { id: 4, label: "河北省" }]
            };
        }

        EventService.register('test4selector', EventTypes.CHANGE, function(event, data){
            console.log(scope.groupSelectedItems);
        });
    }]);
});
