
angular.module('surealMusic.controllers', [])
   
    
   ///******************************************************************************************************************************
   ///***********************************************DASHBOARD*******************************************************************************
   ///******************************************************************************************************************************
        .controller('dashboardCtrl', function ($scope, $window, $ionicNavBarDelegate, $rootScope, $state, manageSessionService, $timeout, $log, surealServices) {
            var title, definedClass;
            var firstSearch = true;
            $scope.inputSearch = "";

            try {
               
                var promise = surealServices.getDashboard(JSON.parse(localStorage.getItem("userAuth")));
                promise.then(function (response) {

                    //build comprehensive json reponse into data object
                    response = JSON.parse(response);
                    $log.error("1:" + JSON.stringify(response));

                }, function (reason) {
                    $log.debug("dashboardCtrl Error:" + reason);
           
             
                })
            }
            catch (e) {
      
                $log.debug("dashboardCtrl json error: " + e.message);
  
            }


            try {
               
                var promise = surealServices.getDashboardTrendingSongDetails(JSON.parse(localStorage.getItem("userAuth")));
                promise.then(function (response) {

                    //build comprehensive json reponse into data object
                    response = JSON.parse(response);
                    $log.error(JSON.stringify(response));
                  
                }, function (reason) {
                    $log.debug("dashboardCtrl Error:" + reason);
           
             
                })
            }
            catch (e) {
      
                $log.debug("dashboardCtrl json error: " + e.message);
  
            }


            //L
      

        })


   ///******************************************************************************************************************************
   ///************************************************** SEARCH ********************************************************
   ///******************************************************************************************************************************
     //****************************************************************************************
      .controller('searchbarCtrl', function ($scope, $window, $ionicNavBarDelegate, $rootScope, $state, manageSessionService, $timeout) {
          var title, definedClass;
          var firstSearch = true;
          $scope.inputSearch = "";


          $scope.goSearch = function () {

              
              manageSessionService.setCurrentSearch($scope.inputSearch);

              if (firstSearch == true) {
                  $timeout(function () {
                      $rootScope.$broadcast('goSearch', { searchString: $scope.inputSearch });

                  }, 1000);
              }
              else
              {
                  firstSearch = false;
                  $rootScope.$broadcast('goSearch', { searchString: $scope.inputSearch });
              }
              $state.go("tab.search"); //use the transition defined in app.js

          }
         
      })

     //Serarch Controller ******************************************************************

    .controller('searchCtrl', function ($scope, $window, $ionicSlideBoxDelegate, surealServices,$ionicLoading, $rootScope, $log, $timeout, getActionSheet, manageSessionService) {
        var title, definedClass;
        $scope.imagesAreRound = false;

        $scope.hideMe = true;
        $scope.$on("$ionicView.enter", function () { $scope.hideMe = false; });
        $scope.$on("$ionicView.leave", function () { $scope.hideMe = true; });
        
        //Build this list using dynamic query as shown below with exact items.
        $scope.searchArtistData = false;
        $scope.searchArtistAlbums = false;


        $scope.searchBandData = false;
        $scope.searchBands = false;

        $scope.searchAlbumData = false;
        $scope.searchAlbums = false;

        $scope.songData = false;
        $scope.searchSongs = false;

        $scope.eventData = false;
        $scope.searchEvents = false;
    
        $scope.ItemCol = surealServices.getItemCol();

        //Images are round *******************************************************************
        $rootScope.$on('goSearch', function (event, args) {

            // Setup the loader
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            
            //Downladed albums******************************************************************************************************
            try {
                $log.debug("getting search results");
                
                var promise = surealServices.getSearch(JSON.parse(localStorage.getItem("userAuth")),args.searchString, true);
                promise.then(function (response) {

                
                    $scope.searchArtistData = true;
                    $scope.searchArtistAlbums = [];
                    //  localStorage.setItem("myMusicWhatsNewAlbums", JSON.stringify(response));
                    $scope.searchArtistAlbums = response[0];;

                    $timeout(function () {
                        $ionicSlideBoxDelegate.$getByHandle('searchArtistAlbumsBox').update();
                    });

                   
                    $scope.searchBandData = true;
                    $scope.searchBands = [];
                    //  localStorage.setItem("myMusicWhatsNewAlbums", JSON.stringify(response));
        
                    $scope.searchBands = response[1];
                  

                    $timeout(function () {
                        $ionicSlideBoxDelegate.$getByHandle('searchBandsBox').update();
                    });

                    $scope.searchAlbumData = true;
                    $scope.searchAlbums = [];
                    //  localStorage.setItem("myMusicWhatsNewAlbums", JSON.stringify(response));
                    $scope.searchAlbums = response[2];

                    $timeout(function () {
                        $ionicSlideBoxDelegate.$getByHandle('searchAlbumsBox').update();
                    });

                    $scope.songData = true;
                    $scope.songData = [];
                    //  localStorage.setItem("myMusicWhatsNewAlbums", JSON.stringify(response));
                    $scope.searchSongs = response[3];
       
                    $timeout(function () {
                        $ionicSlideBoxDelegate.$getByHandle('songsBox').update();
                    });

                    $scope.eventData = true;

                    $scope.eventData = [];
                    //  localStorage.setItem("myMusicWhatsNewAlbums", JSON.stringify(response));
                    $scope.searchEvents = response[4];
       
                    $timeout(function () {
                        $ionicSlideBoxDelegate.$getByHandle('searchEventBox').update();
                    });


                    $scope.merchData = true;
                    $scope.merchData = [];
                    //  localStorage.setItem("myMusicWhatsNewAlbums", JSON.stringify(response));
                    $scope.searchMerch = response[5];

                    $timeout(function () {
                        $ionicSlideBoxDelegate.$getByHandle('searchMerchBox').update();
                    });


                    // 

                    // 


                }, function (reason) {
                    $log.debug("Controller Error:" + reason);
                    $scope.searchArtistData = true;

                })
            }
            catch (e) {
                $scope.searchArtistData = false;
                $log.debug("controller json error: " + e.message);
            }

            $ionicLoading.hide();
        });


        //show action sheet
        $scope.actSheetWXN = function (options, id, resource_name, resource_img, resource_type) {
        
            getActionSheet.show(options, id, resource_name, resource_img, resource_type);
        }


        })

   ///******************************************************************************************************************************
   ///******************************************************************************************************************************
   ///******************************************************************************************************************************
     //****************************************************************************************
    .controller('pullUpBar', function ($scope, $window) {

        $scope.dev_width = $window.innerWidth;
        $scope.dev_height = $window.innerHeight;
    })

    //****************************************************************************************
    .controller('explorerCtrl', function ($scope, $ionicSlideBoxDelegate, getActionSheet) {

    })
     //****************************************************************************************
    //home COntroller
    .controller('homeCtrl', function ($scope, $location, $state, $ionicPopup, $ionicNativeTransitions, surealMusicServices) {

        $scope.go = function (path) {
            $location.path(path);
        };

        $scope.goNativeTransition = function (path) {

            if (path == "/tab/player") {

                if (surealMusicServices.getCurrentSong() != null && surealMusicServices.getCurrentSong() != "") {

                    $state.go(path); //use the transition defined in app.js
                }
                else {
                    var alertPopup = $ionicPopup.alert({
                        cssClass: "surealPopup",
                        title: 'Sureal Music',
                        template: 'Please select an Album, Playlist or Song'
                    });

                    $timeout(function () {
                        alertPopup.close(); //close the popup after 3 seconds for some reason
                    }, 3000);
                }
            }
            else {

             
                $ionicNativeTransitions.locationUrl(path, {
                    "type": "slide",
                    "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
                    "duration": 600, // in milliseconds (ms), default 400
                });
            }
        };
    })


   ///******************************************************************************************************************************
   ///******************************************************************************************************************************
   ///******************************************************************************************************************************
   ///******************************************************************************************************************************
     //***************************************************************************************
   //Login and user management - sets:
   // localStorage.setItem("userProfile", "");
   // localStorage.setItem("userAuth", "");
    .controller('loginCtrl', function ($q, $scope, $window, $timeout,$log, $ionicLoading, $ionicHistory, surealServices) {


        //reset local storage for user profile
        localStorage.setItem("userProfile", "");
        localStorage.setItem("userAuth", "");
        $scope.inputError = false;

        // Controller
        $scope.person = {
            userEmail: "",
            userPassword: ""
        }

      

        $scope.userAuth = {

            auth_uid: "",
            auth_token: "",
            account_user_id: ""
        }
        //login button function call
        $scope.loginGo = function () {

            // Setup the loader
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            var loginValid = false;
            $scope.loginError = false;


              
            //Logging in  
            //username, password, isSignup, isSocialsignin
            try {
                var promise = surealServices.Login($scope.person.userEmail, $scope.person.userPassword, false, false);
                promise.then(function (response) {
                   
                    //build comprehensive json reponse into data object
                    response = JSON.parse(response);

                    if (response.data.auth_token != null) {
                        var userDataProfile = JSON.parse(response.data.account.private_profile_json);

                        //save the auth information to local storage
                        $scope.userAuth.auth_uid = response.data.auth_uid;
                        $scope.userAuth.auth_token = response.data.auth_token;
                        $scope.userAuth.account_user_id = response.data.account.id;
                        localStorage.setItem("userAuth", JSON.stringify($scope.userAuth));

                        $log.debug("Logged in as:" + $scope.person.userEmail + " with UserID:" + JSON.stringify($scope.userAuth));
                        ///user can login
                        loginValid = true;
                    }
                    else
                    {
                        loginValid = false;
                    }
                    validateLogin(response, userDataProfile);

                }, function (reason) {
                    $log.debug("Controller Error:" + reason);
                    loginValid = false;
                    validateLogin(null,null);
                })
            }
            catch (e) {
                loginValid = false;
                $log.debug("controller json error: " + e.message);
                validateLogin(null,null);
            }


            //Login Valid
            function validateLogin(userData,userDataProfile) {
     
                if (loginValid == true) {
                    //get user data 

                  
             
                    $scope.userProfile =
                    {
                        FirstName: userData.data.account.name,
                        LastName: '',
                        ProfileTag: userDataProfile.tagline,
                        ProfileDesc: userDataProfile.aboutyou,
                        email: $scope.person.userEmail,
                        home: userDataProfile.location,
                        followers: "100",
                        following: "208",
                        playlists: "10",
                        facebookLink: userDataProfile.fb_link,
                        twitterLink: userDataProfile.twitter_link,
                        googlePlusLink: userDataProfile.googleplus_link,
                        microsoftLink:  userDataProfile.microsoft_link,
                        lastLogIn: "",
                        lastSongPlayedID: "",
                        lastAlbumID: "",
                        lastScreenVisited: "",
                        accountUserID: userData.data.account_user_id,
                        profileimage: userDataProfile.profile_photo[0].photo
                    }

 
                    //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                    //********** INTEGRATION WORK END**************************************************************************************************************

                    $scope.actSheetSlider = function (options) {
                        getActionSheet.show(options, id);
                    }

                    //Store information for use later in local storage. Do it everytime you generate the information.
                    localStorage.setItem("userProfile", JSON.stringify($scope.userProfile));


                    function redirect() {
                        $window.location.href = "surealMusic.html";
                    }
                  //  $timeout(redirect, 500);

                    redirect();
                }
                else {
                    $scope.loginError = true;
                    $scope.inputError = !$scope.inputError;
                    $ionicLoading.hide();

                } //is valid
            } //validate login
        } //login go
          

    })



   ///******************************************************************************************************************************
   ///******************************************************************************************************************************
   ///******************************************************************************************************************************
     //***************************************************************************************
     //gets Localstroage- userProfile
    .controller('ProfileCtrl', function ($scope, $ionicSlideBoxDelegate, getActionSheet) {
           
        //get information from local storage. Do it everytime you generate the information.
        $scope.userProfile = JSON.parse(localStorage.getItem("userProfile"));
   
    })



      //***************************************************************************************

   .controller('playerArtistCtrl', function ($scope, $ionicSlideBoxDelegate, surealMusicServices, surealServices, getActionSheet,manageSettingsService) {


       var responseData = []; 

       //Set the imaghes on the controller
       $scope.imagesAreRound = false;

       //Images are round *******************************************************************
       //$scope.$on('imageStateRound', function (event, args) {
       //    $scope.imagesAreRound = manageSettingsService.getImageStateRound();
       //});


       //Globals data
       $scope.albumDetails = [];
       $scope.albumDetailsGetData = false;
       $scope.ItemCol = surealServices.getItemCol();

       //watch for current song updated and update screen.
       $scope.$on('albumChanged', function (event, args) {

           //get information from local storage. Do it everytime you generate the information.
           responseData = [];
           responseData = surealMusicServices.getCurrentAlbumDetails();
           $scope.albumDetails = responseData[0];
     
           $scope.albumDetailsGetData = true;

       });

       $scope.actShowImage = function (showImage) {

       }

       //show action sheet
       $scope.actSheetWXN = function (options, id, resource_name, resource_img, resource_type) {
           getActionSheet.show(options, id, resource_name, resource_img, resource_type);

       }

   })


      //***************************************************************************************

   .controller('artistCtrl', function ($scope, $ionicHistory, surealMusicServices, surealServices, getActionSheet, manageSettingsService) {


       var responseData = [];
       $scope.artistData = [];
       $scope.ItemCol = surealServices.getItemCol();

       //Go back on click of close to go back to calling page
       $scope.goBack = function () {
           $ionicHistory.goBack();
       }

       //Set the imaghes on the controller
       $scope.imagesAreRound = false;

       //Images are round *******************************************************************
       //$scope.$on('imageStateRound', function (event, args) {
       //    $scope.imagesAreRound = manageSettingsService.getImageStateRound();
       //});

       //watch for current song updated and update screen.
       $scope.$on('artistChanged', function (event, args) {

           //get information from local storage. Do it everytime you generate the information.
           responseData = [];
           responseData = surealMusicServices.getCurrentArtist();
           $scope.artistData = responseData[0];
           $scope.artistGetData = true;
           $scope.eventWhatsNewEventsData = true;


           albumData = [];
           albumData = surealServices.getArtistAlbum(surealMusicServices.getCurrentArtistId());
           alert(JSON.stringify(albumData));
           $scope.albumData = albumData[0];
           $scope.albumGetData = true;
          

  

           albumData = [];
           getArtistAlbum


       });
          
        $scope.actShowImage = function (showImage)
        {

        }

        //show action sheet
        $scope.actSheetWXN = function (options, id, resource_name, resource_img, resource_type) {
            getActionSheet.show(options, id, resource_name, resource_img, resource_type);

        }

     })

    //*****---------------------------------------------------------------------------------------------------****//
    .controller('eventCtrl', function ($scope, $ionicSlideBoxDelegate, $ionicHistory, surealMusicServices, surealServices, getActionSheet, manageSettingsService) {

        var responseData = [];
        $scope.eventArtistsData = false;
        $scope.currentEventDataUpdated = false;
        $scope.ItemCol = surealServices.getItemCol();


        $scope.hideMe = true;
        $scope.$on("$ionicView.enter", function () { $scope.hideMe = false; });
        $scope.$on("$ionicView.leave", function () { $scope.hideMe = true; });


        //Go back on click of close to go back to calling page
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }

      
        //Set the imaghes on the controller
        $scope.imagesAreRound = false;
        //Images are round *******************************************************************
        //$scope.$on('imageStateRound', function (event, args) {
        //    $scope.imagesAreRound = manageSettingsService.getImageStateRound();
        //});


        //watch for current song updated and update screen.
        $scope.$on('eventChanged', function (event, args) {

            if (surealMusicServices.getCurrentEventUpdated() == true)
                /***Get the specfic event***/ {


                //get information from local storage. Do it everytime you generate the information.
                responseData = [];
                responseData = surealMusicServices.getCurrentEvent();
                $scope.eventData = responseData[0];
                $scope.eventArtistsData = true;
                $scope.eventWhatsNewEventsData = true;
            }
        });

        //show action sheet
        $scope.actSheetWXN = function (options, id, resource_name, resource_img, resource_type) {
              getActionSheet.show(options, id, resource_name, resource_img, resource_type);

        }


    })

    /* The controllers recieve data from a database / webservice call.
    Each set of data is different, common fields are:

    ImageURL : the Image of the URL to display on the device
    id: The id of the item from the api-call - to pass to other objects
    options: What buttons to show on every image
    Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can Follow, Can Ratings
    So this is the structure:
    options: "1,1,1,0,0,0,1"
    INTEGRATION: MAKE INTO AN ENUM

    1 is true, 0 is false
    */
    //Data controllers
    .controller('myMusicShowCaseCtrl', function ($scope, $ionicSlideBoxDelegate, getActionSheet, surealServices,manageSettingsService,manageSettingsService, $timeout, $log)
    {
        var lcl_options = surealServices.getSliderOptions();

        //Images are round 
        $scope.imagesAreRound = false;
        //Images are round *******************************************************************
        //$scope.$on('imageStateRound', function (event, args) {
        //    $scope.imagesAreRound = manageSettingsService.getImageStateRound();
        //});

        $scope.hideMe = true;
        $scope.$on("$ionicParentView.afterEnter", function () {
            $scope.hideMe = false;
            $ionicSlideBoxDelegate.$getByHandle('showcaseSlideBox').start();
            $ionicSlideBoxDelegate.$getByHandle('showcaseSlideBox').next();
        });

        $scope.$on("$ionicParentView.afterLeave", function () {
            $scope.hideMe = true;
            $ionicSlideBoxDelegate.$getByHandle('showcaseSlideBox').stop();
        });

        //**************************************************Get all the music*********************************************************************************************

        try {
            $log.debug("getting new music");
            var promise = surealServices.getNewAlbumsForCurrentUser(JSON.parse(localStorage.getItem("userAuth")), false);
            promise.then(function (response) {

                $scope.myMusicShowCaseData = true;
                //  localStorage.setItem("myMusicWhatsNewAlbums", JSON.stringify(response));
                $scope.myMusicShowCase = response;
                

                $timeout(function () {
                    $ionicSlideBoxDelegate.$getByHandle('showcaseSlideBox').update();
                });
                // 


            }, function (reason) {
                $log.debug("Controller Error:" + reason);
                $scope.myMusicWhatsNewAlbumsData = true;

            })
        }
        catch (e) {
            $scope.myMusicWhatsNewAlbumsData = false;
            $log.debug("controller json error: " + e.message);
        }

        //**************************************************Get all the playlists*********************************************************************************************

        //get the index of the slide
        //********** INTEGRATION WORK END**************************************************************************************************************
        $scope.slideIndexWN = function (slideIndex) {
            //$ionicSlideBoxDelegate.$getByHandle('whatsNewSlideBox').slide(slideIndex);
            // $ionicSlideBoxDelegate.$getByHandle('whatsNewSlideBox').update();
        }

        //show action sheet
        $scope.actSheetWXN = function (options, id, resource_name, resource_img, resource_type) {

            getActionSheet.show(options, id, resource_name, resource_img, resource_type);

        }
     
        //********** INTEGRATION WORK BEGIN**************************************************************************************************************
        //Build this list using dynamic query as shown below with exact items.
        $scope.myMusicSliderImages = [
            { Artist: "The Beatles", Name: 'Abby Road', Options: lcl_options, ImageURL: "http://ecx.images-amazon.com/images/I/61LhV5-8vLL.jpg", id: 1 },
            { Artist: "Van Halen", Name: '1984', Options: lcl_options, ImageURL: "http://ecx.images-amazon.com/images/I/51WBWyEnFCL.jpg", id: 2 },
            { Artist: "Cash", Name: 'The Man Comes Around', Options: lcl_options, ImageURL: "http://ecx.images-amazon.com/images/I/41mfMbu0ADL.jpg", id: 3 },
            { Artist: "Johny Coltrane", Name: 'Blue Train', Options: lcl_options, ImageURL: "http://ecx.images-amazon.com/images/I/51OHUeofS3L.jpg", id: 4 },
            { Artist: "Queen", Name: 'Queen II', Options: lcl_options, ImageURL: "http://ecx.images-amazon.com/images/I/51BwhjEN1XL.jpg", id: 5 },
            { Artist: "Pink Floyd", Name: 'Wish You Where Here',Options: "1,1,1,1,1,0,1" ,  ImageURL: "http://ecx.images-amazon.com/images/I/510mQlM8AVL.jpg", id: 6 }
        ];
        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
        //********** INTEGRATION WORK END**************************************************************************************************************
             
        $scope.actSheetSlider = function (options, id, resource_name, resource_img, resource_type) {
            getActionSheet.show(options, id, resource_name, resource_img, resource_type);
        }

        //Store information for use later in local storage. Do it everytime you generate the information.
        localStorage.setItem("myMusicSliderImages", JSON.stringify($scope.myMusicSliderImages));
    })


    
    //********************************TRENDING *****************************************************************************************
    .controller('myMusicTrendingAlbumCtrl', function ($q, $scope, $window, $timeout, $ionicLoading, surealServices, $ionicSlideBoxDelegate, getActionSheet,manageSettingsService , $log) {


        $scope.myMusicTrendingAlbumsData = false;
        $scope.myMusicTrendingAlbums = [];
        $scope.ItemCol = surealServices.getItemCol();


        //Images are round *******************************************************************
        $scope.imagesAreRound = false;


        //Build this list using dynamic query as shown below with exact items.
        try {
            $log.debug("getting new trending albums");
            var promise = surealServices.getTrendingAlbumsForUser(JSON.parse(localStorage.getItem("userAuth")), true);
            promise.then(function (response) {



                $scope.myMusicTrendingAlbums = response;

                $scope.myMusicTrendingAlbumsData = true;
                //now load the data

      

            }, function (reason) {
                $log.debug("Controller Error  trending albums");
                $log.debug("Controller Error:" + reason);
                $scope.myMusicWhatsNewPlayListData = true;
                //  loadData(false);
            })
        }
        catch (e) {
            $scope.myMusicWhatsNewPlayListData = false;
            $log.debug("controller json error: " + e.message);
        }



        //********** INTEGRATION WORK END**************************************************************************************************************
        //next slide
        $scope.Next = function (slideIndex) {

            // $ionicSlideBoxDelegate.next();
        }

        //call the action sheet
        $scope.actSheet = function (options, resource_id, resource_name, resource_img, resource_type) {
            getActionSheet.show(options, resource_id, resource_name, resource_img, resource_type);
        }


        $ionicSlideBoxDelegate.$getByHandle('myMusicTrendingAlbumCtrl').update();
    })


    //********************************TRENDING *****************************************************************************************
    .controller('myMusicTrendingCtrl', function ($q, $scope, $window, $timeout, $ionicLoading, surealServices, $ionicSlideBoxDelegate, getActionSheet,manageSettingsService , $log) {


        $scope.myMusicTrendingAlbumsData = false;
        $scope.myMusicTrendingSongsData = false;
        $scope.myMusicTrendingArtistsData = false;
        $scope.myMusicTrendingAlbums = [];
        $scope.ItemCol = surealServices.getItemCol();


        $scope.hideMe = true;
        $scope.$on("$ionicView.enter", function () { $scope.hideMe = false; });
        $scope.$on("$ionicView.leave", function () { $scope.hideMe = true; });

        //Images are round *******************************************************************
        $scope.imagesAreRound = false;
    

        //Build this list using dynamic query as shown below with exact items.
        try {
            $log.debug("getting new trending songs");
            var promise = surealServices.getTrendingSongsForUser(JSON.parse(localStorage.getItem("userAuth")), true);
            promise.then(function (response) {

                $scope.myMusicTrendingSongsData = true;
                //now load the data

                $scope.myMusicTrendingSongs = response;

            }, function (reason) {
                $log.debug("Controller Error  trending albums");
                $log.debug("Controller Error:" + reason);
                $scope.myMusicTrendingSongsData = true;
                //  loadData(false);
            })
        }
        catch (e) {
            $scope.myMusicTrendingSongsData = false;
            $log.debug("controller json error: " + e.message);
        }


        //Build this list using dynamic query as shown below with exact items.
        try {
            $log.debug("getting new trending artists");
            var promise = surealServices.getTrendingArtistsForUser(JSON.parse(localStorage.getItem("userAuth")), true);
            promise.then(function (response) {

                $scope.myMusicTrendingArtistsData = true;
                //now load the data

                $scope.myMusicTrendingArtists = response;

             //  console.error("xxxxxxxxxxxxxx:" + JSON.stringify(  $scope.myMusicTrendingArtists));

            }, function (reason) {
                $log.debug("Controller Error  trending artists");
                $log.debug("Controller Error:" + reason);
                $scope.myMusicTrendingArtistsData = true;
                //  loadData(false);
            })
        }
        catch (e) {
            $scope.myMusicTrendingArtistsData = false;
            $log.debug("controller json error: " + e.message);
        }

        //********** INTEGRATION WORK END**************************************************************************************************************
        //next slide
        $scope.Next = function (slideIndex) {
                 
           // $ionicSlideBoxDelegate.next();
        }

        //call the action sheet
        $scope.actSheet = function (options, resource_id, resource_name, resource_img, resource_type) {
            getActionSheet.show(options, resource_id, resource_name, resource_img, resource_type);
        }

    })

    //********** My Music Lists**************************************************************************************************************
      
    .controller('myMusicLists', function ($scope, $ionicSlideBoxDelegate, $log, $rootScope, getActionSheet, surealServices, manageSettingsService)
    {
       
        //Images are round *******************************************************************
        $scope.imagesAreRound = false;
      

        $scope.hideMe = true;
        $scope.$on("$ionicView.enter", function () { $scope.hideMe = false; });
        $scope.$on("$ionicView.leave", function () { $scope.hideMe = true; });


        //$ionicSlideBoxDelegate.$getByHandle('whatsNewSlideBoxEvents').update();
        ////Store information for use later in local storage. Do it everytime you generate the information.
        //localStorage.setItem("myMusicWhatsNewEvents", JSON.stringify($scope.myMusicWhatsNewEvents));
        ////Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings

        $scope.myMusicWhatsNewPlayListData = [];
        $scope.myMusicWhatsFavoriteAlbumsData = false;

        $scope.myMusicWhatsFavoritePlaylistsData = false;
        $scope.myMusicWhatsFavoritePlaylists = [];

        $scope.ItemCol = surealServices.getItemCol();

  
        function getUserPlaylists() {
            //**************************************************Get all the playlist*********************************************************************************************
            try {
                $log.debug("getting new playlists");
                var promise = surealServices.getPlayListsForCurrentUser(JSON.parse(localStorage.getItem("userAuth")), false);
                promise.then(function (response) {

                    $scope.myMusicWhatsNewPlayListData = true;
                    //now load the data

                    $scope.myMusicWhatsNewPlayLists = response;

                }, function (reason) {
                    $log.debug("Controller Error PlayList");
                    $log.debug("Controller Error:" + reason);
                    $scope.myMusicWhatsNewPlayListData = true;
                    //  loadData(false);
                })
            }
            catch (e) {
                $scope.myMusicWhatsNewPlayListData = false;
                $log.debug("controller json error: " + e.message);
            }
        }
        //**************************************************Get all the playlist*********************************************************************************************
      

        //********** INTEGRATION WORK END**************************************************************************************************************

        function getFavAlbums() {
            try {
                $log.debug("getting favorite albums");
                var promise = surealServices.getFavoriteAlbumsForCurrentUser(JSON.parse(localStorage.getItem("userAuth")), false);
                promise.then(function (response) {

                    $scope.myMusicWhatsFavoriteAlbumsData = true;
                    //now load the data

                    $scope.myMusicWhatsFavoriteAlbums = response;

                }, function (reason) {
                    $log.debug("Controller Error Fav");
                    $log.debug("Controller Error:" + reason);
                    $scope.myMusicWhatsFavoriteAlbumsData = true;
                    //  loadData(false);
                })
            }
            catch (e) {
                $scope.myMusicWhatsFavoriteAlbumsData = false;
                $log.debug("controller json error: " + e.message);
            }

        }

        //********** INTEGRATION WORK END**************************************************************************************************************

        function getFavPlaylists() {
            try {
                $log.debug("getting favorite playlists");
                var promise = surealServices.getFavoritePlaylistsForCurrentUser(JSON.parse(localStorage.getItem("userAuth")), false);
                promise.then(function (response) {

                    $scope.myMusicWhatsFavoritePlaylistsData = true;
                    //now load the data

                    $scope.myMusicWhatsFavoritePlaylists = response;

                    ///   $ionicSlideBoxDelegate.$getByHandle('myMusicWhatsNewPlayList').update();
                    $log.debug(JSON.stringify(response));

                }, function (reason) {
                    $log.debug("Controller Error Fav");
                    $log.debug("Controller Error:" + reason);
                    $scope.myMusicWhatsFavoritePlaylistsData = true;
                    //  loadData(false);
                })
            }
            catch (e) {
                $scope.myMusicWhatsFavoritePlaylistsData = false;
                $log.debug("controller json error: " + e.message);
            }
        }


        getUserPlaylists();
        getFavAlbums();
        getFavPlaylists();

       

        $rootScope.$on('setFavPlaylist', function (event, args) {
            getFavPlaylists();
            alert("favP");
        });

        $rootScope.$on('setFavAlbum', function (event, args) {
            getFavAlbums();
            alert("favA");
        });

    



        //********** INTEGRATION WORK END**************************************************************************************************************
        //Build this list using dynamic query as shown below with exact items.
        localStorage.setItem("myMusicWhatsNewExplorer", JSON.stringify($scope.myMusicWhatsNewExplorer));


        //show action sheet
        $scope.actSheetWXN = function (options, id, resource_name, resource_img, resource_type) {
            getActionSheet.show(options, id, resource_name, resource_img, resource_type);
        }

    })



     //**************************************************Get all the events*********************************************************************************************
    //**************************************************Get all the events*********************************************************************************************
    //**************************************************Get all the events*********************************************************************************************

      .controller('newEventsCtrl', function ($scope, $ionicSlideBoxDelegate,$log,$timeout, getActionSheet, surealServices, manageSettingsService) {
          $scope.eventGotData = false;
          $scope.eventData = [];

          //Images are round *******************************************************************
          $scope.imagesAreRound = false;
       

          //**************************************************Get all the events*********************************************************************************************
          try {
              $log.debug("getting new events");
              var promise = surealServices.getEventsAllEvents(JSON.parse(localStorage.getItem("userAuth")), true);
              promise.then(function (response) {

                  $scope.eventGotData = true;
                  //now load the data
                  // localStorage.setItem("myMusicWhatsNewEvents", JSON.stringify(response));
                  $scope.eventData = response;

                  $timeout(function () {
                      $ionicSlideBoxDelegate.$getByHandle('eventsSlidebox').update();
                  });
                 

              }, function (reason) {
                  $log.debug("Error Get New Events");
                  $log.debug("Controller Error:" + reason);
                  $scope.eventGotData = true;
                  //  loadData(false);
              })
          }
          catch (e) {
              $scope.eventGotData = false;
              $log.debug("controller json error: " + e.message);
          }



          //get the index of the slide
          //********** INTEGRATION WORK END**************************************************************************************************************
          $scope.slideIndexWN = function (slideIndex) {
              //$ionicSlideBoxDelegate.$getByHandle('whatsNewSlideBox').slide(slideIndex);
              // $ionicSlideBoxDelegate.$getByHandle('whatsNewSlideBox').update();
          }

          //show action sheet
          $scope.actSheetWXN = function (options, id, resource_name, resource_img, resource_type) {

              getActionSheet.show(options, id, resource_name, resource_img, resource_type);

          }


      })


        //********************************Whats New *****************************************************************************************
        //********** INTEGRATION WORK END**************************************************************************************************************
    .controller('myLibraryCtrl', function ($scope, $log, $ionicSlideBoxDelegate, $timeout, getActionSheet, surealServices, manageSettingsService) {

    
        //Build this list using dynamic query as shown below with exact items.
        $scope.myDownloadedData = false;
        $scope.myDownloadedAlbums = false;
        $scope.myPurchasedData = false;
        $scope.myPurchasedAlbums = false;


        //Images are round *******************************************************************
        $scope.imagesAreRound = false;

        //Images are round *******************************************************************
        //$scope.$on('imageStateRound', function (event, args) {
        //    $scope.imagesAreRound = manageSettingsService.getImageStateRound();
        //});

        $scope.ItemCol = surealServices.getItemCol();
        $scope.newAlbums = [];

        var getRecentlyPlayedAlbums =function()
        {
            //Recently played albums******************************************************************************************************
            try {
                $log.debug("getting recently played");
                var promise = surealServices.getRecentlyPlayedAlbums(JSON.parse(localStorage.getItem("userAuth")), true);
                promise.then(function (response) {

                    $scope.myRecentlyPlayedAlbumData = true;
                    //  localStorage.setItem("myMusicWhatsNewAlbums", JSON.stringify(response));
                    $scope.myRecentlyPlayedAlbum = response;

                    $timeout(function () {
                        $ionicSlideBoxDelegate.$getByHandle('recentlyPlayedSlideBoxAlbum').update();
                    });
                    // 


                }, function (reason) {
                    $log.debug("Controller Error:" + reason);
                    $scope.myRecentlyPlayedAlbumData = true;

                })
            }
            catch (e) {
                $scope.myRecentlyPlayedAlbumData = false;
                $log.debug("controller json error: " + e.message);
            }
        }

        var getRecentlyPlayedPlaylist = function() {
            //Recently played albums******************************************************************************************************
            try {
                $log.debug("getting recently played Playlist");
                var promise = surealServices.getRecentlyPlayedPlaylists(JSON.parse(localStorage.getItem("userAuth")), true);
                promise.then(function (response) {

                    $scope.myRecentlyPlayedPlaylistData = true;
                    //  localStorage.setItem("myMusicWhatsNewAlbums", JSON.stringify(response));
                    $scope.myRecentlyPlayedPlaylist = response;
                    

                    $timeout(function () {
                        $ionicSlideBoxDelegate.$getByHandle('recentlyPlayedSlideBoxPlaylist').update();
                    });
                    // 


                }, function (reason) {
                    $log.debug("Controller Error:" + reason);
                    $scope.myRecentlyPlayedPlaylistData = true;

                })
            }
            catch (e) {
                $scope.myRecentlyPlayedPlaylistData = false;
                $log.debug("controller json error: " + e.message);
            }
        }  



        var getRecentlyPlayedSongs= function () {
            //Recently played albums******************************************************************************************************
            try {
        
                $log.debug("getting recently played Songs");
                var promise = surealServices.getRecentlyPlayedSongs(JSON.parse(localStorage.getItem("userAuth")), true);
                promise.then(function (response) {

                    $scope.myRecentlyPlayedSongsData = true;
                    //  localStorage.setItem("myMusicWhatsNewAlbums", JSON.stringify(response));
                    $scope.myRecentlyPlayedSongs = response;

                    $timeout(function () {
                        $ionicSlideBoxDelegate.$getByHandle('recentlyPlayedSlideBoxSongs').update();
                    });
                    // 


                }, function (reason) {
                    $log.debug("Controller Error:" + reason);
                    $scope.myDownloadedData = true;

                })
            }
            catch (e) {
                $scope.myDownloadedData = false;
                $log.debug("controller json error: " + e.message);
            }
        }
        //Downladed albums******************************************************************************************************
        try {
            $log.debug("getting downloaded music");
            var promise = surealServices.getDownloadedAlbumsForCurrentUser(JSON.parse(localStorage.getItem("userAuth")), true);
            promise.then(function (response) {

                $scope.myDownloadedData = true;
                //  localStorage.setItem("myMusicWhatsNewAlbums", JSON.stringify(response));
                $scope.myDownloadedAlbums = response;

                $timeout(function () {
                    $ionicSlideBoxDelegate.$getByHandle('downloadedSlideBoxAlbum').update();
                });
                // 


            }, function (reason) {
                $log.debug("Controller Error:" + reason);
                $scope.myDownloadedData = true;

            })
        }
        catch (e) {
            $scope.myDownloadedData = false;
            $log.debug("controller json error: " + e.message);
        }



        //Purchased albums******************************************************************************************************
        try {
            $log.debug("getting purchasd albums");
            var promise = surealServices.getPurchasedAlbumsForCurrentUser(JSON.parse(localStorage.getItem("userAuth")), true);
            promise.then(function (response) {

                $scope.myPurchasedData = true;
                //  localStorage.setItem("myMusicWhatsNewAlbums", JSON.stringify(response));
                $scope.myPurchasedAlbums = response;

                $timeout(function () {
                    $ionicSlideBoxDelegate.$getByHandle('purchasedSlideBoxAlbum').update();
                });
                // 

            }, function (reason) {
                $log.debug("Controller Error:" + reason);
                $scope.myPurchasedData = true;

            })
        }
        catch (e) {
            $scope.myPurchasedData = false;
            $log.debug("controller json error: " + e.message);
        }

        $scope.$on('$ionicView.enter', function () {
            getRecentlyPlayedSongs();
            getRecentlyPlayedAlbums();
            try {
                getRecentlyPlayedPlaylist();
            }
            catch (e) { alert(e.message);}
        });

       
      
        //get the index of the slide
        //********** INTEGRATION WORK END**************************************************************************************************************
        $scope.slideIndexWN = function (slideIndex) {
            //$ionicSlideBoxDelegate.$getByHandle('whatsNewSlideBox').slide(slideIndex);
            // $ionicSlideBoxDelegate.$getByHandle('whatsNewSlideBox').update();
        }

        //show action sheet
        $scope.actSheetWXN = function (options, id, resource_name, resource_img, resource_type) {
         
            getActionSheet.show(options, id, resource_name, resource_img, resource_type);

        }

    })
        //********** INTEGRATION WORK END************************************************************************************************************** 
        //********************************Whats New *****************************************************************************************
        //********** INTEGRATION WORK END**************************************************************************************************************
    .controller('myMusicWhatsNewAlbumsCtrl', function ($scope,$log, $ionicSlideBoxDelegate,$timeout, getActionSheet, surealServices, manageSettingsService) {

        $scope.hideMe = true;
        $scope.$on("$ionicView.enter", function () { $scope.hideMe = false; });
        $scope.$on("$ionicView.leave", function () { $scope.hideMe = true; });

        //Build this list using dynamic query as shown below with exact items.
        $scope.myMusicWhatsNewAlbumsData = false;
      

        //Images are round *******************************************************************
        $scope.imagesAreRound = false;

        ////Images are round *******************************************************************
        //$scope.$on('imageStateRound', function (event, args) {
        //    $scope.imagesAreRound = manageSettingsService.getImageStateRound();
        //});
        
        $scope.ItemCol = surealServices.getItemCol();
        $scope.newAlbums = [];


        //**************************************************Get all the music*********************************************************************************************

        try {
            $log.debug("getting new music");
            var promise = surealServices.getNewAlbumsForCurrentUser(JSON.parse(localStorage.getItem("userAuth")),true);
            promise.then(function (response) {
              
                $scope.myMusicWhatsNewAlbumsData = true;
              //  localStorage.setItem("myMusicWhatsNewAlbums", JSON.stringify(response));
                $scope.myMusicWhatsNewAlbums = response;

                $timeout(function () {
                    $ionicSlideBoxDelegate.$getByHandle('whatsNewSlideBoxAlbum').update();
                });
               // 
             

            }, function (reason) {
                $log.debug("Controller Error:" + reason);
                $scope.myMusicWhatsNewAlbumsData = true;
             
            })
        }
        catch (e) {
            $scope.myMusicWhatsNewAlbumsData = false;
            $log.debug("controller json error: " + e.message);
        }

        //**************************************************Get all the playlists*********************************************************************************************

        //get the index of the slide
        //********** INTEGRATION WORK END**************************************************************************************************************
        $scope.slideIndexWN = function (slideIndex) {
          //$ionicSlideBoxDelegate.$getByHandle('whatsNewSlideBox').slide(slideIndex);
          // $ionicSlideBoxDelegate.$getByHandle('whatsNewSlideBox').update();
        }

        //show action sheet
        $scope.actSheetWXN = function (options, id, resource_name, resource_img, resource_type) {

            getActionSheet.show(options, id, resource_name, resource_img, resource_type);
           
        }
     
    })
