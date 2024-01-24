import React, { useState } from 'react';
import { ScrollView, View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Button, CheckBox } from 'react-native-elements';

export default function FilterScreen() {
    const [collapsedCategories, setCollapsedCategories] = useState({});
    const [checkedSubCategories, setCheckedSubCategories] = useState({});
    const [selectedCategories, setSelectedCategories] = useState({});

    const toggleSubCategoryCheckbox = (categoryIndex, subCategory) => {
        setCheckedSubCategories((prevSubCategories) => {
            const categorySubCategories = prevSubCategories[categoryIndex] || [];
            if (categorySubCategories.includes(subCategory)) {
                return {
                    ...prevSubCategories,
                    [categoryIndex]: categorySubCategories.filter((sc) => sc !== subCategory),
                };
            } else {
                return {
                    ...prevSubCategories,
                    [categoryIndex]: [...categorySubCategories, subCategory],
                };
            }
        });
    };

    const toggleCategoryCollapse = (index) => {
        setCollapsedCategories((prev) => {
            const newCollapsedCategories = { ...prev };
            newCollapsedCategories[index] = !prev[index];
            return newCollapsedCategories;
        });
    };

    const toggleCategoryCheckbox = (categoryIndex) => {
        setSelectedCategories((prevSelectedCategories) => {
            const newSelectedCategories = { ...prevSelectedCategories };
            newSelectedCategories[categoryIndex] = !prevSelectedCategories[categoryIndex];
            return newSelectedCategories;
        });
    };

    const handleCategoryPress = (index) => {
        toggleCategoryCollapse(index);
        // Uncomment the line below if you want to toggle checkbox on category title click
        // toggleCategoryCheckbox(index);
    };

    const categories = [
        {
            title: 'Category 1',
            subCategories: ['Sub-category 1', 'Sub-category 2', 'Sub-category 3', 'Sub-category 4', 'Sub-category 5'],
        },
        {
            title: 'Category 2',
            subCategories: ['Sub-category 6', 'Sub-category 7', 'Sub-category 8', 'Sub-category 9', 'Sub-category 10'],
        },
        {
            title: 'Category 3',
            subCategories: ['Sub-category 11', 'Sub-category 12', 'Sub-category 13', 'Sub-category 14', 'Sub-category 15'],
        },
        {
            title: 'Category 4',
            subCategories: ['Sub-category 16', 'Sub-category 17', 'Sub-category 18', 'Sub-category 19', 'Sub-category 20'],
        },
        {
            title: 'Category 5',
            subCategories: ['Sub-category 21', 'Sub-category 22', 'Sub-category 23', 'Sub-category 24', 'Sub-category 25'],
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => console.log('Back pressed')}>
                        <Text style={styles.backIcon}>{'<'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Create New Request</Text>
                </View>

                {/* Message Box */}
                <View style={styles.messageBox}>
                    <Text style={styles.messageText}>Important  </Text>
                    <Text>Please make sure to select the relevant categories for your request.Once your request is approved the members of Estern Oregon Community Resource Network that are subscribed to the categories  you choose will recive an email notification with the details of your request.</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.requestNotificationText}>Request Notification categories</Text>
                    {categories.map((category, categoryIndex) => (
                        <View key={categoryIndex} style={styles.categoryContainer}>
                            <TouchableOpacity onPress={() => handleCategoryPress(categoryIndex)}>
                                <View style={styles.categoryHeader}>
                                    <View style={styles.categoryCheckboxContainer}>
                                        <CheckBox
                                            checked={selectedCategories[categoryIndex]}
                                            onPress={() => toggleCategoryCheckbox(categoryIndex)}
                                        />
                                        <Text style={styles.categoryTitle}>{category.title}</Text>
                                    </View>
                                    <Text style={styles.downArrow}>{collapsedCategories[categoryIndex] ? ' \u25BC' : ' \u25B6'}</Text>
                                </View>
                            </TouchableOpacity>
                            <Collapsible collapsed={collapsedCategories[categoryIndex]}>
                                <View style={styles.subCategoriesList}>
                                    {category.subCategories.map((subCategory, subCategoryIndex) => (
                                        <View key={subCategoryIndex} style={styles.subCategoryCheckbox}>
                                            <TouchableOpacity onPress={() => toggleSubCategoryCheckbox(categoryIndex, subCategory)}>
                                                <View style={styles.checkboxContainer}>
                                                    {checkedSubCategories[categoryIndex]?.includes(subCategory) && (
                                                        <Text style={styles.checkmark}>{'\u2713'}</Text>
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                            <Text style={styles.subCategory}>{subCategory}</Text>
                                        </View>
                                    ))}
                                </View>
                            </Collapsible>
                        </View>
                    ))}
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Back"
                        type="outline"
                        titleStyle={{ color: '#485f9b' }}
                        buttonStyle={[styles.button, { borderColor: '#485f9b' }]}
                        onPress={() => console.log('Back pressed')}
                    />
                    <Button
                        title="Next"
                        titleStyle={styles.buttonText}
                        buttonStyle={[styles.button, { backgroundColor: '#485f9b' }]}
                        onPress={() => console.log('Next pressed')}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#485f9b',
        padding: 15,
        marginTop: 35,
        paddingLeft: 15,
        gap: 60,
    },
    backIcon: {
        fontSize: 30,
        color: '#ffffff',
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        color: '#ffffff',
    },
    content: {
        padding: 15,
    },
    requestNotificationText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#485f9b',
    },
    messageBox: {
        borderColor: '#5bd75b',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        marginVertical: 15,
        margin: 15,
        paddingLeft: 15,
        paddingRight: 10,
    },
    messageText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#485f9b',
        paddingBottom: 5,




    },
    categoryContainer: {
        marginBottom: 10,
    },
    categoryHeader: {
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    categoryCheckboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#485f9b',
        marginLeft: 10,
    },
    downArrow: {
        fontSize: 14,
    },
    subCategoriesList: {
        marginBottom: 15,
        paddingLeft: 20,

    },
    subCategoryCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        paddingLeft: 20,
    },
    checkboxContainer: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkbox: {
        width: 15,
        height: 15,
        borderRadius: 3,
    },
    checkmark: {
        fontSize: 12,
        color: '#485f9b',
    },
    subCategory: {
        fontSize: 14,
        marginLeft: 10,
        lineHeight: 20,
        color: '#808080'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        gap: 30,
    },
    button: {
        padding: 10,
        borderRadius: 50,
        borderWidth: 2,
        alignItems: 'center',
        width: 130,
        height: 50,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
