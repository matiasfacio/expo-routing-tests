import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {Link} from "expo-router";
import {useEffect, useState} from "react";
import {getPokemon, Pokemon} from "@/api/pokeapi";
import {Ionicons} from "@expo/vector-icons";
const Page =()=>{
const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    useEffect(() => {
        const load = async ()=> {
            const result = await getPokemon()
            setPokemon(result)
        }
        load();
    }, []);

    return (
        <ScrollView>
            {pokemon.map((p, index) => (
                <Link href={`/(pokemon)/${p.id}`} key={p.name} asChild>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <Image source={{uri: p.image}} style={styles.preview} />
                            <Text style={styles.itemText}>
                                {p.name}
                            </Text>
                            <Ionicons name={'chevron-forward-outline'} size={24} />
                        </View>
                    </TouchableOpacity>
             </Link>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        flex: 1,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    itemText:{
      fontSize: 18,
      textTransform: 'capitalize',
      flex: 1
    },
    preview: {
        width: 100,
        height: 100,
    }
})

export default Page


