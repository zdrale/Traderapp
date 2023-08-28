import axios from "axios";

export async function fetchFirstFiveSymbols() {
    try {
      const response = await axios.get('/api/v1/symbols');
      if (response.status === 200) {
        const firstFiveSymbols = response.data.slice(0, 5);
        console.log(firstFiveSymbols);
        return firstFiveSymbols;
      }
    } catch (error) {
      console.error('Error fetching symbols:', error);
      return [];
    }
}