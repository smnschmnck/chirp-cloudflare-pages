CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
DROP TABLE `posts1`;