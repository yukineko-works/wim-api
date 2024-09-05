-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "worldId" TEXT,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "idx_userId" ON "Settings"("userId");

-- CreateIndex
CREATE INDEX "idx_worldId" ON "Settings"("worldId");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_worldId_key_key" ON "Settings"("userId", "worldId", "key");
