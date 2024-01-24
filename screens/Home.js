import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar as RNStatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

const Stack = createNativeStackNavigator();

export default function Home() {
    const navigation = useNavigation();
    const [showRequests, setShowRequests] = useState(true);
    const [requestData, setRequestData] = useState([]);

    const toggleRequests = () => {
        setShowRequests(!showRequests);
    };

    // Dummy data for now, replace with API fetching logic
    const dummyData = [
        {
            id: 1,
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea omnis ab facilis impedit cum optio nisi natus quia assumenda fugiat.',
            purpose: 'I have Something To Share',
            date: '07-10-2023',
        },
        {
            id: 2,
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea omnis ab facilis impedit cum optio nisi natus quia assumenda fugiat.',
            purpose: 'I have Something To Share',
            date: '07-10-2023',
        },
        // Add more dummy data as needed
    ];

    useEffect(() => {
        // Simulate API call
        setRequestData(dummyData);
    }, []);

    return (
        <ScrollView style={tw`bg-white`}>
            <RNStatusBar style="auto" />
            <View style={styles.container}>
                <Text style={styles.text}>Galaxus CRN</Text>
            </View>




            <TouchableOpacity onPress={toggleRequests}>
                <View style={styles.requestsItem}>
                    <Text style={styles.requestsItemText}>My New Request</Text>
                </View>
            </TouchableOpacity>

            {showRequests && requestData.map(request => (
                <View key={request.id} style={styles.requestDetails}>
                    <Text style={styles.requestTitle}>{request.title}</Text>
                    <Text style={styles.requestDescription}>{request.description}</Text>
                    {/* <View style={styles.requestDetails}>
                        <View style={styles.requestPurposeContainer}>
                            <Text style={styles.requestPurpose}>{request.purpose}</Text>
                        </View>
                    </View> */}
                    <View style={styles.requestDateContainer}>
                        <Text style={styles.requestDate}>{request.date}</Text>
                        <View style={styles.iconContainer}>
                            {/* Pen (Edit) Icon */}
                            <Icon name="create-outline" size={20} color="#485f9b" style={styles.icon} />

                            {/* Delete Icon */}
                            <Icon name="trash-bin" size={20} color="#485f9b" style={styles.icon} />

                            {/* Mail Icon */}
                            <Icon name="mail" size={20} color="#485f9b" style={styles.icon} />

                            {/* Circle with Cross Icon */}
                            <View style={styles.crossIconContainer}>
                                <Icon name="close" size={15} color="#fff" style={styles.crossIcon} />
                            </View>
                        </View>
                    </View>
                </View>
            ))}


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingBottom: 4,
        alignItems: 'center',
        flexDirection: 'row',
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: '#485f9b',

        zIndex: 1,
    },
    text: {
        color: 'white',
        fontSize: 30,
        paddingLeft: 120,
        paddingTop: 10
    },
    requestsHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#485f9b',
        marginTop: 20,
    },
    requestsHeaderText: {
        fontSize: 20,
        paddingLeft: 30,
        color: 'white',
    },
    requestsItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    requestsItemText: {
        fontSize: 22,
        paddingLeft: 5,
        fontWeight: 'bold',
        color: '#485f9b',

    },
    requestDetails: {
        marginTop: 10,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    requestTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#485f9b',
        marginBottom: 8,

    },
    requestDescription: {
        fontSize: 16,
    },
    requestDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    requestPurposeContainer: {
        backgroundColor: '#87cefa', // Set the background color here
        width: 200,
        borderRadius: 5,
        flexGrow: 1,
        borderRadius: 10,
        // marginLeft: 0
    },
    requestPurpose: {
        fontSize: 16,
        color: 'black',
        flex: 1,
        padding: 3
    },
    requestDate: {
        fontSize: 16,
        color: '#485f9b',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    icon: {
        width: 20,
        height: 20,

    },
    crossIconContainer: {
        backgroundColor: '#485f9b',
        borderRadius: 20,
        padding: 5,
    },
    crossIcon: {
        width: 15,
        height: 15,
    },
});
