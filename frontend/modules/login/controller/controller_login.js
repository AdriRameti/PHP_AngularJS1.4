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
                    console.log(localStorage.token);
                    location.href="http://localhost/PHP_AngularJS/#/home"
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
    $scope.validaRecover = function(){
        var confEmail =0;
        var confContra = 0;
        var confNewContra = 0;
        var valida_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
        if(document.formulario_recover.email.value.length==0){
            document.getElementById('error_email').innerHTML="*Introduzca su correo electrónico";
            document.formulario_recover.email.focus();
            return 0;
            
        }else if(document.formulario_recover.email.value.length!=0){
            document.getElementById('error_email').innerHTML="";
            confEmail = 1;
        }
        if(!valida_email.test(document.formulario_recover.email.value)){
            document.getElementById('error_email').innerHTML="*El formato del correo electrónico es incorrecto";
            document.formulario_recover.email.focus();
            return 0;
        }
        if(document.formulario_recover.contrase.value.length==0){
            document.getElementById('error_contra').innerHTML="*Introduzca una contraseña segura";
            document.formulario_recover.contrase.focus();
            return 0;
            
        }else if(document.formulario_recover.contrase.value.length!=0){
            document.getElementById('error_contra').innerHTML="";
            confContra = 1;
        }
        if(document.formulario_recover.NewContrase.value.length==0){
            document.getElementById('error_contra2').innerHTML="*Introduzca una contraseña segura";
            document.formulario_recover.contrase.focus();
            return 0;
            
        }else if(document.formulario_recover.NewContrase.value.length!=0){
            document.getElementById('error_contra2').innerHTML="";
            confNewContra = 1;
        }
        if (document.formulario_recover.NewContrase.value != document.formulario_recover.contrase.value){
            document.getElementById('error_contra2').innerHTML="*Las contraseñas no coinciden";
            document.formulario_recover.contrase.focus();
            return 0;
        }

        if(confEmail==1 && confContra==1 && confNewContra==1){
            console.log(123321);
            $scope.recov = function(){
                var email = $scope.email;
                var NewContrase = $scope.NewContrase;

                update = services.post('login','recover_password',{email:email,NewContrase:NewContrase}).then(function(data){
                    console.log(data);
                    location.href="http://localhost/PHP_AngularJS/#/login"
                });
            }
        }
    }
    $scope.validaRecover1 = function(){
        var valida_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
        var confEmail =0;
        if(document.formulario_recover1.email.value.length==0){
            document.getElementById('error_email').innerHTML="*Introduzca su correo electrónico";
            document.formulario_recover1.email.focus();
            return 0;
            
        }else if(document.formulario_recover1.email.value.length!=0){
            document.getElementById('error_email').innerHTML="";
            confEmail = 1;
        }
        if(!valida_email.test(document.formulario_recover1.email.value)){
            document.getElementById('error_email').innerHTML="*El formato del correo electrónico es incorrecto";
            document.formulario_recover1.email.focus();
            return 0;
        }

        if(confEmail == 1){
            $scope.recoverPass = function(){
                var email = $scope.email;
                console.log(email);
                sendEmail = services.post('login','recover',{email:email}).then(function(dat){
                    console.log(dat);
                });
            }

        }
    }
    $scope.SlGoogle = function(){
        var config = {
            apiKey: "AIzaSyChqlIprL8ibgAoaP6pl3F4BfWw4QmJWZM",
            authDomain: "kiwear-be9f5.firebaseapp.com",
            databaseURL: "https://kiwear-be9f5.firebaseio.com",
            projectId: "kiwear-be9f5",
            storageBucket: "",
            messagingSenderId: "87488149386"
          };
          firebase.initializeApp(config);
            
          var provider = new firebase.auth.GoogleAuthProvider();
          provider.addScope('email');
      
          var authService = firebase.auth();
          authService.signInWithPopup(provider)
          .then(function(result) {
            var email = result.user.email;
            var name = result.user.displayName;
            var id = result.user.uid;

            insertar = services.post('login','socialGoogle',{email:email,name:name,id:id}).then(function(data){
                console.log(data);
                var token = data;
                localStorage.setItem('token',token);
            });
          })
          .catch(function(error) {
              console.log('Se ha encontrado un error:', error);
          })
    }
    $scope.SlGithub = function(){
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
          authService.signInWithPopup(provider)
        .then(function(result) {
            // var url = '?page=login&op=socialGit';
            var email = result.user.email;
            var name = result.user.displayName;
            var id = result.user.uid;
            // var data = {
            //     email:email,
            //     name:name,
            //     id:id
            // };
            console.log(email,name,id);
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
    }

});