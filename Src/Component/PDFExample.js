 
import React from 'react';
import { StyleSheet,Dimensions,SafeAreaView, View,TouchableOpacity,Button ,Text ,Image ,Platform} from 'react-native';
import backarrow from '../../assets/img/backnew.png';
import Pdf from 'react-native-pdf';
import images from '../../assets/img/imgBase64.js';
import { requestMultiple, checkMultiple, PERMISSIONS, checkNotifications, RESULTS, requestNotifications, openSettings } from 'react-native-permissions';

import {BASE_URL} from '../../Constants'

import RNFS from 'react-native-fs';
import Share from 'react-native-share';
var localpdf = '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czw8L1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldL0ZvbnQ8PC9GMSAxIDAgUi9GMiAyIDAgUj4+Pj4vQ29udGVudHMgNiAwIFIvUGFyZW50IDQgMCBSPj4KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZz4+CmVuZG9iagoyIDAgb2JqCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1R5cGUxL0Jhc2VGb250L0hlbHZldGljYS1Cb2xkL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZz4+CmVuZG9iago0IDAgb2JqCjw8L1R5cGUvUGFnZXMvQ291bnQgMi9LaWRzWzUgMCBSIDcgMCBSXS9JVFhUKDUuMC41KT4+CmVuZG9iago4IDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyA0IDAgUj4+CmVuZG9iago5IDAgb2JqCjw8L1Byb2R1Y2VyKGlUZXh0U2hhcnAgNS4wLjUgXChjXCkgMVQzWFQgQlZCQSkvQ3JlYXRpb25EYXRlKEQ6MjAyMDA1MjcxNzEwNDcrMDUnMzAnKS9Nb2REYXRlKEQ6MjAyMDA1MjcxNzEwNDcrMDUnMzAnKT4+CmVuZG9iagp4cmVmCjAgMTAKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDA0NjE1IDAwMDAwIG4gCjAwMDAwMDQ3MDMgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDA0Nzk2IDAwMDAwIG4gCjAwMDAwMDI5NzUgMDAwMDAgbiAKMDAwMDAwMzE0MSAwMDAwMCBuIAowMDAwMDA0NDQ5IDAwMDAwIG4gCjAwMDAwMDQ4NjUgMDAwMDAgbiAKMDAwMDAwNDkxMCAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgMTAvUm9vdCA4IDAgUi9JbmZvIDkgMCBSL0lEIFs8ZTBlMjdmYjBjN2IxNjM3NGQ0OGQ1Y2VhMGM4ZmVlNTg+PGU2MjZhMjk2MDhmOTg1ZWNjMzBlYmEyYmU2YTZjNDY0Pl0+PgpzdGFydHhyZWYKNTA0NQolJUVPRgo=';
import RNFetchBlob from 'rn-fetch-blob'


export default class PDFExample extends React.Component {
    
