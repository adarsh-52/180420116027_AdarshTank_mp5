var udp = require('dgram');

var server = udp.createSocket('udp4');
server.on('error', function(error) {
    console.log('Error: ' + error);
    server.close();
});
server.on('message', function(num, info) {
    console.log('Data received from client : ' + num.toString());
    function getSum(num)
{
    var sum = 0;
    while (num != 0) {
        sum = sum + num % 10;
        num = parseInt(num / 10);
    }
    return 'Sum = ' +sum;
}

    server.send(getSum(num), info.port, 'localhost', function(error) {
        if (error) {
            client.close();
        } else {
            console.log('Sum of number is calculated');
        }
    });
});

server.on('listening', function() {
    var address = server.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log('Server is listening at port' + port);
    console.log('Server ip :' + ipaddr);
    console.log('Server is IP4/IP6 : ' + family);
});

server.on('close', function() {
    console.log('Socket is closed !');
});
server.bind(2222);
setTimeout(function() {
    server.close();
}, 8000);