define(['rd.core', 'css!rd.styles.Scroller', 'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'],
    function() {
        var scrollerApp = angular.module("rd.controls.Scroller", ['rd.core']);

        scrollerApp.directive('rdkScroller', ['Utils', 'EventService', 'EventTypes', '$timeout', '$compile', function(Utils, EventService, EventTypes, $timeout, $compile) {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {
                    data: '=?',
                    pageNum: '@?',
                    scrollPolicy: '@?',
                    timeout: '@?',
                    loop: '@?',
                   
                },
                //要想ng-repeat开始的时候不编译，这样才能使用其中的数组项
                // terminal: true,

                controller: ['$scope', function(scope) {
                    
                }],
                template: '<div class="slider" > \
                            <div class="slide" rdk-repeat="item in data"  > \
                            </div> \
                            <div class="arrows"> \
                                <div ng-class="{\'left_deny\':left_deny,\'left_arrow\':left_arrow}">  \
                                  <i class="fa fa-angle-left" ng-click="prev()"></i>\
                                </div> \
                                <div ng-class="{\'right_deny\':right_deny,\'right_arrow\':right_arrow}"> \
                                  <i class="fa fa-angle-right" ng-click="next()"></i>\
                                </div> \
                            </div> \
                           </div>',

                compile: function(tEle, tAttrs) {
                        Utils.bindDataSource(tAttrs, 'data', 'ds');
                        return {
                            post: _link
                        }
                    }
                    // templateUrl:'templates/templateurl.html'                                  
            }

            function _link(scope, elem, attrs, ctrl, transclude) {

                //如果pageNum未配置，默认为1
                scope.pageNum = Utils.getValue(scope.pageNum, attrs.pageNum, 1);
                //获取超时时间
                timeout= Utils.getValue(scope.timeout, attrs.timeout, 5000);
                //判断是否循环轮播，默认为true
                scope.loop = Utils.isTrue(scope.loop, true);
                //appScope 为获取父元素
                scope.appScope = Utils.findAppScope(scope);
                //scrollstatus:1-click,2-timer,3-都支持，默认3

                scope.left_arrow=true;
                scope.right_arrow=true;

           
                // if (!attrs.hasOwnProperty('data')) {
                //     attrs.data = attrs.ds;
                // }
               
                
                

                var scrollstatus;

                //获取轮播策略
                scope.scrollPolicy = Utils.getValue(scope.scrollPolicy, attrs.scrollPolicy, 'manual,timer');

                if (scope.scrollPolicy.indexOf('manual') != -1) {
                    scrollstatus |= 0x1;
                }
                if (scope.scrollPolicy.indexOf('timer') != -1) {
                    scrollstatus |= 0x2;
                }
                   
                if(scrollstatus & 2 && !(scrollstatus & 1)){
                    elem.find(".arrows").remove();
                }
                scope.showdata = []; //存储需要显示的数据

                scope.$watch('data', function(newVal, oldVal) {
                    if (scope.data && scope.data.length > 0) {    
                        scope.data.forEach(function(item){
                        scope.showdata.push(item);
                    })
                    }
                    
                }, true);
                

                var parentEle = elem.find(".slide");
                var elements = [];

                //对data数据进行监控，发生变化时，清空elements，并重新绑定数据
                scope.$watch('showdata', function(newVal, oldVal) {
                    if (elements.length > 0) {
                        for (var i = 0; i < elements.length; i++) {
                            elements[i].el.remove();
                            elements[i].scope.$destroy();
                        }
                        elements = [];
                    }
                    bindData();
                }, true);


                //将元素和scope进行绑定
                var bindData = function() {
                    for (var i = 0; i <  scope.pageNum; i++) {
                        var newScope = scope.$new();

                        newScope.item = scope.showdata[i];

                        transclude(newScope, function(clone) {
                            // var subclone=clone[0].innerHTML; 
                            //创建div
                            var div = $('<div></div>');
                            div.attr('class', 'context');
                            var newclone = div.append(clone);
                            parentEle.append(newclone);

                            var element = {};
                            element.el = newclone;
                            element.scope = newScope;
                            element.scope.$on('$destroy', function() {

                                console.log('被移除')
                            });
                            elements.push(element);
                        });
                        // $compile(elements)(scope);                      
                    }
                };

                  //对数据项进行右移，并赋值给showdata数组
                scope.next = function() {

                    var count = scope.data.length; //图片总数量
                    //如果设置loop为false，则轮询到最后一个，则灰化右箭头
                    if (scope.loop=='false' && scope.showdata[scope.pageNum-1]==scope.data[count-1]){
                        console.log('no need to move right!');
                        // $(elem.find('.right_arrow')).css('color', "#E0E0E0");
                        scope.right_deny=true;

                    }
                    else{
                        if (scope.left_deny){
                            scope.left_deny=false;
                            scope.left_arrow=true;
                        }
                        
                        var tmp=scope.showdata[0];
                        for (var i = 0; i < count - 1; i++) {
                            scope.showdata[i] = scope.showdata[i + 1];
                        }
                        scope.showdata[count - 1] = tmp;

                    }

                    
                };

                //对数据项进行左移，并赋值给showdata数组
                scope.prev = function() {
                    var count = scope.data.length; //图片总数量
                    if (scope.loop=='false' && scope.showdata[0]==scope.data[0]){
                        console.log('no need to move left!');
                        // $(elem.find('.left_arrow')).css('color', "#E0E0E0");
                        scope.left_deny=true;

                    }

                    else{
                        if (scope.right_deny){
                            scope.right_deny=false;
                            scope.right_arrow=true;
                        }
                        var tmp=scope.showdata[count - 1]
                        for (var i = count - 1; i > 0; i--) {
                            scope.showdata[i] = scope.showdata[i - 1];
                        }
                        scope.showdata[0] = tmp;
                    }
                    

                };

                var timer;

                var sliderFunc = function() {
                    timer = $timeout(function() {
                        scope.next();
                        // bindData();
                        console.log("timeout,perform again")
                        timer = $timeout(sliderFunc, timeout);
                    }, timeout);
                };
                if(scrollstatus&2){
                  sliderFunc();
                }


                scope.$on('$destroy', function() {
                    $timeout.cancel(timer);
                });
            }

        }])
    });
