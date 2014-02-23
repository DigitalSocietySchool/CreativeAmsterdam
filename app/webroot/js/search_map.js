/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
var vectorLayer = new OpenLayers.Layer.Vector();
var broadcastLayer = new OpenLayers.Layer.Vector();

$(document).on('ready', function(){
	getSearchResults();
    setCategories();
});
$(document).on('click', '#close_menu', function(){
    $('#menu').hide();
});
$(document).on('click', '#close_list', function(){
    $('.result_list').hide();
});
$(document).on('click', '.result_list .user', function(){
    $.cookie("showID", $(this).attr('id'), {path: '/'});
    $.cookie("status", "visiting", {path: '/'});
    $.cookie("path", "map", {path: '/'});
    window.location.href = "/Users/profile";
});
$(document).on('click', '.result_list .organisation', function(){
    $.cookie("showID", $(this).attr('id'), {path: '/'});
    $.cookie("status", "visiting", {path: '/'});
    $.cookie("path", "map", {path: '/'});
    window.location.href = "/Users/profile";
});
$(document).on('click', '.result_list .Place', function(){
    $.cookie("showID", $(this).attr('id'), {path: '/'});
    $.cookie("status", "visiting", {path: '/'});
    $.cookie("path", "map", {path: '/'});
    window.location.href = "/Places/profile";
});
$(document).on('click', '.result_list .Event', function(){
    $.cookie("showID", $(this).attr('id'), {path: '/'});
    $.cookie("status", "visiting", {path: '/'});
    $.cookie("path", "map", {path: '/'});
    window.location.href = "/Events/profile";
});
$(document).on('click', "#map:not(#sidebar)", function(){
    if($("#sidebar").is(":visible")){
        $("#sidebar").hide();
    }
});
$(document).on('click', '.list', function(){
    $(".result_list").show();
});
$(document).on('click', '#search_map_page .menu', function(){
    $("#menu").show();
});
$(document).on('click', '#search', function(){
    if($('#search_dropdown').is(':visible'))
        $('#search_dropdown').hide();
    else    
        $('#search_dropdown').show();
});
$(document).on('click', '#categories', function(){
    if($('#categories_dropdown').is(':visible'))
        $('#categories_dropdown').hide();
    else    
        $('#categories_dropdown').show();
});
$(document).on('click', '#search_fav', function(){
    input = $(".search_box input").val();
    $.cookie("search_input", input, {path: "/"});
    //window.location.href = "/Searches/searchMap";
});
$(document).on('click', '.search_categories_button', function(){
    window.location.href = "/Searches/searchMap";
});
$(document).on('click', '#categories_dropdown .col-xs-6', function(){
    active = [];
    if($(this).hasClass('active')){
        $(this).removeClass('active');
        classes = $(this).attr('class').split(" ");
        temp_class = classes[1];
        src = $("." + temp_class + " img").attr('src');
        src = src.slice(0, -13);
        src += ".png";
        $("." + temp_class + " img").attr('src', src);
    }
    else{
        $(this).addClass('active');
        classes = $(this).attr('class').split(" ");
        temp_class = classes[1];
        src = $("." + temp_class + " img").attr('src');
        src = src.slice(0, -4);
        src += "_selected.png";
        $("." + temp_class + " img").attr('src', src);
    }

    $("#categories_dropdown .active").each(function(){
        classes = $(this).attr('class').split(' ');
        class_selected = classes[1];
        console.log(class_selected);
        active.push(class_selected);
    });
    $.cookie('search', active, {path: '/'});
   // searchFavorites();  
});
$(document).on('click', '#clear_search', function(){
    $(".favorite_item").each(function(){
        $(this).show();
    });
    $("#clear_search").hide();
    $("#search_fav_input").val("");
});
$(document).on('click', '#search_map_page', function(){
    $("#sidebar").hide();
});
$(document).on('click', '.home_button', function(){
    $.removeCookie('tags', { path: '/' });
    $.removeCookie('search', { path: '/' });
    $.removeCookie("center_x", {path : '/'});
    $.removeCookie("center_y", {path : '/'});
    $.removeCookie("search_input", {path : '/'});
    login = $.cookie('user_id');
    if(login == "" || login == undefined)
        window.location.href = "/";
    else
        window.location.href = "/Users/userPage";
});
$(document).on('click', '#search_map_page .list_item', function(){
    id = $(this).attr('id');
    classes = $(this).attr('class');
    classes = classes.split(' ');
    type = classes[1];
    $.cookie("status", "visiting", {path: '/'});
    $.cookie("showID", id, {path: '/'});
    $.cookie("path", "map", {path: '/'});
    window.location.href = "/" + type + "s/profile";
});

