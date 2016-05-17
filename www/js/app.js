// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var app = angular.module('starter', ['ionic', 'starter.controllers','firebase','cfp.loadingBar','ionic.contrib.drawer','angular-preload-image','infinite-scroll','ngCordova']);


app.run(function($ionicPlatform,$rootScope,$ionicPopup,$q, $http, $rootScope, $location, $window, $timeout,RequestsService) {

    
            $rootScope.$on("$locationChangeStart", function(event, next, current){
                $rootScope.error = null;
                console.log("Route change!!!", $location.path());
                var path = $location.path();
                
                
                console.log("App Loaded!!!");
            });
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }





        
    });

  

   $ionicPlatform.registerBackButtonAction(function (event) {
  
    event.preventDefault(); 
     if ($state.current.name == "app.main") {
            var action= confirm("Do you want to Exit?");
             if(action){
                navigator.app.exitApp();
              }
      
      }else{
            $ionicHistory.nextViewOptions({
                 disableBack: true
                });
        $state.go('app.main');

     }
    }

  , 100);

})


app.constant('WeatherAPI', {
  url: 'http://noah.dost.gov.ph/four_day_forecast/'
})


app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);
    $httpProvider.defaults.useXDomain = true;
$httpProvider.defaults.withCredentials = true;
delete $httpProvider.defaults.headers.common["X-Requested-With"];
$httpProvider.defaults.headers.common["Accept"] = "application/json";
$httpProvider.defaults.headers.common["Content-Type"] = "application/json";

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })


    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.weather',{
        url: '/weather',
        views: {
            'menuContent': {
                templateUrl: 'templates/weather.html',
                controller: 'WeatherCtrl'
            }


        }
    })

    .state('app.traffic',{
        url: '/traffic',
        views:{
            'menuContent': {
                templateUrl: 'templates/traffic.html',
                controller:'TrafficCtrl'
            }
        }
    })

    .state('app.about',{
        url: '/about',
        views:{
            'menuContent': {
                  templateUrl: 'templates/aboutcontent.html',
                controller:"AboutCtrl"
            }
        }
    })

  
    .state('app.tourism',{
        url: '/tourism',
        views:{
            'menuContent':{
                templateUrl: 'templates/tourism.html'
            }
        }
    })
    .state('app.government',{
        url:'/government',
        views:{
            'menuContent':{
                templateUrl: 'templates/government.html',
                controller: 'GovtCtrl'
            }
        }
    })
    .state('app.contact',{
        url:'/contact',
        views:{
            'menuContent':{
                templateUrl: 'templates/contact.html',
                Controller: 'ContactCtrl'
            }
        }
    })
 
    .state('app.jobscontent',{
        url:'/jobscontent',
        views:{
            'menuContent':{
                templateUrl:'templates/jobscontent.html',
                controller:'JobsContentCtrl'
            }
        }
    })
    .state('app.eventcontent', {
        url:'/eventcontent',
        views:{
            'menuContent':{
                templateUrl:'templates/eventcontent.html',
                controller:'EventContentCtrl'
            }
        }
    })
   
    .state('app.main',{
        url:'/main',
        views:{
            'menuContent':{
                templateUrl: 'templates/main.html',
                controller:'MainCtrl'
            }
        }
    })
    .state('app.events',{
        url:'/events',
        views:{
            'menuContent':{
                templateUrl: 'templates/events.html',
                controller:'EventCtrl'
            }
        }
    })
    .state('app.jobs',{
        url:'/jobs',
        views:{
            'menuContent':{
                templateUrl: 'templates/jobs.html',
                controller:'JobsCtrl'
            }
        }
    })

    .state('app.login',{
        url:'/login',
        views:{
            'menuContent':{
                templateUrl:'templates/login.html',
                controller:'LoginCtrl'
            }
        }
    })
      .state('app.chat', {
        url:'/chat',
        views:{
            'menuContent':{
                templateUrl:'templates/chat.html',
                controller:'ChatCtrl'
            }
        }
    })

    .state('app.weatherlist',{
        url:'/weatherlist',
        views:{
            'menuContent':{
                templateUrl:'templates/weatherlist.html',
                controller:'WeatherListCtrl'
            }
        }
    })
    .state('app.register',{
        url:'/register',
        views:{
            'menuContent':{
                templateUrl:'templates/register.html',
                controller:'RegisterCtrl'
            }
        }
    })
    .state('app.forgotpass',{
        url:'/forgotpass',
        views:{
            'menuContent':{
                templateUrl:'templates/forgotpass.html',
                controller:'ForgotCtrl'
            }
        }
    })

    .state('app.fiesta',{
        url:'/fiesta',
        views:{
            'menuContent':{
                templateUrl:'templates/fiesta.html',
                controller:'FiestaCtrl'
            }
        }
    })

    .state('app.resorts',{
        url:'/resorts',
        views:{
            'menuContent':{
                templateUrl:'templates/resorts.html',
                controller:'ResortsCtrl'
            }
        }
    })
    .state('app.resortcontent',{
        url:'/resortcontent',
        views:{
            'menuContent':{
                templateUrl:'templates/resortcontent.html',
                controller:'ResortContentCtrl'
            }
        }
    })
    .state('app.churches',{
        url:'/churches',
        views:{
            'menuContent':{
                templateUrl:'templates/churches.html',
                controller:'ChurchesCtrl'
            }
        }
    })
    .state('app.churchcontent',{
        url:'/churchcontent',
        views:{
            'menuContent':{
                templateUrl:'templates/churchcontent.html',
                controller:"ChurchContentCtrl"
            }
        }
    })
     .state('app.restaurant',{
        url:'/restaurant',
        views:{
            'menuContent':{
                templateUrl:'templates/restaurant.html',
                controller:'RestaurantCtrl'
            }
        }
    })
    .state('app.restaurantcontent',{
        url:'/restaurantcontent',
        views:{
            'menuContent':{
                templateUrl:'templates/restaurantcontent.html',
                controller:'RestaurantContentCtrl'
            }
        }
    })
     .state('app.credit',{
        url:'/credit',
        views:{
            'menuContent':{
                templateUrl:'templates/credit.html'
            }
        }
    })
     .state('app.homepage',{
        url:'/homepage',
        views:{
            'menuContent':{
                templateUrl:'templates/homepage.html',
                controller:'HomePageCtrl'
            }
        }
     })

     .state('app.newsletter',{
        url:'/newsletter',
        views:{
            'menuContent':{
                templateUrl:'templates/newsletter.html'
            }
        }
     })
    ;

    $urlRouterProvider.otherwise('/app/homepage');
})

