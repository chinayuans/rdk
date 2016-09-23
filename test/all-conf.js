exports.config = {
    //出现过11秒页面载入没完成时候，改为15秒
    allScriptsTimeout: 15000,

    specs:['e2e/testjs/*.js'],


    multiCapabilities: [
        {
            browserName: 'firefox'
        }, 
        {
            browserName: 'chrome'
        }
    ],

    baseUrl: 'http://localhost:8080/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 50000000
    },

    ignoreSynchronization: true,

    onPrepare: function() {
        require('jasmine-reporters');
         var capsPromise = browser.getCapabilities();
                capsPromise.then(function(caps){
                    var browserName = caps.caps_.browserName.toUpperCase();
                    var browserVersion = caps.caps_.version;
                    var prePendStr = browserName + "-" + browserVersion + "-";
                    jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter("report/e2e", true, true,prePendStr));
        });
    }
};