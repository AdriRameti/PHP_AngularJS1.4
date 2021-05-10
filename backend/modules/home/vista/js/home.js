function cargar_cat_slider(){
  var url = "?page=home&op=Slider";
  
  friendlyURL(url).then(function(ruta){

    $.ajax({
      type:"GET",
      dataType: "JSON",
      url:ruta,
      error:function(){
        console.log("Error Slider");
    },
      success:(function(data){
        console.log(data[0].img);
              $('<div></div>').attr('id','Div2').appendTo('.cat_slider');
              $("#Div2").html(
                    '<div id="carrusel">'+
                      '<a href="#" class="left-arrow"><img src="http://localhost/FrameworkPHP/view/img/left-arrow.png" /></a>'+
                      '<a href="#" class="right-arrow"><img src="http://localhost/FrameworkPHP/view/img/right-arrow.png" /></a>'+
                      '<div class="carrusel">'+
                          '<div class="product" id="product_0">'+
                              '<img src="http://localhost/FrameworkPHP/'+data[0].img+'" width="190" height="300" />'+
                          '</div>'+
                          '<div class="product" id="product_1">'+
                              '<img src="http://localhost/FrameworkPHP/'+data[1].img+'" width="190" height="300" />'+
                          '</div>'+
                          '<div class="product" id="product_2">'+
                              '<img src="http://localhost/FrameworkPHP/'+data[2].img+'" width="190" height="300" />'+
                          '</div>'+
                          '<div class="product" id="product_3">'+
                              '<img src="http://localhost/FrameworkPHP/'+data[3].img+'" width="190" height="300" />'+
                          '</div>'+
                        //   '<div class="product" id="product_4">'+
                        //       '<img src="'+data[4]+'" width="190" height="300" />'+
                        //   '</div>'+
                        //   '<div class="product" id="product_5">'+
                        //     '<img src="'+data[5]+'" width="190" height="300" />'+
                        // '</div>'+
                        //   '<div class="product" id="product_6">'+
                        //     '<img src="'+data[6]+'" width="190" height="300" />'+
                        // '</div>'+
                        //   '<div class="product" id="product_7">'+
                        //     '<img src="'+data[7]+'" width="190" height="300" />'+
                        //   '</div>'+
                        //   '<div class="product" id="product_8">'+
                        //     '<img src="'+data[8]+'" width="190" height="300" />'+
                        // '</div>'+
                        //   '<div class="product" id="product_9">'+
                        //     '<img src="'+data[9]+'" width="190" height="300" />'+
                        //   '</div>'+
                      '</div>'+
                    '</div>'
              )
        })
      });
  });
  
}

function cargar_cat(correcto2,valor2){
  if (correcto2==1){
    // var url="/Ejercicios_PHP/modulo/home/controlador/controller_home.php?pr=BuscHome&valor2="+valor2;
    var url ="?page=home&op=searchHome";
    var data = {valor:valor2};
  }else if(correcto2!=1){
    var url="?page=home&op=categories";
  }


  friendlyURL(url).then(function(ruta){

    $.ajax({
      type:"POST",
      dataType: "JSON",
      url:ruta,
      data:data,
      error:function(error){
        console.log("hay un error al acceder a las categorias");
    },
      success:(function(data){
        $('#Div1').empty();
         x=0;
        for(row in data){
        $('<div></div>').attr('class','col-lg-4 col-md-6 filter-clothes home1'+x).appendTo('#Div1');
        $('<div></div>').attr('class','portfolio-item home2'+x).attr('id','scroll').appendTo('.home1'+x);
        $('<img></img>').attr('src','http://localhost/FrameworkPHP/'+data[row].img+'').appendTo('.home2'+x);
        $('<div></div>').attr('class','portfolio-info home3'+x).appendTo('.home2'+x);
        $('<h3></h3>').attr('class','home4'+x).appendTo('.home3'+x);
        $('<a>'+data[row].nombre+'</a>').attr('href','').attr('class','venobox redicat').attr('id',''+data[row].nombre+'').attr('title',''+data[row].nombre+'').attr('data-gall','portfolioGallery').appendTo('.home4'+x);
        
        var scrol = document.querySelectorAll('#scroll');
        var altura= $('div.col-lg-4.col-md-6.filter-clothes.home1'+x).offset();
        var alturas=altura.top;
        scrollHome(scrol,alturas);
        x++;
      }
  
        })
      });
  });
  

}
function scrollHome(scrol,alturas){
  $(document).on('scroll', function() {
    // $(scrol[3]).css('opacity',0);
    $(scrol[4]).css('opacity',0);
    $(scrol[5]).css('opacity',0);
    $(scrol[6]).css('opacity',0);
    $(scrol[7]).css('opacity',0);
    $(scrol[8]).css('opacity',0);
    
    var posicion = $(window).scrollTop();
    var altura=alturas;
    if((altura - 700)<posicion){
      // $(scrol[3]).css('opacity',1);
      $(scrol[4]).css('opacity',1);
      $(scrol[5]).css('opacity',1);
      $(scrol[6]).css('opacity',1);
      $(scrol[7]).css('opacity',1);
      $(scrol[8]).css('opacity',1);
      
    }
});
}
function buscar2(){
  $(document).on('keyup','#busqueda2',function(){
      var valor2=$(this).val();
      // console.log(valor2);
      if(valor2!=""){
          // console.log(valor2);
          var correcto2=1;
          // buscar(correcto,valor);
          cargar_cat(correcto2,valor2);
      }else{
        correcto2=0;
        cargar_cat(correcto2);
          console.log("No escribi");
      }
  });
}
  function rediShop(){
  $(document).on('click','.redicat',function(){
  var name=this.getAttribute('id');
  localStorage.setItem('nombre',name);
  window.location.href="/FrameworkPHP/shop/list";
  return false;
  });
  }
  function rediLogin(){
    $(document).on('click','.icono_login',function(){
    window.location.href="/FrameworkPHP/login/list";
    return false;
    });
    }
  function rediCart(){
      $(document).on('click','.cesta',function(){
          window.location.href='/FrameworkPHP/cart/list';
          return false;
      });
  }
  function cargar_divs(){
  $('<div></div>').attr('id','Div1').attr('class','row portfolio-container').attr('data-aos','fade-up').attr('data-aos-easing','ease-in-out').attr('data-aos-duration','500').appendTo('#categories');
  cargar_cat_slider();
    cargar_cat();
  }
  window.addEventListener('load', function(){
    cargar_divs();
    rediShop();
    rediLogin();
    buscar2();
    rediCart();
});