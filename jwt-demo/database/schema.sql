CREATE TABLE `roles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(191) NOT NULL
) ENGINE='InnoDB' COLLATE 'utf8mb4_unicode_ci';

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'User');

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `role_id` int(11) unsigned NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `verification_token` varchar(255) NOT NULL,
  `reset_token` varchar(255) NOT NULL,
  `reset_token_expires_on` datetime NOT NULL,
  `password_reset` datetime NOT NULL,
  `verified_on` datetime NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_on` datetime NOT NULL,
  `is_verified` tinyint(1) NOT NULL
) ENGINE='InnoDB' COLLATE 'utf8mb4_unicode_ci';

ALTER TABLE `users`
ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE `refresh_tokens` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `token` varchar(255) NOT NULL,
  `created_on` datetime NOT NULL,
  `expires_on` datetime NOT NULL,
  `created_by_ip` varchar(255) NOT NULL,
  `revoked_on` datetime NOT NULL,
  `revoked_by_ip` varchar(255) NOT NULL,
  `replaced_by_token` varchar(255) NOT NULL,
  `is_expired` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE='InnoDB';
