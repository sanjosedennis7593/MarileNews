
function SimplePubSub() {
    var events = {};
    return {
        on: function(names, handler) {
            names.split(' ').forEach(function(name) {
                if (!events[name]) {
                    events[name] = [];
                }
                events[name].push(handler);
            });
            return this;
        },
        trigger: function(name, args) {
            angular.forEach(events[name], function(handler) {
                handler.call(null, args);
            });
            return this;
        }
    };
};



angular.module('starter.controllers', ['ionic','firebase','cfp.loadingBar'])


.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,$ionicSlideBoxDelegate,$ionicScrollDelegate,$state,indexFactory) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;


    $scope.exitApplication = function  () {
        navigator.app.exitApp();
    }

    $scope.changeSlideTo = function (index){
      $state.go('app.homepage');
      indexFactory.setIndex(index);
     
    }

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };


})

.controller("NewsLetterCtrl", function ($scope,$cordovaFileTransfer,$cordovaFacebook){

  $scope.downloadStatus = {};
 

var folderName = 'xyz';
var fileName;

$scope.downloadFile = function (URL) {
    //step to request a file system 
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
    alert(URL);
    function fileSystemSuccess(fileSystem) {
        var download_link = encodeURI(URL);
        alert(download_link);
        fileName = download_link.substr(download_link.lastIndexOf('/') + 1); //Get filename of URL
        var directoryEntry = fileSystem.root; // to get root path of directory
        directoryEntry.getDirectory(folderName, {
            create: true,
            exclusive: false
        }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
        var rootdir = fileSystem.root;
        var fp = fileSystem.root.toNativeURL(); // Returns Fullpath of local directory

        fp = fp + "/" + folderName + "/" + fileName; // fullpath and name of the file which we want to give
        // download function call
        filetransfer(download_link, fp);
    }

    function onDirectorySuccess(parent) {
        // Directory created successfuly
    }

    function onDirectoryFail(error) {
        //Error while creating directory
        alert("Unable to create new directory: " + error.code);

    }

    function fileSystemFail(evt) {
        //Unable to access file system
        alert(evt.target.error.code);
    }
}

function filetransfer(download_link, fp) {
    var fileTransfer = new FileTransfer();
    // File download function with URL and local path
    alert(download_link);
    fileTransfer.download(download_link, fp,
        function(entry) {
            alert("download complete: " + entry.fullPath);
        },
        function(error) {
            //Download abort errors or download failed errors
            alert("download error source " + error.source);
        }
    );
}



})



.controller('HomeCtrl', function($scope, $stateParams, $timeout,$ionicModal,$state) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
      $scope.activeSlide = 0;
    $scope.fullcontent = {};

    $ionicModal.fromTemplateUrl('newscontent.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.openModal = function(title,desc,img,date) {
    $scope.fullcontent.newstitle = title;
    $scope.fullcontent.newsdesc = desc;
    $scope.fullcontent.newsimg = img;
    $scope.fullcontent.newsdate = date;
      
    $scope.modal.show();
  };



  $scope.closeModal = function() {
 

 $scope.modal.hide();


  };


  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  
    // Set Motion
    $timeout(function() {
        ionic.material.motion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionic.material.motion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionic.material.ink.displayEffect();


    $scope.redirectAboutDev = function () {
        $state.go('app.credit');
    }
})


.controller('WeatherCtrl', ['$scope', 'weatherService','cfpLoadingBar','$http','WeatherAPI','passData', function ($scope, weatherService,cfpLoadingBar,$http,WeatherAPI,passData) {

$scope.weather = {};
$scope.weather = passData.returnData();

     
}])

.controller("WeatherListCtrl", ['$scope', 'weatherService','cfpLoadingBar','$http','WeatherAPI','passData', function ($scope, weatherService,cfpLoadingBar,$http,WeatherAPI,passData){

  cfpLoadingBar.start();

$scope.ncrList = ["Manila","Quezon City","Caloocan","Paranaque","Makati"];
$scope.bulList = ["Marilao","Bocaue"]; 

var y=0;
var z=0;
$scope.locationList = [];
$scope.nearList = [];
         

           $http.get(WeatherAPI.url)
              .then(function(data) {

                   for(var x=0; x<data.data.length;x++){

                      for(y=0;y<$scope.ncrList.length;y++){
                             if(data.data[x].location == $scope.ncrList[y]){

                              if(data.data[x].icon == 'http://nababaha.appspot.com/static/img/30.png' || data.data[x].icon == 'http://nababaha.appspot.com/static/img/32.png'){
                              data.data[x].icon = 'img/sunny.png';
                          }
                             $scope.locationList.push(data.data[x]);
                    }
           
                }
                   for(z=0;z<$scope.bulList.length;z++){
                       if(data.data[x].location == $scope.bulList[z]){
                          if(data.data[x].icon == 'http://nababaha.appspot.com/static/img/30.png' ||data.data[x].icon == 'http://nababaha.appspot.com/static/img/32.png'){
                              data.data[x].icon = 'img/sunny.png';
                          }
                             $scope.nearList.push(data.data[x]);
                    }
                }

                y=0;
                z=0;
                
            }

          cfpLoadingBar.complete();
           

         });

              $scope.sendData = function (weatherObject){
                console.log(weatherObject);
                  passData.setData(weatherObject);

              }



}])
.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
})


