$(function(){


		var wrapper = $('.base-menu'), //菜单容器
			baseMenus = $('.base-menu .menu dt'); //一级菜单

		var side = $('.side'); //侧栏

		// 动态计算菜单高度
		wrapper.css({
			height:(baseMenus.length - 2) * 50 
		});

		side.on('mouseover',function(){

			// 获取以及菜单列表ul
			var t = $('.base-menu ul').eq(0);

			// 隐藏菜单列表ul
			t.css({
				position:'absolute',
				left:-200,
				top:50,
				width:'100%',
				zIndex:99,
				opacity:0
			});

			// 隐藏所有二级菜单
			$('.base-menu').find('.sub-menu').hide();

			// 把上一个选中菜单显示出来
			$('.base-menu ul li.hidden').removeClass('hidden');
			
			// 把除上一个选中菜单以外的显示出来
			t.find('li').removeClass('invisible');
			// 并且隐藏所有的二级菜单
			// t.find('li .sub-menu').hide();

			// 隐藏侧栏
			side.hide();

			// 菜单左侧滑出
			t.animate({
				left:0,
				opacity:1
			},200);
		});

		baseMenus.each(function(i){
			$(this).on('click',function(){

				var top = (i + 1) * 50;
				var item = $(this).closest('li');

				// 克隆当前选中菜单
				var cloneItem = item.clone();

				// 侧栏置顶
				side.css({
					top:0,
					zIndex:90		
				});

				
				cloneItem.addClass('float-top');

				// 切换当前选中菜单
				$('.base-menu ul li.now').removeClass('now');
				$(this).closest('li').addClass('now');

				// 初始样式
				cloneItem.css({
					position:'absolute',
					top:top,
					left:0,
					zIndex:101
				});
				
				// 隐藏其它
				$('.base-menu li').addClass('invisible');
				$('.s').remove();
				$('.base-menu').append("<ul class='s'>" + cloneItem.get(0).outerHTML + '</ul>');
				
				side.show();

				// 新插入的当前选中菜单动画上移
				$('.s .float-top').animate({
					top:0
				},300,function(){
					side.css({
						top:50,
						zIndex:102
					});
					item.addClass('hidden');
					item.addClass('now');
					$('.s .float-top').find('.sub-menu').slideDown();
				});

			});
		});

		var contentBody = $('.main-wrapper .body'),
			mask = $('.mask');

		function _inlineSubMenuClick(obj){
			var me = $(obj);
				mask.show();

			contentBody.load(me.data('href'),function(){
				$('.chosen').removeClass('.chosen');

				me.addClass('chosen');
				mask.hide();

				$(window).get(0).scrollTo(0, 0, 1000);
			});
		}

		$('.breadboard ul').on('click','li',function(){
			_inlineSubMenuClick(this);
		});

		$('.menu-wrapper').on('click','.sub-menu li',function(){
			_inlineSubMenuClick(this);
		});

		function _inlineMouseleave(){
			$('.base-menu li').addClass('invisible');
			$('.base-menu .s li').removeClass('invisible');
			$('.base-menu .float-top,.breadboard .float-top').css({
				top:0
			});

			$('.float-top').find('.sub-menu').show();
			side.show();

			side.css({
						top:50,
						zIndex:102
					});
		}
			
		_inlineMouseleave();
		$('.menu-wrapper').on('mouseleave',function(){
			_inlineMouseleave();
		})

		function _inlineScroll(){
			if(window.scrollY >= 60){
				$('.breadboard,.base-menu,.mask').addClass('float-top');
			}else{
				$('.breadboard,.base-menu,.mask').removeClass('float-top');
			}
		}

		// 监听scroll
		_inlineScroll();
		$(window).on('scroll',function(){
			_inlineScroll();
		});
	});