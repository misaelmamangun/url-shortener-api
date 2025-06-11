/*
  Warnings:

  - Added the required column `click` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Url" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "click" INTEGER NOT NULL
);
INSERT INTO "new_Url" ("code", "id", "url") SELECT "code", "id", "url" FROM "Url";
DROP TABLE "Url";
ALTER TABLE "new_Url" RENAME TO "Url";
CREATE UNIQUE INDEX "Url_code_key" ON "Url"("code");
CREATE UNIQUE INDEX "Url_url_key" ON "Url"("url");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
