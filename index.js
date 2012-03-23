//ip should usually begin 239, port can be any number.

/**
 * Sends an recieves multicast JSON messages asyncronously
 * @param {function(message, address, port)}    onMessage   A function to call when a message is recieved
 * @param {object}  [options]                   Optional object containing options
 * @param {string}  [options.ip]                A string containing the IP address of the multicast group, which should match 239.0.0.0/8
 * @param {int}     [options.port]              A port number for the multicast group, must be the same for everyone.
 * @param {string}  [options.socketType]        The type of socket to use (defaults to "udp4")
 * @return {function(message)}  Send message function
 */
module.exports = function multicast(onMessage, options) {
    var dgram = require("dgram");
    options = options || {};
    var port = options.port || 41834;
    var ip = options.ip || "239.0.0.73";
    
    var server = dgram.createSocket(options.socketType||"udp4");

    server.on("listening", function () {
        console.log("Multicast server listening " + ip + ":" + port);
    });

    server.bind(port);
    server.addMembership(ip);


    server.on("message", function (msg, rinfo) {
        onMessage(JSON.parse("" + msg), rinfo.address, rinfo.port);
    });

    return function sendMessage(m) {
        var message = new Buffer(JSON.stringify(m));
            server.send(message, 0, message.length, port, ip);
    };
};