

function PopulateVideo(VideoId){
	
						jQuery.noConflict();
								(function ($) {
									$(function () {
	
  VideoUrl = "http://www.youtube.com/embed/"+VideoId;
  $("#HomeVideo").attr("src",VideoUrl);

						});
								})(jQuery);

}


function PopulateImage(ImageName, id, maxWidth, isPortrait,margintop) {
	
						jQuery.noConflict();
								(function ($) {
									$(function () {
	
    var p = isPortrait?"width=560":"height=360";
  ImageUrl = "/imagegen.ashx?"+p+"&image="+ImageName;
  $("#ImageLarge").attr("src", ImageUrl);
  $("#ImageLarge").attr("rel", id);
  $("#ImageLarge").css("top", -1*margintop);

  $("#ImageSizes option").each(function () {
      if ($(this).val() > maxWidth) {
          $(this).hide();
      }
      else $(this).show();
  });
  $("#ImageSizes option:selected").removeAttr("selected");
  $("#ImageSizes option:first").attr("selected", "selected");
  $("#ImageDescription").html($("#ImageDescription"+id).html());

						});
								})(jQuery);

}


function MobileCalulator(){
	field1 = document.getElementById("field1").value;
	factor1 = 98.5788/100;
	factor2 = 51.0624/100;
	validNumbers = 0;
	if(isNaN(field1*1)){
		document.getElementById("field1").value = "";
	}else{
		validNumbers = 1;
	}
	if(validNumbers==1){
		document.getElementById("field2").value = Math.ceil(field1*factor1)
		document.getElementById("field3").value = Math.ceil(field1*factor2)	
	}
}




function MobileCalulator2(){
	field1 = document.getElementById("field-1").value;
	factor1 = 1.066932;//98.5788/100;
	factor2 = 0.562302;//51.0624/100;
	validNumbers = 0;
	if(isNaN(field1*1)){
		document.getElementById("field-1").value = "";
	}else{
		validNumbers = 1;
	}
	if(validNumbers==1){
		document.getElementById("field-2").value = Math.ceil(field1*factor1)
		document.getElementById("field-3").value = Math.ceil(field1*factor2)	
	}
}

function MobileCalulator3(){
	c2field1 = document.getElementById("c2-field-1").value;
	validNumbers = 0;
	if(isNaN(c2field1*1)){
		document.getElementById("c2-field-1").value = "";
	}else{
		validNumbers = 1;
	}
	if(validNumbers==1){
		document.getElementById("c2-field-2").value = Math.ceil(c2field1*0.498877129731125)	
		document.getElementById("c2-field-3").value = Math.ceil(c2field1*0.0000296861675866916*1000)	
		document.getElementById("c2-field-4").value = Math.ceil(c2field1*0.000232775557317049*1000)	
		document.getElementById("c2-field-5").value = Math.ceil(c2field1*0.0942804579870252)	
		document.getElementById("c2-field-6").value = Math.ceil(c2field1*0.166292376577042)	
		document.getElementById("c2-field-7").value = Math.ceil(c2field1*1.60145043582348)	
		document.getElementById("c2-field-8").value = Math.ceil(c2field1*0.00225)	
		document.getElementById("c2-field-9").value = Math.ceil(c2field1*0.048750)	
		document.getElementById("c2-field-10").value = Math.ceil(c2field1*0.008025)	
		tonnesofore1 = c2field1 * (0.291724996030956*0.000068187134502924)/0.002;
		tonnesofore2 = c2field1 * (0.291724996030956*0.00226900584795322)/0.06;
		tonnesofore3 = c2field1 * (0.291724996030956*0.10327485380117)/12.4;
		tonnesofore4 = c2field1 * (0.108776913011237*0.0233333333333333)/12.4;
		tonnesofore5 = c2field1 * (0.507249322066543*0.0321714285714286)/12.4;
		document.getElementById("c2-field-11").value = Math.ceil(tonnesofore1+tonnesofore2+tonnesofore3+tonnesofore4+tonnesofore5)	
		document.getElementById("c2-field-11").value = Math.ceil(c2field1*0.026326)	
	}
}




						jQuery.noConflict();
								(function ($) {
									$(function () {

$(function() { 
    setTimeout(function() { 
        $("#loading-icon-iframe").hide() 
    }, 7000); 
}); 
						});
								})(jQuery);





arraySearch = function (array, element) {
	if (typeof array.indexOf != 'undefined') {
		return array.indexOf(element);
	}
	else {
		var len = array.length >>> 0;

		for (var from = 0; from < len; from++) {
			if (array[from] === element)
				return from;
		}
		return -1;
	}
};



