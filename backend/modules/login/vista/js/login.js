function validate_login(){
    var valida_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    if(document.formulario_login.email.value.length==0){
        document.getElementById('error_email').innerHTML="*Correo electrónico incorrecto";
        document.formulario_login.email.focus();
        return 0;
        
    }else if(document.formulario_login.email.value.length!=0){
        document.getElementById('error_email').innerHTML="";
    }
    if(!valida_email.test(document.formulario_login.email.value)){
        document.getElementById('error_email').innerHTML="*El formato del correo electrónico es incorrecto";
        document.formulario_login.email.focus();
        return 0;
    }
    if(document.formulario_login.contrase.value.length==0){
        document.getElementById('error_contra').innerHTML="*Contraseña incorrecta";
        document.formulario_login.contrase.focus();
        return 0;
        
    }else if(document.formulario_login.contrase.value.length!=0){
        document.getElementById('error_contra').innerHTML="";
    }
}
function validate_register(){
    var valida_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
if(document.formulario_register.nombre.value.length==0){
    document.getElementById('error_nombre').innerHTML="*Introduzca su nombre";
    document.formulario_register.nombre.focus();
    return 0;
    
}else if(document.formulario_register.nombre.value.length!=0){
    document.getElementById('error_nombre').innerHTML="";
}
if(document.formulario_register.email.value.length==0){
    document.getElementById('error_email').innerHTML="*Introduzca su correo electrónico";
    document.formulario_register.email.focus();
    return 0;
    
}else if(document.formulario_register.email.value.length!=0){
    document.getElementById('error_email').innerHTML="";
}
if(!valida_email.test(document.formulario_register.email.value)){
    document.getElementById('error_email').innerHTML="*El formato del correo electrónico es incorrecto";
    document.formulario_register.email.focus();
    return 0;
}
if(document.formulario_register.contrase.value.length==0){
    document.getElementById('error_contra').innerHTML="*Introduzca una contraseña segura";
    document.formulario_register.contrase.focus();
    return 0;
    
}else if(document.formulario_register.contrase.value.length!=0){
    document.getElementById('error_contra').innerHTML="";
}

}

