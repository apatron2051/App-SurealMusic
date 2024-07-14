///tab-myMusic.html - SHOP Code snippet
<!--************************************************************SHOP***************************************************************-->
<!--   <div id="line-whatsNew" class="row">
       <div id="line-1" class="col col-33">
           <img class="horizontal-line" src="img/line.png" />
       </div>
       <div id="line-1" class="col col-33 horizontal-line-text-small">
           SHOP
       </div>
       <div id="line-1" class="col col-33">
           <img class="horizontal-line" src="img/line.png" />
       </div>
   </div>

   <ion-spinner icon="circles" class="spinner-energized" ng-class="{'spinner-energized': !myMusicWhatsNewAlbumsData, 'hide_spinner': myMusicWhatsNewAlbumsData}"></ion-spinner>

   <ion-slide-box delegate-handle="whatsNewSlideBoxShop" id="whatsNewSlideBox" does-continue="true" auto-play="false" show-pager="false">

       <ion-slide id="whatsNewShopSlide" ng-repeat="data in myMusicWhatsNewShops">


           <div class="row">
               <div class="col-25 slide-box-container_singleLine horizontal-line-text" ng-repeat="dataItem in data.slide" id="album-wn-{{dataItem.id}}">
                   <img class="slide_box_image_thumb_round"
                        on-touch="onimgTouch();imgtouchActive = !imgtouchActive"
                        on-release="imgtouchActive=false"
                        ng-class="{'animated rotate180 infinite':imgtouchActive}"
                        on-hold="actSheetWXN(dataItem.Options, dataItem.id, dataItem.Name, dataItem.ImageURL, 'shop')"
                        src="{{dataItem.ImageURL}}" title="{{dataItem.Name}}" />
                   <p class="slide_box_image_Text">{{dataItem.Name}}</p>
               </div>
           </div>

       </ion-slide>
   </ion-slide-box> -->
////

///sliding tabs
 <div id="trending" class="row">
                    <div class="col">
                        <a class="a_class" ng-click="tog=1;slideIndex(0);">ALBUMS</a>
                        <div ng-class='{"hrLine":tog==1}'> </div>
                    </div>
                    <div class="col">
                        <a class="a_class" ng-click="tog=2;slideIndex(1);">SHOP</a>
                        <div ng-class='{"hrLine":tog==2}'> </div>
                    </div>
                    <div class="col">
                        <a class="a_class" ng-click="tog=3;slideIndex(2);">EVENTS</a>
                        <div ng-class='{"hrLine":tog==3}'> </div>
                    </div>
                </div>


//Sample Json Formatted for screen myMusic.html - LIST
    [{"Artist":"The Ramones","Name":"Cool Jass","Options":"0,1,1,1,1,1,1","ImageURL":"https://surealmusicstorage.blob.core.windows.net/images/ea91cc39-ed3f-4e40-a628-85c6b96dbc02-.jpg"},{"Artist":"The Ramones","Name":"Smooth Jazz","Options":"0,1,1,1,1,1,1","ImageURL":"https://surealmusicstorage.blob.core.windows.net/images/18031bd0-0adc-4efa-af54-4f8e574de7b5-.jpg"},{"Artist":"The Ramones","Name":"Cool Music","Options":"0,1,1,1,1,1,1","ImageURL":"https://surealmusicstorage.blob.core.windows.net/images/058237f9-c8e2-4f8e-b30e-247d17488d1f-.jpg"},{"Artist":"The Ramones","Name":"","Options":"0,1,1,1,1,1,1","ImageURL":"app.assets/images/default_album.png"},{"Artist":"The Ramones","Name":"Rock","Options":"0,1,1,1,1,1,1","ImageURL":"https://surealmusicstorage.blob.core.windows.net/images/b9efb99c-40bb-4366-ad72-a5b00d63e959-.jpg"}]
