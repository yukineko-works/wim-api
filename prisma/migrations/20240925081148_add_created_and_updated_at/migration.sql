-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "ipHash" TEXT NOT NULL,
    "revision" TEXT NOT NULL,
    "config" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Settings" ("config", "id", "ipHash", "revision", "userId") SELECT "config", "id", "ipHash", "revision", "userId" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
CREATE INDEX "idx_userId" ON "Settings"("userId");
CREATE INDEX "idx_ipHash" ON "Settings"("ipHash");
CREATE UNIQUE INDEX "Settings_userId_ipHash_key" ON "Settings"("userId", "ipHash");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
