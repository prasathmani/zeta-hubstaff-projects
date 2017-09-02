/*
 * main.js
 * This file contains logic rendring page list from service
 * @author: Prasath Mani
 */

let APP = window.APP || {};
APP.MyFunction = (function (APP, $) {
    'use strict';

    // public methods
    let init,
        _main,
        wrapper = $('.main-container'),
        _renderCardItems,
        _onPageLoad,
        _addNewCard;

    /**
     * This is the main method
     * @return {void}
     */
    _main = () => {
        //call page load methods
        _onPageLoad();

        //Events
        // wrapper.find('input.newcard').on('keyup', _addNewCard);
    };

    /**
     * This is the _onPageLoad method
     * @return {html}
     */
    _onPageLoad = () => {
        $.ajax({
            url: 'data.json',
            dataType: 'json',
            success: function (data) {
                if (!!data) {
                    _renderCardItems(data);
                }
            },
            complete: function (res) {
                // console.log(res.responseText);
            },
            failure: function () {
                console.error("Ajax Error");
            }
        });
    };

    /**
     * This is the _showPopup method
     * @return {void}
     */
    _renderCardItems = (data) => {
        let cardHtml = Handlebars.compile($("#card-items").html());
        $('.main-wrapper').html(cardHtml(data.result)); 
        wrapper.find('input.newcard').on('keyup', _addNewCard);
    };

    _addNewCard = (e) => {
        if (e.keyCode == 13) {
            let $this = $(e.currentTarget);
            let cardHtml = Handlebars.compile($("#new-card").html());
            if (!!$this.val()) {
                let newItem = {
                    "id": Math.floor((Math.random() * 10) + 1),
                    "image": "assets/images/img-2.png",
                    "content": $this.val() ,
                    "statusColor": "green",
                    "action": "start",
                    "link": "#/goTo/" + Math.floor((Math.random() * 10) + 1),
                    "color": "green"
                }
                $this.closest('ul').append(cardHtml(newItem));
                $this.val('');
            }
        }
        
    };

    init = () => {
        if (wrapper.length > 0) {
            _main();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'APP'));

jQuery(document).ready(function () {
    'use strict';
    APP.MyFunction.init();
});
