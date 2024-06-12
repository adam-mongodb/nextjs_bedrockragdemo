import { useState, useRef } from "react"
import S3 from "aws-sdk/clients/s3"
import AWS from 'aws-sdk';
import { access_key_id, secret_access_key, session_token, region } from "../helper/creds"


const FilleUpload = () => {

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef(null)

    const handleFileChange = (e) => {
        // Uploaded file
        const file = e.target.files[0];
        // Changing file state
        setFile(file);
      };

      const uploadFile = async () => {
        if (!file) {
          alert("Please choose a file to upload.");
          return;
        }

        setUploading(true)
        const S3_BUCKET = "adamwong.demo/bestguide"; // Replace with your bucket name
        // const REGION = "us-east-1";

        AWS.config.update({
            accessKeyId: access_key_id,
            secretAccessKey: secret_access_key,
            sessionToken: session_token,
            region: region,
        });

        const s3 = new S3({
            params: { Bucket: S3_BUCKET },
            // region: REGION,
        });
        const params = {
            Bucket: S3_BUCKET,
            Key: file.name,
            Body: file,
        };

        try {
            const upload = await s3.putObject(params).promise();
            console.log(upload);
            setUploading(false);
            alert("File uploaded successfully.");
            fileInputRef.current.value = null;
            
      
        } catch (error) {
            console.error(error);
            setUploading(false)
            alert("Error uploading file: " + error.message); // Inform user about the error
            fileInputRef.current.value = null;
        }

      };


  return (
    <>
      <div className="">
        <input type="file" required onChange={handleFileChange} ref={fileInputRef}/>
        <button onClick={uploadFile}>{uploading ? 'Uploading...' : 'Upload File'}</button>
      </div>
    </>
  )
}

export default FilleUpload