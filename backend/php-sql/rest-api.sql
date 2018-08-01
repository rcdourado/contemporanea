
-- CREATE DATABASE IF NOT EXISTS `contempapp` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci	;
-- USE `contempapp`;

-- Delete arquiteto table
-- DROP TABLE `arquiteto`;

-- Create arquiteto table
CREATE TABLE IF NOT EXISTS `arquiteto` (
	`id` int(11) NOT NULL AUTO_INCREMENT ,
	`nome` varchar(360) NOT NULL ,
	`foto` longtext NOT NULL ,
	`conteudo` text NOT NULL ,
	PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;


