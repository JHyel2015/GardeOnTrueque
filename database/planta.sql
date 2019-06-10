USE ng_gardeontrueque_db;

DROP TABLE IF EXISTS planta;

CREATE TABLE planta(
    id_planta INT(11) NOT NULL auto_increment,
    user_id INT(11) NOT NULL,
    tipo_planta VARCHAR(100) DEFAULT NULL,
    nombre_planta VARCHAR(100) DEFAULT NULL,
    image_planta VARCHAR(255) DEFAULT NULL,
    descripcion_planta VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (id_planta)
);

DESCRIBE planta;