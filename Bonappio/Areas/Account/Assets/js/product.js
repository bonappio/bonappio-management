$(function () {
    getCategories('Product');
    $('[name="file"]').on('change', function () {
        var files = $(this)[0].files;
        var filesLength = files.length;
        if (filesLength > 0) {

            $('[name="FileNames"]').val(filesLength + " dosya seçili");
        }
        else { $('[name="FileNames"]').val('Dosya(lar) seçiniz...'); }
    });



    $('#productAdd').click(function (e) {
        e.preventDefault();
        var data = new FormData();
        var files = $('[name="file"]').get(0).files;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                data.append("Images", files[i]);
            }
        }
        data.append("Name", $('[name="Name"]').val());
        data.append("CategoryID", $('[name="CategoryID"]').val());
        data.append("Ingredients", $('[name="Ingredients"]').text());
        data.append("Cost", $('[name="Cost"]').val());
        data.append("Price", $('[name="Price"]').val());
        data.append("Stock", $('[name="Stock"]').val());
        data.append("CriticalStock", $('[name="CriticalStock"]').val());

        $.ajax({
            url: '/Account/Product/ProductAdd',
            type: "POST",
            processData: false,
            contentType: false,
            data: data,
            success: function (ProductID) {
                var features = new FormData();
                features.append("ProductID", ProductID);
                for (var i = 0; i < $('[name="Feature"]').length; i++) {
                    var f = $('[name="Feature"]').eq(i).val();
                    var pd = $('[name="PriceDifference"]').eq(i).val();
                    features.append("FeatureNames", f);
                    features.append("PriceDifferences", pd);
                }


                $.ajax({
                    url: '/Account/Product/ProductFeatureAdd',
                    type: "POST",
                    processData: false,
                    contentType: false,
                    data: features,
                    success: function (res) {
                        alert(res);

                    }
                });

            }
        });

       

        return false;
    });
});
function setAP(ID, AP) {
    $.post("/Account/Product/SetAP", { ID: ID, AP: AP }).error(function () {
        alert("Bir hata oluştu, daha sonra tekrar deneyin.");
    });
}
function openFeatureArea() {
    var size = $('.form-group.features .col-md-4').size();
    $('.addFeature').text('Varyant ekle');
    $('.form-group.features').append('<div class="col-md-4">' +
        '<a href="#" class="btn btn-mini btn-danger btnRemoveFeature"><i class="fa fa-remove"></i></a>'+
                    '<div class="form-group">'+
                        '<label for="field-2" class="control-label">Özellik</label>' +
                        '<input type="text" class="form-control" name="Feature" placeholder="Özellik">'+
                    '</div>' +
                    '<div class="form-group">'+
    '<label for="field-2" class="control-label">Fiyat Farkı</label>' +
    '<input type="text" class="form-control numeric money" name="PriceDifference" value="0.00" placeholder="Fiyat Farkı">' +
'</div><div class="form-group"><div class="input-group"><div class="radio radio-primary"><input type="radio" name="IncreaseorDecrease' + size + '" id="radio1' + size + '" value="Increase" checked><label for="radio1' + size + '">Artır</label></div><div class="radio radio-primary"><input type="radio" name="IncreaseorDecrease' + size + '" id="radio2' + size + '" value="Decrease"><label for="radio2' + size + '">Azalt</label></div></div></div>' +
                '</div>');

    $('.form-control.numeric.money').maskMoney();

    $('.btnRemoveFeature').click(function () {
        $(this).parent().remove();
        return false;
    });

}