ripple.js (40,10361)

    //Sample Json formatted for screen myMusic.html - SLIDE
    [{"slide_id":1,"slide":[{"Artist":"The Ramones","Name":"Buddha-Bar Classical","Options":"1,1,1,1,1,0,1","ImageURL":"https://surealmusicstorage.blob.core.windows.net/images/150c9f1b-1d65-4303-bfde-ee94f9cc3418-.jpg"},
        {"Artist":"The Ramones","Name":"Dangerous","Options":"1,1,1,1,1,0,1","ImageURL":"https://surealmusicstorage.blob.core.windows.net/images/ba5f453b-a5bf-4c2c-8d72-900e57b6e984-.jpg"},
        {"Artist":"The Ramones","Name":"Ghost","Options":"1,1,1,1,1,0,1","ImageURL":"https://surealmusicstorage.blob.core.windows.net/images/f41419b3-544e-41ad-906d-ff70d8fec287-.jpg"},
        {"Artist":"The Ramones","Name":"Bad","Options":"1,1,1,1,1,0,1","ImageURL":"https://surealmusicstorage.blob.core.windows.net/images/35d4a16b-afad-4c77-9431-903d1a69353b-.jpg"}]
    }]


    //Sample json for events
     [{"slide_id":1,"slide":[{"Artist":"The Ramones","Name":"Live in Concert","Options":"0,0,0,1,1,1,1","ImageURL":"https://surealmusicstorage.blob.core.windows.net/images/b079a6a8-44a0-4a2b-9c8a-2dc25eccd362-.jpg"},
         {"Artist":"The Ramones","Name":"SKIZ","Options":"0,0,0,1,1,1,1","ImageURL":"https://surealmusicstorage.blob.core.windows.net/images/9b220996-e5c2-4f12-9dd2-435fa9c71b3a-.jpg"},
         {"Artist":"The Ramones","Name":"Live In","Options":"0,0,0,1,1,1,1","ImageURL":"https://surealmusicstorage.blob.core.windows.net/images/fc22e786-3a57-40c2-be31-e9c6be082e99-.jpg"},
         {"Artist":"The Ramones","Name":"TRAENA FESTIVAL 2016","Options":"0,0,0,1,1,1,1","ImageURL":"https://surealmusicstorage.blob.core.windows.net/images/33c923f5-9505-4534-97e2-bea9221163f4-.jpg"}
     ]},
      {"slide_id":2,"slide":[
          {"Artist":"The Ramones","Name":"Corrs","Options":"0,0,0,1,1,1,1","ImageURL":"https://surealmusicstorage.blob.core.windows.net/images/63e9c6eb-86d2-479e-8724-c49787b97fcd-.jpg"},
          {"Artist":"The Ramones","Name":"Rhythm N Blooms 2016","Options":"0,0,0,1,1,1,1","ImageURL":""},
          {"Artist":"The Ramones","Name":"Old Settler’s Music Festival 2016","Options":"0,0,0,1,1,1,1","ImageURL":""},
          {"Artist":"The Ramones","Name":"Tortuga Music Festival 2016","Options":"0,0,0,1,1,1,1","ImageURL":""}
      ]},
      {"slide_id":3,"slide":[
          {"Artist":"The Ramones","Name":"THE BASICS","Options":"0,0,0,1,1,1,1","ImageURL":""},
          {"Artist":"The Ramones","Name":"EUPHORIA","Options":"0,0,0,1,1,1,1","ImageURL":""},
          {"Artist":"The Ramones","Name":"EUPHORIA","Options":"0,0,0,1,1,1,1","ImageURL":""},
          {"Artist":"The Ramones","Name":"EUPHORIA","Options":"0,0,0,1,1,1,1","ImageURL":""}
      ]}]



    ///JSPON for Favorite album
    ERROR: {"status":"OK","code":"200","message":"Success","action":"","data":{"albums":
        [{"id":2080,"metadata_json":"\"\"","name":"Ghost","album_info":
            "{\"album_cover_photo\":\"https://surealmusicstorage.blob.core.windows.net/images/f41419b3-544e-41ad-906d-ff70d8fec287-.jpg\",\"type\":\"Album\",\"genre\":\"Pop\",\"about\":\"Ghost\",\"artist\":{\"items\":[]}}","status":"Publish","is_downloaded":false,"is_liked":true,"is_purchased":false}]}}
    ripple.js (40,10361)


    ///

    <ion-pull-up-footer class="background_image bar bar-footer" style="display: block; transition: 300ms ease-in-out; padding: 0px; bottom: 49px; height: 468px; transform: translate3d(0px, 0px, 0px);" initial-state="collapsed" default-behavior="expand">
        <!-- ngInclude:  --><div class="title disable-user-behavior" ion-pull-up-trigger="" ng-include="" src="'templates/tab-minimusicPlayer.html'"><div style="height:1vh" ng-controller="MusicPlayerCtrl">
    <div class="background_image">

        <div overflow-scroll="false">
            <!--     <button ng-click="increment();">Increment</button>
            <button ng-click="decrement();">Decrement</button>
            <button ng-click="increment(10);">Increment 10</button>
            <button ng-click="decrement(10);">Decrement 10</button> -->

            <ion-audio-track track="dynamicTrack" toggle-playback="togglePlayback"><ng-transclude>
                <div id="musicPlayer" class="row">
                    <div id="back" class="col-30 image-player-cntrl">
                        <img src="img/shuffle@2x.png" class="image-player-tiny">
                        <img src="img/previous@2x.png" class="image-player-medium">
                        <ion-audio-controls>
                            <a ng-click="timerToggle(0)" class="image-player-medium">  <img src="img/play@2x.png" class="image-player-medium"> </a>
                            <ion-spinner icon="ios" class="ng-hide spinner spinner-ios"><svg viewBox="0 0 64 64"><g stroke-width="4" stroke-linecap="round"><line y1="17" y2="29" transform="translate(32,32) rotate(180)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(210)"><animate attributeName="stroke-opacity" dur="750ms" values="0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(240)"><animate attributeName="stroke-opacity" dur="750ms" values=".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(270)"><animate attributeName="stroke-opacity" dur="750ms" values=".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(300)"><animate attributeName="stroke-opacity" dur="750ms" values=".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(330)"><animate attributeName="stroke-opacity" dur="750ms" values=".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(0)"><animate attributeName="stroke-opacity" dur="750ms" values=".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(30)"><animate attributeName="stroke-opacity" dur="750ms" values=".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(60)"><animate attributeName="stroke-opacity" dur="750ms" values=".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(90)"><animate attributeName="stroke-opacity" dur="750ms" values=".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(120)"><animate attributeName="stroke-opacity" dur="750ms" values=".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(150)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line></g></svg></ion-spinner>
                        </ion-audio-controls>

                        <img src="img/next@2x.png" class="image-player-medium">

                        <img src="img/repeat@2x.png" class="image-player-tiny">
                    </div>
                    <div id="Time-1" class="text-style-player-song col-70 ng-binding">, , time-1</div>
                </div>
            </ng-transclude></ion-audio-track>
        </div>



    </div>
