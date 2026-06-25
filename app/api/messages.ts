import client from "./client";

const getMessages = () => client.get("/messages");

export default {
  getMessages,
};
