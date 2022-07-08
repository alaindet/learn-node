CREATE TABLE `todos` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `is_done` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE='InnoDB' COLLATE 'utf8mb4_unicode_520_ci';

INSERT INTO `todos` (`id`, `title`, `is_done`)
VALUES ('1', 'Hello World', '0');
