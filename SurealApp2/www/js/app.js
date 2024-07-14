// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('surealMusic', ['ionic', 'surealMusic.controllers', 'surealMusic.services', 'surealMusic.cloudAPI', "surealMusic.musicPlayer", 'ionic-native-transitions', 'ionic-pullup'])
    //add slidebox to use slidebox code

.run(function ($ionicPlatform, $log) {

    $ionicPlatform.ready(function () {


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
            $log.debug(cordova.file);
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

      //***********************************************Transitions*****************************************************************
    //****************************************************************************************************************
   .config(function ($ionicNativeTransitionsProvider) {
       $ionicNativeTransitionsProvider.setDefaultTransition({
           type: 'slide',
           direction: 'left',
           duration: 200
       });
   })
//***********************************************Transitions*****************************************************************
//****************************************************************************************************************



.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $logProvider, $compileProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in
    // Each state's controller can be found in controllers.js



    //    $urlRouterProvider.when('/event', {
    ///      templateUrl: 'tab-event.html'
    // });

    var enableDebug = true;

    if (enableDebug == false) {
        $logProvider.debugEnabled(false);
        $compileProvider.debugInfoEnabled(false);
    }

    //use native scrolling
    $ionicConfigProvider.scrolling.jsScrolling(false);

    // bring tabs to thetrue bottom on all devices
    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider
    // setup an abstract state for the tabs directive
    .state('tab', {
        cache: true,
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'tabCtrl'
    })



    .state('tab.myMusic', {
        url: '/myMusic',
        //nativeTransitions: {
        //    cache: true,
        //    "type": "slide",
        //    "direction": "left",
        //    "duration": 200
        //},
        views: {
            'tab-myMusic': {
                templateUrl: 'templates/tab-myMusic.html'
                //   controller: 'myMusicCtrl'
            }
        }
    })

   .state('tab.home', {
       cache: true,
       url: '/home',
       //nativeTransitions: {
       //    "type": "flip",
       //    "direction": "left",
       //    "duration": 200
       //},
       views: {
           'tab-home': {
               templateUrl: 'templates/tab-home.html'
               //    controller: 'HomeCtrl'

           }

       }

   })

    .state('tab.chat-detail', {
        url: '/chats/:chatId',
        //nativeTransitions: {
        //    "type": "flip",
        //    "direction": "left",
        //    "duration": 200
        //},
        views: {
            'tab-chats': {
                templateUrl: 'templates/chat-detail.html',
                controller: 'ChatDetailCtrl'
            }
        }
    })

    .state('tab.account', {
        url: '/account',
        //nativeTransitions: {
        //    "type": "slide",
        //    "direction": "left",
        //    "duration": 200
        //},
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'accountCtrl'
            }
        }
    })

   .state('tab.myLibrary', {
       url: '/myLibrary',
       //nativeTransitions: {
       //    "type": "slide",
       //    "direction": "left",
       //    "duration": 200
       //},
       views: {
           'tab-myLibrary': {
               templateUrl: 'templates/tab-myLibrary.html',
               controller: 'myLibraryCtrl'
           }
       }
   })


    //-----------------------------------------------------------------------------------------------//
    //-----------------------------------------------------------------------------------------------//
    //-----------------------------------------------------------------------------------------------//
    // Each tab has its own nav history stack:
    .state('tab.userprofile', {
        url: '/userprofile',
        //nativeTransitions: {
        //    "type": "slide",
        //    "direction": "left",
        //    "duration": 200
        //},
        views: {
            'tab-userprofile': {
                templateUrl: 'templates/tab-userprofile.html'
                //   controller: 'ProfileCtrl'
            }
        }
    })


    // Each tab has its own nav history stack:
    .state('tab.explorer', {
        url: '/explorer',
        //nativeTransitions: {
        //    "type": "slide",
        //    "direction": "left",
        //    "duration": 200
        //},
        views: {
            'tab-explorer': {
                templateUrl: 'templates/tab-Explorer.html'
                //   controller: 'explorerCtrl'
            }
        }
    })


      // Each tab has its own nav history stack:
    .state('tab.artist', {
        url: '/artist',
        //nativeTransitions: {
        //    "type": "slide",
        //    "direction": "left",
        //    "duration": 200
        //},
        views: {
            'tab-artist': {
                templateUrl: 'templates/tab-artist.html',
                // controller: 'artistCtrl'
            }
        }
    })


    // Each tab has its own nav history stack:
    .state('tab.event', {
        url: '/event',
        //nativeTransitions: {
        //    "type": "slide",
        //    "direction": "left",
        //    "duration": 200
        //},
        views: {
            'tab-event': {
                templateUrl: 'templates/tab-event.html',
                // controller: 'eventCtrl'
            }
        }
    })



    // Each tab has its own nav history stack:
    .state('tab.player', {
        url: '/player',
        nativeTransitions: {
            "type": "slide",
            "direction": "up",
            "duration": 200
        },
        views: {
            'tab-player': {
                templateUrl: 'templates/tab-musicPlayer.html'
                // controller: 'eventCtrl'
            }
        }
    })


    // Each tab has its own nav history stack:
    .state('tab.search', {
        url: '/search',
        nativeTransitions: {
            "type": "slide",
            "direction": "up",
            "duration": 200
        },
        views: {
            'tab-search': {
                templateUrl: 'templates/tab-mySearch.html',
                controller: 'searchCtrl'
            }
        }
    })


        // Each tab has its own nav history stack:
    .state('tab.dashboard', {
        url: '/dashboard',
        nativeTransitions: {
            "type": "slide",
            "direction": "up",
            "duration": 200
        },
        views: {
            'tab-dashboard': {
                templateUrl: 'templates/tab-dashboard.html'
            }
        }
    })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

})


