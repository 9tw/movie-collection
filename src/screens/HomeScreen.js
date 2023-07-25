import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { movieData } from '../../data/MovieData';
import { ShowMovie } from '../components/MovieComponent';
import { ButtonComponent } from '../components/ButtonComponent';

const HomeScreen = (props) => {
    const {navigation} = props;
    const [recommended, setRecommended] = useState([]);
    const [mostViewed, setMostViewed] = useState([]);
    const [allMostViewed, setAllMostViewed] = useState([]);
    const [allRecommended, setAllRecommended] = useState([]);

    const compareRating = (a, b) => {
        const ratingA = a.rating;
        const ratingB = b.rating;

        if (ratingA > ratingB) {
            return -1;
        } else if (ratingA < ratingB) {
            return 1;
        } else {
            return 0;
        }
    };

    const compareViewers = (a, b) => {
        const viewersA = a.viewers;
        const viewersB = b.viewers;

        if (viewersA > viewersB) {
            return -1;
        } else if (viewersA < viewersB) {
            return 1;
        } else {
            return 0;
        }
    };    

    useEffect(() => {
        const threeRecommended = [];
        const threeMostViewed = [];

        const sortedRecommended = [...movieData].sort(compareRating);
        const sortedMostViewed = [...movieData].sort(compareViewers);

        setAllMostViewed(sortedMostViewed);
        setAllRecommended(sortedRecommended);

        for (let i=0; i<3; i++) {
            threeRecommended.push(sortedRecommended[i]);
            threeMostViewed.push(sortedMostViewed[i])
        }

        // setRecommended(sortedRecommended);
        // setMostViewed(sortedMostViewed);

        setRecommended(threeRecommended);
        setMostViewed(threeMostViewed);
    }, []);

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={recommended}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatListContainer}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.dataContainer}>
                            <Image
                                style={styles.movieImage}
                                source={{ uri: item.imageLink }}
                            />
                            <View style={styles.movieDescriptionContainer}>
                                <Text style={styles.title}>{item.title}</Text>
                                <View style={styles.yearContainer}>
                                    <Text>{item.year}</Text>
                                    {/* <Text>{item.rating}</Text> */}
                                    {
                                        item.rating === 5 ? <Image style={styles.movieStars} source={require('../../assets/images/five-stars.png')} /> : item.rating === 4 ? <Image style={styles.movieStars} source={require('../../assets/images/four-stars.png')} /> : item.rating === 3 ? <Image style={styles.movieStars} source={require('../../assets/images/three-stars.png')} /> : item.rating === 2 ? <Image style={styles.movieStars} source={require('../../assets/images/two-stars.png')} /> : item.rating === 1 ? <Image style={styles.movieStars} source={require('../../assets/images/star.png')} /> : null
                                    }
                                    <ButtonComponent onPress={() => navigation.navigate('DetailMovie', {item})} />
                                </View>
                            </View>
                        </View>
                    )
                }}
                ListHeaderComponent={
                    <View>
                        <View style={styles.mainCategoryContainer}>
                            <View style={styles.categoryContainer}>
                                <Text style={styles.categoryText}>
                                    Most Viewed
                                </Text>
                            </View>
                            <View style={styles.seeAllContainer}>
                                <TouchableOpacity
                                    onPress={
                                        () => navigation.navigate('MostViewed', {allMostViewed})
                                    }
                                >
                                    <Text style={styles.seeAllText}>See All</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <FlatList
                            horizontal
                            data={mostViewed}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <ShowMovie
                                        image={{ uri: item.imageLink }}
                                        title={item.title}
                                        viewers={item.viewers}
                                        isHome={true}
                                    />
                                )
                            }}
                            contentContainerStyle={{ flex: mostViewed.length === 0 ? 1 : 0 }}
                            ListEmptyComponent={
                                <View style={{ alignItems: 'center', flex: 1 }}>
                                    <Text>
                                        No items in this category.
                                    </Text>
                                </View>
                            }
                        />
                        <View style={styles.mainCategoryContainer}>
                            <View style={styles.categoryContainer}>
                                <Text style={styles.categoryText}>
                                    Recommended
                                </Text>
                            </View>
                            <View style={styles.seeAllContainer}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Recommended', {allRecommended})}
                                >
                                    <Text style={styles.seeAllText}>See All</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
                // ListFooterComponent={
                //     <Text>
                //         An array of objects lets you store multiple values
                //         in a single variable. It stores a fixed-size sequential
                //         collection of elements of the same type. An array is
                //         used to store a collection of data,but it is often
                //         more useful to think of an array as a collection of
                //         variables of the same type.
                //     </Text>
                // }
                ListEmptyComponent={
                    <View style={{ alignItems: 'center' }}>
                        <Text>
                            No items in this category.
                        </Text>
                    </View>
                }
            />
        </View>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    flatListContainer : {
        padding: 8
    },
    movieImage: {
        width: 130,
        height: 200,
        borderRadius: 10
    },
    dataContainer: {
        margin: 8,
        borderColor: '#96ceb4',
        borderWidth: 2,
        borderRadius: 10,
        padding: 16,
        flexDirection: 'row' //Important!
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    movieDescriptionContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 8
    },
    yearContainer: {
        marginTop: 8,
        marginBottom: 8
    },
    mainCategoryContainer: {
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
        flexDirection: 'row'
    },
    categoryContainer: {
        flex: 1
    },
    categoryText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    movieStars: {
        width: 100,
        height: 20
    },
    seeAllContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    seeAllText: {
        color: '#009688',
        textDecorationLine: 'underline'
    }
});

export default HomeScreen;