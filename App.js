import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import axios from 'axios';

const API = "https://rickandmortyapi.com/api/"
class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			characters: [],
			currentPage: 1,
			totalPages: 0
		}
	}

	getCharacters(page = 1){
		axios.get(`${API}character/?page=${page}`)
		.then((response) => {
			let newData = this.state.characters;
			let data =  response.data && response.data.results || [];

			data.map((data) => { 
				newData.push(data);
			})

			this.setState({ 
				characters: newData,
				totalPages: response.data && response.data.info.pages || 0,
				currentPage: page
			})
		})
		.catch((error) => {
			console.log("error", error)
		})
	}

	componentDidMount(){
		this.getCharacters()
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Personagens</Text>
				<FlatList
					style={styles.list}
					data={this.state.characters}
					renderItem={({item, index}) => {
						return (
							<View key={index} style={styles.row}>
								
								<Image source={{uri: item.image}} style={styles.image} resizeMode="contain" />
				
								<View style={[styles.column, { marginLeft: 10}]}>
									<Text style={[styles.text, { fontWeight: "bold"}]}>{item.name}</Text>
									<Text style={styles.text}>{item.species}</Text>
									<Text style={styles.text}>{item.status}</Text>
								</View>
							</View>
							
						)
					}}
					ListFooterComponent={() => {
						return (<Text>-- End --</Text>)
					}}
					onEndReachedThreshold={0}
					onEndReached={this.getCharacters.bind(this,this.state.currentPage + 1 )}
				/>
			</View>
		);

	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 15
	},
	list: {
		flex: 1, 
		width: "100%", 
		padding: 10,
		marginTop: 10
	},
	image: {
		width: 80, 
		height: 80
	},
	row:{ 
		flex: 1,
		flexDirection: "row",
		margin: 10
	},
	column: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start"
	},
	text: {
		fontSize: 18
	}
})

export default App;