.controller('NewsCtrl', function ($scope,$stateParams,$firebase,$ionicSlideBoxDelegate,$ionicPopup,$ionicLoading,cfpLoadingBar,$firebaseArray,$ionicModal){

  $scope.newsLimit = 10;
/* ------------------------------------- */
  $scope.localNewsData = [];
  $scope.ctrX=0;
  $scope.ctrY=0;

$scope.fullcontent = {};
$scope.newsFlag = true;

  $scope.loadingScroll = false;
 $scope.newsFlag = true;
  $scope.imageString = {};
/************************************************************/

  var baseRef = new Firebase('https://marilenewsdatabase.firebaseio.com/News/Newsfeed');
  // create a scrollable reference
  var scrollRef = new Firebase.util.Scroll(baseRef, '$priority');

  // create a synchronized array on scope
  $scope.items = $firebaseArray(scrollRef);
  // load the first three contacts
  scrollRef.scroll.next(5);

  // This function is called whenever the user reaches the bottom
  $scope.loadMore = function() {
    $scope.loadingScroll = true;
    scrollRef.scroll.next(2);

    if($scope.$broadcast('scroll.infiniteScrollComplete')){
      $scope.loadingScroll = false;
    }
  }

  $scope.noMoreItemsAvailable = function () {
    console.log("No");
  }
  $scope.getImage = function (id,index) {
    
    $scope.ctrY = index;
   $scope.imageString[id] = "img/ts.jpg"
    var imageRef = new Firebase("https://marilenewsdatabase.firebaseio.com/News/NewsImage");
   
    imageRef.child(id).on("value", function (snapshot){
      
       $scope.imageString[id] = snapshot.val().Image;


    });
    
   
  }

  $ionicModal.fromTemplateUrl('newscontent.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.openModal = function(title,desc,img,date) {
    $scope.fullcontent.newstitle = title;
    $scope.fullcontent.newsdesc = desc;
    $scope.fullcontent.newsimg = img;
    $scope.fullcontent.newsdate = date;
      
    $scope.modal.show();
  };



  $scope.closeModal = function() {
 

 $scope.modal.hide();


  };
     
  
})

.directive('repeatLoading', function (cfpLoadingBar) {
  return function(scope, element, attrs) {
 
    if (scope.$last){
      cfpLoadingBar.complete();
    }
  };
})

.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
})
.directive('tapDetector',function($ionicGesture,$ionicScrollDelegate){
  return{
    restrict:'EA',
    link:function(scope,element){
      var startX,startY,isDown=false;
      element.bind("mousedown touchstart", function(e){
        e=(e.touches)?e.touches[0]:e;//e.touches[0] is for ios
        startX = e.clientX;
        startY = e.clientY;
        isDown=true;
        //console.log("mousedown",startX,startY);
      });

      element.bind("mousemove touchmove", function(e){
        e=(e.touches)?e.touches[0]:e;//e.touches[0] is for ios
        if(isDown){
          var deltaX = Math.abs(e.clientX - startX);
                var deltaY = Math.abs(e.clientY - startY);

          if(deltaX > deltaY) {
         
          //console.log("horizontal move");
            $ionicScrollDelegate.$getByHandle('mainScroll').freezeScroll(true);
            }
        }
      });

      element.bind("mouseup touchend", function(e){
        isDown=false;
        $ionicScrollDelegate.$getByHandle('mainScroll').freezeScroll(false);
        //console.log("mouseup touchend");
      });
    }
  }
})


.controller('MainCtrl', ['$scope','$firebase','cfpLoadingBar','$ionicModal','backcallFactory','$ionicSlideBoxDelegate','$firebaseArray', function ($scope,$firebase,cfpLoadingBar,$ionicModal,backcallFactory,$ionicSlideBoxDelegate,$firebaseArray){

  $scope.imageString = {};

    $ionicModal.fromTemplateUrl('maincontent.html', {
    scope: $scope,
    animation: 'fadeSlideInRight'
  }).then(function(modal) {
    $scope.modal = modal;
  });

   $ionicModal.fromTemplateUrl('latestnewscontent.html', {
    scope: $scope,
     animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });



  $scope.openModal = function(title,desc,img,date) {
    $scope.fullcontent.newstitle = title;
    $scope.fullcontent.newsdesc = desc;
    $scope.fullcontent.newsimg = img;
    $scope.fullcontent.newsdate = date;
      
    $scope.modal.show();
  };



  $scope.closeModal = function() {
 

 $scope.modal.hide();


  };
  $scope.latestnews = {};
  $scope.imageString2 = "";

    $scope.openLatestNewsModal = function(latestnews,image) {
      $scope.latestnews = latestnews;
      $scope.imageString2 = image;
    $scope.modal.show();
  };



  $scope.closeLatestModal = function() {
 

 $scope.modal.hide();


  };

$scope.latestNews = [];


               var ref5 = new Firebase("https://marilenewsdatabase.firebaseio.com/News/Newsfeed/").limitToFirst(3);
        

               $scope.latestNews = $firebaseArray(ref5);

                 $scope.getImage = function (id,index) {
    
    $scope.ctrY = index;
   $scope.imageString[id] = "img/ts.jpg"
    var imageRef = new Firebase("https://marilenewsdatabase.firebaseio.com/News/NewsImage");
   
    imageRef.child(id).on("value", function (snapshot){
      
       $scope.imageString[id] = snapshot.val().Image;


    });
    
   
  }
}])

.controller("ChurchesCtrl", function ($scope,$firebase,passData,cfpLoadingBar,$firebaseArray,$state){

    cfpLoadingBar.complete();
    cfpLoadingBar.start();
    var ref = new Firebase("https://marilenewsdatabase.firebaseio.com/News/TouristAttraction/Churches");

    $scope.churches = $firebaseArray(ref);

    console.log($scope.churches);

    $scope.showChurches = function (churches){
      passData.setData(churches);
      $state.go('app.churchcontent');
    }

})

