import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEME } from '@assets/styles';
import { CONTENT } from '@assets/data/content';
import { ScreenProps } from 'src/@types/screens';

interface HomeScreenProps extends ScreenProps<MainNavigatorParamList, 'Home'> {}

const HomeScreen = (props: HomeScreenProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top,
        },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity>
          <Feather name="menu" size={24} color={THEME.colors.white} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.greeting}>Hola, Sebastián</Text>
          <Text style={styles.date}>Lunes, 14</Text>
        </View>
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={require('@assets/images/Avatar.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBox}>
        <AntDesign name="search1" size={24} color={THEME.colors.accent} />
        <TextInput
          placeholderTextColor={THEME.colors.accent}
          style={styles.searchInput}
          placeholder="Buscar..."
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <Text style={styles.title}>
          Contenido{' '}
          <Text
            style={{
              fontWeight: '300',
              color: THEME.colors.accent,
            }}
          >
            (13)
          </Text>
        </Text>

        {CONTENT.map((element, index) => {
          return (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(
                  element.link as keyof MainNavigatorParamList
                )
              }
              key={`CONTENT__ITEM__${index}`}
              style={styles.contentItem}
            >
              <View
                style={[
                  styles.itemCheck,
                  {
                    backgroundColor: element.isCompleted
                      ? THEME.colors.cyan
                      : undefined,
                  },
                ]}
              >
                {element.isCompleted && (
                  <AntDesign
                    name="check"
                    size={16}
                    color={THEME.colors.white}
                  />
                )}
              </View>
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text style={styles.itemTitle}>{element.name}</Text>
                <Text style={styles.itemDesc} numberOfLines={2}>
                  {element.description}
                </Text>
              </View>
              <View style={styles.itemNew} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.darkBackground,
    paddingHorizontal: 20,
  },

  searchBox: {
    backgroundColor: THEME.colors.lightBackground,
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    alignSelf: 'center',
    paddingHorizontal: 26,
    marginBottom: 32,
  },

  searchInput: {
    color: THEME.colors.white,
    marginLeft: 14,
    fontSize: 16,
    fontWeight: '300',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  contentItem: {
    flexDirection: 'row',
    backgroundColor: '#282A49',
    marginBottom: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 42 / 2,
  },
  headerInfo: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 12,
    fontWeight: '300',
    color: THEME.colors.white,
    marginBottom: 6,
  },
  date: {
    fontSize: 26,
    fontWeight: '500',
    color: THEME.colors.white,
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: THEME.colors.white,
    marginBottom: 14,
  },
  itemTitle: {
    color: THEME.colors.white,
    fontWeight: '300',
    fontSize: 18,
    marginBottom: 2,
  },
  itemDesc: {
    color: THEME.colors.white,
    fontWeight: '300',
    fontSize: 12,
  },
  itemCheck: {
    marginRight: 12,
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    borderWidth: 0.5,
    borderColor: THEME.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemNew: {
    backgroundColor: THEME.colors.purple,
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    marginLeft: 20,
  },
});
