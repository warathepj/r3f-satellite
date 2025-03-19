export function Footer() {
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      padding: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      fontSize: '12px',
      textAlign: 'center',
      zIndex: 1000,
    }}>
      <p>
        Satellite model: "Simple Satellite Low Poly Free" by{' '}
        <a 
          href="https://sketchfab.com/djalalxjay" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#61dafb' }}
        >
          DjalalxJay
        </a>
        {' '}licensed under{' '}
        <a 
          href="http://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#61dafb' }}
        >
          CC-BY-4.0
        </a>
      </p>
    </footer>
  );
}