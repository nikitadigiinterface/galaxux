import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const ClientDetails = () => {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [genderOptionsVisible, setGenderOptionsVisible] = useState(false);
    const [ethnicityCheckboxes, setEthnicityCheckboxes] = useState([false, false, false, false, false]);
    const [programCheckboxes, setProgramCheckboxes] = useState([false, false, false, false, false]);
    const navigation = useNavigation();

    const handleBack = () => {
        console.log('back pressed');
    };

    const handleSubmit = () => {
        console.log('Data Submitted');
    };

    const handleGenderPress = () => {
        setGenderOptionsVisible(!genderOptionsVisible);
    };

    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
        setGenderOptionsVisible(false);
    };

    const handleEthnicityToggle = (index) => {
        const updatedCheckboxes = [...ethnicityCheckboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        setEthnicityCheckboxes(updatedCheckboxes);
    };

    const handleProgramToggle = (index) => {
        const updatedCheckboxes = [...programCheckboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        setProgramCheckboxes(updatedCheckboxes);
    };

    return (
        <ScrollView>
            <View style={styles.headingContainer}>
                <TouchableOpacity onPress={handleBack}>
                    <Icon name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.headingText}>New Request</Text>
            </View>
            <View style={styles.container}>
                <View
                    style={{
                        borderColor: '#94D300',
                        shadowColor: '#94D300',
                        shadowOffset: { width: 0, height: 2 },
                        elevation: 5,
                        margin: 8,
                        padding: 16,
                    }}
                >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Important Message</Text>
                    <Text>This is an important message section. Add your important messages or instructions here.</Text>
                </View>

                <Text style={styles.sectionHeading}>Client Details</Text>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Client Age</Text>
                    <TextInput
                        style={styles.inputField}
                        keyboardType="numeric"
                        placeholder="Enter Age"
                        value={age}
                        onChangeText={(text) => setAge(text)}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Select Gender</Text>
                    <TouchableOpacity style={styles.genderButton} onPress={handleGenderPress}>
                        <Text>{gender || 'Select Gender'}</Text>
                    </TouchableOpacity>
                    {genderOptionsVisible && (
                        <View style={styles.genderOptions}>
                            <TouchableOpacity onPress={() => handleGenderSelect('Male')}>
                                <Text>Male</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleGenderSelect('Female')}>
                                <Text>Female</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleGenderSelect('Other')}>
                                <Text>Other</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Enter Zip Code</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter Zip Code"
                        value={zipCode}
                        onChangeText={(text) => setZipCode(text)}
                    />
                </View>

                {/* New Section: Ethnicity */}
                <View style={styles.sectionHeading}>
                    <Text style={styles.label}>Ethnicity</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    {ethnicityCheckboxes.map((checked, index) => (
                        <CheckBox
                            key={`ethnicity-${index}`}
                            title={`Ethnicity ${index + 1}`}
                            checked={checked}
                            onPress={() => handleEthnicityToggle(index)}
                            containerStyle={styles.checkboxStyle}
                        />
                    ))}
                </View>

                {/* New Section: Assistance Program */}
                <View style={styles.sectionHeading}>
                    <Text style={styles.label}>Assistance Program</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    {programCheckboxes.map((checked, index) => (
                        <CheckBox
                            key={`program-${index}`}
                            title={`Program ${index + 1}`}
                            checked={checked}
                            onPress={() => handleProgramToggle(index)}
                            containerStyle={styles.checkboxStyle}
                        />
                    ))}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleBack}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = {
    container: {
        padding: 10,
        backgroundColor: '#fff'
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor: '#485f9b',
        padding: 10,
        marginTop: 30,
    },
    headingText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        width: '100%',
    },
    sectionHeading: {
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    fieldContainer: {
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
    inputField: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#485f9b',
        padding: 10,
        alignItems: 'center',
        borderRadius: 20,
        width: '48%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    genderButton: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        // marginBottom: 10,
    },
    genderOptions: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        // marginTop: -5,
        gap: 10,
    },
    checkboxContainer: {
        flexWrap: 'wrap',
        marginBottom: 10,
        paddingLeft: 20,
    },
    checkboxStyle: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        marginBottom: 10,
    },
};

export default ClientDetails;

