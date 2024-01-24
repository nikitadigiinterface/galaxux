import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RequestScreen = ({ navigation }) => {
    const [isMyRequestCollapsed, setMyRequestCollapsed] = useState(true);
    const [requestData, setRequestData] = useState([]);

    const toggleMyRequest = () => {
        setMyRequestCollapsed(!isMyRequestCollapsed);
    };

    const fetchDataFromAPI = async () => {
        // Replace this with your actual API fetching logic
        // For now, use the provided dummy data
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

        setRequestData(dummyData);
    };

    useEffect(() => {
        fetchDataFromAPI();
    }, []);

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.headerText}>Request</Text>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        // Handle the action when the plus icon is pressed
                    }}
                >
                    <Icon name="add" size={30} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Collapsible "My Request" section */}
                <TouchableOpacity onPress={toggleMyRequest}>
                    <View style={styles.requestsItem}>
                        <Text style={styles.requestsItemText}>My New Request</Text>
                    </View>
                </TouchableOpacity>

                {requestData.map(request => (
                    <View key={request.id} style={styles.requestDetails}>
                        <Text style={styles.requestTitle}>{request.title}</Text>
                        <Text style={styles.requestDescription}>{request.description}</Text>
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
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#485f9b', // Header background color
        paddingHorizontal: 10,
        height: 60,
        marginTop: 30,
    },
    backButton: {
        padding: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
    },
    addButton: {
        padding: 10,
    },
    scrollView: {
        paddingHorizontal: 10,
    },
    requestsItem: {
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
    requestDate: {
        fontSize: 16,
        color: '#485f9b',
    },
});

export default RequestScreen;
