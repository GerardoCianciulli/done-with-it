import { useEffect, useState } from "react";
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
import categoriesApi from "../api/categories";
import useLocation from "../hooks/useLocation";
import { ColorsType } from "../config/colors";
import logger from "../utility/logger";

const validationSchema = Yup.object().shape({
  category: Yup.object().required().nullable().label("Category"),
  description: Yup.string().label("Description"),
  images: Yup.array().min(1, "Please select at least one image."),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  title: Yup.string().required().min(1).label("Title"),
});

export type ListingType = {
  category: {
    backgroundColor: ColorsType;
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
  const [categories, setCategories] = useState<any[]>([]);
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const getCategories = async () => {
    const result = await categoriesApi.getCategories();
    if (!result.ok) {
      return logger.log(new Error(result as any));
    }
    if (result.data && Array.isArray(result.data)) {
      setCategories(result.data);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async (listing: ListingType, { resetForm }: any) => {
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
