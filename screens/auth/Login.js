import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import * as yup from "yup";
export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    showPassword: true,
    errors: {},
  };

  Schema = yup.object().shape({
    email: yup.string().required().email().label("Adresse mail"),
    password: yup.string().required().label("Mot de passe").min(5),
  });

  submit() {
    const { email, password } = this.state;

    this.Schema.validate({ email, password }, { abortEarly: false })
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
            placeholder={"Adresse mail"}
            placeholderTextColor={"#5A5A5A"}
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
            keyboardType={"email-address"}
            style={{ paddingLeft: 10 }}
          />
        </View>
        <FormError value={this.state.errors.email} />

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
            placeholder={"Mot de passe"}
            placeholderTextColor={"#5A5A5A"}
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
            secureTextEntry={this.state.showPassword}
            style={{ paddingLeft: 10, width: "90%" }}
          />
          {!this.state.showPassword ? (
            <TouchableOpacity
              onPress={() => this.setState({ showPassword: true })}
            >
              <Entypo name="eye" size={24} color={"#11BD9E"} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => this.setState({ showPassword: false })}
            >
              <Entypo name="eye-with-line" size={24} color={"#11BD9E"} />
            </TouchableOpacity>
          )}
        </View>
        <FormError value={this.state.errors.password} />

        <View style={{ marginTop: 10, alignSelf: "flex-end" }}>
          <Text style={{ color: "rgba(0,0,0,0.8)", fontSize: 12 }}>
            Mot de passe oublié ?
          </Text>
        </View>

        <View style={{ width: "100%", marginTop: 30 }}>
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
            onPress={() => this.props.navigation.navigate("ConnexionPhone")}
          >
            <Text style={{}}>Se connecter avec un numero</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export function FormError({ value }) {
  return (
    <View style={{ alignSelf: "flex-start" }}>
      <Text style={{ color: "#F00", fontSize: 12 }}>{value}</Text>
    </View>
  );
}
