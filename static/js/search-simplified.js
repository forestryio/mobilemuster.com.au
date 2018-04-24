/* global instantsearch */

app( {
  appId: 'XEB6CZPGNW',
  apiKey: '2cf4da41c1f1fc39b38eec650ca53dd0',
  indexName: 'locations'
} )

function app ( opts ) {
  const search = instantsearch( {
    appId: opts.appId,
    apiKey: opts.apiKey,
    indexName: opts.indexName,
    urlSync: true,
    searchFunction: function ( helper ) {
      if ( helper.state.query === '' ) {
        document.querySelector( '#hits' ).innerHTML = ''
        return
      }

      helper.search()
    }
  } )

  search.addWidget(
    instantsearch.widgets.searchBox( {
      container: '#search-input',
      placeholder: 'Type a suburb or postcode'
    } )
  )

  search.addWidget(
    instantsearch.widgets.hits( {
      container: '#hits',
      hitsPerPage: 10,
      templates: {
        item: getTemplate( 'hit' ),
        empty: getTemplate( 'no-results' )
      }
    } )
  )

  search.start()
}

function getTemplate ( templateName ) {
  return document.querySelector( '#' + templateName + '-template' ).innerHTML
}

/*
function getHeader ( title ) {
  return '<h5>' + title + '</h5>'
}
*/

var apts = instantsearch( {
  appId: 'XEB6CZPGNW',
  apiKey: '2cf4da41c1f1fc39b38eec650ca53dd0',
  indexName: 'locations'
} )

var aptsHits = instantsearch.widgets.infiniteHits( {
  container: document.querySelector( '#hits' ),
  hitsPerPage: 5,
  showMoreLabel: 'Show more drop-off points',
  empty: '',
  templates: {
    item: '<span class="db mv3"><strong><span class="green">{{{_highlightResult.SiteName.value}}}</span></strong><br>{{{_highlightResult.ShopLevel.value}}} {{{_highlightResult.Building.value}}} {{{_highlightResult.StreetNumber.value}}} {{{_highlightResult.StreetAddress.value}}}, {{{_highlightResult.Suburb.value}}}, {{{_highlightResult.State.value}}}, {{{_highlightResult.Postcode.value}}}</span><hr class="bb b--black-10">',
    empty: getTemplate( 'no-results' )
  }
} )

var searchBox = instantsearch.widgets.searchBox( {
  container: document.querySelector( '#searchBox' ),
  wrapInput: false
} )

var customMapWidget = {
  _autocompleteContainer: document.querySelector( '#places' ),
  _mapContainer: document.querySelector( '#map' ),
  markers: [],
  // Transform one hit to a Google Maps marker
  _hitToMarker: function ( hit ) {
    var marker = new google.maps.Marker( {
      position: {lat: hit._geoloc.lat, lng: hit._geoloc.lng},
      map: this._map,
      title: hit.SiteName
    } )

    var infowindow = new google.maps.InfoWindow( {
      content:
        '<span class="b">' + hit.SiteName + '</span><br>' +
        '<span class="">' + hit.ShopLevel + '&nbsp;' + hit.Building + '</span><br>' +
        '<span class="">' + hit.StreetNumber + '&nbsp;' + hit.StreetAddress + '<br>' + '<span class="b">' + hit.Suburb + '</span>' + '&nbsp;' + hit.State + '&nbsp;' + hit.Postcode +
        '</span>'
    } )

    // Add an info popup when clicking on the marker.
    marker.addListener( 'mouseover', function () {
      infowindow.open( map, marker )
    } )

    // assuming you also want to hide the infowindow when user mouses-out
    marker.addListener( 'mouseout', function () {
      infowindow.close()
    } )

    return marker
  },
  _handlePlaceChange: function ( place ) {
    // https://developers.google.com/maps/documentation/javascript/reference#Autocomplete
    place = this._autocomplete.getPlace()

    if ( place.geometry === undefined ) {
      // user did not select any place, see https://developers.google.com/maps/documentation/javascript/reference#Autocomplete
      // events paragraph
      if ( place.name === '' ) {
        // input was cleared
        this._helper
          .setQueryParameter( 'aroundLatLng' )
          .search()
      }
      return
    }

    // see https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
    var latlng = place.geometry.location.toUrlValue()

    // https://www.algolia.com/doc/guides/geo-search/geo-search-overview/#filter-and-sort-around-a-location
    this._helper
      .setQueryParameter( 'aroundLatLng', latlng )
      .search()
  },
  init: function ( params ) {
    this._helper = params.helper
    this._autocomplete = new google.maps.places.Autocomplete(
      ( this._autocompleteContainer ),
      {types: ['geocode'], componentRestrictions: {country: 'au'}} )
    this._autocomplete.addListener( 'place_changed', this._handlePlaceChange.bind( this ) )
    this._map = new google.maps.Map( this._mapContainer, {zoom: 1, center: new google.maps.LatLng( 0, 0 )} )
  },
  render: function ( params ) {
    var markers = params.results.hits.map( this._hitToMarker.bind( this ) )
    var bounds = new google.maps.LatLngBounds()
    markers.forEach( function ( marker ) {
      bounds.extend( marker.getPosition() )
    } )
    this._map.fitBounds( bounds )
  }
}

apts.addWidget( searchBox )
apts.addWidget( aptsHits )
apts.addWidget( customMapWidget )
apts.start()
