import React from 'react'
import Header from '../components/Header'
import AddRestaurant from '../components/AddRestaurant'
import RestaurantList from '../components/RestaurantList'

export default function Home() {
  return (
    <div>
      <Header/>
      <AddRestaurant/>
      <RestaurantList/>

    </div>
  )
}
