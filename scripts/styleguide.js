(function () {

    
    
// Script to pop up code view
// Button that opens window with code from panel-body
var $button = $("<div id='source-button' class='btn btn-primary label'>&lt; code &gt;</div>").click(function () {
    var html = $(this).closest('.panel').children('.panel-body').html();

    html = cleanSource(html);
    $("#source-modal pre").text(html);
    $("#source-modal").modal();
});

function cleanSource(html) {
    html = html.replace(/×/g, "&times;")
                .replace(/«/g, "&laquo;")
                .replace(/»/g, "&raquo;")
                .replace(/←/g, "&larr;")
                .replace(/→/g, "&rarr;");

    var lines = html.split(/\n/);

    lines.shift();
    lines.splice(-1, 1);

    var indentSize = lines[0].length - lines[0].trim().length,
        re = new RegExp(" {" + indentSize + "}");

    lines = lines.map(function (line) {
        if (line.match(re)) {
            line = line.substring(indentSize);
        }

        return line;
    });

    lines = lines.join("\n");

    return lines;
}

// Button that toggles panel to be stuck
var $sticky = $("<div id='sticky-button' class='btn btn-info label pull-right'>sticky</div>").click(function () {
    $(this).closest('.panel').add('.panel-info').toggleClass('panel-info');
});

// On resize, scroll to the stuck panel
var resize;
$(this).resize(function () {
    clearTimeout(resize);
    resize = setTimeout(moveToPanel, 200);                
});

function moveToPanel() {
    if ($(".panel-info").length > 0) {
        $("html, body").animate({
            scrollTop: $(".panel-info").offset().top
        }, 200);
    }
}

$(".panel").hover(function () {
    $(this).children('.panel-heading').append($button);
    $(this).children('.panel-heading').append($sticky);
    $button.show();
    $sticky.show();
}, function () {
    $button.hide();
    $sticky.hide();
});
    
})();