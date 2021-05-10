function show_cart(){
        if(localStorage.getItem('token')){
            var usuario = localStorage.getItem('nomUser');
            var url = '?page=cart&op=showCart';        
            friendlyURL(url).then(function(ruta){
            $.ajax({
                type: 'POST',
                dataType:'JSON',
                url:ruta,
                data:{user:usuario}
                ,success:(function(data){
                    console.log(data);
                    var total=0;
                    $('<div></div>').attr('class','table_tittle').attr('id','titul').appendTo('#contenedor');
                    $('<a>Pedido</a>').appendTo('#titul');
                    
                    $('<div></div>').attr('class','table_header').attr('id','header0').appendTo('#contenedor');
                    $('<a>Imagen</a>').appendTo('#header0');
                    $('<div></div>').attr('class','table_header').attr('id','header1').appendTo('#contenedor');
                    $('<a>Precio</a>').appendTo('#header1');
                    $('<div></div>').attr('class','table_header').attr('id','header2').appendTo('#contenedor');
                    $('<a>Cantidad</a>').appendTo('#header2');
                    $('<div></div>').attr('class','table_header').attr('id','header3').appendTo('#contenedor');
                    $('<a>Subtotal</a>').appendTo('#header3');
                    x=0;
                    for(row in data){
                        var codigoProd = data[row].codigo;
                        // console.log(codigoProd);
                    $('<div></div>').attr('class','table_item').attr('id','item'+x).appendTo('#contenedor');
                    $('<img></img>').attr('src','http://localhost/FrameworkPHP/'+data[row].img+'').attr('class','imag').appendTo('#item'+x);
                    $('<div></div>').attr('class','table_item').attr('id','item1'+x).appendTo('#contenedor');
                    $('<a>'+data[row].precio+'€</a>').appendTo('#item1'+x);
                    $('<div></div>').attr('class','table_item').attr('id','item2'+x).appendTo('#contenedor');
                    $('<i></i>').attr('class','cantity2 fas fa-minus').attr('id',''+codigoProd+'').appendTo('#item2'+x);
                    $('<a>'+data[row].cantidad+'</a>').appendTo('#item2'+x);
                    $('<i></i>').attr('class','cantity fas fa-plus').attr('id',''+codigoProd+'').appendTo('#item2'+x);
                    $('<div></div>').attr('class','table_item').attr('id','item3'+x).appendTo('#contenedor');
                    $('<a>'+data[row].subtotal+'€</a>').appendTo('#item3'+x);
                    x++;
                    var subtotal =Number.parseInt(data[row].subtotal);
                    total = total + subtotal;
                    }

                    $('<div></div>').attr('class','table_tot').attr('id','total').appendTo('#contenedor');
                    $('<a>Total</a>').appendTo('#total');

                    $('<div></div>').attr('class','table_preu').attr('id','preu').appendTo('#contenedor');
                    $('<a>'+total+'€</a>').attr('id','preu2').appendTo('#preu');
                    $('<a>Seguir Comprando</a>').attr('class','btn-cart botones').attr('id','go').appendTo('#button-cart');
                    $('<a>Finalizar compra</a>').attr('class','btn-cart botones').attr('id','ext').appendTo('#button-cart');
                })
            });
        });
        }else if(!localStorage.getItem('token')){
            $('<div></div>').attr('class','table_tittle').attr('id','titul').appendTo('#contenedor');
            $('<a>Pedido</a>').appendTo('#titul');
            
            $('<div></div>').attr('class','table_header').attr('id','header0').appendTo('#contenedor');
            $('<a>Imagen</a>').appendTo('#header0');
            $('<div></div>').attr('class','table_header').attr('id','header1').appendTo('#contenedor');
            $('<a>Precio</a>').appendTo('#header1');
            $('<div></div>').attr('class','table_header').attr('id','header2').appendTo('#contenedor');
            $('<a>Cantidad</a>').appendTo('#header2');
            $('<div></div>').attr('class','table_header').attr('id','header3').appendTo('#contenedor');
            $('<a>Subtotal</a>').appendTo('#header3');

            $('<div></div>').attr('class','table_tot').attr('id','total').appendTo('#contenedor');
            $('<a>Total</a>').appendTo('#total');

            $('<div></div>').attr('class','table_preu').attr('id','preu').appendTo('#contenedor');
            $('<a>0€</a>').attr('id','preu2').appendTo('#preu');
            $('<a>Seguir Comprando</a>').attr('class','btn-cart botones').attr('id','go').appendTo('#button-cart');
            $('<a>Finalizar compra</a>').attr('class','btn-cart botones').attr('id','ext').appendTo('#button-cart');
        }

}
function finishcart(){
    $(document).on('click','#go',function(){
        window.location.href="/FrameworkPHP/shop/list";
    });
    $(document).on('click','#ext',function(){
       if (localStorage.getItem('token')){
           var url = '?page=cart&op=deleteCart';
        friendlyURL(url).then(function(ruta){
           $.ajax({
            type:'GET',
            dataType:'JSON',
            url:ruta,
            success:(function(data){
                // console.log(data);
                window.location.href="/FrameworkPHP/home/list";
            })
           });
        });
       }else{
           window.location.href="/FrameworkPHP/login/list";
       }
    });
}
function rediCart(){
    $(document).on('click','.cesta',function(){
        window.location.href='/FrameworkPHP/cart/list';
        return false;
    });
}
function update_cantity(){
    $(document).on('click','.cantity' ,function(){
        var codProd = this.getAttribute('id');
        var url = '?page=cart&op=update_cantity';
        friendlyURL(url).then(function(ruta){
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url:ruta,
            data: {codProd:codProd},
            success:(function(data){
                console.log(data);
            })
        });
    });
        location.reload();
    });
    $(document).on('click','.cantity2' ,function(){
        var codProd = this.getAttribute('id');
        var url = '?page=cart&op=less_cantity';
        friendlyURL(url).then(function(ruta){
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url:ruta,
            data:{codProd:codProd},
            success:(function(data){
                // alert(data);
                if (data==0){
                    // alert("entro");
                    var url2 = '?page=cart&op=delete_item';
                    friendlyURL(url2).then(function(ruta2){
                    $.ajax({
                        type: 'POST',
                        dataType: 'JSON',
                        url:ruta2,
                        data:{codProd:codProd},
                        success:(function(data){
                            console.log(data);                  
                            location.reload();
                        })
                    });
                });
                }
            })
        });
    });
        location.reload();
    });
}

function click_items_cart(){
    $(document).on('click','.cart',function(){
        if (localStorage.getItem('token')===null){
            window.location.href="/FrameworkPHP/login/list";
        }else{
            var usuario = localStorage.getItem('nomUser');
            var idHeart = this.getAttribute('id'); 
            insert_items(usuario,idHeart);
        }
    });
}
function insert_items(usuario,codArticulo){
    var url = '?page=cart&op=insert_item';
    friendlyURL(url).then(function(ruta){
    $.ajax({
        type:'POST',
        dataType:'JSON',
        url:ruta,
        data:{
            usuario:usuario,
            codArticulo:codArticulo
        },
        success:(function(data){
            console.log(data);
        })
    });
});
}
function load_contenido(){

        
        $('<div></div>').attr('class','container-table').attr('id','contenedor').appendTo('#table_cart');
        $('<div></div>').attr('class','button-cart').attr('id','button-cart').appendTo('#table_cart');
        show_cart();
        update_cantity();
        finishcart();
}
window.addEventListener('load', function(){
    load_contenido();
    click_items_cart();
    // rediCart();
});