function login_view(){
    var url = '?page=login&op=show_View';
    friendlyURL(url).then(function(ruta){
    $.ajax({
        url:ruta,
        type:'GET',
        dataType:'JSON',
        success: function (data){
                    $('<form></form>').attr('class','formulario_register log1').attr('name','formulario_register').attr('id','formulario_register').appendTo('#login_views1');
                    $('<h1>Registrate</h1>').appendTo('.log1');
                    $('<div></div>').attr('class','contenedor_register log2').appendTo('.log1');
                    $('<div></div>').attr('class','input_contenedor log5').appendTo('.log2');
                    $('<i></i>').attr('class','fas fa-user icono').appendTo('.log5');
                    $('<input></input>').attr('type','text').attr('id','nombre').attr('name','nombre').attr('placeholder','Nombre Completo').attr('class','caja_texto nombre').appendTo('.log5');
                    $('<span></span>').attr('id','error_nombre').attr('class','error_nombre validar').appendTo('.log5');
                    $('<div></div>').attr('class','input_contenedor log3').appendTo('.log2');
                    $('<i></i>').attr('class','fas fa-envelope icono').appendTo('.log3');
                    $('<input></input>').attr('type','text').attr('id','email').attr('name','email').attr('placeholder','Correo Electrónico').attr('class','caja_texto').appendTo('.log3');
                    $('<br></br>').appendTo('.log3');
                    $('<a></a>').attr('id','error_email').attr('class','error_email validar').appendTo('.log3');
                    $('<div></div>').attr('class','input_contenedor log4').appendTo('.log2');
                    $('<i></i>').attr('class','fas fa-key icono').appendTo('.log4');
                    $('<input></input>').attr('type','password').attr('id','contrase').attr('name','contrase').attr('placeholder','Contraseña').attr('class','caja_texto').appendTo('.log4');
                    $('<span></span>').attr('id','error_contra').attr('class','error_contra validar').appendTo('.log4');
                    $('<input></input>').attr('type','button').attr('value','Registar').attr('class','boton_register').attr('id','btn_register').attr('onclick','validate_register()').appendTo('.log2');
                    $('<p>Al registrarte, aceptas nuestas Condiciones de uso y Políticas de privacidad</p>').appendTo('.log2');
                    $('<p>¿Ya tienes una cuenta? </p>').attr('class','redi').appendTo('.log2');
                    $('<a>Iniciar Sesion</a>').attr('class','link_regist logeo').appendTo('.redi');
                    show_logins();
                    show_registers();
                    recover(); 
        }
        
    });
});
    
}
function recover(){
    $(document).on('click','.recover',function(){;
        $('#login_views1').empty();
        $('<form></form>').attr('class','formulario_register log1').attr('name','formulario_recover1').attr('id','formulario_recover1').appendTo('#login_views1');
        $('<h1>Recuperar Contraseña</h1>').appendTo('.log1');
        $('<div></div>').attr('class','contenedor_register log2').appendTo('.log1');
        $('<div></div>').attr('class','input_contenedor log3').appendTo('.log2');
        $('<i></i>').attr('class','fas fa-envelope icono').appendTo('.log3');
        $('<input></input>').attr('type','text').attr('id','email').attr('name','email').attr('placeholder','Correo Electrónico').attr('class','caja_texto').appendTo('.log3');
        $('<br></br>').appendTo('.log3');
        $('<a></a>').attr('id','error_email').attr('class','error_email validar').appendTo('.log3');
        $('<input></input>').attr('type','button').attr('value','Confirmar').attr('class','boton_register').attr('id','btn_recov').appendTo('.log2'); 
        $(document).on('click','#btn_recov',function(){;
            var url = '?page=login&op=recover';
            friendlyURL(url).then(function(ruta){
                var data = $('#formulario_recover1').serialize(); 
                $.ajax({
                    type:'POST',
                    data: data,
                    url: ruta,
                    success:(function(data){
                        // alert(data);
                        window.location.href="/FrameworkPHP/login/list";
                        

                    })
                });
            });
        });
    });
}
function show_logins(){
    $(document).on('click','.logeo',function(){;
        $('#login_views1').empty(); 
        $('<form></form>').attr('class','formulario_register log1').attr('name','formulario_login').attr('id','formulario_login').appendTo('#login_views1');
        $('<h1>Login</h1>').appendTo('.log1');
        // $('<i></i>').attr('class','fab fa-google-plus-square icono2').appendTo('.log1');
        // $('<i></i>').attr('class','fab fa-github-square icono2').appendTo('.log1');
        $('<img></img>').attr('class','imgLog google').attr('id','google').attr('src','http://localhost/FrameworkPHP/view/img/google.png').appendTo('.log1');
        $('<img></img>').attr('class','imgLog github').attr('src','http://localhost/FrameworkPHP/view/img/github.png').appendTo('.log1');
        $('<div></div>').attr('class','contenedor_register log2').appendTo('.log1');
        $('<div></div>').attr('class','input_contenedor log3').appendTo('.log2');
        $('<i></i>').attr('class','fas fa-envelope icono').appendTo('.log3');
        $('<input></input>').attr('type','text').attr('id','email').attr('name','email').attr('placeholder','Correo Electrónico').attr('class','caja_texto').appendTo('.log3');
        $('<br></br>').appendTo('.log3');
        $('<a></a>').attr('id','error_email').attr('class','error_email validar').appendTo('.log3');
        $('<div></div>').attr('class','input_contenedor log4').appendTo('.log2');
        $('<i></i>').attr('class','fas fa-key icono').appendTo('.log4');
        $('<input></input>').attr('type','password').attr('id','contrase').attr('name','contrase').attr('placeholder','Contraseña').attr('class','caja_texto').appendTo('.log4');
        $('<span></span>').attr('id','error_contra').attr('class','error_contra validar').appendTo('.log4');
        $('<input></input>').attr('type','button').attr('value','Login').attr('class','boton_register').attr('id','btn_login').attr('onclick','validate_login()').appendTo('.log2');
        $('<p>Al registrarte, aceptas nuestas Condiciones de uso y Políticas de privacidad</p>').appendTo('.log2');
        $('<p>¿No tienes una cuenta? </p>').attr('class','redi').appendTo('.log2');
        $('<a>Registrate</a>').attr('class','link_regist registro').appendTo('.redi');
        $('<p>¿Has olvidado la contraseña? </p>').attr('class','redi2').appendTo('.log2');
        $('<a>Recuperar contraseña</a>').attr('class','link_regist recover').appendTo('.redi2');

    });
}
function social_git(){
    
    var config = {
        apiKey: "AIzaSyChqlIprL8ibgAoaP6pl3F4BfWw4QmJWZM",
        authDomain: "kiwear-be9f5.firebaseapp.com",
        databaseURL: "https://kiwear-be9f5.firebaseio.com",
        projectId: "kiwear-be9f5",
        storageBucket: "",
        messagingSenderId: "87488149386"
      };
      firebase.initializeApp(config);
      var provider = new firebase.auth.GithubAuthProvider();
      var authService = firebase.auth();
    $(document).on('click','.github',function(){
        authService.signInWithPopup(provider)
        .then(function(result) {
            var url = '?page=login&op=socialGit';
            var email = result.user.email;
            var name = result.user.displayName;
            var id = result.user.uid;
            var data = {
                email:email,
                name:name,
                id:id
            };

            friendlyURL(url).then(function(ruta){
                $.ajax({
                    type:'POST',
                    data: data,
                    url: ruta,
                    success:(function(resultado){
                        // console.log(resultado);
                        var token = resultado;
                        localStorage.setItem('token',token);
                        window.location.href='/FrameworkPHP/home/list';

                    })
                });
            });
        }).catch(function(error) {
          var errorCode = error.code;
          console.log(errorCode);
          var errorMessage = error.message;
          console.log(errorMessage);
          var email = error.email;
          console.log(email);
          var credential = error.credential;
          console.log(credential);
        });

    });
}

