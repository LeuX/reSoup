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

var updateSince = function (uri, value) {
    var key = 'since';
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
};

var initPosts = function () {
    var ret = $('.post').map(function (idx, elem) {
        var jqe = $(elem);
        return {
            top: jqe.offset().top,
            height: jqe.outerHeight(),
            elemId: jqe.attr('id')
        };
    });

    ret.sort(function (a, b) {
        return a.top - b.top;
    });
    return ret;
};

var posts = initPosts();

if (location.search.indexOf("?since=") >= 0) {
    window.scrollTo(0, 0);
}

$(window).scroll(function () {
    var wS = $(this).scrollTop();
    var post = findPost(wS, posts);
    window.history.replaceState(null, "",
        updateSince(window.location.href, post.elemId.substring(4)));
});

chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.reSoup === "gatherPosts") {
            console.log("Reinitialising post list")
            posts = initPosts();
        }
    });