(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Graph'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'DataSourceService', 'EventService', main];
    function main(scope, DataSourceService, EventService) {
        scope.graphData = {
            rowDescriptor: ['最高气温', '最低气温'],
            header: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            data: [
                [11, 13, 15, 18, 15, 12, 10],
                [1, 4, 6, 4, 9, 6, 3]
            ]
        };
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();