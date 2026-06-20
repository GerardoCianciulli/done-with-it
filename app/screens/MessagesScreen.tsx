import { useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SharedValue } from "react-native-reanimated";

import {
  ListItem,
  ListItemSeporator,
  ListItemDeleteAction,
} from "../components/lists";

const initialMessages = [
  {
    id: "1",
    title:
      "T1 Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description:
      "D1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imagePath: require("../assets/avatar.png"),
  },
  {
    id: "2",
    title:
      "T2 Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description:
      "D2 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imagePath: require("../assets/avatar.png"),
  },
  {
    id: "3",
    title:
      "T3 Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description:
      "D3 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imagePath: require("../assets/avatar.png"),
  },
  {
    id: "4",
    title:
      "T4 Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description:
      "D4 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imagePath: require("../assets/avatar.png"),
  },
];

type Message = {
  id: string;
  title: string;
  description: string;
  imagePath: any;
};

function MessagesScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message: Message) => {
    // Delete mssage from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            description={item.description}
            imagePath={item.imagePath}
            renderRightActions={(
              progress: SharedValue<number>,
              dragX: SharedValue<number>,
            ) => {
              return (
                <ListItemDeleteAction onDelete={() => handleDelete(item)} />
              );
            }}
            showChevrons={true}
          />
        )}
        ItemSeparatorComponent={<ListItemSeporator />}
        refreshing={refreshing}
        onRefresh={() => setMessages(initialMessages)}
      />
    </SafeAreaView>
  );
}

export default MessagesScreen;
