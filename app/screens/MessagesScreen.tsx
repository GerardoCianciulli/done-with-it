import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SharedValue } from "react-native-reanimated";

import {
  ListItem,
  ListItemSeporator,
  ListItemDeleteAction,
} from "../components/lists";

import useAuth from "../hooks/useAuth";
import messagesApi from "../api/messages";
import logger from "../utility/logger";

type Message = {
  content: string;
  dateTime: number;
  fromUser: { id: number; name: string };
  id: number;
  listingId: number;
  toUser: { id: number; name: string };
};

function MessagesScreen() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const getMessages = async () => {
    const result = await messagesApi.getMessages();
    if (!result.ok) {
      return logger.log(new Error(result.originalError as any));
    }

    if (result.data && Array.isArray(result.data)) {
      const tempMessages = result.data.filter((value: Message) => {
        return value.toUser.id === user?.userId;
      });

      setMessages(tempMessages);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const handleDelete = (message: Message) => {
    // Delete mssage from messages
    setMessages(messages?.filter((m) => m.id !== message.id));
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.content}
            description={item.fromUser.name}
            numberOfLines={0}
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
        onRefresh={() => setMessages([])}
      />
    </View>
  );
}

export default MessagesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 20,
  },
});