.controller("ChurchContentCtrl", function ($scope,$firebase,passData,$state){

    $scope.churchesContent = passData.returnData();

    $scope.redirectUrl = function (url) {
    window.open(url,'_self');
  }
})

.directive('dynamicHeight', function() {
    return {
        require: ['^ionSlideBox'],
        link: function(scope, elem, attrs, slider) {
            scope.$watch(function() {
                return slider[0].__slider.selected();
            }, function(val) {
                //getting the heigh of the container that has the height of the viewport
                var newHeight = window.getComputedStyle(elem.parent()[0], null).getPropertyValue("height");
                if (newHeight) {
                  var plusHeight = Math.abs(parseInt(newHeight)-60);
      
                    elem.find('ion-scroll')[0].style.height = plusHeight+'px';
                }
            });
        }
    };
})

.directive('dynamicHeightJobs', function() {
    return {
        require: ['^ionSlideBox'],
        link: function(scope, elem, attrs, slider) {
            scope.$watch(function() {
                return slider[0].__slider.selected();
            }, function(val) {
                //getting the heigh of the container that has the height of the viewport
                var newHeight = window.getComputedStyle(elem.parent()[0], null).getPropertyValue("height");
                if (newHeight) {
                  var plusHeight = Math.abs(parseInt(newHeight)-120);
      
                    elem.find('ion-scroll')[0].style.height = plusHeight+'px';
                }
            });
        }
    };
})



.controller("EventCtrl",['$scope','$firebaseArray','$ionicModal','cfpLoadingBar','passData',function ($scope,$firebaseArray,$ionicModal,cfpLoadingBar,passData){

    $scope.eventFlag = true;

    $scope.eventlist = [];

    $scope.eventDesc = {};
               var ref = new Firebase("https://marilenewsdatabase.firebaseio.com/News/Events/");
        
            $scope.eventlist.length = 0;
             var scrollRef = new Firebase.util.Scroll(ref, '$value');
    
                $scope.eventlist = $firebaseArray(scrollRef);

                console.log($scope.eventlist);
          
          scrollRef.scroll.next(4);
     
      
          
            $scope.$broadcast('scroll.refreshComplete');
       
          if( $scope.eventlist){
                 $scope.newsFlag = false;
          }

 $scope.loadMore = function() {
    scrollRef.scroll.next(4);

    $scope.$broadcast('scroll.infiniteScrollComplete');
  };

  $scope.noMoreItemsAvailable = function () {
   
  };
    


  $ionicModal.fromTemplateUrl('eventcontent.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.eventModal = modal;
  });

  $scope.openEventModal = function (events,image) {
      $scope.eventDesc.title2 =events.EventTitle;
    $scope.eventDesc.desc =events.Description;
    $scope.eventDesc.date = events.EventDate;
    $scope.eventDesc.place = events.Place;
    $scope.eventDesc.image = image;

    $scope.eventModal.show();
  };



   $scope.closeModal = function() {
 $scope.eventModal.hide();
};

  $scope.sendData = function (eventObject){
    passData.setData(eventObject);
  }

    $scope.ctrX=0;
  $scope.ctrY=0;
  $scope.EventImageString = {};

  $scope.getEventImage = function (id,index) {
    
    $scope.ctrY = index;
   $scope.EventImageString[id] = "img/ts.jpg"
    var imageRef = new Firebase("https://marilenewsdatabase.firebaseio.com/News/EventImage");
    
    imageRef.child(id).on("value", function (snapshot){
      
       $scope.EventImageString[id] = snapshot.val().Image;


    });
    
   
  }

}])



.controller("AboutCtrl", ['$scope','$firebase','$stateParams','passData','cfpLoadingBar','$ionicModal',function ($scope,$stateParams,$firebase,passData,cfpLoadingBar,$ionicModal){
/*

    $scope.offlineData = {};
 

  $scope.initializeOfflineData = function () {
    cfpLoadingBar.start();
    $scope.getOnlineData();
  }

  $scope.getOnlineData = function () {
    cfpLoadingBar.start();
        var ref = new Firebase("https://marilenewsdatabase.firebaseio.com/News/AboutMarilao/History");
        ref.on("value", function (snapshot){
           $scope.offlineData  = snapshot.val();
            console.log($scope.offlineData);
           cfpLoadingBar.complete();
        });
  }

   $scope.initializeOfflineData();

   */

   $scope.aboutFlag = false;

  $ionicModal.fromTemplateUrl('aboutMarilao.html', {
    scope: $scope,
       controller: 'AboutCtrl',
    animation: 'fadeSlideInRight'

  }).then(function(modal) {
    $scope.aboutMarilao = modal;
  });

  $ionicModal.fromTemplateUrl('publicOfficials.html', {
    scope:$scope,
    controller:'AboutCtrl',
    animation:'jelly'
  }).then(function(modal){
    $scope.publicOfficials = modal;
  });

  $scope.publicOfficialsModal = function () {
    $scope.govt = {};
    
        var ref1 = new Firebase("https://marilenewsdatabase.firebaseio.com/News/Officials");

    ref1.on("value", function (snapshot){
        $scope.govt.officials= snapshot.val();
      
         console.log($scope.govt.officials);
       });

    $scope.publicOfficials.show();
  }



    $scope.openModal = function () {
      $scope.aboutFlag = false;
      $scope.offlineData = {};
       var ref = new Firebase("https://marilenewsdatabase.firebaseio.com/News/AboutMarilao/History");
        ref.on("value", function (snapshot){
           $scope.offlineData  = snapshot.val();
            console.log($scope.offlineData);
            $scope.aboutFlag = true;

        });
    $scope.aboutMarilao.show();
  };

  $scope.closeModal = function () {
    $scope.aboutMarilao.hide();
  } 

  $scope.closeOfficialsModal = function (){
    $scope.publicOfficials.hide();
  }
 
}]
)

