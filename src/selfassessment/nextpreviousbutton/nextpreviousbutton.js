import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';


export default class NextPreviousButtons extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  componentDidUpdate() {
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.previous}
          onPress={this.props.onPreviousPress}
        >
          <Text style={styles.previousText}>
            <Icon name={'chevron-thin-left'} size={18} />
            Previous
          </Text>
        </TouchableOpacity>

        {this.props.enableButton == true ? (<TouchableOpacity
          style={styles.next}
          onPress={this.props.onNextPress}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>) : (<TouchableOpacity
          style={styles.nextDisable}
        //onPress={this.props.onNextPress}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>)}



      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 30,
    alignSelf: 'center',
    backgroundColor: '#fff'
  },
  next: {
    width: '40%',
    height: 60,
    backgroundColor: '#105BE3',
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  nextDisable: {
    width: '40%',
    height: 60,
    backgroundColor: '#6288EB',
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  nextText: {
    fontFamily: 'LibreFranklin-Black',
    fontSize: 17,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#ffffff'
  },
  previous: {
    width: '40%',
    height: 60,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  previousText: {
    fontFamily: 'LibreFranklin-Black',
    fontSize: 17,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#000'
  },
});
