# Setup & Configuration

First of all clone this repo and install the dependencies:

```sh
git clone git@github.com:SharinPix/aws-image-backup.git
cd aws-image-backup/
npm install
```

Once you have to configure appropriate environment variables.

**Note**: You can use the `.env` file for simplicity.

There are **four** environment variables to configure. Namely:
* **WEBHOOK_SECRET_KEY** - A secret key that will allow the Serverless to authenticate your webhook. You can generate a UUID and set the value here ([generate now](https://www.uuidgenerator.net/)). UUIDs are very long and alphanumeric, hence also a secure key!
* **BUCKET_NAME** - The AWS S3 bucket name in which you want to backup your SharinPix images.
* **SECRET_ACCESS_KEY** and **ACCESS_KEY_ID** - AWS secret and access key that will allow uploading images to the S3 bucket. (Ensure that it contains at-least write access to your AWS S3)

# Deploying Serverless

Since Serverless uses AWS, you must have two environment variables configured. Please follow the Serverless docs below before jumping to the next step.

[https://serverless.com/framework/docs/providers/aws/guide/credentials/]()

Once completed, you can now deploy your Serverless using the command below.

```
node_modules/.bin/serverless --stage=production
```

Once completed, you will receive an endpoint URL. Copy and paste this endpoint in your webhook URL field in your SharinPix admin webhook page.

**Remember** to also set the secret on your SharinPix admin webhook page exactly as the value of your `WEBHOOK_SECRET_KEY` enviroment variable.