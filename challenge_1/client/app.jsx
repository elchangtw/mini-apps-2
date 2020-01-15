import React from 'react';

const server_url = "http://localhost:3000";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch(server_url + '/events', {
      method: 'GET',
    })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
    });
  }


  render() {
    return (
      <div>
        Hi.
      </div>
    );
  }
}

export default App;