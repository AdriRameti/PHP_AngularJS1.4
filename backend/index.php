<?php
chdir(dirname(__DIR__)); //Todas las rutas van a ser relativas a la raiz del sitio
include "paths.php";
require UTILS_PATH."init.inc.php";


//$init = new redirection;
redirection::getInstance()->initApp();
