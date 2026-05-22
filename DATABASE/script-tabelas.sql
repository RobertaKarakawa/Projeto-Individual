CREATE DATABASE NintendoSwitch;
USE NintendoSwitch;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nomeUsuario VARCHAR(50) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL,
dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE jogo (
    idJogo INT PRIMARY KEY AUTO_INCREMENT,
    nomeJogo VARCHAR(100) NOT NULL,
    genero VARCHAR(50)
);

insert into jogo (nomeJogo, genero) values
('Animal Crossing: New Horizons', 'Simulação de vida'),
('Super Mario Odyssey', 'Plataforma 3D'),
('Pokémon Legends: Arceus', 'RPG'),
('Nintendo Switch Sports', 'Esporte'),
('Super Mario Party Jamboree', 'Tabuleiro'),
('Hollow Knight', 'Indie / exploração'),
('Mario Kart 8 Deluxe', 'Corrida'),
('Cuphead', 'Run and gun / plataforma'),
('Fortnite', 'Battle royale'),
('Minecraft', 'Sandbox / sobrevivência'),
('Overcooked! 2', 'Cooperativo'),
('Resident Evil 4', 'Survival horror'),
('Stardew Valley', 'Simulação de vida / fazenda'),
('Super Mario Bros. Wonder', 'Plataforma 2D'),
('Little Nightmares II', 'Suspense / puzzle'),
('Terraria', 'Sandbox / sobrevivência'),
('aruto Shippuden: Ultimate Ninja Storm 4', 'Luta / anime'),
('Red Dead Redemption', 'Ação e aventura / mundo aberto'),
('The Legend of Zelda: Breath of the Wild', 'Ação / aventura'),
('Just Dance 2025 Edition', 'Ritmo / música');


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

CREATE TABLE fotoPerfil (
    idFoto INT PRIMARY KEY AUTO_INCREMENT,
    foto VARCHAR(255),
    fkUsuario INT UNIQUE,
    CONSTRAINT fkFotoUsuario
        FOREIGN KEY (fkUsuario)
        REFERENCES usuario(idUsuario)
);

CREATE TABLE loja (
idLoja INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
site VARCHAR(1000),
precoSwitch DECIMAL(10,2)
);

INSERT INTO loja (nome, site, precoSwitch) VALUES
('Mercado Livre','https://www.mercadolivre.com.br/nintendo-nintendo-switch-console-nsha07776101fgr-32gb-console-nintendo-switch-cor-preto-2024/p/MLB61784211?pdp_filters=item_id%3AMLB4345707909&from=gshop&matt_tool=91562990&matt_word=&matt_source=google&matt_campaign_id=22090193891&matt_ad_group_id=191545542882&matt_match_type=&matt_network=g&matt_device=c&matt_creative=787871501933&matt_keyword=&matt_ad_position=&matt_ad_type=pla&matt_merchant_id=735125422&matt_product_id=MLB61784211-product&matt_product_partition_id=2452780900542&matt_target_id=pla-2452780900542&cq_src=google_ads&cq_cmp=22090193891&cq_net=g&cq_plt=gp&cq_med=pla&gad_source=1&gad_campaignid=22090193891&gbraid=0AAAAAD93qcDRG1P0AIQZucZP7fyXDWyqy&gclid=Cj0KCQjwlLDQBhDjARIsAPlIefEh1gQlLB_xSf0660J5xSb5OIcAvUDp6svkzAJPjbticV2RB9gdqc8aAkKKEALw_wcB', 1991.20),
('Amazon', 'https://www.amazon.com.br/Bundle-Nintendo-Switch-Wonder-Assinatura/dp/B0FR6N4WWH/ref=asc_df_B0FR6N4WWH?mcid=250d12bb14063e47857e0230c8a8ac05&tag=googleshopp00-20&linkCode=df0&hvadid=709884703672&hvpos=&hvnetw=g&hvrand=1086661297728262362&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001768&hvtargid=pla-2453608210519&psc=1&hvocijid=1086661297728262362-B0FR6N4WWH-&hvexpln=0&language=pt_BR', 2096.00),
('KaBum!', 'https://www.kabum.com.br/produto/924900/console-nintendo-switch-super-mario-bros-wonder-3-meses-de-assinatura-nintendo-switch-online-nt000054nsw', 2091.57),
('Americanas', 'https://www.americanas.com.br/console-nintendo-switch---super-mario-bros--wonder---3-meses-de--assinatura-nintendo-switch-online/p?idsku=8750210&utm_source=YSMESP&utm_medium=buscappc&utm_campaign=alwayson-25&utm_content=bp_pl_sh_go_digital_aloc_shopping_aberto_alwayson-25_na_aon25-00489&utm_term=pla_shopping&gad_source=1&gad_campaignid=23359487902&gbraid=0AAAAAD37VpoXpmHI1uaM_qOiGGZdfq9Hc&gclid=Cj0KCQjwlLDQBhDjARIsAPlIefFARwUN2o6JhCJNRigeauh9xp0Dy7cBvmSCB6Tn7myzyleb6Hc49fkaAvhCEALw_wcB', 2299.99),
('Magazine Luiza', 'https://www.magazineluiza.com.br/console-nintendo-switch-super-mario-bros-wonder-3-meses-de-assinatura-nintendo-switch-online-nt000054nsw/p/eg50821bc4/ga/coni/?seller_id=kabum', 2249.00);


SELECT j.nomeJogo, COUNT(*) AS totalFavoritos
FROM biblioteca b
JOIN jogo j ON b.fkJogo = j.idJogo
WHERE favorito = TRUE
GROUP BY j.nomeJogo
ORDER BY totalFavoritos DESC
LIMIT 10;

 SELECT 
            jogo.nomeJogo,
            COUNT(DISTINCT biblioteca.fkJogo) AS quantidadeFavoritos
        FROM biblioteca
        JOIN jogo
            ON biblioteca.fkJogo = jogo.idJogo
        WHERE biblioteca.favorito = true
        GROUP BY jogo.idJogo
        ORDER BY quantidadeFavoritos DESC
        LIMIT 10;

SELECT j.nomeJogo, AVG(b.nota) AS mediaNotas
FROM biblioteca b
JOIN jogo j ON b.fkJogo = j.idJogo
GROUP BY j.nomeJogo;


SELECT 
    j.nomeJogo,
    COUNT(DISTINCT b.fkUsuario) AS totalFavoritos
FROM biblioteca b
JOIN jogo j 
    ON b.fkJogo = j.idJogo
WHERE favorito = TRUE
GROUP BY j.nomeJogo
ORDER BY totalFavoritos DESC
LIMIT 10;

