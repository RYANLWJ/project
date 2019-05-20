<?php
header('content-type:text/html;charset=utf-8');

// $num = isset($_POST['tel_Num']) ? $_POST['tel_Num'] : '123456';
// $psw = isset($_POST['psw_code']) ? $_POST['psw_code'] : '12345';

include 'connection.php';

$sql="SELECT * FROM maindatabase";

$content =$connection->query($sql);
$res= $content->fetch_all(MYSQLI_ASSOC);
// var_dump ($res);
echo json_encode($res, JSON_UNESCAPED_UNICODE);




