//********** INTEGRATION WORK END**************************************************************************************************************

          //********** INTEGRATION WORK END************************************************************************************************************** 
        //********************************Whats New *****************************************************************************************
        //********** INTEGRATION WORK END**************************************************************************************************************
    .controller('myMusicWhatsNewPlaylistCtrl', function ($scope,$log, $ionicSlideBoxDelegate,$timeout, getActionSheet, surealServices, manageSettingsService) {

        $scope.hideMe = true;
        $scope.$on("$ionicView.enter", function () { $scope.hideMe = false; });
        $scope.$on("$ionicView.leave", function () { $scope.hideMe = true; });;

        //Build this list using dynamic query as shown below with exact items.

        $scope.myMusicWhatsNewPlaylistData = false;

        //Images are round *******************************************************************
        $scope.imagesAreRound = false;

        //Images are round *******************************************************************
        //$scope.$on('imageStateRound', function (event, args) {
        //    $scope.imagesAreRound = manageSettingsService.getImageStateRound();
        //});
        
        $scope.ItemCol = surealServices.getItemCol();
    


      
        //**************************************************Get all the playlists*********************************************************************************************

        //lets get my new music
        try {
            $log.debug("getting new playlist");
            var promise = surealServices.getNewPlayListsForCurrentUser(JSON.parse(localStorage.getItem("userAuth")), true);
            promise.then(function (response) {

                $scope.myMusicWhatsNewPlaylistData = true;
                //  localStorage.setItem("myMusicWhatsNewAlbums", JSON.stringify(response));

                $scope.myMusicWhatsNewPlaylists = response;

                $timeout(function () {
                    $ionicSlideBoxDelegate.$getByHandle('whatsNewSlideBoxPlaylist').update();
                });
             //   


            }, function (reason) {
                $log.debug("Controller Error:" + reason);
                $scope.myMusicWhatsNewPlaylistData = true;

            })
        }
        catch (e) {
            $scope.myMusicWhatsNewPlaylistData = false;
            $log.debug("controller json error: " + e.message);
        }


        //get the index of the slide
        //********** INTEGRATION WORK END**************************************************************************************************************
        $scope.slideIndexWN = function (slideIndex) {
          //$ionicSlideBoxDelegate.$getByHandle('whatsNewSlideBox').slide(slideIndex);
          // $ionicSlideBoxDelegate.$getByHandle('whatsNewSlideBox').update();
        }

        //show action sheet
        $scope.actSheetWXN = function (options, id, resource_name, resource_img, resource_type) {

            getActionSheet.show(options, id, resource_name, resource_img, resource_type);
           
        }
     
    })
