# Welcome to buddy !!

This is a React JS web app.
It is deployed on

 1. [Render](https://t1m-react-b3.onrender.com/)
 2. [Netlify](https://t1m-react-b3.netlify.app)

## Steps to follow for development on Local

You need backend running on your local. To do that follow these steps

 1. Clone [backend repo](https://github.com/gani-paircode/address-book)
 2. Install all dependencies - `npm i`
 3. Start the server `npm run start`
 
 This should run the development backend server on the port `5000`
 Confirm it by running the curl command on local. Find more details [here](https://github.com/gani-paircode/address-book#readme).
 
 Now it's time to setup frontend.
 
 1. Clone this repo 
 2. Install all dependencies run `npm i`
 3. Create `.env` file in the root directory.
 4. Add this entry `REACT_APP_API_BASE_URL=http://localhost:5000` in `.env` file.
 4. Start the server - `npm run start`
 5. During development, your backend api's base url will be `http://localhost:5000`. At the time of deployment it will be required to change.

If you don't want to setup backend repo on your local then directly put the URL of backend service as the value of `REACT_APP_API_BASE_URL`.

## For deployment

This web app needs only one environment variable and that is `REACT_APP_API_BASE_URL`
Deploy the backend service on render.com and get the base URL.
Now you can set  this URL as value of `REACT_APP_API_BASE_URL`. Learn more about how to configure them for making production build.

 1. [Link](https://render.com/docs/configure-environment-variables#configuring-secrets-and-other-environment-information-on-render) for render.com
 2. For netlify you can refer following image
    
 ![Screenshot 2023-07-30 021848](https://github.com/gani-paircode/react-b3/assets/117721790/2ce45c0c-7e38-4263-ba84-6795572532c0)

 
