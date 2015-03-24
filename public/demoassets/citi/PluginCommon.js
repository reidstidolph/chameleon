if(!window.CitiVelocity)CitiVelocity = {}
CitiVelocity.Modal = {
	layout: '<div class=modal>\
			<div class=modalHeader>\
				<div class=modalHeaderRight>\
					<div class=modalHeaderCenter>\
						<span class=title/><div class=closeBtn/>\
					</div>\
				</div>\
			</div>\
			<div class=modalBody>\
				<div class=modalBodyContent/>\
			</div>\
			<div class=bottomBtns>\
				<div class=closeBtn/>\
				<div class=okBtn/>\
			</div>\
			<div class=modalFooter>\
				<div class=modalFooterRight>\
					<div class=modalFooterCenter>\
				</div>\
			</div>\
		</div>',

	defaults: {width: 520, height: 400},

	open: function(arg){
		/*
		 * arg: {
		 *	title: string,
		 *	width: int,
		 *	height: int|'auto',
		 *	noCloseBtn: boolean,
		 *	bottomBtns: TBD,
		 *	url: string,
		 *	html: string|element,
		 *	draggable: boolean,
		 *	resizable: boolean,
		 *	open: function,
		 *	close: function,
		 *	confirm: function
		 * }
		 */

		//do nothing with lacking arguments
		if(!arg || !arg.title || !arg.url && !arg.html)return;

		var CVM = CitiVelocity.Modal
		var body = $(document.body)

		//gray overlay
		body.mask()

		//layout
		var modal = $(CVM.layout).appendTo(body).fadeIn()
		var modalHeader = modal.find('div.modalHeader')
		var modalBody = modal.find('div.modalBody')
		var contentArea = modalBody.find('div.modalBodyContent')

		//title
		$('span.title', modalHeader).html(arg.title)
			
		//width
		var width = arg.width || CVM.defaults.width
		modal.width(width)
		modalBody.width(width-2)

		//height
		var height = CVM.defaults.height
		if(arg.height)
			height = arg.height
		arg.height!='auto' && modalBody.height(height)

		//left
		var left = (body.width() - modal.width())/2
		modal.css({left: left+'px'})
		
		//content
		arg.html && $(arg.html).appendTo(contentArea).show() && arg.open && arg.open()
		arg.url && contentArea.load(arg.url, function(){
			//arg.height=='auto' && modalBody.height(contentArea.outerHeight())

			//open event
			arg.open && arg.open()
		})
	
		//bgiframe
		var bgiframe = $('#bgiframe')
		bgiframe.width(modal.width()).height(modal.height()).css(modal.position())
		!$.browser.msie && bgiframe.css('position','fixed')
		
		//draggable
		arg.draggable && modal.draggable({
			handle: 'div.modalHeader',
			containment: body,
			drag: function(event, ui){
				bgiframe.css(ui.position)
			},
			stop: function(event, ui){
				bgiframe.css(ui.position)
			} 
		})
		
		//resizable
		if(arg.resizable){
			var minWidth = modalHeader.find('span.title').outerWidth() + modalHeader.find('div.closeBtn').outerWidth() + 20
			modal.resizable({
				handles: 'se',
				alsoResize: 'div.modalBody',
				minWidth: minWidth,
				minHeight: 80,
				resize: function(event, ui){
					bgiframe.width(ui.helper.width()).height(ui.helper.height())
				},
				stop: function(event, ui){
					bgiframe.width(ui.helper.width()).height(ui.helper.height())
				} 
			}).css('position', $.browser.msie?'absolute':'fixed')
			.find('div.ui-resizable-se').removeClass('ui-icon').removeClass('ui-icon-gripsmall-diagonal-se')
		}
		
		//close btn
		modal.click(function(e){
			if($(e.target).is('div.closeBtn')){
				CVM.close()
				arg.close && arg.close()
				e.stopPropagation()
			}
		})
		arg.noCloseBtn && modal.find('div.bottomBtns div.closeBtn').remove()
	
		
		//ok button
		arg.confirm && modal.find('div.okBtn').show() && modal.click(function(e){
			if($(e.target).is('div.okBtn')){
				arg.confirm()
				e.stopPropagation()
			}
		})
	},
	close: function(){
		$(document.body).unmask().find('>div.modal').unbind('click').fadeOut().remove()
		var bgiframe = $('#bgiframe')
		bgiframe.width(0).height(0)
		!$.browser.msie && bgiframe.css('position','absolute')
	}
}


