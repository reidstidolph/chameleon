$(document).ready(function() {
			   //hide elements 
			   $('#productFeatures').hide();
			   $('#productResearch').hide(); 
			   $('#productHistoricalData').hide();
			   $('#productVideoComm').hide();
			   $('#productDeskComm').hide();
			   $('#productLivePricing').hide();
			   $('#powerfulTools').hide();
		
			   
			   //click shows product features
			   $('.showProductFeature').click(function() {
			 		$('#productFeatures').fadeIn('slow');
			 		$('#productFeatures').css("visibility","visible");
			 		$('#productResearch').show('fast');
			 		$('a#linkResearch').addClass('selected');
			 	});
			 	
			 	$('#linkResearch').click(function() {
			 					 		
			 		if($('#linkResearch').hasClass('selected')){
			 			$('#productHistoricalData').hide();
				 		$('#productVideoComm').hide();
				 		$('#productDeskComm').hide();
				 		$('#productLivePricing').hide();
				 		$('a#linkVideoComm').removeClass('selected');
				 		$('a#linkDeskComm').removeClass('selected');
				 		$('a#linkHistoricalData').removeClass('selected');
				 		$('a#linkLivePricing').removeClass('selected');
			 			
			 		}else{
			 			$('#productHistoricalData').hide();
				 		$('#productVideoComm').hide();
				 		$('#productDeskComm').hide();
				 		$('#productLivePricing').hide();
				 		$('#productResearch').css('display','block');
				 		$('a#linkResearch').addClass('selected');
				 		$('a#linkVideoComm').removeClass('selected');
				 		$('a#linkDeskComm').removeClass('selected');
				 		$('a#linkHistoricalData').removeClass('selected');
				 		$('a#linkLivePricing').removeClass('selected');

			 		}
			 		
			 	});

			 	
			 	$('#linkHistoricalData').click(function() {
			 	
			 		if($('#linkHistoricalData').hasClass('selected')){
			 			$('#productResearch').hide();
				 		$('#productVideoComm').hide();
				 		$('#productDeskComm').hide();
				 		$('#productLivePricing').hide();
				 		$('a#linkResearch').removeClass('selected');
				 		$('a#linkVideoComm').removeClass('selected');
				 		$('a#linkDeskComm').removeClass('selected');
				 		$('a#linkLivePricing').removeClass('selected');
			 		
			 		}else{
			 			$('#productResearch').hide();
				 		$('#productVideoComm').hide();
				 		$('#productDeskComm').hide();
				 		$('#productLivePricing').hide();
						$('#productHistoricalData').css('display','block');
				 		$('a#linkHistoricalData').addClass('selected');
				 		$('a#linkResearch').removeClass('selected');
				 		$('a#linkVideoComm').removeClass('selected');
				 		$('a#linkDeskComm').removeClass('selected');
				 		$('a#linkLivePricing').removeClass('selected');
				 		$('#productHistoricalData').css("visibility","visible");

			 		}
			 	});
			 	
			 	$('#linkVideoComm').click(function() {
			 	
			 		if($('#linkVideoComm').hasClass('selected')){
			 			$('#productResearch').hide();
				 		$('#productHistoricalData').hide()
				 		$('#productDeskComm').hide();
				 		$('#productLivePricing').hide();
				 		$('a#linkResearch').removeClass('selected');
				 		$('a#linkDeskComm').removeClass('selected');
				 		$('a#linkHistoricalData').removeClass('selected');
				 		$('a#linkLivePricing').removeClass('selected');

			 		
			 		}else{
			 			$('#productResearch').hide();
				 		$('#productHistoricalData').hide()
				 		$('#productDeskComm').hide();
				 		$('#productLivePricing').hide();
						$('#productVideoComm').css('display','block');
				 		$('a#linkVideoComm').addClass('selected');
				 		$('a#linkResearch').removeClass('selected');
				 		$('a#linkDeskComm').removeClass('selected');
				 		$('a#linkHistoricalData').removeClass('selected');
				 		$('a#linkLivePricing').removeClass('selected');
				 		$('#productVideoComm').css("visibility","visible");
			 		}
			 		
			 	});
			 	
			 	$('#linkDeskComm').click(function() {
			 		
			 		if($('#linkDeskComm').hasClass('selected')){
			 			$('#productResearch').hide();
				 		$('#productHistoricalData').hide();
				 		$('#productVideoComm').hide();
				 		$('#productLivePricing').hide();
				 		$('a#linkResearch').removeClass('selected');
				 		$('a#linkVideoComm').removeClass('selected');
				 		$('a#linkHistoricalData').removeClass('selected');
				 		$('a#linkLivePricing').removeClass('selected');

			 		
			 		}else{
			 			$('#productResearch').hide();
				 		$('#productHistoricalData').hide();
				 		$('#productVideoComm').hide();
				 		$('#productLivePricing').hide();
						$('#productDeskComm').css('display','block');
				 		$('a#linkDeskComm').addClass('selected');
				 		$('a#linkResearch').removeClass('selected');
				 		$('a#linkVideoComm').removeClass('selected');
				 		$('a#linkHistoricalData').removeClass('selected');
				 		$('a#linkLivePricing').removeClass('selected');
				 		$('#productDeskComm').css("visibility","visible");
			 		}			 		
			 	});
			 	
			 	$('#linkLivePricing').click(function() {
			 	
			 		if($('#linkLivePricing').hasClass('selected')){
			 			$('#productResearch').hide();
				 		$('#productHistoricalData').hide();
				 		$('#productVideoComm').hide();
				 		$('#productDeskComm').hide();
				 		$('a#linkResearch').removeClass('selected');
				 		$('a#linkDeskComm').removeClass('selected');
				 		$('a#linkHistoricalData').removeClass('selected');
				 		$('a#linkVideoComm').removeClass('selected');
			 		
			 		}else{
			 			$('#productResearch').hide();
				 		$('#productHistoricalData').hide();
				 		$('#productVideoComm').hide();
				 		$('#productDeskComm').hide();
						$('#productLivePricing').css('display','block');
				 		$('a#linkLivePricing').addClass('selected');
				 		$('a#linkResearch').removeClass('selected');
				 		$('a#linkDeskComm').removeClass('selected');
				 		$('a#linkHistoricalData').removeClass('selected');
				 		$('a#linkVideoComm').removeClass('selected');
				 		$('#productLivePricing').css("visibility","visible");

			 		}
			 	});

			  //hide product features on click
			   $('.hideProductFeatures').click(function() {
				 	$('#productFeatures').hide();
				 	$('#productResearch').hide();
				    $('#productHistoricalData').hide();
				    $('#productVideoComm').hide();
				    $('#productDeskComm').hide();
				    $('#productLivePricing').hide();
				    $('#powerfulTools').hide();
				    $('a#linkResearch').removeClass('selected');
				    $('a#linkVideoComm').removeClass('selected');
					$('a#linkDeskComm').removeClass('selected');
					$('a#linkHistoricalData').removeClass('selected');
					$('a#linkLivePricing').removeClass('selected');
				    $('#productHistoricalData').css("visibility","hidden");
				    $('#productVideoComm').css("visibility","hidden");
				    $('#productDeskComm').css("visibility","hidden");
				    $('#productLivePricing').css("visibility","hidden");
			  });

			  
		});

	function showPowerfulTools(){
		document.getElementById('powerfulTools').style.display = 'inline';
	}
	
	function hidePowerfulTools(){
		document.getElementById('powerfulTools').style.display = 'none';
	}
