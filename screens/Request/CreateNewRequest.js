import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'; // Import axios for API requests

const ModelDropdown = ({label, options, selectedValue, onValueChange}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionPress = value => {
    onValueChange(value);
    toggleDropdown();
  };

  return (
    <View style={{marginTop: 16, paddingHorizontal: 10}}>
      <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>
        {label}
      </Text>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          borderRadius: 5,
        }}>
        <Text>{selectedValue ? selectedValue.label : 'Select an option'}</Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={{border: 1, borderColor: '#ccc', marginTop: 2}}>
          {options.map(option => (
            <TouchableOpacity
              key={option.value}
              style={{
                padding: 8,
                backgroundColor:
                  selectedValue === option.value ? '#e0e0e0' : 'transparent',
              }}
              onPress={() => handleOptionPress(option)}>
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const CalendarIcon = () => (
  <IconFontAwesome
    name="calendar"
    size={20}
    color="black"
    style={{position: 'absolute', right: 8, top: 10}}
  />
);

const CreateNewRequest = () => {
  const [checkedYes, setCheckedYes] = useState(false);
  const [checkedNo, setCheckedNo] = useState(false);
  const [purpose, setPurpose] = useState(null);
  const [parameterType, setParameterType] = useState(9);
  const [requestTitle, setRequestTitle] = useState('');
  const [requestDate, setRequestDate] = useState(new Date());
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [showRequestDatePicker, setShowRequestDatePicker] = useState(false);
  const [showDeadlineDatePicker, setShowDeadlineDatePicker] = useState(false);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [responseViaEmail, setResponseViaEmail] = useState(false);
  const [responseViaPhone, setResponseViaPhone] = useState(false);
  const [responseViaOther, setResponseViaOther] = useState(false);
  const [contactDetails, setContactDetails] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleResponseViaEmail = () => {
    setResponseViaEmail(true);
    setResponseViaPhone(false);
    setResponseViaOther(false);
  };

  const handleResponseViaPhone = () => {
    setResponseViaEmail(false);
    setResponseViaPhone(true);
    setResponseViaOther(false);
  };

  const handleResponseViaOther = () => {
    setResponseViaEmail(false);
    setResponseViaPhone(false);
    setResponseViaOther(true);
  };

  const handleContactDetailsChange = text => {
    setContactDetails(text);
  };

  const handleFileSelection = async () => {
    // Your existing code for file selection
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
  };

  const handleNextButtonPress = async () => {
    try {
      const requestData = {
        checkedYes,
        checkedNo,
        purpose,
        requestTitle,
        requestDate,
        deadlineDate,
        currentLocation,
        description,
        goal,
        responseViaEmail,
        responseViaPhone,
        responseViaOther,
        contactDetails,
        selectedFile,
      };

      const response = await axios.post(
        'http://crnmobileapp.com/api/CRN/CRNRequestAPI',
        requestData,
      );

      if (response.data.success) {
        // Assuming you are using React Navigation
        // navigation.navigate('NextScreen', { data: response.data });

        // Log the data sent to the next screen
        console.log('Data sent to the next screen:', response.data);
      } else {
        console.error('API request failed:', response.data.error);
        // Handle API error, show an alert, etc.
      }
    } catch (error) {
      console.error('Error making API request:', error);
      // Handle network errors, unexpected errors, etc.
    }
  };

  const handleCurrentLocationChange = value => {
    setCurrentLocation(value);
  };

  const handleDescriptionChange = text => {
    setDescription(text);
  };

  const handleGoalChange = text => {
    setGoal(text);
  };

  const handleCheckYes = () => {
    setCheckedYes(!checkedYes);
    if (checkedNo) setCheckedNo(false);
  };

  const handleCheckNo = () => {
    setCheckedNo(!checkedNo);
    if (checkedYes) setCheckedYes(false);
  };

  const handlePurposeChange = value => {
    setPurpose(value);
  };

  const handleRequestDateChange = (event, selectedDate) => {
    setShowRequestDatePicker(false);
    if (selectedDate) {
      setRequestDate(selectedDate);
    }
  };

  const handleDeadlineDateChange = (event, selectedDate) => {
    setShowDeadlineDatePicker(false);
    if (selectedDate) {
      setDeadlineDate(selectedDate);
    }
  };

  const showRequestDatePickerModal = () => {
    setShowRequestDatePicker(true);
  };

  const showDeadlineDatePickerModal = () => {
    setShowDeadlineDatePicker(true);
  };

  return (
    <ScrollView>
      {/* "Create New Request" Section */}
      <View style={{backgroundColor: '#485f9b', padding: 16, marginTop: 10}}>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Create New Request
        </Text>
      </View>

      {/* "Important Message" Section */}
      <View
        style={{
          border: 1,
          borderColor: '#94D300',
          shadowColor: '#94D300',
          // shadowOffset: { width: 0, height: 0.5 },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.84,
          elevation: 5,
          margin: 8,
          padding: 16,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>
          Important Message
        </Text>
        <Text>
          This is an important message section. Add your important messages or
          instructions here.
        </Text>
      </View>

      {/* "Request Information" Section */}
      <View style={{marginTop: 16, paddingHorizontal: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>
          Request Information
        </Text>

        {/* "Have You Checked" Section */}
        <View style={{marginBottom: 8, paddingHorizontal: 10}}>
          <Text>Have You Checked?</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
              paddingHorizontal: 10,
            }}>
            <CheckBox
              checked={checkedYes}
              onPress={handleCheckYes}
              containerStyle={{padding: 0, borderRadius: 15}}
            />
            <Text style={{marginLeft: 4}}>Yes</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <CheckBox
              checked={checkedNo}
              onPress={handleCheckNo}
              containerStyle={{padding: 0, borderRadius: 15}}
            />
            <Text style={{marginLeft: 4}}>No</Text>
          </View>
        </View>

        {/* "Non Member Request" Section */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
            paddingHorizontal: 10,
          }}>
          <Text>Non Member Request</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
              paddingHorizontal: 10,
            }}>
            <CheckBox
              checked={checkedYes}
              onPress={handleCheckYes}
              containerStyle={{padding: 0, borderRadius: 15}}
            />
            <Text style={{marginLeft: 4}}>Yes</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <CheckBox
              checked={checkedNo}
              onPress={handleCheckNo}
              containerStyle={{padding: 0, borderRadius: 15}}
            />
            <Text style={{marginLeft: 4}}>No</Text>
          </View>
        </View>
      </View>

      {/* "Purpose" Section */}
      <ModelDropdown
        label="Purpose"
        options={[
          {label: 'I have Need', value: 'need'},
          // { label: 'I have Something to Share', value: 'share' },
          // { label: 'I want to make cash donation', value: 'donation' },
        ]}
        selectedValue={purpose}
        onValueChange={handlePurposeChange}
      />

      {/* "Request Title" Section */}
      <View style={{marginTop: 16, paddingHorizontal: 10}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            color: 'black',
          }}>
          Request Title
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 8,
            borderRadius: 5,
          }}
          placeholder="Enter request title"
          value={requestTitle}
          onChangeText={text => setRequestTitle(text)}
        />
      </View>

      {/* "Request Date" Section */}
      <View style={{marginTop: 16, paddingHorizontal: 10}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            color: 'black',
          }}>
          Request Date
        </Text>
        <View style={{position: 'relative'}}>
          <TouchableOpacity
            onPress={showRequestDatePickerModal}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 8,
              borderRadius: 5,
            }}>
            <Text>{requestDate.toDateString()}</Text>
          </TouchableOpacity>
          <CalendarIcon />
        </View>
        {showRequestDatePicker && (
          <DateTimePicker
            value={requestDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleRequestDateChange}
          />
        )}
      </View>

      {/* "Deadline" Section */}
      <View style={{marginTop: 16, paddingHorizontal: 10}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            color: 'black',
            paddingHorizontal: 10,
          }}>
          Deadline
        </Text>
        <View style={{position: 'relative'}}>
          <TouchableOpacity
            onPress={showDeadlineDatePickerModal}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 8,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}>
            <Text>{deadlineDate.toDateString()}</Text>
          </TouchableOpacity>
          <CalendarIcon />
        </View>
        {showDeadlineDatePicker && (
          <DateTimePicker
            value={deadlineDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDeadlineDateChange}
          />
        )}
      </View>

      <ModelDropdown
        label="Current Location"
        options={[
          {label: 'City 1', value: 'city1'},
          {label: 'City 2', value: 'city2'},
          {label: 'City 3', value: 'city3'},
          // Add more cities as needed
        ]}
        selectedValue={currentLocation}
        onValueChange={handleCurrentLocationChange}
        style={{marginTop: 16, paddingHorizontal: 10}}
      />

      {/* "Description" Section */}
      <View style={{marginTop: 16, paddingHorizontal: 10}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            color: 'black',
          }}>
          Description
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 8,
            borderRadius: 5,
            height: 100,
          }}
          placeholder="Enter description"
          multiline
          textAlignVertical="top"
          value={description}
          onChangeText={handleDescriptionChange}
        />
      </View>

      {/* Goal  */}
      <View style={{marginTop: 16, paddingHorizontal: 10}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            color: 'black',
          }}>
          Goal
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 8,
            borderRadius: 5,
            height: 100,
          }}
          placeholder="Enter goal description"
          multiline
          textAlignVertical="top"
          value={goal}
          onChangeText={handleGoalChange}
        />
      </View>
      <View style={{marginTop: 16, paddingHorizontal: 10}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            color: 'black',
          }}>
          How should others respond to this request
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* Circular Checkboxes */}
          <CheckBox
            checked={responseViaEmail}
            onPress={handleResponseViaEmail}
            containerStyle={{padding: 0, borderRadius: 15}}
            checkedIcon="dot-circle-o" // Checked icon
            uncheckedIcon="circle-o" // Unchecked icon
          />
          <Text style={{marginLeft: 4}}>Email</Text>

          <CheckBox
            checked={responseViaPhone}
            onPress={handleResponseViaPhone}
            containerStyle={{padding: 0, borderRadius: 15}}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
          <Text style={{marginLeft: 4}}>Phone</Text>

          <CheckBox
            checked={responseViaOther}
            onPress={handleResponseViaOther}
            containerStyle={{padding: 0, borderRadius: 15}}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
          <Text style={{marginLeft: 4}}>Other</Text>
        </View>

        {/* "Contact Details" Section */}
        <View style={{marginTop: 16, paddingHorizontal: 10}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 8,
              color: 'black',
            }}>
            Contact Details
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 8,
              borderRadius: 5,
              marginTop: 4,
            }}
            placeholder="Enter contact details"
            value={contactDetails}
            onChangeText={handleContactDetailsChange}
          />
        </View>

        {/* "Picture" Section */}
        <View
          style={{
            marginTop: 16,
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* Upload Button */}
          <TouchableOpacity
            onPress={handleFileSelection}
            style={{
              backgroundColor: '#3498db',
              padding: 8,
              borderRadius: 5,
              marginRight: 8,
            }}>
            <Text style={{color: 'white'}}>Upload</Text>
          </TouchableOpacity>

          {/* Selected File Display */}
          <Text style={{flex: 1, textAlign: 'center', color: 'black'}}>
            {selectedFile ? selectedFile.name : '[No File Selected]'}
          </Text>

          {/* Delete Button */}
          {selectedFile && (
            <TouchableOpacity
              onPress={handleDeleteFile}
              style={{backgroundColor: 'red', padding: 8, borderRadius: 5}}>
              <Text style={{color: 'white'}}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* "Next" Button */}
        <TouchableOpacity
          onPress={handleNextButtonPress}
          style={{
            backgroundColor: '#2ecc71',
            padding: 16,
            margin: 16,
            borderRadius: 5,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateNewRequest;
