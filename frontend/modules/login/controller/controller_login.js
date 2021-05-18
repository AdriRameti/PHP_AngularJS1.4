kiwear.controller('controller_login', function($scope,services) {
    $scope.validateLogin = function(){
        var valida_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
        var confEm = 0;
        var confCont = 0;
        if(document.formulario_login.email.value.length==0){
            document.getElementById('error_email').innerHTML="*Correo electrónico incorrecto";
            document.formulario_login.email.focus();
            return 0;
            
        }else if(document.formulario_login.email.value.length!=0){
            document.getElementById('error_email').innerHTML="";
            confEm =1;
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
            confCont =1;
        }

        if (confEm == 1 && confCont==1){
            $scope.Send = function(){
                var email = $scope.email;
                var contrase = $scope.contrase;
                datos =  services.post('login','login',{email:email,contrase:contrase}).then(function(data) {
                    localStorage.token = data;
                    console.log(data);
                });
            }
            
        }
    }
    $scope.validateRegister = function(){
        var valida_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
        var confName = 0;
        var confEmail = 0;
        var confContra = 0;
        if(document.formulario_register.nombre.value.length==0){
            document.getElementById('error_nombre').innerHTML="*Introduzca su nombre";
            document.formulario_register.nombre.focus();
            return 0;
            
        }else if(document.formulario_register.nombre.value.length!=0){
            document.getElementById('error_nombre').innerHTML="";
            confName = 1;
        }
        if(document.formulario_register.email.value.length==0){
            document.getElementById('error_email').innerHTML="*Introduzca su correo electrónico";
            document.formulario_register.email.focus();
            return 0;
            
        }else if(document.formulario_register.email.value.length!=0){
            document.getElementById('error_email').innerHTML="";
            confEmail = 1;
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
            confContra = 1;
        }
        if(confName==1 && confEmail==1 && confContra==1){
            $scope.SendRegister = function(){
                var name = $scope.nombre;
                var email = $scope.email;
                var contra = $scope.contrase;
                datos =  services.post('login','register',{nombre:name,email:email,contrase:contra}).then(function(data) {
                    var correo = data.replace(/['"]+/g, '');
                    // console.log(email);
                    if (data==1){
                        document.getElementById('error_usuario').innerHTML="*Ya existe este usuario";
                        document.formulario_register.email.focus();
                    }else{
                        respuesta =  services.post('login','verify',{correo:correo}).then(function(res) {
                            console.log(res);
                        });
                    }
                });
            }

        }
    }
});