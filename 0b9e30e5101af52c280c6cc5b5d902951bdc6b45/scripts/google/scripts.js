var markers = {};
var map;
var infowindow = new google.maps.InfoWindow();
var intImageZoom, decLong, decLat;
var geocoder;



function DoMap(_intImageZoom, _decLong, _decLat) {
    intImageZoom = _intImageZoom;
    decLong = _decLong;
    decLat = _decLat;
    console.log(intImageZoom);
    console.log(decLong);
    console.log(decLat);

   

    setTimeout(function () {
        initialize();
    }, 100);
    
}

function initialize() {

    

    map = new google.maps.Map(document.getElementById('map-div'), {
        zoom: intImageZoom,
        center: new google.maps.LatLng(decLat, decLong),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    google.maps.event.addListenerOnce(map, 'idle', function () {
        //loaded fully
        console.log("idle");
        setupMap();
    });

    google.maps.event.addListener(map, 'bounds_changed', function () {
        console.log("bounds_changed");
        setupMap();
    });

    
}

function setupMap() {
    DoLoadMarkers();
}

function DoLoadMarkers() {
    var ne = map.getBounds().getNorthEast();
    var sw = map.getBounds().getSouthWest();

    myAjax = new Ajax.Request("/forms/mm/whereis/getmarkers.ashx", {
        method: "get",
        parameters: { "ID": AMTA_ID, "lat1": sw.lat(), "lat2": ne.lat(), "long1": sw.lng(), "long2": ne.lng(), "state": state, "suburb": suburb },
        onSuccess: SubmitSuccess,
        onFailure: SubmitFailure,
        onException: SubmitFailure
    });
}


function SubmitSuccess(response) {
    try {
        var strResponse = response.responseText;
        //console.log(strResponse);
        eval("objPoints = " + strResponse);

        var currentPoint = null;

        var strURL = null;

        clearMarkers();

        var strHTMLList = "";

        var strHTMLRow = ""

        var strNote = "";

        //for (var i=0; i<objPoints.Points.length; i++)
        for (var i = objPoints.Points.length - 1; i >= 0; i--) {
            currentPoint = objPoints.Points[i];
            //console.log(currentPoint.Lat);
            //console.log(currentPoint.Lng);
            //console.log(currentPoint.Text);

            //var icon = EMS.Services.StandardIcons.poi(this.map.tilePath, "000000","ff0000", i);


            var icon;
            if (AMTA_ID == currentPoint.RID) {
                icon = "/site/mm/images/whereis/milton30pxl.png";
            }
            else if (objPoints.Points.length < 10) {
                icon = "/site/mm/images/whereis/milton20pxl.png";
            }
            else {
                icon = "/site/mm/images/whereis/milton15pxl.png";
            }
 
            if (currentPoint.Lat != 0) {

                strURL = scriptname + '?ID=' + currentPoint.RID + '&zoom=' + map.getZoom() + '&maplocality=' + currentPoint.Lng + ":" + currentPoint.Lat + ":" + currentPoint.City + ":" + currentPoint.State + "#result-details-map";
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(currentPoint.Lat, currentPoint.Lng),
                    icon: icon,
                    map: map,
                    url: strURL,
                    info: currentPoint.Text
                });
 
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        window.location.href = marker.url;
                    }
                })(marker, i));

                google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
                    return function () {
                        var contentString = URLDecode(marker.info);
                        infowindow.setContent(contentString);
                        infowindow.open(map, marker);
                    }
                })(marker, i));

                google.maps.event.addListener(marker, 'mouseout', (function (marker, i) {
                    return function () {
                        infowindow.close();
                    }
                })(marker, i));

                markers[currentPoint.RID] = marker;
            
                
            }
            else {
                strURL = null;
            }

            strHTMLRow = '<tr><td>';
            if (strURL)
                strHTMLRow += '<a href="' + strURL + '">';
            strHTMLRow += URLDecode(currentPoint.Title);
            if (strURL)
                strHTMLRow += '</a>';
            strHTMLRow += '&nbsp;</td><td>' + URLDecode(currentPoint.Address) + '&nbsp;</td><td>' + URLDecode(currentPoint.City) + '&nbsp;</td><td>' + URLDecode(currentPoint.State) + '&nbsp;</td></tr>';

            strHTMLList = strHTMLRow + strHTMLList;
        }

        if (strHTMLList != '') {
            strNote = "Click on the location icon above or the location name below to see more location details.";
            strHTMLList = '<table class="map-search-results"><thead><tr><th>Name</th><th>Address</th><th>Suburb</th><th>State</th></tr></thead><tbody>' + strHTMLList + '</tbody></table>';
        }
        else {
            //strNote = "No recycle locations were found on this map. Please zoom out using the icon (<img alt=\"-\" src=\"/whereis/minus_small.gif\"/>) on the left, to find your nearest recycle location.";
            strNote = "No recycle locations were found on this map. Please zoom out using the zoom tool above left, or using your mouse wheel, to find your nearest recycle location.";
        }
        var objList = $('tdList');
        var objNote = $('tdMapNote');
        //console.log(strHTMLList);
        objList.innerHTML = strHTMLList;
        objNote.innerHTML = strNote;
        //console.log(objPoints);
    }
    catch (e) {
        console.log(e);
    }
}


function SubmitFailure(response) {
    StopAjax();
    console.log("SubmitFailure");
    console.log(response);
}

function clearMarkers() {
    
}

function URLDecode(s) {
    return decodeURIComponent(s).replace(/\+/g, " ").replace("%00", "");
}

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

(function ($) {
    $(document).ready(function () {
         
        jQuery(".result-details-map input.text-field").autocomplete({
            minLength: 6,
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
                    $("#maplocality").val(ui.item.lng + ":" + ui.item.lat + ":" + ui.item.suburb + ":" + ui.item.state);
                    $("form[name='form1']").submit();
                }
                else {
                    return false;
                }
            }
        }).focus(function (e) {
            $(this).autocomplete("search",$(this).val());
        });
      
 
    });
})(jQuery);

 