jQuery.fn.dataTableExt.oApi.fnStandingRedraw = function (oSettings) {
    if (oSettings.oFeatures.bServerSide === false) {
        var before = oSettings._iDisplayStart;
        oSettings.oApi._fnReDraw(oSettings);
        oSettings._iDisplayStart = before;
        oSettings.oApi._fnCalculateEnd(oSettings);
    }
    oSettings.oApi._fnDraw(oSettings);
};
    var Math2 = {
        min: function (values) {
            return this.calculate(values, Math.min);
        },
        max: function (values) {
            return this.calculate(values, Math.max);
        },
        calculate: function (values, operation) {
            if (values.length == 0) {
                return NaN;
            } else if (values.length == 1) {
                var val = values.pop();
                if (typeof val == "number") {
                    return val;
                } else {
                    return NaN;
                }
            } else {
                var val = values.pop();
                return operation(val, this.calculate(values, operation))
            }
        }
    }
    Array.prototype.unique2 = function () {
        var n = {}, r = [];
        for (var i = 0; i < this.length; i++) {
            if (!n[this[i]]) {
                n[this[i]] = true;
                r.push(this[i]);
            }
        }
        return r;
    }

   

    var c_Image = {
        "orderable": false,
        "sWidth": "50px",
        "mRender": function (oObj, t, row) {
            //$('[name="CacheKey"]').val(row["CacheKey"])
            return '<img src="/Assets/photo/r/' + row["ImageSrc"] + '_t.jpg" data-big="/Assets/photo/r/' + row["ImageSrc"] + '_b.jpg" width="25"/>';
        },
    };
    var c_Name = {
        "orderable": false,
        "mRender": function (oObj, t, row) {
            return '<div class="text-left">' + row["Name"] + '</div>';
        }
    };
    var c_Stock = {
        "orderable": false,
        "mRender": function (oObj, t, row) {
            return row["Stock"];
        }
    };
    var c_OrderCount = {
        "orderable": false,
        "mRender": function (oObj, t, row) {
            return row["OrderCount"];
        }
    };
    var c_Variant = {
        "orderable": false,
        "mRender": function (oObj, t, row) {
            return row["Variant"];
        }
    };
    //var c_Description = {
    //    "orderable": false,
    //    "mRender": function (oObj, t, row) {
    //        if (row["Description"] != undefined) {
    //            if (row["Description"].length > 20) {
    //                return '<div class="showFullContent" data-full="' + row["Description"] + '">' + row["Description"].substring(0, 12) + '...</div>';
    //            }
    //            else {
    //                return '<span>' + row["Description"] + '</span>';
    //            }
    //        }
    //        else {
    //            return "";
    //        }
    //    },
    //};
    //var c_Text = {
    //    "orderable": false,
    //    "mRender": function (oObj, t, row) {
    //        return '<div class="showFullContent contentHtml">Görüntüle<div class="dis-none">' + row["Text"] + '</div></div>';
    //    },
    //};
    var c_AP = {
        "orderable": false,
        "mRender": function (oObj, t, row) {
            var checked;
            if (row["IsActive"] == true) {
                checked = "checked"
            }
            else { checked = ""; }

            return '<div style="text-align:center"><input type="checkbox" data-size="mini" data-id="' + row["ID"] + '" data-on-color="success" data-on-text="aktif" data-off-text="pasif" name="AP" ' + checked + '><div>';
        }
    }
    var c_Process = {

        "orderable": false,
        "sWidth": "120px",
        "mRender": function (oObj, t, row) {
            return '<div class="text-right"><a class="edit btn btn-sm btn-default" data-toggle="tooltip" data-placement="top" title="Düzenle" data-id="' + row["ID"] + '" data-rank="' + row["Rank"] + '" href="#"><i class="fa fa-edit"></i></a>  <a class="delete btn btn-sm btn-danger" onclick="Delete(\'' + row["ID"] + '\',\'' + Type + '\')" data-toggle="tooltip" data-placement="top" title="Sil"  data-id="' + row["ID"] + '" href="#"><i class="fa fa-remove"></i></a></div>';
        }
    };
    var columns = [c_Image, c_Name, c_Stock, c_OrderCount,c_Variant,c_AP, c_Process];
    var Type = "";
    var table = $('#ActiveProducts').dataTable({
        "bServerSide": true,
        "sAjaxSource": "/Account/Product/GetProducts",
        "searchable": false,
        "fnDrawCallback": function () {
            $('[name="AP"]').bootstrapSwitch();
            $('[name="AP"]').on('switchChange.bootstrapSwitch', function (event, state) {
               
                setAP($(this).attr("data-id"), state);
            });

            $('[data-toggle="tooltip"]').tooltip()
            //$('.dataTables_processing').html('<i class="fa fa-circle-o-notch fa-spin fa-2x"></i>');
            if ($('#add' + Type + '').size() == 0) {
                //$('.dataTables_length').prepend('<button type="button" id="add' + Type + '" data-target="#' + Type + 'Add" class="addContent btn btn-primary btn-md"><span><i style="left:-20px;" class="fa fa-plus fa-2x"></i>' + TypeName + ' Ekle</span></button>');
                //$('[data-target="#' + Type + 'Add"]').click(function (event) {
                //    event.preventDefault();
                //    var myModal = $('#' + Type + 'Add');
                //    modalBody = myModal.find('.modal-body');
                //    modalBody.load('/Admin/Page/' + Type + 'Model');
                //    myModal.modal('show');
                //});
                //$("tbody", this).sortable({
                //    start: function (event, ui) {
                //    },
                //    update: function (event, ui) {

                //        var IDs = [];

                //        $(this).sortable('refreshPositions');

                //        var pageSize = parseInt($('#select2-chosen-2').text());
                //        var currentPage = parseInt($('.paginate_button.active').text());
                //        var rowsLength = $(this).children("tr").length;

                //        $(this).children("tr").each(function () {
                //            var t = $(this).find('a.edit.btn');
                //            IDs.push(t.attr("data-id"));
                //        });
                //        var indexBase = (pageSize * (currentPage - 1));
                //        var firstIndex = indexBase + 1;
                //        var lastIndex = indexBase + rowsLength;
                //        var CacheKey = $('[name="CacheKey"]').val();
                //        $.post('/Admin/Page/SetPageRank', { IDs: IDs, firstIndex: firstIndex, lastIndex: lastIndex, CacheKey: CacheKey }, function (data) {
                //            if (data) {
                //                addNotification("Başarılı!", "İçerikler yeniden sıralandı.", "success");
                //            }
                //        });
                //    }
                //});

                $(this).css("width", "100%");

            }
            $('.showFullContent').click(function () {
                var t = $(this);
                var content;

                if (t.hasClass('contentHtml')) {
                    content = $('.dis-none', this).html();
                }
                else {
                    content = t.attr("data-full");
                }
                $('#modal-responsive .modal-body p').empty().append(content);
                $('#modal-responsive').modal('show');
                return false;
            });


            $('.btn.edit').click(function () {
                event.preventDefault();
                //$('.EditorObjects').remove();
                //var myModal = $('#' + Type + 'Add');
                //modalBody = myModal.find('.modal-body');
                //modalBody.load('/Admin/Page/' + Type + 'Model/' + $(this).attr("data-id"));
                //myModal.modal('show');
                GetUpdateModels($(this).attr("data-id"));
                return false;
            });
            $('.btn.edit').each(function () {
                $(this).parent("td").addClass("text-right");
            });
        },
        "bProcessing": true,
        "sPaginationType": "full_numbers",
        "language": {
            "url": "../../Areas/Account/Assets/js/datatables/Turkish.json"
        },
        "columns": columns
        ,
        "fnServerParams": function (aoData) {

            //aoData.push({ "name": "pageType", "value": Type });
        },



    });
    function reDraw() {
        table.fnStandingRedraw();
    }
    function Delete(ID, Type) {
        if (confirm("Emin misin?")) {
            $.post("/Admin/Page/DeletePage", { ID: ID, Type: Type }, function (data) {
                if (data.res) {
                    addNotification("Başarılı!", "İçerik başarıyla silindi.", "success");
                    reDraw();
                    CloseAddForm();
                }
                else {
                    console.log(data.ex);
                    addNotification("Hatalı!", "İçerik silme işleminde hata oluştu. Hata ayrıntısı tarayıcınızın console bölümüne loglandı.", "danger");
                }
            });
            return false;
        }

    }
    function setThumbnailSize(imgID) {
        var t = $('.img_' + imgID);
        var imgSize = t.children("img");

        var theImage = new Image();
        theImage.src = imgSize.attr("src");

        //var imageWidth = theImage.width;
        //var imageHeight = theImage.height;
        var imageWidth = 150;
        //var imageHeight = theImage.height;

        //t.css("height", imageHeight);
        t.css("width", imageWidth);
    }
    function GetUpdateModels(ID) {
        IsChange = true;
        $('.ProductAdd').fadeIn();
        $('[name="IsUpdate"]').val(true);
        $('.btnUpdate').css({ display: 'block' });
        $('.btnAdd').css({ display: 'none' });
        $('.btnClear').css({ display: 'none' });
        var divPosition = $('#AddForm').eq(0).offset().top - 120;
        $('body,html').stop().animate({ scrollTop: divPosition });
        var Type = $('[name="ContentType"]').val();
        $.post("/Admin/Page/GetUpdateModels", { ID: ID, Type: Type }, function (data) {
            var p = data.pages;
            if (p.length > 0) {
                var ID;
                var catID;
                var pageID;
                var seoID;
                var Images;
                var IsHighlight;
                var Date;
                $('[name="LanguageID"]').each(function () {
                    var t = $(this);
                    var LanguageID = t.attr("value");
                    var tab = $('.tab-pane#language_' + t.attr("value"));
                    for (var i = 0; i < p.length; i++) {
                        var d = p[i];
                        if (LanguageID == d.LanguageID) {
                            tab.find('[name="Title"]').val(d.Title);
                            tab.find('[name="URL"]').val(d.URL);
                       
                            if (Type != "References" && Type != "Slider") {
                                tab.find('[name="Text"]').editable("setHTML", d.Text, false);
                            }
                            if (Type == "Slider") { tab.find('[name="Description"]').editable("setHTML", d.Description, false); }
                            else { tab.find('[name="Description"]').val(d.Description); }
                        
                            tab.find('[name="SeoKeywords"]').val(d.SeoKeywords);
                            tab.find('[name="SeoDescription"]').val(d.SeoDescription);

                            catID = d.CategoryID;
                            pageID = d.PageID;
                            seoID = d.SeoID;
                            Images = d.Images;
                            IsHighlight = d.IsHighlight;
                            Date = d.Date;
                            ID = d.ID;
                        }
                    }



                });


                //var queryDate = Date.getDate(),
                //dateParts = queryDate.match(/(\d+)/g)
                //realDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
                //$('[name="DatePicker"]').datepicker({ dateFormat: 'yy-mm-dd' }); // format to show
                //$('[name="DatePicker"]').datepicker('setDate', realDate);


                $('[name="ID"]').val(ID);
                $('[name="SeoID"]').val(seoID);
                if (catID == null) catID = "null";
                $('[name="CategoryID"]').select2('val', catID);

                if (pageID == null) pageID = "null";
                $('[name="PageID"]').select2('val', pageID);
                $('#Images').removeClass("dis-none");
                $('#Images .portfolioContainer').empty();
                for (var i = 0; i < Images.length; i++) {
                    var img = Images[i];
                    var imgID = img.ID;
                    var Src = img.Src;
                    var Rank = img.Rank;
                    PushImage(imgID, Src, Rank, false);
                    setThumbnailSize(imgID);
                }

                Sortable();

                //if (IsCategoryPage == true) $('[name="IsCategoryPage"]').iCheck('check');
                //else $('[name="IsCategoryPage"]').iCheck('uncheck');
                if (IsHighlight == true) $('[name="IsHighlight"]').iCheck('check');
                else $('[name="IsHighlight"]').iCheck('uncheck');

                portfolioInit();
                magnificPopup();

                //$('#Images .portfolioContainer figure').each(function () {
                //    var t = $(this);

                //});
            }

        });
    }
    function PushImage(ID, Src, Rank, IsChange) {
        var template = '<figure data-rank="' + Rank + '" data-id="' + ID + '" class="effect-zoe img_' + ID + '">' +
        '<img class="effect-zoe magnific" data-mfp-src="../../Assets/photo/r/' + Src + '_b.jpg" src="/Assets/photo/r/' + Src + '_t.jpg" />' +
        '<figcaption>' +
            '<i onclick="RemovePhoto(\'' + ID + '\')" class="fa fa-remove"></i>' +
            '<i onclick="ChangePhoto(\'' + ID + '\')" class="fa fa-refresh"></i>' +
            //'<p ><i class="fa fa-search-plus fa-2x"></i></p>' +
        '</figcaption>' +
    '</figure>';
        if (IsChange) {
            if ($('.img_' + ID).is("figure")) {

                $(template).insertAfter('.img_' + ID + ".forDelete");
            }
            else {
                $('#Images .portfolioContainer').append(template);
            }
        }
        else {
            $('#Images .portfolioContainer').append(template);
        }
    }
    function Sortable() {
        var CacheKey = $('[name="CacheKey"]').val();
        var PageID = $('[name="ID"]').val();
        $('#Images .portfolioContainer').sortable(
            {
                start: function (event, ui) {
                    ui.placeholder.height(ui.item.height());
                    ui.placeholder.width(ui.item.width());
                },
                update: function (event, ui) {
                    var ImgIDs = [];
                    $('#Images .portfolioContainer figure').each(function () {
                        ImgIDs.push($(this).attr("data-id"));
                        $(this).attr("data-rank", $(this).index() + 1);
                    });
                    $.post('/Admin/Photo/SetRank', { ImgIDs: ImgIDs, PageID: PageID, CacheKey: CacheKey }, function (data) {
                        if (data.res) {
                            addNotification("Başarılı!", "Görsel sıralaması güncellendi.", "success");
                            reDraw();
                        }
                    })
                }
            }
            );

    }
    function RemovePhoto(ID) {
        var CacheKey = $('[name="CacheKey"]').val();
        $.post("/Admin/Photo/Remove", { ID: ID, CacheKey: CacheKey }, function (data) {
            $('.img_' + ID).remove();
            reDraw();
        });

    }
    function OpenFileDialog() {
        IsChange = $('[name="IsUpdate"]').val();
        if (!IsChange) {
            $('#file').attr("multiple", "multiple");
        }
        else { $('#file').removeAttr("multiple") }
        var nd = document.getElementById('file');
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, false);
        nd.dispatchEvent(evt);

    }
    var IsChange = false;
    var changerID = 0;
    var currentRank = 0;
    function ChangePhoto(ID) {
        var CacheKey = $('[name="CacheKey"]').val();
        IsChange = true;
        changerID = ID;
        currentRank = $(".img_" + ID).attr("data-rank") - 1;
        OpenFileDialog();
    }
    $("#file").on('change', function () {
        var files = $(this)[0].files;
        var filesLength = files.length;
        if (filesLength > 0) {

            $('.fileinput-filename').text(filesLength + " dosya seçili");
        }
        if ($('.btnAdd').css("display") == "none") {
            if (IsChange) {
                if (currentRank == 0) {
                    currentRank = $('#Images .portfolioContainer figure:last-child').attr("data-rank") - 1;
                }
                var CacheKey = $('[name="CacheKey"]').val();
                if (filesLength > 0) {
                    $('.processing').fadeIn();
                    var data = new FormData();
                    for (var i = 0; i < filesLength; i++) {
                        data.append("Images", files[i]);
                        data.append("PageID", $('[name="ID"]').val());
                        data.append("ImageID", changerID);
                        data.append("CacheKey", CacheKey);
                        data.append("CurrentRank", currentRank);

                    }
                    //return false;
                    $.ajax({
                        url: '/Admin/Photo/Change',
                        type: "POST",
                        processData: false,
                        contentType: false,
                        data: data,
                        success: function (response) {
                            //reDraw();
                            for (var i = 0; i < response.ImageIDs.length; i++) {
                                var imgID = response.ImageIDs[i];
                                var filename = response.FileNames[i];
                                var rank = response.Ranks[i];

                                $('.img_' + imgID).addClass("forDelete");
                                PushImage(imgID, filename, rank, IsChange);
                                $(".forDelete").remove();
                                setThumbnailSize(imgID);


                                portfolioInit();
                                magnificPopup();

                                changerID = 0;
                            }
                            if (IsChange) {

                                addNotification("Başarılı!", "Görsel(ler) güncellendi.", "success");
                            }
                            $('#file').val('');
                            $('.fileinput-filename').text('');
                            $('.processing').fadeOut();
                        },
                        error: function (jqXHR, exception) {
                            if (jqXHR.status === 0) {
                                alert('Not connect.\n Verify Network.');
                            } else if (jqXHR.status == 404) {
                                alert('Requested page not found. [404]');
                            } else if (jqXHR.status == 500) {
                                alert('Internal Server Error [500].');
                            } else if (exception === 'parsererror') {
                                alert('Requested JSON parse failed.');
                            } else if (exception === 'timeout') {
                                alert('Time out error.');
                            } else if (exception === 'abort') {
                                alert('Ajax request aborted.');
                            } else {
                                alert('Uncaught Error.\n' + jqXHR.responseText);
                            }
                        }

                    });
                }
            }
        }

    });
    function PageModelInit() {
        $('[name="Title"],[name="URL"]').blur(function () {
            var t = $(this);
            var val = t.val();
            if (val != "") {
                $.post("/Admin/Get/CreateURL", { Text: val }, function (data) {
                    t.closest(".tab-pane").find('[name="URL"]').val(data.URL);
                });
            }
        });
        $('#AddForm').submit(function (e) {
            e.preventDefault();

            var Type = $('[name="ContentType"]').val();
            var IsUpdate = $('[name="IsUpdate"]').val();
            if ($('#AddForm').validate({ alertType: "tooltip" })) {
                $('.processing').fadeIn();
                var data = new FormData();
                var InputNames = ["ID", "Name", "Title", "LanguageID", "URL", "Text", "Description", "CategoryID", "SeoKeywords", "SeoDescription", "PageID", "SeoID"];
                for (var i = 0; i < InputNames.length; i++) {
                    $('[name="' + InputNames[i] + '"]').each(function () {
                        data.append(InputNames[i], $(this).val());
                    });
                }
                var checkBoxes = ["IsCategoryPage", "IsHighlight"];
                for (var i = 0; i < checkBoxes.length; i++) {
                    $('[name="' + checkBoxes[i] + '"]').each(function () {
                        data.append(checkBoxes[i], $(this).prop("checked"));
                    });
                }
                var files = $("#file").get(0).files;
                if (files.length > 0) {
                    for (var i = 0; i < files.length; i++) {
                        data.append("Images", files[i]);
                    }
                }
                data.append("Type", Type);
                data.append("IsUpdate", IsUpdate);

                $.ajax({
                    url: '/Admin/Page/CreatePage',
                    type: "POST",
                    processData: false,
                    contentType: false,
                    data: data,
                    success: function (response) {
                        if (response.ID == 0) {
                            alert(response.error);
                            $('.processing').fadeOut();
                        }
                        else {
                            reDraw();
                            var ProcessName;
                            if (IsUpdate == "true") { ProcessName = "güncellendi."; }
                            else { ProcessName = "eklendi." }

                            addNotification("Başarılı!", "İçerik başarıyla " + ProcessName, "success");
                            GetUpdateModels(response.ID);
                            $('#file').val('');
                            $('.fileinput-filename').text('');
                            $('.processing').fadeOut();
                        }
                    
                    },
                    error: function (jqXHR, exception) {
                        if (jqXHR.status === 0) {
                            alert('Not connect.\n Verify Network.');
                        } else if (jqXHR.status == 404) {
                            alert('Requested page not found. [404]');
                        } else if (jqXHR.status == 500) {
                            alert('Internal Server Error [500].');
                        } else if (exception === 'parsererror') {
                            alert('Requested JSON parse failed.');
                        } else if (exception === 'timeout') {
                            alert('Time out error.');
                        } else if (exception === 'abort') {
                            alert('Ajax request aborted.');
                        } else {
                            alert('Uncaught Error.\n' + jqXHR.responseText);
                        }
                    }

                });
            }



            return false;
        });
    }