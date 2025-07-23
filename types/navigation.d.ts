import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}

export type RootTabParamList = {
  Home: undefined;
  Gatos: undefined;
  Favoritos: undefined;
  Mensagens: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootTabParamList, "Home">;
export type CatsScreenProps = NativeStackScreenProps<RootTabParamList, "Gatos">;
export type FavoritesScreenProps = NativeStackScreenProps<
  RootTabParamList,
  "Favoritos"
>;
export type MessagesScreenProps = NativeStackScreenProps<
  RootTabParamList,
  "Mensagens"
>;
