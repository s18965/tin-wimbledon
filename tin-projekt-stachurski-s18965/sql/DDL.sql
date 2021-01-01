CREATE SCHEMA IF NOT EXISTS `tin-Wimbledon`;

CREATE TABLE IF NOT EXISTS `tin-Wimbledon`.`Player`
( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `firstName` VARCHAR(50) NOT NULL ,
  `lastName` VARCHAR(50) NOT NULL ,
  `country` VARCHAR(70) NOT NULL ,
  `birthDate` DATE NULL ,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `player_id_UNIQUE` (`id` ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-Wimbledon`.`Coach`
( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `firstName` VARCHAR(50) NOT NULL ,
  `lastName` VARCHAR(50) NOT NULL ,
  `country` VARCHAR(70) NOT NULL ,
  `idPlayer` INT UNSIGNED NOT NULL ,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `coach_id_UNIQUE` (`id` ASC),
  CONSTRAINT `play_fk` FOREIGN KEY (`idPlayer`) REFERENCES `tin-Wimbledon`.`Player` (`id`)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-Wimbledon`.`TennisMatch`
( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `scorePlayer1` varchar(50) NOT NULL ,
  `scorePlayer2` varchar(50) NOT NULL ,
  `date` DATE NOT NULL ,
  `idPlayer1` INT UNSIGNED NOT NULL ,
  `idPlayer2` INT UNSIGNED NOT NULL ,
  `court` varchar(50) NOT NULL ,
  `roundNumber` varchar(50) NOT NULL ,
  `idWinner` INT NOT NULL ,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `match_id_UNIQUE` (`id` ASC),
  CONSTRAINT `play1_fk` FOREIGN KEY (`idPlayer1`) REFERENCES `tin-Wimbledon`.`Player` (`id`),
  CONSTRAINT `play2_fk` FOREIGN KEY (`idPlayer2`) REFERENCES `tin-Wimbledon`.`Player` (`id`)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO `tin-Wimbledon`.`Player` (`id`, `firstName`, `lastName`, `country`, `birthDate`)VALUES
(1, 'Iga', 'Świątek', 'Poland', '2000-05-21'),
(2, 'Naomi', 'Osaka', 'Japan', '1995-04-03'),
(3, 'Serena', 'Williams', 'United States', '1987-05-01');
;

INSERT IGNORE INTO `tin-Wimbledon`.`Coach` (`id`, `firstName`, `lastName`, `country`, `idPlayer`)VALUES
(1, 'Jan', 'Kowalski', 'Poland', 1),
(2, 'Michał', 'Pazdan', 'Poland', 1),
(3, 'Hosama', 'Okazaki', 'Japan', 2),
(4, 'John', 'Smith', 'United States', 3)
;

INSERT IGNORE INTO `tin-Wimbledon`.`TennisMatch` (`id`, `scorePlayer1`, `scorePlayer2`, `date` , `idPlayer1`, `idPlayer2`
, `court`, `roundNumber`, `idWinner`)VALUES
(1, '1,6,2','6,4,6','2020-07-01', 1, 2, 'Stan Smith Court', 4, 2),
(2, '2,0','6,6','2020-07-04', 2, 3, 'Roger Federer Court', 6, 3),
(3, '6,3,7','5,6,6','2020-07-06', 1, 3, 'Stan Vavrinka Court', 7, 1);
;