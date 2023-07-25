import React, { useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, Image } from 'react-native'
import { ShowMovie } from '../components/MovieComponent';

const MostViewedScreen = (props) => {
    const { route, navigation } = props;
    const sortedMostViewed = route.params.allMostViewed;

    useEffect(() => {
        console.log(sortedMostViewed.length);
    }, []);

    return (
        <View>
            <FlatList
                contentContainerStyle={styles.mainDataContainer}
                data={sortedMostViewed}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <ShowMovie
                            image={{uri: item.imageLink}}
                            title={item.title}
                            viewers={item.viewers}
                            onPress={() => navigation.navigate('DetailMovie', {item})}
                        />
                    )
                }}
                numColumns={2}
                key={2}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainDataContainer: {
        padding: 8
    },
    movieContainer: {
        margin: 8,
        padding: 16,
        backgroundColor: 'skyblue'
    },
    movieImage: {
        width: 130,
        height: 200
    }
});

export default MostViewedScreen;
