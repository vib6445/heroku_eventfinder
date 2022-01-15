## Announces node js project
npm init

## Framework for the server backend
npm i --save-dev @types/express

## Security: User receives token when logged in, user then can send the token to the server every time he/she starts a request. Thus, the server can check if the token is still valid.
npm i --save-dev @types/jsonwebtoken

## Cross origin resource sharing: Necessary as database and backend server are located on different adresses
npm i --save-dev @types/cors

## Librabry for accessing MongoDB
mongoose

## Make it typescript compatible
npm install --save-dev typescript

## Automatically restarts server after saving changes // quality of life
npm install --save-dev nodemon

## For whatever …
npm install -g ts-node

## .env
Damit die Server-Verbindung nicht in Klartext übertragen wird

## To kill node servers in the background
sudo killall node