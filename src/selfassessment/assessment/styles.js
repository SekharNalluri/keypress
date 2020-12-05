import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({

  contain: {
    alignItems: "center",
    padding: 10,
    width: "100%",
    paddingTop: 100,
    backgroundColor: 'red', height: '100%'
  }, row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
    marginVertical: 4
  },
  bullet: {
    width: 10
  },
  bulletText: {
    fontFamily: 'LibreFranklin-Regular'
    //flex: 1
  },
  progressBar: {
    fontFamily: 'LibreFranklin-Black',
    fontSize: 24,
    marginTop: 20,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 20,
    color: '#105BE3'
  }

});