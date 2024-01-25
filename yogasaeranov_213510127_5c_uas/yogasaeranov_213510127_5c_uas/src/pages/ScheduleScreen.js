import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  Picker,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const ScheduleScreen = () => {
  const [schedules, setSchedules] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState('Senin');
  const [selectedMatkul, setSelectedMatkul] = useState('');
  const [selectedJam, setSelectedJam] = useState('');
  const [selectedRuangan, setSelectedRuangan] = useState('SISKOM LAB');
  const [editingSchedule, setEditingSchedule] = useState(null);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:5001/getschedules');
      setSchedules(response.data.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const handleAddSchedule = async () => {
    try {
      const newSchedule = {
        tgl: selectedDate.toISOString(),
        hari: selectedDay,
        matkul: selectedMatkul,
        jam: selectedJam,
        ruangan: selectedRuangan,
      };

      if (editingSchedule) {
        await axios.post('http://localhost:5001/updateschedule', {
          scheduleId: editingSchedule._id,
          ...newSchedule,
        });
        setEditingSchedule(null);
      } else {
        await axios.post('http://localhost:5001/createschedule', newSchedule);
      }

      setModalVisible(false);
      fetchSchedules();
    } catch (error) {
      console.error('Error adding/editing schedule:', error);
    }
  };

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      await axios.delete(`http://localhost:5001/deleteschedule/${scheduleId}`);
      fetchSchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const openModal = (schedule) => {
    setEditingSchedule(schedule);
    setModalVisible(true);
  };

  const closeModal = () => {
    setEditingSchedule(null);
    setModalVisible(false);
  };

  const renderScheduleItem = ({ item }) => {
    const formattedDate = new Date(item.tgl).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'numeric',
      year: '2-digit',
    });

    return (
      <View style={styles.scheduleItem}>
        <View style={styles.scheduleColumn}>
          <Text style={styles.scheduleText}>{formattedDate}</Text>
          <Text style={styles.scheduleText}>{item.hari}</Text>
        </View>
        <View style={styles.scheduleColumn}>
          <Text style={styles.scheduleText}>{item.matkul}</Text>
          <Text style={styles.scheduleText}>{item.jam}</Text>
        </View>
        <View style={styles.scheduleColumn}>
          <Text style={styles.scheduleText}>{item.ruangan}</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => openModal(item)}>
              <MaterialCommunityIcons
                name="calendar-edit"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteSchedule(item._id)}>
              <MaterialCommunityIcons
                name="calendar-remove"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons name="calendar-plus" size={24} color="white" />
        <Text style={{ color: 'white' }}>Add Schedule</Text>
      </TouchableOpacity>
      <FlatList
        data={schedules}
        keyExtractor={(item) => item._id}
        renderItem={renderScheduleItem}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tambah/Edit Jadwal</Text>
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={(event, date) => setSelectedDate(date)}
            />
            <Picker
              selectedValue={selectedDay}
              onValueChange={(itemValue) => setSelectedDay(itemValue)}>
              <Picker.Item label="Senin" value="Senin" />
              <Picker.Item label="Selasa" value="Selasa" />
              <Picker.Item label="Rabu" value="Rabu" />
              <Picker.Item label="Kamis" value="Kamis" />
              <Picker.Item label="Jumat" value="Jumat" />
              <Picker.Item label="Sabtu" value="Sabtu" />
              <Picker.Item label="Minggu" value="Minggu" />
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Mata Kuliah"
              value={selectedMatkul}
              onChangeText={(text) => setSelectedMatkul(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Jam"
              value={selectedJam}
              onChangeText={(text) => setSelectedJam(text)}
            />
            <Picker
              selectedValue={selectedRuangan}
              onValueChange={(itemValue) => setSelectedRuangan(itemValue)}>
              <Picker.Item label="SISKOM LAB" value="SISKOM LAB" />
              <Picker.Item label="INTRO LAB" value="INTRO LAB" />
              <Picker.Item label="NETWORK LAB" value="NETWORK LAB" />
              <Picker.Item label="MOBILE LAB" value="MOBILE LAB" />
              <Picker.Item label="Lainya" value="Lainya" />
            </Picker>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddSchedule}>
              <Text style={styles.buttonText}>Simpan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.buttonText}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10,
  },
  scheduleColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  scheduleText: {
    marginBottom: 5,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ScheduleScreen;
