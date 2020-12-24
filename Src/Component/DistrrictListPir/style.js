import { StyleSheet,Dimensions } from 'react-native';
import {Gradientcolourbluew,Yellowcolour,BlueColor,Gradientcolourlight} from '../../../Constants'


export default StyleSheet.create({

	
	

  container: {
	flex: 1,
    alignItems: 'center',
    backgroundColor: Gradientcolourlight,
  },
  
 
  headerView: {
    backgroundColor: Gradientcolourbluew, alignItems: 'center', width: '100%', flexDirection: 'row', height: 60,
      justifyContent: 'flex-start',elevation:5,
	},
	inputboxview :{
		margin : 2, 
		padding :1,
		width:'99%',
		flexDirection:'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		backgroundColor:'white'
	  }, 
	
	  inputliketext: {
		backgroundColor:'#fff',
		 borderWidth: 1,
		 borderColor:'#1133ee',
		 padding:5,
		 marginLeft :5,
		 marginRight :5,
		 flex:1,
		 fontSize:12,
		 marginRight:0.5,
	   },
	  inputtext: {
		padding:5,
		width:'50%',
		fontSize:13,
		flex:1, 
	  },
	
	  inputblue: {
		backgroundColor:BlueColor,
		 borderWidth: 1,
		 padding:5,
		 minHeight:30,
		 borderColor:'#006400',
		 width:'10%',
		 color : 'white',
		 fontSize:14,
		 marginRight:0.5,
	   },
	  
	  inputtext: {
		padding:5,
		width:'85%',
		fontSize:13,
		flex:1, 
	  },
	
	

})