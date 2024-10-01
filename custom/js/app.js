var r = {
    init: function () {
        r.baseApi = "https://apiplatform.hndedu.com";
        r.baseUrl = "https://platformcms.hndedu.com/uploads";
        r.link = "https://joytime.vn/en/products/";

        //Khoi chay cung trang thi viet vao ham init
        r.onLoadPromotions();
        r.onLoadServiceByPromotion30Percent();
        r.onLoadServiceByPromotion20Percent();
        r.registerEvent();
    },
    registerEvent: function () {
        // Sự kiện cho mã giảm giá 30%
        $('.discount-30-service-button').off('click').on('click', function () {
            $(this).parent().find('.discount-30-service-button').each(function () {
                $(this).removeClass('active');
            });
            $(this).addClass('active');

            let serviceId = $(this).data('serviceid');
            r.onLoadProductByServiceId(serviceId, 30); // Gọi với 30% giảm giá
        });

        // Sự kiện cho mã giảm giá 20%
        $('.discount-20-service-button').off('click').on('click', function () {
            $(this).parent().find('.discount-20-service-button').each(function () {
                $(this).removeClass('active');
            });
            $(this).addClass('active');

            let serviceId = $(this).data('serviceid');
            r.onLoadProductByServiceId20(serviceId,20); // Gọi với 20% giảm giá
        });
    },
    onLoadPromotions: function () {
        let url = "https://apiplatform.hndedu.com/api/PagePromotion/GetPromotionDetailByZoneId";
        let data = {
            promotionId: 1914,
            cultureCode: "vi-VN"
        }
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data), // Chuyển đổi data thành chuỗi JSON
            contentType: 'application/json; charset=utf-8', // Đặt header cho JSON
            dataType: 'json', // Định dạng dữ liệu phản hồi mong muốn
            success: function (response) {
                // console.log(response);
            },
            error: function (error) {
                console.log(error);
            }
        });
    },
    onLoadPromoAvatar: function (response) {
        $('.promo-avatar').attr('src', `https://platformcms.hndedu.com/uploads/${response.banner}`);
    },
    onLoadServiceByPromotion30Percent: function () {
        let url = r.baseApi + "/api/OpenAPI/GetServicesByCouponId"
        let data = {
            couponId: 11,
            discountValue: 30,
            cultureCode: 'en-US'
        }
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data), // Chuyển đổi data thành chuỗi JSON
            contentType: 'application/json; charset=utf-8', // Đặt header cho JSON
            dataType: 'json', // Định dạng dữ liệu phản hồi mong muốn
            success: function (response) {
                //Tim den ul de dan li vao 

                let ul = $('.discount-30');
                let html = ""
                html += `<li class="active discount-30-service-button" data-serviceid='0'><a href="javascript:void(0)" class="" >All Product</a></li>`
                response.forEach(r => {
                    html += `<li class="discount-30-service-button" data-serviceid='${r.id}'><a href="javascript:void(0)" class="">${r.name}</a></li>`
                })
                ul.append(html);
                //Mac dinh sau append ra thi load all
                r.onLoadProductByServiceId(0);
                r.registerEvent();
                // console.log(response);
            },
            error: function (error) {
                console.log(error);
            }
        });

    },
    onLoadServiceByPromotion20Percent: function () {
        let url = r.baseApi + "/api/OpenAPI/GetServicesByCouponId";
        let data = {
            couponId: 11,
            discountValue: 20,
            cultureCode: 'en-US'
        }
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data), // Chuyển đổi data thành chuỗi JSON
            contentType: 'application/json; charset=utf-8', // Đặt header cho JSON
            dataType: 'json', // Định dạng dữ liệu phản hồi mong muốn
            success: function (response) {
                let ul = $('.discount-20');
                let html = ""
                html += `<li class="active discount-20-service-button" data-serviceid='0'><a href="javascript:void(0)" class="" >All Product</a></li>`
                response.forEach(r => {
                    html += `<li class="discount-20-service-button" data-serviceid='${r.id}'><a href="javascript:void(0)" class="">${r.name}</a></li>`
                })
                ul.append(html);
                r.onLoadProductByServiceId20(0);
                r.registerEvent();
            },
            error: function (error) {
                console.log(error);
            }
        });
    },
    
    onLoadProductByServiceId20: function (id) {
        let url = r.baseApi + "/api/OpenAPI/GetProductsInServicesByCouponCode";
        let data = {
            couponId: 11,
            discountValue: 20,
            serviceId: id,
            cultureCode: 'en-US'
        }
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (response) {
                let html = "";
                response.forEach(res => {
                    let htmlItem = `
                        <li class="product-item">
                          
                            <div class="product-thumb clearfix">
                                <a href="${r.link + res.id + '/' + res.url}" class="product-thumb">
                                    <img src="${r.baseUrl + res.avatar}" alt="${res.title}">
                                </a>
                            </div>
                            <div class="product-info text-center clearfix hah">
                                <div class="product-title">${res.title}</div>
                                <div class="price">
                                    <ins>
                                        <span class="amount">VND ${res.price.toLocaleString()}</span>
                                    </ins>
                                </div>
                            </div>
                            <div class="add-to-cart text-center">
                                <a href="${r.link + res.id + '/' + res.url}">READ DETAIL</a>
                            </div>
                        </li>
                    `
                    html += htmlItem;
                })
                $('.discount-20-ul-container').html('').html(html);
                console.log(response);
                r.registerEvent();
            },
            error: function (error) {
                console.log(error);
            }
        });
    },
    
    onLoadProductByServiceId: function (id) {
        let url = r.baseApi + "/api/OpenAPI/GetProductsInServicesByCouponCode"
        let data = {
            couponId: 11,
            discountValue: 30,
            serviceId: id,
            cultureCode: 'en-US'
        }
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data), // Chuyển đổi data thành chuỗi JSON
            contentType: 'application/json; charset=utf-8', // Đặt header cho JSON
            dataType: 'json', // Định dạng dữ liệu phản hồi mong muốn
            success: function (response) {

                let html = "";
                response.forEach(res => {
                    let htmlItem = `
                        <li class="product-item">
                            <div class="product-thumb clearfix">
                                <a href="${r.link + res.id + '/' + res.url}" class="product-thumb">
                                    <img src="${r.baseUrl + res.avatar}" alt="${res.title}">
                                </a>
                            </div>
                            <div class="product-info text-center clearfix">
                                <div class="product-title">${res.title}</div>
                                <div class="price">
                                    <ins>
                                        <span class="amount">VND ${res.price.toLocaleString()}</span>
                                    </ins>
                                </div>
                                
                            </div>
                            <div class="add-to-cart text-center">
                                <a href="${r.link + res.id + '/' + res.url}">READ DETAIL</a>
                            </div>
                        </li>
                    
                    `
                    html += htmlItem;
                })
                $('.discount-30-ul-container').html('').html(html);
                console.log(response);
                r.registerEvent();
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}

r.init();