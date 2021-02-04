FLUSH PRIVILEGES;
CREATE USER 'ourBroDev'@'localhost' IDENTIFIED BY 'z10mz10m';
GRANT ALL PRIVILEGES ON ourBro.* TO 'ourBroDev'@'localhost';
