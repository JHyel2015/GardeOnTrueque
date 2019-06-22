<?php

// DATOS DE CONEXION A LA BASE DE DATOS
function conexion() {
    $servidor = "31.193.228.111";    //Servidor
    $usuario = "x8cq9t23_richard_heredia";          //Usuario
    $clave = "Austincito22";             //Clave
    $bd = "x8cq9t23_richard_heredia_db";		            //Base de datos
  
    $conexion = mysqli_connect($servidor,$usuario,$clave, $bd);
    
    return $conexion;
  }

?>