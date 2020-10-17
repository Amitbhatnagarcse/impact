import { StyleSheet, Dimensions } from 'react-native';
import { Gradientcolourbluew, Yellowcolour, BlueColor, Gradientcolourlight } from '../../../Constants'


export default StyleSheet.create({




	container: {
		flex: 1,
		backgroundColor: Gradientcolourlight,
	},


	headerView: {
		backgroundColor: Gradientcolourbluew, width: '100%', flexDirection: 'column', height: 200,
		elevation: 5,
		paddingTop: 20,
	},
	inputboxview: {
		margin: 2,
		padding: 1,
		width: '99%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		backgroundColor: 'white'
	},


	inputblue: {
		backgroundColor: BlueColor,
		borderWidth: 1,
		padding: 5,
		minHeight: 30,
		borderColor: '#006400',
		width: '15%',
		color: 'white',
		fontSize: 14,
		marginRight: 0.5,
	},

	inputtext: {
		padding: 5,
		width: '85%',
		fontSize: 13,
		flex: 1,
	},



})