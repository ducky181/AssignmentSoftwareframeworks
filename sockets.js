
module.exports = {


    connect: function (io, PORT) {
        var channelArray = [];
        var nameArray= [];
        io.on("connection", (socket) => {
            console.log("User connection on port " + PORT + "  " + socket.id)







            for (let i = 0; i < localStorage.length; i++) {

                if (localStorage.key(i).slice(0, 4) != "data") {
                    nameArray.push(localStorage.getItem(localStorage.key(i)))

                }
            }

            for (let i = 0; i < nameArray.length; i++) {
                socket.join(nameArray[i]);
                console.log(" The local storage is", nameArray[i])
                channelArray.push(nameArray[i])
            }




         //   for (let i = 0; i < localStorage.length; i++) {
             //   socket.join(localStorage.getItem(localStorage.key(i)));
            //    console.log(" The local storage is", localStorage.getItem(localStorage.key(i)))
                 //   channelArray.push(localStorage.getItem(localStorage.key(i)))
                     //   }




            socket.on("message", (message) => {
                io.emit("message", message);
            });

            socket.on("join_room", (room) => {
                console.log("Notice");
                console.log(room)
                socket.join(room);
            });

            socket.on("EMIT", (room,MESSAGE) => {
                io.to(room).emit(room, MESSAGE)
                console.log(" The room choosed is ",room)
                localStorage.setItem("data" + room, MESSAGE + "\n" + localStorage.getItem("data" + room))
                console.log(" The message saids ", localStorage.getItem("data" + room))
                console.log(" Message sent to this room is ",MESSAGE)
                console.log(io.sockets.adapter.rooms)
            });

            socket.on("createRoom", (room) => {
                console.log("Room created");
                console.log(room)
                socket.join(room);
                localStorage.setItem(room,room)
                localStorage.setItem("data" + room,"")
                channelArray.push(room)
                console.log(io.sockets.adapter.rooms)
            });

            socket.on("getRooms", () => {
                console.log(io.sockets.adapter.rooms)
                for (let i=0; i < channelArray.length; i++) {
                    console.log(" The value is ", channelArray[i])
                    console.log("test")
                    io.emit("channel", channelArray[i]);
                }
            });



            socket.on("getData", (room) => {
                console.log();
                io.emit("data", localStorage.getItem("data"+room));

            });

            socket.on("clear", () => {
                localStorage.clear()
                channelArray = [];
                nameArray= [];

            });

            socket.on("remove", (value) => {
                localStorage.removeItem(value)
                channelArray = []
                console.log("remove ",value)

            });


        })


    }
}



