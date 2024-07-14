angular.module('surealMusic.musicPlayer', [])
    
//Sureal Music Services
.factory('surealMusicServices', function ($q, $interval, $location,$log, $http, $timeout,$rootScope,$ionicPlatform,manageSessionService, surealServices)
{


        var pauseImage = "img/pause@2x.png";
        var playImage = "img/play@2x.png";
        var maxTime = 0;
        var rotatetrack = false;
        var currentTime = 0;
        
        var current = 0;
        var max = 0;
        var Timer = null;
        var myMedia = null;
        var streamLoaded = false;
        var streamIsLoading = false;

        var gbl_currentSong = [];
        var gbl_currentSongList = [];
        var gbl_event = [];
        var gbl_artist = [];
        var gbl_artist_id;
        var gbl_event_updated = false;
        var gbl_songData_loaded = false;
        var gbl_artist_updated = false;
        var gbl_isPlayingStream = false;
        var gbl_playStateImage = playImage;
        
        var gbl_albumDetails = [];
        var gbl_albumDetails_updated = false;

        function IsJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                $log.debug("IsJsonString:" + e.message)
                return false;
            }
            return true;
        }

        var getMediaDuration = function () {
            return maxTime;
        }

        var getRotateTrack = function () {
            return rotatetrack;
        }

        var getPlayStateImage = function () {

            return gbl_playStateImage;
        }

        var getCurrentTime = function ()
        {
            return currentTime;
        }

        var getIsStreamPlaying = function ()
        {
           return gbl_isPlayingStream 
        }
       

        var getStreamLoaded= function ()
        {
            return streamLoaded;
        }
        
        var getStreamIsLoading = function()
        {
            return streamIsLoading;

        }

        var getCurrentSongList = function () {
            return gbl_currentSongList;

        }

        var getCurrentEvent = function () {

            return gbl_event;

        }
        
        var getCurrentArtist = function () {

            return gbl_artist;

        }

        var getCurrentArtistId = function () {

            return gbl_artist_id;

        }



        var getCurrentEventUpdated = function () {

            return gbl_event_updated;

        }

        var getCurrentArtistUpdated = function () {

            return gbl_artist_updated;

        }


        var setCurrentEventUpdated = function (value) {

            gbl_event_updated = value;

        }

        var setCurrentArtistUpdated = function (value) {

            gbl_artist_updated = value;

        }

        var getSongDataLoaded = function (value) {
            return gbl_songData_loaded;

        }

    ///**********************************************************************************************************************
    ///******************************************Get current song list              *****************************************
    ///**********************************************************************************************************************

        var getCurrentAlbumDetails = function (value)
        {
            return gbl_albumDetails;
        }




        //Get the songs for a specific album by resource id
        var getAlbumSongsList = function (album_data)
        {
            var currentAlbumSongs = [];
            var stream_url = "";
            var counter = 1;

            var songs = album_data;
   

            angular.forEach(songs, function (value) {
                var song_info = JSON.parse(value.s.song_info);
          
                currentAlbumSongs.push({
                    ResourceId: value.album_id,
                    Id: value.song_id,
                    ImageURL: "song",
                    Name: value.s.title,
                    Duration: song_info.duration,
                    SongURL: value.link,
                    StateImage: "img/play@2x.png",
                    Index: counter,
                    Listtype: "album"
                });
                counter++;
            });
         

            return currentAlbumSongs;
        }



    //Get the songs for a specific album by resource id
        var getPlayListSongList = function (album_data) {

            var stream_url = "";
            var currentPlayListSongs = [];
            var stream_url = "";
            var count = 0;

            var songs = album_data;

            //play first song by default as the user clicked on an album

            angular.forEach(songs, function (value) {
                count++;
            
                currentPlayListSongs.push({
                    PlaylistImage: value.PlaylistImage, PlaylistName: value.PlaylistName,
                    ResourceId: value.PlayListId, PlayListAbout: value.PlayListAbout,
                    Id: value.song_id,
                    ImageURL: "song",
                    Duration: value.Duration,
                    Name: value.Name,
                    Artist: 'The Ramones',
                    StateImage: "img/play@2x.png",
                    SongURL: value.link,
                    Index: value.Index,
                    Listtype: "playlist"
                });
               
            });

            return currentPlayListSongs;
        }


        //Get the songs for a specific album by resource id
        var getAlbumSongByID = function (album_data, song_id) {

            var stream_url = "";
            var currentAlbumSong = [];
            var stream_url = "";
            
            var songs = album_data;
            //play first song by default as the user clicked on an album

            angular.forEach(songs, function (value) {
                if (value.song_id == song_id) {
                    var song_info = JSON.parse(value.s.song_info);
                    currentAlbumSong.push({ Id: value.song_id, Title: value.s.title, Duration: song_info.duration, SongURL: value.link });
                }
            });
           

            return currentAlbumSong;
        }


        //Get the songs for a specific album by resource id
        var getAlbumSongByIndex = function (album_data, index, source) {

            var stream_url = "";
            var currentAlbumSong = [];
            var stream_url = "";
            var count = 0;
            
            var songs = album_data;

            //play first song by default as the user clicked on an album
            if (source == "raw") {
                angular.forEach(songs, function (value) {
                    count++;
                    if (count == index) {
                        var song_info = JSON.parse(value.s.song_info);

                        currentAlbumSong.push({
                            ResourceId: value.album_id,
                            Id: value.song_id,
                            Title: value.s.title,
                            Duration: song_info.duration,
                            SongURL: value.link,
                            Index: index,
                            Listtype: "album"

                        });
                    }
                });
            }


            //Use the current global playlist
            if (source == "gbl") {
                angular.forEach(gbl_currentSongList, function (value) {

                    count++;
                    if (count == index) {
          
                        currentAlbumSong.push({
                            ResourceId: value.ResourceId,
                            Id: value.Id,
                            Title: value.Name,
                            Duration: value.Duration,
                            SongURL: value.SongURL,
                            Index: index,
                            Listtype: "album"
                        });
                    }

                });

            }
            
            return currentAlbumSong;
        }


    //Get the songs for a specific album by resource id
        var getPlayListSongByIndex = function (album_data, index, source) {

            var stream_url = "";
            var currentPlayListSong = [];
            var stream_url = "";
            var count = 0;

            //User raw data to generate the song
            if (source == "raw") {
                var songs = album_data;

                //play first song by default as the user clicked on an album

                angular.forEach(songs, function (value) {
                    count++;
                    if (count == index) {

                        currentPlayListSong.push({
                            PlaylistImage: value.PlaylistImage, PlaylistName: value.PlaylistName, ResourceId: value.PlayListId,
                            PlayListAbout: value.PlayListAbout, Id: value.song_id, Duration: value.Duration,
                            Title: value.Name, Artist: 'The Ramones', SongURL: value.link, Index: index,
                            Listtype: "playlist"
                        });
                    }
                });

            }

            //Use the current global playlist
            if (source == "gbl") {

                angular.forEach(gbl_currentSongList, function (value) {

                    count++;
                    if (count == index) {
                      
                 
                        currentPlayListSong.push({
                            PlaylistImage: value.PlaylistImage, PlaylistName: value.PlaylistName, ResourceId: value.ResourceId,
                            PlayListAbout: value.PlayListAbout, Id: value.Id, Duration: value.Duration,
                            Title: value.Name, Artist: 'The Ramones', SongURL: value.SongURL, Index: index,
                            Listtype: "playlist"
                        });
                    }

                });
                
            }

            return currentPlayListSong;
        }



        var getCurrentAlbum = function()
        {
            return gbl_currentSongList;

        }

        var getCurrentSong = function () {

            localStorage.setItem("currentSong", JSON.stringify(gbl_currentSong));
            return gbl_currentSong;

        }
        //set stream loaded
        var setStreamLoaded = function (lstate) {

            streamLoaded = lstate;
        }

     

        //Calculate time
        var cTime = function(input) {

            function z(n) { return (n < 10 ? '0' : '') + n; }
            var seconds = input % 60;
            var minutes = Math.floor(input % 3600 / 60);
            var hours = Math.floor(input / 3600);
            if (hours == 0) {
                return (z(minutes) + ':' + z(Math.floor(seconds)));
            }
            else {
                return (z(hours) + ':' + z((minutes)) + ':' + z(Math.floor(seconds)));
            }
        }


    //Calculate time
        var cSeconds = function (input) {
            var totaltime = input.split(":");
           
            if (totaltime.length == 3)
            {
                $log.debug(totaltime[0] + "---" + totaltime[1] + "--" + totaltime[2]);
                var hours = totaltime[0] * 3600;
                var minutes = totaltime[1] * 60;
                var seconds = totaltime[2];
             
                return parseInt(hours) + parseInt(minutes) + parseInt(seconds);
            }
            else
            {
                var minutes = totaltime[0] * 60;
                var seconds = totaltime[1];
                return parseInt(minutes) + parseInt(seconds);
            }

           
        }

        //*************************************TIMER METHODS*****************************************
            var getPadded = function (val) {
                return val < 10 ? ('0' + val) : val;
            }

            //Initiate the Timer object.
            Timer = null;
       

            var startTimer = function () {
                //Initialize the Timer to run every 1000 milliseconds i.e. one second.
                Timer = $interval(function () {
                    //var date = new Date();
                    //var hours = date.getHours();
                    //var minutes = date.getMinutes();
                    //var seconds = date.getSeconds();

                    //hours = hours;
                    //minutes = minutes;
                    //seconds = seconds;
                    //time = getPadded(hours) + ':' + getPadded(minutes) + ':' + getPadded(seconds);
                    increment();
                }, 1000);

            };

            //Increment Timer
            var increment = function (amount) {
                current = myMedia.getCurrentPosition(  // success callback
                    function (position) {
                        if (position > -1) {
                            $rootScope.$emit('timerUpdate', { currentTime: cTime(position) });
                        }
                    },
                    // error callback
                    function (e) {
                        $log.debug("Error getting pos=" + e);
                    }

                )
            };


             //Timer stop function.
            var stopTimer = function () {
                //Cancel the Timer.
                if (angular.isDefined(Timer)) {
                    $interval.cancel(Timer);
                }
                //reset to null
                Timer = null;
            };

        //*********************************TIMER FUNCTIONS END ***********************************************



       
       // play the stream
        var stopStream = function (index) {

            //Pause te song
            myMedia.stop();
            gbl_isPlayingStream = false;
            rotatetrack = false;
            gbl_playStateImage = playImage;

            //send the stop image to the app.
            $rootScope.$broadcast('songStop', { data: "stop" });
          
        }

        // play the stream
        var pauseStream = function (index) {

            //Pause te song
            myMedia.pause();
            gbl_isPlayingStream = false;
            gbl_playStateImage = playImage;
            rotatetrack = false;
            stopTimer();
            //Send the song stop to the app
            $rootScope.$broadcast('songStop', { data: "stop" });
         
        }


        // stop the str eam
        var playStream = function (index) {
            
            //  $scope.togglePlayback = !$scope.togglePlayback;
            //Make sure media is loaded FIRST!
            myMedia.play();
            startTimer();
            gbl_isPlayingStream = true;
            ///Now start timer
            gbl_songData_loaded = true;
            gbl_playStateImage = pauseImage;
            rotatetrack = true;
            //send the stong play to the app.
            $rootScope.$broadcast('songPlay', { data: "play" });
        }



        ///get the event details from api
        var getEventDetails = function (resource_id) {


            var d = $q.defer();

            var promise = surealServices.getEventByID(JSON.parse(localStorage.getItem("userAuth")) ,resource_id, false);
            promise.then(function (response) {
                gbl_event = response;
                gbl_event_updated = true;
                $rootScope.$broadcast('eventChanged', { data: "artist" });
                d.resolve(response);

            }, function (reason) {
                $log.debug("Error in load media");
                $log.debug("Controller Error:" + reason);
                d.reject(false);
            })


            return d.promise;
        }


    ///get the event details from api
        var getArtistDetails = function (resource_id) {


            var d = $q.defer();

            var promise = surealServices.getArtistByID(JSON.parse(localStorage.getItem("userAuth")), resource_id, false);
            promise.then(function (response) {
                gbl_artist = response;
                gbl_artist_id = resource_id;
                gbl_artist_updated = true;
               $rootScope.$broadcast('artistChanged', { data: "artist" });

                d.resolve(response);

            }, function (reason) {
                $log.debug("Error in load media");
                $log.debug("Controller Error:" + reason);
                d.reject(false);
            })


            return d.promise;
        }


        ///get the event details from api
        var getAblumDetails = function (resource_id) {

         
            var d = $q.defer();

            var promise = surealServices.getAlbumDetails(JSON.parse(localStorage.getItem("userAuth")), resource_id, false);
            promise.then(function (response) {
                gbl_albumDetails = response;
                gbl_albumDetails_updated = true;
                $rootScope.$broadcast('albumChanged', { data: "album" });

                d.resolve(response);

            }, function (reason) {
                $log.debug("Error in load media");
                $log.debug("Controller Error:" + reason);
                d.reject(false);
            })


            return d.promise;
        }


    //********************************************************************************************************************************
    //*********************************************************MUSIC PLAY / MANAGEMENT************************************************
    //********************************************************************************************************************************

        ///Stream The song
        function loadMediaStream(song) {

            try 
            {
                var d= $q.defer();
                //Check if file is local
                var localPath = "";
                var downloadComplete = false;

                //Set the playtimes for the previous song. This should happen on every song change and exit of the app.
                

                //set the current playing song
                gbl_currentSong = song;
                
                //check if media loaded or playing - stop if it is.
                if (myMedia != null)
                {
                    current = 0;
                    myMedia.pause();
                    stopTimer();
                }

                myMedia= null;

                try 
                {
                    $ionicPlatform.ready(function () {
                    
                        myMedia = new Media(gbl_currentSong[0].SongURL, null, null);
                        streamLoaded = true;
                        d.resolve(streamLoaded);
                    });
                }
                catch (e) 
                {
                    $log.debug("Load Media:" + e.message);
                    d.reject(false);
                }

                return d.promise;
            }
            catch (e)
            {
                $log.debug("Load Media:" + e.message);
            }
        }



       //Kick off meida player load Once only
       var getMediaStream = function (resource_id, resource_type, index)
       {

           var d = $q.defer();
           var songToPlay = "";

           //First set the previous song data being played
           if (JSON.stringify(gbl_currentSong) != "[]")
           {
               var time = 0;
             
               current = myMedia.getCurrentPosition(  // success callback
                   function (position) {
                       if (position > -1) {
                           time = position;
                           surealServices.setSongPlayedDetails(JSON.parse(localStorage.getItem("userAuth")), gbl_currentSong[0].Id, time);
           
                       }
                   }
                 );
          
           } //If

  
           if (resource_type.toLowerCase() == 'album') {
               try {
                   streamIsLoading = true;
                   $rootScope.$broadcast('streamState', { data: true });

                   //track the album  being played.
                   surealServices.setAlbumPlayedDetails(JSON.parse(localStorage.getItem("userAuth")), resource_id);

                   var c = $q.defer();
                   var promiseA = getAblumDetails(resource_id);
            
                   promiseA.then(function (response) {

                       var newAlbumList = surealServices.getNewAlbumSongs(resource_id);
                       songToPlay = getAlbumSongByIndex(newAlbumList, index, "raw");
                       newAlbumList = getAlbumSongsList(newAlbumList);
                       gbl_currentSongList = newAlbumList;
                   
                       var promise = loadMediaStream(songToPlay);
                       promise.then(function (response) {
                           if (streamLoaded == true) {

                               streamIsLoading = false;
                               $rootScope.$broadcast('streamState', { data: false });
                               d.resolve(gbl_currentSongList);
                           }

                       }, function (reason) {
                           d.reject(false);
                       });

                       c.resolve(true);
                       
                   }, function (reason) {
                       c.reject(false);
                   });

               }
               catch (e) {
                   streamLoaded = false;
               }         
           } //if

           if (resource_type.toLowerCase() == 'playlist') {
               try {
                   streamIsLoading = true;
                   $rootScope.$broadcast('streamState', { data: true });

                

                   //track the playlist  being played.
                   surealServices.setPlaylistPlayedDetails(JSON.parse(localStorage.getItem("userAuth")), resource_id);

                   var promise = surealServices.getPlaylistDetails(JSON.parse(localStorage.getItem("userAuth")), resource_id);
                   promise.then(function(response) 
                   {
                
                       var newAlbumList = response;
                       songToPlay = getPlayListSongByIndex(newAlbumList, index, "raw");
                       newAlbumList = getPlayListSongList(newAlbumList);
                       gbl_currentSongList = newAlbumList;

                       var c = $q.defer();
                       var promise = loadMediaStream(songToPlay);
                       promise.then(function (response)
                       {
                           if (streamLoaded == true) {

                               streamIsLoading = false;
                               $rootScope.$broadcast('streamState', { data: false });
                               c.resolve(gbl_currentSongList);
                           }

                       }, function (reason) {
                           c.reject(false);
                       });  

                     
                       d.resolve(true);

                   }, function (reason) {
                       d.reject(false);
                   });

                 
               }
               catch (e) {
                   streamLoaded = false;
               }
           } //if


           if (resource_type.toLowerCase() == 'ablum-song') {
               try {
                   streamIsLoading = true;
                   $rootScope.$broadcast('streamState', { data: true });
            
                   var songToPlay = getAlbumSongByIndex("", index, "gbl");
          
                   var promise = loadMediaStream(songToPlay);

                   promise.then(function (response) {
                       if (streamLoaded == true) {

                           streamIsLoading = false;
                           $rootScope.$broadcast('streamState', { data: false });
                           d.resolve(gbl_currentSongList);
                       }

                   }, function (reason) {
                       d.reject(false);
                   });
               }
               catch (e) {
                   streamLoaded = false;
               }

           } //if

           if (resource_type.toLowerCase() == 'playlist-song') {
               streamIsLoading = true;
               $rootScope.$broadcast('streamState', { data: true });

               songToPlay = getPlayListSongByIndex("", index, "gbl");

               var promise = loadMediaStream(songToPlay);
               promise.then(function (response) {
                   if (streamLoaded == true) {

                       streamIsLoading = false;
                       $rootScope.$broadcast('streamState', { data: false });
                       d.resolve(gbl_currentSongList);
                   }

               }, function (reason) {
                   d.reject(false);
               });
           } //if
           return d.promise;
       } //function

    //Play the song by the index requested. Referesh the album list. use album image to play in the image
       var playSongByAlbumResourceID = function (resource_id, resource_name, resource_img, resource_type, resource_link, index)
       {
           var d = $q.defer();

           setStreamLoaded(false);
           manageSessionService.storeCurrentResource(resource_id, resource_name, resource_img, resource_type, resource_link, index);

             try {
               var promise = getMediaStream(resource_id, resource_type,index);
               promise.then(function (response) {

                   //tell the world the song has potentially changed.
                   $rootScope.$broadcast('currentSongUpdated', { data: getCurrentSong() });
      
                   playStream();
                   d.resolve(streamLoaded);

               }, function (reason) {
                   $log.debug("Error in load media");
                   $log.debug("Controller Error:" + reason);
                   d.reject(false);
               })
           }
           catch (e) {
               $log.debug("surealMusicPlayer Error: " + e.message);
           }

           return d.promise;
       }


    //Play the song by the index requested. Dont referesh the album list. use album image to play in the image
    //This should be called only after a albumlist or playlist has been loaded into memory.
       var playSongByCurrentAlbumIndex = function (album_resource_id, resource_id, resource_name, resource_img, resource_type, resource_link, index) {
           var d = $q.defer();

           setStreamLoaded(false);
           var currentResource = manageSessionService.getCurrentResource();
           //Songs dont have images so use the album or playlist image

           $log.debug("Res Img:" + currentResource.resource_img);
           manageSessionService.storeCurrentResource(resource_id, resource_name, currentResource.resource_img, resource_type, resource_link, index);
           try {
               var promise = getMediaStream(album_resource_id, "ablum-song", index);
               promise.then(function (response) {

                   //tell the world the song has potentially changed.
                   $rootScope.$broadcast('currentSongUpdated', { data: getCurrentSong() });
                
                   playStream();
                   d.resolve(streamLoaded);

               }, function (reason) {
                   $log.debug("Error in load media");
                   $log.debug("Controller Error:" + reason);
                   d.reject(false);
               })
           }
           catch (e) {
               $log.debug("surealMusicPlayer Error: " + e.message);
           }

           return d.promise;
       }


    //Gets the Play list and plays the first song in the playlist
       var playSongByPlayListResourceID = function (resource_id, resource_name, resource_img, resource_type, resource_link, index) {
           var d = $q.defer();

           setStreamLoaded(false);
           manageSessionService.storeCurrentResource(resource_id, resource_name, resource_img, resource_type, resource_link, index);
           try {
               var promise = getMediaStream(resource_id, resource_type, index);
               promise.then(function (response) {

                   //tell the world the song has potentially changed.
                   $rootScope.$broadcast('currentSongUpdated', { data: getCurrentSong() });
               
                   playStream();
                   d.resolve(streamLoaded);

               }, function (reason) {
                   $log.debug("Error in load media");
                   $log.debug("Controller Error:" + reason);
                   d.reject(false);
               })
           }
           catch (e) {
               $log.debug("surealMusicPlayer Error: " + e.message);
           }

           return d.promise;
       }

       var playSongByCurrentPlayListIndex = function (list_resource_id, resource_id, resource_name, resource_img, resource_type, resource_link, index)
       {
           var d = $q.defer();

           setStreamLoaded(false);
           var currentResource = manageSessionService.getCurrentResource();
           //Songs dont have images so use the album or playlist image

           $log.debug("Res Img:" + currentResource.resource_img);
           manageSessionService.storeCurrentResource(list_resource_id, resource_name, currentResource.resource_img, resource_type, resource_link, index);
           try {
               var promise = getMediaStream(list_resource_id, "playList-song", index);
               promise.then(function (response) {

                   //tell the world the song has potentially changed.
                   $rootScope.$broadcast('currentSongUpdated', { data: getCurrentSong() });
                
                   playStream();
                   d.resolve(streamLoaded);

               }, function (reason) {
                   $log.debug("Error in load media");
                   $log.debug("Controller Error:" + reason);
                   d.reject(false);
               })
           }
           catch (e) {
               $log.debug("surealMusicPlayer Error: " + e.message);
           }

           return d.promise;
       }




       function mediaError(e) {
           streamLoaded = false;
           $log.debug('Media Error');
           $log.debug(JSON.stringify(e));
       }

        

       return {
           getMediaStream: getMediaStream,
           getMediaDuration: getMediaDuration,
           getRotateTrack: getRotateTrack,
           getPlayStateImage: getPlayStateImage,
           getCurrentTime: getCurrentTime,
           getIsStreamPlaying : getIsStreamPlaying,
           playStream: playStream,
           stopStream: stopStream,
           pauseStream : pauseStream,
           getStreamLoaded: getStreamLoaded,
           setStreamLoaded: setStreamLoaded,
           getAlbumSongsList: getAlbumSongsList,
           getAlbumSongByID: getAlbumSongByID,
           getAlbumSongByIndex: getAlbumSongByIndex,
           getCurrentAlbum: getCurrentAlbum,
           getCurrentSongList:getCurrentSongList,
           getCurrentSong: getCurrentSong,
           getStreamIsLoading, getStreamIsLoading,
           getEventDetails: getEventDetails,
           getArtistDetails: getArtistDetails,
           getCurrentAlbumDetails: getCurrentAlbumDetails,
           getAblumDetails: getAblumDetails,
           getCurrentEvent: getCurrentEvent,

           getCurrentArtist: getCurrentArtist,
           getCurrentArtistId:getCurrentArtistId,

           getCurrentEventUpdated :getCurrentEventUpdated,
           getCurrentArtistUpdated: getCurrentArtistUpdated,
           setCurrentEventUpdated: setCurrentEventUpdated,
           setCurrentArtistUpdated: setCurrentArtistUpdated,
           playSongByAlbumResourceID: playSongByAlbumResourceID,
           playSongByCurrentAlbumIndex: playSongByCurrentAlbumIndex,
           playSongByPlayListResourceID: playSongByPlayListResourceID,
           playSongByCurrentPlayListIndex: playSongByCurrentPlayListIndex,
           getSongDataLoaded:getSongDataLoaded,
           cSeconds:cSeconds,
           cTime : cTime
       };

    });