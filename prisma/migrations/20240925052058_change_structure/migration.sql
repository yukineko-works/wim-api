/*
  Warnings:

  - You are about to drop the column `key` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `worldId` on the `Settings` table. All the data in the column will be lost.
  - Added the required column `config` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ipHash` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "ipHash" TEXT NOT NULL,
    "config" TEXT NOT NULL
);
INSERT INTO "new_Settings" ("id", "userId") SELECT "id", "userId" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
CREATE INDEX "idx_userId" ON "Settings"("userId");
CREATE INDEX "idx_ipHash" ON "Settings"("ipHash");
CREATE UNIQUE INDEX "Settings_userId_ipHash_key" ON "Settings"("userId", "ipHash");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
