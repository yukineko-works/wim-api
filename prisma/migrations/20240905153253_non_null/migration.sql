/*
  Warnings:

  - Made the column `worldId` on table `Settings` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "worldId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL
);
INSERT INTO "new_Settings" ("id", "key", "userId", "value", "worldId") SELECT "id", "key", "userId", "value", "worldId" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
CREATE INDEX "idx_userId" ON "Settings"("userId");
CREATE INDEX "idx_worldId" ON "Settings"("worldId");
CREATE UNIQUE INDEX "Settings_userId_worldId_key_key" ON "Settings"("userId", "worldId", "key");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
