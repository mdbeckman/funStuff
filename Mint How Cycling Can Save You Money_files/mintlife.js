/* ------------------------------------------

Tony Sirois & Justin Schwinghamer
Mint.com

------------------------------------------ */

$(document).ready(function(){

	/* Category chooser */
	$('.cat-chooser').click(function(e){
		if(Modernizr.csstransitions)	{
			$('nav[role="navigation"], header[role="banner"]').toggleClass('open');
			$('article .social').toggleClass('slide');
		}
		else	{
			$('nav[role="navigation"]').animate({'height': 245})
		}
		e.preventDefault();
	})
	
	/* Category closer */
	$('nav[role="navigation"] .close').click(function(){
		if(Modernizr.csstransitions)	{
			$('nav[role="navigation"], header[role="banner"]').toggleClass('open');
			$('article .social').toggleClass('slide');
		}
		else	{
			$('nav[role="navigation"]').animate({'height': 0})
		}
	})
	
	/* iPhone category chooser */
	$('.iphone-cat-chooser').click(function(e){
		$('nav[role="navigation"]').toggleClass('slide');
		$('.iphone-cat-chooser').toggleClass('slide');
		e.preventDefault();
	})
	
	/* Article social sharing */
	$('article').each(function(){
		var permaLink = $.trim($(this).find('.fb').attr('href'));
		var the_title = $.trim($(this).find("h1").text());
		$(this).find('.fb').sharrre({
			share: {
           		facebook: true
           	},
			url: permaLink,
			enableHover: false,
			template: '{total}',
			shorterTotal: false,
			click: function(options){
				window.open("http://www.facebook.com/sharer.php?u="+encodeURIComponent(permaLink)+"&t=Text", "", "toolbar=0, status=0, width=650, height=360");
			}
		});
		$(this).find('.tw').sharrre({
			share: {
           		twitter: true
           	},
			url: permaLink,
			enableHover: false,
			template: '{total}',
			shorterTotal: false,
			click: function(options){
				window.open("https://twitter.com/intent/tweet?url="+encodeURIComponent(permaLink)+"&text=" + encodeURIComponent(the_title) + "&via=mint", "", "toolbar=0, status=0, width=650, height=360");
			}
		});

        $(this).find('.su').sharrre({
            share: {
                stumbleupon: true
            },
            url: permaLink,
            enableHover: false,
            template: '{total}',
            shorterTotal: false,
            click: function(options){

                  window.open("http://www.stumbleupon.com/services/1.01/badge?url="+encodeURIComponent(permaLink)+"&text=" + encodeURIComponent(the_title) + "&via=mint", "", "toolbar=0, status=0, width=650, height=360");
            }
        });

        $(this).find('.pin').sharrre({
        share: {
            pinterest: true
        },
            url: permaLink,
            enableHover: false,
            template: '{total}',
            shorterTotal: false,
            click: function(options){

                window.open("http://www.pinterest.com/pin/create/button?url="+encodeURIComponent(permaLink)+"&text=" + encodeURIComponent(the_title) + "&via=mint", "", "toolbar=0, status=0, width=650, height=360");

        }
    });
	}) ;
	
		
	/* Scrolling functions */
	
	/* Smooth scroll */
	 function filterPath(string) {
	  return string
	    .replace(/^\//,'')
	    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
	    .replace(/\/$/,'');
	  }
	  var locationPath = filterPath(location.pathname);
	  var scrollElem = scrollableElement('html', 'body');
	
	  $('a[href*=#]').each(function() {
	    var thisPath = filterPath(this.pathname) || locationPath;
	    if (  locationPath == thisPath
	    && (location.hostname == this.hostname || !this.hostname)
	    && this.hash.replace(/#/,'') ) {
	      var $target = $(this.hash), target = this.hash;
	      if (target) {
	        var targetOffset = $target.offset().top;
	        $(this).click(function(event) {
	          event.preventDefault();
	          $(scrollElem).animate({scrollTop: targetOffset}, 900, function() {
	            location.hash = target;
	          });
	        });
	      }
	    }
	  });
	
	  // use the first element that is "scrollable"
	  function scrollableElement(els) {
	    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
	      var el = arguments[i],
	          $scrollElement = $(el);
	      if ($scrollElement.scrollTop()> 0) {
	        return el;
	      } else {
	        $scrollElement.scrollTop(1);
	        var isScrollable = $scrollElement.scrollTop()> 0;
	        $scrollElement.scrollTop(0);
	        if (isScrollable) {
	          return el;
	        }
	      }
	    }
	    return [];
	  }
	  
	/* Sidebar Graphs */
	
	window.setTimeout(function(){
		var second = 1;
		var i = 0;
		var denominator = $('.graph .value').html();
		
		$('.graph .bar').each(function(){
			var offset = 100 - (($(this).parent().find('.value').html()/denominator) * 100);
			if(Modernizr.csstransitions)	{
				this.style.webkitTransitionDelay = second * 0.2  + 's';
				this.style.MozTransitionDelay = second * 0.2  + 's';
				this.style.webkitTransform = 'translate3d(-' + offset + '%,0,0)';
				this.style.MozTransform = 'translatex(-' + offset + '%)';
				second++;
			}
			else	{
				$(this).animate({'left' : '-' + offset + '%'})
			}	
		})
		
		$('.graph .labels').each(function(){
			this.style.webkitTransitionDelay = second * 0.2  + 's';
			this.style.MozTransitionDelay = second * 0.2  + 's';
			this.style.opacity =  1;
			second++
		})
		
		$('.graph .value').each(function(){
			this.style.webkitTransitionDelay = second * 0.2  + 's';
			this.style.MozTransitionDelay = second * 0.2  + 's';
			this.style.opacity =  1;
			second++;
		})
	}, 3000)
	
	/* Launch Feature footer */
	if($.cookie('wa_login') == null){ // If the wa_login cookie is absent (if the user is not a current active user)
		window.setTimeout(function(){
			if(Modernizr.csstransitions)	{
				$('footer.feature').removeClass('off');
			}
			else	{
				$('footer.feature').animate({'bottom': -508})
			}	
		}, 7000)
	} else	{
		$('footer.feature').remove();
	}
	
	$('footer.feature header .button').click(function(e){
		if(Modernizr.csstransitions)	{
			var videoOffset = ($(window).width() - 700) / 2;
			var posterOffset = ($(window).width() - 811) / 2;
			if(!$('footer.feature section .icon').length){
				$('footer.feature section .content').html('<video preload width="700" style="left: ' + videoOffset + 'px"><source src="/blog/wp-content/themes/greensilence/video/mint-overview-ios.m4v" type="video/mp4" media="all and (max-device-width:480px)"/><source src="/blog/wp-content/themes/greensilence/video/mint-overview.m4v" type="video/mp4" media="all"/><source src="/blog/wp-content/themes/greensilence/video/mint-overview.ogv" type="video/ogg" media="all"/>Your browser doesn\'t support HTML5 video.</video><div class="poster visible" style="left: ' + posterOffset + 'px"/><div class="copy visible"><p>Mint pulls all your financial accounts into one place. Set a budget, track your goals <br/>and do more with your money, for free!</p><a class="button orange" href="https://wwws.mint.com/login.event?task=S"><span class="cta-arrow-right">Free! Get started now</span></a></div>');
			};
			$('footer.feature').toggleClass('open');
		}
		else	{
			window.location = 'https://www.mint.com/how-it-works/';
		}
		e.preventDefault();		
	})
	
	/* Play feature video */
	$('footer.feature .poster').live('click',function(){
		$(this).toggleClass('visible');
		$('footer.feature .copy').toggleClass('visible');
		var video = document.getElementsByTagName('video')[0];
		$(video).toggleClass('visible');
		if (video.paused) {
    		video.play();
  		} else {
    		video.pause();
  		};
	})
	
	/* Embed infographic */
	$('.embed-infog').click(function(e){
		var previewImage = $(this).attr('href');
		var fullImage = $(this).attr('title');
		var link = $(this).attr('data-link');
		var docHeight = $(document).height();
		var windowWidth = $(window).width();
		var modalOffset = (windowWidth - 412) / 2;
		
		/* Set overlay */
		$('body').append('<div class="overlay" style="height: ' + docHeight + 'px"/>');
		window.setTimeout(function(){
			$('.overlay').addClass('visible');
		}, 1000);
		
		/* Set modal popup */
		$('<section/>').appendTo('body').addClass('modal').html('<a class="close" href="#"></a><h1>Embed this Infographic</h1><form><label>Copy and paste this code into your blog or website.</label><textarea><a href="' + link + '"><img src="' + fullImage + '"/></a></textarea><label>Preview</label><figure><img class="preview" src="' + previewImage + '"/></figure></form>').css({'left' : modalOffset});
		window.setTimeout(function(){
			$('.modal').addClass('visible');
		}, 1000);
		e.preventDefault();

	})
	
	/* Embed close */
	$('.modal .close').live('click', function(e){
		$(this).parent().removeClass('visible');
		$('.overlay').removeClass('visible');
		window.setTimeout(function(){
			$('.modal, .overlay').remove();
		}, 1000);
		e.preventDefault();
	})

	/* Disable next button on category page 
	   when on last page  */
	var prev = $("#prev").text(),
		next = $("#next").text();

		if(prev === next) {
			var button = $(".next");
			button.addClass("disabled");
			$(button).click(function(e) {
				e.preventDefault();
			});
		}

// Analytics click tracking
	$("a#signup").on("click", function() {
		waGlobalNav('topnav','','sign up','scid','textlink','',$(this));
	});

	$("a#login").on("click", function(){
		waGlobalNav('topnav','','log in','scid','textlink','',$(this));
	});

	$(".cat-chooser").on("click", function() {
		waGlobalNav('mainnav','','browse categories','','textlink','',$(this));
	});

	$("footer.feature .closed").on("click", function() {
		waGlobalNav('footernav','','learn more','','textlink','',$(this));
	});

	$("footer.feature a.button").on("click", function() {
		waGlobalNav('footernav','','free get started now','scid','textlink','',$(this));
	});

	$(".tw").on("click", function() {
		waLinkClick($(this),'social','link','twitter');
	});

	$(".fb").on("click", function() {
		waLinkClick($(this),'social','link','facebook');
	});

		

})  // end doc.ready
