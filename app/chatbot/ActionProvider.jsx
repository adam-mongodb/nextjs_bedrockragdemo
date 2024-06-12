import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  //Define actions
  //Hello World Action
  const handleHello = () => {
    const botMessage = createChatBotMessage('How can I help you today?');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  //Bedrock Action 
  const handleQuery = async (query) => {
    var resp = ""
    try {
      const res = await fetch('/api/invokeBedrockAgent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, sessionId: '123' }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await res.json();

      console.log("This is data")
      console.log(data)
      resp = createChatBotMessage(data.completion)

    } catch (error) {
      console.error(error);
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, resp],
    }));
  }

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleQuery
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;