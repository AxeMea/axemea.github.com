 $.fn.iFreeLayer = function(args){

    var _container = $(this);

    var _opts = $.extend({},{
      parent:window
    },args);

    _opts.parent = $(_opts.parent);

    return {

        setup:function(args){
          var me = this;

          this.$container = _container;

          var blocks = this.$container.find('.block');

          this.containerX = 0,
          this.containerY = 0,
          this.containerW = 0,
          this.containerH = 0;

          var dx = 0,
              dy = 0;

          var mouseX = 0,
              mouseY = 0;

          this.windowH = $(window).height(),
          this.windowW = $(window).width();

          this.borderWidth = 30;

          //移动位置
          this.$container.on('mousedown',function(e){
              
              if(me.$container.css('left') == 'auto'){
                me.containerX = me.windowW - parseInt(me.$container.css('right')) - me.containerW;
              }else{
                me.containerX = parseInt(me.$container.css('left'));
              }

              if(me.$container.css('top') == 'auto'){
                me.containerY = me.windowH - parseInt(me.$container.css('bottom')) - me.containerH;
              }else{
                me.containerY = parseInt(me.$container.css('top'));
              }

              mouseX = e.pageX;
              mouseY = e.pageY;


              me.$container.css({
                    top:me.containerY,
                    right:'auto',
                    bottom:'auto',
                    left:me.containerX
                  });

              me.$container.on('mousemove',function(e){

                  dx = e.pageX - mouseX;
                  dy = e.pageY - mouseY;

                  me.containerX += dx;
                  me.containerY += dy;

                  me.$container.css({
                    top:me.containerY,
                    right:'auto',
                    bottom:'auto',
                    left:me.containerX
                  });

                  mouseX = e.pageX;
                  mouseY = e.pageY;

                  e.stopPropagation();

              });


              e.stopPropagation();
          });

          this.$container.on('mouseup',function(){
              me.$container.off('mousemove');
          });

          //边缘移动
          blocks.on('mousedown',function(e){
              me.containerW = parseInt(me.$container.css('width'));
              me.containerH = parseInt(me.$container.css('height'));

              if(me.$container.css('left') == 'auto'){
                me.containerX = me.windowW - parseInt(me.$container.css('right')) - me.containerW;
              }else{
                me.containerX = parseInt(me.$container.css('left'));
              }

              if(me.$container.css('top') == 'auto'){
                me.containerY = me.windowH - parseInt(me.$container.css('bottom')) - me.containerH;
              }else{
                me.containerY = parseInt(me.$container.css('top'));
              }

              mouseX = e.pageX;
              mouseY = e.pageY;

              me.prepareStatus($(this).data('dir'));

              var dir = $(this).data('dir');

               _opts.parent.on('mousemove',function(e){

                  dx = e.pageX - mouseX;
                  dy = e.pageY - mouseY;

                  me.drag(dir,{
                    dx:dx,
                    dy:dy
                  });

                  mouseX = e.pageX;
                  mouseY = e.pageY;

                  e.stopPropagation();
              });


              e.stopPropagation();

          });

          _opts.parent.on('mouseup',function(){
              _opts.parent.off('mousemove');
          });
        },

        prepareStatus:function(dir,container){
          var me = this;

          var _right = me.windowW - me.containerX - me.containerW ,
              _bottom = me.windowH - me.containerY - me.containerH;

          if(dir == 1){
              me.$container.css({
                  top:'auto',
                  right:'auto',
                  bottom:_bottom,
                  left:me.containerX
                });
          }else if(dir == 2){
              me.$container.css({
                  top:'auto',
                  right:'auto',
                  bottom:_bottom,
                  left:me.containerX
                });
          }
          else if(dir == 3){
              me.$container.css({
                  top:me.containerY,
                  right:'auto',
                  bottom:'auto',
                  left:me.containerX
                });
          }else if(dir == 4){
               me.$container.css({
                  top:me.containerY,
                  right:'auto',
                  bottom:'auto',
                  left:me.containerX
                });
          }else if(dir == 5){
               me.$container.css({
                  top:me.containerY,
                  bottom:'auto'
                });
          }else if(dir == 6){
              me.$container.css({
                  top:me.containerY,
                  right:_right,
                  bottom:'auto',
                  left:'auto'
                });
          }else if(dir == 7){
              me.$container.css({
                  top:me.containerY,
                  right:_right,
                  bottom:'auto',
                  left:'auto'
                });
          }else if(dir == 8){
              me.$container.css({
                  top:'auto',
                  right:_right,
                  bottom:_bottom,
                  left:'auto'
                });
          }
        },

        drag:function(dir,container){
          var me = this;

          switch(dir){
            case 1:{
              me.containerW = me.containerW +  container.dx;
              me.containerH = me.containerH -  container.dy;

              me.$container.css({
                      height: me.containerH
                    });
            }break;

            case 2:{
              me.containerW = me.containerW +  container.dx;
              me.containerH = me.containerH -  container.dy;

              me.$container.css({
                      width: me.containerW,
                      height:me.containerH
                    });
            }break;

            case 3:{
              me.containerW = me.containerW +  container.dx;
              me.containerH = me.containerH -  container.dy;

              me.$container.css({
                      width: me.containerW
                    });
            }break;

            case 4:{
              me.containerW = me.containerW +  container.dx;
              me.containerH = me.containerH +  container.dy;

              me.$container.css({
                      width: me.containerW,
                      height:me.containerH
                    });
            }break;

            case 5:{
              me.containerW = me.containerW +  container.dx;
              me.containerH = me.containerH +  container.dy;

              me.$container.css({
                      height:me.containerH
                    });
            }break;

            case 6:{
              me.containerW = me.containerW -  container.dx;
              me.containerH = me.containerH +  container.dy;

              me.$container.css({
                      width: me.containerW,
                      height:me.containerH
                    });
            }break;

            case 7:{
              me.containerW = me.containerW -  container.dx;
              me.containerH = me.containerH +  container.dy;

              me.$container.css({
                      width: me.containerW
                    });
            }break;

            case 8:{
              me.containerW = me.containerW -  container.dx;
              me.containerH = me.containerH -  container.dy;

              me.$container.css({
                      width: me.containerW,
                      height: me.containerH
                    });
            }break;

          }
        }

    }

  }