</div></div>
        <ion-pull-up-content style="display: block; margin-top: 44px; width: 100%;">
           

      <div style="height:90vh" ng-controller="MusicPlayerCtrl" class="ng-binding">
            <!--initialize the session for this scope-->
            

            <div id="content_panel" class="content_panel" scroll="false">
                <div id="musicPlayer" class="row">

                    <div id="player-2" class="col">
                        <img src="img/graphLeft.png" class="image-graph">
                    </div>
                    <div id="player-2" class="col-50 ng-binding">



                        

                        <div class="progress"><img ng-class="{'animated rotate360 infinite':rotatetrack}" class="player_image_thumb_round" src="https://surealmusicstorage.blob.core.windows.net/images/18031bd0-0adc-4efa-af54-4f8e574de7b5-.jpg"></div>

                        <div class="round-progress-wrapper" round-progress="" max="max" current="current" color="#42A5F5" bgcolor="#000000" radius="125" semi="isSemi" rounded="rounded" stroke="15" clockwise="clockwise" responsive="true" duration="800" animation="easeOutCubic" offset="0" animation-delay="0" on-render="showPreciseCurrent" style="width: 100%; position: relative; padding-bottom: 100%;">
<svg class="round-progress" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" style="top: 0px; left: 0px; position: absolute; width: 100%; height: 100%; overflow: hidden;">
<circle fill="none" cx="125" cy="125" r="117.5" style="stroke: rgb(0, 0, 0); stroke-width: 15;"></circle>
<path fill="none" transform="" d="M 125.00000000000001 7.5 A 117.5 117.5 0 0 0 125.00000000000001 7.5" style="stroke: rgb(66, 165, 245); stroke-width: 15; stroke-linecap: butt;"></path>
<g ng-transclude="">

                            <svg>
                                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="5%" stop-color="green"></stop>
                                    <stop offset="95%" stop-color="gold"></stop>
                                </linearGradient>
                            </svg>
                        </g>
