CREATE TABLE estado (
  id INTEGER AUTO_INCREMENT
  ,nome VARCHAR(255) NOT NULL
  ,sigla CHAR(2) NOT NULL
  ,status CHAR(1) NOT NULL DEFAULT 'A'
  ,data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  ,CONSTRAINT pk_estado PRIMARY KEY (id)
);

CREATE TABLE cidade(
  id INTEGER AUTO_INCREMENT
  ,nome VARCHAR(255) NOT NULL
  ,estado_id INTEGER NOT NULL
  ,data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  ,status CHAR(1) NOT NULL DEFAULT 'A'
  ,CONSTRAINT pk_cidade PRIMARY KEY (id)
  ,CONSTRAINT fk_cid_est FOREIGN KEY (estado_id) REFERENCES estado (id)
);

CREATE TABLE usuario(
  id INTEGER AUTO_INCREMENT
  ,nome VARCHAR(255) NOT NULL
  ,email VARCHAR(255) NOT NULL
  ,senha VARCHAR(255) NOT NULL
  ,cpf CHAR(11) NOT NULL
  ,telefone CHAR(11) NOT NULL
  ,cidade_id INTEGER NOT NULL
  ,data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  ,status CHAR(1) NOT NULL DEFAULT 'A'
  ,CONSTRAINT pk_usuario PRIMARY KEY (id)
  ,CONSTRAINT fk_usu_cid FOREIGN KEY (cidade_id) REFERENCES cidade (id)
  ,CONSTRAINT usuario_unico UNIQUE(email, cpf) 
);

CREATE TABLE categoria(
  id INTEGER AUTO_INCREMENT
  ,nome VARCHAR(255) NOT NULL
  ,data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  ,status CHAR(1) NOT NULL DEFAULT 'A'
  ,CONSTRAINT pk_categoria PRIMARY KEY (id)
);

CREATE TABLE evento(
  id INTEGER AUTO_INCREMENT
  ,nome VARCHAR(255) NOT NULL
  ,cidade_id INTEGER NOT NULL
  ,nome_local VARCHAR(255) NOT NULL
  ,rua VARCHAR(255) NOT NULL
  ,bairro VARCHAR(255) NOT NULL
  ,horario DATETIME NOT NULL
  ,descricao VARCHAR(255) NOT NULL
  ,categoria_id INTEGER NOT NULL
  ,usuario_id INTEGER NOT NULL
  ,data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  ,status CHAR(1) NOT NULL DEFAULT 'A'
  ,CONSTRAINT pk_evento PRIMARY KEY (id)
  ,CONSTRAINT fk_eve_cid FOREIGN KEY (cidade_id) REFERENCES cidade (id)
  ,CONSTRAINT fk_eve_cat FOREIGN KEY (categoria_id) REFERENCES categoria (id)
  ,CONSTRAINT fk_eve_usu FOREIGN KEY (usuario_id) REFERENCES usuario (id)
);


CREATE TABLE presenca_usuario_evento(
  usuario_id INTEGER NOT NULL
  ,evento_id INTEGER NOT NULL
  ,CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id) 
  ,CONSTRAINT fk_evento FOREIGN KEY (evento_id) REFERENCES evento (id)
  ,CONSTRAINT usuario_evento_unico UNIQUE(usuario_id, evento_id)
  ,CONSTRAINT pk_usuario_evento PRIMARY KEY (usuario_id, evento_id)
);

INSERT INTO estado(nome, sigla) VALUES ('Paraná', 'PR');

INSERT INTO cidade(nome, estado_id) VALUES ('Paranavaí', 1);

INSERT INTO usuario(nome, email, senha, cpf, telefone, cidade_id) 
  VALUES ('Cristhian', 'cristhian.smaia@gmail.com', '12345', '12345678901', '44997516796', 1);
INSERT INTO usuario(nome, email, senha, cpf, telefone, cidade_id) 
  VALUES ('Analu Elza', 'analuelza_@toyota.com.br', 'Ofx0bsPl5y', '04599412597', '6237490521', 1);
INSERT INTO usuario(nome, email, senha, cpf, telefone, cidade_id) 
  VALUES ('Jéssica Clarice', 'jessicaclaricere@iquattro.com.br', '0i9A4xYmAE', '97926821128', '6526057547', 1);

INSERT INTO categoria(nome) VALUES ('Workshop');
INSERT INTO categoria(nome) VALUES ('Esportivo');
INSERT INTO categoria(nome) VALUES ('Música');

INSERT INTO evento(nome, cidade_id, nome_local, rua, bairro, horario, descricao, categoria_id, usuario_id) 
  VALUES ('Direito e Tecnologia', 1, 'Teatro Municipal', 'Praça Rodrigo Ayres de Oliveira', 'Centro', '2020-08-29 21:00:00',
          'Tema: Direito e Tecnologia: Problemas e Soluções', '1', '1');
INSERT INTO evento(nome, cidade_id, nome_local, rua, bairro, horario, descricao, categoria_id, usuario_id) 
  VALUES ('1º Esporte Open Pantanal', 1, 'Centro de Eventos', 'Av. Deputado Heitor Alencar Furtado', 'Jardim Novo Horizonte', '2020-09-06 10:00:00',
          ' programação contará com competições de diversas modalidades esportivas, exposição de marcas e produtos e diversas atrações e apresentações esportivas e culturais para o público presente.', 
          '1', '1');
INSERT INTO evento(nome, cidade_id, nome_local, rua, bairro, horario, descricao, categoria_id, usuario_id) 
  VALUES ('Fome de Música', 1, 'Expo Paranavai', 'Rua Mun', 'Jardim Santos Dumont', '2020-08-29 19:00:00',
          'Juntando a Música com a vontade de comer', '1', '1');

INSERT INTO presenca_usuario_evento(usuario_id, evento_id) VALUES (2, 3);
INSERT INTO presenca_usuario_evento(usuario_id, evento_id) VALUES (3, 2);

UPDATE presenca_usuario_evento SET evento_id = 1 WHERE usuario_id = 2 AND evento_id = 3;
UPDATE presenca_usuario_evento SET evento_id = 3 WHERE usuario_id = 3 AND evento_id = 2;

DELETE FROM presenca_usuario_evento WHERE evento_id = 2;
DELETE FROM presenca_usuario_evento WHERE evento_id = 3 AND usuario_id = 3;


