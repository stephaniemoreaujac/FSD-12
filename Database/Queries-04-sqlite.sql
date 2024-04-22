-- CLASS 4 - sqlite exersice

SELECT * FROM FOOD_NAME WHERE FoodDescription = 'Fast foods, dessert, cookies, chocolate chip'; 
-- FOOD_id 4559
-- FOODGROUPID = 21

SELECT * FROM FOOD_GROUP WHERE FoodGroupID = 21;
-- Fast Foods / Aliments prêts-à-manger

-- SELECT * FROM NUTRIENT_NAME WHERE NutrientName = 'Sodium';
-- SELECT * FROM NUTRIENT_NAME WHERE NutrientName = 'Protein';
-- better then above
-- SELECT * FROM NUTRIENT_NAME WHERE NutrientName = 'Sodium' OR NutrientName = 'Protein'
-- better then above
SELECT * FROM NUTRIENT_NAME WHERE NutrientName IN ('SODIUM', 'PROTEIN');
-- PROTEIN = 203
-- SODIUM = 307

SELECT * FROM NUTRIENT_AMOUNT WHERE FoodID = 4559 AND NutrientID IN (203, 307);
-- PROTEIN = 5.25
-- SODIUM = 342
