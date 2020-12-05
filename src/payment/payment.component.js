import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DownArrow from 'react-native-vector-icons/FontAwesome'
import SegmentTab from './index';
import TextInputMask from 'react-native-text-input-mask';
import RadioButton from 'react-native-radio-button'
import { postPayment } from '../store/actioncreators/patient.actioncreator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      primaryColor: props.session.primaryColor,
      secondaryColor: props.session.secondaryColor,
      showPurchaseTab: false,
      selectedPaymentMethod: 0,
      showcreditcard: true,
      personalAccount: true,
      bussinessAccount: false,
      myPurchasesData: [],
      totalAmount: 0,
      finalAmount: 0,
      remainingAmount: 0,
      totalPaid: 0,
      salesTax: 0,
      paymentMethod: 'CC',
      selectedAccount: 'PA',
      displayToPatient: false,
      cardNumber: "",
      securityCode: "",
      zipCode: "",
      expireYear: "",
      expireMonth: "",
      accountHolderName: "",
      bankName: "",
      routingNumber: "",
      accountNumber: "",
      responseMessage: null,
      errorMessage: null,
      paymentProcessing: false,
      expireYearMonth: '',
      totalPurchaseAmount: 0,
      error: null,
      txnId: null
    };
  }

  process = (state) => {

    if (state && state.purchases && state.purchases.length > 0) {
      var P = []
      for (let index = 0; index < state.purchases.length; index++) {
        state.purchases[index].opened = false
        P.push(state.purchases[index])
      }
      let totalPurchaseAmount = this.getTotalAmount(state.purchases);
      let totalPaid = this.getTotalPaid(state.transactions);
      this.setState(
        {
          myPurchasesData: P,
          txnId: null,
          error: null,
          payNowAmount: state.payNowAmount,
          totalPurchaseAmount: totalPurchaseAmount,
          remainingAmount: (totalPurchaseAmount - state.payNowAmount) - totalPaid,
        })
    } else {
      this.setState({ myPurchasesData: [] })
    }

  };

  getTotalPaid(transactions) {
    let totalPaid = 0;
    transactions.map(p => {
      if (p.status === "success") {
        totalPaid += p.amount;
      }
    });
    return totalPaid;
  }

  getTotalAmount(purchases) {
    let totalAmount = 0;
    purchases.map(p => {
      totalAmount += p.amount;
    });
    return totalAmount;
  }

  updateListState(select, value) {
    this.setState({
      myPurchasesData: this.state.myPurchasesData.map(item => {
        if (item.purchaseId == select) {
          return {
            ...item,
            opened: value,
          };
        } else {
          return {
            ...item,
            opened: false,
          };
        }
      }),
    });
  }

  updateDate = (val) => {

    if (val.length === 1)
      return 0 + val;
    else
      return val;

  }

  getRequestForPayment(method) {
    var M = {}
    if (method == 0) {
      M = {
        sessionId: this.props.shortSessionId,
        paymentMethod: 'CC',
        accountType: this.state.selectedAccount,
        salesTax: this.state.salesTax,
        totalPurchaseAmount: this.state.totalPurchaseAmount,
        payNowAmount: this.state.payNowAmount,
        paidBy: "patient",
        cardNumber: this.state.cardNumber,
        expirationDate: this.updateDate(this.state.expireYearMonth.split('/')[0]) + this.updateDate(this.state.expireYearMonth.split('/')[1]),
        cardCode: this.state.securityCode,
        zipCode: this.state.zipCode,
      }
    } else if (method == 1) {
      M = {
        sessionId: this.props.shortSessionId,
        paymentMethod: 'BA',
        accountType: this.state.personalAccount == true ? 'PA' : 'BA',
        salesTax: this.state.salesTax,
        totalPurchaseAmount: this.state.totalPurchaseAmount,
        payNowAmount: this.state.payNowAmount,
        paidBy: "patient",
        routingNumber: this.state.routingNumber,
        accountNumber: this.state.accountNumber,
        nameOnAccount: this.state.accountHolderName,
        bankName: this.state.bankName,
      }
    }
    return M
  }

  handlePay() {
    const { selectedPaymentMethod } = this.state
    var RequestToSend = ''
    if (selectedPaymentMethod == 0) {
      RequestToSend = this.getRequestForPayment(this.state.selectedPaymentMethod)
    } else if (selectedPaymentMethod == 1) {
      RequestToSend = this.getRequestForPayment(this.state.selectedPaymentMethod)
    }
    if (!this.props.loading) // post only if the loading is not true
      this.props.postPayment(RequestToSend);
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
    if (prevProps.paymentData !== this.props.paymentData) {
      this.process(this.props.paymentData)
    }
    if (prevProps.error !== this.props.error) {
      this.setState({ error: this.props.error, myPurchasesData: [] });
      this.props.updateProviderPayments(this.props.error);
    }
    if (prevProps.paymentResp !== this.props.paymentResp) {
      this.setState({ txnId: this.props.paymentResp.transactionId, myPurchasesData: [] });
      this.props.updateProviderPayments(this.props.paymentResp);
    }
  }

  render() {
    const { myPurchasesData, selectedPaymentMethod, cardNumber, primaryColor, secondaryColor } = this.state;

    if (myPurchasesData.length && !this.state.txnId && !this.state.error) {
      return (
        <KeyboardAwareScrollView style={styles.container}>
          { myPurchasesData.map((item, index) => (
            <View>
              <View style={styles.mainContainer}>
                <View style={styles.row}>
                  <Text style={styles.TextStyle}>{item.modelName}</Text>
                  {item.opened == true ? (<DownArrow onPress={() => { this.updateListState(item.purchaseId, false) }} size={25} name={'chevron-down'} style={{ alignSelf: 'center', marginRight: 20, color: 'grey', transform: [{ rotate: '180deg' }] }}></DownArrow>) : (
                    <DownArrow size={25} onPress={() => { this.updateListState(item.purchaseId, true) }} name={'chevron-down'} style={{ alignSelf: 'center', marginRight: 20, color: 'grey' }}></DownArrow>)}
                </View>
                {item.opened == true ? (<View>
                  <View style={styles.rowWhite}>
                    <Text style={styles.TextStyle}>{item.manufacturer}</Text>
                    <Text style={styles.TextStyle}>${item.amount}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.TextStyle}>Purchase Total:</Text>
                    <Text style={styles.TextStyle}>${item.amount}</Text>
                  </View>
                  <View style={styles.rowWhite}>
                    <Text style={styles.TextStyle}>Sales Tax:</Text>
                    <Text style={styles.TextStyle}>${'0'}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.TextStyle}>Total:</Text>
                    <Text style={styles.TextStyle}>${item.amount}</Text>
                  </View>
                </View>) : (null)}
              </View>
            </View>))}
          <View style={styles.mainContainer}>
            <View style={styles.rowWhite}>
              <Text style={styles.TextStyle}>Pay Now:</Text>
              <Text style={styles.TextStyle}>${this.state.payNowAmount}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.TextStyle}>Remaining</Text>
              <Text style={styles.TextStyle}>${this.state.remainingAmount}</Text>
            </View>
          </View>
          <SegmentTab
            data={['Credit Card', 'Bank Account']}
            style={{
              alignSelf: 'center',
              marginTop: 10,
              fontSize: 15,
            }}
            borderRadius={5}
            selected={selectedPaymentMethod}
            verticalWidth={50}
            textActiveColor={'#ffffff'}
            textInActiveColor={secondaryColor}
            horizontalWidth={'90%'}
            horizontalHeight={40}
            activeColor={secondaryColor}
            inActiveColor={'#FFFFFF'}
            onPress={index => {
              this.setState({ selectedPaymentMethod: index })
            }}
            titleSize={18}
          />
          {selectedPaymentMethod == 0 ?
            (
              
            <View>
              <TextInputMask
                placeholder={'xxxx-xxxx-xxxx-xxxx'}
                style={{ alignSelf: 'center', borderBottomWidth: 1, width: '90%', marginTop: 30, alignItems: 'center', height: 50, borderColor: 'grey' }}
                onChangeText={(formatted, extracted) => {
                  this.setState({ cardNumber: extracted })
                }}
                mask={"[0000] [0000] [0000] [0000]"}
              />
              <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center' }}>
                <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center' }}>
                  <TextInputMask
                    placeholder={'MM/YY'}
                    style={{ alignSelf: 'center', borderBottomWidth: 1, width: '100%', marginTop: 10, alignItems: 'center', height: 50, borderColor: 'grey' }}
                    onChangeText={(formatted, extracted) => {
                      this.setState({ expireYearMonth: formatted })
                    }}
                    mask={"[00]/[00]"}
                  />
                </View>
                <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center', paddingLeft: 10 }}>
                  <TextInputMask
                    placeholder={'CVV'}
                    style={{ alignSelf: 'center', borderBottomWidth: 1, width: '100%', marginTop: 10, alignItems: 'center', height: 50, borderColor: 'grey' }}
                    onChangeText={(formatted, extracted) => {
                      this.setState({ securityCode: extracted })
                    }}
                    mask={"[000]"}
                  />
                </View>
                <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center', paddingLeft: 10 }}>
                  <TextInputMask
                    placeholder={'ZIPCODE'}
                    style={{ alignSelf: 'center', borderBottomWidth: 1, width: '100%', marginTop: 10, alignItems: 'center', height: 50, borderColor: 'grey' }}
                    onChangeText={(formatted, extracted) => {
                      this.setState({ zipCode: extracted })
                    }}
                    mask={"[000000]"}
                  />
                </View>
              </View>
              <TouchableOpacity onPress={() => { this.handlePay() }} style={{...styles.darkButton, backgroundColor: primaryColor}}>
                <Text style={{ color: 'white', fontFamily: 'LibreFranklin-Medium' }}>Pay & Finish</Text>
              </TouchableOpacity>
            </View>) : (<View>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                  <RadioButton
                    size={15}
                    animation={'bounceIn'}
                    isSelected={this.state.personalAccount}
                    onPress={() => {
                      this.setState({ bussinessAccount: false, personalAccount: true })
                      //selectBussinessAccount(false)
                      //selectPersonalAccount(true)
                    }}
                  />
                  <Text style={{ fontFamily: 'LibreFranklin-Medium', marginLeft: 10, fontSize: 15 }}>Personal{'\n'}Account</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                  <RadioButton
                    size={15}
                    animation={'bounceIn'}
                    isSelected={this.state.bussinessAccount}
                    onPress={() => {
                      this.setState({ bussinessAccount: true, personalAccount: false })
                    }}
                  />
                  <Text style={{ fontFamily: 'LibreFranklin-Medium', marginLeft: 10, fontSize: 15 }}>Bussiness{'\n'}Account</Text>
                </View>
              </View>
              <Text style={{ fontFamily: 'LibreFranklin-Medium', marginLeft: 20, marginTop: 20 }}>Account Holder Name</Text>
              <TextInput
                onChangeText={(text) => {
                  this.setState({ accountHolderName: text })
                }}
                value={this.state.accountHolderName}
                placeholder={'Account Holder Name'}
                style={{ width: '90%', borderBottomWidth: 1, borderColor: 'grey', alignSelf: 'center', height: 40, marginTop: 10, borderWidth: 1, paddingLeft: 10, borderRadius: 5 }}
              >
              </TextInput>
              <Text style={{ fontFamily: 'LibreFranklin-Medium', marginLeft: 20, marginTop: 10 }}>Bank Name</Text>
              <TextInput
                value={this.state.bankName}
                onChangeText={(text) => {
                  this.setState({ bankName: text })
                }}
                placeholder={'Bank Name'}
                style={{ width: '90%', borderBottomWidth: 1, borderColor: 'grey', alignSelf: 'center', height: 40, marginTop: 10, borderWidth: 1, paddingLeft: 10, borderRadius: 5 }}
              >
              </TextInput>
              <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center' }}>
                <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center' }}>
                  <Text style={{ fontFamily: 'LibreFranklin-Medium', marginLeft: 0, marginTop: 10, alignSelf: 'flex-start' }}>Routing Number</Text>
                  <TextInput
                    value={this.state.routingNumber}
                    onChangeText={(text) => {
                      this.setState({ routingNumber: text })
                    }}
                    placeholder={'XXXXXXXXXXX'}
                    style={{ width: '100%', borderBottomWidth: 1, borderColor: 'grey', alignSelf: 'center', height: 40, marginTop: 10, borderWidth: 1, paddingLeft: 10, borderRadius: 5 }}
                  >
                  </TextInput>
                </View>
                <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center', paddingLeft: 10 }}>
                  <Text style={{ fontFamily: 'LibreFranklin-Medium', marginLeft: 0, marginTop: 10, alignSelf: 'flex-start' }}>Account Number</Text>
                  <TextInput
                    value={this.state.accountNumber}
                    onChangeText={(text) => {
                      this.setState({ accountNumber: text })
                    }}
                    placeholder={'XXXXXXXXXXXX'}
                    style={{ width: '100%', borderBottomWidth: 1, borderColor: 'grey', alignSelf: 'center', height: 40, marginTop: 10, borderWidth: 1, paddingLeft: 10, borderRadius: 5 }}
                  >
                  </TextInput>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => { this.handlePay() }}
                //onPress={onPress} 
                style={styles.darkButton}>
                <Text style={{ color: 'white', fontFamily: 'LibreFranklin-Medium' }}>Pay & Finish</Text>
              </TouchableOpacity>
            </View>)}
        </KeyboardAwareScrollView>
      );
    }
    else if (!myPurchasesData.length && this.state.txnId) {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.txnSuccessView} >
            <Text style={styles.txnTextSuccess}>Transaction completed successfully With Confirmation number <Text style={styles.txnId}>{this.props.paymentResp.transactionId}</Text></Text>
          </View>
        </ScrollView>
      )
    }
    else if (!myPurchasesData.length && this.state.error) {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.txnFailureView} >
            <Text style={styles.txnTextFailure}>{this.props.error.message}</Text>
          </View>
        </ScrollView>
      )
    }
    else {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.waittext}>Waiting for your provider to set your payment information.</Text>
          </View>
        </ScrollView>
      )
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flexDirection: 'column',
    width: '90%',
    borderWidth: 3,
    borderColor: '#E1E5E8',
    alignSelf: 'center'
  },
  textContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
    paddingTop: 60,
  },
  waittext: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  rowWhite: {
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row'
  },
  row: {
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F2',
    flexDirection: 'row'
  },
  instruction: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 6,
    width: '90%',
    backgroundColor: 'skyblue',
    marginBottom: 40,
  },
  TextStyle: {
    fontFamily: 'LibreFranklin-Medium',
    fontSize: 17, margin: 15
  },
  txnTextSuccess:{
    fontFamily: 'LibreFranklin-Medium',
    fontSize: 16,
    color:'#416146'
  },
  txnTextFailure:{
    fontFamily: 'LibreFranklin-Medium',
    fontSize: 16,
    color:'#7B464D'
  },
  darkButton: {
    backgroundColor: '#193371',
    padding: 10,
    margin: 10,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 20
  },
  txnSuccessView: {
    backgroundColor: '#D7EDDA',
    padding: 10,
    margin: 10,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  txnFailureView: {
    backgroundColor: '#F2D9D8',
    padding: 10,
    margin: 10,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  txnSuccessText: {

  },
  txnId: {
    fontFamily:'LibreFranklin-Bold',
    color:'#2D5834'
  }

});

function mapStateToProps(state) {
  return {
    error: state.patient.error,
    sessionId: state.patient.sessionId,
    shortSessionId: state.patient.session.sessionData.sessionId,
    loading: state.patient.loading,
    paymentResp: state.patient.session.paymentResp,
  };
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ postPayment }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);