import React from 'react';

const MessageParser = ({ children, actions }) => {
  
  const parse = (message) => {
    const lower_message = message.toLowerCase();
    //console.log(message);
    if (lower_message.includes('hello') || lower_message.includes('hi')) {
      //console.log('hi');
      actions.handleHello();
    } else {
      actions.handleQuery(message);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;
