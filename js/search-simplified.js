/* global instantsearch */

app({
  appId: 'AQM12ZJFZT',
  apiKey: 'c33a6b6f6c0912ae9cd61765e90e2dd2',
  indexName: 'locations',
});


function app(opts) {
  const search = instantsearch({
    appId: opts.appId,
    apiKey: opts.apiKey,
    indexName: opts.indexName,
    urlSync: true,
    searchFunction: function (helper) {
        if (helper.state.query === '') {
            document.querySelector('#hits').innerHTML = '';
            return;
        }

        helper.search();
    }
    //,
    //searchParameters: {
      //  filters: 'IsPublic:Yes'
      //}
  });


  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-input',
      placeholder: 'Type a suburb or postcode',
    })
  );

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      hitsPerPage: 10,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results'),
      },
    })
  );

  search.addWidget(
    instantsearch.widgets.stats({
      container: '#stats',
    })
  );

  //search.addWidget(
    //instantsearch.widgets.sortBySelector({
      //container: '#sort-by',
      //autoHideContainer: true,
      //indices: [{
        //name: opts.indexName, label: 'Most relevant',
      //}, {
        //name: `${opts.indexName}_price_asc`, label: 'Lowest price',
      //}, {
        //name: `${opts.indexName}_price_desc`, label: 'Highest price',
      //}],
    //})
  //);

  //search.addWidget(
    //instantsearch.widgets.pagination({
      //container: '#pagination',
      //scrollTo: '#search-input',
    //})
  //);

  //search.addWidget(
    //instantsearch.widgets.refinementList({
      //container: '#name',
      //attributeName: 'name',
      //sortBy: ['isRefined', 'count:desc', 'name:asc'],
      //limit: 10,
      //operator: 'and',
      //templates: {
      //  header: getHeader('Name'),
      //},
    //})
  //);

  //search.addWidget(
    //instantsearch.widgets.refinementList({
      //container: '#country',
      //attributeName: 'country',
      //sortBy: ['isRefined', 'count:desc', 'name:asc'],
      //limit: 30,
      //operator: 'and',
      //templates: {
        //header: getHeader('Country'),
      //},
    //})
  //);

  //search.addWidget(
    //instantsearch.widgets.currentRefinedValues({
      //container: '#current-refined-values',
      //clearAll: 'after'
    //})
  //);

  //search.addWidget(
    //instantsearch.widgets.refinementList({
      //container: '#city',
      //attributeName: 'city',
      //sortBy: ['isRefined', 'count:desc', 'name:asc'],
      //limit: 30,
      //operator: 'and',
      //templates: {
      //  header: getHeader('City'),
      //},
    //})
  //);

  //search.addWidget(
    //instantsearch.widgets.numericRefinementList({
      //container: '#postcode',
      //attributeName: 'postcode',
      //options: [
        //{name: 'All'},
        //{start: 0800, end: 0899, name: 'NT'},
        //{start: 2000, end: 2999, name: 'NSW'},
        //{start: 2600, end: 2920, name: 'ACT'},
        //{start: 3000, end: 3999, name: 'VIC'},
        //{start: 4000, end: 4999, name: 'QLD'},
        //{start: 5000, end: 5799, name: 'SA'},
        //{start: 6000, end: 6797, name: 'WA'},
        //{start: 7000, end: 7799, name: 'TAS'}
      //],
      //templates: {
        //header: 'Postcode'
      //}
    //})
  //);

 // search.addWidget(
   // instantsearch.widgets.refinementList({
   //   container: '#state',
   //   attributeName: 'state',
   //   sortBy: ['isRefined', 'count:desc', 'name:asc'],
   //   limit: 10,
   //   operator: 'or',
   //   searchForFacetValues: {
   //     placeholder: 'Search for states',
   //     templates: {
   //       noResults: '<div class="sffv_no-results">No matching states.</div>',
   //     },
   //   },
   //   templates: {
   //     header: getHeader('State'),
   //   },
   // })
  //);

  //search.addWidget(
    //instantsearch.widgets.rangeSlider({
      //container: '#postcode',
      //attributeName: 'postcode',
      //templates: {
        //header: getHeader('Postcode'),
      //},
    //})
  //);



  search.start();
}

function getTemplate(templateName) {
  return document.querySelector(`#${templateName}-template`).innerHTML;
}

function getHeader(title) {
  return `<h5>${title}</h5>`;
}



var apts = instantsearch({
  appId: 'AQM12ZJFZT',
  apiKey: 'c33a6b6f6c0912ae9cd61765e90e2dd2',
  indexName: 'locations_dev'
});

var aptsHits = instantsearch.widgets.hits({
  container: document.querySelector('#hits'),
  hitsPerPage: 10,
  templates: {
    item: '<span class="db mv3"><strong><span class="green">{{{_highlightResult.SiteName.value}}}</span></strong> — {{{_highlightResult.ShopLevel.value}}} {{{_highlightResult.Building.value}}} {{{_highlightResult.StreetNumber.value}}} {{{_highlightResult.StreetAddress.value}}}, {{{_highlightResult.Suburb.value}}} {{{_highlightResult.Postcode.value}}}</span><hr class="bb b--black-10">',
    empty: getTemplate('no-results')
  }
});

var searchBox = instantsearch.widgets.searchBox({
  container: document.querySelector('#searchBox'),
  wrapInput: false
});

var customMapWidget = {
  _autocompleteContainer: document.querySelector('#places'),
  _mapContainer: document.querySelector('#map'),
  _hitToMarker: function(hit) {
    return new google.maps.Marker({
      position: {lat: hit._geoloc.lat, lng: hit._geoloc.lng},
      map: this._map,
      title: hit.name
    });
  },
  _handlePlaceChange: function(place) {
    // https://developers.google.com/maps/documentation/javascript/reference#Autocomplete
    var place = this._autocomplete.getPlace();

    if (place.geometry === undefined) {
      // user did not select any place, see https://developers.google.com/maps/documentation/javascript/reference#Autocomplete
      // events paragraph
      if (place.name === '') {
        // input was cleared
        this._helper
          .setQueryParameter('aroundLatLng')
          .search();
      }
      return;
    }

    // see https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
    var latlng = place.geometry.location.toUrlValue();

    // https://www.algolia.com/doc/guides/geo-search/geo-search-overview/#filter-and-sort-around-a-location
    this._helper
      .setQueryParameter('aroundLatLng', latlng)
      .search();
  },
  init: function(params) {
    this._helper = params.helper;
    this._autocomplete = new google.maps.places.Autocomplete(
        (this._autocompleteContainer),
        {types: ['geocode'], componentRestrictions: {country: 'au'}});
    this._autocomplete.addListener('place_changed', this._handlePlaceChange.bind(this));
    this._map = new google.maps.Map(this._mapContainer, {zoom: 1, center: new google.maps.LatLng(0, 0)});
  },
  render: function(params) {
    var markers = params.results.hits.map(this._hitToMarker.bind(this));
    var bounds = new google.maps.LatLngBounds();
    markers.forEach(function(marker) {
      bounds.extend(marker.getPosition());
    });
    this._map.fitBounds(bounds);
  }
};

apts.addWidget(searchBox);
apts.addWidget(aptsHits);
apts.addWidget(customMapWidget);
apts.start();
