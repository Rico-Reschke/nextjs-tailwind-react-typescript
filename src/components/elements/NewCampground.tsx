import axios from 'axios';

function MyDataComponent() {
  async function fetchDataFromAPI() {
    try {
      const response = await axios.get('/api/mydata');
      console.log(response.data);
    } catch (error) {
      console.error("Ein Fehler ist aufgetreten:", error);
    }
  }

  return (
    <div>
      <button onClick={fetchDataFromAPI}>Daten von API abrufen</button>
    </div>
  );
}

export default MyDataComponent;