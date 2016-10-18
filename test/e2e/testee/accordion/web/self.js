define('main', ['application', 'blockUI','rd.controls.BasicSelector','rd.controls.Selector',
  'rd.controls.FoldSelector','rd.containers.Accordion','rd.controls.Input','rd.controls.Table',
  'rd.controls.TabSelect','rd.controls.ComboSelect','rd.controls.TabSelector','rd.controls.Graph',
  'rd.containers.Tab','rd.controls.Map'],
function(application) {
// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.core', 'blockUI','rd.controls.BasicSelector','rd.controls.Selector',
  'rd.controls.FoldSelector','rd.containers.Accordion','rd.controls.Input','rd.controls.Table',
  'rd.controls.TabSelect','rd.controls.ComboSelect','rd.controls.TabSelector','rd.controls.Graph',
  'rd.containers.Tab','rd.controls.Map']);
app.config(['blockUIConfig', function(blockUIConfig) {
    // blockUI默认只要有ajax请求在进行，就会自动启动，阻止页面响应鼠标事件
    // 使用下面代码可以阻止自动模式，启用手动模式
    // blockUIConfig.autoBlock=false
    // 然后在需要阻止页面相应鼠标事件的时候，使用下面代码
    // blockUI.start();
    // 在需要继续相应页面相应鼠标事件的时候，使用下面代码
    // blockUI.stop();

    // blockUI的详细用法参考 https://github.com/McNull/angular-block-ui
    blockUIConfig.template = '<div class="block-ui-message-container">\
                                  <img src="images/loding.gif" />\
                              </div>';
}]);

// 创建一个控制器
app.controller('rdk_ctrl', ['$scope' ,'DataSourceService', 'blockUI','EventService','EventTypes',
  
function(scope,DSService, blockUI,EventService,EventTypes) {
application.initDataSourceService(DSService);
/************************ 应用的代码逻辑开始 ************************/
scope.accordion={
  caption:'child',
  isOpen:false,
  buttons:[],
  frozen:false,
  editable:false,
  direction:'top'
};
scope.isOpen=scope.accordion.isOpen;
scope.child=111;
scope.addButton=function(){
  if(scope.accordion.buttons.length==0){
      scope.accordion.buttons=[{
        icon:'images/delete.png',
        label:'删除',
        callback:function(obj){
          console.log(obj);
        }
      },{
        icon:'images/refresh.png',
        label:'刷新',
        callback:function(obj){
          if(scope.isNewico){
              scope.foldedIcon = "fa fa-arrow-circle-down";
              scope.unfoldedIcon = "fa fa-arrow-circle-up";
          }else {
              scope.foldedIcon = "fa fa-angle-double-down";
              scope.unfoldedIcon = "fa fa-angle-double-up";
          }
          scope.isNewico=!scope.isNewico;
        }
      },{
        icon:'images/frozen.png',
        label:'冻结',
        callback:function(obj){
          scope.accordion.frozen=!scope.accordion.frozen;
        }
      },{
        icon:'images/edit.png',
        label:'编辑',
        callback:function(obj){
          scope.accordion.editable=!scope.accordion.editable;
        }
      }
    ];
  }else{
    scope.accordion.buttons=[];
  }
}
//
scope.isNewico=true;
scope.foldedIcon = "fa fa-angle-double-down";
scope.unfoldedIcon = "fa fa-angle-double-up";
//
scope.$watch('isOpen',function(newV,oldV){
  if(newV!=oldV){
    scope.isOpen=newV;
  }
});
//expand direction
scope.setExpandDirecttion=function(direction){
  scope.accordion.direction='bottom';
};
/************************ 应用的代码逻辑结束 ************************/
}]);

/********************************************************************
          应用如果将代码写在此处，可能会导致双向绑定失效
                需要手工调用 scope.$apply() 函数
          若非有特别的需要，否则请不要将代码放在这个区域
 ********************************************************************/

});

/********************************************************************
                       这个区域不要添加任何代码
 ********************************************************************/