$(document).on('click', '#search_fav', function(){
    filterFeature();
})

function filterFeature(){
    search_val = $('#search_fav_input').val();
    url = "/Searches/getSearchResultByInput";
    data = {'input' : search_val}
    callback = handleGetSearchResults;
    ajaxCall(url, data, callback);

}

function setCategories(){
    categories = $.cookie('search').split(',');
    $.each(categories, function(i, item){
        if(item == "user"){
            $(".sidebar_dropdown .user").addClass('active');
            $(".sidebar_dropdown .user img").attr('src', '/img/search/user_selected.png');
        }      
        if(item == "org"){
            $(".sidebar_dropdown .org").addClass('active');
            $(".sidebar_dropdown .org img").attr('src', '/img/search/organization_selected.png');
        }  
        if(item == "place"){
            $(".sidebar_dropdown .place").addClass('active');
            $(".sidebar_dropdown .place img").attr('src', '/img/search/place_selected.png');
        }  
        if(item == "event"){
            $(".sidebar_dropdown .event").addClass('active');
            $(".sidebar_dropdown .event img").attr('src', '/img/search/event_selected.png');
        }       

    });

}

function getSearchResults() {    
    if($.cookie("search_input") != undefined){
        url = "/Searches/getSearchResultByInput";
        data =  {'input': $.cookie("search_input")};
    }
    else{
        url = "/Searches/getSearchResult";
        data =  {'tags': $.cookie("tags"), 'search_args': $.cookie("search")}; 
    }
    callback = handleGetSearchResults;
	ajaxCall(url, data, callback);
}

function handleGetSearchResults(result) {
	initMap(result);	
}

function showItem(feature) {
    console.log(feature.attributes.id);
    $.cookie("showID", feature.attributes.id, {path: '/'});
    $.cookie("status", "visiting", {path: '/'});
    $.cookie("path", "map", {path: '/'});
    if(feature.attributes.type == "organisation")
        window.location.href = "/Users/profile/";
    else
        window.location.href = "/" + feature.attributes.type + "s/profile/";
}

