define('main', ['angular', 'rd.controls.ComboSelect', 'rd.controls.BasicSelector', 'rd.containers.Accordion'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Accordion',
        'rd.controls.ComboSelect',
        'rd.controls.BasicSelector'
    ]);

    myApp.controller('myCtrl', ['$scope', 'RDKConst', 'BasicSelector', 'EventService', 'EventTypes', function(scope, RDKConst, BasicSelector, EventService, EventTypes) {
        scope.allItems = [{
            id: 0,
            label: "江苏省"
        }, {
            id: 1,
            label: "浙江省"
        }, {
            id: 2,
            label: "河南省"
        }, {
            id: 3,
            label: "湖北省"
        }, ];

        EventService.register('selectorID', EventTypes.CHANGE, function(event, data){
            var str = data[0].label;
            EventService.broadcast('comboID', EventTypes.CHANGE, str);
        });

    }]);
});
