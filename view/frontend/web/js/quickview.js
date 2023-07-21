define([
    'jquery',
    'Magento_Ui/js/modal/modal'
], function ($, modal) {
    'use strict';
    return function (config) {
        console.log(config);
        $('.quickview-button').on('click', function () {
            // Fetch the product data using AJAX
            $.ajax({
                url: '/quickview/product/quickview',
                data: {product_id: config.productId},
                type: 'post',
                dataType: 'json',
                success: function (response) {
                    // Set the product information in the modal content
                    $('.quickview-product-info h2').text(response.product_name);
                    $('.product-description').text(response.product_description);

                    // Open the QuickView modal window size medium
                    var options = {
                        type: 'popup',
                        responsive: true,
                        innerScroll: true,
                        modalClass: 'quickview-modal',
                        size: 'sm',
                        title: 'Product QuickView',
                        buttons: [],
                        clickableOverlay: true,
                    };
                    var popup = modal(options, '#quickview-modal-container');
                    $('#quickview-modal-container').modal('openModal');
                },
                error: function (xhr, status, error) {
                    console.log(error);
                }
            });
        });
    };
});
