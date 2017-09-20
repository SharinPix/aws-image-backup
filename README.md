# Setup & Configuration

First clone this repo:

```sh
git clone git@github.com:SharinPix/aws-image-backup.git
```

then install the dependencies:

```sh
npm install
```

There are **four** environment variables to configure in the `serverless.yml` file. Namely:
* `WEBHOOK_SECRET_KEY` - Assign a strong and arbitrary secret to this variable.
* `BUCKET_NAME` - The AWS S3 bucket name in which you want to backup your SharinPix images.
* `SECRET_ACCESS_KEY` and `ACCESS_KEY_ID` - AWS secret and access key that will allow uploading images to the S3 bucket. (Ensure that it contains at-least write access to your AWS S3)

# Deploying Serverless

Since Serverless uses AWS, you must have two environment variables configured. Please follow the Serverless docs below before jumping to the next step.

[https://serverless.com/framework/docs/providers/aws/guide/credentials/](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

Once completed, you can now deploy your Serverless using the command below.

```
node_modules/.bin/serverless --stage=production
```

Once completed, you will receive an endpoint URL. Copy and paste this endpoint in your webhook URL field in your SharinPix admin webhook page.
**Remember** to assign the `WEBHOOK_SECRET_KEY` that you created to the webhook `Secret` field on the SharinPix admin webhook page.