function valida_antes() {
    var formElement = document.getElementById("frmlogin");
    var formData = new FormData(formElement);
    a_R = 'Cancel_peticion';
    a_R = $.ajax({
        type: "POST",
        url: "evento_user.php",
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        beforeSend: function (res) { //entrar
            //$('#espacio_frmlogin').alert();
            obj_valObj(2,
                    'txtnomusuario', '', 'RisTxt', 'Usuario', 'valid:Objnom_usuario:msgExampleLa secuencia debe esta formada por caracteres contenidos en\n [a-zA-Z0-9]:regExp^[a-zA-Z0-9]{8,}$',
                    'txtpasswd', '', 'RisTxt', 'Contrase&ntilde;a', '',
                    'hidlogin', '', 'RisTxt', 'Var login', '',
                    'tkn', '', 'RisTxt', 'Tkn', ''
                    );
            $('.camb-sing-in').addClass('fa-spinner fa-spin');
            $(".en_dis").attr('disabled', 'disabled');
            if (!document.obj_retVal) {
                $('.camb-sing-in').removeClass('fa-spinner fa-spin');
                $('.en_dis').removeAttr('disabled');
//                                                                $('.camb-sing-in').removeClass('fa-spinner fa-spin');
//                                                                $('.camb-sing-in').removeAttr('disabled');
                res.abort();
            }
        },
        success: function (response) {
            var sigue = true;
            var msj = response.mensaje;
            if (response.successful == "true" && (response.estado) * 1 == 1) {
                $('#frmlogin').submit();
            } else {
                if ((response.estado) * 1 == -1) {
                    location.reload();
                } else {
                    sigue = false;
                    jQuery("#espacio_frmlogin").css('display', 'block');
                    jQuery("#texto_frmlogin").html('<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>&nbsp;' + msj);
                    document.getElementById("txtnomusuario").focus();
                    $("#espacio_frmlogin").attr('tabindex', '-1');
                }

            }
        },
        error: function (e) {
            a_R.abort();
        },
        complete: function () {
            $('.camb-sing-in').removeClass('fa-spinner fa-spin');
            $('.en_dis').removeAttr('disabled');
        }
    });
}


$(document).ready(function () {

    $("#rec_passw").click(function () {
        var correo = $('#txtnomusuario_r').val();
        if (correo.trim() == 0) {
            alertify.error('Ingrese usuario');
            $("#txtnomusuario_r").focus();
            return false;
        } else {
            if (!validarEmail(correo)) {
                alertify.error('Ingrese usuario valido');
                $("#txtnomusuario_r").focus();
                return false;
            }
        }
        var datos = "type=r_p";
        datos += "&user=" + correo;
        $.ajax({
            url: 'e_p.php',
            type: 'POST',
            dataType: 'json',
            data: datos,
            beforeSend: function () {
                $('#ocultar_load_').addClass('fa fa-spinner fa-spin');
                $('#rec_passw').attr('disabled', 'disabled');
            },
            success: function (response) {//echo json_encode(array('successful' => $success, 'estado' => $estado_proceso));
                if (response.successful == 'true') {
                    //logout  'logout'=>$logout
                    if (response.estado == '1') {
                        alertify.success("Se envio correo ! Proceso completo!");
                    } else {
                        alertify.error("No hay concidencias");
                    }

                } else {
                    alertify.error("bondad al generar pass");
                }
                // alertify.success("! el registro se guardo!");
            }, error: function (e) {
                alertify.error("bondad al recuperar ");
            },
            complete: function () {
                $('#ocultar_load_').removeClass('fa fa-spinner fa-spin');
                $('#rec_passw').removeAttr('disabled');
            },
        });
        return false;
    });
});
function manda_correo(mail) {
    var correo = $('#' + mail).val();
    if (correo.trim() == 0) {
        alertify.error('Ingrese correo');
        $("#correo_r").focus();
        return false;
    } else {
        if (!validarEmail(correo)) {
            alertify.error('Ingrese correo valido');
            $("#correo_r").focus();

        }
    }

}
function validarEmail(valor) {
    var retorna = false;
    if ((valor.trim()).length >= 4) {
        retorna = true;
    }
    return retorna;
}
function firts_d() {
    $('#rec_modal').modal('show');
}
$('#correo').keyup(function (e) {
    var cadena = $('#correo').val();
    cadena = cadena.toLowerCase();
    $('#correo').val(cadena);
});
$('#ape_pat').keyup(function (e) {
    var cadena = $('#ape_pat').val();
    cadena = cadena.toUpperCase();
    $('#ape_pat').val(cadena);
});
$('#ape_mat').keyup(function (e) {
    var cadena = $('#ape_mat').val();
    cadena = cadena.toUpperCase();
    $('#ape_mat').val(cadena);
});
$('#nombre').keyup(function (e) {
    var cadena = $('#nombre').val();
    cadena = cadena.toUpperCase();
    $('#nombre').val(cadena);
});


// mostrar pantalla de para iniciar sesion, si no esta registrado mostrar pantalla donde se registran los datos de los usuarios
  