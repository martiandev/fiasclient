import dateformat from 'dateformat';
import express from 'express';
import cors from 'cors';
import net from 'net';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const port = process.env.PORT || 9125;

const client = new net.Socket();

client.connect({ port: 9124 }, process.argv[2], () => {
//   client.write(`LS`);
client.write(`DR|RN2781|G#12345|GNGast, Hr.|GLGE|`);
    // client.write(`GC|RN2781|G#12345|GNGast, Hr.|GLGE|`);
    // client.write(`GI|RN2781|G#12381|GNSharer, Dr.|GLEA|GV0|GGA123|GSY|`);
    // client.write(`GO|RN9327|G#12345|GSN|`);

}); 


client.on('data', (data) => {
    onMessage(client,data.toString('utf-8'));
});

app.use(cors());
app.use(express.json());
app.listen(
    port, 
    () => {
        console.log(`Server is running on port: ${port}`);
    }
);

 const sendLD = async (socket) => {

    var d = new Date(); 
    var date = dateformat(d,'yymmdd');
    var time = dateformat(d,'hhMMss');
    var version = "1.1";
    var intf = "PB";
    var gi = "RNG#GNGLGVGGGSSF";
    var go = "RNG#GSSF";
    var gc = "FLRNG#GNGLGVGGGSROA0A1";
    socket.write(`LD|DA${date}|TI${time}|V#${version}|IF${intf}`);

    if(gi)
    {
        await delay(100);
        socket.write(`LR|RIGI|FL${gi}|`);
    }
    if(gc)
    {
        await delay(100);
        socket.write(`LR|RIGC|FL${gc}|`);
    }
        if(go)
    {
        await delay(100);
        socket.write(`LR|RIGO|FL${go}|`);
    }
    await delay(100);
    socket.write(`LA|DA${date}|TI${time}|`);
};
function onMessage(socket,message)
{
    var d = new Date(); 
    var date = dateformat(d,'yymmdd');
    var time = dateformat(d,'hhMMss');
    console.log(`FIAS:${message}`);
    if(message.startsWith("LS"))
    {
        sendLD(socket);
    }
    else if (message.startsWith("LA"))
    {
        
    }
    else if (message.startsWith("LE"))
    {
        console.log(`Message does not start with S`);
    }
    else if (message.startsWith("LD"))
    {
        console.log(`Message does not start with S`);
    }
    else if (message.startsWith("LR"))
    {
        console.log(`Message does not start with S`);
    }

}

