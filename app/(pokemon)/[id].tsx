import {View, StyleSheet, Text,Image} from "react-native";
import {useLocalSearchParams, useNavigation} from "expo-router";
import {useEffect, useState} from "react";
import {getPokemonDetail, Pokemon} from "@/api/pokeapi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Ionicons} from "@expo/vector-icons";

export default function DetailPage(){
    const {id} = useLocalSearchParams<{id: string}>()
    const [details, setDetails] = useState<Pokemon>();
    const [isFavorite, setIsFavorite] = useState(false);
    const navigation = useNavigation()

    useEffect(() => {
        const load = async () => {
            const details = await getPokemonDetail(id!)
            setDetails(details)
            navigation.setOptions({
                title: details.name
            })
            const isFavorite = await AsyncStorage.getItem(`favorite-${id}`)
            setIsFavorite(isFavorite === 'true')
        }
        load()
    }, [id])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <Text onPress={toggleFavorite}>
                    <Ionicons name={isFavorite ? 'star' : 'star-outline'} size={24} color={isFavorite ? 'gold' : 'white'} />
                </Text>
        })
    }, [isFavorite]);

    const toggleFavorite = async ()=> {
        await AsyncStorage.setItem(`favorite-${id}`, !isFavorite ? 'true' : 'false');
        setIsFavorite(!isFavorite)
    }

    return (
        <View style={{padding: 10}}>
            {details && (
                <>
                    <View style={[styles.card, {alignItems: 'center'}]}>
                        <Image source={{uri: details.sprites.front_default}} style={{width: 200, height: 200}}/>
                        <Text style={styles.name}>
                            #{details.id} {details.name}
                        </Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={{fontSize: 16, fontWeight:"bold"}}>Stats:</Text>
                        {details.stats.map((item: any) => (<Text key={item.stat.name}>{item.stat.name}: {item.base_stat}</Text>))}
                    </View>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,
        gap: 4
    },
    name: {
        fontSize: 20,
        textTransform: 'capitalize',
        fontWeight: "bold",
    }
})
