-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "transId" TEXT,
    "base32" TEXT
);
INSERT INTO "new_User" ("base32", "email", "id", "password", "transId", "twoFactorEnabled") SELECT "base32", "email", "id", "password", "transId", "twoFactorEnabled" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_transId_key" ON "User"("transId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
