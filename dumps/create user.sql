FLUSH PRIVILEGES;
CREATE USER 'ourBroDev'@'localhost' IDENTIFIED BY 'z10mz10m';
GRANT ALL PRIVILEGES ON ourBro.* TO 'ourBroDev'@'localhost';





/**** example problem query ****/
SELECT meetings.id  
FROM meetings  
WHERE meetings.approved = 1  
GROUP BY CASE 
	WHEN meetings.isOpen = 1 AND meetings.participants_num < meetings.max_participants 
		THEN 1        
	WHEN meetings.isOpen = 0 AND meetings.participants_num < meetings.max_participants 
		THEN 2
	WHEN meetings.isOpen = 1 AND meetings.participants_num >= meetings.max_participants 
		THEN 3 
	WHEN meetings.isOpen = 0 AND meetings.participants_num >= meetings.max_participants 
		THEN 4 
	ELSE 5
END , meetings.id DESC LIMIT 0 , 21
