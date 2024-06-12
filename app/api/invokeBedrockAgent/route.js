import {
    BedrockAgentRuntimeClient,
    InvokeAgentCommand,
  } from "@aws-sdk/client-bedrock-agent-runtime";
  import { fromSSO } from "@aws-sdk/credential-providers";
import { NextResponse } from "next/server";
import { access_key_id, secret_access_key, session_token, region } from "../../helper/creds";


const invokeBedrockAgent = async (prompt, sessionId) => {

    const config = {
      region: "us-east-1", 
      credentials: {
          accessKeyId: access_key_id,
          secretAccessKey: secret_access_key,
          sessionToken: session_token,
          region: region
      }
    };

    const client = new BedrockAgentRuntimeClient(
        config
        // region: "us-east-1",
        // credentials: fromSSO({ profile: 'adam.wong' }) // Ensure it matches your AWS CLI profile
    );

    const agentId = "K1NJWMTU6Z";
    const agentAliasId = "ENSPSB0O3I";

    const command = new InvokeAgentCommand({
        agentId,
        agentAliasId,
        sessionId,
        inputText: prompt,
    });

    try {
        let completion = "";
        const response = await client.send(command);
    
        if (response.completion === undefined) {
          throw new Error("Completion is undefined");
        }
    
        for await (let chunkEvent of response.completion) {
          const chunk = chunkEvent.chunk;
          console.log(chunk);
          const decodedResponse = new TextDecoder("utf-8").decode(chunk.bytes);
          completion += decodedResponse;
        }
    
        return { sessionId: sessionId, completion };
      } catch (err) {
        console.error(err);
    }
}

const handler = async (req, res) => {

    if (req.method === 'POST') {

      const body = await req.json();
      const { query, sessionId } = body;

      console.log("This is body")
      console.log(body)
      console.log(sessionId)
      try {
        const result = await invokeBedrockAgent(query, sessionId);
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

export {handler as POST}