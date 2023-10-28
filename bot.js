const container=document.querySelector(".container");
const man=document.querySelector(".close");
const chatinput=document.querySelector(".container_text_input input");
const chatbutton=document.querySelector(".container_text_input i");
const chatbox=document.querySelector(".container_text_content");
const cross=document.querySelector("#cross");

let message;
const API_KEY = "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";

const createchatlist = (message,className)=>{
        const chatli=document.createElement("div");
        chatli.classList.add("chat" ,className);
        let chatcontent = className === "incoming" ?  `<p></p>`: ` <span class="fa-solid fa-robot"></span><p></p>`;
        chatli.innerHTML=chatcontent;
        chatli.querySelector("p").textContent=message;
        return chatli;
}

const generateresponse = (outgoingchat) => {
    const API_URL ="https://api.openai.com/v1/chat/completions"; 
    const messageElement=outgoingchat.querySelector("p");
    const requestoptions = {
        method: "POST" ,
        headers:{
            "Content-type" : "application/json" ,
            "Authorization": `Bearer ${API_KEY}`

        },
        body:JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{role: "user", content: message }]
        })

    }
    fetch(API_URL, requestoptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent = "Oppss! something went wrong ,please try again";

    }).finally(() => chatbox.scrollTo(0,chatbox.scrollHeight));

}

chatbutton.addEventListener("click",(e) =>{ 
    message=chatinput.value.trim();

// console.log(message);
    if(!message)return;
    chatinput.value="";

chatbox.appendChild(createchatlist(message,"incoming"));
chatbox.scrollTo(0,chatbox.scrollHeight);

setTimeout(()=>{
        const outgoingchat=createchatlist("Thinking.....","outgoing")
        chatbox.appendChild(outgoingchat);
        chatbox.scrollTo(0,chatbox.scrollHeight);
        generateresponse(outgoingchat);

},100);

      
});

man.addEventListener("click" ,(e) => {
    document.body.classList.toggle("active");     
});
cross.addEventListener("click" ,(e) => {
    document.body.classList.add("active");     
});


