import { DimensionValue } from "react-native";
import { useFormikContext } from "formik";

import Picker from "../Picker";
import { PickerItemType } from "../PickerItem";
import { ErrorMessage } from "../forms";

type FormPickerProps = {
  items: PickerItemType[];
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
