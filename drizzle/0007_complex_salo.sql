CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text,
	`author` text(15) NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`author`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
