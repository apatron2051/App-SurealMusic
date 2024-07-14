angular.module('surealMusic.cloudAPI', [])
    

.factory('surealServices', function ($q, $location, $http, $timeout,$log) {
  
    var gbl_album_songs = null;
    var gbl_row_item_count = 5;
    var row_item_col = "col col-20"; //this depends on item count
    var glb_sureal_url = "https://Surealmusicweb.azurewebsites.net/";


    function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            $log.debug("IsJsonString:" + e.message)
            return false;
        }
        return true;
    }

    //Get item count
    var getItemCount = function ()
    {
        return gbl_row_item_count;

    }

    //Get item count
    var getItemCol = function () {
        return row_item_col;

    }
    
    var getSurealURL = function () {

        return glb_sureal_url;
    }


    ///**********************************************************************************************************************
    ///******************************************Set favorite playlist for the current user*****************************************
    ///**********************************************************************************************************************

    var setFavoritePlaylist = function (authData, playlist_id, bool_liked) {

        // auth_uid: "",
        // auth_token: "",
        // account_user_id: ""
        $log.debug("set fav playlist for :" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/AddAccountPlaylistDetails";
        var req = {
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'auth_uid': authData.auth_uid,
                'auth_token': authData.auth_token
            },
            data: {
                "accountuser_id": authData.account_user_id,
                "playlist_id": playlist_id,
                "is_liked": bool_liked
            }

        };


        $http(req).success(function (data) {

            $log.debug("setFavoritePlaylist:Success");
            d.resolve(true);


        }).error(function (error) {
            $log.debug("SurealAPI - setFavoritePlaylist Error:" + JSON.stringify(error));
            d.reject(false);
        });

        return d.promise;
    }


    ///**********************************************************************************************************************
    ///******************************************Set favorite albums for the current user*****************************************
    ///**********************************************************************************************************************
    ///{accountId: 5556, is_liked: true, is_purchased: false, is_download: false}
    var setFavoriteAlbum = function (authData, album_id, bool_liked) {

        // auth_uid: "",
        // auth_token: "",`
        // account_user_id: ""
        $log.debug("set fav album for :" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/AddAccountAlbumActivityDetails";
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
                "album_id": album_id,
                "is_liked": bool_liked,
                "is_purchased": "false",
                "is_download": "false"

            }

        };

        console.error(req);

        $http(req).success(function (data) {

            $log.debug("setFavoriteAlbum:Success");
            d.resolve(true);


        }).error(function (error) {
            $log.debug("SurealAPI - setFavoriteAlbum Error:" + JSON.stringify(error));
            d.reject(false);
        });

        return d.promise;
    }


    ///**********************************************************************************************************************
    ///******************************************Set favorite albums for the current user*****************************************
    ///**********************************************************************************************************************
    ///{accountId: 5556, is_liked: true, is_purchased: false, is_download: false}
    var setJoinEvent = function (authData, event_id) {

        // auth_uid: "",
        // auth_token: "",`
        // account_user_id: ""
        $log.debug("set fav album for :" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/SetAccountEventActivity";
        var req = {
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'auth_uid': authData.auth_uid,
                'auth_token': authData.auth_token
            },
            data: {
                "accountId": authData.auth_uid,
                "event_id": event_id
            }

        };

        $http(req).success(function (data) {

            $log.debug("setJoinEvent:Success");
            d.resolve(true);
            alert(true);


        }).error(function (error) {
            $log.debug("SurealAPI - setJoinEvent Error:" + JSON.stringify(error));
            alert( JSON.stringify(error));
            d.reject(false);
        });

        return d.promise;
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
                $log.debug("SurealAPI - Login Error:" + JSON.stringify(error));
                d.reject(error);
            });

            return d.promise;
        }
    ///Function to get new albums



    
    ///Get the artist information by the artist ID.

    var getArtistByID= function (authData, artistid, asSlides) {

        // auth_uid: "",
        // auth_token: "",
        // account_user_id: ""
        $log.debug("Getting Albums for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/getArtistById";
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
                "artist_id": artistid
                }
        };

        $http(req).success(function (data) {
            // $log.debug("GetnewAlbums:" + JSON.stringify(data));
            //Build out data for events
            response = JSON.parse(data);

            var count = 0;
            var slide_count = 1;
            var photos = [];
            var finaldata = [];
            var artistProfile = [];
            var profilePhotos = [];
            var rawbioPhotos = [];
            var bioPhoto = [];

            //build comprehensive json reponse into data object
            if (asSlides == true) {
                $log.debug("getArtistByID: Building Slides");
                finaldata = response;
            }
            else {
                $log.debug("getArtistByID: Building Lists");
 
                angular.forEach(response.data, function (artist) {
                    try {

                            photos = [];
                            profilePhotos = [];
                            artistProfile = [];
                            rawbioPhotos = [];

                            angular.forEach(artist, function (value) {

                                try {

                                    artistProfile = JSON.parse(value.private_profile_json);
                            
                                    profilePhotos = artistProfile.profile_photo;
                                    rawbioPhotos = artistProfile.bio_photo;
                                }
                                catch (e) {
                                    $log.debug("Error (2) in getArtistByID:" + e.message)
                                }

                                try {
                                    ///Get the photos
                                    angular.forEach(profilePhotos, function (profilePhoto) {

                                        if (profilePhoto.photo != "") {
                                            photos.push({
                                                Id: profilePhoto.id,
                                                ImageURL: profilePhoto.photo.replace("app.assets", glb_sureal_url + "/app.assets"),
                                                Select: profilePhoto.selected
                                            });
                                        }

                                    });
                                }
                                catch (e) 
                                {
                                    $log.debug("Error (3) in getArtistByID:" + e.message);
                                }


                                try {
                                    ///Get the photos
                                    angular.forEach(rawbioPhotos, function (rawbioPhoto) {

                                        if (rawbioPhoto.photo != "") {
                                            bioPhoto.push({
                                                Id: rawbioPhoto.id,
                                                ImageURL: rawbioPhoto.photo.replace("app.assets", glb_sureal_url + "/app.assets"),
                                                Select: rawbioPhoto.selected
                                            });
                                        }

                                    });
                                }
                                catch (e) {
                                    $log.debug("Error (3a) in getArtistByID:" + e.message);
                                }



                                try {
                                    finaldata.push({
                                        Id: value.artist_id,
                                        Name: value.name,
                                        ImageURL: value.event_image,
                                        Options: getArtistOptions(),
                                        Gender: artistProfile.gender,
                                        DOB: artistProfile.dob,
                                        TagLine: artistProfile.tagline,
                                        Location: artistProfile.location,
                                        CoverPhoto: artistProfile.cover_photo,
                                        Facebook: artistProfile.fb_link,
                                        Twitter: artistProfile.twitter_link,
                                        Google: artistProfile.googleplus_link,
                                        Microsoft: artistProfile.microsoft_link,
                                        About: artistProfile.aboutyou,
                                        ArtistPhotos: photos,
                                        BioPhoto:bioPhoto
                                    });
                                }
                                catch (e) {
                                    $log.debug("Error (4) in getArtistByID:" + e.message);
                                }
                            });

                    }
                    catch (e) { $log.debug("Error (5) in getArtistByID:" + e.message); }

                }); //foreach
            }

            $log.debug("getArtistByID:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            $log.debug("SurealAPI - getArtistByID Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }

  


    ///**********************************************************************************************************************
    ///******************************************Get favorite albums for the current user*****************************************
    ///**********************************************************************************************************************
    var getPurchasedAlbumsForCurrentUser = function (authData, asSlides) {

        // auth_uid: "",
        // auth_token: "",
        // account_user_id: ""
        $log.debug("Getting Purchased Albums for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/GetPurchasedAlbums";
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
            var pushedToFinalData = false;



            if (asSlides == true) {
                angular.forEach(response.data.albums, function (value) {

                    try {
                        var albumInfo = JSON.parse(value.album_info);

                        //  $log.debug(value);
                        count = count + 1;
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Id: value.id, Artist: 'The Ramones', Name: value.name, Options: getAlbumOptions(), ImageURL: albumInfo.album_cover_photo.replace("app.assets", glb_sureal_url + "/app.assets") });

                    }
                    catch (e) { }

                    //Set pushed to final data to false to ensure we catch all data.
                    pushedToFinalData == false

                    if (count == gbl_row_item_count) {
                        finaldata.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                        pushedToFinalData = true;
                    }
                }); //foreach

                //If there is less than row_item count then push to finaldata.
                if (pushedToFinalData == false) {
                    finaldata.push({ slide_id: slide_count, slide: slideTemp });
                    slideTemp = [];
                    slide_count = slide_count + 1;
                    count = 0;
                    pushedToFinalData = true;
                }
            }
            else {
                $log.debug("getPurchasedAlbumsForCurrentUser: Building list");

                angular.forEach(response.data.albums, function (value) {
                    try {
                        var albumInfo = JSON.parse(value.album_info);

                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        finaldata.push({ Artist: 'The Ramones', Name: value.name, Options: getAlbumOptions(), ImageURL: albumInfo.album_cover_photo.replace("app.assets", glb_sureal_url + "/app.assets") });
                    }
                    catch (e) { $log.debug("getPurchasedAlbumsForCurrentUser Error:" + e.message); }


                });//foreach

            }

            $log.debug("getPurchasedAlbumsForCurrentUser:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            $log.debug("SurealAPI - getPurchasedAlbumsForCurrentUser Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }


    //*****************************************************************************************\
    //*****************************************************************************************\
    //**********************************Music Tracking**********************************************\
    //*****************************************************************************************\

    var setPlaylistPlayedDetails = function (authData, playlis_id) {

        // auth_uid: "",
        // auth_token: "",
        // account_user_id: ""
        $log.debug("Setting setPlaylistPlayedDetails for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/SetPlaylistPlayedDetails";
        var req = {
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'auth_uid': authData.auth_uid,
                'auth_token': authData.auth_token
            },
            data: {

                "accountuser_id": authData.account_user_id,
                "playlist_id": playlis_id
            }

        };

        $http(req).success(function (data) {

            $log.debug("setPlaylistPlayedDetails:Success");
            d.resolve(data);


        }).error(function (error) {
            $log.debug("SurealAPI - setPlaylistPlayedDetails Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }




    var setAlbumPlayedDetails = function (authData, album_id) {

            // auth_uid: "",
            // auth_token: "",
            // account_user_id: ""
        $log.debug("Setting SetAlbumPlayedDetails for:" + authData.account_user_id)
            //**********************************SIGNIN FUNCTION **************************************\
            var d = $q.defer();

            var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/SetAlbumPlayedDetails";
            var req = {
                method: 'POST',
                url: URL,
                headers: {
                    'Content-Type': 'application/json',
                    'auth_uid': authData.auth_uid,
                    'auth_token': authData.auth_token
                },
                data: {

                    "accountuser_id": authData.account_user_id,
                    "album_id": album_id
                }

            };

            $http(req).success(function (data) {

                $log.debug("SetAlbumPlayedDetails:Success");
                d.resolve(data);


            }).error(function (error) {
                $log.debug("SurealAPI - SetAlbumPlayedDetails Error:" + JSON.stringify(error));
                d.reject(error);
            });

            return d.promise;
        }

     
     var setSongPlayedDetails = function (authData, song_id, stream_duration) {


        // auth_uid: "",
        // auth_token: "",
        // account_user_id: ""
        $log.debug("Setting setSongPlayedDetails for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/SetSongPlayedDetails";
        var req = {
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'auth_uid': authData.auth_uid,
                'auth_token': authData.auth_token
            },
            data: {

                "accountuser_id": authData.account_user_id,
                "song_id": song_id,
                "stream_duration": stream_duration

            }

        };
        $http(req).success(function (data) {

            $log.debug("setSongPlayedDetails:Success");
            d.resolve(data);


        }).error(function (error) {
            $log.debug("SurealAPI - setSongPlayedDetails Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }

    //*****************************************************************************************\
    //*****************************************************************************************\
    //**********************************DASHBOARD**********************************************\
    //*****************************************************************************************\

    var getDashboard = function (authData) {


        // auth_uid: "",
        // auth_token: "",
        // account_user_id: ""
        $log.debug("Getting getDashboardDetails for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/getDashboardDetails";
        var req = {
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'auth_uid': authData.auth_uid,
                'auth_token': authData.auth_token
            },
            data: {

                "accountId": authData.account_user_id, "is_weekly": false, "is_monthly": false, "is_yearly": true
           
            }

        };

        $http(req).success(function (data) {

            $log.debug("getDashboard:Success");
            d.resolve(data);


        }).error(function (error) {
            $log.debug("SurealAPI - getDashboard Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }



    var getDashboardTrendingSongDetails = function (authData) {


        // auth_uid: "",
        // auth_token: "",
        // account_user_id: ""
        $log.debug("Getting GetTrendingSongDetails  for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/GetTrendingSongDetails";
        var req = {
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'auth_uid': authData.auth_uid,
                'auth_token': authData.auth_token
            },
            data: {

                "accountId": authData.account_user_id, "is_weekly": false, "is_monthly": false, "is_yearly": true


            }

        };

        $http(req).success(function (data) {

            $log.debug("GetTrendingMerchandiseDetails:Success");
            d.resolve(data);


        }).error(function (error) {
            $log.debug("SurealAPI - GetTrendingMerchandiseDetails Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }



    var getDashboardTrendingMerchandiseDetails = function (authData) {


        // auth_uid: "",
        // auth_token: "",
        // account_user_id: ""
        $log.debug("Getting GetTrendingMerchandiseDetails  for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/GetTrendingMerchandiseDetails";
        var req = {
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'auth_uid': authData.auth_uid,
                'auth_token': authData.auth_token
            },
            data: {

                "accountId": authData.account_user_id, "is_weekly": false, "is_monthly": false, "is_yearly": true


            }

        };

        $http(req).success(function (data) {

            $log.debug("GetTrendingMerchandiseDetails:Success");
            d.resolve(data);


        }).error(function (error) {
            $log.debug("SurealAPI - GetTrendingMerchandiseDetails Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }

    var getDashboardTrendingEntrepreneurDetails = function (authData) {


        // auth_uid: "",
        // auth_token: "",
        // account_user_id: ""
        $log.debug("Getting GetTrendingMerchandiseDetails  for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/GetTrendingEntrepreneurDetails";
        var req = {
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'auth_uid': authData.auth_uid,
                'auth_token': authData.auth_token
            },
            data: {

                "accountId": authData.account_user_id, "is_weekly": false, "is_monthly": false, "is_yearly": true


            }

        };

        $http(req).success(function (data) {

       

            $log.debug("GetTrendingEntrepreneurDetails:Success");
            d.resolve(data);


        }).error(function (error) {
            $log.debug("SurealAPI - GetTrendingEntrepreneurDetails Error:" + JSON.stringify(error));
            d.reject(error);
        });


        return d.promise;
    }






   
 
    //**********************************Search Music**************************************\
    var getSearch = function (authData, searchInput, asSlides) {

        // auth_uid: "",
        // auth_token: "",
        // account_user_id: ""
        $log.debug("Getting Downloaded Albums for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/Search";
        var req = {
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'auth_uid': authData.auth_uid,
                'auth_token': authData.auth_token
            },
            data: { "search": searchInput }

        };

        $http(req).success(function (data) {


            //build comprehensive json reponse into data object
            response = JSON.parse(data);
      

            var count = 0;
            var slide_count = 1;
            var slideTemp = [];

            var Artist = [];
      
            var Bands = [];


            var Albums = [];
 

            var Songs = [];
  

            var Events = [];
      

            var Merchandise = [];
 

            var finaldata = [];
    

            //"data":{
            //    "Artists":[],
            //    "Bands":[],
            //    "Labels":[],
            //    "Albums":[],
            //    "Songs":[],
            //    "Playlists":[],
            //    "Events":[],
            //    "DJGroupLive":[],
            //    "Merchandise":[]}}

            if (asSlides == true) {

                //****************************************************************************************************************
                ///Get Artists*****************************************************************************************************
                //****************************************************************************************************************
                angular.forEach(response.data.Artists, function (value) {

                    try {
                     
                        //  $log.debug(value);
                        count = count + 1;
                        var profile = JSON.parse(value.private_profile_json);
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Id: value.id, Name: value.name, Options: getArtistOptions(), ImageURL: profile.cover_photo.replace("app.assets", glb_sureal_url + "/app.assets") });

                    }
                    catch (e) { }

                    //Set pushed to final data to false to ensure we catch all data.
               

                    if (count == gbl_row_item_count) {
                        Artist.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
            
                    }
                }); //foreach
                

                //If there is less than row_item count then push to finaldata.
                if (count != 0) {
                    Artist.push({ slide_id: slide_count, slide: slideTemp });
                    slideTemp = [];
                    slide_count = slide_count + 1;
                    count = 0;              
                }

                slideTemp = [];
                count = 0;
                slide_count = 1;


                //****************************************************************************************************************
                ///Get Bands*****************************************************************************************************
                //****************************************************************************************************************
                angular.forEach(response.data.Bands, function (value) {

                    try {

                        //  $log.debug(value);
                        count = count + 1;
                        var photo = "";
                        var profile = JSON.parse(value.private_profile_json);

               

                        try 
                        {
                             photo = profile.profile_photo[0].photo.replace("app.assets", glb_sureal_url + "/app.assets")  
                        }
                        catch (e) 
                        {
                            photo = glb_sureal_url + "/app.assets";
                        }
       
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Id: value.id, Name: value.name, Options: getArtistOptions(), ImageURL: photo });

                    }
                    catch (e) { }

                    //Set pushed to final data to false to ensure we catch all data.
         

                    if (count == gbl_row_item_count) {
                        Bands.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                 
                    }
                }); //foreach

                //If there is less than row_item count then push to finaldata.
                if (count != 0) {
                    Bands.push({ slide_id: slide_count, slide: slideTemp });
                    slideTemp = [];
                    slide_count = slide_count + 1;
                    count = 0;
              
                }

                slideTemp = [];
                count = 0;
                slide_count = 1;
                //****************************************************************************************************************
                ///Get albums*****************************************************************************************************
                //****************************************************************************************************************
                angular.forEach(response.data.Albums, function (value) {

                    try {

                        //  $log.debug(value);
                        count = count + 1;
                        var album_info = JSON.parse(value.album_info);
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Id: value.id, Name: value.name, Options: getAlbumOptions(), ImageURL: album_info.album_cover_photo.replace("app.assets", glb_sureal_url + "/app.assets") });

                    }
                    catch (e) { }

                    //Set pushed to final data to false to ensure we catch all data.
                   

                    if (count == gbl_row_item_count) {
                        Albums.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                        
                    }
                }); //foreach

                //If there is less than row_item count then push to finaldata.
                if (count != 0) {
                    Albums.push({ slide_id: slide_count, slide: slideTemp });
                    slideTemp = [];
                    slide_count = slide_count + 1;
                    count = 0;
                    
                }

                slideTemp = [];
                count = 0;
                slide_count = 1;
                //****************************************************************************************************************
                ///Get Songs*****************************************************************************************************
                //****************************************************************************************************************
                angular.forEach(response.data.Songs, function (value) {

                    try {

                        //  $log.debug(value);
                        count = count + 1;
                        var album_info = JSON.parse(value.album_info);
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Id: value.id, Album_Id: value.album_id, Name: value.title, Options: getSongOptions(), ImageURL: album_info.album_cover_photo.replace("app.assets", glb_sureal_url + "/app.assets") });

                    }
                    catch (e) { }

                    //Set pushed to final data to false to ensure we catch all data.


                    if (count == gbl_row_item_count) {
                        Songs.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
 
                    }
                }); //foreach

                //If there is less than row_item count then push to finaldata.
                if (count != 0) {
                    Songs.push({ slide_id: slide_count, slide: slideTemp });
                    slideTemp = [];
                    slide_count = slide_count + 1;
                    count = 0;
      
                }



                slideTemp = [];
                count = 0;
                slide_count = 1;

                //****************************************************************************************************************
                ///Get Events*****************************************************************************************************
                //****************************************************************************************************************
                angular.forEach(response.data.Events, function (value) {

                    try {

                        //  $log.debug(value);
                        count = count + 1;
     
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Id: value.id, Name: value.name, Options: getEventOptions(), ImageURL: value.event_image.replace("app.assets", glb_sureal_url + "/app.assets") });

                    }
                    catch (e) { }

                    //Set pushed to final data to false to ensure we catch all data.
     

                    if (count == gbl_row_item_count) {
                        Events.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                 
                    }
                }); //foreach

                //If there is less than row_item count then push to finaldata.
                if (count != 0) {
                    Events.push({ slide_id: slide_count, slide: slideTemp });
                    slideTemp = [];
                    slide_count = slide_count + 1;
                    count = 0;
                 
                }

                slideTemp = [];
                count = 0;
                slide_count = 1;

                //****************************************************************************************************************
                ///Get Merchandise*****************************************************************************************************
                //****************************************************************************************************************
                angular.forEach(response.data.Merchandise, function (value) {

                    try {

                        //  $log.debug(value);
                        count = count + 1;
                        var photos = JSON.parse(value.photos);

            
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Id: value.id, Name: value.name, Price: value.price, Options: getMerchOptions(), ImageURL: photos[0].path.replace("app.assets", glb_sureal_url + "/app.assets") });

                    }
                    catch (e) { }

                    //Set pushed to final data to false to ensure we catch all data.
              

                    if (count == gbl_row_item_count) {
                        Merchandise.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                    
                    }
                }); //foreach

                //If there is less than row_item count then push to finaldata.
                if (count != 0) {
                    Merchandise.push({ slide_id: slide_count, slide: slideTemp });
                    slideTemp = [];
                    slide_count = slide_count + 1;
                    count = 0;
          
                }


                finaldata.push(Artist);
                finaldata.push(Bands);
                finaldata.push(Albums );
                finaldata.push(Songs);
             
                finaldata.push(Events);

                finaldata.push(Merchandise );
             
           



            }
            else {
                $log.debug("getDownloadedAlbumsForCurrentUser: Building list");

                angular.forEach(response.data.albums, function (value) {
                    try {
                        var albumInfo = JSON.parse(value.album_info);

                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        finaldata.push({ Artist: 'The Ramones', Name: value.name, Options: getAlbumOptions(), ImageURL: albumInfo.album_cover_photo.replace("app.assets", glb_sureal_url + "/app.assets") });
                    }
                    catch (e) { $log.debug("getDownloadedAlbumsForCurrentUser Error:" + e.message); }


                });//foreach

            }

            $log.debug("getDownloadedAlbumsForCurrentUser:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            $log.debug("SurealAPI - getFavoriteAlbumsForCurrentUser Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }
    ///**********************************************************************************************************************
    ///******************************************Get favorite albums for the current user*****************************************
    ///**********************************************************************************************************************
    var getDownloadedAlbumsForCurrentUser = function (authData, asSlides) {

        // auth_uid: "",
        // auth_token: "",
        // account_user_id: ""
        $log.debug("Getting Downloaded Albums for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/GetDownloadedAlbums";
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
            var pushedToFinalData = false;

          

            if (asSlides == true) {
                angular.forEach(response.data.albums, function (value) {
             
                    try {
                        var albumInfo = JSON.parse(value.album_info);
          
                        //  $log.debug(value);
                        count = count + 1;
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({Id:value.id, Artist: 'The Ramones', Name: value.name, Options: getAlbumOptions(), ImageURL: albumInfo.album_cover_photo.replace("app.assets", glb_sureal_url + "/app.assets") });
                     
                    }
                    catch (e) { }

                    //Set pushed to final data to false to ensure we catch all data.
                    pushedToFinalData == false

                    if (count == gbl_row_item_count) {
                        finaldata.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                        pushedToFinalData = true;
                    }
                }); //foreach

                //If there is less than row_item count then push to finaldata.
                if (pushedToFinalData == false)
                {
                    finaldata.push({ slide_id: slide_count, slide: slideTemp });
                    slideTemp = [];
                    slide_count = slide_count + 1;
                    count = 0;
                    pushedToFinalData = true;
                }
            }
            else {
                $log.debug("getDownloadedAlbumsForCurrentUser: Building list");

                angular.forEach(response.data.albums, function (value) {
                    try {
                        var albumInfo = JSON.parse(value.album_info);

                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        finaldata.push({ Artist: 'The Ramones', Name: value.name, Options: getAlbumOptions(), ImageURL: albumInfo.album_cover_photo.replace("app.assets", glb_sureal_url + "/app.assets") });
                    }
                    catch (e) { $log.debug("getDownloadedAlbumsForCurrentUser Error:" + e.message); }


                });//foreach

            }

            $log.debug("getDownloadedAlbumsForCurrentUser:Success");
            d.resolve(finaldata);
           

        }).error(function (error) {
            $log.debug("SurealAPI - getFavoriteAlbumsForCurrentUser Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }

    ///**********************************************************************************************************************
    ///******************************************Get favorite albums for the current user*****************************************
    ///**********************************************************************************************************************
    var getFavoriteAlbumsForCurrentUser = function (authData, asSlides) {

        // auth_uid: "",
        // auth_token: "",
        // account_user_id: ""
        $log.debug("Getting Favorite Albums for:" + authData.account_user_id)
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
                        //  $log.debug(value);
                        count = count + 1;
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Artist: 'The Ramones', Name: value.name, Options: getAlbumOptions(), ImageURL: albumInfo.album_cover_photo.replace("app.assets", glb_sureal_url + "/app.assets") });
                    }
                    catch (e) { }

                    if (count == gbl_row_item_count) {
                        finaldata.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                    }
                }); //foreach
            }
            else {
                $log.debug("getFavoriteAlbumsForCurrentUser: Building list");

                angular.forEach(response.data.albums, function (value) {
                    try {
                        var albumInfo = JSON.parse(value.album_info);
     
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        finaldata.push({ Artist: 'The Ramones', Name: value.name, Options: getAlbumOptions(), ImageURL: albumInfo.album_cover_photo.replace("app.assets", glb_sureal_url + "/app.assets") });
                    }
                    catch (e) { $log.debug("getFavoriteAlbumsForCurrentUser Error:" + e.message); }


                });//foreach

            }

            $log.debug("getFavoriteAlbumsForCurrentUser:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            $log.debug("SurealAPI - getFavoriteAlbumsForCurrentUser Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }


    ///**********************************************************************************************************************
    ///******************************************Get favorite albums for the current user*****************************************
    ///**********************************************************************************************************************
    var getFavoritePlaylistsForCurrentUser = function (authData, asSlides) {

        // auth_uid: "",
        // auth_token: "",
        // account_user_id: ""
        $log.debug("Getting Favorite Playlists for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/GetFavoritePlaylist";
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

            $log.debug(JSON.stringify(response));
            var count = 0;
            var slide_count = 1;
            var slideTemp = [];
            var finaldata = [];

            if (asSlides == true) {
                angular.forEach(response.data, function (value) {
                    try {

                        //  $log.debug(value);
                        count = count + 1;
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Artist: 'The Ramones', Name: value.name, Options: getPlaylistOptions(), ImageURL: value.playlist_info.album_cover_photo.replace("app.assets", glb_sureal_url + "/app.assets"), Id: value.id });
                    }
                    catch (e) { }

                    if (count == gbl_row_item_count) {
                        finaldata.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                    }
                }); //foreach

                if (count !=0) {
                    finaldata.push({ slide_id: slide_count, slide: slideTemp });
                    slideTemp = [];
                    slide_count = slide_count + 1;
                    count = 0;
                }
            }
            else {
                $log.debug("getFavoritePlaylistForCurrentUser: Building list");

                angular.forEach(response.data.albums, function (value) {
                    try {
                        var playlist_info = JSON.parse(value.playlist_info);
                        finaldata.push({ Artist: 'The Ramones', Name: value.name, Options: getPlaylistOptions(), ImageURL: playlist_info.album_cover_photo.replace("app.assets", glb_sureal_url + "/app.assets"), Id: value.id });
                    }
                    catch (e) { $log.debug("getFavoritePlaylistForCurrentUser Error:" + e.message); }


                });//foreach

            }

            $log.debug("getFavoritePlaylistForCurrentUser:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            $log.debug("SurealAPI - getFavoriteAlbumsForCurrentUser Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }


    ///**********************************************************************************************************************
    ///******************************************Get album song list              *****************************************
    ///**********************************************************************************************************************
    ///Function to get new albums
    var getNewAlbumSongs = function (album_id)
    {
        var finaldata = [];

        angular.forEach(gbl_album_songs, function (value) {
            try {
                if (value.album_id == album_id) {
                    finaldata.push(value);
                }
            }
            catch (e) { }


        });//foreach

        return finaldata;
    }

    ///**********************************************************************************************************************
    ///******************************************Get new albums for the current user*****************************************
    ///**********************************************************************************************************************

    var getNewAlbumsForCurrentUser = function (authData, asSlides) {
  
       // auth_uid: "",
       // auth_token: "",
        // account_user_id: ""
        $log.debug("Getting Albums for:" + authData.account_user_id)
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

            //set the album song list
            gbl_album_songs = response.data.album_songs;
   
            if (asSlides == true) {
                angular.forEach(response.data.album, function (value) {

                    try {
                        var albumInfo = JSON.parse(value.album_info);
               
                        //  $log.debug(value);
                        count = count + 1;
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Artist: 'The Ramones', Name: value.name, Options: getAlbumOptions(), ImageURL: albumInfo.album_cover_photo.replace("app.assets", glb_sureal_url + "/app.assets"), Id: value.id });
                    }
                    catch (e) { }

                    if (count == gbl_row_item_count) {
                        finaldata.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                    }
                }); //foreach

                //If there is less than row_item count then push to finaldata.
                if (count != 0) {
                    finaldata.push({ slide_id: slide_count, slide: slideTemp });
                    slideTemp = [];
                    slide_count = slide_count + 1;
                    count = 0;

                }
            }
            else
            {
                finaldata = response;
               
            }
           

            $log.debug("GetnewAlbums:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            $log.debug("SurealAPI - getNewAlbumsForCurrentUser Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }


    //******************************************************************************************************\
    //**********************************Recently Played Albums *********************************************\
    //******************************************************************************************************\
    var getRecentlyPlayedAlbums = function (authData, asSlides) {

        // auth_uid: "",
        // auth_token: "",
        // account_user_id: ""
        $log.debug("Getting getRecentlyPlayedAlbums for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/GetRecentlyPlayedAlbums";
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

            //set the album song list
            gbl_album_songs = response.data.album_songs;

            if (asSlides == true) {
                angular.forEach(response.data.album, function (value) {

                    try {
                        var albumInfo = JSON.parse(value.album_info);

                        //  $log.debug(value);
                        count = count + 1;
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Artist: 'The Ramones', Name: value.name, Options: getAlbumOptions(), ImageURL: albumInfo.album_cover_photo.replace("app.assets", glb_sureal_url + "/app.assets"), Id: value.id });
                    }
                    catch (e) { }

                    if (count == gbl_row_item_count) {
                        finaldata.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                    }
                }); //foreach

                //If there is less than row_item count then push to finaldata.
                if (count != 0) {
                    finaldata.push({ slide_id: slide_count, slide: slideTemp });
                    slideTemp = [];
                    slide_count = slide_count + 1;
                    count = 0;

                }
            }
            else {
                finaldata = response;

            }


            $log.debug("getRecentlyPlayedAlbums:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            $log.debug("SurealAPI - getRecentlyPlayedAlbums Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }



    //**********************************PENDING**************************************\
    //**********************************PENDING**************************************\
    //**********************************PENDING**************************************\
    var getAlbumDetails = function (authData, album_id, asSlides) {

        // auth_uid: "",
        // auth_token: "",
        // account_user_id: ""
        $log.debug("Getting Albums for:" + authData.account_user_id)
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
                "albumId": album_id
                }

        };
       

        $http(req).success(function (data) {

            response = JSON.parse(data);

            var count = 0;
            var slide_count = 1;
            var photos = [];
            var finaldata = [];
            var artistProfile = [];
            var profilePhotos = [];

            //build comprehensive json reponse into data object
            if (asSlides == true) {
                $log.debug("getAlbumDetails: Building Slides");
                finaldata = response;
            }
            else {
                $log.debug("getAlbumDetails: Building Lists");


                    try {

                        photos = [];
                        profilePhotos = [];
                        artistProfile = [];
                        albumPrice = [];
                        rawbioPhotos = [];
                        bioPhoto = [];

                        albumPrice = response.data.album_price;
                        

                        angular.forEach(response.data.album_artist, function (value) {

                            try {

                                artistProfile = JSON.parse(value.private_profile_json);
                                profilePhotos = artistProfile.profile_photo;
                                rawbioPhotos = artistProfile.bio_photo;
                            }
                            catch (e) {
                                $log.debug("Error (2) in getAlbumDetails:" + e.message)
                            }

                            try {
                                ///Get the photos
                                angular.forEach(profilePhotos, function (profilePhoto) {

                                    photos.push({
                                        Id: profilePhoto.id,
                                        ImageURL: profilePhoto.photo.replace("app.assets", glb_sureal_url + "/app.assets"),
                                        Select: profilePhoto.selected
                                    });

                                });
                            }
                            catch (e) {
                                $log.debug("Error (3) in getAlbumDetails:" + e.message);
                            }

                            try {
                                ///Get the photos
                                angular.forEach(rawbioPhotos, function (rawbioPhoto) {

                                    bioPhoto.push({
                                        Id: rawbioPhoto.id,
                                        ImageURL: rawbioPhoto.photo.replace("app.assets", glb_sureal_url + "/app.assets"),
                                        Select: rawbioPhoto.selected
                                    });

                                });
                            }
                            catch (e) {
                                $log.debug("Error (3a) in getAlbumDetails:" + e.message);
                            }


                            try {
                                finaldata.push({
                                    Id: artistProfile.account_id,
                                    Name: artistProfile.name,
                                    Options: getArtistOptions(),
                                    Gender: artistProfile.gender,
                                    DOB: artistProfile.dob,
                                    TagLine: artistProfile.tagline,
                                    Location: artistProfile.location,
                                    CoverPhoto: artistProfile.cover_photo,
                                    Facebook: artistProfile.fb_link,
                                    Twitter: artistProfile.twitter_link,
                                    Google: artistProfile.googleplus_link,
                                    Microsoft: artistProfile.microsoft_link,
                                    About: artistProfile.aboutyou,
                                    ArtistPhotos: photos,
                                    AlbumPrice: albumPrice,
                                    BioPhoto: bioPhoto
                                });
                            }
                            catch (e) {
                                $log.debug("Error (4) in getAlbumDetails:" + e.message);
                            }
                        });

                    }
                    catch (e) { $log.debug("Error (5) in getAlbumDetails:" + e.message); }
            }

            $log.debug("getAlbumDetails:Success");
    
            d.resolve(finaldata);



        }).error(function (error) {
            $log.debug("SurealAPI - getAlbumDetails Error:" + JSON.stringify(error));
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
        $log.debug("Getting Events for:" + authData.account_user_id)
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
            // $log.debug("GetnewAlbums:" + JSON.stringify(data));
            //Build out data for events
            response = JSON.parse(data);
            var count = 0;
            var slide_count = 1;
            var slideTemp = [];
            var finaldata = [];

            //build comprehensive json reponse into data object
            if (asSlides == true) {
                $log.debug("getEventsAllEvents: Building Slides");
                angular.forEach(response.data.all_events, function (value) {
                    try {

                        //  $log.debug(value);
                        count = count + 1;
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Artist: 'The Ramones', Name: value.event.name, Options: getEventOptions(), ImageURL: value.event.event_image.replace("app.assets", glb_sureal_url + "/app.assets"), Id: value.event.id });
                    }
                    catch (e) { }

                    if (count == gbl_row_item_count) {
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

            $log.debug("getEvents:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            $log.debug("SurealAPI - getAllEventsForCurrentUser Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }


    //******************************************************************************************************************
    //***********************************************event by current event id user************************************
    //******************************************************************************************************************
    var getEventByID = function (authData, event_id, asSlides) {

        // auth_uid: "",
        // auth_token: "",
        // account_user_id: "
        $log.debug("Getting Event By ID for:" + authData.account_user_id)
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/GetEventDetails";
        var req = {
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'auth_uid': authData.auth_uid,
                'auth_token': authData.auth_token
            },
            data: { "event_id": event_id }

        };

        $http(req).success(function (data) {
            // $log.debug("GetnewAlbums:" + JSON.stringify(data));
            //Build out data for events
            response = JSON.parse(data);
     
            var count = 0;
            var slide_count = 1;
            var Artists = [];
            var  photos = [];
            var finaldata = [];
            var artistProfile = [];
            var profilePhotos = [];
            var rawbioPhotos = [];
            var bioPhoto = [];

            //build comprehensive json reponse into data object
            if (asSlides == true) {
                $log.debug("getEventByID: Building Slides");
                finaldata =  response;
            }
            else {
                $log.debug("getEventByID: Building Lists");
                angular.forEach(response.data.events, function (value) {
                    try {
                       
                        var eventArtist = response.data.event_artists;
                       

                        //Get the artists
                        angular.forEach(eventArtist, function (artist) {


                            photos = [];
                            profilePhotos = [];
                            artistProfile = [];
                            rawbioPhotos = [];
                            bioPhoto = [];

                            try {
                                artistProfile = JSON.parse(artist.private_profile_json);
                                profilePhotos = artistProfile.profile_photo;
                                rawbioPhotos = artistProfile.bio_photo;
                              
                            }
                            catch (e) { $log.debug("Error (2) in getEventByID:" + e.message) }

                     //       $log.debug("artistProfile:" + JSON.stringify(artistProfile));
                     //       $log.debug("artistPhoto:" + JSON.stringify(profilePhotos));

                            ///Get the photos
                            angular.forEach(profilePhotos, function (profilePhoto) {
                     
                                photos.push({
                                    Id: profilePhoto.id,
                                    ImageURL: profilePhoto.photo,
                                    Select: profilePhoto.selected
                                });

                            });

                            try {
                                ///Get the photos
                                angular.forEach(rawbioPhotos, function (rawbioPhoto) {

                                    bioPhoto.push({
                                        Id: rawbioPhoto.id,
                                        ImageURL: rawbioPhoto.photo.replace("app.assets", glb_sureal_url + "/app.assets"),
                                        Select: rawbioPhoto.selected
                                    });

                                });
                            }
                            catch (e) {
                                $log.debug("Error (3) in getAlbumDetails:" + e.message);
                            }

                    
                            ///Built the artists
                            Artists.push({
                                Id: artist.artist_id,
                                Options: getArtistOptions(),
                                Name: artistProfile.name,
                                Gender: artistProfile.gender,
                                DOB: artistProfile.dob,
                                TagLine: artistProfile.tagline,
                                Location: artistProfile.location,
                                CoverPhoto: artistProfile.cover_photo.replace("app.assets", glb_sureal_url + "/app.assets"),
                                Facebook: artistProfile.fb_link,
                                Twitter: artistProfile.twitter_link,
                                Google: artistProfile.googleplus_link,
                                Microsoft: artistProfile.microsoft_link,
                                About: artistProfile.aboutyou,
                                ArtistPhotos: photos,
                                BioPhoto: bioPhoto
                            })
                        });

                   
                
                        finaldata.push({
                            Name: value.name,
                            ImageURL: value.event_image.replace("app.assets", glb_sureal_url + "/app.assets"),
                            Id: value.id,
                            Details: value.details,
                            Venue: value.venue,
                            Date: value.on_date,
                            Time: value.on_time,
                            TicketCost: value.ticket_cost,
                            TicketURL: value.ticket_url,
                            Artists: Artists
                        });
                  

                    }
                    catch (e) { $log.debug("Error (3) in getEventByID:" + e.message);}

                }); //foreach
            }

            $log.debug("getEventByID:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            $log.debug("SurealAPI - getEventByID Error:" + JSON.stringify(error));
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
        $log.debug("Getting Playlists for:" + authData.account_user_id)
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
            // $log.debug("GetnewAlbums:" + JSON.stringify(data));
            //Build out data for events
  
            response = JSON.parse(data);
            var count = 0;
            var slide_count = 1;
            var slideTemp = [];
            var finaldata = [];

    
            //build comprehensive json reponse into data object
            if (asSlides == true) {
                $log.debug("getPlaylistForCurrentUser: Building Slides");
                angular.forEach(response.data, function (value) {
                    try {
                   
                        //  $log.debug(value);
                        count = count + 1;
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Artist: 'The Ramones', Name: value.name, Options: getPlaylistOptions(), ImageURL: value.playlist_info.album_cover_photo.replace("app.assets", glb_sureal_url + "/app.assets"), Id: value.id });
                    }
                    catch (e) { }

                    if (count == gbl_row_item_count) {
                        finaldata.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                    }
                }); //foreach

                //If there is less than row_item count then push to finaldata.
                if (count != 0) {
                    finaldata.push({ slide_id: slide_count, slide: slideTemp });
                    slideTemp = [];
                    slide_count = slide_count + 1;
                    count = 0;

                }
            
            }
            else {
                $log.debug("getPlayListsForCurrentUser: Building list");

                angular.forEach(response.data.playlist, function (value) {
                    try {
                        var playlist_info = JSON.parse(value.playlist_info);
                        finaldata.push({ Artist: 'The Ramones', Name: value.name, Options: getPlaylistOptions(), ImageURL: playlist_info.album_cover_photo.replace("app.assets", glb_sureal_url + "/app.assets"), Id: value.id });
                    }
                    catch (e) { $log.debug("getPlayListsForCurrentUser Error:" + e.message); }


                });//foreach
            }
          
            $log.debug("getPlaylistsForCurrentUser:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            $log.debug("SurealAPI - getPlaylistsForCurrentUser Error:" + JSON.stringify(error));
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
        $log.debug("Getting Playlists for:" + authData.account_user_id)
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
            // $log.debug("GetnewAlbums:" + JSON.stringify(data));
            //Build out data for events
            
            response = JSON.parse(data);


            var count = 0;
            var slide_count = 1;
            var slideTemp = [];
            var finaldata = [];

            //build comprehensive json reponse into data object
            if (asSlides == true) {
                $log.debug("getNewPlayListsForCurrentUser: Building Slides");
                angular.forEach(response.data.playlist, function (value) {
                    try {

                        //  $log.debug(value);
                        var playlist_info = JSON.parse(value.playlist_info);
                        count = count + 1;
                        //Can Buy, Can DownLoad, Can Play (means stream or local), Can Favorites, Can Share, Can follow, Can ratings
                        slideTemp.push({ Artist: 'The Ramones', Name: value.name, Options: getPlaylistOptions(), ImageURL: playlist_info.album_cover_photo.replace("app.assets", glb_sureal_url + "/app.assets"), Id: value.id });
                    }
                    catch (e) { }

                    if (count == gbl_row_item_count) {
                        finaldata.push({ slide_id: slide_count, slide: slideTemp });
                        slideTemp = [];
                        slide_count = slide_count + 1;
                        count = 0;
                    }
                }); //foreach

                //If there is less than row_item count then push to finaldata.
                if (count != 0) {
                    finaldata.push({ slide_id: slide_count, slide: slideTemp });
                    slideTemp = [];
                    slide_count = slide_count + 1;
                    count = 0;

                }
            }
            else {
                $log.debug("getNewPlayListsForCurrentUser: Building list");
   
                angular.forEach(response.data.playlist, function (value) {
                    try {
                        var playlist_info = JSON.parse(value.playlist_info);
                        finaldata.push({ Artist: 'The Ramones', Name: value.name, Options: getPlaylistOptions(), ImageURL: playlist_info.album_cover_photo.replace("app.assets", glb_sureal_url + "/app.assets"), Id: value.id });
                    }
                    catch (e) { $log.debug("getNewPlayListsForCurrentUser Error:" + e.message); }


                    });//foreach
              }


            $log.debug("getPlaylistsForCurrentUser:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            $log.debug("SurealAPI - getPlaylistsForCurrentUser Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }

    var getPlaylistDetails = function (authData, resource_id) {

        // auth_uid: "",
        // auth_token: "",
        // account_user_id: "
        $log.debug("Getting Playlist "+ resource_id+ " with details for:" + authData.account_user_id )
        //**********************************SIGNIN FUNCTION **************************************\
        var d = $q.defer();

        var URL = "http://surealmusicwebapi.azurewebsites.net" + "/api/getPlaylistDetails";
        var req = {
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'auth_uid': authData.auth_uid,
                'auth_token': authData.auth_token
            },
            data: {
                playlist: {
                    "id": resource_id
                },
                "accountId": authData.account_user_id
            }
        };


        $http(req).success(function (data) {
            // $log.debug("GetnewAlbums:" + JSON.stringify(data));
            //Build out data for events

            response = JSON.parse(data);

          
            var count = 0;
            var slide_count = 1;
            var slideTemp = [];
            var finaldata = [];

            //build comprehensive json reponse into data object 
           
                $log.debug("getPlaylistDetails: Building list");


                var playlist_details = response.data.playlist_details;
                var playlist_info = JSON.parse(playlist_details.playlist_info);
                var playlist_image = playlist_info.album_cover_photo;
                var playlist_about = playlist_info.about;
                var playlist_name = playlist_details.name;
                var playlist_id = playlist_details.id;
                var counter = 1;
                

                angular.forEach(response.data.song, function (value) {
                    try {

                        var song_data = value.song;
                        var song_id =  JSON.stringify(song_data.id);
                        var song_info = JSON.parse(song_data.song_info);
                        var URL ="https://smmediaservicestorage.blob.core.windows.net:443/asset-8e79235e-2127-4774-990d-cf542340136c/07%20Habenera.mp3?sv=2012-02-12&sr=c&si=4cf71c75-fe50-4b7c-b7ff-07d4e5ef0eae&sig=MaPJyRG3j9X4phG5Agk4MuJ%2BreCAo4ZojWy7pw1cUlQ%3D&se=2017-04-04T08%3A57%3A02Z";
                   
                        finaldata.push({ PlaylistImage: playlist_image, PlaylistName: playlist_name, PlayListId: playlist_id, PlayListAbout: playlist_about, song_id: song_id, Duration: song_info.duration, Name: song_data.title, Artist: 'The Ramones', link: URL, Index: counter});
                        counter++;
                    }
                    catch (e) { $log.debug("getPlaylistDetails Error:" + e.message); }
               

                });//foreach
            $log.debug("getPlaylistDetails:Success");
            d.resolve(finaldata);


        }).error(function (error) {
            $log.debug("SurealAPI - getPlaylistDetails Error:" + JSON.stringify(error));
            d.reject(error);
        });

        return d.promise;
    }


    //Buy, Download, Play, Favorites, Share, Follow, Join, View,
    function getExplorerOptions() {
        return "0,0,0,1,1,0,0,1";
    }

      function getSliderOptions() {
          return "1,1,1,1,1,0,0,0";
    }
  
      function getAlbumOptions() {
          return "1,1,1,1,1,0,0,0";
      }

      function getSongOptions() {
          return "1,1,1,1,1,0,0,0";
      }

      function getArtistOptions() {
          return "0,0,0,1,1,1,0,1";
      }

      function getPlaylistOptions() {
          return "0,1,1,1,1,0,0,0";
      }


      function getEventOptions() {
          return "0,0,0,0,1,0,1,1";
      }


      function getMerchOptions() {
          return "1,0,0,1,1,1,0,1";
      }


      
    return {
        Login: Login,
        getNewAlbumsForCurrentUser: getNewAlbumsForCurrentUser,
        getEventsAllEvents: getEventsAllEvents,
        getPlayListsForCurrentUser: getPlayListsForCurrentUser,
        getNewPlayListsForCurrentUser: getNewPlayListsForCurrentUser,
        getPlaylistDetails:getPlaylistDetails,
        getFavoriteAlbumsForCurrentUser: getFavoriteAlbumsForCurrentUser,
        getFavoritePlaylistsForCurrentUser: getFavoritePlaylistsForCurrentUser,
        getDownloadedAlbumsForCurrentUser: getDownloadedAlbumsForCurrentUser,
        getPurchasedAlbumsForCurrentUser: getPurchasedAlbumsForCurrentUser,
        getAlbumDetails, getAlbumDetails,
        getNewAlbumSongs: getNewAlbumSongs,
        getSearch: getSearch,
        getArtistByID: getArtistByID,
        getEventByID:getEventByID,
        getAlbumOptions :getAlbumOptions ,
        getExplorerOptions: getExplorerOptions,
        getSliderOptions: getSliderOptions,
        getPlaylistOptions: getPlaylistOptions,
        getSongOptions: getSongOptions,
        getEventOptions: getEventOptions,
        getArtistOptions: getArtistOptions,

        getDashboard:getDashboard,
        getDashboardTrendingSongDetails: getDashboardTrendingSongDetails,
        getDashboardTrendingMerchandiseDetails: getDashboardTrendingMerchandiseDetails,
        getDashboardTrendingEntrepreneurDetails: getDashboardTrendingEntrepreneurDetails,


        IsJsonString: IsJsonString,
        getItemCount: getItemCount,
        getItemCol: getItemCol,
        getSurealURL: getSurealURL,

        setFavoritePlaylist:setFavoritePlaylist,
        setFavoriteAlbum: setFavoriteAlbum,
        setJoinEvent: setJoinEvent,
        setSongPlayedDetails:setSongPlayedDetails,
        setAlbumPlayedDetails: setAlbumPlayedDetails,
        setPlaylistPlayedDetails: setPlaylistPlayedDetails,

        getRecentlyPlayedAlbums: getRecentlyPlayedAlbums
    };
})