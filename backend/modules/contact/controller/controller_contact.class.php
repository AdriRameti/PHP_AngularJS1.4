<?php
class controller_contact{
    public function contact(){
        require INC_PATH."header.html";
        require INC_PATH."menu.html";
        Content::LoadView("contact","contact");
        include (INC_PATH."footer.html");
    }
}