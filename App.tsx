import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListaDeUsuarios from "./ListaDeususarios";
import DetallesUsuario from "./DetallesUsuario";

export type RootStackParamList = {
  Usuarios: undefined;
  Usuario: { user: { [key: string]: string } };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Usuarios" component={ListaDeUsuarios} />
      <Stack.Screen name="Usuario" component={DetallesUsuario} />
    </Stack.Navigator>
  </NavigationContainer>
);
