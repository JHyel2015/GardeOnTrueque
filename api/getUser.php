<?php
//Archivo (getUser.php)

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
$conexion = conexion(); // CREA LA CONEXION
// REALIZA LA QUERY A LA DB
$sql = 'SELECT * FROM users WHERE uid=\''.$_GET["uid"].'\'';
$registros = mysqli_query($conexion, $sql);

// SI EL USUARIO EXISTE OBTIENE LOS DATOS Y LOS GUARDA EN UN ARRAY
if ($registros)  
{
    $resultado = mysqli_fetch_array($registros);
    $datos = $resultado;
    $json = json_encode($datos);
} else {
    $json = null;
    echo mysqli_error($conexion);
}
 // GENERA EL JSON CON LOS DATOS OBTENIDOS
echo $json; // MUESTRA EL JSON GENERADO


?>