  allowLocationPermission = () => {
    
    if (this.state.locationPermissionStatus == RESULTS.DENIED) {
        requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]).then(
            (statuses) => {
              
                if (Platform.OS == 'android') {

                  if(statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] == RESULTS.BLOCKED)
                  {
                    
                    openSettings().catch(() => console.warn('cannot open settings'));
                    return;
                  }
                    this.setState({
                      locationPermissionStatus : statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] 
                    })
                }
                // if (Platform.OS == 'ios') {
                //     //setLocationPermissionStatus(statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE])
                // }

            },
        );

    }
    else {
     
        openSettings().catch(() => console.warn('cannot open settings'));
    }
}

   downloadfile = async () => {

    
    const dirs = RNFetchBlob.fs.dirs;
    var name = new Date().getTime()
    var path = dirs.DCIMDir + `/${name}.pdf`;
    console.log(path)
    RNFetchBlob.fs.writeFile(path,this.state.pdfs, 'base64')
    .then((res) => {console.warn("File : ", res)});

    if (Platform.OS === 'android') {
      RNFetchBlob.android.actionViewIntent(path, 'application/pdf');
    } else {
      RNFetchBlob.ios.previewDocument(path);
    }

        } 
 
  shareToFiles = async () => {
    const shareOptions = {
      title: 'Share file',
      failOnCancel: false,
      saveToFiles: true,
     
      urls: [images.pdf1], // base64 with mimeType or path to local file
    };

    // If you want, you can use a try catch, to parse
    // the share response. If the user cancels, etc.
    try {
      const ShareResponse = await Share.open(shareOptions);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };
   

   shareMultipleImages = async () => {
    const shareOptions = {
      title: 'Share file',
      failOnCancel: false,
      urls: [`data:application/pdf;base64,${this.state.pdfs}`],
    };

    // If you want, you can use a try catch, to parse
    // the share response. If the user cancels, etc.
    try {
      const ShareResponse = await Share.open(shareOptions);
      setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      setResult('error: '.concat(getErrorString(error)));
    }
  };
          state = {
            load: false,
            pdfs: '',
            locationPermissionStatus : RESULTS.DENIED,
          }       
          
  async  onSubmit(){
        this.shareMultipleImages()
        //this.shareToFiles();
    }
    componentDidMount()
    {
      
      const{ id_pdf  } = this.props.route.params;
        this.getpdf(id_pdf);
        this.allowLocationPermission();
    }


    async getpdf(id_)
      { 
        // this.setState({ load: true });
        var data = new URLSearchParams();
        data.append('PatientId',id_)
          fetch(BASE_URL+"GetFormFDetail", {
            method: "POST",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data.toString(),
            json: true,
          })
            .then(response => response.json())
            .then(responseJson => {
             this.setState({ load: false });
             if(responseJson.Status)
             {
                this.setState({pdfs : responseJson.ResponseData}) 
             }
              //this.setState({ load: false ,dataSource : responseJson.IdentityProofType});
              console.warn(JSON.stringify(responseJson));
             
            })
            .catch(error => {
              this.setState({ load: false });
            
            });
        }

        _headerBar = () => {
            return (
              <View style={styles.headerView}>
              
                  <View style={{ width: 50, height: 40,   zIndex: 1,alignContent:'center' ,justifyContent:'center'}}>
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Image
                      style={{ width: 35, height: 35,paddingLeft:10,padding:5}}
                      source={backarrow}
                    />
                    </TouchableOpacity>
                  </View>
        
                {this.getNormalHeader()}
              </View>)
          }
          getNormalHeader(){
            return(
              <Text style={{ color: 'black',  fontSize: 20,marginLeft:-50,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center' }}>Pdf View</Text>
            )
          }
    render() {
        //const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};
        //const source = require('./test.pdf');  // ios only
        //const source = {uri:'bundle-assets://test.pdf'};
 
        //const source = {uri:'file:///sdcard/test.pdf'};
        const source = {uri:`data:application/pdf;base64,${this.state.pdfs}`};
 
        return (
            <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                  {this._headerBar()}
                <Pdf
                    source={source}
                    scale={1}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.warn(`number of pages: ${filePath}`);

                    }}
                    onPageChanged={(page,numberOfPages)=>{
                      //  console.warn(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.warn(error);
                    }}
                    onPressLink={(uri)=>{
                        console.warn(`Link presse: ${uri}`)
                    }}
                    style={styles.pdf}/>
                    {Platform.OS == 'android' && (
                     <TouchableOpacity style = {styles.button} onPress={() => this.onSubmit()}>
          <Text style={styles.button}> Share File </Text>
        </TouchableOpacity>
        )}

        {Platform.OS === 'ios' && (
          <View style={styles.button}>
            <Button onPress={ () => this.shareToFiles() } title="Share To Files" />
          </View>
        )}

           
            <TouchableOpacity style = {styles.button} onPress={() => this.downloadfile()}>
          <Text style={styles.button}> Download File </Text>
        </TouchableOpacity>
          
        
            </View>
            </SafeAreaView>
        )
  }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
       
    },
    button: {
        width : '100%',
        backgroundColor: 'brown',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        color: 'white',
       marginLeft:0,
       marginRight:0,
        fontSize: 14,
        fontWeight: 'bold',
        padding: 2,
        textAlign:'center',
      },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    headerView: {
        backgroundColor: '#cc8800', alignItems: 'center', width: '100%', flexDirection: 'row', height: 60,
          justifyContent: 'flex-start',elevation:5,
        },
});