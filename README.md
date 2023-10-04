# 🐦 X Clone: A Twitter Replica

Welcome to X Clone! This project replicates the core features of Twitter, using ReactJS, Firebase, ExpressJS, Redux, and Rest APIs. Whether you're looking to learn how such a platform is built or you'd like to contribute, you're in the right place.

![Screenshot of X Clone in action](https://firebasestorage.googleapis.com/v0/b/realchat-4fd5d.appspot.com/o/Screenshot%202023-10-04%20133109.png?alt=media&token=93bc733c-975c-48a8-b36c-c79d916fb680)
## 📂 Repositories

This repository contains the frontend code for X Clone. For the backend code, please visit the [X Clone Backend Repository](https://github.com/AymaneChabat/xclone-backend).
## ✨ Features

- 🔐 **User Authentication**: Sign up, login, and log out using firestore authentication.
- 🗨️ **Tweeting**: Users can post tweets with a character limit, images, and GIFs using firebase firestore and firebase storage to store the files (images, GIFs...).
- 👥 **Follow/Unfollow**: Users can follow or unfollow other users.
- 📡 **Feed**: See the latest tweets made by all users or from those you follow.
- 📰 **Personal Feed**: See the latest posts, replies, likes and media posts made by any user in their profile.
- 👤 **Profile Management**: Update personal details, profile, and cover photos.
- 🔍 **Search**: Allows users to easily search for and navigate to other user profiles.
- ✉️ **Real-Time Messaging**: Send and Receive messages with other users in real-time.

## 🔧 Technologies Used

This project was developed with a combination of technologies to ensure an optimal user experience and efficient performance. The following main technologies were used:

- **[ReactJS](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[Firebase](https://firebase.google.com/)**: A platform offering a variety of tools and infrastructure needed to build better web and mobile apps.
- **[ExpressJS](https://expressjs.com/)**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **[Redux](https://redux.js.org/)**: A predictable state container for JavaScript apps.
- **[Tailwind CSS](https://tailwindcss.com/docs/installation)**: A predictable state container for JavaScript apps.
- **[Create React App](https://github.com/facebook/create-react-app)**: A tool to set up a new React project with a good default configuration.
- **REST APIs**: To communicate with backend services and get/send data.

## 🚀 Setup

To run the project locally, follow these steps:
1. Clone the project:
```
    git clone https://github.com/AymaneChabat/X-Clone.git
```
2. Navigate to project directory and Install dependencies:
```
    cd X-Clone && npm i
```
> Following steps are for users who want to run the project with their own firebase app.
3.  Visit **[Firebase](https://console.firebase.google.com/)**
4.  Create an App
5.  Go to project settings and copy configs which will look something like this:
```
     const firebaseConfig = {
      apiKey: ...,
      authDomain: ...,
      databaseURL: ...,
      projectId: ...,
      storageBucket: ...,
      messagingSenderId: ...,
      appId: ... 
    };
```
6.  Access the file config inside folder functions and update the firebaseConfig constant and the domain to expressJs server we will start in next steps
7.  Clone the backend repo:
```
  git clone https://github.com/AymaneChabat/xclone-backend.git
```
8.  Open the Backend folder and access config.js file
9.  Change the firebaseConfig to the one linked to your App
10. Now go to index.js, choose your port or leave it as 9001
11. Go back to Frontnd folder and update domain to http://localhost: + the port you picked
12. You are all set, all that is left is to run ```npm start``` in both folders


## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](URL_TO_LICENSE.md) file for details.
