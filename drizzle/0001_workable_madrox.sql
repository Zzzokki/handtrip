CREATE TABLE "admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"username" varchar NOT NULL,
	"password_hash" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admin_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "manager" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone_number" varchar,
	"username" varchar NOT NULL,
	"password_hash" varchar NOT NULL,
	"company_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "manager_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "seat" ALTER COLUMN "status" SET DEFAULT 'available';--> statement-breakpoint
ALTER TABLE "manager" ADD CONSTRAINT "manager_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;