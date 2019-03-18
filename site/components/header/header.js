export default{
  name: 'znlHeader',

  render (h) {

    let imgStyle = {
      width: '125px',
      height: '38px'
    }

    return (
      <header class="znl-header">
        <h1>
          <img src={require("../../assets/logo.png")} alt="znl" style={imgStyle} />
        </h1>
      </header>
    )
  }
}