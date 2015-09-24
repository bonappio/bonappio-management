/* mobile control code */
!function (i) { (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(i) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(i.substr(0, 4)) }(navigator.userAgent || navigator.vendor || window.opera);


//Version: 1.54
(function (e) {
    $.fn.vd_Modal = function (v) {
        v = $.extend({
            vd_ModalType: 'none',
            vd_ModalURLType: 'normal',
            vd_TopSpace: 100,
            vd_Title: 'Açılır Pencere',
            vd_OpenContent: 'body',
            vd_HtmlID: null,
            vd_Icon: 'fa fa-bars',
            vd_ModalID: '',
            vd_OpenAnimateSpeed: 500,
            vd_CloseAnimateSpeed: 500,
            vd_Page: '',
            vd_ModalWidth: 500,
            vd_ModalClosedID: '',
            vd_AlertType: 'bilgi2',
            vd_AlertText: 'İşlem tamam giriş yapınız.',
            vd_ModalCloseFonk: '',
            vd_LoadFonk: '',
            vd_AutoClose: false,
            vd_AutoCloseTime: '',
            vd_OkButton: false,
            vd_OkButtonText: "KAPAT",
            vd_Cb_Mobil: true,
            vd_CloseButton: false,
            vd_MaxHeight: "",
            vd_Position: "absolute",
            vd_DefaultClose: false,
        }, v);

        var CloseButton = "";
        if (v.vd_CloseButton == true) {
            var CloseButton = '<a href="javascript:null(0)" class="ModalCloseButton fa"></a>';
        }
        if (v.vd_Cb_Mobil) {
            if (jQuery.browser.mobile) {
                var vd_CloseButton = vd_CloseButton;
            }
        } else {
            var vd_CloseButton = vd_CloseButton;
        }

        var okbuton = "";
        if (v.vd_OkButton) {
            var okbuton = '<div class="AlertButtons"><a href="#" class="ModalbuttonStyle fr" id="AlertClosed"><span class="ikon ikon_form_post"></span><span class="title">' + v.vd_OkButtonText + '</span></a></div>';
        }

        if (jQuery.browser.mobile) {
            var vd_TopSpace = 0;
        } else {
            var vd_TopSpace = v.vd_TopSpace;
        }

        if (v.vd_HtmlID != null) {
            v.vd_Page = $("#" + v.vd_HtmlID).clone().html();
        }

        if (v.vd_ModalID == '') {
            alert("ModalID tanımlaması yapılmadı.");
        } else {
            if (!v.vd_ModalClosedID == "") {
                funkClose(v.vd_ModalClosedID);
            }

            var vd_Icon = "";
            if (v.vd_Icon == "none") {
                vd_Icon = '<i class="' + v.vd_Icon + '"></i>';
            }

            if (v.vd_Title != "") {
                var vdTitle = '<div class="vd_Modal_Title">' + vd_Icon + '<span>' + v.vd_Title + '</span>' + CloseButton + '</div>';
            } else {
                var vdTitle = '';
            }
            if (v.vd_ModalType == "iframe") {
                $(v.vd_OpenContent).append('<div class="vd_Modal" id="vdM_' + v.vd_ModalID + '" ><div class="vd_Close"></div><div class="vd_Modal_Box" style="top:' + vd_TopSpace + 'px;width: 100%;max-width:' + v.vd_ModalWidth + 'px">' + vdTitle + '<div class="vd_Modal_Content"><div class="vd_Modal_Content_Box"></div></div></div></div>');
                $("#vdM_" + v.vd_ModalID + " .vd_Modal_Content_Box").append('<iframe id="ifrm_' + v.vd_ModalID + '" src="' + v.vd_Page + '" width="790" height="500" frameborder="0"></iframe>');
                $("#vdM_" + v.vd_ModalID).css({ "display": "block" }).animate({ "opacity": 1 }, v.vd_OpenAnimateSpeed);
            }
            else if (v.vd_ModalType == "url") {
                $(v.vd_OpenContent).append('<div class="vd_Modal" id="vdM_' + v.vd_ModalID + '" ><div class="vd_Close"></div><div class="vd_Modal_Box" style="top:' + vd_TopSpace + 'px;width: 100%;max-width:' + v.vd_ModalWidth + 'px">' + vdTitle + '<div class="vd_Modal_Content"><div class="vd_Modal_Content_Box"></div></div></div></div>');
                $('#vdM_' + v.vd_ModalID + ' .vd_Modal_Content_Box').html('<div class="p20 ta_c"><i class="fa fa-spinner fa-pulse fa-2x"></i></div>');
                if (v.vd_ModalURLType == "json") {
                    var action = "sayfagetir2";
                    $.get("../vdPanel/handler/get.ashx?act=" + action + "&adi=" + v.vd_Page, function (data) {
                        var veri = JSON.parse(data);
                        var s = veri.sayfa[0];
                        $("#vdM_" + v.vd_ModalID + " .vd_Modal_Content_Box").html('<div class="tabcBox"><div class="content_box" id="siparisBilgi" style="padding: 20px;"><div class="text_box generalPage" style="overflow: hidden;">' + s.icerik + '</div></div></div>');

                        $("#vdM_" + v.vd_ModalID + " .vd_Modal_Content_Box").mCustomScrollbar({ theme: "minimal-dark" });

                        $("#vdM_" + v.vd_ModalID + " .vd_Modal_Content_Box").css({ "pading": "20px;" });
                    });
                } else {
                    $("#vdM_" + v.vd_ModalID + " .vd_Modal_Content_Box").load(v.vd_Page);
                }
                $("#vdM_" + v.vd_ModalID).css({ "display": "block" }).animate({ "opacity": 1 }, v.vd_OpenAnimateSpeed);
            } else if (v.vd_ModalType == "alert") {

                if (v.vd_AlertType == "basari") {
                    var AlertColor = "AlertGreen";
                } else if (v.vd_AlertType == "hata") {
                    var AlertColor = "AlertRed";
                } else if (v.vd_AlertType == "bilgi") {
                    var AlertColor = "AlertOrange";
                } else if (v.vd_AlertType == "bilgi2") {
                    var AlertColor = "AlertBlue";
                }
                $(v.vd_OpenContent).append('<div class="vd_Modal ' + AlertColor + '" id="vdM_' + v.vd_ModalID + '"><div class="vd_Close"></div><div class="vd_Modal_Box" style="top:' + vd_TopSpace + 'px;width:' + v.vd_ModalWidth + 'px">' + vdTitle + '<div class="vd_Modal_Content"><div class="vd_Modal_Content_Box"></div></div></div></div>');
                $('#vdM_' + v.vd_ModalID + ' .vd_Modal_Content_Box').html('<div class="p20 ta_c"><i class="fa fa-spinner fa-pulse fa-2x"></i></div>');
                $("#vdM_" + v.vd_ModalID + " .vd_Modal_Content_Box").html('<div class="AlertBox">' + v.vd_AlertText + ' ' + okbuton + '</div>');
                $("#vdM_" + v.vd_ModalID).css({ "display": "block" }).animate({ "opacity": 1 }, v.vd_OpenAnimateSpeed);
            } else if (v.vd_ModalType == "html") {
                $(v.vd_OpenContent).append('<div class="vd_Modal" id="vdM_' + v.vd_ModalID + '"><div class="vd_Close"></div><div class="vd_Modal_Box" style="top:' + vd_TopSpace + 'px;width:' + v.vd_ModalWidth + 'px">' + vdTitle + '<div class="vd_Modal_Content"><div class="vd_Modal_Content_Box"></div></div></div></div>');
                $('#vdM_' + v.vd_ModalID + ' .vd_Modal_Content_Box').html('<div class="p20 ta_c"><i class="fa fa-spinner fa-pulse fa-2x"></i></div>');
                $("#vdM_" + v.vd_ModalID + " .vd_Modal_Content_Box").html(v.vd_Page + okbuton);
                $("#vdM_" + v.vd_ModalID).css({ "display": "block" }).animate({ "opacity": 1 }, v.vd_OpenAnimateSpeed);
            } else if (v.vd_ModalType == "htmlContent") {
                var randomCode = codeGenerator(10);
                var AttrClass = $(v.vd_Page).attr('class');
                $(v.vd_Page).wrap('<div id="' + randomCode + '"></div>');
                var htmlCodes = $('#' + randomCode).clone().html();
                $(v.vd_Page).unwrap();
                $(v.vd_OpenContent).append('<div class="vd_Modal vd_FullContentStyle" id="vdM_' + v.vd_ModalID + '"><div class="vd_Close"></div><div class="vd_Modal_Box" style="top:' + vd_TopSpace + 'px;width:' + v.vd_ModalWidth + '">' + vdTitle + '<div class="vd_Modal_Content"><div class="vd_Modal_Content_Box"></div></div></div></div>');
                $('#vdM_' + v.vd_ModalID + ' .vd_Modal_Content_Box').html('<div class="p20 ta_c"><i class="fa fa-spinner fa-pulse fa-2x"></i></div>');
                $("#vdM_" + v.vd_ModalID + " .vd_Modal_Content_Box").html(htmlCodes + okbuton);
                $("#vdM_" + v.vd_ModalID + " .vd_Modal_Content_Box").mCustomScrollbar({ theme: "minimal-dark" });
                $("#vdM_" + v.vd_ModalID).css({ "display": "block" }).animate({ "opacity": 1 }, v.vd_OpenAnimateSpeed);
            } else if (v.vd_ModalType == "htmlID") {
                $(v.vd_OpenContent).append('<div class="vd_Modal" id="vdM_' + v.vd_ModalID + '"><div class="vd_CloseHtmlModal"></div><div class="vd_Modal_Box" style="top:' + vd_TopSpace + 'px;width:' + v.vd_ModalWidth + 'px">' + vdTitle + '<div class="vd_Modal_Content"><div class="vd_Modal_Content_Box"></div></div></div></div>');
                $('#vdM_' + v.vd_ModalID + ' .vd_Modal_Content_Box').html('<div class="p20 ta_c"><i class="fa fa-spinner fa-pulse fa-2x"></i></div>');
                $("#vdM_" + v.vd_ModalID + " .vd_Modal_Content_Box").html(okbuton);
                $("#vdM_" + v.vd_ModalID).css({ "display": "block" }).animate({ "opacity": 1 }, v.vd_OpenAnimateSpeed);
                $('#' + v.vd_Page + " .formStil").appendTo('.vd_Modal_Content_Box').removeClass("d_n");
                $('.ModalCloseButton').addClass("ModalCloseButtonHtml");
            } else {
                alert("Sistem belirtilen yolu bulamıyor. Lütfen tekrar deneyin.");
                funkClose(v.vd_ModalID);
            }
        }

        $("#vdM_" + v.vd_ModalID + " #AlertClosed, .ModalCloseButton.ModalCloseButtonHtml").on('click', function () { funkCloseHtmlModal(v.vd_ModalID); return false; });
        $("#vdM_" + v.vd_ModalID + " #AlertClosed, .ModalCloseButton").on('click', function () { funkClose(v.vd_ModalID); return false; });
        if (v.vd_DefaultClose) {
            $("#vdM_" + v.vd_ModalID + " .vd_Close").on('click', function () { funkClose(v.vd_ModalID); });
            $("#vdM_" + v.vd_ModalID + " .vd_CloseHtmlModal").on('click', function () { funkCloseHtmlModal(v.vd_ModalID); });
        }
        function funkClose(vd_ModalID) {
            $("#vdM_" + vd_ModalID).animate({ "opacity": 0 }, v.vd_CloseAnimateSpeed, function () {

                $("#vdM_" + vd_ModalID).css({
                    "display": "none"
                }).remove();
            });
            setTimeout(function () {
                if (v.vd_ModalCloseFonk) { v.vd_ModalCloseFonk() };
            }, v.vd_CloseAnimateSpeed + 1000);
        }
        function funkCloseHtmlModal(vd_ModalID) {
            $("#vdM_" + vd_ModalID).animate({ "opacity": 0 }, v.vd_CloseAnimateSpeed, function () {

                $("#vdM_" + vd_ModalID).find(".formStil").appendTo('#' + v.vd_Page);
            });
            setTimeout(function () {
                if (v.vd_ModalCloseFonk) { v.vd_ModalCloseFonk() };
            }, v.vd_CloseAnimateSpeed + 1000);
        }
        if (v.vd_AutoClose) {
            setTimeout(function () {
                funkClose(v.vd_ModalID);
            }, v.vd_AutoCloseTime);
        }

        if (v.vd_Position == "absolute") {
            $(function () {
                var st_WinScrollTop = parseInt($(window).scrollTop());
                var NewAniamteSpeed = (st_WinScrollTop * 400) / 500;
                $('body,html').animate({ scrollTop: 0 }, NewAniamteSpeed);
            });
        }
        if (v.vd_Position == "auto") {
            var WH = $(window).height();
            var MB = $("#vdM_" + v.vd_ModalID + " .vd_Modal_Box").height();
            var H1 = $("#vdM_" + v.vd_ModalID + " .vd_Modal_Title").height();
            var H2 = $("#vdM_" + v.vd_ModalID + " .vd_Modal_Content").height();
            var H3 = $("#vdM_" + v.vd_ModalID + " .vd_Modal_Content_Box").height();
            var H = H1 + H2 + vd_TopSpace + 100;
            if (WH <= H) {
                $("#vdM_" + v.vd_ModalID).css({ "position": "absolute" });
            } else {
                $("#vdM_" + v.vd_ModalID).css({ "position": "fixed" });
            }
        } else {
            $("#vdM_" + v.vd_ModalID).css({ "position": v.vd_Position });
        }

        var sectionH = $('body > section').outerHeight();
        var headerH = $('body > header').outerHeight();
        height = parseInt($('body > header').outerHeight());
        $("#vdM_" + v.vd_ModalID).css({ "position": v.vd_Position, "height": "100%", "min-height": height });

        if (v.vd_LoadFonk) {
            FuncStarter = new Function(v.vd_LoadFonk);
            FuncStarter.call(this);
        }
    }
})(jQuery);

function ModalClose(vd_ModalID) {
    $("#vdM_" + vd_ModalID).animate({ "opacity": 0 }, 500, function () { $("#vdM_" + vd_ModalID).css({ "display": "none" }).remove(); });
}
$(function (e) {
    $.fn.vdModalConfirm = function (x) {
        x = $.extend({
            vdTitle: 'başlık belirtilmemiş',
            vdMessage: 'mesaj belirtilmemiş',
            vdWidth: 500,
            vdConfirmID: 'vdConfirm',
            vdFonk: '',
            vdPosition: 'absolute',
        }, x);
        var vdConfirmSetting = {
            vd_ModalType: "alert",
            vd_Title: x.vdTitle,
            vd_ModalWidth: x.vdWidth,
            vd_AlertText: x.vdMessage,
            vd_ModalID: x.vdConfirmID,
            vd_Position: x.vdPosition,
            vd_AlertType: 'hata',
            vd_Icon: 'fa fa-times',
        }
        if (x.vdFonk) {
            $("body").vd_Modal(vdConfirmSetting);
            $("#vdM_" + x.vdConfirmID + " .vd_Modal_Content_Box").append('<div class="cb"></div><div class="AlertButtons"><div class="buttonBox"><a href="#" class="ModalbuttonStyle fr" id="ConfirmYes"><span class="ikon ikon_form_post"></span><span class="title">Evet</span></a><a href="#" class="ModalbuttonStyle fr MBS_ColorGreen" id="ConfirmNo"><span class="ikon ikon_form_post"></span><span class="title">Hayır</span></a></div></div>');
            $("#ConfirmYes").click(function () {
                ModalClose(x.vdConfirmID);
                FuncStarter = new Function(x.vdFonk);
                FuncStarter.call(this);
                return false;
            });
            $("#ConfirmNo").click(function () {
                ModalClose(x.vdConfirmID);
                return false;
            });
        } else {
            alert("İşlem iptal edildi !\nÇalıştırılacak fonksiyon belirtilmemiş.");
            return false;
        }
    }
});
