CREATE DATABASE NintendoSwitch;
USE NintendoSwitch;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nomeUsuario VARCHAR(50) NOT NULL UNIQUE,
email VARCHAR(100) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL,
dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE foto (
    idFoto INT PRIMARY KEY AUTO_INCREMENT,
    fotoPerfil VARCHAR(255),
    fkUsuario INT UNIQUE,
    CONSTRAINT fkPerfilUsuario
        FOREIGN KEY (fkUsuario)
        REFERENCES usuario(idUsuario)
);

CREATE TABLE jogo (
    idJogo INT PRIMARY KEY AUTO_INCREMENT,
    nomeJogo VARCHAR(100) NOT NULL,
    genero VARCHAR(50)
);

CREATE TABLE biblioteca (
    idBiblioteca INT AUTO_INCREMENT,
    fkUsuario INT,
    fkJogo INT,
    favorito BOOLEAN DEFAULT FALSE,
    statusJogo VARCHAR(20),
    nota INT,
    dataAdicao DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pkComposta
        PRIMARY KEY (idBiblioteca, fkUsuario, fkJogo),
    CONSTRAINT fkUsuarioBiblioteca
        FOREIGN KEY (fkUsuario)
        REFERENCES usuario(idUsuario),
    CONSTRAINT fkJogoBiblioteca
        FOREIGN KEY (fkJogo)
        REFERENCES jogo(idJogo),
    CONSTRAINT chkStatus
        CHECK (statusJogo IN (
                'Não iniciado',
                'Jogando',
                'Zerado',
                'Platinado')),
    CONSTRAINT chkNota
        CHECK (nota BETWEEN 1 AND 5)
);

ALTER TABLE biblioteca
ADD CONSTRAINT uqUsuarioJogo
UNIQUE (fkUsuario, fkJogo);

SELECT j.nomeJogo, COUNT(*) AS totalFavoritos
FROM biblioteca b
JOIN jogo j ON b.fkJogo = j.idJogo
WHERE favorito = TRUE
GROUP BY j.nomeJogo
ORDER BY totalFavoritos DESC;


SELECT j.nomeJogo, AVG(b.nota) AS mediaNotas
FROM biblioteca b
JOIN jogo j ON b.fkJogo = j.idJogo
GROUP BY j.nomeJogo;
