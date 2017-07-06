import React, {Component} from 'react'

class NewPlaylist extends Component {

  constructor(){
    super()
    this.state = {inputValue: '', dirty: false}
    this.setInputValue = this.setInputValue.bind(this)
    this.submitInputValue = this.submitInputValue.bind(this)
    this.checkLength = this.checkLength.bind(this)
  }

  setInputValue(event) {

    this.setState({inputValue: event.target.value, dirty: true})
  }

  checkLength(input) {
    if (input.length === 0 || input.length > 15) return true
    return false
  }


  submitInputValue(event) {
    console.log('hit')
    let ev = event;
    ev.preventDefault()
    this.setState({inputValue: '', dirty: false})
  }

  render() {
    return (
      <div className="well">
        <form onChange={this.setInputValue} onSubmit={this.submitInputValue} className="form-horizontal">
          <fieldset>
            <legend>New Playlist</legend>
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input value={this.state.inputValue} className="form-control" type="text" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" disabled={this.checkLength(this.state.inputValue)} className="btn btn-success">Create Playlist</button>
                {this.state.dirty && this.checkLength(this.state.inputValue) ? <div className="btn btn-failure">Please enter a name between 1 and 16 characters long</div> : <div></div>}
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }

}

export default NewPlaylist