//********** INTEGRATION WORK END**************************************************************************************************************


   //********** *********************************************************************************************************************
   //********** Music Player**************************************************************************************************************
   //***********************************************************************************************************************
   .controller('MusicPlayerCtrl', function ($scope,$log, $interval, $ionicSlideBoxDelegate, $timeout, $window, $ionicPlatform, $rootScope, $ionicHistory , manageSessionService, surealMusicServices)
   {
       
            $scope.playImage = "img/play@2x.png";
            $scope.pauseImage = "img/pause@2x.png";
            $scope.playStateImage = "img/play@2x.png";
            $scope.currentSong = null;
            $scope.albumDetailPlaylistData = false;

            $scope.currentSongName = null;
            $scope.currentSongDuration = null;
            $scope.currentSongList = null;
            $scope.playlistViewHeight = null;

            $scope.currentSongUpdated = false;
            initialized = false;
      
            $scope.progressCurrent = 0;
            $scope.timerCurrent = 0;
            $scope.progressMax = 0;
            $scope.offset = 0;
            $scope.uploadCurrent = 0;
            $scope.stroke = 15;
            $scope.radius = 180;
            $scope.isSemi = false;
            $scope.rounded = false;
            $scope.responsive = true;
            $scope.clockwise = true;
            $scope.currentColor = '#fff';
            $scope.bgColor = '#fff';
            $scope.duration = 800;
            $scope.currentAnimation = 'easeOutCubic';
            $scope.animationDelay = 0;
            $scope.currentTime = "";

           //Calculate time
            var cTime = function (input) {

                function z(n) { return (n < 10 ? '0' : '') + n; }
                var seconds = input % 60;
                var minutes = Math.floor(input % 3600 / 60);
                var hours = Math.floor(input / 3600);
                if (hours == 0) {
                    return (z(minutes) + ':' + z(seconds));
                }
                else {
                    return (z(hours) + ':' + z(minutes) + ':' + z(seconds));
                }
            }

            //make sure buttons etc are the same.
            $scope.initScreenData = function () {
                //Set the current time and max time

               // $scope.rotatetrack = surealMusicServices.getRotateTrack();
                $scope.playStateImage = surealMusicServices.getPlayStateImage();
                $scope.currentColor = '#42A5F5';
                $scope.bgColor = '#000000';
            }
          
           //Go back on click of close to go back to calling page
            $scope.goBack = function () {
                $ionicHistory.goBack();
            }


            $scope.hideMe = true;
            $scope.$on("$ionicView.enter", function () { $scope.hideMe = false; });
            $scope.$on("$ionicView.leave", function () { $scope.hideMe = true; });
          
        //********************************************************************************
        //Set the current song on the playrrt. If no song is selected, set it so select verbaige.
           var setCurrentSong =function(init)
           { 
               if (init == false)
                   {
                       $scope.currentSongName = $scope.currentSong[0].Title;
                       $scope.currentSongDuration = $scope.currentSong[0].Duration;
                   }
                else
                   {
                       $scope.currentSongName = "Select a Song or Album";
                       $scope.currentSongDuration = "";
                   }

           }
       //********************************************************************************

       //********************************************************************************
       //Get the height of the playlistview
       $scope.getPlaylistViewHeight = function () {
               $scope.playlistViewHeight = ($scope.currentSongList.length * 75) + "px";

               $timeout(function () {
                   angular.element(document.querySelector('#playlistSlide')).triggerHandler('click');
                 //  $ionicSlideBoxDelegate.$getByHandle('albumDetailSlideBox').update();
               });
            
           }
        //********************************************************************************

   
       //make sure buttons etc are the same.
        $scope.updateScreenData = function () {

               //Set the current time and max time
              // $scope.rotatetrack = surealMusicServices.getRotateTrack();
            $scope.playStateImage = surealMusicServices.getPlayStateImage();
            
               try {
                   $scope.progressMax = surealMusicServices.cSeconds($scope.currentSong[0].Duration);
                   $scope.currentSong[0].Duration = $scope.currentSong[0].Duration.replace("00:", "");
               }
               catch (e) { }
           }

        $scope.getCurrentResource = function ()
        {

            try {
                $scope.currentResource = JSON.parse(localStorage.getItem("currentResource"));

                if ($scope.currentResource.resource_img == "") {
                    $scope.currentResource.resource_img = "app.assets/images/default_album.png";
                }
            }
            catch (e) {
                manageSessionService.storeCurrentResource("0","Select a Song", "https://Surealmusicweb.azurewebsites.net/app.assets/images/default_album.png","","","")
                $scope.currentResource = JSON.parse(localStorage.getItem("currentResource"));
            }

            return $scope.current_resource;
        }
       
       //Timer start function.
        $scope.timerToggle = function (index) {

           
            if (surealMusicServices.getIsStreamPlaying() == true) {

                angular.forEach($scope.currentSongList, function (song) {
                    song.StateImage = "img/play@2x.png";
                });

                surealMusicServices.pauseStream();
                $scope.updateScreenData();
               
            }
            else
            {
                var streamValid = false;
                // "resource_id": resource_id, "resource_name": resource_name,
                // "resource_img": resource_img, "resource_type": resource_type
                if ((surealMusicServices.getStreamLoaded() == false) && $scope.currentSongUpdated == true) {
                    
                    var current_resource = $scope.getCurrentResource();
                    surealMusicServices.getMediaStream(current_resource.resource_id, current_resource.resource_type);
                   
                }
            
                if (surealMusicServices.getStreamLoaded() == true) {
                    
                    $scope.currentSong = surealMusicServices.getCurrentSong();
                    setCurrentSong(false);

                    $scope.currentSongUpdated = false;
                  
                    //play the stream and update the images
                    surealMusicServices.playStream();

                    //Set the appropriate song image when playing
                    $scope.currentSongList[$scope.currentSong[0].Index-1].StateImage = "img/pause@2x.png";
                    $scope.updateScreenData();

                    $scope.tracks = localStorage.getItem("myMusicTrendingAlbums");
                    var resource_id = localStorage.getItem("resource_id");
                    var resource_type = localStorage.getItem("resource_type");

                }
                //based on resource type lets get proper arry
              
            } 
        };

      
        //make sure buttons etc are the same.
        $scope.updateScreenTime = function (currentT) {
            //Set the current time and max time
            //   $scope.progressCurrent = $scope.progressCurrent + 1;
            $scope.progressCurrent = surealMusicServices.cSeconds(currentT);
          
        }

        //Play a current song from the playlist
        $scope.playSongFromList = function (list_resource_id, index, resource_id, resource_name, resource_link, resource_listType)
        {

            var resource_type = "song";

            angular.forEach($scope.currentSongList, function (song) {
                song.StateImage = "img/play@2x.png";
            });

 
            ///Check if the song is stopped and image was pressed to play the same song
            if (surealMusicServices.getIsStreamPlaying() == false && $scope.currentSong[0].Index == index) {
                surealMusicServices.playStream();
                $scope.updateScreenData();
                $scope.currentSongList[index - 1].StateImage = "img/pause@2x.png";
            }
            ///Check if the song is playing and image was pressed to pause the song
            else if (surealMusicServices.getIsStreamPlaying() == true && $scope.currentSong[0].Index == index) {
                surealMusicServices.pauseStream();
                $scope.updateScreenData();

                //Set the selected song image to pause
                $scope.currentSongList[index - 1].StateImage = "img/play@2x.png";
            }

            ///Check if the song is playing and image was pressed to play a different song
            if ($scope.currentSong[0].Index != index) {
                //Set the selected song image to pause
                $scope.currentSongList[index - 1].StateImage = "img/pause@2x.png";

                //album
                if (resource_listType == "album") {
                    try {
                        var promise = surealMusicServices.playSongByCurrentAlbumIndex(list_resource_id, resource_id, resource_name, "", "album-song", resource_link, index);
                        promise.then(function (response) {

                            $scope.currentSong = surealMusicServices.getCurrentSong();
                            $scope.progressMax = surealMusicServices.cSeconds($scope.currentSong[0].Duration);
                            $scope.currentSong[0].Duration = $scope.currentSong[0].Duration.replace("00:", "");
                            setCurrentSong(false);


                        }, function (reason) {
                            $log.debug("Error in load media");
                            $log.debug("Controller Error:" + reason);
                        })
                    }
                    catch (e) {
                        $log.debug("surealMusicPlayer Error: " + e.message);
                    }
                }

                //playlist
                if (resource_listType == "playlist") {
                    try {

                        //Set the selected song image to pause
                        $scope.currentSongList[index - 1].StateImage = "img/pause@2x.png";

                        var promise = surealMusicServices.playSongByCurrentPlayListIndex(list_resource_id, resource_id, resource_name, "", "playList-song", resource_link, index);
                        promise.then(function (response) {

                            $scope.currentSong = surealMusicServices.getCurrentSong();
                            $scope.progressMax = surealMusicServices.cSeconds($scope.currentSong[0].Duration);
                            $scope.currentSong[0].Duration = $scope.currentSong[0].Duration.replace("00:", "");
                            setCurrentSong(false);



                        }, function (reason) {
                            $log.debug("Error in load media");
                            $log.debug("Controller Error:" + reason);
                        })
                    }
                    catch (e) {
                        $log.debug("surealMusicPlayer Error: " + e.message);
                    }
                }
            }

        }

       //******************************************************************************************************
       //song has been updated
        $scope.songUpdated = function ()
        {
            $scope.getCurrentResource();

            $scope.albumDetailPlaylistData = false;
            $scope.currentSongUpdated = true;
            $scope.currentSong = surealMusicServices.getCurrentSong();

            $scope.currentSongList = surealMusicServices.getCurrentSongList();
        
            setCurrentSong(false);

            //Now update playlist
            //Make all images to play
            angular.forEach($scope.currentSongList, function (song) {
                song.StateImage = "img/play@2x.png";
            });
            //Set current Playing song pause
            $scope.currentSongList[$scope.currentSong[0].Index - 1].StateImage = "img/pause@2x.png";

            //Update the screen
            $scope.getPlaylistViewHeight();
            $scope.albumDetailPlaylistData = true;
            
           // $scope.updateScreenData();
        }

       //******************************************************************************************************
       //watch for current song updated and update screen.
        $scope.$on('currentSongUpdated', function (event, args) {
            $scope.songUpdated();
        });

       //watch for current song updated and update screen.
        $scope.$on('songPlay', function (event, args) {

            $scope.updateScreenData();
        });

       //watch for current song updated and update screen.
        $scope.$on('songStop', function (event, args) {

            $scope.updateScreenData();
        });

       //watch for the global timer and update data on the screen.
        $rootScope.$on('timerUpdate', function (event, args) {
         
            $scope.currentTime = args.currentTime;
            $scope.updateScreenTime($scope.currentTime);
           
        });


       //watch for the global timer and update data on the screen.
        $scope.$on('streamState', function (event, args) {
        

            $scope.streamIsLoading = surealMusicServices.getStreamIsLoading();
            $log.debug("Stream is Loading:" + $scope.streamIsLoading);
        });
        

        if (initialized == false)
        {
            setCurrentSong(true);
            initialized = true;

        }

        $scope.initScreenData();
        $scope.getCurrentResource();
      

       //******************************************************************************************************
        //Slide Box 
        $scope.onSlideMove = function(data){
         
            };

        $scope.slideIndex = function (slideIndex) {
            $timeout(function () {
                if ($scope.hideMe == false)
                 {
                    $ionicSlideBoxDelegate.$getByHandle('albumDetailSlideBox').update();
                    $ionicSlideBoxDelegate.$getByHandle('albumDetailSlideBox').slide(slideIndex);
                 }
              
            });
          
            }

        $scope.Next = function (slideIndex) {

                $ionicSlideBoxDelegate.next();
        }
       //******************************************************************************************************


       ///Do this for controllers that do not load before a song is selected
       if (surealMusicServices.getSongDataLoaded() == true) {
          $scope.songUpdated();
       }
   })

   //********** *********************************************************************************************************************
   //********** Music Player**************************************************************************************************************
   //***********************************************************************************************************************
   //********** INTEGRATION WORK END**************************************************************************************************************


   .controller('tabCtrl', function ($scope, $ionicSideMenuDelegate, manageSettingsService) {
   
    })

    .controller('accountCtrl', function ($scope, manageSettingsService) {

        $scope.settingsList = [
             { text: "Round Images", Id: "isRound", checked: true },
            { text: "Spinning Album",Id: "spinngAlbun", checked: false }
        ];

        $scope.setState = function(Id, checkedState)
        {
            if (Id=="isRound")
            {
                manageSettingsService.setImageStateRound(checkedState);
            }

        }



    })