.controller("HistoryCtrl", ['$scope','$firebase', function ($scope,$firebase){


}])

.controller("ContentCtrl", ['$scope','passData',function($scope,passData){


 $scope.retData = passData.returnData();
 

}])
.controller("TourismContentCtrl", ['$scope','passData','cfpLoadingBar','$ionicModal',function($scope,passData,cfpLoadingBar,$ionicModal){

    
    $scope.tourObject = passData.returnData();


 $ionicModal.fromTemplateUrl('routeMap.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.routeModal = modal;
  });



  $scope.closeRouteModal = function () {
    $scope.routeModal.hide();
  }




}])

.controller("TourismCtrl", function($scope,$state,$stateParams,$firebase,passData,cfpLoadingBar,$firebaseArray){


    cfpLoadingBar.complete();

    $scope.viewTouristAttraction = function (touristObject) {
        passData.setData(touristObject);
    }


    $scope.showChurches = function () {
        $state.go('app.churches');
    }
    $scope.showResorts = function () {
        $state.go('app.resorts');
    }

    $scope.showBarangayFiesta = function () {
       $state.go('app.fiesta');
    } 

    $scope.showRestaurantList = function () {
      $state.go('app.restaurant');
    }


    


})

.controller("FiestaCtrl", function ($state,$firebase,$scope,cfpLoadingBar,$firebaseArray) {
  cfpLoadingBar.start();
    var ref = new Firebase("https://marilenewsdatabase.firebaseio.com/News/TouristAttraction/FiestaEvents");
      $scope.fiesta = $firebaseArray(ref);

})

.controller("ResortsCtrl", function ($state,$firebase,$firebaseArray,$scope,cfpLoadingBar,passData,$ionicModal){

cfpLoadingBar.start();
$scope.touristDestination = [];

  var ref = new Firebase("https://marilenewsdatabase.firebaseio.com/News/TouristAttraction/Resorts");
    $scope.resorts = $firebaseArray(ref);
    console.log($scope.resorts);


    $scope.showResorts = function (resort) {

          passData.setData(resort);
          $state.go('app.resortcontent');

    }

   
})
.controller("ResortContentCtrl", function ($state,$firebase,$firebaseArray,$scope,cfpLoadingBar,passData,$ionicModal){
    $scope.resortObject = passData.returnData();


 $ionicModal.fromTemplateUrl('routeMap.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.routeModal = modal;
  });


      $scope.showRouteMap = function (map) {

      $scope.routeMap = map;
      $scope.routeModal.show();
  }

  $scope.redirectUrl = function (url) {
    window.open(url,'_self');
  }

  $scope.closeRouteModal = function () {
    $scope.routeModal.hide();
  }
})
.controller("RestaurantCtrl", function ($state,$firebase,$firebaseArray,$scope,cfpLoadingBar,passData,$ionicModal){

cfpLoadingBar.start();
$scope.restaurant = [];

  var ref = new Firebase("https://marilenewsdatabase.firebaseio.com/News/TouristAttraction/Restaurant");
    $scope.restaurant = $firebaseArray(ref);
    console.log($scope.restaurant);


    $scope.showRestaurant = function (restaurant) {

          passData.setData(restaurant);
          $state.go('app.restaurantcontent');

    }



   
})

.controller("RestaurantContentCtrl", function ($state,$firebase,$firebaseArray,$scope,cfpLoadingBar,passData){
    $scope.restaurantObject = passData.returnData();

    console.log($scope.restaurantObject);

    $scope.redirectUrl = function (url) {
    window.open(url,'_self');
  }
})

.directive('repeatLoading', function (cfpLoadingBar) {
  return function(scope, element, attrs) {
 
    if (scope.$last){
      cfpLoadingBar.complete();
    }
  };
})



.controller("GovtCtrl", function($scope,$stateParams,$firebase,$ionicModal, $ionicPopover, $timeout,cfpLoadingBar){

    $scope.govt = {};
    $scope.profilecontent={};
  
 
   $scope.initializeData = function () {
      cfpLoadingBar.start();
    var ref1 = new Firebase("https://marilenewsdatabase.firebaseio.com/News/Officials");

    ref1.on("value", function (snapshot){
        $scope.govt.officials= snapshot.val();
         cfpLoadingBar.complete();
         console.log($scope.govt.officials);
        
    });



    
    }
   

  $ionicModal.fromTemplateUrl('profile.html', {
    scope: $scope,
       controller: 'GovtCtrl',
    animation: 'slide-in-up'

  }).then(function(modal) {
    $scope.profContent = modal;
  });
  $scope.openModal = function (lastname,firstname,initial,position,desc,image) {
    
    $scope.profilecontent.sbName = lastname+", "+firstname+", "+" "+initial;
    $scope.profilecontent.sbPos = position;
    $scope.profilecontent.sbDesc = desc;
    $scope.profilecontent.sbImage = image;
 

    $scope.profContent.show();
  };
  $scope.closeModal = function() {
 

 $scope.profContent.hide();


  };

})

.controller("ContactCtrl", function ($scope,$stateParams,$firebase,cfpLoadingBar){



    $scope.contact = {};


        var ref = new Firebase("https://marilenewsdatabase.firebaseio.com/News/Directory/Hotline");

        ref.on("value", function (snapshot){
            $scope.contact = snapshot.val();
     
        });

      $scope.redirecToDial = function (num) {
  
         window.open(num, "_system");
      }


 
})

