-- CreateTable
CREATE TABLE "URL" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "URL_code_key" ON "URL"("code");

-- CreateIndex
CREATE UNIQUE INDEX "URL_url_key" ON "URL"("url");
