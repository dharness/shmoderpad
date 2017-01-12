ssh root@138.197.152.175 "cd /usr/src/app/shmoderpad && 
git pull origin master &&
npm install &&
pm2 delete shmoderpad &&
npm start"

