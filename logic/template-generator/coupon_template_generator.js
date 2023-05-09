function createCouponItemTemplate(couponItem) {
    const coupon = createElement('div', 'coupon_item');
    coupon.append(createElement('h1', 'coupon_item_header', couponItem.name));
    coupon.append(createElement('p', 'coupon_item_date', couponItem.expiresAt));
    coupon.append(createElement('p', 'coupon_item_description', couponItem.description));
    const codeWrapper = createElement('div', 'coupon_code_wrapper');
    codeWrapper.append(createElement('p', 'coupon_code',couponItem.code));
    coupon.append(codeWrapper);
    console.log(coupon.get(0));
    return coupon;
}

function createElement(tagName, className, textContent) {
    let $elem = $("<" + tagName + ">");
    if(className !== null) {
        $elem.addClass(className);
    }
    if(textContent !== undefined) {
        $elem.text(textContent)
    }
    return $elem;
}