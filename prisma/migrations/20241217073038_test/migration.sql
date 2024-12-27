-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Network" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parentId" INTEGER,
    "name" TEXT NOT NULL,
    "netmask" TEXT DEFAULT '',
    "gateway" TEXT DEFAULT '',
    "startIp" TEXT DEFAULT '',
    "endIp" TEXT DEFAULT '',
    "vlan" TEXT DEFAULT '',
    "remark" TEXT DEFAULT '',
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Network_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Network" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Network" ("createAt", "endIp", "gateway", "id", "name", "netmask", "parentId", "remark", "startIp", "updateAt", "vlan") SELECT "createAt", "endIp", "gateway", "id", "name", "netmask", "parentId", "remark", "startIp", "updateAt", "vlan" FROM "Network";
DROP TABLE "Network";
ALTER TABLE "new_Network" RENAME TO "Network";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
