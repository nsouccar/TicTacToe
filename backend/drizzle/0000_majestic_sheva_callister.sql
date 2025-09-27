CREATE TABLE "games" (
	"id" varchar NOT NULL,
	"board" json NOT NULL,
	"result" varchar(3),
	"currentPlayer" varchar(1)
);