.controller("FeedbackCtrl", function($scope,$firebase,$compile,$ionicPopup){

  $scope.feedbackValue ={};
  $scope.user = {};

  $scope.rate = 3;
  $scope.max = 5;

  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var hr = currentDate.getHours();
  var min = currentDate.getMinutes();
  var minString = "";
  var ampm = hr >= 12 ? 'PM' : 'AM';
  hr =  hr % 12;
  hr =  hr ?  hr : 12;

  if(min<10 && min>0){
      minString = "0"+min.toString();
  }
  else if(min==0){
    minString = "00";
  }
  else{
    minString = min.toString();
  }

    $scope.submitFeedback = function (name,email,desc){



           $scope.feedbackValue = {
                "Name":name,
                  "Email":email,
                  "FeedbackDesc":desc
    };


    var ref = new Firebase("https://marilenewsdatabase.firebaseio.com/News/Feedback");

    ref.push(
        {
           "Name":name,
            "Email":email,
            "FeedbackDesc":desc,
            "ServerTime":Firebase.ServerValue.TIMESTAMP,
            "Date":month+"/"+day+"/"+year+" - "+hr+":"+ minString+" "+ampm
    }); 

    $scope.feedbackValue = {};
   
    $scope.user.name=null;
    $scope.user.email=null;
    $scope.user.desc=null;
   
   
    }

})


.controller('TrafficCtrl',['$scope','$firebase','cfpLoadingBar','$ionicPopup', function ($scope,$firebase,cfpLoadingBar,$ionicPopup){
  $scope.loadTrafficData = function () {

$scope.flag = true;
 var currentDate = new Date();
 var isRefreshActive = false;
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    var current = month+"/"+day+"/"+year;

    $scope.trafficArray = [];


          isRefreshActive = true;

           $scope.trafficArray.length = 0;
        
          var ref = new Firebase("https://marilenewsdatabase.firebaseio.com/News/Traffic");

           ref.once("value", function (snapshot){
            
            for(var x in snapshot.val()){
                $scope.trafficArray.push(snapshot.val()[x]);
            }
        
            generateTrafficStatus($scope.trafficArray);
           
          
            });

    function generateTrafficStatus (array) {

        for(var x=0; x<array.length;x++) {
            if(array[x].Northbound == "Light"){
              array[x].StatusImageN= "img/green.png";
        
        
            }
            else if(array[x].Northbound == "Moderate"){
             array[x].StatusImageN= "img/dilaw.png";

            }
            else if(array[x].Northbound == "Heavy"){
              array[x].StatusImageN= "img/pula.png";
            }

            if(array[x].Southbound == "Light"){
              array[x].StatusImageS= "img/green.png";
            }
            else if(array[x].Southbound == "Moderate"){
             array[x].StatusImageS= "img/dilaw.png";
            }
            else if(array[x].Southbound == "Heavy"){
              array[x].StatusImageS= "img/pula.png";
            }
        }

                $scope.flag = false;
            $scope.$broadcast('scroll.refreshComplete');
            isRefreshActive = false;
         
    }
  }



    $scope.displayAlternativeRoute = function (route) {
      var popupMsg = "";

        if(route==null || route==""){
            popupMsg = "There's no alternative route!";
        }
        else{
          popupMsg = "<b>Alternative Route:</b> "+route;
        }
          $ionicPopup.alert(
      {
        title:"<b>Traffic Update</b>",
        template:popupMsg
    });
    }

    $scope.showNorthRoute = function (north) {
     var popupMsg = "";

        if(north==null || north==""){
            popupMsg = "There's no alternative route!";
        }
        else{
          popupMsg = "<b>Alternative Route:</b> "+north;
        }
          $ionicPopup.alert(
      {
        title:"<b>Traffic Update</b>",
        template:popupMsg
    });
    }

    $scope.showSouthRoute = function (south) {
      var popupMsg = "";


        if(south==null || south==""){
            popupMsg = "There's no alternative route!";
        }
        else{
          popupMsg = "<b>Alternative Route:</b> "+south;
        }
          $ionicPopup.alert(
      {
        title:"<b>Traffic Update</b>",
        template:popupMsg
    });
    }
       $scope.loadTrafficData();

}])

.controller("JobsCtrl", ['$scope','$firebase','cfpLoadingBar','passData',function($scope,$firebase,cfpLoadingBar,passData){

$scope.jobArray = [];

$scope.jobsFlag = true;
       
          $scope.jobArray.length = 0;
          
          var ref = new Firebase("https://marilenewsdatabase.firebaseio.com/News/Jobs").orderByChild("Status").equalTo("Active");

           ref.once("value", function (snapshot){
            
            for(var x in snapshot.val()){
                $scope.jobArray.push(snapshot.val()[x]);
            }
         
              $scope.jobsFlag = false;
            });

    $scope.sendData = function (value){
     
        passData.setData(value);
    }
  

}])
.controller("JobsContentCtrl",['$scope','$firebase','passData', function ($scope,$firebase,passData){

    $scope.jobsInfo = passData.returnData();
    console.log($scope.jobsInfo);
}]) 

.controller("EventContentCtrl",['$scope','$firebase','passData', function ($scope,$firebase,passData){
    $scope.eventsInfo = passData.returnData();

}])




