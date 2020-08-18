# SmartBrain backend

You can find the backend repo of this application [here](https://github.com/DiogenesF/smartBrain-backend)

## Tecnologies
- React
- Clarifai API
- AWS

## Overview
This application is the frontend of an application that handles user authentication and detect faces in an image that the user can upload.

Every user has a profile that can be updated. The user image is stored in a bucket in AWS S3 and the link to that image is stored in a postgres database along with all the user information.

You can check [the code used to set up the bucket in AWS S3 using serverless here](https://github.com/DiogenesF/smartBrain-aws-s3).

[Clarifai](https://www.clarifai.com/) is a service that allows you to make use of Computer vision and AI using their API. You can start using the service for free.
I'm using their Face recognition service, I can upload an image and they will give me information about where the faces are located in the image.


## QuickStart
Clone the repo and in the root folder you can run:

```npm install``` and

```npm start```

After that the application will start

(You won't be able to see the AWS features working, to make it work you will have to set up the services with your AWS account
[Uploading images to AWS S3](https://github.com/DiogenesF/smartBrain-aws-s3)
and [Emojis in the rank](https://github.com/DiogenesF/smartBrain-lambda-badges)
)
