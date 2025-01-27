##### **LIVE DEPLOYEMNT LINK (frontend deployed on vercel, backend deployed on render)** : https://anglara-assignment-saif.vercel.app/signup
<br>

**TECH USED** : MERN + JWT

<br>

--- **HOW TO RUN THE CODE LOCALLY** ---


1. go into your vs code terminal in the root directory 
--> execute the command:  git clone https://github.com/saifalikhan-244713/Anglara-Assignment-Saif.git 

2. now move into your client folder
	->cd .\client\
	now create the .env file in the root directory(client) and declare environment variable => **VITE_BACKEND_URL**=http://localhost:3000

3. now move into your server folder 
	->cd .\server\
	now create the .env file in the root directory and declare environment variable => 

	**MONGO_URI**=your mongodb uri(mongodb://localhost:27017/anglaraclone)
   <br>
	**JWT_SECRET**=your type random key 

5. run **"npm install"** in both **client and server directory** 

6. run **"npm run dev"** in **client directory**
   
7. run **"nodemon .\server.js\"** in your **server directory**
<br><br>

And horray now u can use it locally on your machine 
	
