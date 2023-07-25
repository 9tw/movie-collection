import React, {useEffect} from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { MovieExplanation } from '../components/MovieComponent';

const DetailMovieScreen = (props) => {
    const { route } = props;
    const movie = route.params.item;

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    useEffect(() => {
        console.log(movie);
    }, []);

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.movieContainer}>
                    <View style={styles.middle}>
                        <Image style={styles.image} source={{ uri: movie.imageLink }} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{movie.title}</Text>
                    </View>
                    <MovieExplanation name="Release yaer" value={movie.year} />
                    <MovieExplanation name="Starring" value={movie.starring} />
                    <MovieExplanation name="Description" value={movie.description} />
                    <MovieExplanation name="Viewers" value={numberWithCommas(movie.viewers)} />
                    <MovieExplanation name="Rating" isRating={movie.rating} rating={movie.rating} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    movieContainer: {
        margin: 8,
        padding: 8
    },
    middle: {
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 300,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#ffbe7bff'
    },
    titleContainer: {
        marginTop: 8,
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 8,
        backgroundColor: 'salmon',
        borderRadius: 10,
        color: 'white',
    }
});

export default DetailMovieScreen