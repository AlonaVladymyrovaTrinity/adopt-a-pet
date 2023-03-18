import React from 'react';

function App() {
  const [petsList, setPetsList] = React.useState([]);

//-------POST----------
React.useEffect(() => {
  fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
  })
    .then(response => response.json())
    .then((result) =>
    fetch(`https://api.petfinder.com/v2/animals?type=dog&page=1`,
      // `/api/animals?type=cat&page=1`
      {
        headers: {
          Authorization: `Bearer ${result.access_token}`,
        },
      }
    ).then(response => response.json())
     .then(data => {
      setPetsList(data.animals);
   }))
}, []);

  return (
    <>
     {/* <ul>
    {petsList!==undefined ? (petsList.map((pet) => (
      <li key={pet.id}>{pet.name}</li>
    ))) : <li>Nothing</li>}
    </ul> */}
     <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Age</th>
        <th>Gender</th>
        <th>Size</th>
        <th>Description</th>
        <th>Photo</th>
      </tr>
    </thead>
    <tbody>
      {petsList.map((pet) => (
        <tr key={pet.id}>
          <td>{pet.name}</td>
          <td>{pet.type}</td>
          <td>{pet.age}</td>
          <td>{pet.gender}</td>
          <td>{pet.size}</td>
          <td>{pet.description}</td>
          <td>
            {pet.photos.map((photo) => (
              <img key={photo.small} src={photo.medium} alt={pet.name} style={{width: '100px', height: '100px'}}/>
            ))}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
    </>
  );
}

export default App;
