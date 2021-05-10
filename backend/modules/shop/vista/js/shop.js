
var filtrado;
function efectos_shop(){
    const grid = new Muuri('.grid',{
        layout: {
            rounding: false
        } 
    });
    window.addEventListener('load',() => {
        document.getElementById('grid').classList.add('imagenes-cargadas');
    });
}
function cat_shop(correcto,consulta){
    // var offset=localStorage.getItem('offset');
    var offset = 0;
    var confirmar=localStorage.getItem('confirm');
    var nom=localStorage.getItem('nombre');
    // alert(nom);
    var filtrado1 =sessionStorage.getItem('filtrado');
    var marcas=sessionStorage.getItem('marcas');
    var tallas=sessionStorage.getItem('tallas');
    if(correcto==1 && (confirmar==1)){
        var url ="?page=shop&op=search";
        var data = {
            consulta:consulta,
            nom:nom,
            offset:offset
        }
    }else if(correcto!=1){
    if ((filtrado1!=1) && (confirmar==1)){
        var url = "?page=shop&op=show";
        var data = {
                nom:nom,
                offset:offset
        }
    }else if ((filtrado1==1) && (confirmar==1)){
        var url="?page=shop&op=filters";
        var data = {
            nom:nom,
            marcas:marcas,
            tallas:tallas,offset:offset
        }
    }
    }

    friendlyURL(url).then(function(ruta){
        console.log(ruta);
        $.ajax({
            url:ruta,
            type:'POST',
            dataType:'JSON',
            data:data
            
        // error:function(){
        //     console.log('Error shop');
        // },
        ,success:(function(data){
            console.log(data);
            $('#Div3').empty();
             
                x=0;
            for (row in data){
                var codigo= data[row].codigo;
                //CONTENIDO
                $('<span></span>').attr('class','items sup'+x).appendTo('#Div3');
                $('<span></span>').attr('class','item-contenido suport'+x).appendTo('.sup'+x);
                $('<a></a>').attr('class','link'+x).appendTo('.suport'+x);
                $('<img></img>').attr('id',''+data[row].codigo+'').attr('class','details defin'+x).attr('src','http://localhost/FrameworkPHP/'+data[row].img+'').attr('alt','').appendTo('.link'+x);
                $('<div>'+data[row].nombre+'</div>').attr('value',''+data[row].nombre+'').attr('class','preu'+x).appendTo('.sup'+x);
                $('<i></i>').attr('class','clico fas fa-heart '+codigo+' repet'+x+' cora').attr('id',''+codigo+'').appendTo('.preu'+x)
                $('<div>'+data[row].precio+'€</div>').attr('class','precio'+x).appendTo('.sup'+x);
                $('<i></i>').attr('class','cart fas fa-cart-plus carrito repet1'+x+'').attr('id',''+codigo+'').appendTo('.precio'+x);
                $('<p></p>').appendTo('#Div3');
                    x++;
            }
           
            pagination(filtrado1);
        })
        });
    });
   
    sessionStorage.clear();
   
}
function show_like(){
    var usuario = localStorage.getItem('nomUser');
    var url = '?page=shop&op=showLikes';
    if(usuario != null){
        friendlyURL(url).then(function(ruta){
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url:ruta,
            data:{usuario:usuario},
            success:(function(data){
                console.log(data.length);
                if (data.length == 1){
                    if (data[0].favorito==1){
                        $('.'+data[0].codArticulo+'').removeClass('cora').addClass('cora-sty');
                    } 
                }else{
                    for (row in data){
                        if (data[row].favorito==1){
                            $('.'+data[row].codArticulo+'').removeClass('cora').addClass('cora-sty');
                        } 
                    }
                }

                
            })
        });
    });
    }

    
}
function click_heart(){
    
    $(document).on('click','.clico',function(){
        if (localStorage.getItem('token')===null){
            window.location.href="/Framework/login/list"
        }else{
            var idHeart = this.getAttribute('id'); 
            var clases =this.getAttribute('class');
            favoritos(idHeart,clases);
        }
    });
}
function favoritos(codArticulo,pintar){
    var nomUsuario = localStorage.getItem('nomUser');
    if(localStorage.getItem('token')!=null){
        var url = '?page=shop&op=favorites';
        friendlyURL(url).then(function(ruta){
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url:ruta,
            data: {
                codArticulo:codArticulo,
                nomUsuario:nomUsuario
            }
            ,success:(function(data){
                var print = pintar.split(" ");
                var result= print[4];
                if (data==1){
                    $('.'+result+'').removeClass('cora').addClass('cora-sty');
                }else if(data==2){
                    $('.'+result+'').removeClass('cora-sty').addClass('cora');

                }
            })
        });
    });
    }
    
}

