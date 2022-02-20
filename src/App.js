import './App.css';
import Sidebar from './components/Sidebar';
import TicketList from './components/TicketList';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <TicketList />
    </div>
  );
}

export default App;