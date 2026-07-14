import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="home-page" style={{ position: 'relative', zIndex: 1 }}>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}
