$(function () {
    var commentsElt = $('#comments');
    var titleElt = $('h1');

    var titles = [
        'Such Comments',
        'So Angry',
        'Much Nasty',
        'Many Swears',
        'Wow Fix It',
        'So Useful',
    ];

    var errors = [
        'Much Error',
        'So Wait',
        'Many Refresh',
        'Wow Problem',
        'Very Failure',
        'Such Bad',
    ];

    var suchcolors = [
        "#0066FF", "#FF3399", "#33CC33", "#FFFF99", "#FFFF75", "#8533FF",
        "#33D6FF", "#FF5CFF", "#19D1A3", "#FF4719", "#197519", "#6699FF", "#4747D1",
        "#D1D1E0", "#FF5050", "#FFFFF0", "#CC99FF", "#66E0C2", "#FF4DFF", "#00CCFF",
    ];

    var fallbackSpeechSynthesis = (window.speechSynthesis && window.speechSynthesisUtterance) ? window.speechSynthesis : window.speechSynthesisPolyfill;
    var fallbackSpeechSynthesisUtterance = window.SpeechSynthesisUtterance || window.SpeechSynthesisUtterancePolyfill;

    // Such comments!
    $.ajax({
        dataType: "json",
        url: 'https://crash-stats.mozilla.com/api/SuperSearch/?user_comments=!__null__&_results_number=200&_columns=user_comments&_sort=-date',
        success: function (data) {
            var comments = [];
            for (var i = data.hits.length - 1; i >= 0; i--) {
                var comment = data.hits[i].user_comments;

                // Remove comments too small to mean anything.
                if (comment.length > 2) {
                    comments.push(data.hits[i].user_comments);
                }
            };

            // much loaded
            $('h2').remove();

            doTheMagic(comments);
        },
        error: function (jqXHR) {
            // such error
            $('h2').text('Wow Error');

            doTheMagic(errors);
        }
    });

    function r(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function doTheMagic(comments) {
        function updateComments() {
            var comment = r(comments);
            var u = new fallbackSpeechSynthesisUtterance(comment);
            //TODO: do language detection here
            u.lang = 'en-US';
            u.volume = 1.0;
            u.rate = 1.0;
            fallbackSpeechSynthesis.speak(u);
            $('<span>', {
                'text': comment
            }).css({
                'position': 'absolute',
                'color': r(suchcolors),
                'left': Math.random() * 80 + '%',
                'top': Math.random() * 80 + '%',
                'font-size': Math.max(16, (Math.random() * 10 + 18)) + 'px',
                'display': 'none'
            }).appendTo(commentsElt).fadeIn(200);

            var suchnumber = $('span').length;
            if (suchnumber > 4) {
                $('span:first').fadeOut(400, function () {
                    $(this).remove();
                });
            }
            setTimeout(updateComments, 4200);
        }
        updateComments();

        var titleInterval = setInterval(function () {
            titleElt.text(r(titles));
        }, 10000);
    }
});
