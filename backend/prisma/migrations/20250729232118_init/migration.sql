-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "passWord" TEXT NOT NULL,
    "datejoined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileImage" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_userName_key" ON "user"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "user_emailAddress_key" ON "user"("emailAddress");

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
