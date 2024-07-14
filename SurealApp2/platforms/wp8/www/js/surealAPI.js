angular.module('surealMusic.cloudAPI', [])
    

.factory('surealServices', function ($q, $location, $http, $timeout) {
  
    var album_songs = null;
    var row_item_count = 5;
    var row_item_col = "col-20"; //this depends on item count

    function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            console.error("IsJsonString:" + e.message)
            return false;
        }
        return true;
    }

    //Get item count
    var getItemCount = function ()
    {
        return row_item_count;

    }

    //Get item count
    var getItemCol = function () {
        return row_item_col;

    }

    ///Function to get login credentials
    var Login = function(username, password, isSignup, isSocialsignin) {
        var signindata =
             {
                 "isSignup": isSignup,
                 "isSocialSignin": isSocialsignin,
                 "email": username,
                 "password": password,
                 "social_channel": {
                     "social_channel": "",
                     "social_channel_passcode": "",
                     "social_channel_post_permission": "",
                     "social_channel_status": "Active",
                     "social_channel_username": ""
                 }
             }
        //**********************************SIGNIN FUNCTION **************************************\
            var d = $q.defer();

            var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/signin";
            var req = {
                method: 'POST',
                url: URL,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: signindata

            };
        $http(req).success(function (data) {
            

                d.resolve(data);
            }).error(function (error) {
                console.error("SurealAPI - Login Error:" + JSON.stringify(error));
                d.reject(error);
            });

            return d.promise;
        }
    ///Function to get new albums

    ///**********************************************************************************************************************
    ///******************************************Get favorite albums for the current user*****************************************
    ///**********************************************************************************************************************
    var getFavoriteAlbumsForCurrentUser = function (authData, asSlides) {

        // auth_uid: "",
        // auth_token: "",
        // account_user_id: ""
        console.error("Getting Favorite Albums for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/GetFavoriteAlbums";
        var req = {
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'auth_uid': authData.auth_uid,
                'auth_token': authData.auth_token
            },
            data: { "accountId": authData.account_user_id }

        };

        $http(req).success(function (data) {


            //build comprehensive json reponse into data object
            response = JSON.parse(data);
            var count = 0;
            var slide_count = 1;
            var slideTemp = [];
            var finaldata = [];

            if (asSlides == true) {
                angular.forEach(response.data.albums, function (value) {

                    try {
                        var albumInfo = JSON.parse(value.album_info);
                        //  console.error(value);
                        count = count + 1;
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Artist: 'The Ramones', Name: value.name, Options: '0,0,1,1,1,1,1', ImageURL: albumInfo.album_cover_photo });
                    }
                    catch (e) { }

                    if (count == row_item_count) {
                        finaldata.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                    }
                }); //foreach
            }
            else {
                console.error("getFavoriteAlbumsForCurrentUser: Building list");

                angular.forEach(response.data.albums, function (value) {
                    try {
                        var albumInfo = JSON.parse(value.album_info);
     
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        finaldata.push({ Artist: 'The Ramones', Name: value.name, Options: '0,0,1,1,1,1,1', ImageURL: albumInfo.album_cover_photo });
                    }
                    catch (e) { console.error("getFavoriteAlbumsForCurrentUser Error:" + e.message); }


                });//foreach

            }

            console.error("getFavoriteAlbumsForCurrentUser:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            console.error("SurealAPI - getFavoriteAlbumsForCurrentUser Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }


    ///**********************************************************************************************************************
    ///******************************************Get new albums for the current user*****************************************
    ///**********************************************************************************************************************
    ///Function to get new albums
    var getNewAlbumSongs = function (album_id)
    {
        var finaldata = [];

        angular.forEach(album_songs, function (value) {
            try {
                if (value.album_id == album_id) {
                    finaldata.push(value);
                }
            }
            catch (e) { }


        });//foreach

        return finaldata;
    }


    var getNewAlbumsForCurrentUser = function (authData, asSlides) {
  
       // auth_uid: "",
       // auth_token: "",
        // account_user_id: ""
        console.error("Getting Albums for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/getNewAlbums";
        var req = {
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'auth_uid': authData.auth_uid,
                'auth_token': authData.auth_token
            },
            data: { "accountId": authData.account_user_id }

        };


        $http(req).success(function (data) {
     

            //build comprehensive json reponse into data object
            response = JSON.parse(data);


            var count = 0;
            var slide_count = 1;
            var slideTemp = [];
            var finaldata = [];

            album_songs = response.data.album_songs;
   
            if (asSlides == true) {
                angular.forEach(response.data.album, function (value) {

                    try {
                        var albumInfo = JSON.parse(value.album_info);
                    
                        //  console.error(value);
                        count = count + 1;
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Artist: 'The Ramones', Name: value.name, Options: '1,1,1,1,1,0,1', ImageURL: albumInfo.album_cover_photo, Id: value.id });
                    }
                    catch (e) { }

                    if (count == row_item_count) {
                        finaldata.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                    }
                }); //foreach
            }
            else
            {
                finaldata = response;

            }

            console.error("GetnewAlbums:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            console.error("SurealAPI - getNewAlbumsForCurrentUser Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }


    //**********************************PENDING**************************************\
    var getAlbumDetails = function (authData, album_id, asSlides) {

        // auth_uid: "",
        // auth_token: "",
        // account_user_id: ""
        console.error("Getting Albums for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/GetAlbumDetails";
        var req = {
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'auth_uid': authData.auth_uid,
                'auth_token': authData.auth_token
            },
            data: {
                "accountId": authData.account_user_id,
                "albumid": album_id
                }

        };


        $http(req).success(function (data) {


            //build comprehensive json reponse into data object
            response = JSON.parse(data);
            var count = 0;
            var slide_count = 1;
            var slideTemp = [];
            var finaldata = [];

            if (asSlides == true) {
                angular.forEach(response.data.songs, function (value) {

                    try {
                        var albumInfo = JSON.parse(value.album_info);
                        //  console.error(value);
                        count = count + 1;
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Artist: 'The Ramones', Name: value.name, Options: '1,1,1,1,1,0,1', ImageURL: albumInfo.album_cover_photo });
                    }
                    catch (e) { }

                    if (count == row_item_count) {
                        finaldata.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                    }
                }); //foreach
            }
            else {

                var albumDetails = response.data.album_details;



                angular.forEach(response.data, function (value) {
                    try {
                        finaldata.push({ Artist: 'The Ramones', Name: value.name, Options: "0,1,1,1,1,1,1", ImageURL: value.playlist_info.album_cover_photo });
                    }
                    catch (e) { }


                });//foreach

            }

            console.error("GetnewAlbums:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            console.error("SurealAPI - getNewAlbumsForCurrentUser Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }

    //***********************************************event for current user************************************
    //*********************************************************************************************************
    //***********************************************event for current user************************************
    var getEventsAllEvents = function (authData, asSlides) {

        // auth_uid: "",
        // auth_token: "",
        // account_user_id: "
        console.error("Getting Events for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/GetAllEvents";
        var req = {
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'auth_uid': authData.auth_uid,
                'auth_token': authData.auth_token
            },
            data: { "accountId": authData.account_user_id }

        };

        $http(req).success(function (data) {
            // console.error("GetnewAlbums:" + JSON.stringify(data));
            //Build out data for events
            response = JSON.parse(data);
            var count = 0;
            var slide_count = 1;
            var slideTemp = [];
            var finaldata = [];

            //build comprehensive json reponse into data object
            if (asSlides == true) {
                console.error("getEventsAllEvents: Building Slides");
                angular.forEach(response.data.all_events, function (value) {
                    try {

                        //  console.error(value);
                        count = count + 1;
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Artist: 'The Ramones', Name: value.event.name, Options: "0,0,0,1,1,1,1", ImageURL: value.event.event_image, Id: value.event.id });
                    }
                    catch (e) { }

                    if (count == row_item_count) {
                        finaldata.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                    }
                }); //foreach
            }
            else
            {
                finaldata = response;
            }

            console.error("getEvents:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            console.error("SurealAPI - getAllEventsForCurrentUser Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }

    //***********************************************playlist for current user************************************
    //*********************************************************************************************************
    //***********************************************playlist for current user************************************
    var getPlayListsForCurrentUser = function (authData, asSlides) {

        // auth_uid: "",
        // auth_token: "",
        // account_user_id: "
        console.error("Getting Playlists for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/getPlaylist";
        var req = {
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'auth_uid': authData.auth_uid,
                'auth_token': authData.auth_token
            },
            data: { "accountId": authData.account_user_id }

        };



        $http(req).success(function (data) {
            // console.error("GetnewAlbums:" + JSON.stringify(data));
            //Build out data for events
  
            response = JSON.parse(data);
            var count = 0;
            var slide_count = 1;
            var slideTemp = [];
            var finaldata = [];

            //build comprehensive json reponse into data object
            if (asSlides == true) {
                console.error("getPlaylistForCurrentUser: Building Slides");
                angular.forEach(response.data, function (value) {
                    try {

                        //  console.error(value);
                        count = count + 1;
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Artist: 'The Ramones', Name: value.name, Options: "0,1,1,1,1,1,1", ImageURL: value.playlist_info.album_cover_photo, Id: value.id });
                    }
                    catch (e) { }

                    if (count == row_item_count) {
                        finaldata.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                    }
                }); //foreach
            }
            else {
                angular.forEach(response.data, function (value) {
                    try {
                        finaldata.push({ Artist: 'The Ramones', Name: value.name, Options: "0,1,1,1,1,1,1", ImageURL: value.playlist_info.album_cover_photo, Id: value.id });
                    }
                    catch (e) { }


                });//foreach
            }
          
            console.error("getPlaylistsForCurrentUser:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            console.error("SurealAPI - getPlaylistsForCurrentUser Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }
    //***********************************************get all New Playlists************************************
    //*********************************************************************************************************
    //***********************************************get all New Playlists************************************
    var getNewPlayListsForCurrentUser = function (authData, asSlides) {

        // auth_uid: "",
        // auth_token: "",
        // account_user_id: "
        console.error("Getting Playlists for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/getNewPlaylist";
        var req = {
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'auth_uid': authData.auth_uid,
                'auth_token': authData.auth_token
            },
            data: { "accountId": authData.account_user_id }

        };

 
        $http(req).success(function (data) {
            // console.error("GetnewAlbums:" + JSON.stringify(data));
            //Build out data for events
      
            response = JSON.parse(data);
            var count = 0;
            var slide_count = 1;
            var slideTemp = [];
            var finaldata = [];

            //build comprehensive json reponse into data object
            if (asSlides == true) {
                console.error("getNewPlayListsForCurrentUser: Building Slides");
                angular.forEach(response.data.playlist, function (value) {
                    try {

                        //  console.error(value);
                        var playlist_info = JSON.parse(value.playlist_info);
                        count = count + 1;
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Artist: 'The Ramones', Name: value.name, Options: "0,1,1,1,1,1,1", ImageURL: playlist_info.album_cover_photo, Id: value.id });
                    }
                    catch (e) { }

                    if (count == row_item_count) {
                        finaldata.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                    }
                }); //foreach
            }
            else {
                console.error("getNewPlayListsForCurrentUser: Building list");
   
                angular.forEach(response.data.playlist, function (value) {
                    try {
                        var playlist_info = JSON.parse(value.playlist_info);
                        finaldata.push({ Artist: 'The Ramones', Name: value.name, Options: "0,1,1,1,1,1,1", ImageURL: playlist_info.album_cover_photo, Id: value.id });
                    }
                    catch (e) { console.error("getNewPlayListsForCurrentUser Error:" + e.message); }


                    });//foreach
              }


            console.error("getPlaylistsForCurrentUser:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            console.error("SurealAPI - getPlaylistsForCurrentUser Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }


    return {
        Login: Login,
        getNewAlbumsForCurrentUser: getNewAlbumsForCurrentUser,
        getEventsAllEvents: getEventsAllEvents,
        getPlayListsForCurrentUser: getPlayListsForCurrentUser,
        getNewPlayListsForCurrentUser: getNewPlayListsForCurrentUser,
        getFavoriteAlbumsForCurrentUser: getFavoriteAlbumsForCurrentUser,
        getAlbumDetails, getAlbumDetails,
        getNewAlbumSongs: getNewAlbumSongs,
        IsJsonString: IsJsonString,
        getItemCount: getItemCount,
        getItemCol: getItemCol
    };
})