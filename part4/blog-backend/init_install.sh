npm init

npm install express # json parse middleware
npm install --save-dev nodemon # auto restart for dev
npm install eslint --save-dev
npm install morgan # log middleware
npm install cors
npm install mongoose # mongdb api
npm install dotenv
npm install --save-dev jest
npm install --save-dev supertest
npm install express-async-errors

# init
npx eslint --init
npx eslint index.js
npx eslint index.js --fix

# sub test
npm test -- tests/blog_api.test.js
npm test -- -t "blogs are returned as json"
