import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Input, Icon } from "@rneui/themed";
import { Button } from "@rneui/base";
import { IconText, ModalBottom } from "../../components";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { showMessage } from "react-native-flash-message";

import axios from "axios";
import { Space } from "../../components/atoms";
const windowWidth = Dimensions.get("window").width;

const EditCartegory = ({ route }) => {
  const { Cname, cId, img } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [imgUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState(Cname);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const uploadImage = async () => {
    setLoading(true);
    setMessage("");

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      //setImageType(result.type);
      var uuri = result.uri;
      var utype = result.type;
      const newImageUri = "file:///" + uuri.split("file:/").join("");

      const formData = new FormData();

      formData.append("files", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop(),
      });

      axios
        .post("http://localhost:1337/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setLoading(false);

          const [
            {
              formats: {
                medium: { url },
              },
            },
          ] = res.data;
          var imageId = url;
          setImageUrl(imageId);
        })
        .catch((error) => {
          setLoading(false);

          console.log(error);
        });
    }
  };
  const captureImage = async () => {
    setLoading(true);
    setMessage("");

    console.log(uid);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      // setImageUri(result.uri);
      //setImageType(result.type);
      var uuri = result.uri;
      var utype = result.type;
      const newImageUri = "file:///" + uuri.split("file:/").join("");

      const formData = new FormData();

      formData.append("files", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop(),
      });

      axios
        .post("http://localhost:1337/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setLoading(false);

          const [
            {
              formats: {
                medium: { url },
              },
            },
          ] = res.data;
          var imageId = url;
          setImageUrl(imageId);
        })
        .catch((error) => {
          setLoading(false);

          console.log("2" + error);
        });
    }
  };
  const isFormValid = () => {
    if (imgUrl === "" || name === "") {
      setMessage(() => <Text>All fields are required!</Text>);
      setLoading(false);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    setMessage("");
    setLoading(true);

    var q = JSON.stringify(name);

    await axios
      .put(`http://localhost:1337/api/restaurants/${cId}`, {
        data: {
          name: q,

          image: imgUrl,
        },
      })
      .then((res) => {
        setLoading(false);
        showMessage({
          message: "Saved.",
          // description: "All fields are required",
          type: "success",
          backgroundColor: "orange",
          color: "#fff",
          icon: "success",
          //position: "right",
          statusBarHeight: "34",
        });
      })
      .catch((error) => {
        setLoading(false);
        showMessage({
          message: "Edit failed, try again.",
          // description: "All fields are required",
          type: "warning",
          backgroundColor: "orange",
          color: "#fff",
          icon: "warning",
          //position: "right",
          statusBarHeight: "34",
        });
      });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: windowWidth / 3 }}>
        <Input
          defaultValue={Cname}
          placeholder="Name a Cartegory"
          onChangeText={(text) => setName(text)}
        />
      </View>
      <Space height={30} />

      <ImageBackground
        source={{
          uri: image,
        }}
        style={styles.avatar}
      >
        <TouchableOpacity
          style={{
            top: 140,
            backgroundColor: "black",
            paddingVertical: 13,
            alignItems: "center",
            opacity: 0.8,
          }}
          onPress={toggleModal}
        >
          <View>
            <Text
              style={{
                color: "#fff",
                fontFamily: "CircularStdBold",
                fontSize: 14,
              }}
            >
              Upload
            </Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
      <Space height={30} />
      <Text style={{ textAlign: "center", fontSize: 13, color: "#EF4444" }}>
        {message}
      </Text>
      <Button
        onPress={() => handleSubmit()}
        loading={loading}
        title="Submit"
        buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)", height: 80 }}
        containerStyle={{
          width: windowWidth / 3,
          marginHorizontal: 30,
          marginVertical: 10,
        }}
        titleStyle={{
          color: "white",
          marginHorizontal: 20,
          fontWeight: "900",
          fontSize: 20,
        }}
      />
      <ModalBottom
        onBackdropPress={toggleModal}
        isVisible={isModalVisible}
        onPress={toggleModal}
        label="Close"
      >
        <TouchableOpacity onPress={captureImage}>
          <IconText icon="📷" text="Take Photo" />
        </TouchableOpacity>
        <Space height={10} />
        <TouchableOpacity onPress={uploadImage}>
          <IconText icon="🖼" text="Choose From Gallery" />
        </TouchableOpacity>
        <Space height={20} />
      </ModalBottom>
    </View>
  );
};

export default EditCartegory;

const styles = StyleSheet.create({
  item: {
    aspectRatio: 1,
    width: "25%",
  },
  avatar: {
    overflow: "hidden",
    borderRadius: 20,
    width: 180,
    height: 180,
    backgroundColor: "grey",
  },
});