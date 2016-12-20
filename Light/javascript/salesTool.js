$(document).ready(function() {

  $('.reset').on('click', function() {
		localStorage.clear();
		window.location.reload();
	});

  $('.pull').on('click', function() {
    $('#editWindow').toggleClass('open');
  });

  $(".c1").spectrum({
      allowEmpty:true,
      color: "#03a9f4",
      showInput: true,
      containerClassName: "full-spectrum",
      showInitial: true,
      showPalette: true,
      showSelectionPalette: true,
      //- showAlpha: true,
      maxPaletteSize: 10,
      preferredFormat: "hex",
      localStorageKey: "spectrum.demo"
  });

  $(".c2").spectrum({
      allowEmpty:true,
      color: "#ff9800",
      showInput: true,
      containerClassName: "full-spectrum",
      showInitial: true,
      showPalette: true,
      showSelectionPalette: true,
      //- showAlpha: true,
      maxPaletteSize: 10,
      preferredFormat: "hex",
      localStorageKey: "spectrum.demo"
  });

  var colorValue1 = $(".c1").spectrum("get");
  var colorValue2 = $(".c2").spectrum("get");

  colorsObj = new Object();

	$("input[type=color]").change(function() {
	  colorKey = $(this).attr('class');
	  colorValue = $(this).val().replace("#", "");
	  createParams(colorKey, colorValue);

		var updatedCSS = $('#sheet1').attr('href');

		var colorValue1 = $(".c1").spectrum("get");
		var colorValue2 = $(".c2").spectrum("get");

		$('p.colorText1').text(colorValue1);
		$('p.colorText2').text(colorValue2);
	});

	function createParams (colorKey, colorValue) {
	  colorsObj[colorKey] = colorValue;
    var str = $('#sheet1').attr('href');
    var nIndex = str.indexOf(".php");
    var mood = str.substr(4, nIndex - 4);
	  tempTxt = "php/" + mood + ".php?" + $.param(colorsObj);
	  $("#sheet1").attr("href", tempTxt);
	};

  $('#moodChoice').on('change', function() {
    if ($(this).val() == 'A') {
      window.location = "../Center";
    } else if ($(this).val() == 'B') {
      window.location = "../Dark";
    } else {
      window.location = "./";
    }
	});

  $('#topicChoice').on('change', function() {
    if ($(this).val() == 'One') {
      $("#micrositeWrapper nav").css('display','none');
    } else {
      $("#micrositeWrapper nav").css('display','block');
    }
	});

  $('#changeTitle').on('input',function() {
    $('#wayFinderContainer h1').text($(this).val());
    if ($(this).val() == '') {
      $('#wayFinderContainer h1').text('Curabitur venenatis mauris finibus nisi hendrerit, sed semper lacus.');
    }
  });

  $('#layoutChoice').on('change', function() {
    if ($(this).val() == 'A') {
      $("#featuredAssets").css('display','block');
      $("#assetsListing").css('display','block');
    } else if ($(this).val() == 'B') {
      $("#featuredAssets").css('display','block');
      $("#assetsListing").css('display','none');
    } else if ($(this).val() == 'C') {
      $("#featuredAssets").css('display','none');
      $("#assetsListing").css('display','block');
    }
	});

  $('#socialChoice').on('change', function() {
    if ($(this).val() == 'A') {
      $("#widgetsOuterContainer").css('display','block');
    } else if ($(this).val() == 'B') {
      $("#widgetsOuterContainer").css('display','none');
    }
	});

  var videoHTML = $('#videoPlayerContainer>div'),
      videoTagID = videoHTML.attr('id'),
      myPlayer,
      vidID = videoHTML.data('video-id'),
      playlistID = videoHTML.data('playlist-id'),
      body = $('body');

  $('#heroChoice').on('change', function() {
    if ($(this).val() == 'SA') {
      if ($('#heroPlayerContainer').length == 1) {
        $('#heroPlayerContainer').css('display','none');
        var assetHTML = $('<div id="heroAssetContainer"><a class="m-exitLink" id="heroImage" href="http://searchcloudstorage.techtarget.com/Embedded-Demo-Center-Asset/document/1447267428_342" target="_blank"><div id="heroOverlay"><h2 class="overlayTitle">How Converged Infrastructure Makes IT Easy</h2><p class="overlayCTA">Learn More<i class="icon-lightbulb"></i></p></div><div id="heroImageContainerOuter"><div id="heroImageContainerInner"><img src="http://cdn.ttgtmedia.com/microsites/democenterasset/images/Asset-Hero1.jpg"></div></div></a></div></div>');
        $(assetHTML).insertAfter('#wayFinder');
      }
    } else if ($(this).val() == 'SV') {
      if ($('#heroAssetContainer').length == 1) {
        function msToTime(duration) {
          var milliseconds = parseInt((duration%1000)/100)
          , seconds = parseInt((duration/1000)%60)
          , minutes = parseInt((duration/(1000*60))%60)
          , hours = parseInt((duration/(1000*60*60))%24);

          hours = (hours < 10) ? "0" + hours : hours;
          minutes = (minutes < 10) ? "0" + minutes : minutes;
          seconds = (seconds < 10) ? "0" + seconds : seconds;

          if(hours < 1){
            return minutes + ":" + seconds;
          } else {
            return hours + ":" + minutes + ":" + seconds;
          }
        }

        $('#heroAssetContainer').css('display','none').removeClass('show');
        $('#heroPlaylistContainer, #heroPlaylistInfoContainer').css('display','none').removeClass('show');

        videojs('video-1').catalog.getVideo('5214501353001', function(error, video) {
          if (error) { console.log('Video error', error);
          } else {

            var w = video.duration;
            var tf = w.toFixed(3);
            var x = tf.toString();
            var y = x.replace(/\./g, '');
            var z = parseInt(y,10);

            $('.overlayDuration').html('<i class="icon-video-camera"></i>' + ' ' + 'Video: ' + msToTime(z)).show();
            $('.overlayTitle').html(video.name).show();
            $('.overlayCTA').show();
            $('.spinner').remove();

            videojs('video-1').catalog.load(video);

            $('#heroImage').on('click tapone',function(){

              videojs('video-1').catalog.load(video);

              $('#videoPlayerContainer').addClass('show');
              $('#heroImage').addClass('vjs-selected');
              $('.vjs-playlist .vjs-playlist-item.vjs-selected .vjs-playlist-thumbnail').addClass('show');
              $('#heroOverlay').hide();

              videojs('video-1').play();

              if(body.hasClass('header-desktop-fixed')){
                $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 57},750);
              } else if(body.hasClass('header-mobile-fixed')) {
                $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 60},750);
              } else {
                $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 157},750);
              }
            });
          }
         });


        $('#heroPlayerContainer').css('display','block');
      }
    } else if ($(this).val() == 'MV'){
      $('#heroAssetContainer').css('display','none');
      $('#heroPlayerContainer').css('display','block');
      videojs('video-1').catalog.getPlaylist('5146939306001', function(error, playlist){
        if (error) { console.log('Playlist error',error);
        } else {
          videojs('video-1').catalog.load(playlist);

          var i = 0;
          var videosExists = false;
          var y = setInterval(function() {
            checkVideos();
          },1000);

          function checkVideos() {
            $('.vjs-playlist-ad-overlay').remove();
            if (i > 10) {
              clearInterval(y);
            } else if ($(".vjs-playlist li").length >= 2) {
              clearInterval(y);
              videosExists = true;
              //perform your actions here
              if ($('.bx-wrapper').length < 1) {
                $('.vjs-playlist').bxSlider({
                  minSlides:1,
                  maxSlides: 4,
                  infiniteLoop: false,
                  slideMargin: 10,
                  slideWidth: 260,
                  moveSlides: 1,
                  nextSelector: '#slider-next',
                  prevSelector: '#slider-prev',
                  hideControlOnEnd: true
                });
              }

              if ($('.vjs-playlist-item').length == 2){
                // exactly 2
                $('.vjs-playlist').addClass('twoItems');
                $('#heroPlaylistInfoContainer').remove();
              } else if ($('.vjs-playlist-item').length == 3){
                // exactly 3
                $('.vjs-playlist,#heroPlaylistInfoContainer').addClass('threeItems');
                $('.videoInfo').text($('.vjs-playlist-item').length + ' Videos');
              } else if ($('.vjs-playlist-item').length == 4){
                // exactly 4
                $('.vjs-playlist,#heroPlaylistInfoContainer').addClass('fourItems');
                $('.videoInfo').text($('.vjs-playlist-item').length + ' Videos');
              } else {
                $('.vjs-playlist,#heroPlaylistInfoContainer').addClass('manyItems');
                $('.videoInfo').text($('.vjs-playlist-item').length + ' Videos');
              }

              $('.overlayDuration').html('<i class="icon-video-camera"></i>' + ' ' + 'Video: ' + $('.vjs-playlist-item:first-child .vjs-playlist-duration').text());
              $('.overlayTitle').html($('.vjs-playlist-item:first-child .vjs-playlist-name').text()).show();
              $('.overlayCTA').show();

              $('.bx-next').html('<i class="icon-play"></i>');
              $('.bx-prev').html('<i class="icon-play"></i>');

              $('.spinner').remove();

              var item;
              for (item = 0; item < $('.vjs-playlist-item').length; item++){
                var img = $('.vjs-playlist-thumbnail img')[item];
                img.src = playlist[item].poster;
              }

              $('#heroPlaylistContainer, #heroPlaylistInfoContainer').fadeIn('fast').addClass('show');

              $('#heroImage,.vjs-playlist .vjs-playlist-item').on('click tapone',function(){
                var itemIndex = $(this).index($(this).parent());
                videojs('video-1').playlist.currentItem(itemIndex);

                $('#videoPlayerContainer').addClass('show');
                $('#heroImage').addClass('vjs-selected');
                $('.vjs-playlist .vjs-playlist-item.vjs-selected .vjs-playlist-thumbnail').addClass('show');
                $('#heroOverlay').hide();

                videojs('video-1').play();

                if(body.hasClass('header-desktop-fixed')){
                  $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 57},750);
                } else if(body.hasClass('header-mobile-fixed')) {
                  $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 60},750);
                } else {
                  $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 157},750);
                }
              });

              $('.vjs-playlist .vjs-playlist-item').each(function(){
                $(this).on('click tapone',function(){
                  $(this).find('.vjs-playlist-thumbnail').addClass('show');
                });
              });
            }
            i++;
          }
        }
      });
    }
	});
});