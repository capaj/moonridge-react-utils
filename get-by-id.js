import React from 'react'

class GetById extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.componentWillReceiveProps(props)
  }
  componentWillReceiveProps (nP) {
    nP.model.query().findOne({_id: nP.id}).exec().promise.then((res) => {
      this.fetched = true
      this.setState(res)
    }, (err) => {
      console.error(err)
    })
  }
  render () {
    if (!this.fetched) {
      return null
    }
    return this.props.body(this.state)
  }
}
export default GetById
