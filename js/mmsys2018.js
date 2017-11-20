(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Mark external link

function external_link() {
    var links = $('a');

    for (var i = 0; i < links.length; i++) {
        var link = $(links[i]);
        var href = link.attr('href');
        var no_external_class = link.hasClass('no-external');

        if (! no_external_class && ! href.includes('http://localhost:1313') && ! href.includes('http://www.mmsys2018.org') && href.includes('://')) {
            link.append(' <span class="fa fa-external-link"></span>');
        }
    }
}

module.exports = external_link;

},{}],2:[function(require,module,exports){
// Menubar collapse

function Menubar(element) {

    var is_visible,
        window_width;

    var instance;

    function setup() {
        element = $(element);  // jquery wrap element
        is_visible = false;
        window_width = $(window).width();

        collapse_button = _find_collapse_button();
        if (collapse_button) {
            collapse_button.click(_toggle);
        }

        // Hide on resize
        $(window).resize(function() {
            if ($(window).width() !== window_width) {
                _hide();
                window_width = $(window).width();
            }
        });
    }

    function _find_collapse_button() {
        var collapse_buttons = element.children('.menubar-collapse');
        return $(collapse_buttons[0]);  // only respond to fist button
    }

    function _get_items_height() {
        var items = $(element.children('ul')[0]);
        return items.height();
    }

    function _toggle() {
        if (is_visible) {
            _hide();
        } else {
            _show();
        }
    }

    function _show() {
        var bar_height = element.height();
        var items_height = _get_items_height();
        var full_height = bar_height + items_height + 3;  // + 3 to compensate for the border in the menu bar..

        element.css('height', full_height + 'px');
        is_visible = true;
    }

    function _hide() {
        element.removeAttr('style');
        is_visible = false
    }

    instance = {};

    setup();
    return instance;
}


function menubar_collapse(menubar_class) {

    var menubars = $(menubar_class);

    for (var i = 0; i < menubars.length; i++) {
        Menubar(menubars[i]);
    }
}


module.exports = menubar_collapse;

},{}],3:[function(require,module,exports){

var menubar_collapse = require('./menubar-collapse');
var external_link = require('./external-link');

$(document).ready(function() {

    menubar_collapse('.menubar');
    external_link();

});

},{"./external-link":1,"./menubar-collapse":2}]},{},[3]);
