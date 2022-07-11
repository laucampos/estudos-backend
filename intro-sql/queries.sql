USE `teachers-lau-campos`;
SET SQL_SAFE_UPDATES = 0;

CREATE TABLE `Funcionarios` (
	id VARCHAR(255) PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO `Funcionarios` (id, nome, email)
VALUES ("001", "Luana", "lua@lbn.com"),
	("002", "Vinicius", "vini@lbn.com"),
	("003", "Laura", "lau@lbn.com");

SELECT * FROM `Funcionarios`;

SELECT id AS `identifier`, nome FROM `Funcionarios`;

SELECT * FROM `Funcionarios` WHERE id = 003;

SELECT * FROM `Funcionarios` WHERE nome LIKE "%a%";

SELECT * FROM `Funcionarios` WHERE NOT nome LIKE "%r%" AND email LIKE "%u%"; 

INSERT INTO `Funcionarios` (id, nome, email)
VALUES ("004", "Yuzo", "yuzo@lbn.com");

DELETE FROM `Funcionarios`
WHERE id = "004"