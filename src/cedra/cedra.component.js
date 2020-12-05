import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {defaultForm, validateForm} from './util';
import CedraButton from './components/cedra.button.component';
import CedraYNButton from './components/cedra.yn.button.component';

const CEDRAScreen = ({
  route,
  navigation,
  fetchTestResults,
  setTestResults,
  session,
  sessionId,
}) => {
  
  const [cedra, setCedra] = React.useState(defaultForm);

  React.useEffect(() => {
    fetchTestResults({sessionId, type: 'cedra'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setCedra(session.cedra ? session.cedra : defaultForm);
  }, [session.cedra]);

  const setCedraState = (key, value) => {
    console.log('kv  :  ', key, value);
    setCedra({...cedra, [key]: value});
  };

  const onPressSubmit = () => {
    //TODO prepare cedra form
    //TODO formCompleted need to formed
    //use validateForm to find formCompleted
    let formCompleted = false;
    let data = {
      sessionId,
      payload: cedra,
      type: 'cedra',
      formCompleted,
    };
    setTestResults(data);
    navigation.navigate('WizardScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Questions about your Hearing Health</Text>
        <View style={styles.questionContainer}>
          <View style={styles.inputLabel}>
            <Text style={styles.question}>
              1. When talking on a telephone, do you understand what people say
              better in one ear than the other?
            </Text>
          </View>
          <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
            value={cedra.q1YesNo}
            setPressed={(val) => setCedraState('q1YesNo', val)}
          />
        </View>

        <View style={styles.questionContainer}>
          <View style={styles.inputLabel}>
            <Text style={styles.question}>
              2. Did the hearing loss in either of your ears develop suddenly?
            </Text>
          </View>
          <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
            value={cedra.q2YesNo}
            setPressed={(val) => setCedraState('q2YesNo', val)}
          />
        </View>

        <View style={styles.questionContainer}>
          <View style={styles.inputLabel}>
            <Text style={styles.question}>
              3. Have you ever had a sudden permanent change in your hearing?
            </Text>
          </View>
          <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
            value={cedra.q3YesNo}
            setPressed={(val) => setCedraState('q3YesNo', val)}
          />
        </View>

        <View style={styles.questionContainer}>
          <View style={styles.inputLabel}>
            <Text style={styles.question}>
              4. Do you have hearing loss in only one ear?
            </Text>
          </View>
          <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
            value={cedra.q4YesNo}
            setPressed={(val) => setCedraState('q4YesNo', val)}
          />
        </View>

        <View style={styles.questionContainer}>
          <View style={styles.inputLabel}>
            <Text style={styles.question}>
              5. Do you hear better in one ear than the other?
            </Text>
          </View>
          <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
            value={cedra.q5YesNo}
            setPressed={(val) => setCedraState('q5YesNo', val)}
          />
        </View>

        <View style={styles.questionContainer}>
          <View style={styles.inputLabel}>
            <Text style={styles.question}>
              6. Does your hearing change from day to day?
            </Text>
          </View>
          <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
            value={cedra.q6YesNo}
            setPressed={(val) => setCedraState('q6YesNo', val)}
          />
        </View>

        <View style={styles.questionContainer}>
          <View style={styles.inputLabel}>
            <Text style={styles.question}>
              7. As an adult, have you ever had more than one infection in the
              same ear during one year?
            </Text>
          </View>
          <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
            value={cedra.q7YesNo}
            setPressed={(val) => setCedraState('q7YesNo', val)}
          />
        </View>

        <View style={styles.questionContainer}>
          <View style={styles.inputLabel}>
            <Text style={styles.question}>
              8. Have you ever noticed pus, blood or other active fluid
              discharge from your ear?
            </Text>
          </View>
          <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
            value={cedra.q8YesNo}
            setPressed={(val) => setCedraState('q8YesNo', val)}
          />
        </View>

        <View style={styles.questionContainer}>
          <View style={styles.inputLabel}>
            <Text style={styles.question}>
              9. Have you ever been told by a physician that you have Meniere’s
              disease?
            </Text>
          </View>
          <CedraYNButton   primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
            value={cedra.q9YesNo}
            setPressed={(val) => setCedraState('q9YesNo', val)}
          />
        </View>

        <View style={styles.questionContainer}>
          <View style={styles.inputLabel}>
            <Text style={styles.question}>
              10. Overall, how would you rate your health?
            </Text>
          </View>
          <CedraButton primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
            setPressed={(val) => setCedraState('q10', val)}
            values={['Very Good', 'Good', 'Poor', 'Very Poor']}
            value={cedra.q10}
          />
        </View>
        <View style={styles.questionContainer}>
          <View style={styles.inputLabel}>
            <Text style={styles.question}>
              11. How often do you have dizziness?
            </Text>
          </View>
          <CedraButton primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
            value={cedra.q11}
            setPressed={(val) => setCedraState('q11', val)}
            values={['Never', 'Occationally', 'Frequently', 'Always']}
          />
        </View>

        <View style={styles.questionContainer}>
          <View style={styles.inputLabel}>
            <Text style={styles.question}>
              12. How would you rate your balance?
            </Text>
          </View>
          <CedraButton primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
            value={cedra.q12}
            setPressed={(val) => setCedraState('q12', val)}
            values={['Very Good', 'Good', 'Poor', 'Very Poor']}
          />
        </View>

        <View style={styles.questionContainer}>
          <View style={styles.inputLabel}>
            <Text style={styles.question}>
              13. Do you have tinnitus, such as ringing, roaring, or
              cricket-like sounds in your ears?
            </Text>
          </View>
          <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
            value={cedra.q13}
            setPressed={(val) => setCedraState('q13', val)}
          />
        </View>
        {cedra.q13 == 'yes' && (
          <View style={styles.Container13}>
            <View style={styles.questionContainer}>
              <View style={styles.inputLabel}>
                <Text style={styles.question}>
                  13. a. Do you have tinnitus in (Select one)
                </Text>
              </View>
              <CedraButton primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
                value={cedra.q13a}
                setPressed={(val) => setCedraState('q13a', val)}
                values={['Right Ear', 'Left Ear', 'Both Ears', 'Unsure']}
              />
            </View>
            <View style={styles.questionContainer}>
              <View style={styles.inputLabel}>
                <Text style={styles.question}>
                  Do you have following symptoms with your tinnitus?
                </Text>
                <Text style={styles.question}>Dizziness</Text>
              </View>
              <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
                value={cedra.q13b1}
                setPressed={(val) => setCedraState('q13b1', val)}
              />
            </View>
            <View style={styles.questionContainer}>
              <View style={styles.inputLabel}>
                <Text style={styles.question}>Pressure in the ears?</Text>
              </View>
              <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
                value={cedra.q13b2}
                setPressed={(val) => setCedraState('q13b2', val)}
              />
            </View>
            <View style={styles.questionContainer}>
              <View style={styles.inputLabel}>
                <Text style={styles.question}>Fullness in the ears?</Text>
              </View>
              <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
                value={cedra.q13b3}
                setPressed={(val) => setCedraState('q13b3', val)}
              />
            </View>
            <View style={styles.questionContainer}>
              <View style={styles.inputLabel}>
                <Text style={styles.question}>
                  Plugged feeling in the ears?
                </Text>
              </View>
              <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
                value={cedra.q13b4}
                setPressed={(val) => setCedraState('q13b4', val)}
              />
            </View>
          </View>
        )}
        <View style={styles.additionalQuestionContainer}>
          <Text style={styles.question}>
            14. Have you ever had any of the following symptoms lasting longer
            than 10 minutes?
          </Text>
          <View style={styles.questionContainer}>
            <View style={styles.inputLabel}>
              <Text style={styles.question}>
                Sudden drop in hearing in one or both ears
              </Text>
            </View>
            <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
              value={cedra.q14_1}
              setPressed={(val) => setCedraState('q14_1', val)}
            />
          </View>

          <View style={styles.questionContainer}>
            <View style={styles.inputLabel}>
              <Text style={styles.question}>
                A rapid change in vision in one or both eyes
              </Text>
            </View>
            <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
              value={cedra.q14_2}
              setPressed={(val) => setCedraState('q14_2', val)}
            />
          </View>
        </View>
        <View style={styles.additionalQuestionContainer}>
          <Text style={styles.question}>
            15. In the past 3 months, have you had any of the following
            symptoms?
          </Text>
          <View style={styles.questionContainer}>
            <View style={styles.inputLabel}>
              <Text style={styles.question}>
                Any persistent discharge from either ear
              </Text>
            </View>
            <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
              value={cedra.q15_1}
              setPressed={(val) => setCedraState('q15_1', val)}
            />
          </View>

          <View style={styles.questionContainer}>
            <View style={styles.inputLabel}>
              <Text style={styles.question}>Puss or blood in your ears</Text>
            </View>
            <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
              value={cedra.q15_2}
              setPressed={(val) => setCedraState('q15_2', val)}
            />
          </View>

          <View style={styles.questionContainer}>
            <View style={styles.inputLabel}>
              <Text style={styles.question}>
                Any persistent pain in or around either ear
              </Text>
            </View>
            <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
              value={cedra.q15_3}
              setPressed={(val) => setCedraState('q15_3', val)}
            />
          </View>

          <View style={styles.questionContainer}>
            <View style={styles.inputLabel}>
              <Text style={styles.question}>
                A change in hearing in one or both ears
              </Text>
            </View>
            <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
              value={cedra.q15_4}
              setPressed={(val) => setCedraState('q15_4', val)}
            />
          </View>

          <View style={styles.questionContainer}>
            <View style={styles.inputLabel}>
              <Text style={styles.question}>
                A head cold or sinus problem that made your hearing worse
              </Text>
            </View>
            <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
              value={cedra.q15_5}
              setPressed={(val) => setCedraState('q15_5', val)}
            />
          </View>

          <View style={styles.questionContainer}>
            <View style={styles.inputLabel}>
              <Text style={styles.question}>Dizziness</Text>
            </View>
            <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
              value={cedra.q15_6}
              setPressed={(val) => setCedraState('q15_6', val)}
            />
          </View>

          <View style={styles.questionContainer}>
            <View style={styles.inputLabel}>
              <Text style={styles.question}>Fell because of poor balance</Text>
            </View>
            <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
              value={cedra.q15_7}
              setPressed={(val) => setCedraState('q15_7', val)}
            />
          </View>

          <View style={styles.questionContainer}>
            <View style={styles.inputLabel}>
              <Text style={styles.question}>
                A persistent or recurring headache
              </Text>
            </View>
            <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
              value={cedra.q15_8}
              setPressed={(val) => setCedraState('q15_8', val)}
            />
          </View>

          <View style={styles.questionContainer}>
            <View style={styles.inputLabel}>
              <Text style={styles.question}>
                Recurring fever, night sweats, chills
              </Text>
            </View>
            <CedraYNButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor} 
              value={cedra.q15_9}
              setPressed={(val) => setCedraState('q15_9', val)}
            />
          </View>
        </View>
        <TouchableOpacity onPress={onPressSubmit} style={{...styles.darkButton,  backgroundColor: session.sessionData.primaryColor}}>
          <Text style={styles.whiteText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CEDRAScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 2,
  },
  inputLabel: {
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  additionalQuestionContainer: {
    width: '100%',
    backgroundColor: '#e6e6e6',
    margin: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionContainer: {
    width: '95%',
  },
  question: {
    fontWeight: '500',
  },
  darkButton: {
    backgroundColor: '#193371',
    padding: 10,
    margin: 10,
    width: '95%',
    alignItems: 'center',
    borderRadius: 4,
  },
  whiteText: {
    fontSize: 18,
    color: '#fff',
  },
  Container13: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
