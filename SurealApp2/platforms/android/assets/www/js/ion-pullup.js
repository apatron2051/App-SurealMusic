
//Look for Sureal Music Custom Code

angular.module('ionic-pullup', [])
  .constant('ionPullUpFooterState', {
      COLLAPSED: 'COLLAPSED',
      MINIMIZED: 'MINIMIZED',
      EXPANDED: 'EXPANDED'
  })
  .constant('ionPullUpFooterBehavior', {
      HIDE: 'HIDE',
      EXPAND: 'EXPAND'
  })
  .directive('ionPullUpFooter', ['$timeout', '$rootScope', '$window', '$ionicPlatform', function ($timeout, $rootScope, $window, $ionicPlatform) {
      return {
          restrict: 'AE',
          scope: {
              onExpand: '&',
              onCollapse: '&',
              onMinimize: '&'
          },
          controller: ['$scope', '$element', '$attrs', 'ionPullUpFooterState', 'ionPullUpFooterBehavior', 'surealMusicServices', '$ionicPopup', '$state', function ($scope, $element, $attrs, FooterState, FooterBehavior, surealMusicServices,$ionicPopup, $state) {
              var
                tabs, hasBottomTabs, hideHeader, header, tabsHeight, headerHeight, handleHeight = 0,
                footer = {
                    height: 0,
                    posY: 0,
                    lastPosY: 0,
                    state: FooterState.COLLAPSED,
                    defaultHeight: $element[0].offsetHeight,
                    maxHeight: parseInt($attrs.maxHeight, 10) || 0,
                    hideHeader: $attrs.hideHeader,
                    initialState: $attrs.initialState ? $attrs.initialState.toUpperCase() : FooterState.COLLAPSED,
                    defaultBehavior: $attrs.defaultBehavior ? $attrs.defaultBehavior.toUpperCase() : FooterBehavior.EXPAND
                };

              function init() {


                  computeDefaultHeights();

                  $element.css({ 'transition': '300ms ease-in-out', 'padding': 0 });
                  if (tabs && hasBottomTabs) {
                      $element.css('bottom', tabs.offsetHeight + 'px');
                  }

              }

              function computeDefaultHeights() {
                  tabs = document.querySelector('.tabs');
                  hasBottomTabs = document.querySelector('.tabs-bottom');
                  header = document.querySelector('.bar-header');
                  tabsHeight = tabs ? tabs.offsetHeight : 0;
                  headerHeight = header ? header.offsetHeight : 0;

              }

              function computeHeights() {
                  footer.height = footer.maxHeight > 0 ? footer.maxHeight : $window.innerHeight - headerHeight - handleHeight - tabsHeight;
                  $element.css({ 'height': footer.height + 'px' });

                  if (footer.initialState == FooterState.MINIMIZED) {
                      minimize();
                  } else {
                      collapse();
                  }
              }

              function updateUI() {

                  $timeout(function () {
                      computeHeights();
                  }, 300);


              }

              function recomputeAllHeights() {
                  computeDefaultHeights();
                  footer.height = footer.maxHeight > 0 ? footer.maxHeight : $window.innerHeight - headerHeight - handleHeight - tabsHeight;
              }

              function expand() {
                  // recompute height right here to make sure we have the latest

                  recomputeAllHeights();
                  footer.state = FooterState.EXPANDED;
                  var headerName = "#" + $attrs.hideHeader;

                  var myElement = document.querySelector(headerName);
                  myElement.style.height = "0vh";


                  footer.lastPosY = 0;
                  // adjust CSS values with new heights in case they changed
                  $element.css({ 'height': footer.height + 'px', '-webkit-transform': 'translate3d(0, 0, 0)', 'transform': 'translate3d(0, 0, 0)' });
                  $scope.onExpand();


              }


              this.setHandleHeight = function (height) {
                  handleHeight = height;
                  computeHeights();
              };

              this.getHeight = function () {
                  return $element[0].offsetHeight;
              };

              this.getBackground = function () {
                  return $window.getComputedStyle($element[0]).background;
              };


              //*********************************************************************************************************
              //Sureal Music custom Modifications
              //*********************************************************************************************************

              this.onDoubleTap = function (e) {
                  e.gesture.srcEvent.preventDefault();
                  e.gesture.preventDefault();

                 

                  if (surealMusicServices.getCurrentSong() != null && surealMusicServices.getCurrentSong() != "") {
          
                      $state.go("tab.player");
                      //$ionicNativeTransitions.locationUrl("/tab/player", {
                      //    "type": "slide",
                      //    "direction": "up", // 'left|right|up|down', default 'left' (which is like 'next')
                      //    "duration": 200 // in milliseconds (ms), default 400
                      //});



                    
                  }
                  else
                  {
                      var alertPopup = $ionicPopup.alert({
                          cssClass: "surealPopup",
                          title: 'Sureal Music',
                          template: 'Please select an Album, Playlist or Song'
                      });

                      $timeout(function () {
                          alertPopup.close(); //close the popup after 3 seconds for some reason
                      }, 3000);
                  }
              };

              //*********************************************************************************************************
              //Sureal Music custom Modifications
              //*********************************************************************************************************
              this.onTap = function (e) {
                  e.gesture.srcEvent.preventDefault();
                  e.gesture.preventDefault();
              };


              function collapse() {
                  footer.lastPosY = (tabs && hasBottomTabs) ? footer.height - tabsHeight : footer.height - footer.defaultHeight;
                  $element.css({ '-webkit-transform': 'translate3d(0, ' + footer.lastPosY + 'px, 0)', 'transform': 'translate3d(0, ' + footer.lastPosY + 'px, 0)' });
                  $scope.onCollapse();

                  //Sureal Music custom Modifications
            //      setTimeout(expandFooter, 400);

              }

              init();

              $ionicPlatform.ready(function () {
                  $window.addEventListener('orientationchange', updateUI);
                  $ionicPlatform.on("resume", updateUI);
              });

          }],
          compile: function (element, attrs) {
              attrs.defaultHeight && element.css('height', parseInt(attrs.defaultHeight, 10) + 'px');

              //*********************************************************************************************************
              //Sureal Music Custom Code
              //*********************************************************************************************************
              element.addClass('mini-player-bar mini-player-bar-footer');
          }
      }
  }])
  //*********************************************************************************************************
     //SurealMusic Custom Code
     //*********************************************************************************************************
  .directive('ionPullUpTrigger', ['$ionicGesture', function ($ionicGesture) {
      return {
          restrict: 'AE',
          require: '^ionPullUpFooter',
          link: function (scope, element, attrs, controller) {
              // add gesture
              $ionicGesture.on('doubletap', controller.onDoubleTap, element);
              $ionicGesture.on('tap', controller.onTap, element);
          
          }
      }
  }]);