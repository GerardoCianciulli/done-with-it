import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  Form,
  FormField,
  FormImageInput,
  FormPicker,
  SubmitButton,
} from "../components/forms";
import UploadScreen from "./UploadScreen";
import Map from "../components/Map";

import defaultStyles from "../config/styles";
import listingsApi from "../api/listings";
import useLocation from "../hooks/useLocation";

const validationSchema = Yup.object().shape({
  category: Yup.object().required().nullable().label("Category"),
  description: Yup.string().label("Description"),
  images: Yup.array().min(1, "Please select at least one image."),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  title: Yup.string().required().min(1).label("Title"),
});

const categories = [
  {
    label: "Furniture",
    iconName: "floor-lamp" as React.ComponentProps<
      typeof MaterialCommunityIcons
    >["name"],
    backgroundColor: "danger" as keyof typeof defaultStyles.colors,
    value: 1,
  },
  {
    label: "Cars",
    iconName: "car" as React.ComponentProps<
      typeof MaterialCommunityIcons
    >["name"],
    backgroundColor: "orange" as keyof typeof defaultStyles.colors,
    value: 2,
  },
  {
    label: "Cameras",
    iconName: "camera" as React.ComponentProps<
      typeof MaterialCommunityIcons
    >["name"],
    backgroundColor: "yellow" as keyof typeof defaultStyles.colors,
    value: 3,
  },
  {
    label: "Games",
    iconName: "cards" as React.ComponentProps<
      typeof MaterialCommunityIcons
    >["name"],
    backgroundColor: "green" as keyof typeof defaultStyles.colors,
    value: 4,
  },
  {
    label: "Clothing",
    iconName: "shoe-heel" as React.ComponentProps<
      typeof MaterialCommunityIcons
    >["name"],
    backgroundColor: "teal" as keyof typeof defaultStyles.colors,
    value: 5,
  },
  {
    label: "Sports",
    iconName: "basketball" as React.ComponentProps<
      typeof MaterialCommunityIcons
    >["name"],
    backgroundColor: "indigo" as keyof typeof defaultStyles.colors,
    value: 6,
  },
  {
    label: "Movies & Music",
    iconName: "headphones" as React.ComponentProps<
      typeof MaterialCommunityIcons
    >["name"],
    backgroundColor: "blue" as keyof typeof defaultStyles.colors,
    value: 7,
  },
  {
    label: "Books",
    iconName: "book-open-blank-variant" as React.ComponentProps<
      typeof MaterialCommunityIcons
    >["name"],
    backgroundColor: "mauve" as keyof typeof defaultStyles.colors,
    value: 8,
  },
  {
    label: "Other",
    iconName: "folder-settings-outline" as React.ComponentProps<
      typeof MaterialCommunityIcons
    >["name"],
    backgroundColor: "grey" as keyof typeof defaultStyles.colors,
    value: 9,
  },
];

type Listing = {
  category: {
    backgroundColor: string;
    iconName: string;
    label: string;
    value: number;
  };
  description: string;
  images: string[];
  location: { latitude: number; longitude: number } | null;
  price: string;
  title: string;
};

function ListingEditScreen() {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing: Listing, { resetForm }: any) => {
    setProgress(0);
    setUploadVisible(true);

    const result = await listingsApi.addloadListing(
      { ...listing, location },
      (progress: number) => setProgress(progress),
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }
    resetForm();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Form
        initialValues={{
          category: "",
          description: "",
          images: [],
          price: "",
          title: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImageInput name="images" />
        <FormField
          autoCapitalize="words"
          autoCorrect={false}
          autoComplete="off"
          inputMode="text"
          maxLength={50}
          name="title"
          placeholder="Title"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          inputMode="numeric"
          maxLength={5}
          name="price"
          placeholder="Price"
          width={100}
        />
        <FormPicker
          items={categories}
          name="category"
          placeholder="Category"
          width="50%"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          inputMode="text"
          maxLength={260}
          name="description"
          numberOfLines={4}
          multiline
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
      <Map location={undefined} />
    </SafeAreaView>
  );
}

export default ListingEditScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    width: 100,
  },
});
