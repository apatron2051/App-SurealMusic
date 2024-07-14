angular.module('surealMusic.musicPlayer', [])
    
//Sureal Music Services
.factory('surealMusicServices', function ($q, $interval, $location, $http, $timeout,$rootScope,$ionicPlatform, MediaSrv, surealServices)
{


        var pauseImage = "img/pause@2x.png";
        var playImage = "img/play@2x.png";
        var maxTime = 0;
        var rotatetrack = false;
        var currentTime = 0;
        var isPlayingStream = false;
        var playStateImage = playImage;
        var current = 0;
        var max = 0;
        var Timer = null;
        var myMediaStateTimer = null;
        var myMedia = null;
        var streamLoaded = false;
        var streamIsLoading = false;

        var currentSong = [];
        var currentAlbumSongList = [];

        function IsJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                console.error("IsJsonString:" + e.message)
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

            return playStateImage;
        }

        var getCurrentTime = function ()
        {
            return currentTime;
        }

        var getIsStreamPlaying = function ()
        {
           return isPlayingStream 
        }
       

        var getStreamLoaded= function ()
        {
            return streamLoaded;
        }
        
        var getStreamIsLoading = function()
        {
            return streamIsLoading;

        }

        //Get the songs for a specific album by resource id
        var getAlbumSongsList = function (album_data)
        {
            var currentAlbumSongs = [];
            var stream_url = "";

            var songs = album_data;
            //play first song by default as the user clicked on an album

            angular.forEach(songs, function (value) {
                var song_info = JSON.parse(value.s.song_info);
                currentAlbumSongs.push({ Id: value.song_id, Title: value.s.title, Duration: song_info.duration, SongURL: value.link });
            });
         

            return currentAlbumSongs;
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
        var getAlbumSongByIndex = function (album_data, index) {

            var stream_url = "";
            var currentAlbumSong = [];
            var stream_url = "";
            var count = 0;
            
            var songs = album_data;

            //play first song by default as the user clicked on an album

            angular.forEach(songs, function (value) {
                count++;
                if (count == index) {
                    var song_info = JSON.parse(value.s.song_info);
             
                    currentAlbumSong.push({ Id: value.song_id, Title: value.s.title, Duration:song_info.duration, SongURL: value.link });
                }
            });
            
            return currentAlbumSong;
        }


        var getCurrentAlbum = function()
        {
            return currentAlbumSongList;

        }

        var getCurrentSong = function () {

            localStorage.setItem("currentSong", JSON.stringify(currentSong));
            return currentSong;

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
                console.error(totaltime[0] + "---" + totaltime[1] + "--" + totaltime[2]);
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
            var getMediaState = function () {

                myMediaStateTimer = $interval(function () {
                  
                }, 1000);
            }


            var startTimer = function () {
                //Initialize the Timer to run every 1000 milliseconds i.e. one second.
                Timer = $interval(function () {
                    var date = new Date();
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var seconds = date.getSeconds();

                    hours = hours;
                    minutes = minutes;
                    seconds = seconds;
                    time = getPadded(hours) + ':' + getPadded(minutes) + ':' + getPadded(seconds);
                    increment();
                }, 1000);

            };

            //Increment Timer
            var increment = function (amount) {
                current = myMedia.getCurrentPosition(  // success callback
                    function (position) {
                        if (position > -1) {
                            $rootScope.$broadcast('timerUpdate', { currentTime: cTime(position) });
                        }
                    },
                    // error callback
                    function (e) {
                        console.log("Error getting pos=" + e);
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
            isPlayingStream = false;
            rotatetrack = false;
            $rootScope.$broadcast('songStop', { data: "stop" });
            playStateImage = playImage;
        }

        // play the stream
        var pauseStream = function (index) {

            //Pause te song
            myMedia.pause();
            isPlayingStream = false;
            rotatetrack = false;
            stopTimer();
            $rootScope.$broadcast('songStop', { data: "stop" });
            playStateImage = playImage;
        }


        // stop the str eam
        var playStream = function (index) {
            
            //  $scope.togglePlayback = !$scope.togglePlayback;
            //Make sure media is loaded FIRST!
            myMedia.play();
            startTimer();
            isPlayingStream = true;
            ///Now start timer

            $rootScope.$broadcast('songPlay', { data: "play" });
            playStateImage = pauseImage;
            rotatetrack = true;
            //based on resource type lets get proper arry
        }


        ///Stream The song
        function loadMediaStream(song) {

            try 
            {
                var d= $q.defer();
                //Check if file is local
                var localPath = "";
                var downloadComplete = false;
          
                //set the current playing song
                currentSong = song;
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
                    
                        myMedia = new Media(currentSong[0].SongURL, null, null);
                        streamLoaded = true;
                        d.resolve(streamLoaded);
                    });
                }
                catch (e) 
                {
                    console.error("Load Media:" + e.message);
                    d.reject(false);
                }

                return d.promise;
            }
            catch (e)
            {
                console.error("Load Media:" + e.message);
            }
        }



       //Kick off meida player load Once only
       var getMediaStream = function (resource_id, resource_type)
       {

           var d = $q.defer();

           if (resource_type == 'album') {
               try {
                   streamIsLoading = true;
                   $rootScope.$broadcast('streamState', { data: true });

                   var newAlbumList = surealServices.getNewAlbumSongs(resource_id);
                   var firstSong = getAlbumSongByIndex(newAlbumList, 1);
                   newAlbumList = getAlbumSongsList(newAlbumList);
                   currentAlbumSongList = newAlbumList;


                   var promise = loadMediaStream(firstSong);

                   promise.then(function (response) {
                       if (streamLoaded == true) {

                           streamIsLoading = false;
                           $rootScope.$broadcast('streamState', { data: false });
                           d.resolve(currentAlbumSongList);
                       }

                   }, function (reason) {
                       d.reject(false);
                   });
               }
               catch (e) {
                   streamLoaded = false;
               }         
           } //if

           return d.promise;
       } //function


       function mediaError(e) {
           streamLoaded = false;
           console.error('Media Error');
           console.error(JSON.stringify(e));
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
           getCurrentSong: getCurrentSong,
           getStreamIsLoading, getStreamIsLoading,
           cSeconds:cSeconds,
           cTime : cTime
       };

    });