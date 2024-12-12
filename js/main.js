'use strict';
(function ($) {

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        appendTo: '.header-section',
        allowParentLinks: true,
        closedSymbol: '<i class="fa fa-angle-right"></i>',
		openedSymbol: '<i class="fa fa-angle-down"></i>'
    });


    /*------------------
        Carousel Slider
    --------------------*/
     $(".hero-items").owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        smartSpeed: 1200,
        autoplayHoverPause: true,
        mouseDrag: false,
        autoplay: false,
    });



    /*------------------
        Carousel Slider
    --------------------*/
    $(".product-slider").owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        items: 1,
        dots: true,
        autoplay: true,
    });

    /*-------------------
		Quantity change
	--------------------- */
    var proQty = $('.pro-qty');
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
    });

    /*-------------------
		Radio Btn
	--------------------- */
    $(".shipping-info .cs-item label").on('click', function () {
        $(".shipping-info .cs-item label").removeClass('active');
        $(this).addClass('active');
    });

    $(".checkout-form .diff-addr label").on('click', function () {
        $(this).toggleClass('active');
    });

    $(".payment-method ul li label").on('click', function () {
        $(this).toggleClass('active');
    });


    // dynamic 
    if($(".shop-page-products").length > 0 || $(".related-product-section").length > 0 || $(".home-page-products").length > 0){

        $.ajax({
            url: "http://127.0.0.1:3001/api/products/",
            type: "GET",
            success: function(data){
                console.log(data);
                // Clear existing products first
                $(".shop-page-products").empty();
                $(".related-product-section").empty();
                $(".home-page-products").empty();
                
                data.forEach(function(product, index){
                    var productItem = $(`<div class="col-lg-3 col-sm-6">
                        <div class="single-product-item">
                            <figure>
                                <a href="./product-page.html?id=${product.id}">
                                    <img src="${product.images[0]}" alt="">
                                </a>
                                <div class="p-status">new</div>
                            </figure>
                            <div class="product-text">
                                <h6>${product.title}</h6>
                                <p>$${product.price}</p>
                            </div>
                        </div>
                    </div>`);
                    if($(".shop-page-products").length > 0 ){
                        $(".shop-page-products").append(productItem);
                    }else if($(".related-product-section").length > 0 && index < 4){
                        $(".related-product-section").append(productItem);
                    }else if($(".home-page-products").length > 0 && index < 8){
                        $(".home-page-products").append(productItem);
                    }
                });
            },
            error: function(err){
                console.log(err);
            }
        });

    }

    // product details 
    if($(".product-details-section").length > 0){

        var productId = new URLSearchParams(window.location.search).get("id");
        if(productId){
            $.ajax({
                url: "http://127.0.0.1:3001/api/products/"+productId,
                type: "GET",
                success: function(data){
                    console.log(data);
    
    
                    const content = `        <div class="container" >
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="product-slider owl-carousel">
                                   ${
                                        data.images.map((image)=>(`<div class="product-img">
                                                <figure>
                                                    <img src="${image}" alt="">
                                                    <div class="p-status">new</div>
                                                </figure>
                                            </div>`)).join("")
                                    }
                                </div>
    
                            </div>
                            <div class="col-lg-6">
                                <div class="product-content">
                                    <h2>${data.title}</h2>
                                    <div class="pc-meta">
                                       <h5>$<span>${data.price}</span></h5>
                                        <div class="rating">
                                        ${
                                            Array.from({length: data.rating}, (v, i) => i).map((i) => {
                                                return `<i class="fa fa-star"></i>`;
                                            }).join("")
                                        }
                                        </div>
                                    </div>
                                   <p>${data.description}</p>
                                    <ul class="tags">
                                        <li><span>Category :</span>
                                            Hijab
                                        </li>
                                        <li><span>Tags :</span>
                                            Hijab, Modern, Fashion
                                        </li>
                                    </ul>
                                    <a href="#" class="primary-btn pc-btn add-to-cart" data-id="${data.id}">Add to cart</a>
                                </div>
                            </div>
                        </div>
                    </div>`
    
                    $(".product-details-section").empty().append(content);
                    $(".product-slider").owlCarousel({
                        loop: true,
                        margin: 0,
                        nav: false,
                        items: 1,
                        dots: true,
                        autoplay: true,
                    });
                    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
                    const addToCartBtn = $("body").find(".add-to-cart");
                    if(addToCartBtn.length > 0){
                        const isExist = cart.find(cartItem => addToCartBtn.data("id") == cartItem.id);
                        if(isExist){
                            addToCartBtn.text("Remove from cart");
                        }
                    }
                    
                },
                error: function(err){
                    console.log(err);
                }
            });

        }
    }

        // dynamic products 
    if($(".shop-page-products").length > 0){

        $.ajax({
            url: "http://127.0.0.1:3001/api/products/",
            type: "GET",
            success: function(data){
                console.log(data);
                // Clear existing products first
                $(".shop-page-products").empty();
                
                data.forEach(function(product){
                    var productItem = $(`<div class="col-lg-3 col-sm-6">
                        <div class="single-product-item">
                            <figure>
                                <a href="./product-page.html?id=${product.id}">
                                    <img src="${product.images[0]}" alt="">
                                </a>
                                <div class="p-status">new</div>
                            </figure>
                            <div class="product-text">
                                <h6>${product.title}</h6>
                                <p>$${product.price}</p>
                            </div>
                        </div>
                    </div>`);
                    $(".shop-page-products").append(productItem);
                });
            },
            error: function(err){
                console.log(err);
            }
        });

    }

    // add to cart 
    $(document).on("click", ".add-to-cart", function(e){
        e.preventDefault();
        let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

        // create session storage 
        var productId = $(this).data("id");
        var product = cart.find((product) => product.id == productId);
        if(!product){
            cart.push({id: productId, 
                quantity: 1,
                title: $(this).parent().find("h2").text(),
                price: $(this).parent().find("h5>span").text(),
            });
            $(this).text("Remove from cart");
            sessionStorage.setItem("cart", JSON.stringify(cart));
            $(".header-cart-counter").text(cart.length);
        }else{
            const newCart = cart.filter((product) => product.id != productId);
            sessionStorage.setItem("cart", JSON.stringify(newCart));
            $(".header-cart-counter").text(newCart.length);
            $(this).text("Add to cart");
        }
      

    });

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    // add to cart on load 
    $(".header-cart-counter").text(cart.length);

   
    if($('.cart-table-body').length>0){
        let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        $(".cart-table-body").empty();
        if(cart.length){
            cart.forEach((product) => {
                $(".cart-table-body").append(`<tr>
                    <td class="product-col">
                        <div class="p-title">
                            <h5>${product.title}</h5>
                        </div>
                    </td>
                    <td class="price-col">${product.price}</td>
                    <td class="price-col">
                        ${product.quantity}
                    </td>
                    <td class="total">${product.price}</td>
                </tr>`);
            });
        }else{
            $(".cart-table-body").append(`<tr>
                <td class="product-col" colspan="4">
                    <div class="p-title">
                        <h5>No items in cart</h5>
                    </div>
                </td>
            </tr>`);
        }
        $(".clear-cart-btn").on("click", function(){
            sessionStorage.removeItem("cart");
            $(".cart-table-body").empty().append(`<tr>
                <td class="product-col" colspan="4">
                    <div class="p-title">
                        <h5>No items in cart</h5>
                    </div>
                </td>
            </tr>`);
            $(".header-cart-counter").text(0);
        });

        let cartTotal = JSON.parse(sessionStorage.getItem("cart")) || [];  
    $(".cart-totals").empty().append(`
        <tr>
            <td class="total">$${cartTotal.reduce((acc, product) => acc + parseFloat(product.price), 0).toFixed(2)}</td>
            <td class="sub-total">$${cartTotal.reduce((acc, product) => acc + parseFloat(product.price), 0).toFixed(2)}</td>
            <td class="total-cart-p">$${cartTotal.reduce((acc, product) => acc + parseFloat(product.price), 0).toFixed(2)}</td>
        </tr>
    `);
    }

   if( $('.order-table-section').length>0){
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    $(".order-table-section").empty();
    if(cart.length){
        $(".order-table-section").append(`<div class="order-table">
            <div class="cart-item">
                <span>Quantity</span>
                <p>${cart.length}</p>
            </div>
        <div class="cart-total  ">
            <span>Total</span>
            <p>$${cart.reduce((acc, product) => acc + parseFloat(product.price), 0).toFixed(2)}</p>
        </div>
    </div>`);
    }else{
        $(".order-table-section").append(`<div class="order-table">
            <div class="cart-item">
                <span>Quantity</span>
                <p>0</p>
            </div>
        <div class="cart-total  ">
            <span>Total</span>
            <p>0</p>
        </div>
    </div>`);
    }
   }

   $('.checkout-form').on('submit', function(e){
        e.preventDefault();
        const formData = $(this).serializeArray();
        const data = {};
        formData.forEach((item) => {
            data[item.name] = item.value;
        });
        data["total"] = sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")).reduce((acc, product) => acc + parseFloat(product.price), 0).toFixed(2) : 1;
        $.ajax({
            url: "http://127.0.0.1:3001/api/orders/",
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(data){
                sessionStorage.clear();
                window.location.href = "./thankyou.html";
            },
            error: function(err){
               alert(err.responseJSON.error || "An error occured, please try again");
            }
        });
    });

})(jQuery);