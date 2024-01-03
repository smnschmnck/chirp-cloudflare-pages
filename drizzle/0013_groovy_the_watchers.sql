CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text(280),
	`author` text(15) NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`author`) REFERENCES `user`(`username`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text(15) PRIMARY KEY NOT NULL,
	`username` text,
	`profile_picture_url` text
);
--> statement-breakpoint
CREATE TABLE `user_key` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`user_id` text(15) NOT NULL,
	`hashed_password` text(255),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` text(127) PRIMARY KEY NOT NULL,
	`user_id` text(15) NOT NULL,
	`active_expires` integer NOT NULL,
	`idle_expires` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);