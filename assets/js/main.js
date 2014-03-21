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


    // Register event listeners
    searchButton.addEventListener('click',     showSearchPage, false);
    footerSearchLink.addEventListener('click', showSearchPage, false);
    brandLink.addEventListener('click',        showHomePage,   false);
    footerHomeLink.addEventListener('click',   showHomePage,   false);
    searcherHomeLink.addEventListener('click', showHomePage,   false);


    function showSearchPage() {
        searchForm.style.display  = "none";
        carousel.style.display    = "none";
        productlist.style.display = "none";

        searchFormCont.style.display  = "block";
        productsearch.style.display   = "block";
    }

    function showHomePage() {
        searchFormCont.style.display = "none";
        productsearch.style.display  = "none";

        searchForm.style.display  = "block";
        carousel.style.display    = "block";
        productlist.style.display = "block";
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


})();