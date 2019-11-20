# newsletter-app
Newsletter app to manage newsletter and view
Tutorial for Installations

Warning: If there is any errors using the folders files. Try the .zip files which is more stable because the folders when upload may be loss one or more files.

1. First,download the Folder or all the stuff inside the folder from GitHub which is call "Newsletter-Project".
2. Then,copy and paste all the files that is inside the folder into your localhost files or the server if you have one.
3. After finish,download the data.sql.zip too.
4. Create a new database call "u688446224_CSE3033".
5. Import the data.sql.zip into the newly created database.
6. Change the credentials of the database.

  GOTO ->>> inc/class/DatabaseHandler.php
  
  You will see something like this down here, change all the credentials that you need.
  
  $this->host = $host ?? "YOUR HOST NAME HERE"; 
  
  $this->dbName = $dbName ?? "YOUR DB NAME HERE";      
  
  $this->user = $user ?? "YOUR USERNAME HERE";
  
  $this->pass = $pass ?? "YOUR PASSWORD HERE";

7. Try and run the project by typing the URL.
8. Then login into the system or apps to access different roles features.

URL(Member)
-------------------------------------------
http://ohcoolsy.com/pages/login.html

URL(Admin)
-------------------------------------------
http://ohcoolsy.com/pages/admin/login.html

URL(Guest)
-------------------------------------------
http://ohcoolsy.com/

Credentials for (Admin)
-------------------------------------------
Username: admin
Password: admin123

Credentials for (Member)
-------------------------------------------
Note: User that just register will not be ablt to access immediately, unless the admin approved. Also, user that has been blocked by admin will not be able to login too.

1. user 1 (that has more post)

  Username: derrick

  Password: derrick123

2. user 2

  Username: choohuiqi

  Password: choohuiqi123

3. user 3

  Username: eugene
  
  Password: eugene123

4. user 4

  Username: chenxiang

  Password: chenxiang123
