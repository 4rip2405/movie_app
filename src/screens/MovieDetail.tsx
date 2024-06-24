import React, { useEffect, useState } from 'react'
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native'
import axios from 'axios'
import MovieList from '../components/movies/MovieList'
import { API_ACCESS_TOKEN } from '@env'

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params
  const [movie, setMovie] = useState<any>(null)

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${API_ACCESS_TOKEN}`,
          },
        })
        setMovie(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchMovieData()
  }, [id])

  if (!movie) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` }} style={styles.image} />
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        <View style={styles.infoContainer}>
          <Text>Original Language: {movie.original_language}</Text>
          <Text>Popularity: {movie.popularity}</Text>
          <Text>Release Date: {new Date(movie.release_date).toDateString()}</Text>
          <Text>Vote Count: {movie.vote_count}</Text>
        </View>
        <View style={styles.recommendationContainer}>
          <MovieList
            title="Recommendation"
            path={`movie/${id}/recommendations`}
            coverType="poster"
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginTop: 32,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  rating: {
    fontSize: 18,
    color: '#FFD700',
    marginVertical: 8,
  },
  overview: {
    fontSize: 16,
    marginVertical: 8,
  },
  infoContainer: {
    marginVertical: 8,
    alignItems: 'flex-start',
    width: '100%',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '400',
  },
  recommendationContainer: {
    marginVertical: 16,
    width: '100%',
  },
})

export default MovieDetail