if ( window.CitiMarkets == undefined ) CitiMarkets = {};
if ( CitiMarkets.Modules == undefined ) CitiMarkets.Modules = {};
if ( CitiMarkets.UI == undefined ) CitiMarkets.UI = {};

//document.write( '<link rel="stylesheet" type="text/css" href="cm_public/css/javascript.css" />' );

// Cookies
CitiMarkets.Cookies =
{
	name:'CitiMarkets',
	days: 365,

	read: function( property )
	{
		//return null;
		var cookie = jQuery.cookie( CitiMarkets.Cookies.name );

		if ( cookie ) cookie = jQuery.evalJSON( cookie );
		else return null;

		if ( cookie[ property] ) return cookie[ property];
		else return null;
	},
	
	write: function( property, value )
	{
		var cookie = jQuery.cookie( CitiMarkets.Cookies.name );

		if ( cookie ) cookie = jQuery.evalJSON( cookie );
		else cookie = {  };

		cookie[ property ] = value;

		jQuery.cookie( CitiMarkets.Cookies.name, jQuery.toJSON( cookie ), { expires:CitiMarkets.Cookies.days, path:'/' } );
	},

	remove: function( property )
	{
		var cookie = jQuery.cookie( CitiMarkets.Cookies.name );

		if ( cookie ) cookie = jQuery.evalJSON( cookie );
		else cookie = {  };

		if ( cookie[ property ] ) delete cookie[ property ];

		cookie = jQuery.toJSON( cookie );
		if ( cookie == '{}' ) cookie = null;

		jQuery.cookie( CitiMarkets.Cookies.name, cookie, { expires:CitiMarkets.Cookies.days, path:'/' } );
	}
}


