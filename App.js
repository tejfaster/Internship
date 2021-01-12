import React from 'react'
import { View, Modal, Text, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native'

let addlistIndex = 0

const List = ({addlist}) => {
  return (
    <View style={styles.todoContainer}>
      <Text style={styles.todoText}>
        {addlist.title}
      </Text>
    </View>
  )
}

const Addlist = ({addlists}) =>{
  addlists = addlists.map(( addlist,i)=>{
    return(
      <List
      key={addlist.addIndex}
      addlist={addlist}
      />
    )
  })
  return (
    <View>
      {addlists}
    </View>
    )
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      inputValue: '',
      type: 'All',
      addlists: [],
      modalVisible: false
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  inputChange(inputValue) {
    console.log(' Input Value: ', inputValue)
    this.setState({ inputValue })
  }
  submitAddlist() {
    if (this.state.inputValue.match(/^\s*$/)) {
      return
    }
    const addlist = {
      title: this.state.inputValue,
      addlistIndex,
      complete: false
    }
    addlistIndex++
    const addlists = [...this.state.addlists, addlist]
    this.setState({ addlists, inputValue: '' }, () => {
      console.log('State: ', this.state)
    })
  }
  render() {
    const { modalVisible,
      inputValue,
      addlists,
    } = this.state;
    return (
      <View>
        <ScrollView keyboardShouldPersistTaps='always' style={styles.container}>
        <Addlist addlists={addlists}/>
        </ScrollView>
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View >
            <TouchableOpacity >
              <View>
                <TextInput
                  placeholder='Enter lecture name'
                  Value={inputValue}
                  onChangeText={(text) => this.inputChange(text)}
                  style={styles.ModalView}
                />
              </View>
              <View>
                <TouchableOpacity
                  style={styles.openButton}
                  onPress={() => {
                    this.setModalVisible(!modalVisible),
                      this.submitAddlist()
                  }}
                >
                  <Text style={styles.textStyle}>Done</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => {
          this.setModalVisible(true);
        }}>
          <View style={styles.button}>
            <Text style={styles.plustext}>+</Text>
          </View>
        </TouchableOpacity>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 750,
  },
  button: {
    borderRadius: 30,
    height: 60,
    borderWidth: 1,
    width: 60,
    backgroundColor: "pink",
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalView: {
    //   position: 'absolute',
    //  margin: 20,
    //  backgroundColor: "green",
    //borderRadius: 20,
    //borderWidth: 1,
  },
  plustext: {
    alignSelf: "center",
    justifyContent: 'center',
    fontSize: 30
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    width: 60,
    padding: 10,
    elevation: 2,
    alignSelf: 'center'
  },
  todoContainer: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#ededed',
    paddingLeft: 14,
    paddingTop: 7,
    paddingBottom: 7,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    flexDirection: 'row',
    alignItems: 'center'
  },
  todoText: {
    fontSize: 17
  }
})
export default App