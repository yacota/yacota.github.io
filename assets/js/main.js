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

    // Register event listeners
    $('#search-button').on('click', function() {
        showSearchPage();
        //var a = $('#search-products');
        var temp = document.getElementById('search-products');
        loadSearchResults(temp);
    });

    //searchButton.addEventListener('click',     showSearchPage, false);
    footerSearchLink.addEventListener('click', showSearchPage, false);
    brandLink.addEventListener('click',        showHomePage,   false);
    footerHomeLink.addEventListener('click',   showHomePage,   false);
    searcherHomeLink.addEventListener('click', showHomePage,   false);





    // loading search results when search page is shown
    function loadSearchResults(target) {
        $.ajax({
            url: 'assets/data/search-results.json',
            type: 'GET',
            dataType: 'json'
        }).done(function (data) {
            data.items.forEach(function(entry) {
                var thumb = entry.thumb;
                var title = entry.title;
                var url   = entry.url;
                var desc  = entry.description;
                var time  = entry.timeleft;
                var watch = entry.watchers;
                var price = entry.price;
                target.innerHTML += '<li id="result" class="col-sm-12 col-md-6">' +
                                    '<div class="col-xs-6">' +
                                        '<a href="javascript:void(0)"><img src='+thumb+' alt="" class="img-responsive"></a>' +
                                    '</div>' +
                                    '<div class="product-description-holder col-xs-6">' +
                                        '<h2><a href="javascript:void(0)">'+ title +'</a></h2>' +
                                        '<p>' +
                                        desc +
                                        '</p>' +
                                    '</div>' +
                                    '<div class="row col-xs-12">' +
                                        '<div class="col-xs-12 col-sm-4">' +
                                            '<div class="col-sm-12 col-xs-6">' +
                                            time+'h left' +
                                            '</div>' +
                                            '<div class="col-sm-12 col-xs-6">' +
                                            'Today 15.23' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12 col-sm-4">' +
                                            '<div class="col-sm-12 col-xs-6">' +
                                                '<span class="glyphicon glyphicon-eye-open"></span>' +
                                                '<span class="badge">'+ watch +'</span>' +
                                            '</div>' +
                                            '<div class="col-sm-12 col-xs-6">' +
                                            'Watchers' +
                                            '</div>' +
                                        '</div>' +

                                        '<div class="col-xs-12 col-sm-4">' +
                                            '<div class="col-sm-12 col-xs-6">' +
                                            '$' + price +
                                            '</div>' +
                                            '<div class="col-sm-12 col-xs-6">' +
                                            'Current Price' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</li>';
            });

        }).fail(function (jqXHR, textStatus) {
            // showing no results but because of an error
            target.innerHTML = 'No results found due to an error, check footer message below';
        });
    }

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