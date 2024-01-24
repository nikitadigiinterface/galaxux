import React, { useState } from 'react';
import { ScrollView, View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Button, CheckBox } from 'react-native-elements';

export default function Region() {
  const [collapsedRegions, setCollapsedRegions] = useState({});
  const [checkedLocations, setCheckedLocations] = useState({});
  const [selectedRegions, setSelectedRegions] = useState({});

  const toggleLocationCheckbox = (regionIndex, location) => {
    setCheckedLocations((prevLocations) => {
      const regionLocations = prevLocations[regionIndex] || [];
      if (regionLocations.includes(location)) {
        return {
          ...prevLocations,
          [regionIndex]: regionLocations.filter((l) => l !== location),
        };
      } else {
        return {
          ...prevLocations,
          [regionIndex]: [...regionLocations, location],
        };
      }
    });
  };

  const toggleRegionCollapse = (index) => {
    setCollapsedRegions((prev) => {
      const newCollapsedRegions = { ...prev };
      newCollapsedRegions[index] = !prev[index];
      return newCollapsedRegions;
    });
  };

  const toggleRegionCheckbox = (regionIndex) => {
    setSelectedRegions((prevSelectedRegions) => {
      const newSelectedRegions = { ...prevSelectedRegions };
      newSelectedRegions[regionIndex] = !prevSelectedRegions[regionIndex];
      return newSelectedRegions;
    });
  };

  const handleRegionPress = (regionIndex) => {
    toggleRegionCollapse(regionIndex);
    // Uncomment the line below if you want to toggle checkbox on region title click
    // toggleRegionCheckbox(regionIndex);
  };

  const regions = [
    {
      title: 'Region 1',
      locations: ['Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5'],
    },
    {
      title: 'Region 2',
      locations: ['Location 6', 'Location 7', 'Location 8', 'Location 9', 'Location 10'],
    },
    {
      title: 'Region 3',
      locations: ['Location 11', 'Location 12', 'Location 13', 'Location 14', 'Location 15'],
    },
    {
      title: 'Region 4',
      locations: ['Location 16', 'Location 17', 'Location 18', 'Location 19', 'Location 20'],
    },
    {
      title: 'Region 5',
      locations: ['Location 21', 'Location 22', 'Location 23', 'Location 24', 'Location 25'],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => console.log('Back pressed')}>
            <Text style={styles.backIcon}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Create New Requests</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.requestLocationText}>Request Location</Text>
          {regions.map((region, regionIndex) => (
            <View key={regionIndex} style={styles.regionContainer}>
              <TouchableOpacity onPress={() => handleRegionPress(regionIndex)} style={styles.categoryHeader}>
                <View style={styles.checkboxContainerHeader}>
                  <CheckBox
                    checked={selectedRegions[regionIndex]}
                    onPress={() => toggleRegionCheckbox(regionIndex)}
                    containerStyle={{ padding: 0, margin: 0 }}
                  />
                </View>
                <Text style={styles.categoryTitle}>{region.title}</Text>
                <View style={styles.downArrowContainer}>
                  <Text style={styles.downArrow}>
                    {collapsedRegions[regionIndex] ? ' \u25BC' : ' \u25B6'}
                  </Text>
                </View>
              </TouchableOpacity>

              <Collapsible collapsed={collapsedRegions[regionIndex]}>
                <View style={styles.subCategoriesList}>
                  {region.locations.map((location, locationIndex) => (
                    <View key={locationIndex} style={styles.subCategoryCheckbox}>
                      <TouchableOpacity onPress={() => toggleLocationCheckbox(regionIndex, location)}>
                        <View style={styles.checkboxContainer}>
                          {checkedLocations[regionIndex]?.includes(location) && (
                            <Text style={styles.checkmark}>{'\u2713'}</Text>
                          )}
                        </View>
                      </TouchableOpacity>
                      <Text style={styles.subCategory}>{location}</Text>
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
  requestLocationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#485f9b',
  },
  regionContainer: {
    marginBottom: 10,
  },
  categoryHeader: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkboxContainerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#485f9b',
    marginLeft: 10,
  },
  downArrowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  checkmark: {
    fontSize: 12,
    color: '#485f9b',
  },
  subCategory: {
    fontSize: 14,
    marginLeft: 10,
    lineHeight: 20,
    color: '#808080',
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


