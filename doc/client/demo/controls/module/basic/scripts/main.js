
require.config({
    paths: {
        //给sample_module的控制器url定义一个别名
        "sample_module": '/doc/client/demo/controls/module/basic/template/sample_module',
    }
});

//sample_module是在paths中定义的控制器url的别名，放在define函数中就可以让RDK去下载这个文件。
//类似的，rd.controls.Module是rdk_module的别名，由RDK预定义好，
//放在define函数中，好让RDK也去下载rdk_module的定义文件。
define('main', ['rd.controls.Module', 'sample_module'], function() {
    //注入'rd.controls.Module'的依赖，在index.html中，只用到了rdk_module控件，
    //因此这里只需要注入对这个控件的依赖就好，模块内部的依赖由定义module的时候去声明
    //这样代码就有更好的内聚性。
    rdk.$injectDependency(['rd.controls.Module']);

    // 创建主控制器，主控制器所有所有子控制器的共同祖先。
    // 子控制器可以直接访问这个控制器中的方法和属性
    rdk.$ngModule.controller('rdk_ctrl', ['$scope', function(scope) {
        // 注意到module2在定义的时候，没有给initData属性，因此module2在访问data属性的时候，
        // 实际上是使用了这里的data属性。这是因为这个data属性被定义在所有module的父控制器中。
        // 相反的，module1由于通过initData自定义了一个data属性，RDK会优先读取自子控制器中的
        // data属性的值。
        // 这个过程和OOP的继承非常类似。
        scope.data = 'defined in the root controller';

        scope.hello = function() {
            //访问SampleModule中的数据。
            //每个模块都有一个child属性，值是当前模块所绑定的控制器一个实例。
            //如果当前模块未绑定控制器，则child属性的值为null
            console.log(rdk.module1.child.someData);

            //调用SampleModule中的方法
            rdk.module1.child.hello('module1');
        }
    }]);
});
