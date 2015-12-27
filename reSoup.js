var posts = $('.post').map(function (idx, elem) {
    var jqe = $(elem);
    var wS = $(this).scrollTop();
    var post = {
        top: jqe.offset().top,
        height: jqe.outerHeight(),
        elemId: jqe.attr('id')
    };
    return post;
});

posts.sort(function (a, b) {
    return a.top - b.top;
});

var findPost = function (scrollTop, recPosts) {
    var length = recPosts.length;
    if (length === 1) {
        return recPosts[0];
    }
    var middleIdx = Math.floor(length / 2);
    var middle = recPosts[middleIdx];
    if (middle.top < scrollTop) {
        return findPost(scrollTop, recPosts.slice(middleIdx, length));
    } else {
        return findPost(scrollTop, recPosts.slice(0, middleIdx));
    }
};

$(window).scroll(function () {
    var wS = $(this).scrollTop();
    var post = findPost(wS, posts);
    console.debug("scrolled", wS, post);
});
