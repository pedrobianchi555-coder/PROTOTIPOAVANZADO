SELECT inventory_status, COUNT(*) 
FROM receptions 
GROUP BY inventory_status;
