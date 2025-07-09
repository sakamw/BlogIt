/*
  Warnings:

  - The primary key for the `blog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `blog_synops` on the `blog` table. All the data in the column will be lost.
  - The `blog_id` column on the `blog` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avartar_img` on the `user` table. All the data in the column will be lost.
  - The `user_id` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `blog_synopsis` to the `blog` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `authorId` on the `blog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "blog" DROP CONSTRAINT "blog_authorId_fkey";

-- AlterTable
ALTER TABLE "blog" DROP CONSTRAINT "blog_pkey",
DROP COLUMN "blog_synops",
ADD COLUMN     "blog_synopsis" TEXT NOT NULL,
DROP COLUMN "blog_id",
ADD COLUMN     "blog_id" SERIAL NOT NULL,
DROP COLUMN "authorId",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD CONSTRAINT "blog_pkey" PRIMARY KEY ("blog_id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "avartar_img",
ADD COLUMN     "avatar_img" TEXT,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("user_id");

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
