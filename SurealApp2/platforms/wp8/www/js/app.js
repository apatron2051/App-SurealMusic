// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('surealMusic', ['ionic', 'surealMusic.controllers', 'surealMusic.services', 'surealMusic.cloudAPI',"surealMusic.musicPlayer", 'angular-svg-round-progress', 'ionic-audio', 'ionic-native-transitions','ionic-pullup'])
    //add slidebox to use slidebox code

.run(function ($ionicPlatform) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboar
    // for form inputs)
      if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        //Add back once ready top compile to IOS device
         // $cordovaStatusbar.hide();
    
       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
       cordova.plugins.Keyboard.disableScroll(true);
    }
      if (window.StatusBar) {
      //Add back once ready top compile to IOS device

      // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
      //   $cordovaStatusbar.hide();
      }


      document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {
          console.log(cordova.file);
      }
  });
})

    //side menu 3d effects

    .directive('ionSideMenuContentScale', function ($timeout, $rootScope, $ionicModal) {
        return {
            restrict: 'AC',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return element.attr('style');
                }, function (newValue) {
                    if (typeof newValue != "undefined") {
                        var transform = newValue.replace("transform: translate3d", "");
                        transform = transform.replace(/[^\w\s]/gi, '');
                        transform = transform.replace(/px/gi, '');
                        var axis = transform.split(" ");
                        if (typeof axis[0] != "undefined" && parseInt(axis[0]) != 0) {
                            element.addClass('side-menu-open');
                        } else {
                            element.removeClass('side-menu-open');
                        }

                    }

                });
            }
        }
    })

  
      //****************************************************************************************************************
    //****************************************************************************************************************
   
    .controller('PlayLoopCtrl', function($scope, MediaSrv){
    var shouldPlay = false;
    var myMedia = null;
    function onStop(){
        if(myMedia !== null && shouldPlay){
            myMedia.play();
        }
    }
    MediaSrv.loadMedia('sounds/1023.mp3', onStop).then(function(media){
        myMedia = media;
    });

    function playStart(){
        shouldPlay = true;
        onStop();
    }
    function playStop(){
        shouldPlay = false;
        myMedia.stop();
    }
})

    .controller('PlayLoopMultiCtrl', function($scope, MediaSrv){
    var shouldPlay = false;
    var soundFiles = ['sounds/1.mp3', 'sounds/2.mp3', 'sounds/3.mp3'];
    var playingMediaIndex = null;
    var mediaInstances = [];
    var onStop = function(){
        if(shouldPlay){
            if(playingMediaIndex === null){
                playingMediaIndex = 0;
            } else {
                playingMediaIndex = (playingMediaIndex+1) % mediaInstances.length;
            }
            mediaInstances[playingMediaIndex].play();
        }
    };

    for(var i in soundFiles){
        MediaSrv.loadMedia(soundFiles[i], onStop).then(function(media){
            mediaInstances.push(media);
        });
    }

    function playStart(){
        shouldPlay = true;
        onStop();
    }
    function playStop(){
        shouldPlay = false;
        mediaInstances[playingMediaIndex].stop();
    }

})

      //***********************************************Transitions*****************************************************************
    //****************************************************************************************************************
   .config(function($ionicNativeTransitionsProvider){
       $ionicNativeTransitionsProvider.setDefaultTransition({
           type: 'slide',
           direction: 'left'
       });
   })
//***********************************************Transitions*****************************************************************
//****************************************************************************************************************



.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

    // bring tabs to the bottom on all devices
    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider
    // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'tabCtrl'
    })


    // Each tab has its own nav history stack:
    .state('tab.userprofile', {
        url: '/userprofile',
        nativeTransitions: {
            "type": "slide",
            "direction": "left"
        },
        views: {
            'tab-userprofile': {
                templateUrl: 'templates/tab-userprofile.html',
                controller: 'ProfileCtrl'
            }
        }
    })


    // Each tab has its own nav history stack:
    .state('tab.explorer', {
        url: '/explorer',
        nativeTransitions: {
            "type": "slide",
            "direction": "left"
        },
        views: {
            'tab-explorer': {
                templateUrl: 'templates/tab-Explorer.html',
                controller: 'explorerCtrl'
            }
        }
    })

    .state('tab.myMusic', {
        url: '/myMusic',
        nativeTransitions: {
            "type": "slide",
            "direction": "left"
        },
        views: {
            'tab-myMusic': {
                templateUrl: 'templates/tab-myMusic.html',
                controller: 'myMusicCtrl'
            }
        }
    })

   .state('tab.home', {
       url: '/home',
       nativeTransitions: {
           "type": "flip",
           "direction": "left"
       },
       views: {
           'tab-home': {
               templateUrl: 'templates/tab-home.html',
               controller: 'HomeCtrl'

           }

       }

   })

    .state('tab.chat-detail', {
        url: '/chats/:chatId',
        nativeTransitions: {
            "type": "flip",
            "direction": "left"
        },
        views: {
            'tab-chats': {
                templateUrl: 'templates/chat-detail.html',
                controller: 'ChatDetailCtrl'
            }
        }
    })

    .state('tab.account', {
        url: '/account',
        nativeTransitions: {
            "type": "slide",
            "direction": "left"
        },
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    })

   .state('tab.musicPlayer', {
       url: '/musicPlayer',
       nativeTransitions: {
           "type": "slide",
           "direction": "left"
       },
           views: {
               'tab-musicPlayer': {
                   templateUrl: 'templates/tab-musicPlayer.html',
                   controller: 'MusicPlayerCtrl'
               }
           }
       })

 
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

});

