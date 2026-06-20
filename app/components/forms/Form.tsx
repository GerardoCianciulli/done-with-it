import { ReactNode } from "react";
import { FormikHelpers, Formik } from "formik";

type FormProps = {
  initialValues: object;
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void;
  validationSchema: object;
  children: ReactNode;
};

function Form({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: FormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default Form;
