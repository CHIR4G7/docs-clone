import React, { useCallback, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";


const SAVE_INTERVAL_MS = 10000;

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const toolbarOptions2 = [
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  // remove formatting button
];

const TextEditor = () => {
  const [socket, setSocket] = useState(null);
  const [quill, setQuill] = useState(null);

  const {id} = useParams();//the document id
  
  //to connect to sockets
  useEffect(() => {
    const socket = io("http://localhost:3030");
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  //to check for changes and send them to the server
  useEffect(() => {
    if (socket == null || quill == null) {
      return;
    }

    const handler = (delta, oldDelta, source) => {
      if (source != "user") {
        return;
      }
      socket.emit("changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  //to update those changes to everone who is viewing that document
  useEffect(() => {
    if (socket == null || quill == null) {
      return;
    }

    const handler = (delta, oldDelta, source) => {
      quill.updateContents(delta);
    };
    socket.on('receive-changes',handler)

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  //to load the document 
  useEffect(()=>{
    if(socket==null || quill==null)
    {
      return;
    }
    socket.once('load-document',(document)=>{
      quill.setContents(document);
      quill.enable();
    })
    socket.emit('get-document',id);
  },[socket,quill,id])

  //to save the document
  useEffect(()=>{
    if(socket==null || quill==null)
    {
      return;
    }
    const interval = setInterval(()=>{
      socket.emit('save-document',quill.getContents());
    },SAVE_INTERVAL_MS);//save the docuemnt every 10 second
    return ()=>{
      clearInterval(interval);
    }
  },[socket,quill])

  const wrapperRef = useCallback((wrapper) => {
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: window.screen.width > 750 ? toolbarOptions : toolbarOptions2,
      },
    });
    q.disable();
    q.setText("Loading..");
    setQuill(q);
  }, []);
  return (
    <>
      <div id="container" ref={wrapperRef} className="w-full "></div>
    </>
  );
};

export default TextEditor;
