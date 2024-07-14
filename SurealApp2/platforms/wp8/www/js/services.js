angular.module('surealMusic.services', [])
    

.factory('getData', function ($q, $location, ionicPlaform, $timeout) {
    var service = {

        getMyMusicSliderImages: getMyMusicSliderImages
    };

    function getMyMusicSliderImages()
    {
        var MyMusicSliderImages = [
        { Artist: "The Beatles", Name: 'Abby Road', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/61LhV5-8vLL.jpg", id: 1 },
        { Artist: "Van Halen", Name: '1984', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/51WBWyEnFCL.jpg", id: 2 },
        { Artist: "Cash", Name: 'The Man Comes Around', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/41mfMbu0ADL.jpg", id: 3 },
        { Artist: "Johny Coltrane", Name: 'Blue Train', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/51OHUeofS3L.jpg", id: 4 },
        { Artist: "Queen", Name: 'Queen II', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/51BwhjEN1XL.jpg", id: 5 },
        { Artist: "Pink Floyd", Name: 'Wish You Where Here', Options: "1,1,1,1,1,0,1", ImageURL: "http://ecx.images-amazon.com/images/I/510mQlM8AVL.jpg", id: 6 }
        ];
        
        
    }

    return service;
})

//session storage management for the entire app
.factory('manageSessionService', function ($q)
{
    var service = {
        storeCurrentResource: storeCurrentResource,
        getCurrentResource: getCurrentResource
    };

    function storeCurrentResource(resource_id, resource_name, resource_img, resource_type) {

        var current_resource = {
            "resource_id": resource_id, "resource_name": resource_name,
            "resource_img": resource_img, "resource_type": resource_type
        };

        localStorage.setItem("currentResource", JSON.stringify(current_resource));
    }


    function getCurrentResource()
    {
        return localStorage.getItem("currentResource");
    }

    return service;
})


.factory('getActionSheet', function ($q, $location, $ionicPlatform, $ionicActionSheet, $timeout, $ionicNativeTransitions, $rootScope, manageSessionService, surealMusicServices) {
    var service = {
        show: show
    };

    // Triggered on a button click, or some other target


    // string - options -> 1 Can Buy,2 Can DownLoad, 3 Can Play (means stream or local),4 Can Favorites,5 Can Share,6 Can Follow,7 Can Ratings
    // So this is the structure:
    // options: "1,1,1,0,0,0,1"
   
    //Resource_Type = string = Resource Types are: album, song, artist, shop, event, playlist, djchannel, explore 
    //Resource_id = resource_id
    function show(string, resource_id, resource_name, resource_img,resource_type) {



        $ionicPlatform.ready(function () {
            //First split options into arry
            var optionsAr = string.split(",");
        
            //Dynamically build out button group IN order how to show on screen. Index is Zero Based

            var buttonsGroup = [];
            if (optionsAr[2] == 1) {
                var text = { "text": "<i class='icon ion-ios-play'></i> Play", "id": 3 };
                buttonsGroup.push(text);
            }
            if (optionsAr[0] == 1)
            {
                var text = { "text": "<i class='icon  ion-social-usd'></i> Buy", "id": 1 };
                buttonsGroup.push(text);
            }
            if (optionsAr[1] == 1)
            {
                var text = { "text": "<i class='icon ion-ios-cloud-download'></i>Download", "id": 2 };
                buttonsGroup.push(text);
            }
            if (optionsAr[3] == 1)
            {
                var text = { "text": "<i class='icon ion-heart'></i>Favorites", "id": 4 };
                buttonsGroup.push(text);
            }
            if (optionsAr[4] == 1)
            {
                var text = { "text": "<i class='icon ion-share'></i> Share", "id": 5 };
                buttonsGroup.push(text);
            }
            if (optionsAr[5] == 1)
            {
                var text = { "text": "<i class='icon ion-android-person-add'></i>Follow", "id": 6 };
                buttonsGroup.push(text);
            }
        
            $ionicActionSheet.show({
                buttons: buttonsGroup,
             //   destructiveText: 'Delete',
                //  titleText: 'Modify your album',
                titleText: '<center><img class="actionSheet_image_thumb_round_small" src="' + resource_img + '"/><br/> What to do with ' + resource_name + "?</center>",
                cancelText: 'Cancel',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    //Actions based on button
                    if (buttonsGroup[index].id == 3) {

                        surealMusicServices.setStreamLoaded(false);
                        manageSessionService.storeCurrentResource(resource_id, resource_name, resource_img, resource_type);
                        try {
                            var promise = surealMusicServices.getMediaStream(resource_id, resource_type);
                            promise.then(function (response) {

                                //tell the world the song has potentially changed.
                                $rootScope.$broadcast('currentSongUpdated', { data: surealMusicServices.getCurrentSong() });
                                surealMusicServices.playStream();

                            }, function (reason) {
                                console.error("Error in load media");
                                console.error("Controller Error:" + reason);
                            })
                        }
                        catch (e) {
                            console.error("surealMusicPlayer Error: " + e.message);
                        }
                    
                    }

                    return true;
                }
            })
         }, false); //ready ionic
        }

    return service;
  })


//.factory('fileController', function($q, $ionicPlatform, $window, $cordovaFileTransfer, $cordovaFile, $timeout){
//    var service = {
//        download: download,
//        getTartgetPath: getTartgetPath,
//        getDownloadComplete: getDownloadComplete,
//        getDowloadProgress: getDownloadProgress,
//        getFilename : getFilename

//    };

//    var filename = "";
//    var targetPath = "";
//    var downloadComplete = false;
//    var downloadProgress = "0";


//  //  Code	Constant
//  //  1	NOT_FOUND_ERR
//  //  2	SECURITY_ERR
//  //  3	ABORT_ERR
//  //  4	NOT_READABLE_ERR
//  //  5	ENCODING_ERR
//  //  6	NO_MODIFICATION_ALLOWED_ERR
//  //  7	INVALID_STATE_ERR
//  //  8	SYNTAX_ERR
//  //  9	INVALID_MODIFICATION_ERR
//  //  10	QUOTA_EXCEEDED_ERR
//  //  11	TYPE_MISMATCH_ERR
//  //  12	PATH_EXISTS_ERR


//    function download(url) {
       

//        $ionicPlatform.ready(function () {
   
//            filename = url.substr(url.lastIndexOf('/') + 1);
//            var root_path = "sdcard/"; //cordova.file.applicationStorageDirectory;

//            //Check if the surealMusic directory exists
//            $cordovaFile.checkDir(root_path, "surealMusic")
//             .then(function (success) {
//                 // success
//                 console.error("Creating Directory in:" + root_path);

//                 $cordovaFile.createDir(root_path, "surealMusic", false)
//                   .then(function (success) {
//                       console.error("Directory SurealMusic Created in:" + root_path);

//                   }, function (error2) {
//                       console.error("Unable to create Directory SurealMusic in:" + root_path + "::" + error2.code);
//                   })
//             }, function (error) {
                 
//             });

//            targetPath = root_path + "surealMusic/" + filename;
//            console.error("Downloading File to:" + targetPath)
//            var trustHosts = true;
//            var options = {};
  
//            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
//              .then(function (result) {
//                  downloadComplete = true;
//                  console.error('1) File Downloaded to:' + targetPath + "::" + result.toURL());
//              }, function (err) {
//                  downloadComplete = true;
//                  console.error('2) File Download fail:' + err.text);
//              }, function (progress) {
//                  $timeout(function () {
//                   downloadProgress = (progress.loaded / progress.total) * 100;
//                  });
//              });
          

//        }, false); //ready ionic

//    }


//    function getDownloadComplete() {
//        console.error('Download Complete:' + downloadComplete);
//        return downloadComplete;
//    }


//    function getDownloadProgress() {
//        console.error('Download Progress:' + downloadProgress);
//        return downloadProgress;
//    }

//    function getTartgetPath() {
//        console.error('(Service) Target Path:' + targetPath);
//        return targetPath;
//    }


//    function getFilename() {
//        console.error('(Service) Target Filename:' + filename);
//        return filename;
//    }





//    return service;
//})


// for media plugin : http://plugins.cordova.io/#/package/org.apache.cordova.media
.factory('MediaSrv', function($q, $ionicPlatform, $window){
    var service = {
        loadMedia: loadMedia,
        playMedia: playMedia,
        stopMedia : stopMedia,
        getStatusMessage: getStatusMessage,
        getErrorMessage: getErrorMessage
    };

    var currentMedia;

    function loadMedia(src, onStop, onError, onStatus){
        var defer = $q.defer();
        $ionicPlatform.ready(function(){
            var mediaStatus = {
                code: 0,
                text: getStatusMessage(0)
            };
            var mediaSuccess = function(){
                mediaStatus.code = 4;
                mediaStatus.text = getStatusMessage(4);
                if(onStop){onStop();}
            };
            var mediaError = function(err){
                _logError(src, err);
                if(onError){onError(err);}
            };
            var mediaStatus = function(status){
                mediaStatus.code = status;
                mediaStatus.text = getStatusMessage(status);
                if(onStatus){onStatus(status);}
            };

          
            //  if ($ionicPlatform.is('android')) { src = '/android_asset/www/' + src; }
            console.error("Loading:" + src)
            currentMedia = new $window.Media(src, mediaSuccess, mediaError, mediaStatus);
         
            currentMedia.status = mediaStatus;
            defer.resolve(currentMedia);
        });
        return defer.promise;
    }

    function _logError(src, err){
        console.error('MediaSrv error:', {
            code: err.code,
            text: getErrorMessage(err.code)
        });
        
    }

    function playMedia()
    {
        console.error("Playing Song now");
        currentMedia.play();
    }

    function stopMedia() {
        currentMedia.stop();
    }

    function getStatusMessage(status){
        if (status === 0) {
            console.error('Media Service: Media.MEDIA_NONE');
            return 'Media.MEDIA_NONE';
        }
        else if (status === 1) {
            console.error('Media Service: Media.MEDIA_STARTING');
            return 'Media.MEDIA_STARTING';
        }
        else if (status === 2) {
            console.error('Media Service: Media.MEDIA_RUNNING');
            return 'Media.MEDIA_RUNNING';
        }
        else if (status === 3) {
            console.error('Media Service: Media.MEDIA_PAUSED');
            return 'Media.MEDIA_PAUSED';
        }
        else if (status === 4) {
            console.error('Media Service: Media.MEDIA_STOPPED');
            return 'Media.MEDIA_STOPPED';
        }
        else {
            console.error('Media Service: media.unknown.' + status);
            return 'Unknown status <' + status + '>';
        }
    }

    function getErrorMessage(code){
        if (code === 1) {
            console.error('Media Service: Media.MEDIA_ERR_ABORTED');
            return 'MediaError.MEDIA_ERR_ABORTED';
        }
        else if (code === 2) {
            console.error('Media Service: Media.MEDIA_ERR_NETWORK');
            return 'MediaError.MEDIA_ERR_NETWORK';
        }
        else if (code === 3) {
            console.error('Media Service: Media.MEDIA_ERR_DECODE');
            return 'MediaError.MEDIA_ERR_DECODE';
        }
        else if (code === 4) {
            
            console.error('Media Service: Media.MEDIA_ERR_NONE_SUPPORTED');
            return 'MediaError.MEDIA_ERR_NONE_SUPPORTED';
        }
        else {

            console.error('Media Service: media.unknown.' + status);
            return 'Unknown code <' + code + '>';
        }
    }

    return service;
})

.factory('Chats', function () {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