function social_google(){
    var config = {
        apiKey: "AIzaSyChqlIprL8ibgAoaP6pl3F4BfWw4QmJWZM",
        authDomain: "kiwear-be9f5.firebaseapp.com",
        databaseURL: "https://kiwear-be9f5.firebaseio.com",
        projectId: "kiwear-be9f5",
        storageBucket: "",
        messagingSenderId: "87488149386"
      };
    //   firebase.initializeApp(config2);
        
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('email');
  
      var authService = firebase.auth();

      $(document).on('click','.google',function(){
        alert('entro click');
        authService.signInWithPopup(provider)
              .then(function(result) {
                var url = '?page=login&op=socialGoogle';
                var email = result.user.email;
                var name = result.user.displayName;
                var id = result.user.uid;
                var data = {
                    email:email,
                    name:name,
                    id:id
                };
    
                friendlyURL(url).then(function(ruta){
                    $.ajax({
                        type:'POST',
                        data: data,
                        url: ruta,
                        success:(function(resultado){
                            // console.log(resultado);
                            var token = resultado;
                            localStorage.setItem('token',token);
                            window.location.href='/FrameworkPHP/home/list';
    
                        })
                    });
                });
              })
              .catch(function(error) {
                  console.log('Se ha encontrado un error:', error);
              })
      })
}
function show_registers(){
    $(document).on('click','.registro',function(){
        $('#login_views1').empty();
        $('<form></form>').attr('class','formulario_register log1').attr('name','formulario_register').attr('id','formulario_register').appendTo('#login_views1');
        $('<h1>Registrate</h1>').appendTo('.log1');
        $('<div></div>').attr('class','contenedor_register log2').appendTo('.log1');
        $('<div></div>').attr('class','input_contenedor log5').appendTo('.log2');
        $('<i></i>').attr('class','fas fa-user icono').appendTo('.log5');
        $('<input></input>').attr('type','text').attr('id','nombre').attr('name','nombre').attr('placeholder','Nombre Completo').attr('class','caja_texto nombre').appendTo('.log5');
        $('<span></span>').attr('id','error_nombre').attr('class','error_nombre validar').appendTo('.log5');
        $('<div></div>').attr('class','input_contenedor log3').appendTo('.log2');
        $('<i></i>').attr('class','fas fa-envelope icono').appendTo('.log3');
        $('<input></input>').attr('type','text').attr('id','email').attr('name','email').attr('placeholder','Correo Electrónico').attr('class','caja_texto').appendTo('.log3');
        $('<br></br>').appendTo('.log3');
        $('<a></a>').attr('id','error_email').attr('class','error_email validar').appendTo('.log3');
        $('<div></div>').attr('class','input_contenedor log4').appendTo('.log2');
        $('<i></i>').attr('class','fas fa-key icono').appendTo('.log4');
        $('<input></input>').attr('type','password').attr('id','contrase').attr('name','contrase').attr('placeholder','Contraseña').attr('class','caja_texto').appendTo('.log4');
        $('<span></span>').attr('id','error_contra').attr('class','error_contra validar').appendTo('.log4');
        $('<input></input>').attr('type','button').attr('value','Registar').attr('class','boton_register').attr('id','btn_register').attr('onclick','validate_register()').appendTo('.log2');
        $('<p>Al registrarte, aceptas nuestas Condiciones de uso y Políticas de privacidad</p>').appendTo('.log2');
        $('<p>¿Ya tienes una cuenta? </p>').attr('class','redi').appendTo('.log2');
        $('<a>Iniciar Sesion</a>').attr('class','link_regist logeo').appendTo('.redi');

    });
}
function register(){
    $(document).on('click','#btn_register',function(e){
        e.preventDefault();
        if (validate_register() !=0){
            var data = $('#formulario_register').serialize(); 
            var url = '?page=login&op=register';
            // alert(array);
            friendlyURL(url).then(function(ruta){
            $.ajax({
                type:'POST',
                data: data,
                url: ruta,
                success:(function(respuesta){
                    var email = respuesta.replace(/['"]+/g, '')
                    var data2 = {email:email};
                    var url2 = '?page=login&op=verify';
                    if(respuesta==1){
                        // console.log(window.location.href); Como saber en que url estamos en js
                        $('<br></br>').appendTo('.log5');
                        $('<span></span>').attr('class','log12').appendTo('.log5');
                        $('<a>* Ya existe este usuario</a>').attr('id','error_usuario').attr('class','error_usuario validar').appendTo('.log12');
                       
                        
                    }else{
                        friendlyURL(url2).then(function(ruta){
                            $.ajax({
                                type:'POST',
                                data: data2,
                                url: ruta,
                                success:(function(data2){
                                    // alert(data2);
                                    window.location.href="/FrameworkPHP/login/list";
                                    
                
                                })
                            });
                        });
                    }
                })
            });
        });
        }
    });
}
function login(){
    $(document).on('click','#btn_login',function(e){
        e.preventDefault();
        if (validate_login() !=0){
            var datos = $('#formulario_login').serialize();
            var url = '?page=login&op=login';
            friendlyURL(url).then(function(ruta){ 
            $.ajax({
                type:'POST',
                data: datos,
                url:ruta,
                
                success:(function(respuesta){
                    if (respuesta==1){
                        $('<span></span>').attr('class','log15').appendTo('.log3');
                        $('<a>* No existe este usuario</a>').attr('id','error_usuario').attr('class','error_usuario validar').appendTo('.log15');
                    }else if (respuesta=='"Los datos no coinciden"'){
                        // window.location.href='/FrameworkPHP/home/list';
                    }else{
                        var token= respuesta;
                    // alert(token);
                    localStorage.setItem('token',token);
                    window.location.href='/FrameworkPHP/home/list';
                    
                    }
                })
            });
        });
        }
        
    });
}
function recoverPass(){
    $(document).on('click','#btn_recover',function(e){
        var datos = $('#formulario_recover').serialize();
        var url = '?page=login&op=recover_password';
        friendlyURL(url).then(function(ruta){ 
        $.ajax({
            type:'POST',
            data: datos,
            url:ruta,
            success:(function(respuesta){
                window.location.href='/FrameworkPHP/login/list';
            })
        });
    });
    });
}
function load_content(){
    $('<div></div>').attr('id','login_views1').appendTo('#login_views');
    login_view();
}

$(document).ready(function(){
load_content();
login();
register();
recoverPass();
social_git();
social_google();
});