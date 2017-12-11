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
