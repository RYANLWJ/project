<?php
header('content-type:text/html;charset=utf-8');

$num = isset($_POST['tel_Num']) ? $_POST['tel_Num'] : '123456';
$psw = isset($_POST['psw_code']) ? $_POST['psw_code'] : '12345';

include 'connection.php';

$sql1 = "SELECT * FROM accdata WHERE phonenum ='$num'";
$sql2 = "INSERT INTO accdata(phonenum,psw) VALUES('$num','$psw')";

$res = $connection->query($sql1);

if ($res->num_rows) {
   
    echo 'alreadyhave';

} else {
    $con = $connection->query($sql2);
    $con2 = $connection->query($sql1);
    if ($con2->num_rows) {
        echo 'finished'; //数据库没有这个信息,可以注册
    }
    
}

