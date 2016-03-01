/*遮罩
name：
date:2015-4-23
*/
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define(['zepto'], function() {
      return factory();
    });
  } else {
   
    window.Mask = factory();
  }
}(function() {
	/**
	 * [mask 遮罩类]
	 * @param  {[type]} el [description]
	 * @return {[type]}    [description]
	 */
	var time=1000000;
	function Mask(el,closeCallback) {
		this.pop=el;
		this.closeCallback=function(){
			
		}
		
	}
	Mask.prototype = {
		open: function(callback) {
			var that=this;
			var date=new Date();
			time++;
			this.time=time;
			this.popWrap=document.createElement('div');
			this.popWrap.className='popWrap';
			this.popWrap.style.zIndex=this.time;
			this.mask=document.createElement('div');
			this.mask.className='mask';

			
			
			$(this.popWrap).css({'position':'fixed','top':0,'left':0,'right':0,'bottom':0,'overflow':'auto'});
			$(this.mask).css({'position':'absolute','z-index':1,'top':0,'left':0,'right':0,'bottom':0,'background':'#000','opacity':0.5,'display':'none'});
			
		
			$(this.pop).wrap(this.popWrap);
			$(this.pop).before(this.mask);
			$(this.pop).show(function(){
				if(typeof callback=='function'){
					callback();
				}
			});
			var popBorderWidth = parseInt($(this.pop).css('border-width'));
			var popBorderHeight = parseInt($(this.pop).css('border-height'));
			var popPaddingLeft = parseInt($(this.pop).css('padding-left'));
			var popPaddingTop = parseInt($(this.pop).css('padding-top'));
			
			
				popBorderWidth = isNaN(popBorderWidth)==false?popBorderWidth:0;
				popBorderHeight = isNaN(popBorderHeight)==false?popBorderHeight:0;
				popPaddingLeft = isNaN(popPaddingLeft)==false?popPaddingLeft:0;
				popPaddingTop = isNaN(popPaddingTop)==false?popPaddingTop:0;
			var popWidth= parseInt($(this.pop).width())+2*popBorderWidth+2*popPaddingLeft;
			var popHeight= parseInt($(this.pop).height())+2*popBorderHeight+2*popPaddingTop;
			
			$(this.pop).css({
				
				'position':'absolute',
				'z-index':2,
				'top':'50%',
				'left':'50%',
				'margin-top':-popHeight/2+'px',
				'margin-left':-popWidth/2+'px'
			});


			$(this.mask).show();
			$(this.popWrap).show();
			$(this.mask).bind('touchend',function(event) {
				event.preventDefault();
				that.close(that.closeCallback);
				
			});

			$(this.pop).find('.close').bind('touchend',function(){
				event.preventDefault();
				that.close(that.closeCallback);
			});
		},
		close: function(callback) {
				var that=this;

				$(this.mask).hide();
				$(this.mask).remove();
				$(this.pop).hide();	
				$(that.pop).parent('.popWrap').replaceWith(that.pop);

				

				if(typeof callback=='function'){
						callback();
				}

		}
	}
	return Mask;
}));
