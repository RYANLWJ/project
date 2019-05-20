<?php
header('content-type:text/html;charset=utf-8');

$servername = 'localhost'; //服务器名字
$username = 'root'; //mamp用户名
$password = 'root'; //密码
$dbname = 'project'; //数据库名字

//2.创建连接
$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("连接失败:" . $connection->connect_error); //如果连接失败会显示错误在页面,不显示则成功
}

