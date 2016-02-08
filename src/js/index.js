(function () {

  var sections = [
    $("#header"),
    $("#features"),
    $("#reasons"),
    $("#preorder")
  ]

  var featuresContainer = $('.features-container');

  var features = [
    {
      info: featuresContainer.find('#feature1-info'),
      img: featuresContainer.find('#feature1-img')
    }, {
      info: featuresContainer.find('#feature2-info'),
      img: featuresContainer.find('#feature2-img')
    }, {
      info: featuresContainer.find('#feature3-info'),
      img: featuresContainer.find('#feature3-img')
    }, {
      info: featuresContainer.find('#feature4-info'),
      img: featuresContainer.find('#feature4-img')
    }
  ]

  var currentFeature = 0;

  const MIN_SCROLL_CALLS = 5;
  const FEATURES_SECTION = 1;

  var upScrollCalls = 0;
  var downScrollCalls = 0;

  var scrollingDirection = "none";
  var currentSection = 0;
  var isAutoScrolling = false;

  function handleFeaturesSection () {
    if ((scrollingDirection == "up" && currentFeature == 0) || (scrollingDirection == "down" && currentFeature == features.length - 1)) {
      return true;
    }
    disappearFeature(features[currentFeature]);
    scrollingDirection == "up" ? currentFeature-- : currentFeature++;
    appearFeature(features[currentFeature])
    return false;
  }

  function initializeFeaturesSection () {
    if (scrollingDirection == "up") {
      currentFeature = features.length - 1;
    } else if (scrollingDirection == "down") {
      currentFeature = 0;
    }
    appearFeature(features[currentFeature]);
  }

  function appearFeature (feature) {
    feature.info.removeClass("feature-info-hidden");
    feature.img.removeClass("feature-img-hidden");
  }

  function disappearFeature (feature) {
    feature.info.addClass("feature-info-hidden");
    feature.img.addClass("feature-img-hidden");
  }

  $('body').on("mousewheel", function (e) {
    if (!isAutoScrolling) {
      if(e.originalEvent.wheelDelta / 120 > 0) {
        upScrollCalls++;
        if (upScrollCalls > MIN_SCROLL_CALLS && scrollingDirection !== "up" && currentSection - 1 >= 0) {
          var sectionChanged = true;
          scrollingDirection = "up";
          isAutoScrolling = true;
          if (currentSection === FEATURES_SECTION) {
            sectionChanged = handleFeaturesSection();
          }
          if (sectionChanged) {
            currentSection--;
            if (currentSection === FEATURES_SECTION) {
              initializeFeaturesSection();
            }
            $('html, body').animate({
              scrollTop: sections[currentSection].offset().top
            }, 1000, function () {
              setTimeout(function () {
                upScrollCalls = 0;
                isAutoScrolling = false;
                scrollingDirection = "none";
              }, 1000)
            });
          } else {
            setTimeout(function () {
              if (scrollingDirection == "up") {
                upScrollCalls = 0;
              } else if (scrollingDirection == "down") {
                downScrollCalls = 0;
              }
              scrollingDirection = "none";
              isAutoScrolling = false;
            }, 1000)
          }
        }
      } else {
        downScrollCalls++;
        if (downScrollCalls > MIN_SCROLL_CALLS &&  scrollingDirection !== "down" && currentSection + 1 < sections.length) {
          var sectionChanged = true;
          scrollingDirection = "down";
          isAutoScrolling = true;
          if (currentSection === FEATURES_SECTION) {
            sectionChanged = handleFeaturesSection();
          }
          if (sectionChanged) {
            currentSection++;
            if (currentSection === FEATURES_SECTION) {
              initializeFeaturesSection();
            }
            $('html, body').animate({
              scrollTop: sections[currentSection].offset().top
            }, 1000, function () {
              setTimeout(function () {
                downScrollCalls = 0;
                isAutoScrolling = false;
                scrollingDirection = "none";
              }, 1000)
            });
          } else {
            setTimeout(function () {
              if (scrollingDirection == "up") {
                upScrollCalls = 0;
              } else if (scrollingDirection == "down") {
                downScrollCalls = 0;
              }
              scrollingDirection = "none";
              isAutoScrolling = false;
            }, 1000)
          }
        }
      }
    }
    e.preventDefault();
    e.stopPropagation();
  });
})();
