import { useEffect } from 'react'
// Пример использования алиасов
// import { someUtil } from '@/shared/utils'
// import { UserEntity } from '@/entities/user'
// import { SomeWidget } from '@/widgets/some-widget'

export function ExampleFeature() {
  useEffect(() => {
    const fetchServerData = async () => {
      //   const url = `http://localhost:${__SERVER_PORT__}`
      //   const response = await fetch(url)
      //   const data = await response.json()
      //   console.log(data)
    }

    fetchServerData()
  }, [])
  return <div className="App">Вот тут будет жить ваше приложение :)</div>
}

export default ExampleFeature
