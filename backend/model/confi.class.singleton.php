<?php
class confi{
    private $_userdb;
    private $_passdb;
    private $_hostdb;
    private $_db;
    static $_instance;

    private function __construct()
    {
        $config = parse_ini_file(MODEL_PATH."db.ini");
        $this->_userdb = $config['user'];
        $this->_passdb = $config['password'];
        $this->_hostdb = $config['host'];
        $this->_db = $config['db'];
    }
    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }
    public function getUserDB() {
        $var = $this->_userdb;
        return $var;
    }

    public function getHostDB() {
        $var = $this->_hostdb;
        return $var;
    }

    public function getPassDB() {
        $var = $this->_passdb;
        return $var;
    }

    public function getDB() {
        $var = $this->_db;
        return $var;
    }
}