</svg>
</div>
                    </div>

                    <div id="player-2" class="col"><img ng-click="" src="img/graphRight.png" class="image-graph"></div>

                </div>

                <div id="musicPlayer" class="row">
                    <div id="Time-1" class="text-style-title col ng-binding">00:00</div>
                    <div id="Time-2" class="text-style-title col ng-binding">03:12</div>
                </div>
                <!--     <button ng-click="increment();">Increment</button>
        <button ng-click="decrement();">Decrement</button>
        <button ng-click="increment(10);">Increment 10</button>
        <button ng-click="decrement(10);">Decrement 10</button> -->

                <ion-audio-track track="dynamicTrack" toggle-playback="togglePlayback"><ng-transclude>
                    <div id="musicPlayer" class="row">
                        <div id="Time-1" class="text-style-player-song col ng-binding"></div>
                    </div>
                    <div id="musicPlayer" class="row">
                        <div id="Time-1" class="text-style-player-artist col ng-binding"></div>
                    </div>
                    <div id="line-1" class="col">
                        <img class="horizontal-line" src="img/line.png">
                    </div>

                    <!--**********************************************************************************************************-->
                    <!--- Trending Tabs and Images (slidebox) -->
                    <div id="trending" class="row">
                        <div class="col">
                            <a class="a_class" ng-click="tog=1;slideIndex(0);">PLAYER</a>
                            <div ng-class="{&quot;hrLine&quot;:tog==1}"> </div>
                        </div>
                        <div class="col">
                            <a class="a_class" ng-click="tog=2;slideIndex(1);">LYRICS</a>
                            <div ng-class="{&quot;hrLine&quot;:tog==2}"> </div>
                        </div>
                        <div class="col">
                            <a class="a_class" ng-click="tog=3;slideIndex(2);">ARTIST</a>
                            <div ng-class="{&quot;hrLine&quot;:tog==3}"> </div>
                        </div>
                    </div>


                    <div class="slider" delegate-handle="playerSlideBox" does-continue="true" auto-play="false" show-pager="false" style="visibility: visible;"><div class="slider-slides" ng-transclude="" style="width: 837px;">
                        <ion-slide id="player" class="slider-slide" data-index="0" style="width: 279px; left: 0px; transition-duration: 300ms; transform: translate(0px, 0px) translateZ(0px);">
                            <div id="musicPlayer" class="div-center row">
                                <div id="shuffle" class="col-10"></div>
                                <div id="back" class="col-80 image-player-cntrl">
                                    <img src="img/shuffle@2x.png" class="image-player-tiny">
                                    <img src="img/previous@2x.png" class="image-player-medium">
                                    <ion-audio-controls>
                                        <a ng-click="timerToggle(0)" class="image-player-large">  <img src="img/play@2x.png" class="image-player-large"> </a>
                                        <ion-spinner icon="ios" class="ng-hide spinner spinner-ios"><svg viewBox="0 0 64 64"><g stroke-width="4" stroke-linecap="round"><line y1="17" y2="29" transform="translate(32,32) rotate(180)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(210)"><animate attributeName="stroke-opacity" dur="750ms" values="0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(240)"><animate attributeName="stroke-opacity" dur="750ms" values=".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(270)"><animate attributeName="stroke-opacity" dur="750ms" values=".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(300)"><animate attributeName="stroke-opacity" dur="750ms" values=".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(330)"><animate attributeName="stroke-opacity" dur="750ms" values=".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(0)"><animate attributeName="stroke-opacity" dur="750ms" values=".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(30)"><animate attributeName="stroke-opacity" dur="750ms" values=".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(60)"><animate attributeName="stroke-opacity" dur="750ms" values=".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(90)"><animate attributeName="stroke-opacity" dur="750ms" values=".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(120)"><animate attributeName="stroke-opacity" dur="750ms" values=".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(150)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line></g></svg></ion-spinner>
                                    </ion-audio-controls>

                                    <img src="img/next@2x.png" class="image-player-medium">

                                    <img src="img/repeat@2x.png" class="image-player-tiny">
                                </div>

                                <div id="shuffle" class="col-10"></div>

                            </div>
                        </ion-slide>

                        <ion-slide id="song-lyrics" class="slider-slide" data-index="1" style="width: 279px; left: -279px; transition-duration: 300ms; transform: translate(279px, 0px) translateZ(0px);">
                            <div>
                                sureal soial
                            </div>
                        </ion-slide>

                        <ion-slide id="artist-info" class="slider-slide" data-index="2" style="width: 279px; left: -558px; transition-duration: 300ms; transform: translate(-279px, 0px) translateZ(0px);">
                            Sureal Artist Information
                        </ion-slide>


                    </div><div class="slider-pager hide"><!-- ngRepeat: slide in numSlides() track by $index --><span class="slider-pager-page active" ng-repeat="slide in numSlides() track by $index" ng-class="{active: $index == currentSlide}" ng-click="pagerClick($index)"><i class="icon ion-record"></i></span><!-- end ngRepeat: slide in numSlides() track by $index --><span class="slider-pager-page" ng-repeat="slide in numSlides() track by $index" ng-class="{active: $index == currentSlide}" ng-click="pagerClick($index)"><i class="icon ion-record"></i></span><!-- end ngRepeat: slide in numSlides() track by $index --><span class="slider-pager-page" ng-repeat="slide in numSlides() track by $index" ng-class="{active: $index == currentSlide}" ng-click="pagerClick($index)"><i class="icon ion-record"></i></span><!-- end ngRepeat: slide in numSlides() track by $index --></div></div>

                </ng-transclude></ion-audio-track>


            </div>


          </div>

        </ion-pull-up-content>
    </ion-pull-up-footer>


    ///

    
                        //    var another_variable = localStorage.getItem("storage_name");
                        $ionicNativeTransitions.locationUrl('/tab/musicPlayer', {
                            "type": "slide",
                            "direction": "down", // 'left|right|up|down', default 'left' (which is like 'next')
                            "duration": 1500, // in milliseconds (ms), default 400
                    });
                   // $location.path("/tab/musicPlayer")
    ///
