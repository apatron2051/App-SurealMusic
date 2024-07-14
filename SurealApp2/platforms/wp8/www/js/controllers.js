
angular.module('surealMusic.controllers', [])
   


    .controller('pullUpBar', function ($scope, $window) {

        $scope.dev_width = $window.innerWidth;
        $scope.dev_height = $window.innerHeight;
    })

    .controller('myMusicCtrl', function ($scope, $ionicSlideBoxDelegate) {
      

    })
    //****************************************************************************************
    .controller('explorerCtrl', function ($scope, $ionicSlideBoxDelegate, getActionSheet) {

    })
     //****************************************************************************************
    //home COntroller
    .controller('homeCtrl', function ($scope, $location, $ionicNativeTransitions) {

        $scope.go = function (path) {
            $location.path(path);
        };

        $scope.goNativeTransition = function (path) {
            $ionicNativeTransitions.locationUrl(path, {
                "type": "slide",
                "direction": "down", // 'left|right|up|down', default 'left' (which is like 'next')
                "duration": 1500, // in milliseconds (ms), default 400
            });
        };
    })
     //***************************************************************************************
   //Login and user management - sets:
   // localStorage.setItem("userProfile", "");
   // localStorage.setItem("userAuth", "");
    .controller('loginCtrl', function ($q, $scope, $window, $timeout,$ionicLoading, surealServices) {


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
            console.clear();
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
                        $scope.userAuth.account_user_id = response.data.account.account_user_id;
                        localStorage.setItem("userAuth", JSON.stringify($scope.userAuth));

                        ///user can login
                        loginValid = true;
                    }
                    else
                    {
                        loginValid = false;
                    }
                    validateLogin(response, userDataProfile);

                }, function (reason) {
                    console.error("Controller Error:" + reason);
                    loginValid = false;
                    validateLogin(null,null);
                })
            }
            catch (e) {
                loginValid = false;
                console.error("controller json error: " + e.message);
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
                    $timeout(redirect, 500);
                }
                else {
                    $scope.loginError = true;
                    $scope.inputError = !$scope.inputError;
                    $ionicLoading.hide();

                } //is valid
            } //validate login
        } //login go
          

    })

     //***************************************************************************************
     //gets Localstroage- userProfile
    .controller('ProfileCtrl', function ($scope, $ionicSlideBoxDelegate, getActionSheet) {
           
        //get information from local storage. Do it everytime you generate the information.
        $scope.userProfile = JSON.parse(localStorage.getItem("userProfile"));
   
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
    .controller('myMusicShowCaseCtrl', function ($scope, $ionicSlideBoxDelegate, getActionSheet, surealServices)
    {
     
        //********** INTEGRATION WORK BEGIN**************************************************************************************************************
        //Build this list using dynamic query as shown below with exact items.
        $scope.myMusicSliderImages = [
            { Artist: "The Beatles", Name: 'Abby Road', Options: "1,1,1,1,1,0,1" , ImageURL: "http://ecx.images-amazon.com/images/I/61LhV5-8vLL.jpg", id: 1 },
            { Artist: "Van Halen", Name: '1984', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/51WBWyEnFCL.jpg", id: 2 },
            { Artist: "Cash", Name: 'The Man Comes Around', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/41mfMbu0ADL.jpg", id: 3 },
            { Artist: "Johny Coltrane", Name: 'Blue Train', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/51OHUeofS3L.jpg", id: 4 },
            { Artist: "Queen", Name: 'Queen II', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/51BwhjEN1XL.jpg", id: 5 },
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
    .controller('myMusicTrendingCtrl', function ($q, $scope, $window, $timeout, $ionicLoading, surealServices, $ionicSlideBoxDelegate, getActionSheet) {


        $scope.myMusicTrendingAlbumsData = false;
        $scope.myMusicTrendingSongssData = false;
        $scope.myMusicTrendingArtistsData = false;
        $scope.ItemCol = surealServices.getItemCol();

        //Build this list using dynamic query as shown below with exact items.
        $scope.myMusicTrendingAlbums =
        [{
            slide_id: 1, slide: [
              { Artist: "The Ramones", Name: "Buddha-Bar Classical", Options: "1,1,1,1,1,0,1", ImageURL: "https://surealmusicstorage.blob.core.windows.net/images/150c9f1b-1d65-4303-bfde-ee94f9cc3418-.jpg", id: 1 },
              { Artist: "The Ramones", Name: "Dangerous", Optons: "1,1,1,1,1,0,1", ImageURL: "https://surealmusicstorage.blob.core.windows.net/images/ba5f453b-a5bf-4c2c-8d72-900e57b6e984-.jpg", id: 2 },
              { Artist: "Van Halen", Name: '1984', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/51WBWyEnFCL.jpg", id: 3 },
              { Artist: "The Ramones", Name: "Ghost", Optons: "1,1,1,1,1,0,1", ImageURL: "https://surealmusicstorage.blob.core.windows.net/images/f41419b3-544e-41ad-906d-ff70d8fec287-.jpg", id: 4 },
              { Artist: "The Ramones", Name: "Bad", Optons: "1,1,1,1,1,0,1", ImageURL: "https://surealmusicstorage.blob.core.windows.net/images/35d4a16b-afad-4c77-9431-903d1a69353b-.jpg", id: 5 }]

        },
        {
            slide_id: 2, slide: [
            { Artist: "The Beatles", Name: 'Abby Road', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/61LhV5-8vLL.jpg", id: 1 },
            { Artist: "Van Halen", Name: '1984', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/51WBWyEnFCL.jpg", id: 2 },
            { Artist: "Cash", Name: 'The Man Comes Around', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/41mfMbu0ADL.jpg", id: 3 },
            { Artist: "Johny Coltrane", Name: 'Blue Train', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/51OHUeofS3L.jpg", id: 4 }]

        }];
        $scope.myMusicTrendingAlbumsData = true;
        $ionicSlideBoxDelegate.$getByHandle('trendingAlbumsSlideBox').update();

        //Store information for use later in local storage. Do it everytime you generate the information.
        localStorage.setItem("myMusicTrendingAlbums", JSON.stringify($scope.myMusicTrendingAlbums));
        //********** INTEGRATION WORK END**************************************************************************************************************
        //Build this list using dynamic query as shown below with exact items.
        $scope.myMusicTrendingSongs = 
        [{
            slide_id: 1, slide: [
                      { Artist: "The Beatles", Name: 'Abby Road', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/61LhV5-8vLL.jpg", id: 1 },
                      { Artist: "The Ramones", Name: "Ghost", Optons: "1,1,1,1,1,0,1", ImageURL: "https://surealmusicstorage.blob.core.windows.net/images/f41419b3-544e-41ad-906d-ff70d8fec287-.jpg", id: 4 },
                      { Artist: "Van Halen", Name: '1984', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/51WBWyEnFCL.jpg", id: 3 },
                      { Artist: "Cash", Name: 'The Man Comes Around', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/41mfMbu0ADL.jpg", id: 5 },
                      { Artist: "Johny Coltrane", Name: 'Blue Train', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/51OHUeofS3L.jpg", id: 6 }]
        },
           { slide_id: 2, slide: [
              { Artist: "The Ramones", Name: "Buddha-Bar Classical", Options: "1,1,1,1,1,0,1", ImageURL: "https://surealmusicstorage.blob.core.windows.net/images/150c9f1b-1d65-4303-bfde-ee94f9cc3418-.jpg" },
              { Artist: "The Ramones", Name: "Dangerous", Optons: "1,1,1,1,1,0,1", ImageURL: "https://surealmusicstorage.blob.core.windows.net/images/ba5f453b-a5bf-4c2c-8d72-900e57b6e984-.jpg" },
              { Artist: "The Ramones", Name: "Ghost", Optons: "1,1,1,1,1,0,1", ImageURL: "https://surealmusicstorage.blob.core.windows.net/images/f41419b3-544e-41ad-906d-ff70d8fec287-.jpg" },
              { Artist: "The Ramones", Name: "Bad", Optons: "1,1,1,1,1,0,1", ImageURL: "https://surealmusicstorage.blob.core.windows.net/images/35d4a16b-afad-4c77-9431-903d1a69353b-.jpg" }]
          
        }];
        $scope.myMusicTrendingSongssData = true;
        $ionicSlideBoxDelegate.$getByHandle('trendingSongsSlideBox').update();

        //Store information for use later in local storage. Do it everytime you generate the information.
        localStorage.setItem("myMusicTrendingSongs", JSON.stringify($scope.myMusicTrendingSongs));
        //********** INTEGRATION WORK END**************************************************************************************************************
        //Build this list using dynamic query as shown below with exact items.
        $scope.myMusicTrendingArtists = 
                [{
                    slide_id: 1, slide: [
                      { Artist: "The Ramones", Name: "Buddha-Bar Classical", Options: "1,1,1,1,1,0,1", ImageURL: "https://surealmusicstorage.blob.core.windows.net/images/150c9f1b-1d65-4303-bfde-ee94f9cc3418-.jpg" },
                      { Artist: "The Ramones", Name: "Dangerous", Optons: "1,1,1,1,1,0,1", ImageURL: "https://surealmusicstorage.blob.core.windows.net/images/ba5f453b-a5bf-4c2c-8d72-900e57b6e984-.jpg" },
                      { Artist: "Van Halen", Name: '1984', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/51WBWyEnFCL.jpg"},
                     { Artist: "The Ramones", Name: "Ghost", Optons: "1,1,1,1,1,0,1", ImageURL: "https://surealmusicstorage.blob.core.windows.net/images/f41419b3-544e-41ad-906d-ff70d8fec287-.jpg" },
                      { Artist: "The Ramones", Name: "Bad", Optons: "1,1,1,1,1,0,1", ImageURL: "https://surealmusicstorage.blob.core.windows.net/images/35d4a16b-afad-4c77-9431-903d1a69353b-.jpg" }]
                },
                   { slide_id: 2, slide: [
                    { Artist: "The Beatles", Name: 'Abby Road', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/61LhV5-8vLL.jpg", id: 1 },
                    { Artist: "Van Halen", Name: '1984', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/51WBWyEnFCL.jpg", id: 2 },
                    { Artist: "Cash", Name: 'The Man Comes Around', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/41mfMbu0ADL.jpg", id: 3 },
                    { Artist: "Johny Coltrane", Name: 'Blue Train', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/51OHUeofS3L.jpg", id: 4 }]

                }];
        $scope.myMusicTrendingArtistsData = true;
        $ionicSlideBoxDelegate.$getByHandle('trendingArtistsSlideBox').update();

        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
        localStorage.setItem("myMusicTrendingArtists", JSON.stringify($scope.myMusicTrendingArtists));

        //********** INTEGRATION WORK END**************************************************************************************************************

        $scope.onimgtap = function (options, resource_id, resource_name, resource_img, resource_type) {
                    
        }
        //get the index of the slide
        $scope.slideIndex = function (slideIndex) {
            //$ionicSlideBoxDelegate.$getByHandle('trendingSlideBox').slide(slideIndex);
            //$ionicSlideBoxDelegate.$getByHandle('trendingSlideBox').update();
        }

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
      
    .controller ('myMusicLists', function($scope, $ionicSlideBoxDelegate, getActionSheet, surealServices) 
    {
       
        //$ionicSlideBoxDelegate.$getByHandle('whatsNewSlideBoxEvents').update();
        ////Store information for use later in local storage. Do it everytime you generate the information.
        //localStorage.setItem("myMusicWhatsNewEvents", JSON.stringify($scope.myMusicWhatsNewEvents));
        ////Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings

        $scope.myMusicWhatsNewPlayListData = false;
        $scope.myMusicWhatsFavoriteAlbumsData = false;
        $scope.ItemCol = surealServices.getItemCol();

        //**************************************************Get all the playlist*********************************************************************************************
        try {
            console.error("getting new playlists");
            var promise = surealServices.getNewPlayListsForCurrentUser(JSON.parse(localStorage.getItem("userAuth")), false);
            promise.then(function (response) {

                $scope.myMusicWhatsNewPlayListData = true;
                //now load the data
                // localStorage.setItem("myMusicWhatsNewEvents", JSON.stringify(response));
                $scope.myMusicWhatsNewPlayLists = response;

            }, function (reason) {
                console.error("Controller Error PlayList");
                console.error("Controller Error:" + reason);
                $scope.myMusicWhatsNewPlayListData = true;
                //  loadData(false);
            })
        }
        catch (e) {
            $scope.myMusicWhatsNewPlayListData = false;
            console.error("controller json error: " + e.message);
        }

        //**************************************************Get all the playlist*********************************************************************************************
      

        //********** INTEGRATION WORK END**************************************************************************************************************


        try {
            console.error("getting favorite albums");
            var promise = surealServices.getFavoriteAlbumsForCurrentUser(JSON.parse(localStorage.getItem("userAuth")), false);
            promise.then(function (response) {

                $scope.myMusicWhatsFavoriteAlbumsData = true;
                //now load the data
                // localStorage.setItem("myMusicWhatsNewEvents", JSON.stringify(response));
                $scope.myMusicWhatsFavoriteAlbums = response;


                ///   $ionicSlideBoxDelegate.$getByHandle('myMusicWhatsNewPlayList').update();
                console.error(JSON.stringify(response));

            }, function (reason) {
                console.error("Controller Error Fav");
                console.error("Controller Error:" + reason);
                $scope.myMusicWhatsFavoriteAlbumsData = true;
                //  loadData(false);
            })
        }
        catch (e) {
            $scope.myMusicWhatsFavoriteAlbumsData = false;
            console.error("controller json error: " + e.message);
        }
     
        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
        //Store information for use later in local storage. Do it everytime you generate the information.
        localStorage.setItem("myMusicWhatsFavoriteAlbums", JSON.stringify($scope.myMusicWhatsFavoriteAlbums));

        //********** INTEGRATION WORK END**************************************************************************************************************
        //Build this list using dynamic query as shown below with exact items.
        $scope.myMusicWhatsNewExplorer = [

            { Artist: 'The Ramones', Name: 'Album Name', Options: "0,0,0,1,1,0,1", ImageURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSulfJcjBhxxW2NBBn9KbE3B4BSeh0R7mQ38wUi_zpJlQrMoDWh_qFcMelE_tjtAERUPTc' },
            { Artist: 'The Beatles', Name: 'Album Name', Options: "0,0,0,1,1,0,1", ImageURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTGpH07f9zeucoOs_stZyIFtBncU-Z8TDYmJgoFnlnxYmXjJEaitmxZNDkNvYnCzwWTySM' },
            { Artist: 'Pink Floyd', Name: 'Album Name', Options: "0,0,0,1,1,0,1", ImageURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT-FbU5dD_Wz472srRIvoZAhyGTEytx9HWGusbhYgSc2h0N6AqqRrDwzApmyxZoIlyxDcU' },
            { Artist: 'The Rolling Stones', Name: 'Album Name', Options: "0,0,0,1,1,0,1", ImageURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT6uwPPBnHfAAUcSzxr3iq9ou1CZ4f_Zc2O76i5A4IyoymIVwjOMXwUFTGSrVGcdGT9vQY' },
            { Artist: 'The Jimi Hendrix Experience', Name: 'Album Name', Options: "0,0,0,1,1,0,1", ImageURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRA3jz0uhVypONAKWUve80Q6HASvuvZiohl4Sru5ZihkAsjWiaGjocfxd0aC3H7EeFk5-I' },
            { Artist: 'Van Halen', Name: 'Album Name', Options: "0,0,0,1,1,0,1", ImageURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRIslVN9cJJ6YuV0y7JihAyA63JDhXGhkCVxHIRE-IoaF-rpefjIXO5osA24QvN9iCptC8' }
        ];
        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
        //Store information for use later in local storage. Do it everytime you generate the information.
        localStorage.setItem("myMusicWhatsNewExplorer", JSON.stringify($scope.myMusicWhatsNewExplorer));


        //show action sheet
        $scope.actSheetWXN = function (options, id, resource_name, resource_img, resource_type) {
            getActionSheet.show(options, id, resource_name, resource_img, resource_type);
        }

    })
    
        
        //********************************Whats New *****************************************************************************************
        //********** INTEGRATION WORK END**************************************************************************************************************
    .controller('myMusicWhatsNewCtrl', function ($scope, $ionicSlideBoxDelegate, getActionSheet, surealServices) {
        //Build this list using dynamic query as shown below with exact items.
        $scope.myMusicWhatsNewAlbumsData = false;
        $scope.myMusicWhatsNewEventsData = false;
        
        $scope.ItemCol = surealServices.getItemCol();
        $scope.newAlbums = [];


        //lets get my new music
        try {
            console.error("getting new music");
            var promise = surealServices.getNewAlbumsForCurrentUser(JSON.parse(localStorage.getItem("userAuth")),true);
            promise.then(function (response) {
              
                $scope.myMusicWhatsNewAlbumsData = true;
              //  localStorage.setItem("myMusicWhatsNewAlbums", JSON.stringify(response));

                $scope.myMusicWhatsNewAlbums = response;
                $ionicSlideBoxDelegate.$getByHandle('whatsNewSlideBoxAlbum').update();
             

            }, function (reason) {
                console.error("Controller Error:" + reason);
                $scope.myMusicWhatsNewAlbumsData = true;
             
            })
        }
        catch (e) {
            $scope.myMusicWhatsNewAlbumsData = false;
            console.error("controller json error: " + e.message);
        }

        //**************************************************Get all the events*********************************************************************************************
        try {
            console.error("getting new events");
            var promise = surealServices.getEventsAllEvents(JSON.parse(localStorage.getItem("userAuth")), true);
            promise.then(function (response) {

                $scope.myMusicWhatsNewEventsData = true;
                //now load the data
               // localStorage.setItem("myMusicWhatsNewEvents", JSON.stringify(response));
                $scope.myMusicWhatsNewEvents = response;
                $ionicSlideBoxDelegate.$getByHandle('myMusicWhatsNewEvents').update();

            }, function (reason) {
                console.error("Error Get New Events");
                console.error("Controller Error:" + reason);
                $scope.myMusicWhatsNewEventsData = true;
              //  loadData(false);
            })
        }
        catch (e) {
            $scope.myMusicWhatsNewEventsData = false;
            console.error("controller json error: " + e.message);
        }

        //get the index of the slide
        //********** INTEGRATION WORK END**************************************************************************************************************
        $scope.slideIndexWN = function (slideIndex) {
          //$ionicSlideBoxDelegate.$getByHandle('whatsNewSlideBox').slide(slideIndex);
          // $ionicSlideBoxDelegate.$getByHandle('whatsNewSlideBox').update();
        }

        //show action sheet
        $scope.actSheetWXN = function (options, id, resource_name, resource_img,resource_type) {
            getActionSheet.show(options, id, resource_name, resource_img, resource_type);
           
        }

     
    })
//********** INTEGRATION WORK END**************************************************************************************************************

  
   //********** *********************************************************************************************************************
   //********** Music Player**************************************************************************************************************
   //***********************************************************************************************************************
   .controller('MusicPlayerCtrl', function ($scope, $interval, $ionicSlideBoxDelegate, $timeout, $window, MediaSrv, $ionicPlatform, roundProgressService, manageSessionService, surealMusicServices)
   {
       
            $scope.playImage = "img/play@2x.png";
            $scope.pauseImage = "img/pause@2x.png";
            $scope.playStateImage = "img/play@2x.png";
            $scope.currentSong = null;

            $scope.currentSongName = null;
            $scope.currentSongDuration = null;

            $scope.currentSongUpdated = false;
            initialized = false;
      
            $scope.progressCurrent = 0;
            $scope.timerCurrent = 0;
            $scope.progressMax = 0;
            $scope.offset = 0;
            $scope.uploadCurrent = 0;
            $scope.stroke = 15;
            $scope.radius = 125;
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

          
            $scope.currentResource = JSON.parse(localStorage.getItem("currentResource"));

           //get local storage everytime - make sure album / song has not changed. if album we always play first song
            $scope.initalizeSession = function () {
                $scope.currentResource = JSON.parse(localStorage.getItem("currentResource"));
            }
        
          
            //make sure buttons etc are the same.
            $scope.initScreenData = function ()
            {
                //Set the current time and max time
                
                $scope.rotatetrack = surealMusicServices.getRotateTrack();
                $scope.playStateImage = surealMusicServices.getPlayStateImage();
            }

            //Call to setup progressbar
            $scope.initializePlayer = function (radius, max, timerCurrent, currentColor, bgColor) {
            
                $scope.currentColor = currentColor;
                $scope.bgColor = bgColor;
                $scope.initScreenData();
            }

           $scope.animations = [];
           angular.forEach(roundProgressService.animations, function (value, key) {
               $scope.animations.push(key);
           });


           $scope.getStyle = function () {
               var transform = ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

               return {
                   'top': $scope.isSemi ? 'auto' : '50%',
                   'bottom': $scope.isSemi ? '5%' : 'auto',
                   'left': '50%',
                   'transform': transform,
                   '-moz-transform': transform,
                   '-webkit-transform': transform,
                   'font-size': $scope.radius / 3.5 + 'px'
               };
           };

           $scope.getColor = function () {
               return $scope.gradient ? 'url(#gradient)' : $scope.currentColor;
           };



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


        ////Download the song then play
        //function loadMediaDownload(url) {
        //    //Check if file is local
        //    var localPath = "";
        //    var downloadComplete = false;
           
           
        //    fileController.download(url);

        //    value = fileController.getTartgetPath();

        //    var waitforDownload = function () {
        //        downloadComplete = fileController.getDownloadComplete();
              
        //        if (downloadComplete == false) {
        //            $timeout(waitforDownload, 2000);
        //        }
        //        else
        //        {
        //            value = value.replace("file:///", "");
        //            console.error("Local Path:" + value);

        //            $scope.myMedia = new Media(url, null, mediaError);
        //            try
        //            {
        //                $scope.maxTime = $scope.myMedia.getDuration();
        //                //console.error("Duration:" + $scope.myMedia.getDuration());
        //            }
        //            catch (e)
        //            {
        //                console.error("Error(1):" + e.message);
        //            }

        //        }
        //        waitforDownload = downloadComplete;
        //    }
        //    downloadComplete = waitforDownload();
        //}


       //Timer start function.
        $scope.timerToggle = function (index) {

           
            if (surealMusicServices.getIsStreamPlaying() == true) {

                surealMusicServices.pauseStream();
                $scope.updateScreenData();
               
            }
            else
            {
                var streamValid = false;
                // "resource_id": resource_id, "resource_name": resource_name,
                // "resource_img": resource_img, "resource_type": resource_type
                if ((surealMusicServices.getStreamLoaded() == false) && $scope.currentSongUpdated == true) {
                    var current_resource = JSON.parse(localStorage.getItem("currentResource"));
               
                    surealMusicServices.getMediaStream(current_resource.resource_id, current_resource.resource_type);
                   
                }

            
                if (surealMusicServices.getStreamLoaded() == true) {
                    
                    $scope.currentSong = surealMusicServices.getCurrentSong();
                    setCurrentSong(false);

                    $scope.currentSongUpdated = false;
                  
                    //  $scope.togglePlayback = !$scope.togglePlayback;
                    //Make sure media is loaded FIRST!
                    
                    //play the stream and update the images
                    surealMusicServices.playStream();
                    $scope.updateScreenData();

                    $scope.tracks = localStorage.getItem("myMusicTrendingAlbums");

                    var resource_id = localStorage.getItem("resource_id");
                    var resource_type = localStorage.getItem("resource_type");


                }
                //based on resource type lets get proper arry
              
            } 
        };

       //make sure buttons etc are the same.
        $scope.updateScreenData = function () {

            //Set the current time and max time
            $scope.rotatetrack = surealMusicServices.getRotateTrack();
            $scope.playStateImage = surealMusicServices.getPlayStateImage();
        
        }

       //make sure buttons etc are the same.
        $scope.updateScreenTime = function (currentT) {
            //Set the current time and max time
            //   $scope.progressCurrent = $scope.progressCurrent + 1;
            $scope.progressCurrent = surealMusicServices.cSeconds(currentT);
          
        }

       //watch for current song updated and update screen.
        $scope.$on('currentSongUpdated', function (event, args) {
         
            $scope.currentSongUpdated = true;
            $scope.currentSong = surealMusicServices.getCurrentSong();
            $scope.progressMax = surealMusicServices.cSeconds($scope.currentSong[0].Duration);
           
            $scope.currentSong[0].Duration = $scope.currentSong[0].Duration.replace("00:", "");

            setCurrentSong(false);

            
          
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
        $scope.$on('timerUpdate', function (event, args) {
         
       
            $scope.currentTime = args.currentTime;
            $scope.updateScreenTime($scope.currentTime);
           
        });


       //watch for the global timer and update data on the screen.
        $scope.$on('streamState', function (event, args) {
        
            $scope.streamIsLoading = surealMusicServices.getStreamIsLoading();
            console.error("Stream is Loading:" + $scope.streamIsLoading);
        });
        

        if (initialized == false)
        {
            //try {
            //    $scope.currentSong = localStorage.getItem("currentSong");
            //    $scope.currentSong[0].Duration = $scope.currentSong[0].Duration.replace("00:", "");
            //}
            //catch (e) { };

            setCurrentSong(true);
            initialized = true;
        }
       
       
      //Slide Box 
       $scope.onSlideMove = function(data){
         
           };

       $scope.slideIndex = function (slideIndex) {

               $ionicSlideBoxDelegate.$getByHandle('playerSlideBox').slide(slideIndex);
               $ionicSlideBoxDelegate.$getByHandle('playerSlideBox').update();
          
           }

       $scope.Next = function (slideIndex) {

               $ionicSlideBoxDelegate.next();
           }

   


   })

   //********** *********************************************************************************************************************
   //********** Music Player**************************************************************************************************************
   //***********************************************************************************************************************
   //********** INTEGRATION WORK END**************************************************************************************************************


   .controller('tabCtrl', function ($scope, $ionicSideMenuDelegate) {
   
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })

    .controller('HomeCtrl', function ($scope) {
    })




