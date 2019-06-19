USE x8cq9t23_richard_heredia_db;

DROP TABLE IF EXISTS anuncio;

CREATE TABLE anuncio(
    id_anuncio INT(11) NOT NULL auto_increment,
    user_id INT(11) NOT NULL,
    fecha_anuncio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_anuncio BOOL NOT NULL DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_anuncio),
    KEY `FK_USER_ID` (user_id),
    CONSTRAINT `FK_USER_ID` FOREIGN KEY (user_id) REFERENCES users (user_id)
);

DESCRIBE anuncio;