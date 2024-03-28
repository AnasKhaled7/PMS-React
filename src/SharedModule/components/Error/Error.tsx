import Alert from "react-bootstrap/Alert";

interface Props {
  message: string;
}

const Error = ({ message }: Props) => {
  return (
    <Alert variant="danger">
      <Alert.Heading>Something went wrong! Please try again.</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
};

export default Error;
