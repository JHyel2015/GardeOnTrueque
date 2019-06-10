USE ng_gardeontrueque_db;

DROP TABLE IF EXISTS cambio;

CREATE TABLE cambio(
    id_cambio INT(11) NOT NULL auto_increment,
    user_id INT(11) NOT NULL,
    tipo_planta VARCHAR(100) DEFAULT NULL,
    nombre_planta VARCHAR(100) DEFAULT NULL,
    id_planta INT(11) NOT NULL,
    PRIMARY KEY (id_cambio),
    KEY `FK_USER_ID_2` (user_id),
    KEY `FK_ID_PLANTA` (id_planta),
    CONSTRAINT `FK_USER_ID_2` FOREIGN KEY (user_id) REFERENCES users (user_id),
    CONSTRAINT `FK_ID_PLANTA` FOREIGN KEY (id_planta) REFERENCES planta (id_planta)
);

DESCRIBE cambio;