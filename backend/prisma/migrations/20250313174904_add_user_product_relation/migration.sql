-- First create a default user for existing products
INSERT INTO "User" (email, password, "createdAt", "updatedAt")
SELECT 
  'admin@example.com',
  'migrated_products',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE NOT EXISTS (
  SELECT 1 FROM "User" WHERE email = 'admin@example.com'
);

-- Get the ID of our default user
DO $$ 
DECLARE
  default_user_id INTEGER;
BEGIN
  SELECT id INTO default_user_id FROM "User" WHERE email = 'admin@example.com' LIMIT 1;

  -- Add the userId column with a default value
  ALTER TABLE "Product" ADD COLUMN "userId" INTEGER;
  
  -- Update existing products to use the default user
  UPDATE "Product" SET "userId" = default_user_id WHERE "userId" IS NULL;
  
  -- Now make the column required
  ALTER TABLE "Product" ALTER COLUMN "userId" SET NOT NULL;
  
  -- Add the foreign key constraint
  ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" 
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
END $$;