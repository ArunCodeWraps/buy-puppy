import React, { useState } from "react";
import {
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  View,
} from "react-native";
import BackHeader from "../../component/buttons/BackHeader";
import color from "../../assets/theme/color";
import { SIZES } from "../../assets/theme/theme";
import WebView from "react-native-webview";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../store/cart/cartAction";
// import { WebView } from "react-native-webview";

function OnlinePayment({ navigation, route }) {
  const dispatch = useDispatch();
  const [data, setData] = useState(0);

  const handleBackpress = () => {
    if (data === 0) {
      navigation.goBack();
    } else if (data === 1) {
      setData(0);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.page}>
        <BackHeader navigation={handleBackpress} />
        <WebView
          originWhitelist={["*"]}
          source={{
            uri: `https://www.codewraps.in/beypuppy/payment.php?order_id=${route.params.order_id}`,
          }}
          onLoad={(event) => {
            if (event.nativeEvent.title === "Payment Success") {
              dispatch(emptyCart());
              Alert.alert("Payment", "Your Payment has been Successful!", [
                {
                  text: "OK",
                  onPress: () => navigation.replace("OrderSuccess"),
                },
              ]);
            }
          }}
          ref={(webView) => (this.webView = webView)}
        />
      </View>
    </SafeAreaView>
  );
}

export default OnlinePayment;
// card_number=4242424242424242
// cv=123

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
  },
  parentView: {
    flex: 1,
    // backgroundColor: "yellow",
  },
  mainView: {
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  tabView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderColor: color.primary_color,
  },
  btnView: {
    marginBottom: 10,
  },
  addressView: {
    paddingVertical: SIZES.height / 50,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: SIZES.width / 30,
    borderBottomWidth: 2,
    borderColor: color.primary_color,
  },
  addressType1: {
    flex: 0.8,
    // flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginHorizontal: SIZES.width / 40,
  },
  txt1: {
    fontSize: SIZES.h2 - 2,
    fontFamily: "RubikSemiBold",
    marginBottom: SIZES.height / 64,
  },
  txt2: {
    textAlign: "justify",
    fontSize: SIZES.h3 - 3,
    fontFamily: "RubikRegular",
  },
  radioBtnView: {
    flex: 0.2,
    alignItems: "flex-end",
  },
  paymentView: {
    marginTop: SIZES.height / 50,
    marginBottom: SIZES.height / 64 - 10,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: SIZES.width / 30,
    borderBottomWidth: 2,
    paddingVertical: 10,
    borderColor: color.primary_color,
  },
  bottomView: {
    alignItems: "center",
    justifyContent: "center",
  },
});