.controller("LoginCtrl", function ($scope,$firebase,$state,cfpLoadingBar,currentUser,$rootScope,currentUser){
      
$scope.user = {};
cfpLoadingBar.complete();
      $scope.loginWithFB = function () {
        var ref = new Firebase("https://marilenewsdatabase.firebaseio.com");
        cfpLoadingBar.start();

 ref.authWithOAuthPopup("facebook", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    currentUser.setUser(authData);
    $state.go('app.chat');
    console.log("Authenticated successfully with payload:", authData);
  
  }
});
        

      }

   
$scope.goToRegister = function () {

    $state.go('app.register');

}


  $scope.loginUser = function (username,password) {

cfpLoadingBar.start();
var userInfo ={};

     var usrRef = new Firebase("https://marilenewsdatabase.firebaseio.com/News/RegisteredUser/");
         usrRef.child(username).once('value', function (snapshot) {
          var exists = (snapshot.val() !== null);
          
          userInfo = snapshot.val();
     
              if(exists){
                if(userInfo.Password == password){

                  if(userInfo.Status != "Inactive"){

         
                  cfpLoadingBar.complete();

                  currentUser.setUser(userInfo);
                  $state.go('app.chat');
                   }
                   else{
                    alert("Ooops! The account has been disabled by the admin!");
                   }
                }
                else{
                  alert("Invalid Password");
                }
             
              }
        
        });
  }


  function userExistsCallback(userID, exists,password) {
        if (exists) {

            var loginRef = new Firebase("https://marilenewsdatabase.firebaseio.com/News/RegisteredUser/"+userID);
              loginRef.orderByChild("Password").equalTo(password).once("value", function (snapshot){
                  alert("Login Success");
              });
        } else {
            alert("User not found!");
        }
      }

      $scope.showForgotPassword = function (){
        $state.go('app.forgotpass');
      }
       


})

.controller("RegisterCtrl", function ($scope,$firebase,$state){
$scope.user = {};

  
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var hr = currentDate.getHours();
  var min = currentDate.getMinutes();
  var minString = "";
  var ampm = hr >= 12 ? 'PM' : 'AM';
  hr =  hr % 12;
  hr =  hr ?  hr : 12;

  if(min<10 && min>0){
      minString = "0"+min.toString();
  }
  else if(min==0){
    minString = "00";
  }
  else{
    minString = min.toString();
  }


var ref = new Firebase("https://marilenewsdatabase.firebaseio.com/News/RegisteredUser");
    $scope.registerAccount = function (username) {
      
         ref.child(username).once('value', function (snapshot) {
          var exists = (snapshot.val() !== null);
          userExistsCallback(username, exists,$scope.user);
        });
      
    }

     function userExistsCallback(userID, exists,userObject) {
        if (exists) {
          alert('user ' + userID + ' exists!');
        } else {



          if($scope.user.initial.length<=5 || $scope.user.username.length>=5 || $scope.user.username.length<=15 || $scope.user.password.length>=5 || $scope.user.password.length<=15){
               ref.child(userID).set({"Username":userID,"Lastname":$scope.user.lastname,"Firstname":$scope.user.firstname,"Initial":$scope.user.initial,"Password":$scope.user.password,"DateRegistered":month+"/"+day+"/"+year+" - "+hr+":"+ minString+" "+ampm,"Status":"Active",
                "SecurityQuestion":$scope.user.question,"SecurityAnswer":$scope.user.answer});
              alert("Registration Success!");
              $scope.user.lastname= null;
              $scope.user.firstname = null;
              $scope.user.initial= null;
              $scope.user.password = null;
              $scope.user.username = null;
              $scope.user.security = null;
              $scope.user.answer = null;
              $state.go('app.login');
          }
          else{
            alert("Username and Password character length should be greater than 5 and less than 5!");
          }
         
        }
      }
       
   
})
.controller("ChatCtrl", function ($scope,cfpLoadingBar,$firebase,$state,currentUser,$firebaseArray,$ionicScrollDelegate,$rootScope,currentUser,$ionicModal,$timeout){

$scope.loggedInUser = {};
 var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var hr = currentDate.getHours();
  var min = currentDate.getMinutes();
  var minString = "";
  var ampm = hr >= 12 ? 'PM' : 'AM';
  hr =  hr % 12;
  hr =  hr ?  hr : 12;

  if(min<10 && min>0){
      minString = "0"+min.toString();
  }
  else if(min==0){
    minString = "00";
  }
  else{
    minString = min.toString();
  }

  $scope.loggedInUser = currentUser.getUser();
  console.log($scope.loggedInUser);
   $scope.chatMessage = [];

   var chatRef = new Firebase("https://marilenewsdatabase.firebaseio.com/News/MessageFeed/"+$scope.loggedInUser.Username+"/Conversation");
  
    $scope.chatMessage=$firebaseArray(chatRef);

   

      console.log($scope.chatMessage);
  
  

     $timeout(function() {
          viewScroll.scrollBottom();
        }, 500);


   $scope.sendMessage = function () {

      var ref5 = new Firebase("https://marilenewsdatabase.firebaseio.com/News/MessageFeed/"+$scope.loggedInUser.Username);
   ref5.child("Sender").set({
      "Sender":$scope.loggedInUser.Username
   });



      var ref = new Firebase("https://marilenewsdatabase.firebaseio.com/News/MessageFeed");

        ref.child($scope.loggedInUser.Username+"/Conversation").push({"Message":$scope.data.message,"Sender":$scope.loggedInUser.Username,"Date":month+"/"+day+"/"+year+" - "+hr+":"+ minString+" "+ampm,"ServerTime":Firebase.ServerValue.TIMESTAMP});

        ref.child($scope.loggedInUser.Username+"/MessageTime").set({
          "ServerTime":Firebase.ServerValue.TIMESTAMP
         });

       $scope.data.message = null;
        $timeout(function() {
          viewScroll.scrollBottom();
        }, 500);
   }

   $scope.logoutFB = function () {
    
    $state.go('app.homepage');
   }

     $scope.userInfo = {};

    $ionicModal.fromTemplateUrl('userInfo.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.openModal = function(userObject) {
    
    $scope.userInfo.username = userObject.Username;
    $scope.userInfo.pass= userObject.Password;
    $scope.userInfo.lastname = userObject.Lastname;
    $scope.userInfo.firstname = userObject.Firstname;
    $scope.userInfo.initial = userObject.Initial;
    $scope.userInfo.status = userObject.Status;
    $scope.userInfo.registered = userObject.DateRegistered;

    console.log(userObject);
    $scope.modal.show();
  };

  $scope.changePassword = function (obj){
      
      var changeRef = new Firebase("https://marilenewsdatabase.firebaseio.com/News/RegisteredUser");
      changeRef.child(obj.username).set({"DateRegistered":obj.registered,
      "Firstname":obj.firstname,
      "Initial":obj.initial,
      "Lastname":obj.lastname,
      "Password":obj.newPassword,
      "Status":obj.status,
      "Username":obj.username});
      alert("Change Password Success!");
      $scope.modal.hide();
  }

  $scope.updateAccountInfo = function (obj){
      
      var changeRef = new Firebase("https://marilenewsdatabase.firebaseio.com/News/RegisteredUser");
      changeRef.child(obj.username).set({"DateRegistered":obj.registered,
      "Firstname":obj.firstname,
      "Initial":obj.initial,
      "Lastname":obj.lastname,
      "Password":obj.pass,
      "Status":obj.status,
      "Username":obj.username});
      alert("Account Information has been updated!");
      $scope.modal.hide();
  }

  $scope.closeModal = function() {
 

 $scope.modal.hide();


  };
})



