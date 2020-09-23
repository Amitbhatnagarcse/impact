import { StyleSheet,Dimensions } from 'react-native';


export default StyleSheet.create({
body:{
	flex:1, 
},
input: {
	borderWidth: 1,
    padding:2,
    width:'65%',
	fontSize:14,
	backgroundColor:'#fff',
	alignSelf: 'baseline',
	overflow: 'hidden',
    textAlign:'center',
  },

  button: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
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
		margin : 0.5, 
		padding :1,
		width:'100%',
		flexDirection:'row',
		alignItems: 'center',
		borderWidth: 0.3,
		backgroundColor:'#FFEFD5',
		justifyContent:'space-evenly'
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
		padding:2,
		width:'35%',
		fontSize:13,
		flex:1, 
	  },  inputtextbig: {
		padding:2,
		width:'35%',
		fontSize:13,
		flex:1, 
		paddingBottom:10,
		paddingTop:10
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
		backgroundColor: 'red',
		borderColor: 'white',
		borderRadius: 1,
		color: 'white',
		width:'45%',
	    marginLeft:0,
	    marginRight:0,
		fontSize: 14,
		fontWeight: 'bold',
		padding: 0,
		textAlign:'center',
	  },
	  buttonsubmityellow: {
	
		color: 'white',
		width:'10%',
	    marginLeft:0,
		marginRight:0,
		alignItems: "center",
		
	  }


})