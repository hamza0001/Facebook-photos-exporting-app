myApp.config(function($stateProvider){
    var sucess={
        name:'sucess',
        url:'/',
        templateUrl:'/done.html'
    };
    var main={
        name:'main',
        url:'/api',
        templateUrl:'/main.html'
    };

    var albums={
        name:'albums',
        url:'/albums',
        templateUrl:'/albums.html',
        resolve:{
            deps:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    name:'myApp',
                    files:[
                            'static/js/service/PhotoService.js',
                            'static/js/controller/PhotoController.js'
                          ]
                     }
                ])
            }]
        }
    };
    var photos={
        name:'photos',
        url:'/photos/:albumID',
        params: {
            albumName: null
        },
        templateUrl:'/photos.html',
        resolve:{
            deps:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    name:'myApp',
                    files:[
                            'static/js/service/PhotoService.js',
                            'static/js/controller/PhotoController.js'
                          ]
                     }
                ])
            }]
        }        
    }

    $stateProvider.state('main',main);
    $stateProvider.state('main.albums',albums);
    $stateProvider.state('main.photos',photos);
    $stateProvider.state('main.sucess',sucess);
});