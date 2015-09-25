/*
 * jQuery fikirfokur.Validate v1.4 - http://www.fikirfokur.com/
 * Copyright (none) 2014 Hakan Seysane - Fikir Fokur
 * 
 */
(function ($) {
    $.fn.validate = function (settings) {
        var isValidLength = 0;
        settings = $.extend({
            alertType: "modal",
            clearForm: false, //işlemlerin ardından form geçerli ise formu temizle
            //Single File Input Settings
            mainElement:$(this),
            s_validExtensionsError: "Dosya uzantısı geçerli değil",
            //Multiple File Input Settings
            maxFileLength: 5,
            maxFileLengthError: "Tek seferde en fazla " + 5 + " dosya yükleyebilirsiniz",
            maxFileSize: 20971520, //20 mbalar
            maxFileSizeError: "Dosya boyutu maksimum" + 20971520 / 1048576 + " mb olabilir.",
            m_validExtensionsError: "dosyası için dosya türü geçerli değil",
            //All File Inputs Settings
            validExtensions: "jpg,png",
            literalPosition: "bottom"
        }, settings);
       
        if ($('.tooltip').length > 1) { $('.tooltip').remove() }
        if ($('.vd-ctn').length < 1) {
            $(this).find('input:not([type="checkbox"])').each(function () {
                    $(this).wrap('<span class="vd-ctn"></span>');
            });
            $(this).find("textarea").each(function () { $(this).wrap('<span class="vd-ctn"></span>') });
            $(this).find("select").each(function () { $(this).wrap('<span class="vd-ctn"></span>') });
        }

        var formIsValid = false;
        var alertCount = 0;
        var requiredLength = $(this).find(".required").length;

        $('.vd_alert').remove();
        $('.vd-alert-literal').remove();
        if (settings.literalPosition == "bottom") {
            $(this).append('<ul class="vd-alert-literal"></ul>');
        }
        else if (settings.literalPosition == "top")
        { $(this).prepend('<ul class="vd-alert-literal"></ul>'); }
      

        $(this).find('[type="checkbox"]').each(function () {
           
                $(this).attr("value", $(this).prop('checked'));
                if (!$(this).prop('checked')) {
                    $(this).attr("value", "false");
                }

        });

        $(this).find('input[type="text"], textarea').each(function (index) {
            var t = $(this);
            if (t.hasClass("required")) {
                if (nullControl(t.val())) {
                    VD_alert(settings.alertType, t.attr("data-null-error-msg"), t.parent(".vd-ctn"));
                }
                else { isValidLength = isValidLength + 1; }
            }
        });

        $(this).find('input[type="hidden"]').each(function (index) {
            var t = $(this);
            if (t.hasClass("required")) {
                if (zeroControl(t.val())) {
                    if (settings.alertType == "tooltip") { VD_alert(settings.alertType, t.attr("data-null-error-msg") + "%%%hdn", t.parent(".vd-ctn")); }
                    else { VD_alert(settings.alertType, t.attr("data-null-error-msg"), t.parent(".vd-ctn")); }
                }
                
                else {
                    isValidLength = isValidLength + 1;
                }
            }
        });

        
        $(this).find('input[type="email"]').each(function (index) {
            var t = $(this);
            if (t.hasClass("required")) {
                if (nullControl(t.val())) {
                    VD_alert(settings.alertType, t.attr("data-null-error-msg"), t.parent(".vd-ctn"));
                }
                else if (!isValidEmailAddress(t.val())) {
                    VD_alert(settings.alertType, t.attr("data-valid-msg"), t.parent(".vd-ctn"));

                }
                else { isValidLength = isValidLength + 1; }
            }
        });


        $(this).find('input[type="password"]').each(function (index) {
            var t = $(this);
            if (t.hasClass("required")) {
                if (nullControl(t.val())) {
                    VD_alert(settings.alertType, t.attr("data-null-error-msg"), t.parent(".vd-ctn"));
                }
                else { isValidLength = isValidLength + 1; }
            }
        });

        $(this).find('input[type="file"]:not(.multiple)').each(function (index) {
            var t = $(this);
            if (t.hasClass("required")) {

                var fileName = t.val();
                var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);

                if (nullControl(t.val())) {
                    VD_alert(settings.alertType, t.attr("data-null-error-msg"), t.parent(".vd-ctn"));
                }
                else if (!isValidExtension(t.attr("data-valid-ext"), fileNameExt)) {
                    VD_alert(settings.alertType, t.attr("data-valid-error-msg"), t.parent(".vd-ctn"));
                }
                else { isValidLength = isValidLength + 1; }
            }


        });


        $(this).find('input[type="file"][multiple="multiple"]').each(function (index) {
            var t = $(this);
            var validFilesLenght = 0;
            var isFileLengthAlerted = false;
            if (t.hasClass("required")) {
                if (t.get(index).files.length == 0) {
                    VD_alert(settings.alertType, t.attr("data-null-error-msg"), t.parent(".vd-ctn"));
                }
                else {

                    $.map(t.get(index).files, function (file) {

                        var fileName = file.name;
                        var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);

                        if (t.get(index).files.length > settings.maxFileLength) {
                            var msg = settings.maxFileLengthError;
                            if (!isFileLengthAlerted) {
                                VD_alert(settings.alertType, msg, t.parent(".vd-ctn"));
                                isFileLengthAlerted = true;
                            }
                        }
                        else if (!isValidExtension(settings.validExtensions, fileNameExt)) {
                            VD_alert(settings.alertType, fileName + " " + settings.m_validExtensionsError, t.parent(".vd-ctn"));

                        }
                        else if (file.size > settings.maxFileSize) {
                            VD_alert(settings.alertType, settings.maxFileSizeError, t.parent(".vd-ctn"));
                        }
                        else {
                            validFilesLenght = validFilesLenght + 1;
                            if (validFilesLenght == t.get(index).files.length) {
                                isValidLength = isValidLength + 1;
                            }
                        }
                    });
                }
            }
        });


        $(this).find('select').each(function (index) {
            var t = $(this);
            if (t.hasClass("required")) {
                if (!zeroControl(t.children("option:selected").val()) && !nullControl(t.val())) {
                    isValidLength = isValidLength + 1;
                }
                else {
                    VD_alert(settings.alertType, t.attr("data-null-error-msg"), t.parent(".vd-ctn"));

                }
            }
        });
        
        //console.log(isValidLength + " " + requiredLength);
        if (isValidLength > 0) {

            if (isValidLength == requiredLength) {
                renewValidValue();
                formIsValid = true;

                
                if (settings.clearForm) {
                    clearFormElements($(this));
                }

                //console.log("test")

            }
            else {

                if (settings.alertType == "modal") {
                    
                    if (alertCount != (requiredLength - isValidLength)) {
                      

                    }
                    else {
                        $.modal({ content: $('.vd-alert-literal').css("display", "block").wrap('<p></p>').parent("p").html(), header: "Eksik bir şeyler var..." });
                        $('.vd-alert-literal').parent("p").remove();
                        formIsValid = false;
                        if ($('.mdl').length > 1) {
                            $('.mdl').not(":first-child").remove();
                        }
                    }
                }
                else { renewValidValue(); }
                
            }
        }
        return formIsValid;


        function placeholderControl(el) {
            var attr = $(el).attr('data-placeholder');
            if (typeof attr !== typeof undefined && attr !== false) {
                if ($(el).val() == attr) {
                    return false;
                }
                else if ($(el).val().length > 0) {
                    return true;
                }
                else { return false; }
            }
        }
        function isValidExtension(extArray, fileExtension) {
            extArray = extArray.toLowerCase();
            fileExtension = fileExtension.toLowerCase();
            if (extArray.indexOf(fileExtension) >= 0) return true;
            else { return false; }
        }
        function renewValidValue() {
            isValidLength = 0;
            
        }

        function nullControl(str) {
            if (str.length < 1 || str.indexOf(" ") == 0) {
                
                return true;
            }
            else {
                
                return false;
            }
        }
        function zeroControl(int) {
            int = parseInt(int);
            if (int == 0) { return true; }
            else { return false; }
        }
        
        function isValidEmailAddress(emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|  \d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(emailAddress);
        };
        
        function VD_alert(type, msg, containerElement) {
            alertCount++
            if (type == "modal") {
                $('.vd-alert-literal').css("display", "none");
                $('.vd-alert-literal').append('<li class="vd-alert">' + msg + '</li>');
                //alert(alertCount + " " + (requiredLength - isValidLength) + " " + isValidLength);
                
                    if (alertCount == (requiredLength - isValidLength)) {
                        $.modal({ content: $('.vd-alert-literal').css("display", "block").wrap('<p></p>').parent("p").html(), header:"Eksik bir şeyler var..." });
                        $('.vd-alert-literal').parent("p").remove();
                    
                    }  
                    
                }
               

              

               
            
            else if (type == "tooltip") {
                
                var msgs;
                if (typeof msg != typeof undefined || msg != "") {
                    if (!(msg.indexOf('%%%') > 0)) {
                        msg = msg + '%%%none'
                    }
                }
                else { msg = '-%%%none' }
              
              
              
                msgs = msg.split('%%%');
              containerElement.prepend('<div class="tooltip ' + msgs[1] + '">' + msgs[0] + '</div>');
                //containerElement kullanılıyor
              containerElement.find('input').click(function () {

                  $(this).parent(".vd-ctn").children(".tooltip").remove();

              });
              $('.tooltip').click(function () { $('.tooltip').remove(); });
              //var divPosition = containerElement.offset().top;
                //$('body,html').animate({ scrollTop: divPosition });
              var divPosition = $('.tooltip:nth-child(1)').offset().top;
              $('body,html').stop().animate({ scrollTop: divPosition -20 });
            }
            else if (type == "classic") {
                alert(msg);
            }
            else if (type == "label") {
                containerElement.append('<span class="vd-alert">' + msg + '</span>');
               
            }
            else if (type == "literal") {
                $('.vd-alert-literal').css("display", "block");
                $('.vd-alert-literal').append('<li class="vd-alert">' + msg + '</li>');
               
            }
        }
    }
    $.fn.clearForm = function () {
        $(this).find(':input').each(function () {
            switch (this.type) {
                case 'select-multiple': $(this).val("0"); break;
                case 'select-one': $(this).val("0"); break;
                case 'text':
                case 'email':
                case 'password':
                case 'textarea': $(this).val(''); break;
                //case 'checkbox':
                //case 'radio': this.checked = false; break;
                case 'file': $(this).replaceWith($(this).clone(true)); $(this).val("");
            }
        });
    }
    
})(jQuery);