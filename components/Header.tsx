import { StyleSheet, View, Image, TouchableOpacity, Text} from "react-native";
import React from "react"
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const Header = () => {
  return (
    <View style={styles.container}>
        <View style={styles.userInfo}> 
            {/* <Image
                source={{ uri: "https://xsgames.co/randomusers/avatar.php?g=female"}}
                style={styles.userImg}
            /> */}
            <View>
                {/* <Text style={styles.welcomeTxt}>PUKUPAW.NEWS</Text> */}
                <Text style={styles.userName}>PUKUPAW.NEWS</Text>
            </View>
        </View>

        <TouchableOpacity onPress={() => {}}>
            <Ionicons name="notifications-outline" size={24} color={Colors.white} />
        </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: Colors.tint,
    padding: 20
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  welcomeTxt: {
    fontSize: 12,
    color: Colors.darkGrey
  },
  userName: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.white,
  }
});