"status":"OK","code":"200","message":"Success","action":"","data":
                    {"album":[{"id":3085,"name":"Buddha-Bar Classical","album_info":"{\"album_cover_photo\":\"https://surealmusicstorage.blob.core.windows.net/images/150c9f1b-1d65-4303-bfde-ee94f9cc3418-.jpg\",\"type\":\"Album\",\"genre\":\"Classical\",\"about\":\"Buddha-Bar Classical, Zenfonia\",\"artist\":{\"items\":[]}}","metadata_json":"\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"","status":"Draft","created_by_id":1298,"updated_by_id":1298,"created_on":"2016-04-04T08:57:44.83","updated_on":"2016-04-11T09:40:54.697","datamode":"A"},{"id":3084,"name":"Dangerous","album_info":"{\"album_cover_photo\":\"https://surealmusicstorage.blob.core.windows.net/images/ba5f453b-a5bf-4c2c-8d72-900e57b6e984-.jpg\",\"type\":\"Album\",\"genre\":\"Pop\",\"about\":\"Dangerous\",\"artist\":{\"items\":[]}}","metadata_json":"\"\\\"\\\"\"","status":"Publish","created_by_id":1290,"updated_by_id":1290,"created_on":"2016-03-29T17:20:45.98","updated_on":"2016-03-29T17:33:28.67","datamode":"A"},{"id":2080,"name":"Ghost","album_info":"{\"album_cover_photo\":\"https://surealmusicstorage.blob.core.windows.net/images/f41419b3-544e-41ad-906d-ff70d8fec287-.jpg\",\"type\":\"Album\",\"genre\":\"Pop\",\"about\":\"Ghost\",\"artist\":{\"items\":[]}}","metadata_json":"\"\"","status":"Publish","created_by_id":1290,"updated_by_id":1290,"created_on":"2016-03-03T04:20:53.213","updated_on":"2016-03-03T04:20:53.213","datamode":"A"},{"id":2079,"name":"Bad","album_info":"{\"album_cover_photo\":\"https://surealmusicstorage.blob.core.windows.net/images/35d4a16b-afad-4c77-9431-903d1a69353b-.jpg\",\"type\":\"Album\",\"genre\":\"Pop\",\"about\":\"Bad\",\"artist\":{\"items\":[]}}","metadata_json":"\"\"","status":"Publish","created_by_id":1290,"updated_by_id":1290,"created_on":"2016-03-03T04:19:16.113","updated_on":"2016-03-03T04:19:16.113","datamode":"A"},{"id":2078,"name":"Thriller","album_info":"{\"album_cover_photo\":\"https://surealmusicstorage.blob.core.windows.net/images/d93c5426-608e-4191-afad-a0a487471950-.jpg\",\"type\":\"Album\",\"genre\":\"Pop\",\"about\":\"Thriller\",\"artist\":{\"items\":[]}}","metadata_json":"\"\"","status":"Publish","created_by_id":1290,"updated_by_id":1290,"created_on":"2016-03-03T04:17:32.83","updated_on":"2016-03-03T04:17:32.83","datamode":"A"},{"id":2077,"name":"History","album_info":"{\"album_cover_photo\":\"https://surealmusicstorage.blob.core.windows.net/images/0cda6271-c423-4ced-a8cb-a1014fa7df06-.jpg\",\"type\":\"Album\",\"genre\":\"Pop\",\"about\":\"History\",\"artist\":{\"items\":[]}}","metadata_json":"\"\\\"\\\"\"","status":"Publish","created_by_id":1290,"updated_by_id":1290,"created_on":"2016-03-03T04:15:19.617","updated_on":"2016-03-03T05:40:23.557","datamode":"A"}],
                        
                    "album_songs":
                        
                                              [{"album_id":2077,"s":{"id":2139,"title":"History theme","track_id":"","song_info":"{\"type\":\"audio/mp3\",\"size\":1.53,\"duration\":\"00:01:40\",\"artists\":{\"items\":[]}}","metadata_json":"\"\\\"\\\"\"","created_by_id":1290,"updated_by_id":1290,"created_on":"2016-03-03T04:15:19.667","updated_on":"2016-03-03T05:40:23.667","datamode":"A"},
                                               "song_id":2139,"link":"https://smmediaservicestorage.blob.core.windows.net:443/asset-9ab8c04c-926f-4f7a-be67-e05258c0056e/History%20theme.mp3?sv=2012-02-12&sr=c&si=6ec6a1a1-4cb1-4d64-bd5c-d2865876145a&sig=jxZ%2FHQQHhC2nfRniFr3S7V5byLtmvvtpbH042JcCJd8%3D&se=2017-03-03T04%3A15%3A11Z"},
                                               {"album_id":2078,"s":{"id":2140,"title":"Dream of life","track_id":"","song_info":"{\"type\":\"audio/mp3\",\"size\":1.53,\"duration\":\"00:01:40\",\"artists\":{\"items\":[]}}","metadata_json":"\"\"","created_by_id":1290,"updated_by_id":1290,"created_on":"2016-03-03T04:17:32.893","updated_on":"2016-03-03T04:17:32.893","datamode":"A"},
                                               "song_id":2140,"link":"https://smmediaservicestorage.blob.core.windows.net:443/asset-99af3772-4457-4858-9f67-dac7d85b6778/1.mp3?sv=2012-02-12&sr=c&si=363053ca-82bb-4a7d-a759-94afeaf40567&sig=ZS3m4NNPHBfRFxgelJAHWwq3j5cXpcx3rY%2FA7TsTD8w%3D&se=2017-03-03T04%3A17%3A26Z"},
                                               {"album_id":2079,"s":{"id":2141,"title":"Around the world","track_id":"","song_info":"{\"type\":\"audio/mp3\",\"size\":1.53,\"duration\":\"00:01:40\",\"artists\":{\"items\":[]}}","metadata_json":"\"\"","created_by_id":1290,"updated_by_id":1290,"created_on":"2016-03-03T04:19:16.177","updated_on":"2016-03-03T04:19:16.177","datamode":"A"},
                                               "song_id":2141,"link":"https://smmediaservicestorage.blob.core.windows.net:443/asset-3feb053c-88a2-4fed-bbc0-0f26aa48dba3/2.mp3?sv=2012-02-12&sr=c&si=be1b33e4-e1c9-472b-b817-c09721e82414&sig=YcmVAHRy5OvfGFr%2Bgjuk2Vr2jf8cK5tytcmrGJAxduA%3D&se=2017-03-03T04%3A19%3A08Z"},
                                               {"album_id":2080,"s":{"id":2142,"title":"Life","track_id":"","song_info":"{\"type\":\"audio/mp3\",\"size\":1.53,\"duration\":\"00:01:40\",\"artists\":{\"items\":[]}}","metadata_json":"\"\"","created_by_id":1290,"updated_by_id":1290,"created_on":"2016-03-03T04:20:53.247","updated_on":"2016-03-03T04:20:53.247","datamode":"A"},
                                               "song_id":2142,"link":"https://smmediaservicestorage.blob.core.windows.net:443/asset-842e482e-00e4-4606-ab26-d15c05412d0c/2.mp3?sv=2012-02-12&sr=c&si=410d8dbd-9b09-4104-9ad9-28f1c71e80a7&sig=v%2BW0Pm6VPH%2Fbp2e%2Fh4DhjHyRI7q5cV35vwnWxw99dG4%3D&se=2017-03-03T04%3A20%3A46Z"},
                                               {"album_id":3084,"s":{"id":2144,"title":"She Drives Me Wild","track_id":"","song_info":"{\"type\":\"audio/mp3\",\"size\":3.39,\"duration\":\"00:03:41\",\"artists\":{\"items\":[]}}","metadata_json":"\"\\\"\\\"\"","created_by_id":1290,"updated_by_id":1290,"created_on":"2016-03-29T17:20:46.4","updated_on":"2016-03-29T17:33:28.78","datamode":"A"},
                                               "song_id":2144,"link":"https://smmediaservicestorage.blob.core.windows.net:443/asset-8b7907ef-8d72-434e-b802-fa0e0be085ea/She%20Drives%20Me%20Wild.mp3?sv=2012-02-12&sr=c&si=b404b766-721d-4c33-a272-2b2f1b9657a1&sig=WXJk2UEs3L6AbXeGx2pNwyt3%2Fya7YaCW%2FAEtaeM843c%3D&se=2017-03-29T17%3A19%3A08Z"},
                                               {"album_id":3084,"s":{"id":2145,"title":"Remember The Time","track_id":"","song_info":"{\"type\":\"audio/mp3\",\"size\":3.68,\"duration\":\"00:04:00\",\"artists\":{\"items\":[]}}","metadata_json":"\"\\\"\\\"\"","created_by_id":1290,"updated_by_id":1290,"created_on":"2016-03-29T17:20:46.76","updated_on":"2016-03-29T17:33:29.373","datamode":"A"},
                                               "song_id":2145,"link":"https://smmediaservicestorage.blob.core.windows.net:443/asset-1bf5b722-6e84-4fac-8eda-9bc74fbfb742/Remember%20The%20Time.mp3?sv=2012-02-12&sr=c&si=509eb4ef-23ae-4660-9b92-bcbfdaac3e85&sig=p5Zs4o9WUrZFmi6MDptqekSgSXeNaukn5aBkTGurXbA%3D&se=2017-03-29T17%3A19%3A36Z"},
                                               {"album_id":3084,"s":{"id":2146,"title":"Give In To Me","track_id":"","song_info":"{\"type\":\"audio/mp3\",\"size\":3.94,\"duration\":\"00:05:29\",\"artists\":{\"items\":[]}}","metadata_json":"\"\"","created_by_id":1290,"updated_by_id":1290,"created_on":"2016-03-29T17:33:29.42","updated_on":"2016-03-29T17:33:29.42","datamode":"A"},
                                               "song_id":2146,"link":"https://smmediaservicestorage.blob.core.windows.net:443/asset-1a50debd-7592-4ffc-89ab-4899b05dda9e/Give%20In%20To%20Mew.mp3?sv=2012-02-12&sr=c&si=46f8be2d-558c-4b22-ad69-203941f6efea&sig=GzNYL9ZvrxlLOc0FaUZ99JRMyduwWbi6bcldxnrFo58%3D&se=2017-03-29T17%3A32%3A43Z"},
                                               {"album_id":3085,"s":{"id":2154,"title":"01 Se Pieta","track_id":"","song_info":"{\"type\":\"audio/mp3\",\"size\":2.11,\"duration\":\"00:02:18\",\"artists\":{\"items\":[]}}","metadata_json":"\"\"","created_by_id":1298,"updated_by_id":1298,"created_on":"2016-04-04T08:57:44.987","updated_on":"2016-04-04T08:57:44.987","datamode":"A"},
                                               "song_id":2154,"link":"https://smmediaservicestorage.blob.core.windows.net:443/asset-018b42d0-01a6-43ed-8fc1-268bc2461e27/01%20Se%20Pieta.mp3?sv=2012-02-12&sr=c&si=4b08aa67-d158-49df-a5c7-5a631fc89d6d&sig=s42gwcEn%2F%2FMwb1GML6D2pVeDljCRLjuU2lS%2FV78TYzs%3D&se=2017-04-04T08%3A53%3A25Z"},
                                               {"album_id":3085,"s":{"id":2155,"title":"07 Habenera","track_id":"","song_info":"{\"type\":\"audio/mp3\",\"size\":1.87,\"duration\":\"00:02:02\",\"artists\":{\"items\":[]}}","metadata_json":"\"\"","created_by_id":1298,"updated_by_id":1298,"created_on":"2016-04-04T08:57:45.33","updated_on":"2016-04-04T08:57:45.33","datamode":"A"},
                                               "song_id":2155,"link":"https://smmediaservicestorage.blob.core.windows.net:443/asset-8e79235e-2127-4774-990d-cf542340136c/07%20Habenera.mp3?sv=2012-02-12&sr=c&si=4cf71c75-fe50-4b7c-b7ff-07d4e5ef0eae&sig=MaPJyRG3j9X4phG5Agk4MuJ%2BreCAo4ZojWy7pw1cUlQ%3D&se=2017-04-04T08%3A57%3A02Z"},
                                               {"album_id":3085,"s":{"id":2156,"title":"04 Rêve d'amour","track_id":"","song_info":"{\"type\":\"audio/mp3\",\"size\":2.18,\"duration\":\"00:02:22\",\"artists\":{\"items\":[]}}","metadata_json":"\"\"","created_by_id":1298,"updated_by_id":1298,"created_on":"2016-04-04T09:23:25.807","updated_on":"2016-04-04T09:23:25.807","datamode":"A"},"song_id":2156,"link":"https://smmediaservicestorage.blob.core.windows.net:443/asset-0dfe160d-9ee9-4260-abb3-6b54937673fd/04%20R%C3%AAve%20d'amour.mp3?sv=2012-02-12&sr=c&si=beb0de4b-c129-4483-a393-d4e9b78bf103&sig=bQJ%2FC5FKjSLzyi4PiCXxas5%2FQ4qZoqE7RrtNt%2BRD0UE%3D&se=2017-04-04T09%3A21%3A22Z"},{"album_id":3085,"s":{"id":2157,"title":"05 Debussy's Suite","track_id":"","song_info":"{\"type\":\"audio/mp3\",\"size\":2.14,\"duration\":\"00:02:20\",\"artists\":{\"items\":[]}}","metadata_json":"\"\"","created_by_id":1298,"updated_by_id":1298,"created_on":"2016-04-04T09:23:26.29","updated_on":"2016-04-04T09:23:26.29","datamode":"A"},"song_id":2157,"link":"https://smmediaservicestorage.blob.core.windows.net:443/asset-e0a87298-7099-404d-ac79-b22a1983443f/05%20Debussy's%20Suite.mp3?sv=2012-02-12&sr=c&si=8ec63401-faf1-4cad-b419-0f09b255db29&sig=Qjq5rU7%2B%2FKZb0XXY%2F%2Byg%2BGveJkYHAlhFalr00M9u4VE%3D&se=2017-04-04T09%3A22%3A03Z"},{"album_id":3085,"s":{"id":2158,"title":"06 Gnossienne No","track_id":"","song_info":"{\"type\":\"audio/mp3\",\"size\":1.49,\"duration\":\"00:01:37\",\"artists\":{\"items\":[]}}","metadata_json":"\"\"","created_by_id":1298,"updated_by_id":1298,"created_on":"2016-04-04T09:23:26.383","updated_on":"2016-04-04T09:23:26.383","datamode":"A"},"song_id":2158,"link":"https://smmediaservicestorage.blob.core.windows.net:443/asset-6573722a-7aa6-47aa-aeee-95ca97447e00/06%20Gnossienne%20No.%201%20(Buddha%20Bar%20Remix).mp3?sv=2012-02-12&sr=c&si=afabd4ae-7b34-4209-bf56-2f8ad85af83d&sig=raWBD6kEWj98ypdt6UPMQbleTD6pFb6z0dyn2zsW5vw%3D&se=2017-04-04T09%3A22%3A26Z"},{"album_id":3085,"s":{"id":2159,"title":"08 Piangero","track_id":"","song_info":"{\"type\":\"audio/mp3\",\"size\":1.38,\"duration\":\"00:01:30\",\"artists\":{\"items\":[]}}","metadata_json":"\"\"","created_by_id":1298,"updated_by_id":1298,"created_on":"2016-04-04T09:23:26.493","updated_on":"2016-04-04T09:23:26.493","datamode":"A"},"song_id":2159,"link":"https://smmediaservicestorage.blob.core.windows.net:443/asset-4f0d3e19-5b9d-424d-92aa-3267ce1f1f0a/08%20Piangero.mp3?sv=2012-02-12&sr=c&si=3d058215-298e-4f76-86df-c87ce302a501&sig=EQoHSSg3WwUbuPcpPLsdQ6bvWNH2PsuJidsJav79d9o%3D&se=2017-04-04T09%3A22%3A51Z"},{"album_id":3085,"s":{"id":2160,"title":"11 Electro Queen","track_id":"","song_info":"{\"type\":\"audio/mp3\",\"size\":2.13,\"duration\":\"00:02:19\",\"artists\":{\"items\":[]}}","metadata_json":"\"\"","created_by_id":1298,"updated_by_id":1298,"created_on":"2016-04-04T09:23:26.633","updated_on":"2016-04-04T09:23:26.633","datamode":"A"},"song_id":2160,"link":"https://smmediaservicestorage.blob.core.windows.net:443/asset-20a4523c-826e-48f9-a1a9-8751b7629218/11%20Electro%20Queen.mp3?sv=2012-02-12&sr=c&si=dcab110a-defc-4634-b52e-30e55915ba49&sig=TW2u9kwG4eF3x1WVKVFD0EC4zgdaBWbzETJYjrnF4EM%3D&se=2017-04-04T09%3A23%3A09Z"},{"album_id":3085,"s":{"id":2161,"title":"12 Nocturne in Paris","track_id":"","song_info":"{\"type\":\"audio/mp3\",\"size\":1.94,\"duration\":\"00:02:07\",\"artists\":{\"items\":[]}}","metadata_json":"\"\"","created_by_id":1298,"updated_by_id":1298,"created_on":"2016-04-04T09:23:26.727","updated_on":"2016-04-04T09:23:26.727","datamode":"A"},"song_id":2161,"link":"https://smmediaservicestorage.blob.core.windows.net:443/asset-4d1cafa9-df0b-4e9f-8402-effe7c5d3758/12%20Nocturne%20in%20Paris.mp3?sv=2012-02-12&sr=c&si=5ff8b557-44da-4610-a645-b8f3adae683d&sig=k5SyCLGNX%2FEONv9af2XVfy9VTfHun09KYmgOd6Icrcc%3D&se=2017-04-04T09%3A23%3A22Z"}]}}
                        ////
[{"Id":2154,"Title":"01 Se Pieta","Duration":"NaN:NaN:NaN","URL":"https://smmediaservicestorage.blob.core.windows.net:443/asset-018b42d0-01a6-43ed-8fc1-268bc2461e27/01%20Se%20Pieta.mp3?sv=2012-02-12&sr=c&si=4b08aa67-d158-49df-a5c7-5a631fc89d6d&sig=s42gwcEn%2F%2FMwb1GML6D2pVeDljCRLjuU2lS%2FV78TYzs%3D&se=2017-04-04T08%3A53%3A25Z"}]
    