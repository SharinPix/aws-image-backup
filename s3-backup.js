const S3 = new AWS.S3({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID
});
const WEBHOOK_SECRET_KEY = process.env.WEBHOOK_SECRET_KEY;
const BUCKET_NAME = process.env.BUCKET_NAME;

const https = require('https');
const AWS = require('aws-sdk');
const querystring = require('querystring');

let generateOk = function(body) {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        },
        body: JSON.stringify(body)
    };
}

exports.handler = (event, context, callback) => {
    event['payload'] = event.body;
    event['eventName'] = event.headers['X-Sharinpix-Event'];
    event['secret'] = event.headers['X-Sharinpix-Secret'];
    if (event.eventName !== 'new_image' || event.secret !== WEBHOOK_SECRET_KEY) {
        return callback(null, generateOk('{"success": false, "message": "Unknown event type or wrong secret key.", "received": "' + event.eventName + '"}'));
    }
    let actualPayload = JSON.parse(querystring.unescape(querystring.decode(event.payload).p));
    let secureUrl = actualPayload.infos.secure_url;
    https.get(secureUrl, (res, error) => {
        const { statusCode } = res;
        if (error || statusCode !== 200) {
            callback(null, generateOk('{"success": false, "message": "Image URL did not returned 200 status"}'));
        } else {
            let rawData = [];
            res.on('data', function(chunk) {
                rawData.push(chunk);
            });
            res.on('end', function() {
                var buffer = Buffer.concat(rawData);
                S3.upload({
                    Bucket: BUCKET_NAME,
                    Key: actualPayload.album.public_id + '/' + actualPayload.infos.original_filename + '_' + actualPayload.public_id + '.' + actualPayload.infos.format,
                    Body: buffer
                }, function(err) {
                    if (err) {
                        callback(null, generateOk('{"success": false, "message": "S3 upload failed, maybe wrong credentials or wrong permissions"}'));
                    } else {
                        callback(null, generateOk('{"success": true}'));
                    }
                });
            });
        }
    })
};