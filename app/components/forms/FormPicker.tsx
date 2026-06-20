import { DimensionValue } from "react-native";
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Picker from "../Picker";
import { ErrorMessage } from "../forms";

type FormPickerProps = {
  items: {
    backgroundColor:
      | "primary"
      | "secondary"
      | "yellow"
      | "black"
      | "darkGrey"
      | "grey"
      | "lightGrey"
      | "white"
      | "danger"
      | "orange"
      | "green"
      | "teal"
      | "indigo"
      | "blue"
      | "mauve";
    iconName: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
    label: string;
    value: number;
  }[];
  name: string;
  placeholder: string;
  width?: DimensionValue;
};

function FormPicker({ items, name, placeholder, width }: FormPickerProps) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <Picker
        items={items}
        numberOfColumns={3}
        onSelectItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedItem={(values as any)[name] as { label: string; value: number }}
        width={width}
      />

      <ErrorMessage
        error={errors[name as keyof typeof errors]}
        visible={touched[name as keyof typeof touched]}
      />
    </>
  );
}

export default FormPicker;
