CREATE TABLE `posts1` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
DROP TABLE `posts`;