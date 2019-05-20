<?php



$page = isset($_POST['page']) ? $_POST['page'] : '';
$num = isset($_POST['num']) ? $_POST['num'] : '';

$type = isset($_POST['type']) ? $_POST['type'] : '';
$order = isset($_POST['order']) ? $_POST['order'] : '';
// echo $page;
include 'connection.php';
$index = ($page - 1) * $num;//推导公式
    /* 1,10 1-10条
    10,10 11-20条
    20,10 21-30条
    30,10 */
//是否排序的判断
if($type) {
    //不为空：意味已经有值传过来，需要排序
    $sql = "SELECT * FROM jiankegoodslist ORDER BY $type $order LIMIT $index,$num";
}else {
    //空：没有传值过来，不需要排序
    $sql = "SELECT * FROM jiankegoodslist LIMIT $index,$num";
}



// $sql = "SELECT * FROM tbdata LIMIT $index,$num";//截取10条内容

$res = $connection->query($sql); //执行sql语句
$content = $res->fetch_all(MYSQLI_ASSOC); //拿数据

$sql2 = "SELECT*FROM jiankegoodslist";//查询所有的数据
$res2 = $connection->query($sql2);//执行sql2语句
$datalist = array(
    'data' => $content,
    'total' => $res2->num_rows,//返回记录数
    'page' => $page,//把从前端接收的page又送回给前端
    'num' => $num,//把从前端接收的num又送回给前端
);

echo json_encode($datalist, JSON_UNESCAPED_UNICODE);