/* Contextual ArticleTooltips */
CitiMarkets.ArticleTooltips =
{
	timer: null,

	setup: function(id)
	{
/*		var ctx = null;
		if (!id) {
			ctx = document;
		} else {
			ctx = jQuery("#" + id);
			if (!ctx) {
				return;
			}
		}*/
		jQuery( '.listDateItemsTooltips li').each( function(i)
		{
			// add unique identifier
			jQuery( this ).addClass( 'listDateItemsTooltip-' + i );
		
			// bind events
			jQuery( this ).find( 'a' ).bind( 'mouseenter', CitiMarkets.ArticleTooltips.timeOpen ).bind( 'mouseleave', CitiMarkets.ArticleTooltips.timeClose );
		} );
		jQuery( '.listDateItemsTooltips li .UnbindToolTip' ).each( function()
		{
			jQuery( this ).unbind( 'mouseenter', CitiMarkets.ArticleTooltips.timeOpen );
		} );
		jQuery( 'div.pluginDetectTooltips strong' ).each( function(i)
		{
			jQuery( this ).addClass( 'listDateItemsTooltip-' + i );
			jQuery( this ).find( 'div' ).bind( 'mouseenter', CitiMarkets.ArticleTooltips.timeOpen ).bind( 'mouseleave', CitiMarkets.ArticleTooltips.timeClose );
		} );
	},
	
	timeOpen: function()
	{
		var self = this;
		
		if ( CitiMarkets.ArticleTooltips.timer ) clearTimeout( CitiMarkets.ArticleTooltips.timer );
		
		CitiMarkets.ArticleTooltips.timer = setTimeout( function() { CitiMarkets.ArticleTooltips.open.call( jQuery( self ).parent()[0] ) }, 400 );
	},
	
	open: function()
	{
		if ( CitiMarkets.ArticleTooltips.timer ) clearTimeout( CitiMarkets.ArticleTooltips.timer );
	
		var uid = jQuery( this ).attr( 'class' ).match( /listDateItemsTooltip-([0-9]+)/ )[1];
		var top = jQuery( this ).offset().top;
		var left = jQuery( this ).children( 'a' ).offset().left;
		var title = jQuery( this ).children( 'a' );
		var unTrunkTitle = jQuery( this ).find( 'a p' ).text();
		
		title =title.clone();
		if(unTrunkTitle){
			title.text(unTrunkTitle);
		}
		title = title.outerHTML();
		if(jQuery( this ).hasClass('calendar'))
		{
			title='';
		}
		//title = jQuery( this ).children( 'a' ).outerHTML();
		var description = jQuery( this ).children( 'p' )[0];
		description = $(description).clone();
		if(description.text().length>450){
			description.css({overflow: "auto", height: "150px"});
		}
		var myQuery = jQuery;
			if(parent.jQuery){
				//use outer frame jQuery to prevent the tooltip cut by iframe
				myQuery = parent.jQuery;
				//outer frame offset 
				var topOffset = parent.jQuery('#Main').position() && parent.jQuery('#Main').position().top;
				var leftOffset = parent.jQuery('#Main').position() && parent.jQuery('#Main').position().left;
				if(jQuery(this).hasClass('rightOrient')){
					top=jQuery(this).closest('.pluginDetectTooltips').offset().top+5;
					left=jQuery(this).closest('.pluginDetectTooltips').offset().left-197;
				}else{
					top+=topOffset;
					left+=leftOffset;
				}
				
			}
		var tooltip = myQuery( '#ArticleTooltip' );

		CitiMarkets.PopupActions.close();

		if ( !tooltip.length || !tooltip.hasClass( 'listDateItemsTooltipPanel-' + uid ) )
		{
			
			
			// remove any tooltips visible
			myQuery( '#ArticleTooltip' ).remove();
			
			// create tooltip
			var tooltip = myQuery( '<div id="ArticleTooltip"><div class="articleTooltipContent"></div></div>' );
			if(jQuery(this).hasClass('rightOrient')){
				tooltip = myQuery( '<div id="ArticleTooltip2"><div class="articleTooltipContent"></div></div>' );
			}
			var sTitle = title;
			var sDescription = description.outerHTML();
			tooltip.find( '.articleTooltipContent' ).append( sTitle ).append( sDescription );
			tooltip.addClass( 'listDateItemsTooltipPanel-' + uid );
			// bind events
			tooltip.bind( 'mouseenter', CitiMarkets.ArticleTooltips.cancelClose )
				   .bind( 'mouseleave', {myQuery: myQuery},CitiMarkets.ArticleTooltips.timeClose );
			
			// append to DOM
			if(sDescription!==undefined && sDescription!=='')
			tempDes=sDescription.replace(/\s/g,'').replace(/\n/g,'').toLowerCase();
			if((title !=='')|| (title ===''&& !(tempDes==''|| tempDes =="<p></p>")))
			{
				
				myQuery( 'body' ).append( tooltip );
				
			
			if(tooltip.attr('id') != 'ArticleTooltip2'){
				if ( !jQuery.browser.msie || jQuery.browser.version < 7 ) tooltip.css( { opacity:0 } ).animate( { opacity:1 }, 300, 'easeInOutQuad' )
			}
	
			// position tooltip
			//top -= tooltip.height();
			
			var tooltipHeight = tooltip.outerHeight()
			var up = tooltipHeight<top
			top = (up?top-tooltip.height():top+10)+'px'
			
			if(!up){
				tooltip.addClass('articleTooltip');
			}
			tooltip.css( { top:top, left:left } )
	
			// bind close event
			setTimeout( function() { jQuery( 'body' ).bind( 'click',{myQuery: myQuery}, CitiMarkets.ArticleTooltips.close ) }, 1 );
			
			//insert media mask(bgiframe)
			var bgiframe = myQuery('#bgiframe')
			var width = tooltip.width()-4
			var height = tooltip.height()-12
			bgiframe.width(width).height(height).css(tooltip.css({'z-Index': 101}).position())
			}
		}
	},
	
	
	timeClose: function()
	{
		if ( CitiMarkets.ArticleTooltips.timer ) clearTimeout( CitiMarkets.ArticleTooltips.timer );
	
		CitiMarkets.ArticleTooltips.timer = setTimeout( CitiMarkets.ArticleTooltips.close, 500 );
	},
	
	cancelClose: function()
	{
		if ( CitiMarkets.ArticleTooltips.timer ) clearTimeout( CitiMarkets.ArticleTooltips.timer );
	},
	
	close: function()
	{
		if ( CitiMarkets.ArticleTooltips.timer ) clearTimeout( CitiMarkets.ArticleTooltips.timer );
		var myQuery = jQuery;
		if(parent.jQuery){
			myQuery = parent.jQuery;
		}
		if ( !jQuery.browser.msie || jQuery.browser.version < 7 ) {
			myQuery( '#ArticleTooltip' ).animate( { opacity:0 }, 300, 'easeInOutQuad', function() { myQuery( this ).remove() } );
			myQuery( '#ArticleTooltip2' ).animate( { opacity:0 }, 300, 'easeInOutQuad', function() { myQuery( this ).remove() } );
		}
		else {
			myQuery( '#ArticleTooltip' ).remove();
			myQuery( '#ArticleTooltip2' ).remove();
		}
		myQuery(document).rmvMediaMask()
	}
}
jQuery( document ).ready( CitiMarkets.ArticleTooltips.setup );

