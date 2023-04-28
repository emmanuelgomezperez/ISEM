// JavaScript Document
function findObj(n, d) {
    var p, i, x;
    n = (n + "").toString();
    if (!d)
        d = document;
    if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document;
        n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all)
        x = d.all[n];
    for (i = 0; !x && i < d.forms.length; i++)
        x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++)
        x = findObj(n, d.layers[i].document);
    if (!x && d.getElementById)
        x = d.getElementById(n);
    return x;
}
function obj_valObj() {
    var xname = '', xvalid = '', i, test, errp, errors = '', args = obj_valObj.arguments;
    var tipo = args[0];
    var ar_id_error = [];
    var er_ = true;
    for (i = 1; i < (args.length - 4); i += 5) {
        xvalid = args[i + 4];
        xname = args[i + 3];
        test = args[i + 2];
        val = findObj(args[i]);
        var aux_val='';
        if (val) {
            aux_val=val.value;
        } else {
            val = findObj(args[i] + "[]");
            aux_val=($(".c_"+args[i]).val()+"");
        }
        // console.log(args[i]+" valores "+val);
        if (val) {
            xobject = val;
            val = aux_val.trim();
            if (val != "") {
                if (test.indexOf("isNum") != -1)
                    if (isNaN(val) || parseFloat(val) < parseInt(args[i + 1])) {
                        pos1 = xvalid.indexOf(":inIRange");
                        if (pos1 != -1) {
                            pos2 = xvalid.indexOf("-", pos1);
                            pos3 = xvalid.indexOf("_", pos2);
                            var aux = "";
                            for (var i = pos2 + 1; i < pos3; i++) {
                                aux += xvalid[i];
                            }
                            var otro = "" + xvalid.substring(pos1 + 9, pos2);

                            errors += '* El campo \'' + xname + '\' debe ser num&eacute;rico y estar en el rango de ' + otro + ' a ' + aux + '.<br>';
                            jQuery("#e_" + args[i]).html('Debe ser num&eacute;rico y estar en el rango de ' + otro + ' a ' + aux);
                            jQuery("#e_" + args[i]).css("color", "#DC3545");
                            jQuery("#e_" + args[i]).css('display', 'block');
                            jQuery("#" + args[i]).addClass("is-invalid");
                            jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                            ar_id_error.push(args[i]);
                            x = xobject;
//                                        errors += ' deve ser numerico y estar en el  rango de '
//                                                    + otro +  'a  '+ aux ;
                        } else {
                            jQuery("#e_" + args[i]).html('Debe ser num&eacute;rico ' + args[i + 1]);
                            jQuery("#e_" + args[i]).css("color", "#DC3545");
                            jQuery("#e_" + args[i]).css('display', 'block');
                            jQuery("#" + args[i]).addClass("is-invalid");
                            jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                            errors += '* El campo \'' + xname + '\' debe ser num&eacute;rico ' + args[i + 1] + '.<br>';
                            ar_id_error.push(args[i]);
                            x = xobject;
                        }
                    } else {
                        if (xvalid.indexOf("valid") != -1) {
                            errp = '';
                            pos1 = xvalid.indexOf(":Obj");
                            pos2 = xvalid.indexOf(":Cond");
                            pos3 = xvalid.indexOf(":in");
                            pos4 = xvalid.indexOf(":inIRange");
                            if (pos3 != -1) {
                                if (pos1 != -1 && pos2 != -1) {
                                    x2Obj = findObj(xvalid.substring(pos1 + 4, pos2));
                                    if (x2Obj)
                                        if (x2Obj.value == xvalid.substring(pos2 + 5, pos3)) {
                                            errp += '* El campo \'' + xvalid.substring(pos1 + 4, pos2)
                                                    + '\' no puede ser \'' + xvalid.substring(pos2 + 5, pos3) + '\'';
                                            errp += ' si \'' + xname;
                                            ar_id_error.push(args[i]);
                                        }
                                    pos1 = xvalid.indexOf(":inIRange");
                                    if (pos1 != -1) {
                                        pos2 = xvalid.indexOf("-", pos1);
                                        if (parseFloat(val) < parseFloat(xvalid.substring(pos1 + 9, pos2)) || parseFloat(val) > parseFloat(xvalid.substring(pos2 + 1))) {
                                            errp += '* El campo \'' + xname;
                                            errp += '\' no esta en el rango de \''
                                                    + xvalid.substring(pos1 + 9, pos2) + ' a ' + xvalid.substring(pos2 + 1) + '\'';
                                            ar_id_error.push(args[i]);
                                        } else {
                                            errp = '';
                                        }
                                    }
                                    if (errp.length > 0) {
                                        errp += '<br>';
                                        x = xobject;
                                    }
                                } else {
                                    if (pos4 != -1) {
                                        pos2 = xvalid.indexOf("-", pos4);
                                        if (parseFloat(val) < parseFloat(xvalid.substring(pos4 + 9, pos2)) || parseFloat(val) > parseFloat(xvalid.substring(pos2 + 1))) {
                                            pos5 = xvalid.indexOf("_", pos2);
                                            errp += '* El campo \'' + xname;
                                            errp += '\' no esta en el rango de \''
                                                    + xvalid.substring(pos4 + 9, pos2) + ' a ' + xvalid.substring(pos2 + 1, pos5) + '\'';
                                            ar_id_error.push(args[i]);
                                        } else {
                                            errp = '';
                                        }
                                        if (errp.length > 0) {
                                            errp += '<br>';
                                            x = xobject;
                                        }
                                    }
                                }
                            }
                            errors += errp;
                        } else {
                            jQuery("#" + args[i]).removeClass("is-invalid");
                            jQuery("#" + args[i]).addClass("is-valid");
                            jQuery("#e_" + args[i]).css("color", "#28A745");
                            jQuery("#e_" + args[i]).html("Correcto");
                            jQuery("#e_" + args[i]).css('display', 'block');
                            jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                        }
                    }
                if (xvalid.indexOf(":regExp") != -1) {
                    var rePattern = new RegExp(xvalid.substring(xvalid.indexOf(":regExp") + 7));
                    if (!rePattern.exec(val)) {
//                                                alert("asdasdas");
//                        alert(args[i]);
                        er_ = (1 == 2);
                        errors += 'El campo "' + xname + '" no tiene un formato valido ' + xvalid.substring(xvalid.indexOf(":msgExample") + 11, xvalid.indexOf(":regExp")) + '';
                        jQuery("#e_" + args[i]).html('No tiene un formato v&aacute;lido ' + xvalid.substring(xvalid.indexOf(":msgExample") + 11, xvalid.indexOf(":regExp")));
                        jQuery("#e_" + args[i]).css("color", "#DC3545");
                        jQuery("#e_" + args[i]).css('display', 'block');
                        jQuery("#" + args[i]).addClass("is-invalid");
                        x = xobject;
                        globalvar = x;
                        ar_id_error.push(args[i]);
                        x.select();
                        //alert("asdasdas addfs");
                    } else {
                        jQuery("#" + args[i]).removeClass("is-invalid");
                        jQuery("#" + args[i]).addClass("is-valid");
                        jQuery("#e_" + args[i]).css("color", "#28A745");
                        jQuery("#e_" + args[i]).html("Correcto");
                        jQuery("#e_" + args[i]).css('display', 'block');
                        jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                    }
                }

                if (test.indexOf("isDate") != -1)
                    if (!valfecha(val, 'dd/mm/yyyy')) {
                        errors += '* El campo \'' + xname + '\' no es valido, el formato debe ser \'dia-mes-año\' por ejemplo: \'30/12/2006\' <br>';
                        jQuery("#e_" + args[i]).html('No es valido, el formato debe ser \'dia-mes-aï¿½o\' por ejemplo: \'30/12/2006\'');
                        jQuery("#e_" + args[i]).css("color", "#DC3545");
                        jQuery("#e_" + args[i]).css('display', 'block');
                        jQuery("#" + args[i]).addClass("is-invalid");
                        jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                        x = xobject;
                        ar_id_error.push(args[i]);
                        if (args.length == 4) {
                            var yesno = confirm('Ha ocurrido el siguiente error <br>' + errors);
                            errors = '';
                            if (!yesno)
                                x.value = today('dd/mm/yyyy');
                            globalvar = x;
                            setTimeout("globalvar.focus()", 250);
                            x.select();
                        }
                    }
                if (test.indexOf("isEmail") != -1)
                    if (!valEmail(val)) {
                        errors += '* El campo \'' + xname + '\' no es un e-mail valido, el formato debe ser \'nombredeusuario @ servidor.dominio\' por ejemplo \'juan@edomex.gob.mx\' <br>';
                        jQuery("#e_" + args[i]).html('No es un e-mail valido, el formato debe ser \'nombredeusuario @ servidor.dominio\' por ejemplo: \'juan@edomex.gob.mx\'');
                        jQuery("#e_" + args[i]).css("color", "#DC3545");
                        jQuery("#e_" + args[i]).css('display', 'block');
                        jQuery("#" + args[i]).addClass("is-invalid");
                        jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                        x = xobject;
                        ar_id_error.push(args[i]);
                    } else {
                        jQuery("#" + args[i]).removeClass("is-invalid");
                        jQuery("#" + args[i]).addClass("is-valid");
                        jQuery("#e_" + args[i]).css("color", "#28A745");
                        jQuery("#e_" + args[i]).html("Correcto");
                        jQuery("#e_" + args[i]).css('display', 'block');
                        jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                    }
                if (test.indexOf("isNombre") != -1)
                    if (!valNombre(val)) {
                        jQuery("#e_" + args[i]).html('No es un nombre valido, el formato debe ser \'Nombre(s) ApellidoPaterno ApellidoMaterno \' por ejemplo: \'Juan Pï¿½rez Solï¿½s\'');
                        jQuery("#e_" + args[i]).css("color", "#DC3545");
                        jQuery("#e_" + args[i]).css('display', 'block');
                        jQuery("#" + args[i]).addClass("is-invalid");
                        jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                        errors += '* El campo \'' + xname + '\' no es un nombre valido, el formato debe ser \'Nombre(s) ApellidoPaterno ApellidoMaterno \' por ejemplo: \'Juan Pï¿½rez Solï¿½s\' <br>';
                        ar_id_error.push(args[i]);
                        x = xobject;
                        globalvar = x;
                        setTimeout("globalvar.focus()", 250);
                        x.select();
                    }
                if (test.indexOf("isIP") != -1)
                    if (!valIP(val)) {
                        jQuery("#e_" + args[i]).html('No es una IP valida, el formato debe ser \'num.num.num.num \' num: 0-255 por ejemplo: \'102.1.0.254\'');
                        jQuery("#e_" + args[i]).css("color", "#DC3545");
                        jQuery("#e_" + args[i]).css('display', 'block');
                        jQuery("#" + args[i]).addClass("is-invalid");
                        jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                        errors += '* El campo \'' + xname + '\' no es una IP valida, el formato debe ser \'num.num.num.num \' num: 0-255 por ejemplo: \'102.1.0.254\' <br>';
                        x = xobject;
                        globalvar = x;
                        setTimeout("globalvar.focus()", 250);
                        x.select();
                        ar_id_error.push(args[i]);
                    }
                if (test.indexOf("isPorcen") != -1) {
                    ar_id_error.push(args[i]);
//            errors+='* el campo \''+xname+'\' no es una IP valida, el formato debe ser \'num.num.num.num \' num: 0-255 por ejemplo: \'102.1.0.254\' <br>';
//			x=xobject; globalvar = x; setTimeout("globalvar.focus()",250);x.select();
                }
                if (test.indexOf("isCheck") != -1) {//valid:emisor_notificacion:total_5:message_ï¿½Quï¿½ tipo de notificaciï¿½n se realiza?:specific_1-5:other_otros_drogas
                    pos1 = xvalid.indexOf("valid:");
                    if (pos1 != -1) {
                        pos2 = xvalid.indexOf("emisor_", pos1);
                        pos3 = xvalid.indexOf(":", pos2);
                        var emisor = xvalid.substring(pos2 + 7, pos3);
                        pos4 = xvalid.indexOf("total_", pos3);
                        pos5 = xvalid.indexOf(":", pos4);
                        var total = xvalid.substring(pos4 + 6, pos5);
                        pos6 = xvalid.indexOf("message_", pos5);
                        pos7 = xvalid.indexOf(":", pos6);
                        var mensaje = xvalid.substring(pos6 + 8, pos7);
                        var cont = 0;
                        for (var ci = 1; ci <= total; ci++) {
                            var input = document.getElementById(emisor + (ci == 1 ? '' : ci));
                            if (input.checked) {
                                cont++;
                            }
                        }
                        pos8 = xvalid.indexOf("specific_", pos7);
                        pos9 = xvalid.indexOf("-", pos8);
                        var r1 = xvalid.substring(pos8 + 9, pos9);
                        pos10 = xvalid.indexOf(":", pos9);
                        var r2 = xvalid.substring(pos9 + 1, pos10);
                        pos11 = xvalid.indexOf("other_", pos10);
                        var otro_campo = xvalid.substring(pos11 + 6);
                        var input_otro = document.getElementById(otro_campo);
                        var valor = "";
                        if (otro_campo != "noexistt") {
                            var valor = "" + input_otro.value;
                            valor = valor.replace(/\s+/g, '');
                        }
                        if (cont < r1 || cont > r2) {
                            if (otro_campo == "noexistt") {
                                jQuery("#e_" + args[i]).html('No ha sido seleccionada o selecciona hasta \'' + r2 + '\' opcion (s)');
                                jQuery("#e_" + args[i]).css("color", "#DC3545");
                                jQuery("#e_" + args[i]).css('display', 'block');
                                jQuery("#" + args[i]).addClass("is-invalid");
                                jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                                errors += '* El campo \'' + mensaje + '\' no ha sido seleccionada o selecciona hasta \'' + r2 + '\' opcion (s) <br>';
                                x = xobject;
                                globalvar = x;
                                setTimeout("globalvar.focus()", 250);
                                x.select();
                                ar_id_error.push(args[i]);
                            } else {
                                if (valor == "" && (cont < r1 || cont > r2)) {
                                    jQuery("#e_" + args[i]).html('No ha sido seleccionada o selecciona hasta \'' + r2 + '\' opcion (s)');
                                    jQuery("#e_" + args[i]).css("color", "#DC3545");
                                    jQuery("#e_" + args[i]).css('display', 'block');
                                    jQuery("#" + args[i]).addClass("is-invalid");
                                    jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                                    errors += '* El campo \'' + mensaje + '\' no ha sido seleccionada o selecciona hasta \'' + r2 + '\' opcion (s) <br>';
                                    x = xobject;
                                    globalvar = x;
                                    setTimeout("globalvar.focus()", 250);
                                    x.select();
                                    ar_id_error.push(args[i]);
                                }
                            }
                        } else {
                            if ((otro_campo == "noexistt") && (cont < r1 || cont > r2)) {
                                jQuery("#e_" + args[i]).html('No ha sido seleccionada o selecciona hasta \'' + r2 + '\' opcion (s)');
                                jQuery("#e_" + args[i]).css("color", "#DC3545");
                                jQuery("#e_" + args[i]).css('display', 'block');
                                jQuery("#" + args[i]).addClass("is-invalid");
                                jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                                errors += '* El campo \'' + mensaje + '\' no ha sido seleccionada o selecciona hasta \'' + r2 + '\' opcion (s) <br>';
                                ar_id_error.push(args[i]);
                                x = xobject;
                                globalvar = x;
                                setTimeout("globalvar.focus()", 250);
                                x.select();
                            } else {
                                if (valor != "") {
                                    jQuery("#e_" + args[i]).html('No ha sido seleccionada o selecciona hasta \'' + r2 + '\' opcion (s)');
                                    jQuery("#e_" + args[i]).css("color", "#DC3545");
                                    jQuery("#e_" + args[i]).css('display', 'block');
                                    jQuery("#" + args[i]).addClass("is-invalid");
                                    jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                                    errors += '* El campo \'' + mensaje + '\' no ha sido seleccionada o selecciona hasta \'' + r2 + '\' opcion (s) <br>';
                                    ar_id_error.push(args[i]);
                                    x = xobject;
                                    globalvar = x;
                                    setTimeout("globalvar.focus()", 250);
                                    x.select();
                                }
                            }
                        }
                    } else {
                        if (test.charAt(0) == 'R') {
                            if ($('#' + args[i]).prop('checked')) {
                                jQuery("#" + args[i]).removeClass("checks_forms_error");
                                jQuery("#" + args[i]).addClass("checks_forms_bien");
                                jQuery("#e_" + args[i]).css("color", "#28A745");
                                jQuery("#e_" + args[i]).html("Correcto");
                                jQuery("#e_" + args[i]).css('display', 'block');
                                jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                            } else {
                                jQuery("#e_" + args[i]).html('seleccionar opcion');
                                jQuery("#e_" + args[i]).css("color", "#DC3545");
                                jQuery("#e_" + args[i]).css('display', 'block');
                                jQuery("#" + args[i]).removeClass("checks_forms_bien");
                                jQuery("#" + args[i]).addClass("checks_forms_error");
                                jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                                errors += '* El campo \'' + xname + '\' es obligatorio </br>';
                            }
                        } else {
                            jQuery("#" + args[i]).removeClass("checks_forms_error");
                            jQuery("#" + args[i]).addClass("checks_forms_bien");
                            jQuery("#e_" + args[i]).css("color", "#28A745");
                            jQuery("#e_" + args[i]).html("Correcto");
                            jQuery("#e_" + args[i]).css('display', 'block');
                            jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                        }

                    }
                }
                if (test.indexOf("isTxt") != -1 && er_)
                    if (val != "") {
                        jQuery("#" + args[i]).removeClass("is-invalid");
                        jQuery("#" + args[i]).addClass("is-valid");
                        jQuery("#e_" + args[i]).css("color", "#28A745");
                        jQuery("#e_" + args[i]).html("Correcto");
                        jQuery("#e_" + args[i]).css('display', 'block');
                        jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                    } else {
                    }
                if (test.indexOf("isSelect") != -1)
                    if (val != "") {
                        jQuery("#" + args[i]).removeClass("is-invalid");
                        jQuery("#" + args[i]).addClass("is-valid");
                        jQuery("#e_" + args[i]).css("color", "#28A745");
                        jQuery("#e_" + args[i]).html("Correcto");
                        jQuery("#e_" + args[i]).css('display', 'block');
                        jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                    } else {
                    }


//			if (!valIP(val)){ errors+='* el campo \''+xname+'\' no es una IP valida, el formato debe ser \'num.num.num.num \' num: 0-255 por ejemplo: \'102.1.0.254\' <br>';
//			x=xobject; globalvar = x; setTimeout("globalvar.focus()",250);x.select();}                

            } else if (test.charAt(0) == 'R') {

                if (test.indexOf("isNum") != -1) {
                    jQuery("#e_" + args[i]).html('Es obligatorio, num&eacute;rico ' + args[i + 1]);
                    jQuery("#e_" + args[i]).css("color", "#DC3545");
                    jQuery("#e_" + args[i]).css('display', 'block');
                    jQuery("#" + args[i]).addClass("is-invalid");
                    jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                    errors += '* El campo \'' + xname + '\' es obligatorio, num&eacute;rico' + args[i + 1] + '<br>';
                    ar_id_error.push(args[i]);
                    x = xobject;
                } else {
                    // alert('obligatorio');
                    jQuery("#e_" + args[i]).html('Es obligatorio');
                    jQuery("#e_" + args[i]).css("color", "#DC3545");
                    jQuery("#e_" + args[i]).css('display', 'block');
                    jQuery("#" + args[i]).addClass("is-invalid");
                    jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
                    errors += '* El campo \'' + xname + '\' es obligatorio <br>';
                    ar_id_error.push(args[i]);
                    x = xobject;
                }
            } else {
                jQuery("#" + args[i]).removeClass("is-invalid");
                jQuery("#" + args[i]).addClass("is-valid");
                jQuery("#e_" + args[i]).css("color", "#28A745");
                jQuery("#e_" + args[i]).html("Correcto");
                jQuery("#e_" + args[i]).css('display', 'block');
                jQuery("#" + args[i]).attr('aria-describedby', "e_" + args[i]);
            }
        }
    }
    document.obj_retVal = (errors.length == 0);
    if (document.obj_retVal) {

    } else {
        if (tipo == 2) {
            //alert(ar_id_error.push(ar_id_error[0]));
            //console.log($('#' + ar_id_error[0]).get(0).form.id);
            try {
                var id_form = $('#' + ar_id_error[0]).get(0).form.id;
                // alert(ar_id_error[0]);
                jQuery("#espacio_" + id_form).css('display', 'block');
                jQuery("#texto_" + id_form).html('<i class="fa fa-exclamation-triangle" aria-hidden="true"></i></br>' + errors);
                document.getElementById("" + ar_id_error[0]).focus();
            } catch (error) {
                var id_form = $('.c_' + ar_id_error[0]).get(0).form.id;
                // alert(ar_id_error[0]);
                jQuery("#espacio_" + id_form).css('display', 'block');
                jQuery("#texto_" + id_form).html('<i class="fa fa-exclamation-triangle" aria-hidden="true"></i></br>' + errors);
                $('.c_' + ar_id_error[0]).focus();
                //document.getElementsByClassName("c_" + ar_id_error[0]).focus();
            }


            $("#espacio_" + id_form).attr('tabindex', '-1');
            var el = document.getElementById("d_principal"); // Or whatever method to get the element

// To set the scroll
            el.scrollTop = 0;
            el.scrollLeft = 0;
            return false;
        }

    }

    if (errors) {
        // alert('Ha ocurrido el siguiente error <br>' + errors);
        globalvar = x;

        if (x.type == "hidden") {
            if (tipo == 2) {
                objSelIni();
            }
        } else {
            if (tipo == 2) {

                setTimeout("globalvar.focus()", 250);
                if (x.type == "text") {
                    x.select();
                }
                navigationFn.goToSection('#' + x.id);
            }

        }
        document.reTKey = true;
    }

//  if (errors){ var yesno = confirm('Ha ocurrido el siguiente error <br>'+errors);
//  if (!yesno) x.value=''; globalvar = x; setTimeout("globalvar.focus()",250);x.select();}


}
String.prototype.trim = function () {
    // skip leading and trailing whitespace
    // and return everything in between
    var x = this;
    x = x.replace(/^\s*(.*)/, "$1");
    x = x.replace(/(.*?)\s*$/, "$1");
    return x;
}
function valfecha(fec, formato) {
    var dl, bandfec, dia, mes, aaa, expreg = /(-|\/)/;
    bandfec = true;
    dl = formato.match(expreg);
    dl = RegExp.$1;

    if (fec.length != formato.length) {
        bandfec = false;
        return bandfec;
    }
    dia = fec.substring(formato.indexOf('dd'), formato.indexOf('dd') + 2);
    if (isNaN(dia) || parseFloat(dia) <= 0 || parseFloat(dia) > 31) {
        bandfec = false;
        return bandfec;
    }
    mes = fec.substring(formato.indexOf('mm'), formato.indexOf('mm') + 2);
    if (isNaN(mes) || parseFloat(mes) <= 0 || parseFloat(mes) > 12) {
        bandfec = false;
        return bandfec;
    }
    aaa = fec.substring(formato.indexOf('yyyy'), formato.indexOf('yyyy') + 4);
    if (isNaN(aaa) || parseInt(aaa) <= 0) {
        bandfec = false;
        return bandfec;
    }
    if (fec.substring(formato.indexOf(dl), formato.indexOf(dl) + 1) != dl) {
        bandfec = false;
        return bandfec;
    }
    if (fec.substring(formato.lastIndexOf(dl), formato.lastIndexOf(dl) + 1) != dl) {
        bandfec = false;
        return bandfec;
    }
    bis = 0;
    isbis = aaa % 4;
    if (isbis == 0) {
        bis = 1;
    }
    mes = parseFloat(mes) * 1;
    switch (mes) {
        case 1, 3, 5, 7, 8, 10, 12:
            if (parseFloat(dia) > 31) {
                bandfec = false;
                return bandfec;
            }
            break;
        case 4, 6, 9, 11:
            if (parseFloat(dia) > 30) {
                bandfec = false;
                return bandfec;
            }
            break;
        case 2:
            if ((bis == 1 && parseFloat(dia) > 29) || (bis == 0 && parseFloat(dia) > 28)) {
                bandfec = false;
                return bandfec;
            }
            break;
    }
    return bandfec
}
function today(formato) {
    var dia, mes, aaa, now = new Date();
    dia = ((now.getDate() < 10) ? '0' : '') + now.getDate();
    mes = (((now.getMonth() + 1) < 10) ? '0' : '') + (now.getMonth() + 1);
    aaa = now.getFullYear()
    formato = formato.replace(/dd/, dia);
    formato = formato.replace(/mm/, mes);
    formato = formato.replace(/yyyy/, aaa);
    return formato;
}
function valEmail(valor) {
    xValBool = true;
    re = /^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*([.][a-zA-Z]{2,4})+$/;
    if (!re.exec(valor)) {
        xValBool = false;
    }
    return xValBool;
}
function valNombre(valor) {
    xValBool = true;
    re = /^([a-zï¿½ï¿½ï¿½ï¿½ï¿½A-Z]{1,28}[.]{0,1}[ ]+)+([a-zï¿½ï¿½ï¿½ï¿½ï¿½A-Z]{1,28}[.]{0,1}[ ]*)+([a-zï¿½ï¿½ï¿½ï¿½ï¿½A-Z]{1,28}[.]{0,1}[ ]*)+$/;
    if (!re.exec(valor)) {
        xValBool = false;
    }
    return xValBool;
}
function valIP(valor) {
    xValBool = true;
    re = /^((?:25[0-5])|2[0-4][0-9]|1[0-9]{2}|1[0-9]|[1-9][0-9]|[0-9])(((?:[.]((?:25[0-5])|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9]))){3})$/;
    if (!re.exec(valor)) {
        xValBool = false;
    }
    return xValBool;
}

