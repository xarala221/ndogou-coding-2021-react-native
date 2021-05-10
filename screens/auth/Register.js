import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import Input from "../../shared/Input";
import * as yup from "yup";

export default class Register extends React.Component {
  state = {
    email: "",
    password: "",
    confirmPassword: true,
    username: "",
    errors: {},
  };

  Schema = yup.object().shape({
    email: yup.string().required().email().label("Adresse mail"),
    username: yup.string().required().label("Prénom & Nom"),
    password: yup.string().required().label("Mot de passe").min(5),
    confirmPassword: yup
      .string()
      .required()
      .label("COnfirmer mot de passe")
      .test(
        "passwords-match",
        "Confirmer mot de passe doit correspondre au mot De Passe",
        function (value) {
          return this.parent.password === value;
        }
      ),
  });

  submit() {
    const { email, password, confirmPassword } = this.state;

    this.Schema.validate(
      { email, password, confirmPassword },
      { abortEarly: false }
    )
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

  onChange(text, name) {
    this.setState({ [name]: text });
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
          <Text>Inscrivez-vous</Text>
        </View>
        <Input
          placeholder={"Prénom & Nom"}
          value={this.state.username}
          onChange={(text) => this.onChange(text, "username")}
        />
        <Input
          placeholder={"Adresse mail"}
          value={this.state.email}
          keyboardType={"email-address"}
          onChange={(text) => this.onChange(text, "email")}
        />
        <Input
          placeholder={"Mot de passe"}
          value={this.state.password}
          show
          onChange={(text) => this.onChange(text, "password")}
        />
        <Input
          placeholder={"Confirmer votre mot de passe"}
          value={this.state.confirmPassword}
          show
          onChange={(text) => this.onChange(text, "confirmPassword")}
        />

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
            <Text style={{ color: "#FFF" }}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 50 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text>
              Déjà inscrit ?
              <Text style={{ fontWeight: "bold" }}> Se connecter</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
