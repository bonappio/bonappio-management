$(function () {
    inputSelect();
    $('.form-control.numeric').not('.money').mask('000000', { reverse: true });
    $('.form-control.numeric.money').maskMoney();

    
    // Layout Sidebar Aktif Linkler
    var URL = window.location.href;
    URL = URL.replace("http://", "");
    URL = URL.replace("https://", "");
    URL = URL.replace(URL.split("/")[0], "");
    $('ul.sidebar-nav li').each(function () {
        var a = $(this).children("a");
        if (URL.indexOf(a.attr("href")) >= 0) {
            a.addClass("active");
        }
    });

});

function getCategories(type)
{
    $.post("/Account/Common/GetCategories", { Type: type }, function (data) {
        $('[name="CategoryID"] option').not(".first").remove();
        for (var i = 0; i < data.length; i++) {
            var d = data[i];

            $('[name="CategoryID"]').append('<option value="'+d.ID+'">'+d.Name+'</option>');
        }

    })
}

function inputSelect() {

    if ($.fn.select2) {
        setTimeout(function () {
            $('select').each(function () {
                function format(state) {
                    var state_id = state.id;
                    if (!state_id) return state.text; // optgroup
                    var res = state_id.split("-");
                    if (res[0] == 'image') {
                        if (res[2]) return "<img class='flag' src='assets/images/flags/" + res[1].toLowerCase() + "-" + res[2].toLowerCase() + ".png' style='width:27px;padding-right:10px;margin-top: -3px;'/>" + state.text;
                        else return "<img class='flag' src='assets/images/flags/" + res[1].toLowerCase() + ".png' style='width:27px;padding-right:10px;margin-top: -3px;'/>" + state.text;
                    }
                    else {
                        return state.text;
                    }
                }
                $(this).select2({
                    formatResult: format,
                    formatSelection: format,
                    placeholder: $(this).data('placeholder') ? $(this).data('placeholder') : '',
                    allowClear: $(this).data('allowclear') ? $(this).data('allowclear') : true,
                    minimumInputLength: $(this).data('minimumInputLength') ? $(this).data('minimumInputLength') : -1,
                    minimumResultsForSearch: $(this).data('search') ? 1 : -1,
                    dropdownCssClass: $(this).data('style') ? 'form-white' : ''
                });
            });

        }, 200);

        /* Demo Select Loading Data */
        function repoFormatResult(repo) {
            var markup = '<div class="row">' +
               '<div class="col-md-2"><img class="img-responsive" src="' + repo.owner.avatar_url + '" /></div>' +
               '<div class="col-md-10">' +
                  '<div class="row">' +
                     '<div class="col-md-6">' + repo.full_name + '</div>' +
                     '<div class="col-md-3"><i class="fa fa-code-fork"></i> ' + repo.forks_count + '</div>' +
                     '<div class="col-md-3"><i class="fa fa-star"></i> ' + repo.stargazers_count + '</div>' +
                  '</div>';
            if (repo.description) {
                markup += '<div>' + repo.description + '</div>';
            }
            markup += '</div></div>';
            return markup;
        }
        function repoFormatSelection(repo) {
            return repo.full_name;
        }

        if ($('#demo-loading-data').length) {
            $("#demo-loading-data").select2({
                placeholder: "Search for a repository",
                minimumInputLength: 1,
                ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
                    url: "https://api.github.com/search/repositories",
                    dataType: 'json',
                    quietMillis: 250,
                    data: function (term, page) {
                        return {
                            q: term, // search term
                        };
                    },
                    results: function (data, page) { // parse the results into the format expected by Select2.
                        // since we are using custom formatting functions we do not need to alter the remote JSON data
                        return { results: data.items };
                    },
                    cache: true
                },
                initSelection: function (element, callback) {
                    // the input tag has a value attribute preloaded that points to a preselected repository's id
                    // this function resolves that id attribute to an object that select2 can render
                    // using its formatResult renderer - that way the repository name is shown preselected
                    var id = $(element).val();
                    if (id !== "") {
                        $.ajax("https://api.github.com/repositories/" + id, {
                            dataType: "json"
                        }).done(function (data) { callback(data); });
                    }
                },
                formatResult: repoFormatResult, // omitted for brevity, see the source of this page
                formatSelection: repoFormatSelection,  // omitted for brevity, see the source of this page
                dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
                escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
            });
        }
    }
}
