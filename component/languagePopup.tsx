import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { getUniqueLanguages } from '../api/api';
import { useRouter } from "expo-router";
import { useSelector,useDispatch } from "react-redux"
import { RootState } from "../redux/store";

const LanguagePopup = ({ visible, onClose, onSelect }:{visible:boolean, onClose:any, onSelect:any}) => {
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    const fetchLanguages = async () => {
      const uniqueLanguages = await getUniqueLanguages();
      setLanguages(uniqueLanguages);
    };
    fetchLanguages();
  }, []);

  const handleSelect = () => {
    onSelect(selectedLanguage);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, {backgroundColor:darkMode? "#000F24" :"white"}]}>
          <Text style={[styles.title,{color:darkMode? "white": "#000"}]}>Select Language</Text>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Text style={styles.closeIconText}>X</Text>
          </TouchableOpacity>
          <FlatList
            data={languages}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.languageItem}
                onPress={() => {setSelectedLanguage(item)
                  handleSelect()
                }}
              >
                <Text style={{color:darkMode? "white": "#000"}}>{item}</Text>
                <View style={[styles.radioButton, ]}>
                  {selectedLanguage === item && <Text style={{color:darkMode? "white": "#000"}}>✓</Text>}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor:"#98A2B3",
    borderRadius:5,
    width:25,
    height:25,
    justifyContent:"center",
    alignItems:"center"
  },

  closeIconText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: "#FF6C00",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 16,
    width: "60%",
    height: "80%",
  },
  closeButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 8,
    width: "35%",
    height: "80%",
  },
});

export default LanguagePopup;