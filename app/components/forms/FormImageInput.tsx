import { useFormikContext } from "formik";

import ImageInputList from "../ImageInputList";
import { ErrorMessage } from "../forms";

type FormImageInputProps = {
  name: string;
};

function FormImageInput({ name }: FormImageInputProps) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = (values as any)[name] as string[];

  const handleAdd = (uri: string) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = (uri: string) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri: string) => imageUri != uri),
    );
  };
  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage
        error={errors[name as keyof typeof errors]}
        visible={touched[name as keyof typeof touched]}
      />
    </>
  );
}

export default FormImageInput;
