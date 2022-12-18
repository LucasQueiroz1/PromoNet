import { useEffect, useState } from 'react';
import { View, FlatList, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Inicio({ navigation }) {
  const [filmes, setFilmes] = useState([]);

  const [filmesLancamentos, setFilmesLancamentos] = useState([]);
  const [filmesEmAlta, setFilmesEmAlta] = useState([]);
  const [filmesTop, setFilmesTop] = useState([]);

  const [filmesFavoritos, setFilmesFavoritos] = useState([]);

  const addFilmeToFavoritos  = (filme) => {
    const newFavoritos = [...filmesFavoritos];
    newFavoritos.push(filme);
    setFilmesFavoritos(newFavoritos);
  }

  const getFilmesByTipo = async (tipo) => {
    try{
      let resposta = await fetch(
        `https://api.themoviedb.org/3/movie/${tipo}?api_key=3e8dec90feebc5e7d11344d90f9d75fe&language=pt-BR&page=1`
      );
      let json = await resposta.json();
      return (json.results);
    }catch(error){
      console.log(error);
    }
  }

  const navigateToDetails = (id) => {
    navigation.navigate('Detalhes', { id, addFilmeToFavoritos, filmesFavoritos })
  }

  useEffect(async () =>  {
    //getFilmes();
    const filmesPopulares = await getFilmesByTipo('popular');
    setFilmesEmAlta(filmesPopulares);

    const filmesTop = await getFilmesByTipo('top_rated');
    setFilmesTop(filmesTop);

    const filmesLancamento = await getFilmesByTipo('upcoming');
    setFilmesLancamentos(filmesLancamento);
  }, []);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#000000'}}>

      <Text style={{fontSize: 22, color: '#fff', padding: 5}}>Lançamentos</Text>
      <View>
        <FlatList
          data={filmesLancamentos}
          horizontal={true}
          renderItem={({ item }) => (
              
          <Card onPress={() => navigateToDetails(item.id)} style={{backgroundColor: '#000000'}}>
            <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w200/' + item.poster_path}} 
              style={{width: 125, height: 200, padding: 5, backgroundColor: '#000000', borderRadius: 0}}/>
                
              <View style={{alignItems: 'center', flexDirection: 'column', marginBottom: 15}}>
                <Ionicons name='add-circle-outline' size={25} color='#fff' onPress={() => addFilmeToFavoritos(item)}/>
                <Text style={{color: '#fff', fontSize: 12}}>Minha lista</Text>
              </View>
          </Card>  
          )}
        />
      </View>

      <Text style={{fontSize: 22, color: '#fff', padding: 5}}>Em alta</Text>
      <View>
        <FlatList
          data={filmesEmAlta}
          horizontal={true}
          renderItem={({ item }) => (
           
        <Card onPress={() => navigateToDetails(item.id)} style={{backgroundColor: '#000000'}}>
          <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w200/' + item.poster_path}} 
            style={{width: 125, height: 200, padding: 5, backgroundColor: '#000000', borderRadius: 0}}/>

            <View style={{alignItems: 'center', flexDirection: 'column', marginBottom: 15}}>
              <Ionicons name='add-circle-outline' size={25} color='#fff' onPress={() => addFilmeToFavoritos(item)}/>
              <Text style={{color: '#fff', fontSize: 12}}>Minha lista</Text>
            </View>
        </Card>  
        )}
      />
      </View>

      <Text style={{fontSize: 22, color: '#fff', padding: 5}}>Top 10</Text>
      <View>
        <FlatList
          data={filmesTop}
          horizontal={true}
          renderItem={({ item }) => (
           
        <Card onPress={() => navigateToDetails(item.id)} style={{backgroundColor: '#000000'}}>
          <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w200/' + item.poster_path}} 
            style={{width: 125, height: 200, padding: 5, backgroundColor: '#000000', borderRadius: 0}}/>
            
            <View style={{alignItems: 'center', flexDirection: 'column', marginBottom: 15}}>
              <Ionicons name='add-circle-outline' size={25} color='#fff' onPress={() => addFilmeToFavoritos(item)}/>
              <Text style={{color: '#fff', fontSize: 12}}>Minha lista</Text>
            </View>
        </Card>  
        )}
      />
      </View>
      
    </ScrollView>
  );
}