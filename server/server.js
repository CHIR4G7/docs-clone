const {Server} = require('socket.io');
const mongoose = require('mongoose')
const Document = require('./docModel');
mongoose.connect('mongodb://localhost:27017',{dbName:'docs-app'}).then(()=>console.log('db connected'));

const io = new Server(3030,{
    cors: {
        origin: 'http://localhost:5173',
        methods :['GET',"POST"]
    }
});

const defaultText = "";

const findOrCreateDoc = async (id)=>{
    
    if(id===null)
    {
        return
    }
    const doc = await Document.findOne({id:id});
    if(doc)
    {
        return doc;
    }
    const newdoc =  await Document.create({
        id:id,
        data: defaultText
    });
    return newdoc
}

io.on('connection',(socket)=>{
    console.log('user connected',socket.id)
   
    socket.on('get-document',async (documentID)=>{
        const document = await findOrCreateDoc(documentID);
        console.log(document);
        socket.join(documentID);//join a room in the room
        socket.emit('load-document',document.data);
        socket.on('changes',(data)=>{
            socket.broadcast.to(documentID).emit('receive-changes',data);
        });
        socket.on('save-document',async (data)=>{
            console.log(data);
            await Document.findOneAndUpdate({id:documentID},{data})
        })
    })
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    })
})