jQuery.noConflict();
(function ($) {
	$(function () {
		$(document).ready(function () {

			$("#factsheet-container-contract").click(function() {
				$("#factsheet-container-contract").css("display","none");
				$("#factsheet-container-expand").css("display","block");
				$("#factsheet-container").css("display","none");
			});
			$("#factsheet-container-expand").click(function() {
				$("#factsheet-container-contract").css("display","block");
				$("#factsheet-container-expand").css("display","none");
				$("#factsheet-container").css("display","block");
			});

			$("#video-container-contract").click(function() {
				$("#video-container-contract").css("display","none");
				$("#video-container-expand").css("display","block");
				$("#video-container").css("display","none");
			});
			$("#video-container-expand").click(function() {
				$("#video-container-contract").css("display","block");
				$("#video-container-expand").css("display","none");
				$("#video-container").css("display","block");
			});

			$("#poster-container-contract").click(function() {
				$("#poster-container-contract").css("display","none");
				$("#poster-container-expand").css("display","block");
				$("#poster-container").css("display","none");
			});
			$("#poster-container-expand").click(function() {
				$("#poster-container-contract").css("display","block");
				$("#poster-container-expand").css("display","none");
				$("#poster-container").css("display","block");
			});

			$("#picture-container-contract").click(function() {
				$("#picture-container-contract").css("display","none");
				$("#picture-container-expand").css("display","block");
				$("#picture-container").css("display","none");
			});
			$("#picture-container-expand").click(function() {
				$("#picture-container-contract").css("display","block");
				$("#picture-container-expand").css("display","none");
				$("#picture-container").css("display","block");
			});

			$("#how-container-contract").click(function() {
				$("#how-container-contract").css("display","none");
				$("#how-container-expand").css("display","block");
				$("#how-container").css("display","none");
			});
			$("#how-container-expand").click(function() {
				$("#how-container-contract").css("display","block");
				$("#how-container-expand").css("display","none");
				$("#how-container").css("display","block");
			});


			$(document).ready(function () {
			    jQuery("#mapsearch").autocomplete({
			        minLength: 0,
			        delay: 1000,
			        source: function (request, response) {
			            var target = this.element;
			            geocoder = new google.maps.Geocoder();
			            if (request.term !== '' && typeof geocoder != 'undefined') {
			                geocoder.geocode({ address: request.term + ' Australia', region: 'au' }, function (results, status) {
			                    var suggestions = [];
			                    var address, suburb, state, postcode, country, addresses = [];
			                    if (status == google.maps.GeocoderStatus.OK) {
			                        for (var key in results) {
			                            address = '';
			                            suburb = '';
			                            postcode = '';
			                            state = '';
			                            country = '';
			                            for (var component in results[key].address_components) {
			                                if (typeof results[key].address_components[component].types != 'undefined') {
			                                    if (arraySearch(results[key].address_components[component].types, 'country') > -1) {
			                                        country = results[key].address_components[component].long_name;
			                                    } else if (arraySearch(results[key].address_components[component].types, 'administrative_area_level_1') > -1) {
			                                        state = results[key].address_components[component].long_name;
			                                    } else if (arraySearch(results[key].address_components[component].types, 'locality') > -1) {
			                                        suburb = results[key].address_components[component].long_name;
			                                    } else if (arraySearch(results[key].address_components[component].types, 'postal_code') > -1) {
			                                        postcode = results[key].address_components[component].long_name;
			                                    }
			                                }
			                            }
			                            if (country == 'Australia') {
			                                if (arraySearch(addresses, results[key].formatted_address) == -1) {
			                                    addresses.push(results[key].formatted_address);
			                                    var lat = results[key].geometry.location.lat();
			                                    var lng = results[key].geometry.location.lng();
			                                    suggestions.push({
			                                        label: results[key].formatted_address,
			                                        value: results[key].formatted_address,
			                                        latlon: lat + ',' + lng,
			                                        lat: lat,
			                                        lng: lng,
			                                        suburb: suburb,
			                                        state: state,
			                                        postcode: postcode,
			                                        empty: false
			                                    });
			                                }
			                            }
			                        }
			                        if (typeof suggestions[0] != 'undefined') {
			                            response(suggestions);
			                        }
			                    }
			                    if (!suggestions.length) {
			                        response([
                                      {
                                          label: 'No results found.',
                                          value: request.term,
                                          empty: true
                                      }
			                        ]);
			                    }
			                });
			            }
			            else {
			                response([]);
			            }
			        },
			        select: function (event, ui) {
			            if (!ui.item.empty) {
			                //
			                console.log(ui.item);
			                $(event.target).val(ui.item.value);
			                window.location.href = "/recycle-a-mobile/?zoom=0&q=" + encodeURI(ui.item.value) + "&maplocality=" + ui.item.lng + ":" + ui.item.lat + ":" + encodeURI(ui.item.suburb) + ":" + encodeURI(ui.item.state);
			                //$("#maplocality").val(ui.item.lng + ":" + ui.item.lat + ":" + ui.item.suburb + ":" + ui.item.state);
			                //$("form[name='form1']").submit();
			            }
			            else {
			                return false;
			            }
			        }
			    });
			});

		});
	});
})(jQuery);