.controller("ForgotCtrl", function ($scope,$state,$firebase,cfpLoadingBar,$ionicPopup){

  $scope.user = {};
 $scope.userInfo = {};

   cfpLoadingBar.complete();
    $scope.generateSecurityQuestion = function (username) {
  cfpLoadingBar.start();
            var secRef = new Firebase("https://marilenewsdatabase.firebaseio.com/News/RegisteredUser/");
         secRef.child(username).once('value', function (snapshot) {
          var exists = (snapshot.val() !== null);
        
          $scope.userInfo = snapshot.val();
         
              if(exists){
                if($scope.userInfo.Username == username){

                  if($scope.userInfo.Status != "Inactive"){

               
                  cfpLoadingBar.complete();

          
                   }
                   else{
                    alert("Ooops! The account has been disabled by the admin!");
                   }
                }
              
             
              }
        
        });
    }

    $scope.answerSecurityQuestion = function (answer) {
        if($scope.userInfo.SecurityAnswer == answer) {


           $ionicPopup.alert({
        title:"Password Recovery",
        template:"<b>Your password is:</b>"+$scope.userInfo.Password
    });
    }
        
        else{
            $ionicPopup.alert({  title:"Password Recovery",
        template:"Invalid Answer"
    });
        }
    }
})

.controller("ProgramCtrl", ['$scope','$firebase','$ionicModal',function ($scope,$firebase,$ionicModal){

  $scope.programList = [];
    var programRef = new Firebase("https://marilenewsdatabase.firebaseio.com/News/Program");

    programRef.on("value", function (snapshot){
        for(var x in snapshot.val()){
               $scope.programList.push(snapshot.val()[x]);
            }
           
        
    });



    $ionicModal.fromTemplateUrl('programcontent.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.openProgramModal = function(p) {
   $scope.program = p;
      
    $scope.modal.show();
  };



  $scope.closeModal = function() {
 

 $scope.modal.hide();


  };

    console.log($scope.programList);


}])

.controller("HomePageCtrl",['$rootScope', "$scope", "$stateParams", "$q", "$location", "$window", '$timeout','$ionicSlideBoxDelegate','indexFactory', function ($rootScope, $scope, $stateParams, $q, $location, $window, $timeout,$ionicSlideBoxDelegate,indexFactory){


      $ionicSlideBoxDelegate.slide(indexFactory.getIndex());
      $scope.$watch(indexFactory.getIndex(), function (newVal,oldVal){

          if(newVal){
            alert(newVal);
          }
      });



   
}])


