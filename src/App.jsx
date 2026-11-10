
import Header from './Header.jsx';
import Content from './Content.jsx';
import Footer from './Footer.jsx';
import ZustandDemo from './ZustandDemo.jsx';

export default function App() {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <Content />
        <Footer />

        <ZustandDemo />
      </div>
    </div>
  );
}
