var index = 0;
var wH = $(window).height();

var onScreen = function (wS, post) {
    return wS > (post.top + post.height - wH)
};

var posts = $('.post').map(function (idx, elem) {
    var jqe = $(elem);
    var wS = $(this).scrollTop();
    var post = {
        top: jqe.offset().top,
        height: jqe.outerHeight(),
        elem: jqe
    };
    if (onScreen(wS, post)) {
        index = idx;
        console.debug("setting scroll index to", idx);
    }
    return post;
});

posts.sort(function (a, b) {
    return a.top - b.top;
});

$(window).scroll(function () {
    var wS = $(this).scrollTop();
    var p = posts[index];
    if (onScreen(wS, p)) {
        //FIXME find the correct index of the current post
        console.debug("scrolled past", p.elem);
    }
});
