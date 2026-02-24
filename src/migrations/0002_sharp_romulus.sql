CREATE TABLE "feed_follows" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	"feed_id" uuid NOT NULL,
	CONSTRAINT "feed_follows_user_id_feed_id_unique" UNIQUE("user_id","feed_id")
);
--> statement-breakpoint
ALTER TABLE "feeds" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "feeds" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "feed_follows" ADD CONSTRAINT "feed_follows_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feed_follows" ADD CONSTRAINT "feed_follows_feed_id_feeds_id_fk" FOREIGN KEY ("feed_id") REFERENCES "public"."feeds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feeds" DROP COLUMN "create_at";--> statement-breakpoint
ALTER TABLE "feeds" DROP COLUMN "update_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "create_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "update_at";