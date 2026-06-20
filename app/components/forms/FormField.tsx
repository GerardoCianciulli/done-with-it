import { DimensionValue, TextInputProps } from "react-native";
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TextInput from "../TextInput";
import { ErrorMessage } from "../forms";

type FormFieldProps = {
  iconName?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  name: string;
  width?: DimensionValue;
} & TextInputProps;

function FormField({ iconName, name, width, ...otherProps }: FormFieldProps) {
  const { errors, setFieldTouched, setFieldValue, touched, values } =
    useFormikContext();

  return (
    <>
      <TextInput
        iconName={iconName}
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={(values as any)[name]}
        width={width}
        {...otherProps}
      />

      <ErrorMessage
        error={errors[name as keyof typeof errors]}
        visible={touched[name as keyof typeof touched]}
      />
    </>
  );
}

export default FormField;
