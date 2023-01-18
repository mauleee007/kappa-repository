import { NativeModules } from 'react-native';

const { OpenApplication } = NativeModules;

const launchApp = (packageName: string): Promise<any> => {
  return OpenApplication.launch(packageName);
};

export { launchApp };