app.factory('weatherService', ['$http', '$q','WeatherAPI','cfpLoadingBar', function ($http, $q,WeatherAPI,cfpLoadingBar){

var weatherObject = {};

      function getWeather () {
        
       $http.get(WeatherAPI.url)
      .then(function(data) {

            for(var x=0; x<data.data.length;x++){

                    if(data.data[x].location == "Marilao"){
                       weatherObject = data.data[x];
                    }
            }
          
    
            cfpLoadingBar.complete();
      
         
         });

      return weatherObject;
      }

    
      function getObject() {
        return weatherObject;
      }
      return {
        getWeather: getWeather,
        getObject: getObject
      };
    }])




app.factory('passData',['$firebase',function($firebase){

    var data1 = {};

return {
    setData: function(type){
        
       data1 = type;
    },
    returnData: function(){
        return data1;
    }
}
    

}])

app.factory('passImage',['$firebase',function($firebase){

    var imageString = "";

return {
    setData: function(string){
        
       imageString = string;
    },
    returnData: function(){
        return imageString;
    }
}
    

}])

app.factory('currentUser',['$state',function () {

    var currentUser = {};
        return {
            setUser: function (userObject){
                currentUser = userObject;
            },
            getUser: function (){
                return currentUser;
            }
        }
}])



app.factory('backcallFactory', ['$state','$ionicPlatform','$ionicHistory','$timeout',function($state,$ionicPlatform,$ionicHistory,$timeout){
 
var obj={}
    obj.backcallfun=function(){
  
       $ionicPlatform.registerBackButtonAction(function () {
          if ($state.current.name == "app.main") {
            var action= confirm("Do you want to Exit?");
             if(action){
                navigator.app.exitApp();
              }
      
      }else{
            $ionicHistory.nextViewOptions({
                 disableBack: true
                });
        $state.go('app.main');

     }
        }, 100);
}
return obj;
}])

app.factory('indexFactory',['$state',function () {

    var indexVar = 0;
        return {
            setIndex: function (index){
                indexVar = Math.abs(index);
            },
            getIndex: function (){

                return indexVar;
            }
        }
}])

.service('RequestsService', ['$http', '$q', '$ionicLoading',function ($http, $q, $ionicLoading){

        var base_url = 'https://1da5087f.ngrok.io';

        function register(device_token){

            var deferred = $q.defer();
     

            $http.post(base_url + '/register', {'device_token': device_token})
                .success(function(response){

                   alert(1);
                    deferred.resolve(response);

                })
                .error(function(data){
                      alert(2);
                    deferred.reject();
                });


            return deferred.promise;

        };


        return {
            register: register
        };
    }])

;