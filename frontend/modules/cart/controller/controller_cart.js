kiwear.controller('controller_cart', function($scope,services) {
    var user = localStorage.getItem('nom');
    var total = 0;
    $scope.precioTot=0;
    if(localStorage.getItem('token')){
        mostrar = services.post('cart','showCart',{user:user}).then(function(data){
            var longitud = data.length;
            localStorage.setItem('long',longitud);
            $scope.mostrar = data;

            for(row in data){
                var precio = parseInt(data[row].precio);
                var cantidad = Number.parseInt(data[row].cantidad);
                var subtot = precio * cantidad;
                total = total + subtot; 
                $scope.precioTot = total;
            }
        });
    }

    $scope.less = function(index,data){
        var codProd = data.codigo;
        $scope.mostrar[index].cantidad = parseInt($scope.mostrar[index].cantidad) - 1;

        var cantidad = $scope.mostrar[index].cantidad;
        var precio = parseInt(data.precio);
        var antSub = $scope.mostrar[index].subtotal;
        var subtotal = cantidad * precio;
        $scope.mostrar[index].subtotal = subtotal;
        total = total + subtotal - antSub; 
        $scope.precioTot = total;

        less = services.post('cart','less_cantity',{codProd:codProd,cantidad:cantidad}).then(function(data){
            // console.log(data);
            if(data==0){
                $scope.mostrar[index].cantidad = 0;
                delet = services.post('cart','delete_item',{codProd:codProd}).then(function(data){
                    console.log(data);
                });
                location.reload();
            }
        });
    }
    $scope.more = function(index,data){
        var cantidad= 0 ;
        var codProd = data.codigo;
        $scope.mostrar[index].cantidad = parseInt($scope.mostrar[index].cantidad) + 1; 
        // console.log(localStorage.getItem('long'));
        if (localStorage.getItem('long')==1){
             cantidad = $scope.mostrar[index].cantidad;
            var precio = parseInt(data.precio);
            var antSub = $scope.mostrar[index].subtotal;
            var subtotal = cantidad * precio;
            $scope.mostrar[index].subtotal = subtotal;
            total = total + subtotal - antSub;
            $scope.precioTot = total;
            
        more = services.post('cart','update_cantity',{codProd:codProd,cantidad:cantidad}).then(function(data){
            console.log(data);
        });
        }else{
            cantidad = $scope.mostrar[index].cantidad;
            var preu = parseInt(data.precio);
            var antSubtot = $scope.mostrar[index].subtotal;
            var subtotal = cantidad * preu;
            $scope.mostrar[index].subtotal = subtotal;
            total = total + subtotal - antSubtot; 
            $scope.precioTot = total;
            
        more = services.post('cart','update_cantity',{codProd:codProd,cantidad:cantidad}).then(function(data){
            console.log(data);
        });
        }


    }
    $scope.delete_cart = function(){
        var user = localStorage.getItem('nom');
        if(localStorage.getItem('token')){
            deleteCart= services.post('cart','deleteCart',{user:user}).then(function(data){
                console.log(data);
                location.href="#/home";
            });
        }else{
            location.href="#/login";
        }
    }
});