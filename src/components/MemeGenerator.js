import React from "react"


class MemeGenerator extends React.Component
{
constructor()
{
    super()
    this.state =
    {
      topText:"",
      bottomText:"",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allmemeImgs:[]
    }
    this.handleChange= this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}
handleChange(event)
{
    const { value,name} =event.target 
    this.setState(
        {[name]:value
        })
}

handleSubmit(event){
    event.preventDefault()
    const randnum = Math.floor(Math.random() * this.state.allmemeImgs.length)
    const memeImage = this.state.allmemeImgs[randnum].url
    this.setState({
        randomImg: memeImage
    })

}

componentDidMount()
{
    fetch("https://api.imgflip.com/get_memes")
    .then(response => response.json())
    .then(response =>
        {
            const {memes} =response.data
            this.setState({
                allmemeImgs:memes
            })
        }
    )
}

render()
{
    return(
        <div>
            <form className = "meme-form" onSubmit={this.handleSubmit}>
            <input type= "text"
            name = "topText"
            placeholder ="Top Text"
            onChange ={this.handleChange}
            value ={this.state.topText}
            />

<input type= "text"
            name = "bottomText"
            placeholder ="Bottom Text"
            onChange ={this.handleChange}
            value ={this.state.bottomText}
            />
             <button >Gen</button>
            </form>
            <div className ="meme">
                <img src ={this.state.randomImg} alt="" />
                <h2 className="top">{this.state.topText}</h2>
                <h2 className ="bottom">{this.state.bottomText}</h2>



            </div>
            
        </div>
    )
}
}

export default MemeGenerator