$(document).ready(function() {
		// 巡覽列按鈕
		$('#ph_nav_btn').click(function(event) {
			if ($('#ph_nav_btn.is-active ').length<1) {
				$(this).addClass('is-active');
				$('.collapse').css('display', 'block');
				TweenMax.fromTo( '.collapse', 0.5, { opacity:0, top:70},{ opacity:1, top:34 });
			}
			else{
				$(this).removeClass('is-active');
				TweenMax.to( '.collapse', 0.5, { opacity:0, top:70});
				setTimeout("$('.collapse').css('display', 'none')", 500);
			}
		});

        //切換按鈕
		$('.ch_tool_btn a').click(function(event) {
			if ($(this).find('span').css('height')!='100%'){
				$('.ch_tool_btn a span').css('height', '0%');
               TweenMax.to( $(this).find('span'), 0.2, {height:'100%'});
			}
		});


		//放大鏡
		$('.txt_big_btn a').click(function(event) {
			var html_size=parseInt($('html').css('font-size').substr(0,2));
			if (html_size<16) {
				$('html').css('font-size', (html_size+2)+'px');
			}
			else{
				$('html').css('font-size', '12px');
			}
		});


		// 更多按鈕
		$('#more_btn').click(function(event) {
			if ($('.more_tool_btn').css('display')=='none') {

			   $('.more_tool_btn').css('display', 'block');
			   $('.more_tool_btn').css('left', $(this).offset().left);
               TweenMax.fromTo( '#qr_btn', 0.5, { opacity:0, bottom:0},{ opacity:1, bottom:50 });
               TweenMax.fromTo( '#link_btn', 0.5, { opacity:0, bottom:0},{ opacity:1, bottom:80 });
			}
			else{
			   TweenMax.to( '.more_tool_btn', 0.5, { opacity:0, bottom:0});
			   setTimeout("$('.more_tool_btn').css('display', 'none')", 500);
			}

			console.log($(this).offset().left);
		});


	});