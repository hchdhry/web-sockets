import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row ,Col} from 'react-bootstrap';
import WaitingRoom from './waitingRoom';

function App() {
  return (
    <div >
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm = "12">
            <h1>welcome</h1>
            </Col>
          </Row>
          <WaitingRoom></WaitingRoom>
        </Container>
      </main>
    </div>
  );
}

export default App;
