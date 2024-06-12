const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");
import { NextResponse } from "next/server";
import { access_key_id, secret_access_key, session_token, region } from "../../helper/creds";

const listObjects = async () => {

    const S3_BUCKET = "adamwong.demo/bestguide";
    const S3_PREFIX = "adamwong.demo";

    const config = {
        region: "us-east-1", 
        // endpoint: "https://s3.us-east-1.amazonaws.com",
        credentials: {
            accessKeyId: access_key_id,
            secretAccessKey: secret_access_key,
            sessionToken: session_token,
            region: region
        }
    };

    const client = new S3Client(config);
        const input = {
            Bucket: S3_PREFIX,
            // Prefix: S3_PREFIX
        }

    const command = new ListObjectsV2Command(input);

    try {
        const files = await client.send(command);
        console.log(files);

        return files;
    } catch (error) {
        console.error(error);
        // alert("Error uploading file: " + error.message); // Inform user about the error
    }
}

const handler = async (req, res) => {

    if (req.method === 'GET') {

        try {

            const result = await listObjects();
            console.log("This is result")
            console.log(result)

            return NextResponse.json(result, {
                status: 200,
            })

        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

export {handler as GET}