// <----textarea
var ns6 = document.getElementById && !document.all
function restrictinput(maxrows, maxcols, e, placeholder) {
    if (window.event && countReturn(event.srcElement.value, maxrows, maxcols).getLeftChar() == 0)
        return false
    else if (e.target && e.target == eval(placeholder) && countReturn(e.target.value, maxrows, maxcols).getLeftChar() == 0) {//e.target.value.length>=maxlength){
        var pressedkey = /[a-zA-Z0-9\.\,\/]/ //detect alphanumeric keys
        if (pressedkey.test(String.fromCharCode(e.which)))
            e.stopPropagation();
    }
}
function countlimit(maxrows, maxcols, e, placeholder) {
    var theform = eval(placeholder)
    var placeholderobj = document.all ? document.all['span_' + placeholder] : document.getElementById('span_' + placeholder)
    if (window.event || e.target && e.target == eval(placeholder)) {
        var obj = countReturn(theform.value, maxrows, maxcols);
        if (obj.getLeftChar() == 0) {
            theform.value = obj.getText();
        }
        placeholderobj.innerHTML = '<b>' + obj.getLeftWrite() + '</b> caracteres disponibles en <b>' + obj.getLines() + '</b> lineas (de ' + maxcols + ' caracteres)';
    }
}
var TextArea = function () {
    var text, lines, leftChar, leftWrite;
    this.setText = function (itemx) {
        this.text = itemx;
    }
    this.setLines = function (itemx) {
        this.lines = itemx;
    }
    this.setLeftChar = function (itemx) {
        this.leftChar = itemx;
    }
    this.setLeftWrite = function (itemx) {
        this.leftWrite = itemx;
    }
    this.getText = function () {
        return this.text;
    }
    this.getLines = function () {
        return this.lines;
    }
    this.getLeftChar = function () {
        return this.leftChar;
    }
    this.getLeftWrite = function () {
        return this.leftWrite;
    }
};
function countReturn(string, maxrows, maxcols) {
    var leftWrite = 0;
    leftCount = 0;
    count = 0;
    var leftChar = 0;
    var renglones = new Array();
    renglones[count] = "";
    maxrows--;
    for (var i = 0; i < string.length; i++) {
        if (renglones[count].length >= maxcols) {
            count++;
            renglones[count] = "";
        }
        if (string.substr(i, 1).charCodeAt(0) == 13) {
            count++;
            renglones[count] = "";
        }
        renglones[count] += string.substr(i, 1);
        if (count == maxrows && renglones[count].length == maxcols)
            lastI = i;
    }
    if (count <= maxrows) {
        leftChar = (maxcols - renglones[count].length) + ((maxrows - count) * maxcols);
        leftCount = maxrows - count;
        leftWrite = leftChar;
    } else {
        leftWrite = (maxcols - renglones[maxrows].length);
    }
    var lstRows = new Array();
    for (var i = 0; i < renglones.length; i++) {
        lstRows[i] = renglones[i];
        if (i >= maxrows)
            break;
    }
    var objTexArea = new TextArea();
    objTexArea.setText(lstRows.join(''));
    objTexArea.setLines(leftCount + 1);
    objTexArea.setLeftChar(leftChar);
    objTexArea.setLeftWrite(leftWrite);
    return objTexArea;
}
function displaylimit(theform, rows, cols, cmp_er) {
    var limit_text = '<span class="rowInfo"; id="span_' + theform.toString() + '"><b>' + (rows * cols) + '</b> caracteres disponibles en <b>' + rows + '</b> lineas (de ' + cols + ' caracteres)</span>';
    if (document.all || ns6) {
        if (cmp_er) {
            $("#" + cmp_er).html(limit_text);
        } else {
            document.write(limit_text);
        }
    }

    if (document.all) {
        eval(theform).onkeypress = function () {
            return restrictinput(rows, cols, event, theform)
        }
        eval(theform).onkeyup = function () {
            countlimit(rows, cols, event, theform)
        }
    } else if (ns6) {
        document.body.addEventListener('keypress', function (event) {
            restrictinput(rows, cols, event, theform)
        }, true);
        document.body.addEventListener('keyup', function (event) {
            countlimit(rows, cols, event, theform)
        }, true);
    }
}
//------textarea>
function show_confirm(tit, msg) {
    document.retVal = false;
    document.obj_retVal = confirm(tit + "\n\n" + msg);
}
function show_confirm2(tit, msg) {
    if (document.obj_retVal) {
        document.obj_retVal = false;
        document.obj_retVal = confirm(tit + "\n\n" + msg);
    }
}
function modifyChars() {
    args = modifyChars.arguments;
    var obj = args[0];
    for (i = 1; i < (args.length); i += 2) {
        if (obj.value.indexOf(args[i]) != -1) {
            obj.value = obj.value.replace(args[i], args[i + 1]);
        }
    }
}
function objKeyPressed(e, obj, form) {
    var keynum = 0;
    if (window.event) {
        keynum = e.keyCode;
    } else if (e.which) {
        keynum = e.which;
    }
    if (keynum == 13 && document.reTKey) {
        for (intObj in FORM_OBJECTS) {
            if (FORM_OBJECTS[intObj]['name'] == obj.id) {
                if (intObj == (FORM_OBJECTS.length - 1)) {
                    document.getElementById('submit').focus();
                    document.reTKey = false;
                } else {
                    globalvar = document.getElementById(FORM_OBJECTS[parseFloat(intObj) + 1]['name']);
                    setTimeout("globalvar.focus()", 250);
                    if (FORM_OBJECTS[parseFloat(intObj) + 1]['type'] == 'text') {
                        globalvar.select();
                    }
                    return false;
                }
            }
        }
    } else {
        if (keynum == 13)
            return false;
    }
}
function objSelIni() {
    if (FORM_OBJECTS) {
        if (FORM_OBJECTS.length > 0) {
            globalvar = document.getElementById(FORM_OBJECTS[0]['name']);
            //  console.log(FORM_OBJECTS);
            $('.accordeon_f_0').focus();
            //       setTimeout("globalvar.focus()", 250);
//            if (FORM_OBJECTS[0]['type'] == 'text') {
//                globalvar.select();
//               
//            }
        }
    }
}
function setMsgSpan(xSpan, msg, color) {
    xSpan.innerHTML = msg;
    //xSpan.style.display = display;
    xSpan.style.color = color;
}			