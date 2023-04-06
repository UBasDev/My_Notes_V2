import React from "react"

interface prop1{
    hasError: boolean
}

class Error_Boundary extends React.Component<any, prop1> {
    constructor(props:any) {
      super(props)    
      this.state = { hasError: false } //Error olup olmadığını kontrol edebilmek için bu statei kullanacağız
    }
    static getDerivedStateFromError(error:any) {    
      return { hasError: true } //Statei update ediyoruz böylece sıradaki renderda fallback edeceğimiz UI görünecektir    
    }
    componentDidCatch(error:any, errorInfo:any) {    
      console.log({ error, errorInfo }) //Burada kendi log servisimizi çağırabiliriz
    }
    render() {    
      if (this.state.hasError) { //Errorun olup olmadığını kontrol ediyor      
        return ( //Burada hata alındığında herhangi bir UI return edebiliriz
          <div>
            <h2>Oops, there is an error!</h2>
            <button type="button" onClick={() => this.setState({ hasError: false })}>
              Try again?
            </button>
          </div>
        )
      }    
      return this.props.children //Hata alınmadığı takdirde döndürülecek olan childrenlardır, yani applikasyonumuzun kendisidir
    }
  }
  export default Error_Boundary