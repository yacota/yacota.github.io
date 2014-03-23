//
var scc = (function() {
    // Encapsulated variables


    // Home elements
    var searchForm   = document.getElementById('navbar-search-form');
    var carousel     = document.getElementById('featured-product-carousel');
    //var productlist  = document.querySelector('ul.list-unstyled');
    var productlist  = document.getElementById('featured-products');
    // search-produtcs

    // Search elements
    var searchFormCont   = document.getElementById('search-form-container');
    var productsearch    = document.getElementById('search-products');

    // Nav elements
    var brandLink        = document.querySelector('a.navbar-brand');
    var searchButton     = document.getElementById('search-button');
    var footerHomeLink   = document.getElementById('footer-home-link');
    var footerSearchLink = document.getElementById('footer-search-link');
    var searcherHomeLink = document.getElementById('searcher-home-link');

    // initializing jquery ajax support
    $.ajaxSetup({
        error: function(jqXHR, exception) {
            if (jqXHR.status == 404 || jqXHR.status == 500) {
                $('footer').innerHTML = '<p class="error">Error getting ' + ": "+ jqXHR.statusText + ",code: "+ jqXHR.status + "</p>";
            } else if (exception === 'parsererror') {
                $('footer').innerHTML += 'JSON parsing failed';
            } else {
                $('footer').innerHTML += 'Got this ajax error '+ exception.message;
            }
        }
    });

    var searchResultsTemplate   = compileTemplate( $("#search-result-template").html() );
    var featuredResultsTemplate = compileTemplate( $("#featured-result-template").html() );

    // compile template
    function compileTemplate(srcTemplate) {
        return Handlebars.compile(srcTemplate);
    }

    // Register event listeners
    $('#search-button').on('click', function() {
        showSearchPage();
    });

    //searchButton.addEventListener('click',     showSearchPage, false);
    footerSearchLink.addEventListener('click', showSearchPage, false);
    brandLink.addEventListener('click',        showHomePage,   false);
    footerHomeLink.addEventListener('click',   showHomePage,   false);
    searcherHomeLink.addEventListener('click', showHomePage,   false);

    // loading search results when search page is shown
    function loadJsonData(target, jsonUrl, template) {
        $.ajax({
            url: jsonUrl,
            type: 'GET',
            dataType: 'json'
        }).done(function (data) {
            target.innerHTML = "";
            data.items.forEach(function(entry) {
                target.innerHTML += template(entry);
            });
        }).fail(function (jqXHR, textStatus) {
            // showing no results but because of an error
            target.innerHTML = 'No data found due to an error, check footer message below';
        });
    }

    function showSearchPage() {
        searchForm.style.display  = "none";
        carousel.style.display    = "none";
        productlist.style.display = "none";

        searchFormCont.style.display  = "block";
        productsearch.style.display   = "block";
        var temp = document.getElementById('search-products');
        loadJsonData(temp, 'assets/data/search-results.json', searchResultsTemplate);
    }

    function showHomePage() {
        searchFormCont.style.display = "none";
        productsearch.style.display  = "none";

        searchForm.style.display  = "block";
        carousel.style.display    = "block";
        productlist.style.display = "block";
        var temp = document.getElementById('featured-products');
        loadJsonData(temp, 'assets/data/featured-products.json', featuredResultsTemplate);
    }

    var windowlanguage = window.navigator.userLanguage || window.navigator.language;
    //console.log('language es '+windowlanguage);

    // initializing datepicker
    $('#datepicker').datetimepicker({
        language : windowlanguage,
        pickTime: false
    })

    // initializing slider and also registering update listener on slideStop
    $('#slider').slider({
        tooltip : 'hide',
        handle : 'triangle',
        formater: function(value) {
            return value;
        }
    }).on('slideStop', function(ev){
        document.getElementById('span-slider-lower').value = '$'+ev.value[0];
        document.getElementById('span-slider-upper').value = '$'+ev.value[1];
    });

    // init loading json data
    showHomePage();
})();