import React from 'react';
import { useSplashScreen } from './hooks/useSplashScreen';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyUs } from './components/WhyUs';
import { Services } from './components/Services';
import { InfoGraphic } from './components/InfoGraphic';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PrintingAndPaper } from './components/PrintingMachines';

function App() {
  const showSplash = useSplashScreen();

  return (
    <div className="App">
      {showSplash && <SplashScreen />}
      
      <Header />
      <main>
        <Hero />
        {/* <WhyUs /> */}
        <Services />
        <InfoGraphic />
        <Gallery />
        <PrintingAndPaper/>
        <Contact />
      </main>
      <Footer />

      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
    </div>
  );
}

export default App;