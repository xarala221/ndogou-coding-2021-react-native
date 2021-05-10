import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import * as yup from "yup";
import { FormError } from "./Login";

const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
export default class ConnexionPhone extends React.Component {
  state = {
    phone: "",
    errors: {},
  };

  Schema = yup.object().shape({
    phone: yup.string().matches(phoneRegExp, "Numéro innvalide"),
  });

  submit() {
    const { phone } = this.state;
    this.Schema.validate({ phone }, { abortEarly: false })
      .then(() => {
        Alert.alert("Félicitation", "ça marche");
      })
      .catch((ex) => {
        const errors = {};
        ex.inner.forEach((error) => {
          errors[error.path] = error.errors[0];
        });

        this.setState({ errors });
      });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 30,
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: "#fff",
        }}
      >
        <View style={{ margin: 20 }}>
          <Image
            source={require("../../assets/logoVert.png")}
            style={{ width: 36, height: 38 }}
          />
        </View>

        <View>
          <Text>Connectez-vous</Text>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            flexDirection: "row",
            alignItems: "center",
            height: 50,
            marginTop: 30,
            width: "100%",
            borderColor: "#F1F1F1",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <TextInput
            placeholder={"Entrer votre numero"}
            placeholderTextColor={"#5A5A5A"}
            onChangeText={(text) => this.setState({ phone: text })}
            keyboardType={"phone-pad"}
            style={{ paddingLeft: 10, width: "90%" }}
          />
        </View>
        <FormError value={this.state.errors.phone} />
        <View style={{ width: "100%", marginTop: 60 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#11BD9E",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
            }}
            onPress={() => this.submit()}
          >
            <Text style={{ color: "#FFF" }}>Se connecter</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: "100%", marginTop: 30 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              borderColor: "#11BD9E",
              borderWidth: 1,
            }}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={{}}>Se connecter avec adresse mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
