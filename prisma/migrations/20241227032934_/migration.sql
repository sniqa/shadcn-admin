-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_IpAddress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ip" TEXT NOT NULL,
    "panelNumber" TEXT,
    "user" TEXT,
    "location" TEXT,
    "networkId" INTEGER,
    "remark" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "IpAddress_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_IpAddress" ("createAt", "id", "ip", "location", "panelNumber", "remark", "updateAt", "user") SELECT "createAt", "id", "ip", "location", "panelNumber", "remark", "updateAt", "user" FROM "IpAddress";
DROP TABLE "IpAddress";
ALTER TABLE "new_IpAddress" RENAME TO "IpAddress";
CREATE UNIQUE INDEX "IpAddress_networkId_key" ON "IpAddress"("networkId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
