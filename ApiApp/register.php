<?php
//đăng kí
include('connect/connect.php');
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$email = $obj['email'];
$password = md5($obj['password']);
if( $email != '' && $password!=''){
	
	$sql = "INSERT INTO users(email,password) VALUES('$email','$password')";
	$result = $mysqli->query($sql);
	if($result){
		echo 'THANH_CONG';
	}
	else{
		echo 'KHONG_THANH_CONG';
echo 'oi 1';
	}
}
else{
	echo 'KHONG_THANH_CONG';
echo 'oi 2';
}

?>