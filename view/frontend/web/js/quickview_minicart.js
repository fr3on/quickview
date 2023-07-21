define([
    'jquery',
    'Magento_Ui/js/modal/modal',
    'Magento_Customer/js/customer-data',
    'Fr3on_QuickView/js/quickview'
], function ($, modal, customerData) {
    'use strict';

    return function () {
        var cartData = customerData.get('cart'),
            cartItems = cartData()['items'] ? cartData()['items'] : [];

        // Listen for the 'contentLoading' event and update the QuickView modal when the Mini Cart content changes
        $(document).on('contentLoading', function (event, data) {
            // refresh the cart items
            cartData = customerData.get('cart');
            cartItems = cartData()['items'] ? cartData()['items'] : [];

            // Update the QuickView modal content
            var modalContent = $('.quickview-minicart-modal-content');
            modalContent.empty();
        });
        //  Listen for the 'contentUpdated' event and update the QuickView modal when the Mini Cart content changes

        $(document).on('contentUpdated', function (event, data) {
            // refresh the cart items
            cartData = customerData.get('cart');
            cartItems = cartData()['items'] ? cartData()['items'] : [];

            // Update the QuickView modal content
            var modalContent = $('.quickview-minicart-modal-content');
            modalContent.empty();
        });

        $('.quickview-minicart-button').on('click', function () {
            // Open the QuickView modal
            var options = {
                type: 'popup',
                responsive: true,
                innerScroll: true,
                modalClass: 'quickview-minicart-modal',
                title: 'Mini Cart QuickView',
                buttons: [],
            };

            var popup = modal(options, $('.quickview-minicart-modal-content'));
            $('.quickview-minicart-modal-content').modal('openModal');

            // Display Mini Cart items and QuickView button in the QuickView modal
            var modalContent = $('.quickview-minicart-modal-content');
            modalContent.empty();

            if (cartItems.length > 0) {
                var itemsList = '<table><thead><tr><th>Product</th><th>Price</th><th>Quantity</th><th>Action</th></tr></thead><tbody>';
                $.each(cartItems, function (index, item) {
                    itemsList += `
                        <tr>
                            <td>
                                <a href="${item['product_url']}"> ${item['product_name']} </a>
                            </td>
                            <td>${item['product_price']}</td>
                            <td>${item['qty']}</td>
                            <td>
                                <button class="action quickview-button primary" data-product-id="${item['product_id']}">Quick View</button>
                            </td>
                        </tr>
                    `;
                });
                itemsList += '</tbody></table>';
                modalContent.append(itemsList);


                // Initialize the QuickView button in the Mini Cart
                $('.quickview-button').on('click', function () {
                    // Get the product ID from data attributes
                    var productId = $(this).data('product-id');

                    // Fetch the product data using AJAX
                    $.ajax({
                        url: '/quickview/product/quickview',
                        data: {product_id: productId},
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
            } else {
                modalContent.html('<p>No items in the Mini Cart.</p>');
            }
        });
    };
});
