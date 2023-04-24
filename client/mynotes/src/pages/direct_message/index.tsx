import { Web_Socket_Context } from "@/contexts/web_socket_context";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";

const Direct_Message: NextPage = (): JSX.Element => {
  const socket = useContext(Web_Socket_Context);
  useEffect(() => {
    socket.on(
      "message_return_from_server",
      (response: {
        username: string;
        message: string;
        room: string;
        date: string;
      }) => {
        set_message_list((prev_value) => [...prev_value, response]);
      }
    );
  }, [socket]);

  const [username, set_username] = useState<string>("");
  const [room, set_room] = useState<string>("");
  const [is_user_ready_to_chat, set_is_user_ready_to_chat] =
    useState<boolean>(false);
  const [message, set_message] = useState<string>("");
  const [message_list, set_message_list] = useState<Array<any>>([]);

  const handle_send_room_form_submit = () => {
    socket.emit("room_from_client", {
      room,
    });
    set_is_user_ready_to_chat(true);
  };
  const handle_send_message_form_submit = async (event: any) => {
    event.preventDefault();
    const message_content = {
      username,
      message,
      room,
      date:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await socket.emit("message_from_client", message_content);
    set_message_list((prev_value) => [...prev_value, message_content]);
    set_message("");
  };
  console.log("Message_List", message_list);
  return (
    <div>
      <p>Direct Message works!</p>
      {!!is_user_ready_to_chat ? (
        <>
          <form onSubmit={handle_send_message_form_submit}>
            {message_list.length > 0
              ? (message_list.map((current_message: any, index) => (
                  <div key={index}>
                    <p style={{textAlign: username == current_message.username ? "left" : "right"}}>
                      Message: <b>{current_message.message}</b> - Sender:{" "}
                      <b>{current_message.username}</b> - Date:{" "}
                      <b>{current_message.date}</b>
                    </p>
                  </div>
                )))
              : null}
            <input
              name="message"
              value={message}
              onChange={(e) => set_message(e.target.value)}
            />
            <button type="submit">Send Message</button>
          </form>
        </>
      ) : (
        <form onSubmit={handle_send_room_form_submit}>
          <input
            name="username"
            value={username}
            onChange={(e) => set_username(e.target.value)}
          />
          <input
            name="room"
            value={room}
            onChange={(e) => set_room(e.target.value)}
          />
          <button type="submit">Send Room</button>
        </form>
      )}
    </div>
  );
};
export default Direct_Message;