.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
})
.directive('tabSlideBox', [ '$timeout', '$window', '$ionicSlideBoxDelegate', '$ionicScrollDelegate','indexFactory',
  function($timeout, $window, $ionicSlideBoxDelegate, $ionicScrollDelegate,indexFactory) {
    'use strict';

    return {

      restrict : 'A, E, C',

      link : function(scope, element, attrs, ngModel) {

        
        var ta = element[0], $ta = element;
        $ta.addClass("tabbed-slidebox");
        if(attrs.tabsPosition === "bottom"){
          $ta.addClass("btm");
        }
        scope.initialIndex = indexFactory.getIndex();
  
        var handle = ta.querySelector('.slider').getAttribute('delegate-handle');
        
        var ionicSlideBoxDelegate = $ionicSlideBoxDelegate;
        if(handle){
          ionicSlideBoxDelegate = ionicSlideBoxDelegate.$getByHandle(handle);
        }
        
        var ionicScrollDelegate = $ionicScrollDelegate;
        if(handle){
          ionicScrollDelegate = ionicScrollDelegate.$getByHandle(handle);
        }
        
        function renderScrollableTabs(index){
          var iconsDiv = angular.element(ta.querySelector(".tsb-icons")), icons = iconsDiv.find("a"), wrap = iconsDiv[0].querySelector(".tsb-ic-wrp"), totalTabs = icons.length;
          var scrollDiv = wrap.querySelector(".scroll");
          
          angular.forEach(icons, function(value, key){
               var a = angular.element(value);
               a.on('click', function(){
                 ionicSlideBoxDelegate.slide(key);
               });

            if(a.attr('icon-off')) {
              a.attr("class", a.attr('icon-off'));
            }
          });
          
          //Initializing the middle tab

          /*
          if(typeof attrs.tab === 'undefined' || (totalTabs <= initialIndex) || initialIndex < 0){
            initialIndex = Math.floor(icons.length/2);
          }
          */
          //If initial element is 0, set position of the tab to 0th tab 
          if(index == 0){
            setPosition(0);
          }

          
          $timeout(function() {
            ionicSlideBoxDelegate.slide(index);
          }, 0);
        }
        function setPosition(index){
          var iconsDiv = angular.element(ta.querySelector(".tsb-icons")), 
          icons = iconsDiv.find("a"), 
          wrap = iconsDiv[0].querySelector(".tsb-ic-wrp"), totalTabs = icons.length;
          var scrollDiv = wrap.querySelector(".scroll");
          
          var middle = iconsDiv[0].offsetWidth/2;
          var curEl = angular.element(icons[index]);
          var prvEl = angular.element(iconsDiv[0].querySelector(".active-tab"));
          if(curEl && curEl.length){
          var curElWidth = curEl[0].offsetWidth, curElLeft = curEl[0].offsetLeft;
            ionicScrollDelegate.scrollTo(Math.abs((curElLeft)),0,true);
          if(prvEl.attr('icon-off')) {
            prvEl.attr("class", prvEl.attr('icon-off'));
          }else{
            prvEl.removeClass("active-tab");
          }
          if(curEl.attr('icon-on')) {
            curEl.attr("class", curEl.attr('icon-on'));
          }
          curEl.addClass("active-tab");
       
           

         
          var leftStr = (middle  - (curElLeft) -  curElWidth/2 + 5);
          //If tabs are not scrollable
      //    if(!scrollDiv){
            /*
            var leftStr = (middle  - (curElLeft) -  curElWidth/2 + 5) + "px";
            wrap.style.webkitTransform =  "translate3d("+leftStr+",0,0)" ;
            */
         // }else{
          if(scrollDiv){
            //If scrollable tabs
            var wrapWidth = wrap.offsetWidth;
            var currentX = Math.abs(getX(scrollDiv.style.webkitTransform));
            var leftOffset = 100;
            var elementOffset = 40;
            //If tabs are reaching right end or left end
            if(((currentX + wrapWidth) < (curElLeft + curElWidth + elementOffset)) || (currentX > (curElLeft - leftOffset))){
              if(leftStr > 0){
                leftStr = 0;
              }
              //Use this scrollTo, so when scrolling tab manually will not flicker
              ionicScrollDelegate.scrollTo(Math.abs(leftStr), 0, true);
            }
          }
          }
        };
        function getX(matrix) {
          matrix = matrix.replace("translate3d(","");
          matrix = matrix.replace("translate(","");
          return (parseInt(matrix));
        }
        var events = scope.events;
        
        events.on('slideChange', function(data){
          setPosition(data.index);
          
        });

        events.on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
          renderScrollableTabs(scope.initialIndex);
        });
        
        scope.$watch(indexFactory.getIndex, function (newVal,oldVal){

              if(newVal){
                 renderScrollableTabs(newVal);
              }
            
          
        });

           renderScrollableTabs(0);
      },
      controller : function($scope, $attrs, $element) {
        $scope.events = new SimplePubSub();
        
        $scope.slideHasChanged = function(index){
          $scope.events.trigger("slideChange", {"index" : index});
          $timeout(function(){if($scope.onSlideMove) $scope.onSlideMove({"index" : eval(index)});},100);
        };
        
        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
          $scope.events.trigger("ngRepeatFinished", {"event" : ngRepeatFinishedEvent});
        });
      }
    };

  } 
])



.directive('tapDetector',function($ionicGesture,$ionicScrollDelegate){
  return{
    restrict:'EA',
    link:function(scope,element){
      var startX,startY,isDown=false;
      element.bind("mousedown touchstart", function(e){
        e=(e.touches)?e.touches[0]:e;//e.touches[0] is for ios
        startX = e.clientX;
        startY = e.clientY;
        isDown=true;
        //console.log("mousedown",startX,startY);
      });

      element.bind("mousemove touchmove", function(e){
        e=(e.touches)?e.touches[0]:e;//e.touches[0] is for ios
        if(isDown){
          var deltaX = Math.abs(e.clientX - startX);
                var deltaY = Math.abs(e.clientY - startY);

          if(deltaX > deltaY) {
          //console.log("horizontal move");
            $ionicScrollDelegate.$getByHandle('mainScroll').freezeScroll(true);
            }

            
        }
      });

      element.bind("mouseup touchend", function(e){
        isDown=false;
        $ionicScrollDelegate.$getByHandle('mainScroll').freezeScroll(false);
        //console.log("mouseup touchend");
      });
    }
  }
})
.directive('imgPreload', ['$rootScope', function($rootScope) {
    return {
      restrict: 'A',
      scope: {
        ngSrc: '../img/ts.jpg'
      },
      link: function(scope, element, attrs) {
        element.on('load', function() {
          element.addClass('in');
        }).on('error', function() {
          //
        });

        scope.$watch('ngSrc', function(newVal) {
          element.removeClass('in');
        });
      }
    };
}]);