/* Contextual Actions */
CitiMarkets.PopupActions =
{
	setup: function(id)
	{
/*		var ctx = null;
		if (!id) {
			ctx = document;
		} else {
			ctx = jQuery("#" + id);
			if (!ctx) {
				return;
			}
		}
*/		
		jQuery( '.popupActionItem' ).each( function()
		{
			jQuery( this ).bind( 'click', CitiMarkets.PopupActions.open );
		} );
		
		jQuery('.outerPopupActionItem').each(function(){
			jQuery( this ).bind( 'click', CitiMarkets.PopupActions.openAside );
		});
	},
	
	open: function(e)
	{
		var top = jQuery( this ).offset().top - 5;
		var left = jQuery( this ).offset().left - 5;
		var myQuery = jQuery;
		if(!$.browser.mozilla){
			if(parent.jQuery){
				//use outer frame jQuery to prevent the tooltip cut by iframe
				myQuery = parent.jQuery;
				//outer frame offset 
				var topOffset = jQuery('#Main').position().top;
				var leftOffset = jQuery('#Main').position().left;
				top+=topOffset;
				left+=leftOffset;
			}
		}
		
		CitiMarkets.ArticleTooltips.close();
		
		// remove any tooltips visible
		myQuery( '#ContextTooltip' ).remove();
		
		// build tooltip
		var tooltip = myQuery( '<div id="ContextTooltip"><div class="contextTooltipContent"></div><a href="#" class="contextTooltipClose"></a>' );
		tooltip.find( '.contextTooltipContent' ).append( myQuery( this ).clone().children() );
		tooltip.find( 'a.contextTooltipClose' ).bind( 'click', CitiMarkets.PopupActions.close );
		tooltip.bind( 'click', function(e) { e.stopPropagation() } );
		
		// reationalise behaviour for popup tooltips
		if ( jQuery( this ).parents( '#PopupModal' ).length )
		{
			if ( !jQuery.browser.msie || jQuery.browser.version >= 7 ) tooltip.css( { position:'fixed', top:top - jQuery( window ).scrollTop() } );
			else jQuery( window ).bind( 'scroll', function() { tooltip.css( { top:top + document.documentElement.scrollTop+'px' } ) } );
		}

		// append to DOM
	
		myQuery( 'body' ).append( tooltip );

		var tooltipHeight = tooltip.outerHeight()
		var down = tooltipHeight<top
		top = (!down ? top : top-tooltipHeight + 20 )+'px'
		left = (left + tooltip.width() > ($(window).width()-5) ? left - tooltip.width() + 30:left)+'px';
		
		// position tooltip
		tooltip.css( { top:top, left:left } );
		
		if ( !jQuery.browser.msie || jQuery.browser.version < 7 ) tooltip.css( { opacity:0 } ).animate( { opacity:1 }, 300, 'easeInOutQuad' )

		// bind close event
		setTimeout( function() { jQuery( 'body' ).bind( 'click', CitiMarkets.PopupActions.close ) }, 1 );
		e.stopPropagation();
		e.preventDefault();
	},
	
	close: function(e)
	{
		var myQuery = jQuery;
		if(!$.browser.mozilla){
			if(parent.jQuery){
				myQuery = parent.jQuery;
			}
		}
		myQuery( '#ContextTooltip' ).remove();

		setTimeout( function() { jQuery( 'body' ).unbind( 'click', CitiMarkets.PopupActions.close ) }, 1 );

		if (e) e.preventDefault();
	},
	
	openFromOuterFrame: function(e){
		var clicked = $(this)
		var top = clicked.offset().top - 5;
		var left = clicked.offset().left - 5;
		
		CitiMarkets.ArticleTooltips.close();
		
		// remove any tooltips visible
		$( '#ContextTooltip' ).remove();
		
		// build tooltip
		var tooltip = $( '<div id="ContextTooltip" style=z-index:1002><div class="contextTooltipContent"></div><a href="#" class="contextTooltipClose"></a>' )
			.find( '.contextTooltipContent' ).append( $( this ).clone().children() ).end()
			.find( 'a.contextTooltipClose' ).click(CitiMarkets.PopupActions.close ).end()
			.bind( 'click', function(e) { e.stopPropagation() } );

		// position tooltip
		tooltip.css( { top:top, left:left } );
		// reationalise behaviour for popup tooltips
		if ( $( this ).parents( '#PopupModal' ).length )
		{
			if ( !$.browser.msie || $.browser.version >= 7 ) tooltip.css( { position:'fixed', top:top - $( window ).scrollTop() } );
			else $( window ).scroll( function() { tooltip.css( { top:top + document.documentElement.scrollTop+'px' } ) } );
		}

		// append to DOM
	
		$( 'body' ).append( tooltip );
		
		if ( !jQuery.browser.msie || jQuery.browser.version < 7 ) tooltip.css( { opacity:0 } ).animate( { opacity:1 }, 300, 'easeInOutQuad' )

		// bind close event
		setTimeout( function() { jQuery( 'body' ).click( CitiMarkets.PopupActions.close ) }, 1 );
		e.stopPropagation();
		e.preventDefault();
	},
	
	openAside: function(e){
		var clicked = $(this).closest('.modalBodyContent')
		var top = clicked.offset().top + 30;
		var left = clicked.offset().left + clicked.width() + 35;
		
		CitiMarkets.ArticleTooltips.close();
		
		// remove any tooltips visible
		$( '#ContextTooltip' ).remove();
		
		// build tooltip
		var tooltip = $( '<div id="ContextTooltip" style=z-index:1002><div class="contextTooltipContent"></div><a href="#" class="contextTooltipClose"></a>' )
			.find( '.contextTooltipContent' ).append( $( this ).clone().children() ).end()
			.find( 'a.contextTooltipClose' ).click(CitiMarkets.PopupActions.close ).end()
			.bind( 'click', function(e) { e.stopPropagation() } );

		// position tooltip
		tooltip.css( { top:top, left:left } );
		// reationalise behaviour for popup tooltips
		if ( $( this ).parents( '#PopupModal' ).length )
		{
			if ( !$.browser.msie || $.browser.version >= 7 ) tooltip.css( { position:'fixed', top:top - $( window ).scrollTop() } );
			else $( window ).scroll( function() { tooltip.css( { top:top + document.documentElement.scrollTop+'px' } ) } );
		}

		// append to DOM
	
		$( 'body' ).append( tooltip );
		
		if ( !jQuery.browser.msie || jQuery.browser.version < 7 ) tooltip.css( { opacity:0 } ).animate( { opacity:1 }, 300, 'easeInOutQuad' )

		// bind close event
		setTimeout( function() { jQuery( 'body' ).click( CitiMarkets.PopupActions.close ) }, 1 );
		e.stopPropagation();
		e.preventDefault();
	}
}
jQuery( document ).ready( CitiMarkets.PopupActions.setup );

$.fn.extend({
	mediaMask: function() {
		var target = this
		var bgiframe = $('#bgiframe')
		var width = this.width()+1
		var height = this.height()+($.browser.msie?13:24)
		bgiframe.width(width).height(height).css(this.position())
	},
	
	outerHTML: function(){
		return $('<div/>').append( this.clone() ).html()
	},
	
	rmvMediaMask: function(){
		$('#bgiframe').width(0).height(0)
	}
})
