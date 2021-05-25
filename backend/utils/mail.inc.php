<?php
class Mail{
    private function __construct(){

    }
    public static function dataMail($info){
        $emailClient = $info[0];
        $emailServer = $info[3];
        $message = $info[2];
        $type = $info[1];
        $tokenVerify = $info[4];
        $html = '';
        $subject = '';
        $body = '';
        $ruta = '';
        $return = '';
        switch ($type){
            case 'alta':
                $subject = 'Tu alta en KIWEAR SHOP';
                $ruta = "<a href='http://localhost/PHP_AngularJS/#/login/verify_user/".$tokenVerify."/".$emailClient."'>Pulsa aquí</a>";
                $body = 'Gracias por unirte a la familia KIWE.<br> Para finalizar el registro pulsa'.$ruta;
            break;
            case 'recover':
                $subject = 'Cambia tu contraseña de KIWEAR SHOP';
                $ruta = "<a href='http://localhost/PHP_AngularJS/#/login/recover'>Pulsa aquí</a>";
                $body = 'Regresa a la pagina para actualizar su contraseña.Para ello '.$ruta;
            break;
        }
        $html .= "<html>";
        $html .= "<body>";
            $html .= "Asunto:";
            $html .= "<br><br>";
	       $html .= "<h4>". $subject ."</h4>";
           $html .= "<br><br>";
           $html .= "Mensaje:";
           $html .= "<br><br>";
           $html .= $message;
           $html .= "<br><br>";
	       $html .= $body;
	       $html .= "<br><br>";
	       $html .= "<p>Sent by KIWEAR SHOP</p>";
		$html .= "</body>";
		$html .= "</html>";

        try{
            if ($type=='admin'){
                $emailClient = 'KiwearSupport@info.com';
            }else{
                $result = Mail::send_mail($emailServer,$emailClient,$subject,$html);
            }
        }catch(Exception $e){
            $return = 0;
        }
        return $result;
    }
    public static function send_mail($mailServ,$mailClien,$subject,$html){
        $info_file = parse_ini_file(UTILS_PATH.'info.ini');
        $config = array();
        $config['api_key']=$info_file['api_key'];
        $config['api_url']=$info_file['api_url'];

        $message = array();
        $message['from'] = $mailServ;
        $message['to'] = $mailClien;
        $message['h:Reply-To'] = $mailServ;
        $message['subject'] = $subject;
        $message['html'] = $html;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $config['api_url']);
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($ch, CURLOPT_USERPWD, "api:{$config['api_key']}");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS,$message);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }
}