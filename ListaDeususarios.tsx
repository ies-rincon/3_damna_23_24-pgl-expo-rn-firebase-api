import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./App";
type Props = NativeStackScreenProps<RootStackParamList, "Usuarios">;

const API = {
  local: "http://xxx.xxx.xxx.xxx:3000/users", // <-- Check your local ip address
  firebase: "https://damna-pgl-firebase-default-rtdb.firebaseio.com/users.json",
};
const ListaDeUsuarios: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(API.firebase)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({
    item,
  }: {
    item: RootStackParamList["Usuario"]["user"];
  }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigate("Usuario", { user: item })}
    >
      <Image source={{ uri: item.img }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="chevron-right" size={20} color="#555" />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loading]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    padding: 10,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    margin: 5,
    padding: 10,
  },
  avatar: {
    borderRadius: 25,
    height: 50,
    marginRight: 10,
    width: 50,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
  },
  iconContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: 30,
  },
});

export default ListaDeUsuarios;
