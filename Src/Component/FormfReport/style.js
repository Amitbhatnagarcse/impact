import { StyleSheet,Dimensions } from 'react-native';
import {BASE_URL,Yellowcolour} from '../../../Constants'


export default StyleSheet.create({

	containertab: {
		
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Yellowcolour,
		borderRadius:1,
		borderWidth: 1,
		borderColor: '#000'
	  },
	  containertabwhite: {
		flex:1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius:1,
		borderWidth: 0.5,
		borderColor: '#000'
	  },
	  tabtitledata :{
		flex:1,textAlign:'center',paddingTop:10,paddingBottom:10,color:'#000'
	  },
	  tabtitle :{
		flex:1,textAlign:'center',paddingTop:10,paddingBottom:10,color:'#fff'
	  },
	  line :{
			width:1,
			height:40,
			backgroundColor:'#000',
	  },
body:{
	flex:1, 
},
  button: {
    marginBottom: 10,
  },
  container: {
	flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInput: {
    borderBottomColor: '#151313',
    borderBottomWidth: 1,
    marginRight: 10,
  },
  resultTitle: {
    marginTop: 20,
    fontSize: 20,
  },
  result: {
    fontSize: 14,
    margin: 10,
  },
  optionsRow: {
    justifyContent: 'space-between',
  },
  searchPackageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerView: {
    backgroundColor: '#cc8800', alignItems: 'center', width: '100%', flexDirection: 'row', height: 60,
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
		backgroundColor:'#FFEFD5'
	  },  
	  input: {
	   backgroundColor:'#fff',
		borderWidth: 1,
		paddingStart:5,
		borderColor:'#1133ee',
		width:'50%',
		fontSize:14,
		marginRight:0.5,
		
	  },
	  inputfixheight: {
		backgroundColor:'#fff',
		 borderWidth: 1,
		 paddingStart:5,
		 borderColor:'#1133ee',
		 width:'50%',
		 fontSize:14,
		 height:40,
		
		 
	   },
	  inputliketext: {
		backgroundColor:'#fff',
		 borderWidth: 1,
		 borderColor:'#1133ee',
		 padding:5,
		 flex:1,
		 fontSize:12,
		 marginRight:0.5,
	   },
	   inputlikefile: {
		backgroundColor:'#fff',
		 borderWidth: 1,
		 borderColor:'#e1e1e1',
		 padding:5,
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
	  dialogue:{
		// backgroundColor:'blue',
		alignSelf:'center',
		// minWidth: '80%',
		justifyContent:'center',
		flex:1,
	backgroundColor:'#00000088',
	width:'100%',
	},
	dialogueContainer:{
		width:280,
		alignItems: 'center',
		backgroundColor : '#ffffff',
		borderWidth: 1,
		alignSelf:'center',
		height:234,
		flexWrap: "wrap",
		borderColor:'#e1e1e1',
		borderRadius:17,
	},
	dialogCamera:{
		color:'#cc8800',
		fontSize:22,
		marginTop:15,
		marginBottom:15,
	},
	dialogueCancel:{
		width:280,
		backgroundColor:'#b6b6b655',
		textAlign:'center',
		fontSize:20,
		borderRadius:17,
		height:40,
		paddingTop:5,
		alignItems:'center',
		position:'absolute',
		bottom:0
	},
	buttonsubmit: {
		backgroundColor: 'brown',
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 12,
		color: 'white',
		width:'100%',
	    marginLeft:0,
	    marginRight:0,
		fontSize: 14,
		fontWeight: 'bold',
		padding: 12,
		textAlign:'center',
	  }


})