function pagination(correcto,consulta,filtrado1){
    var nom=localStorage.getItem('nombre');
    var marcas=sessionStorage.getItem('marcas');
    var tallas=sessionStorage.getItem('tallas');
    if(correcto==1){
        var url="/Ejercicios_PHP/modulo/shop/controlador/controller_shop.php?op=countProdsSearch&nom="+nom+"&consulta="+consulta;
        // var url ="?page="
        $('#pagiShop').empty();
    }else if(correcto!=1){
    if (filtrado1!=1){
        var url ="?page=shop&op=countProds"
        var data = {nom:nom};
        $('#pagiShop').empty();

    }else if (filtrado1==1){
        var url="/Ejercicios_PHP/modulo/shop/controlador/controller_shop.php?op=countProdsFilters&nom="+nom+"&marcas="+marcas+"&tallas="+tallas;
         
        $('#pagiShop').empty();
    }
    }
    friendlyURL(url).then(function(ruta){
        // console.log(nom);
    $.ajax({
        type:'POST',
        dataType:'JSON',
        url:url,
        data: data,
        error:function(){
            console.log('Error pagination');
        },
        success:(function(data){
            console.log(data);
            localStorage.setItem('offset',0);
            var productos='';
            var pages='';
            var paginas='';
            var siPages='';
            for (row in data){
                productos=data[0].prod;       
            }
            pages= productos/3;
            if (pages<0.5){
                pages=1;
            }
            paginas =Math.round(pages);
            if(paginas==1){
                paginas=1;
            }
            paginas =Math.round(pages);

            if (paginas>0){
                siPages=1;
                localStorage.setItem('confirm',siPages);
            }
            // $('#pagiShop').bootpag({
            //     total:paginas,
            //     maxVisible: paginas,
            // }).on('page', function(event,num){
            //     var offset= 3 *(num-1);
            //     console.log(offset);
            //     localStorage.setItem('offset',offset);
            //     cat_shop();
            // });
            
        })
    });
});
}
function validaFilters(){
    sessionStorage.setItem('filtrado',0);
    var marca="";
    var talla="";
        if (document.filtrosShop.marca1.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca1.value;
        }else if (document.filtrosShop.marca2.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca2.value;

        }else if (document.filtrosShop.marca3.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca3.value;

        }else if (document.filtrosShop.marca4.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca4.value;

        }else if (document.filtrosShop.marca5.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca5.value;

        }else if (document.filtrosShop.marca6.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca6.value;

        }else if (document.filtrosShop.marca7.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca7.value;

        }else if (document.filtrosShop.marca8.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca8.value;

        }else if (document.filtrosShop.marca9.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca9.value;
        }else {
             marca="";
        }
        if (document.filtrosShop.talla1.checked){
            var filtrado=1;
             talla=document.filtrosShop.talla1.value;
        }else if (document.filtrosShop.talla2.checked){
            var filtrado=1;
             talla=document.filtrosShop.talla2.value;
        }else if (document.filtrosShop.talla3.checked){
            var filtrado=1;
             talla=document.filtrosShop.talla3.value;
        }else if (document.filtrosShop.talla4.checked){
            var filtrado=1;
             talla=document.filtrosShop.talla4.value;
        }else {
             talla="";
        }
        if(marca=="" && talla==""){
            filtrado=0;
        }
        // localStorage.setItem('filtrado1',filtrado);
        $('body').on('click','#aplicar',function(){
            sessionStorage.setItem('filtrado',filtrado);
            sessionStorage.setItem('marcas',marca);
            sessionStorage.setItem('tallas',talla);
            pagination(filtrado);
            window.location.href="/FrameworkPHP/shop/list";
        });
        

}
function remove_filters(){
    $('body').on('click','#remove',function(){
        filtrado=sessionStorage.getItem('filtrado');
        filtrado=0;
        sessionStorage.setItem('filtrado',filtrado);
        window.location.href="/FrameworkPHP/shop/list";
    });
}
function details(){
$('body').on("click",".details",function(){
var codigo = this.getAttribute('id');
var url="page=shop&op=details"
friendlyURL(url).then(function(ruta){
    $.ajax({
        type: "POST",
        dataType: "JSON",
        url: ruta,
        data: {codigo:codigo},
        error:function(){
            console.log("error details");
        },
        success:(function(data){
            $.ajax({
                type: "GET",
                dataType: "JSON",
                url: "/Ejercicios_PHP/modulo/shop/controlador/controller_shop.php?op=views&codigo="+codigo,
                error:function(){
                    console.log("error visitas");
                },
                success:(function(){
                    console.log("views updated");
                })
            });
            $('#Div3').empty();
            $('.Head').empty();
            $('#pagiShop').empty();
            // for (row in data){
                //Primera fila
                $('<div></div>').attr('class','fila cabecera1').appendTo('#Div3');
                    //Primera Columna Fila1
                    $('<div></div>').attr('class','columna precontenido1').appendTo('.cabecera1');
                    $('<img></img>').attr('src','http://localhost/FrameworkPHP/'+data[0].img1+'').appendTo('.precontenido1');
                    //END Primera Columna Fila1

                     //Segunda Columna Fila1
                    $('<div></div>').attr('class','columna precontenido2').appendTo('.cabecera1');
                    $('<img></img>').attr('src','http://localhost/FrameworkPHP/'+data[0].img2+'').appendTo('.precontenido2');
                    //END Segunda Columna Fila1
                    
                    //Tercera Columna Fila1
                    $('<div></div>').attr('class','columna2 precontenido3').appendTo('.cabecera1');

                    //Contenido Tercera Columna
                    $('<div></div>').attr('class','intro1').appendTo('.precontenido3');

                        //Informacion Intro1
                        $('<div></div>').attr('class','contenido1').appendTo('.intro1');
                            //Contenido
                            $('<a>Volver</a>').attr('href','/FrameworkPHP/shop/list').appendTo('.contenido1');
                            $('<h1>'+data[0].marca+'</h1>').appendTo('.contenido1');
                            $('<div></div>').attr('class','info contenidoE1').appendTo('.contenido1');
                                //ContenidoE
                                // $('<p>Nombre</p>').appendTo('.contenidoE1');
                                $('<p>'+data[0].descripcion+'</p>').appendTo('.contenidoE1');
                                $('<p>'+data[0].precio+'</p>').appendTo('.contenidoE1');
                                
                                //END Contenido E
                            //END Contenido
                        //END Informacion Intro1

                    $('<div></div>').attr('class','intro2').appendTo('.precontenido3');
                        //Información Intro2
                        $('<p></p>').attr('class','parraf1').appendTo('.intro2');
                            $('<a>Más información</a>').attr('href','#informacion').attr('class','vinculos').appendTo('.parraf1');

                        $('<p></p>').attr('class','parraf2').appendTo('.intro2');
                            $('<a>Envio</a>').attr('href','#infoEnv').attr('class','vinculos').appendTo('.parraf2');
                        //END Información Intro2

                    $('<div></div>').attr('class','intro3').appendTo('.precontenido3');
                        //Información Intro3
                        $('<span>'+data[0].talla1+'</span>').attr('class','Button_green2').attr('value','S').appendTo('.intro3');
                        $('<span>'+data[0].talla2+'</span>').attr('class','Button_green2').attr('value','M').appendTo('.intro3');
                        $('<span>'+data[0].talla3+'</span>').attr('class','Button_green2').attr('value','L').appendTo('.intro3');
                        $('<span>'+data[0].talla4+'</span>').attr('class','Button_green2').attr('value','XL').appendTo('.intro3');
                        //END Información Intro3

                    $('<div></div>').attr('class','intro4').appendTo('.precontenido3');
                        //Información Intro4
                        $('<div></div>').attr('class','botonesShop').appendTo('.intro4');
                            $('<a>Añadir al carrito</a>').attr('class','botones').appendTo('.botonesShop');

                        $('<br></br>').appendTo('.intro4');
                        $('<div></div>').attr('class','botonesShop1').appendTo('.intro4');
                            $('<a>Favoritos</a>').attr('class','botones2').appendTo('.botonesShop1');
                        //ENDInformación Intro4
                    //ENDContenido Tercera Columna
                    //END Tercera Columna Fila1
                //END Primera fila

                //Segunda fila
                $('<div></div>').attr('class','fila cabecera2').appendTo('#Div3');
                    //Primera Columna Fila2
                    $('<div></div>').attr('class','columna precontenido9').appendTo('.cabecera2');
                        $('<img></img>').attr('src','http://localhost/FrameworkPHP/'+data[0].img3+'').appendTo('.precontenido9');
                    //END Primera Columna Fila2

                     //Segunda Columna Fila2
                    $('<div></div>').attr('class','columna precontenido4').appendTo('.cabecera2');
                        $('<img></img>').attr('src','http://localhost/FrameworkPHP/'+data[0].img4+'').appendTo('.precontenido4'); 
                    //END Segunda Columna Fila2

                    $('<br></br>').appendTo('.cabecera2');
                //END Segunda fila

                //Tercera fila
                $('<div></div>').attr('class','filaUlt cabecera3').appendTo('#Div3');

                    //Seccion Descripcion
                    $('<div></div>').attr('class','precontenido5').appendTo('.cabecera3');

                        //Información Seccion Descripcion
                        $('<details></details>').attr('open','').attr('class','detalles detallesShop').appendTo('.precontenido5');

                            //Información Details
                            $('<summary>Descripción</summary>').appendTo('.detallesShop');
                            $('<div></div>').attr('class','divDet').appendTo('.detallesShop');
                                $('<p></p>').attr('class','linques').appendTo('.divDet');
                                    $('<a>'+data[0].descriptotal+'</a>').attr('name','informacion').appendTo('.linques');
                            
                            //END Información Details

                        $('<br></br>').appendTo('.precontenido5');
                        //ENDInformación Seccion Descripcion
                    //END Seccion Descripcion

                    //Seccion Envio
                    $('<div></div>').attr('class','precontenido6').appendTo('.cabecera3');
                    $('<details></details>').attr('open','').attr('class','detalles detallesShop1').appendTo('.precontenido6');

                        //Información Seccion Descripcion
                        $('<summary>Envíos y devoluciones</summary>').appendTo('.detallesShop1');
                        $('<div></div>').attr('class','paises').appendTo('.detallesShop1');

                            //Información paises envio
                            $('<p></p>').attr('class','paises2').appendTo('.paises');
                                $('<select></select>').attr('class','envio paises3').appendTo('.paises2'); 
                                    $('<option>España</option>').appendTo('.paises3');
                                    $('<option>Italia</option>').appendTo('.paises3');
                                    $('<option>Reino Unido</option>').appendTo('.paises3');
                                    $('<option>Alemania</option>').appendTo('.paises3');
                                    $('<option>Estados Unidos</option>').appendTo('.paises3');
                                    $('<option>China</option>').appendTo('.paises3');
                                    $('<option>Paises Bajos</option>').appendTo('.paises3');
                                    $('<option>Rusia</option>').appendTo('.paises3');
                                    $('<option>Japón</option>').appendTo('.paises3');
                                    $('<option>Brasil</option>').appendTo('.paises3');
                                    $('<option>Argentina</option>').appendTo('.paises3');
                                    $('<option>Canada</option>').appendTo('.paises3');
                                    $('<option>Bélgica</option>').appendTo('.paises3');
                                    $('<option>Bahamas</option>').appendTo('.paises3');
                                    $('<option>México</option>').appendTo('.paises3');
                                    $('<option>Francia</option>').appendTo('.paises3');
                            //END Información paises envio
                        $('<div></div>').attr('class','infoEnv infoEnvio').appendTo('.detallesShop1');
                            $('<a>Envios gratis con GLS, con la fecha de entrega estimada en el artículo</a>').attr('name','infoEnv').attr('class','informacionE').appendTo('.infoEnvio');
                            $('<ul></ul>').attr('class','listado').appendTo('.infoEnvio');
                                $('<li></li>').attr('class','linea').appendTo('.listado');
                                    $('<a>Gratis para pedidos de 50€ o más</a>').appendTo('.linea');
                                $('<li></li>').attr('class','linea1').appendTo('.listado');
                                    $('<a>3€ para pedidos inferiores a 50€</a>').appendTo('.linea1');
                                $('<li></li>').attr('class','linea2').appendTo('.listado');
                                    $('<a>5€ para pedidos con envío Express</a>').appendTo('.linea2');
                            $('<a>Tienes 14 días para hacer devoluciones desde que recibes el producto. Ampliación del plazo de devolución durante el periodo de fiestas: Todos los pedidos realizados entre el 9 de diciembre de 2020 y el 5 de enero de 2021 podrán devolverse hasta el 19 de enero de 2021.</a>').attr('class','textJust').appendTo('.infoEnvio');
                        //ENDInformación Seccion Descripcion
                    //END Seccion Envio
                    //SECCION RELACIONADOS
                    $('<div></div>').attr('class','precontenido7').appendTo('.cabecera3');
                        $('<details></details>').attr('open','').attr('class','detallesApi detallesApi1').appendTo('.precontenido7');
                        $('<summary>Productos de tu interes</summary>').appendTo('.detallesApi1');
                        $('<div></div>').attr('class','infoApi').appendTo('.detallesApi1');
                //END Tercera fila
            // }
            $.ajax({
                url: "https://www.googleapis.com/books/v1/volumes?q="+data[0].nombre,
                type:'GET',
                dataType: 'JSON',
                success: function(data) {
                      x=0;
                    for (i=0; i <3;i++){
                        $('<div></div>').attr('class','col-lg-4 col-md-6 filter-clothes home1'+x).appendTo('.infoApi');
                        $('<div></div>').attr('class','portfolio-item home2'+x).attr('id','scroll').appendTo('.home1'+x);
                        $('<img></img>').attr('src',''+data.items[i].volumeInfo.imageLinks.smallThumbnail+'').appendTo('.home2'+x);
                        $('<div></div>').attr('class','portfolio-info home3'+x).appendTo('.home2'+x);
                        $('<h3></h3>').attr('class','home4'+x).appendTo('.home3'+x);
                        $('<a>'+data.items[i].volumeInfo.title+'</a>').attr('href','').attr('class','venobox redicat').attr('data-gall','portfolioGallery').appendTo('.home4'+x);
                        $('<a>'+data.items[i].saleInfo.retailPrice.amount+'€</a>').attr('class','home4'+x).appendTo('.home3'+x);
                        x++;
                    }
                  
                }
              });
        })
    });
});
});
}
function buscar(){
    $(document).on('keyup','#busqueda',function(){
        var valor=$(this).val();
        if(valor!=""){
            var correcto=1;
            // buscar(correcto,valor);
            cat_shop(correcto,valor);
            pagination(correcto,valor);
        }else{
            correcto=0;
            cat_shop(correcto);
        }
    });
}
function rediLogin(){
    $(document).on('click','.icono_login',function(){
    window.location.href="/FrameworkPHP/login/list";
    return false;
    });
    }
function load_divs(){
    $('<div></div>').attr('id','DivHead').appendTo('#headShop');
    $('<div></div>').attr('id','Div3').appendTo('#listS');
    $('<div></div>').attr('id','pagiShop').appendTo('#listS');
    // var localizacion = 'index.php?page=list_shop';
    // localStorage.setItem('localizacion',localizacion);
    cat_shop();
    details();
    remove_filters();
    
    // api();
}

window.addEventListener('load', function(){
    load_divs();
    // efectos_shop();
    buscar();
    rediLogin();
    click_heart();
    show_like();
    load_contenido();
    click_items_cart();
});
/////////DEBUG ERROR AJAX//////////////
    // $.ajax({
    //     type:"GET",
    //     dataType:"JSON",
    //     url:url,
    // }).fail( function( jqXHR, textStatus, errorThrown ) {
    //     alert( 'Error!!' );
    //     console.log(jqXHR);
    //     console.log(textStatus);
    //     console.log(errorThrown);
    // });