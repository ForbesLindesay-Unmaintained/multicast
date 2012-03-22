A server which sends and recieves multicast JSON messages to a single IP address and port number using UDP.

# Example Usage

```js
var send = require("multicast")(function(message, address, port){
    console.log(address + ":" + port + " says " + JSON.stringify(message));
});
send("hello world");
send({complexObject:[1,3,5]});
```

# Create Server (onMessage, options)

Multicast is a function to create a server.  It takes a callback to recieve messages, and options.

## Parameters

### onMessage(Message, Address, Port)

Called with the message as an object, the IP address the message is from as a string, and the port number as an int.

### Options

 - ip: set the IP address for multicasting, which should match 239.0.0.0/8 (i.e. the ip address should consist of 4 bytes separted by '.' and the first byte should be 239)
 - port: The port number for multicasting, any port number can be used, providing it's not already in use for something else.  The same port number should be used by all devices wishing to communicate.
 - socketType: defaults to udp4, you can use this to move to udp6 once ipv6 has widespread support (note that you'll also need to change the IP address.

## Returns Send(Message)

The function returned by creating the server is the send method.  Simply pass it any object which can be serialised to JSON to have it sent as a message, be aware that you'll recieve all your own messages back too.