import { useState } from "react";
import { BedrockAgentClient, StartIngestionJobCommand } from "@aws-sdk/client-bedrock-agent";
// import AWS from 'aws-sdk';
// import { fromSSO } from "@aws-sdk/credential-providers";
import { access_key_id, secret_access_key, session_token, region } from "../helper/creds";

const StartIngestionJob = () => {

    const [ingestion, setIngestion] = useState(false);

    const startIngestionJob = async () => {

        setIngestion(true);

        const config = {
            region: "us-east-1", 
            credentials: {
                accessKeyId: access_key_id,
                secretAccessKey: secret_access_key,
                sessionToken: session_token,
                region: region
            }
        };
        
        const client = new BedrockAgentClient(config);
        const input = {
            knowledgeBaseId: "EIDHBCDS6B", // required
            dataSourceId: "R22EMGFLNK", // required
        }
        const command = new StartIngestionJobCommand(input);

        try {
            const response = await client.send(command);
            console.log(response)
            setIngestion(false);
            alert("Ingestion started successfully.");
        } catch (error) {
            console.error(error);
            alert("Error starting ingestion: " + error.message);
            setIngestion(false);
        }

    }


  return (
    <>
        <button onClick={startIngestionJob}>{ ingestion ? 'Ingesting...' : 'Start Ingestion Job' }</button>
    </>
  )
}

export default StartIngestionJob