import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Text,
  Button,
  Alert,
} from '@trackunit/react-components';

export const App = () => {
  return (
    <div className="w-full h-full grid place-content-center">
      <Card className="w-full">
        <CardHeader
          heading="Welcome to your app extension"
          subHeading="Change the code in this file as you see fit"
        />
        <CardBody>
          <Alert color="success">
            You are now ready to develop your app extension.
          </Alert>
          <Text> We also have buttons</Text>
          <Button>Click me!</Button>
        </CardBody>
      </Card>
    </div>
  );
};
