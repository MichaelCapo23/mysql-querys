//    Select all purchases made after february 1st
SELECT * FROM `purchases` AS p WHERE MONTH(P.`added`) > 2
//    Select all purchases made after february 1st that are less than $200 total
SELECT * FROM `purchases` AS p WHERE MONTH(P.`added`) > 2 AND p.`price` < 200
//    Select all purchases made after february 1st that are more than $200 total, order it by descending value (ie $200 comes first, then $150, then $75, etc)
SELECT * FROM `purchases` AS p WHERE MONTH(P.`added`) > 2 AND p.`price` > 200 ORDER BY p.`price` DESC
//    Select all purchases, join the customer table so we can also see the customer email and family_name
SELECT p.*, c.`email`, c.`family_name` FROM `purchases` AS p LEFT JOIN `customers` AS c ON p.`customers_id`= c.`ID`
//    Select all purchases, join the items table so we can see the item name and unit price
SELECT p.*, i.`name`, i.`price` FROM `purchases` AS p LEFT JOIN `items` AS i ON p.`customers_id`= i.`ID`
//    Select all purchases, group them by the customer that bought them
SELECT p.*, CONCAT(c.`family_name`, ', ', c.`given_name`) AS name FROM `purchases` AS p LEFT JOIN `customers` AS c ON p.`customers_id`= c.`ID`
//    Select the sum of all the purchases
SELECT sum(p.`price`) FROM `purchases` AS p
//    Select the sum of all the purchases that were made by each customer
SELECT SUM(`price`) AS price, CONCAT(`customers`.`family_name`, ', ', `customers`.`given_name`) AS name FROM `purchases` AS p join `customers` GROUP BY `customers_id`
//    Select the sum of all the purchases, group them by each month (look up mysql Month and Year)
SELECT SUM(p.`price`) total, YEAR(p.added) AS `year`, MONTH(p.added) AS `month` FROM `purchases` AS p join `customers` GROUP BY YEAR(p.added), MONTH(p.added)
//    Select the total number of each item bought, grouped by item type.  For example, how many shirts were bought, how many pants were bought, how many shoes were bought
SELECT SUM(`item_count`) AS total, i.`type` AS type FROM `purchases` AS p LEFT JOIN `items` AS i ON p.`item_id` = i.`id` GROUP BY i.`type`
//    Select the total number of each item bought, grouped by month and then by type.  I want to know how many of each type of item was bought in each month
SELECT sum(P.`item_count`) AS totalbought, i.`type` AS type, p.`added` AS month
FROM `purchases` AS p
LEFT JOIN `items` AS i
ON p.`item_id` = i.`id`
GROUP BY MONTH(p.`added`) DESC
ORDER BY i.`type`