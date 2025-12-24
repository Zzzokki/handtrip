CREATE TABLE "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "category-to-travel" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"travel_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sub-category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"category_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sub-category-to-travel" (
	"id" serial PRIMARY KEY NOT NULL,
	"subcategory_id" integer NOT NULL,
	"travel_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "travel" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"cover_image" varchar,
	"duration" integer NOT NULL,
	"total_seat_number" integer NOT NULL,
	"gallery" varchar[] NOT NULL,
	"company_id" integer NOT NULL,
	"destination_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "destination" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"location" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customer" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"phone_number" varchar NOT NULL,
	"email" varchar NOT NULL,
	"username" varchar NOT NULL,
	"password_hash" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "company" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"logo" varchar NOT NULL,
	"cover_image" varchar NOT NULL,
	"phone_number" varchar NOT NULL,
	"email" varchar NOT NULL,
	"description" varchar NOT NULL,
	"username" varchar NOT NULL,
	"password_hash" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "traveler" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone_number" varchar NOT NULL,
	"date_of_birth" timestamp NOT NULL,
	"order_id" integer NOT NULL,
	"seat_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "agenda" (
	"id" serial PRIMARY KEY NOT NULL,
	"day" integer NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"travel_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order" (
	"id" serial PRIMARY KEY NOT NULL,
	"total_seats" integer NOT NULL,
	"total_price" integer NOT NULL,
	"order_status" integer NOT NULL,
	"customer_id" integer NOT NULL,
	"travel_session_id" integer NOT NULL,
	"payment_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"id" serial PRIMARY KEY NOT NULL,
	"total" integer NOT NULL,
	"is_paid" boolean DEFAULT false NOT NULL,
	"payment_date" timestamp,
	"stripe_payment_intent_id" varchar,
	"stripe_payment_method" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "travel-session" (
	"id" serial PRIMARY KEY NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"travel_id" integer NOT NULL,
	"guide_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guide" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone_number" varchar NOT NULL,
	"profile_image" varchar NOT NULL,
	"company_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seat" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" varchar DEFAULT 'AVAILABLE' NOT NULL,
	"travel_session_id" integer NOT NULL,
	"seat_cost_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seat-cost" (
	"id" serial PRIMARY KEY NOT NULL,
	"cost" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
