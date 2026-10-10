--Create store_manager
CREATE USER IF NOT EXISTS 'store_manager'@'localhost'
IDENTIFIED BY 'Password123';

--Grant
GRANT SELECT, INSERT, UPDATE
ON retail_store.*
TO 'store_manager'@'localhost';

--Check permissions after initial grant
SHOW GRANTS FOR 'store_manager'@'localhost';

--Revoke UPDATE
REVOKE UPDATE
ON retail_store.*
FROM 'store_manager'@'localhost';

--Grant DELETE on Sales only
GRANT DELETE
ON retail_store.Sales
TO 'store_manager'@'localhost';

--Check final permissions
SHOW GRANTS FOR 'store_manager'@'localhost';