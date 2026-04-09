-- CreateTable
CREATE TABLE "Zakat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "assets" REAL NOT NULL,
    "savings" REAL NOT NULL,
    "debt" REAL NOT NULL,
    "income" REAL NOT NULL,
    "result" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
