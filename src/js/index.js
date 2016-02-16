// $(document).ready(function () {
//   $.scrollify({
//       section : ".scrollify",
//       sectionName : "section-name",
//       easing: "easeOutExpo",
//       scrollSpeed: 1100,
//       offset : 0,
//       scrollbars: true,
//       standardScrollElements: "",
//       before:function() {},
//       after:function() {},
//       afterResize:function() {},
//       afterRender:function() {}
//   });
// });
// (function () {
//
//   var sections = [
//     $("#header"),
//     $("#features"),
//     $("#reasons"),
//     $("#preorder")
//   ]
//
//   const FEATURES_SECTION = 1;
//   const PREORDER_SECTION = 3;
//   const MIN_SCROLL_CALLS = 10;
//
//   var currentSection = 0;
//   var currentFeature = 0;
//
//   var upScrollCalls = 0;
//   var downScrollCalls = 0;
//
//   var scrollingDirection = "none";
//   var isAutoScrolling = false;
//
//   $(document).ready(function () {
//     initializeFeaturesSection()
//     var found;
//     sections.forEach(function (element, index) {
//       if (window.pageYOffset <= element.offset().top && !found) {
//         found = true;
//         currentSection = window.pageYOffset == element.offset().top ? index : index - 1;
//       }
//     });
//   });
//
//   var featuresContainer = $('.features-container');
//
//   var features = [
//     {
//       info: featuresContainer.find('#feature1-info'),
//       img: featuresContainer.find('#feature1-img')
//     }, {
//       info: featuresContainer.find('#feature2-info'),
//       img: featuresContainer.find('#feature2-img')
//     }, {
//       info: featuresContainer.find('#feature3-info'),
//       img: featuresContainer.find('#feature3-img')
//     }, {
//       info: featuresContainer.find('#feature4-info'),
//       img: featuresContainer.find('#feature4-img')
//     }
//   ]
//
//   function handleFeaturesSection () {
//     if ((scrollingDirection == "up" && currentFeature == 0) || (scrollingDirection == "down" && currentFeature == features.length - 1)) {
//       return true;
//     }
//     disappearFeature(features[currentFeature]);
//     scrollingDirection == "up" ? currentFeature-- : currentFeature++;
//     appearFeature(features[currentFeature])
//     return false;
//   }
//
//   function initializeFeaturesSection () {
//     disappearFeature(features[currentFeature]);
//     if (scrollingDirection == "up") {
//       currentFeature = features.length - 1;
//     } else if (scrollingDirection == "down") {
//       currentFeature = 0;
//     }
//     appearFeature(features[currentFeature]);
//   }
//
//   function appearFeature (feature) {
//     feature.info.removeClass("feature-info-hidden");
//     feature.img.removeClass("feature-img-hidden");
//   }
//
//   function disappearFeature (feature) {
//     feature.info.addClass("feature-info-hidden");
//     feature.img.addClass("feature-img-hidden");
//   }
//
//   $('body').on("mousewheel", function (e) {
//     if (!isAutoScrolling) {
//       if(e.originalEvent.wheelDelta / 120 > 0) {
//         downScrollCalls = 0;
//         upScrollCalls++;
//         if (upScrollCalls > MIN_SCROLL_CALLS && scrollingDirection !== "up" && currentSection - 1 >= 0) {
//           var sectionChanged = true;
//           scrollingDirection = "up";
//           isAutoScrolling = true;
//           if (currentSection === FEATURES_SECTION) {
//             sectionChanged = handleFeaturesSection();
//           }
//           if (sectionChanged) {
//             currentSection--;
//             if (currentSection === FEATURES_SECTION) {
//               initializeFeaturesSection();
//             }
//             $('html, body').animate({
//               scrollTop: sections[currentSection].offset().top
//             }, 500, function () {
//               setTimeout(function () {
//                 upScrollCalls = 0;
//                 isAutoScrolling = false;
//                 scrollingDirection = "none";
//               }, 2000)
//             });
//           } else {
//             setTimeout(function () {
//               if (scrollingDirection == "up") {
//                 upScrollCalls = 0;
//               } else if (scrollingDirection == "down") {
//                 downScrollCalls = 0;
//               }
//               scrollingDirection = "none";
//               isAutoScrolling = false;
//             }, 2000)
//           }
//         }
//       } else {
//         upScrollCalls = 0;
//         downScrollCalls++;
//         if (downScrollCalls > MIN_SCROLL_CALLS &&  scrollingDirection !== "down" && currentSection + 1 < sections.length) {
//           var sectionChanged = true;
//           scrollingDirection = "down";
//           isAutoScrolling = true;
//           if (currentSection === FEATURES_SECTION) {
//             sectionChanged = handleFeaturesSection();
//           }
//           if (sectionChanged) {
//             currentSection++;
//             if (currentSection === FEATURES_SECTION) {
//               initializeFeaturesSection();
//             }
//             $('html, body').animate({
//               scrollTop: sections[currentSection].offset().top
//             }, 500, function () {
//               setTimeout(function () {
//                 downScrollCalls = 0;
//                 isAutoScrolling = false;
//                 scrollingDirection = "none";
//               }, 2000)
//             });
//           } else {
//             setTimeout(function () {
//               if (scrollingDirection == "up") {
//                 upScrollCalls = 0;
//               } else if (scrollingDirection == "down") {
//                 downScrollCalls = 0;
//               }
//               scrollingDirection = "none";
//               isAutoScrolling = false;
//             }, 2000)
//           }
//         }
//       }
//     }
//     e.preventDefault();
//     e.stopPropagation();
//   });
//
//   $('.js-video-selector').click(function () {
//     var currentVideo = $('.reasons-video:not(.video-hidden)');
//     currentVideo[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
//     currentVideo.addClass('video-hidden');
//     setTimeout(function () {
//       currentVideo[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
//     }, 2000)
//     var target = $(this).attr('data-target');
//     $(target).removeClass('video-hidden');
//   });
//
//   $('.js-preorder-button').click(function () {
//     currentSection = PREORDER_SECTION;
//     $('html, body').animate({
//       scrollTop: sections[currentSection].offset().top
//     }, 500);
//   });
//
//   $(".nav-link").click(function(e) {
//     var destination = $(this).attr('href');
//     var sectionIds = sections.map(function (obj) {
//       return "#" + obj.attr('id');
//     })
//     currentSection = sectionIds.indexOf(destination);
//     e.preventDefault();
//     $('html, body').animate({
//       scrollTop: $(destination).offset().top
//     }, 500);
//   });
// })();