function initMap(result){
    insert = "";
    personal_geo = [];
    //console.log(navigator.geolocation.getCurrentPosition);
	if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition,ShowPositionNoGeo);
    }
    else{
        console.log('not supported');
        x.innerHTML="Geolocation is not supported by this browser.";
    }

    function showPosition(position){
        latlng = "" + position.coords.latitude + ":" + position.coords.longitude;
        url = "/Searches/broadcastPosition";
        data = {"latlng":latlng};
        callback = handleShowPosition;
        ajaxCall(url,data,callback);
    }

    function handleShowPosition(result2){
        personal_geo = result;
        var feature = new OpenLayers.Feature.Vector(
            
            new OpenLayers.Geometry.Point(result2[0], result2[1]),
                            {id: 'geolocatie', type: "locatie"},
                            {externalGraphic: "/img/search/current_position.png", graphicHeight: 15});
        broadcastLayer.addFeatures(feature);
        map.setCenter(new OpenLayers.LonLat(result2[0],result2[1]), 9);
        
        insert = "<div id=\"close_list\"><img class=\"img-responsive\" src=\"/img/laptop/favorite_list/close.png\" /></div>";
        result_sorted = {};
        result_area = {};
        $.each(result, function(i, item){
            if(item.LatLon != ''){
                LonLat_temp = item.LatLon.split(",");
                x_dif = result2[0] - LonLat_temp[0];
                y_dif = result2[1] - LonLat_temp[1];
                pyth = Math.round(Math.sqrt(x_dif * x_dif + y_dif * y_dif));
                result_sorted[pyth] = item;
            }
            else
                result_area.push(item);
        });

        $.each(result_sorted, function(i, item){
            insert += "<div class=\"col-xs-12 " + item.type + " list_item\" id=\"" + item.id + "\"><div class=\"list_image img-circle\"><img class=\"img-responsive img-circle\" src=\"" + item.p_picture + "\"/></div><div class=\"list_name\">" + item.name + "</div></div>"
            LonLat = item.LatLon.split(",");
            temp_type = item.type.toLowerCase();
            var feature = new OpenLayers.Feature.Vector(
                
                new OpenLayers.Geometry.Point(LonLat[0], LonLat[1]),
                                {id: item['id'], type: item.type},
                                {externalGraphic: "/img/search/" + temp_type + "_pin.png", graphicHeight: 35});
            vectorLayer.addFeatures(feature);
        });

        $.each(result_area, function(i, item){
            insert += "<div class=\"col-xs-12 " + item.type + " list_item\" id=\"" + item.id + "\"><div class=\"list_image img-circle\"><img class=\"img-responsive img-circle\" src=\"" + item.p_picture + "\"/></div><div class=\"list_name\">" + item.name + "</div></div>"
        });
        $(".result_list").html(insert);

    }

    function ShowPositionNoGeo(error){
        console.log("no geo");
        insert = "<div id=\"close_list\"><img class=\"img-responsive\" src=\"/img/laptop/favorite_list/close.png\" /></div>";
        $.each(result, function(i, item){
            insert += "<div class=\"col-xs-12 " + item.type + " list_item\" id=\"" + item.id + "\"><div class=\"list_image img-circle\"><img class=\"img-responsive img-circle\" src=\"" + item.p_picture + "\"/></div><div class=\"list_name\">" + item.name + "</div></div>"
            LonLat = item.LatLon.split(",");
            temp_type = item.type.toLowerCase();
            var feature = new OpenLayers.Feature.Vector(
                
                new OpenLayers.Geometry.Point(LonLat[0], LonLat[1]),
                                {id: item['id'], type: item.type},
                                {externalGraphic: "/img/search/" + temp_type + "_pin.png", graphicHeight: 35});
            vectorLayer.addFeatures(feature);
        });
        $(".result_list").html(insert);
    }

	var mapOptions = {
        theme: null,
        numZoomLevels: 10,
        maxExtent: new OpenLayers.Bounds(-285401.92,22598.08,595401.9199999999,903401.9199999999),
		//resolutions: [3440.64, 1720.32, 860.16, 430.08, 215.04, 107.52, 53.76,
		//			26.88, 13.44, 6.72, 3.36, 1.68, 0.84, 0.42, 0.21],
        resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
        //controls: [ ],
        maxResolution: "156543.0339",
        units: "m",
        projection: new OpenLayers.Projection("EPSG:28992"),
        controls: [
                        new OpenLayers.Control.Navigation(),
                       // new OpenLayers.Control.PanZoomBar(),
                        //new OpenLayers.Control.PanZoom(),
                        //new OpenLayers.Control.LayerSwitcher({'ascending':true}),
                        //new OpenLayers.Control.Permalink(),
                        //new OpenLayers.Control.ScaleLine(),
                        //new OpenLayers.Control.Permalink('permalink'),
                        //new OpenLayers.Control.MousePosition(),
                        //new OpenLayers.Control.OverviewMap(),
                        //new OpenLayers.Control.KeyboardDefaults(),
                        //new OpenLayers.Control.Permalink({anchor: true}),
						//new OpenLayers.Control.Attribution()
                    ]
    };
    
    map = new OpenLayers.Map("map", 
		mapOptions
	);
    
    var matrixIds = new Array(26);
    for (var i=0; i<26; ++i) {
        matrixIds[i] = "EPSG:28992:" + i;
    }
    // meest gedetailleerd: level 3 tot 14 (NL)
    var brt = new OpenLayers.Layer.WMTS({
        name: "Basis Registratie Topografie",
        url: "http://geodata.nationaalgeoregister.nl/wmts/",
        layer: "brtachtergrondkaart",
        matrixSet: "EPSG:28992",
        matrixIds: matrixIds,
        format: "image/png",
        style: "_null",
        isBaseLayer: true,
        attribution: 'Basis Registratie Topografie &copy; OSM & Kadaster'
    }); 
    
   	map.addLayers([brt, vectorLayer, broadcastLayer]);

   	vectorLayer.events.on({
        "featureselected": function(e) {
            map.setCenter(new OpenLayers.LonLat(e.feature.geometry.x,e.feature.geometry.y), 9);
            $.cookie("center_x", e.feature.geometry.x, {path : '/'});
            $.cookie("center_y", e.feature.geometry.y, {path : '/'});
            showItem(e.feature);
        }
    });

   	selectControl = new OpenLayers.Control.SelectFeature(
                [vectorLayer],
                {
                    clickout: true, toggle: false,
                    multiple: false, hover: false
                }
            );
            
    map.addControl(selectControl);
    selectControl.activate();  
    if($.cookie("center_x") != undefined)
        map.setCenter(new OpenLayers.LonLat($.cookie('center_x'),$.cookie('center_y')), 9);
    else
        map.setCenter(new OpenLayers.LonLat(121551,485113), 9);
}