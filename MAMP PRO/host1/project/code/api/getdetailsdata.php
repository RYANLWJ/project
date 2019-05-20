<?php
header('content-type:text/html;charset=utf-8');//设置编码
$idname = isset($_POST['idname'])?$_POST['idname']:'';
$comment= isset($_POST['comment'])?$_POST['comment']:'';
$usernum= isset($_POST['usernum'])?$_POST['usernum']:'';
include 'connection.php';//连接数据库


$sql = "SELECT * FROM jiankegoodslist WHERE id='$idname'";
$res =$connection->query($sql);

$sql2 = "INSERT INTO commentdatabase(idname,comment,user) VALUES ('$idname','$comment','$usernum')";
$sql3 = "SELECT * FROM commentdatabase WHERE idname='$idname'";
if($comment){
  
    $res2 =$connection->query($sql2);//先插入
    $res3 =$connection->query($sql3);//查询全部并获取
    $content2 = $res3->fetch_all(MYSQLI_ASSOC);
}else{
    
    $res3 =$connection->query($sql3);//查询全部,并获取
    $content2 = $res3->fetch_all(MYSQLI_ASSOC);
}




/* 鉴定是否连接成功 */
// if ($res) {
//     echo 'yes';
// } else {
//     echo 'no';
// }

// var_dump($res);
$content = $res->fetch_all(MYSQLI_ASSOC); //拿数据

$datalist = array(
    'data' => $content, //拿你想要的数据
    'commentdata'=> $content2,//拿此条商品的用户评价/留言
);

echo json_encode($datalist, JSON_UNESCAPED_UNICODE); //送回给前端